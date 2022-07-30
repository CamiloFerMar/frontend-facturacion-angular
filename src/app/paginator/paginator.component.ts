import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  
  @Input() public paginador: any;

  public paginas!: number[];

  public desde!: number;
  public hasta!: number;
  
  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    let paginatorUpdate = changes['paginador'];
    if (paginatorUpdate.previousValue) {
      this.initPaginator();
    }
  }

  ngOnInit(): void {
    this.initPaginator();
  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, Number(this.paginador.number)-4), Number(this.paginador.totalPages)-5);
    this.hasta = Math.max(Math.min(Number(this.paginador.totalPages), Number(this.paginador.number)+4), 6);

    if(this.paginador.totalPages > 5){
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    }else{
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }
}
