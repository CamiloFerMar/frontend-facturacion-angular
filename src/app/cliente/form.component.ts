import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';
  public errores!: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void {
    this.activateRoute.params.subscribe({
      next: params => {
        let id = params['id'];
        if (id) {
          this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
        } 
      }
    });
  }
  
  public create(): void {
    this.clienteService.create(this.cliente).subscribe({
      next: cliente =>{ 
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `Cliente ${this.cliente.nombre} creado con exito`, 'success');
      }, 
      error: err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo error backend: ' + err.status);
      }
    })
  }

  public update(): void{
    this.clienteService.update(this.cliente).subscribe({
      next: cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Actualizar Cliente', `Cliente ${this.cliente.nombre} actualizado`, 'success');
      },
      error: err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo error backend: ' + err.status);
      }
    });
  }

}
