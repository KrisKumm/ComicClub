import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ColectionServiceService } from '../colection-service.service';
import { ToastController, AlertController, PopoverController } from '@ionic/angular';
import { UserServiceService } from '../user-service.service';
import { resolve } from 'url';
import { Observable } from 'rxjs';
import { UserDataComponent } from '../user-data/user-data.component';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  colection: Colection[];
  user: User;
  userName: Promise<string>;
  userPic: Promise<string>;
  userFax: Promise<string>;
  colNmb: Promise<string>;
  like: string = "heart";
  private resolve: Function | null = null;
  constructor(private colectionService: ColectionServiceService, private toastCtrl: ToastController,
              private userService: UserServiceService,private cdRef : ChangeDetectorRef,
              private alertController: AlertController,private popoverController: PopoverController) {

    
  }
  async ngOnInit() {
    this.user = this.userService.user;
    this.user.picture = `assets/${this.user.Id}.jpg`;
    this.colection = this.colectionService.getColections(this.user.comicIdList);
    
    // this.colection.forEach(element => this.colNmb = new Promise( resolve =>{
    //     resolve(element.length.toString());
    // } ))
    
    //if (this.colection.length === 0) {
      
      // this.getColLength();
      // setTimeout(() => this.userService.searching = false);
      // this.searchOn(null).then(res => {
      //   console.log("nakon klika", this.userService.searching);
      //     this.userService.searching = res;
      //     console.log("a sad", this.userService.searching);
      // })
    //}
    //console.log(this.userService.searchUser);

    // if (this.userService.searchUser !== undefined) {
    //   this.user = this.userService.searchUser;
    // }
    // USER SERVICE AND CHECK FOR SEARCH USER
  }
  setComic(col: Colection){
    this.colectionService.setComic(col);
  }
  async loginToast() {
    let col = parseInt(await this.colNmb);
    if(col === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Click the plus sign to add your first collection',
        duration: 7000,
        position: 'bottom'
      });
      toast.present();
    }
  }
  delColection(id: number) {

    // this.deleteAlert(id);
    
    
  }
  doRefresh(event) {

    this.colection = this.colectionService.getColections(this.user.comicIdList);
    event.target.complete();
  }
  likeCol(comic: Colection) {
      this.colectionService.unLike(comic.Id);
   // setTimeout( () =>this.colection = this.colectionService.getColections(this.user.comicIdList),200 ) ;
  }
  retUser()
  {
    this.userService.searchUser = this.userService.user ;
  }
  getColLength() {
    
    // this.colection.subscribe( col => col.length === 0 ? this.loginToast(): 0)
  }

  makeChange() {
    if(this.userService.searching === false)
    {
      this.presentPopover()
    }
  }

  async presentPopover() {
        const popover = await this.popoverController.create({
          component: UserDataComponent,
          componentProps: {
            namePlace: this.userName,
            pass: this.userService.searchUser.password,
            urlPlace: this.userPic
          },
          translucent: true
        });
        return await popover.present();
  }
  
  getFax() {
    return this.userService.getUser().then(x => {
      return new Promise<string>(resolve => {

        switch (x.Fax){
          case 1:
            resolve('Elfak');
          break;
          case 2:
            resolve('FF');
          break;
          case 3:
            resolve('DIF');
          break;
        }
      });
    });
  }
}

