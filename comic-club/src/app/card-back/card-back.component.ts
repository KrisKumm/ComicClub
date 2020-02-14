import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-back',
  templateUrl: './card-back.component.html',
  styleUrls: ['./card-back.component.scss'],
})
export class CardBackComponent implements OnInit {

  answer: string;
  BackImg: string;
  constructor() { }

  ngOnInit() {}

}
