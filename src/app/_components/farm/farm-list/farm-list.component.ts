import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.css']
})
export class FarmListComponent implements OnInit {

  btnNewFarm: string = 'CADASTRAR NOVA FAZENDA';

  constructor() { }

  ngOnInit(): void {
  }

}
