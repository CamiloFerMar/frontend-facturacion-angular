import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  cliente!: Cliente;
  public titulo: string = 'Detalle del cliente'
  constructor(private clienteService: ClienteService, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe(params => {
      let id: number = Number(params.get('id'))
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    })
  }

}
