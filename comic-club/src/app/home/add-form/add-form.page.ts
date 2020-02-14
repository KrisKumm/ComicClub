import { Component, OnInit } from '@angular/core';
import { ColectionServiceService } from 'src/app/colection-service.service';
import { MockPipeResolver } from '@angular/compiler/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ToastController } from '@ionic/angular';
import { Color } from '@ionic/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.page.html',
  styleUrls: ['./add-form.page.scss'],
})
export class AddFormPage implements OnInit {


  constructor(private colectionService: ColectionServiceService, private router: Router,  private toastCtrl: ToastController) { }

  name = '';
  visable: boolean;
  errName: Color = 'danger';
  isDisabled = true;
  ngOnInit() {
  }
  nameCheck() {
    if (this.name !== undefined && this.name !== '') {
      if (this.colectionService.checkName(this.name)) {
        this.errName = 'primary';
        this.isDisabled = false;
      }
    }
  }


  addColection() {
    // check for same name

    //this.colectionService.getColection();
    this.swipeToast();

    this.router.navigate(['/home']);
  }
  async swipeToast() {
    const toast = await this.toastCtrl.create({
      message: '  Swipe up to Refresh the list \n Swipe the Clolection left to Delete or right to Edit',
      duration: 7000,
      position: 'bottom'
    });
    toast.present();
  }
}
