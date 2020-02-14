import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserServiceService } from '../user-service.service';
import { setTNodeAndViewData } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  namePlace: Promise<string>;
  urlPlace: Promise<string>;
  name: string='';
  pass: string;
  url: string='';
  constructor(private popoverController: PopoverController, private userService: UserServiceService) { }

  ngOnInit() { }

  newUrl(ev) {
    this.url = ev.target.value;
  }

  newName(ev) {
    this.name = ev.target.value;
  }

  newPassword(ev)  {
    this.pass = ev.target.value;
  }

  async change() {
    if(this.name === '')
    {
      this.name = await this.namePlace;
    }
    if(this.url === ''){
      this.url = await this.urlPlace;
    }  
    this.popoverController.dismiss();
  }

  cancle() {
    this.popoverController.dismiss();
  }
  // async setName() {
  //   this.name = await this.namePlace;
  // }
  // async setUrl() {
  //   this.url = await this.urlPlace;
  // }
}
