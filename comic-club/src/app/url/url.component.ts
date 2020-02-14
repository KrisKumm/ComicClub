import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { CardServiceService } from '../card-service.service';
import { ColectionServiceService } from '../colection-service.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss'],
})
export class UrlComponent implements OnInit {

  adress: string;
  constructor(private userService: UserServiceService, private cardService: CardServiceService,
              private colService: ColectionServiceService, private popCntrl: PopoverController) { }

  ngOnInit() {}

  setUrl(ev) {
    this.adress = ev.target.value;
  }

  changeUrl() {
    this.userService.url = this.adress;
    this.colService.url = this.adress;
    this.cardService.url = this.adress;

    this.popCntrl.dismiss();
  }
}
