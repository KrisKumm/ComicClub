import { Component, OnInit } from '@angular/core';
import { Color } from '@ionic/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userIndex: string;
  userPassword: string;
  userFax: number;
  isDisabled = true;

  provera: any;
  errPass: Color = 'danger';
  errIndex: Color = 'danger';
  constructor(private userService: UserServiceService, private router: Router, private toastCtrl: ToastController)  { }

  ngOnInit() {
    // TOASTS
  }
  loginSetup() {
    this.userService.setSearch(this.userIndex,this.userFax,this.userPassword);
    this.login();
  }
  async login() {
    //this.userService.searchUser.index = this.userIndex;
    //this.userService.searchUser.fax = this.userFax;
    this.provera = await this.userService.loginUser();
    console.log(this.provera, "te ga user");
      if (this.provera.nickname !== null) {
        
        if(this.provera.password === this.userPassword)
        {
          this.userService.user = this.provera;
          this.router.navigate(['/home']);

        }
        else{
          this.loginToastErr();
        }
      }
      else{

        this.loginToastErr();
      }

    

  }

  indexCheck() {
    if (this.userIndex !== null && this.userIndex !== undefined && this.userIndex !== "") {
      this.errIndex = 'primary';
    }

    if (this.errPass === 'primary' && this.errIndex === 'primary') {
      this.isDisabled = false;
    }
  }
  passCheck() {
    if (this.userPassword !== null && this.userPassword !== undefined && this.userPassword !== '' ) {
         this.errPass = 'primary';
    }

    if (this.errPass === 'primary' && this.errIndex === 'primary') {
      this.isDisabled = false;
    }
  }
  async loginToastErr() {
      const toast = await this.toastCtrl.create({
        message: 'Incorect Username or Password',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    
  }
}
