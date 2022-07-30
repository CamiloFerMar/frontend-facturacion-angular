import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  constructor() { }

  list: String[] = ['JavaScript', 'TypeScript', 'Java', 'PHP', 'C#'];
  habilitar: Boolean = true;

  setHabilitar(): void {
    this.habilitar = this.habilitar ? false : true;
  }

}
