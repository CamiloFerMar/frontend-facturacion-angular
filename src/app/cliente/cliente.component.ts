import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  clientes!: Cliente[];
  public paginador: any;

  constructor(
    private clienteService: ClienteService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      let page = Number(params.get('page'))
      if (!page) page = 0;
      this.clienteService.getClientes(page).subscribe({
        next: response => {
          this.clientes = response.content as Cliente[]
          if (this.clientes.length == 0 || this.clientes == null) {
            Swal.fire(
              'No hay clientes',
              'No existen clientes en la base de datos',
              'warning'
            )
          }
          this.paginador = response
          console.log(this.paginador);
        },
        error: () => {
          Swal.fire(
            'No hay conexion',
            'Ha ocurrido un fallo en la conexion con la base de datos',
            'error'
          )
        },
      })
    })

  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desdeas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, !eliminar!',
      cancelButtonText: 'No, !cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(data => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          swalWithBootstrapButtons.fire(
            '!Cliente eliminado!',
            `Cliente ${cliente.nombre} eliminado con exito`,
            'success'
          )
        })
      }
    })
  }

}
