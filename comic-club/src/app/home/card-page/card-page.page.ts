import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardServiceService } from '../../card-service.service';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { CardBackComponent } from 'src/app/card-back/card-back.component';
import { Observable } from 'rxjs';
import { map,elementAt, count } from 'rxjs/operators';
import { CardEditComponent } from 'src/app/card-edit/card-edit.component';
import { UserServiceService } from 'src/app/user-service.service';
import { ColectionServiceService } from 'src/app/colection-service.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.page.html',
  styleUrls: ['./card-page.page.scss'],
})
export class CardPagePage implements OnInit {

  cards: string[] = [];
  coments: Coments[];
  colectionId: number;
  comentText: string;
  slide = 0;
  comic: Colection;
  constructor(private activatedRoute: ActivatedRoute, private cardService: CardServiceService, private toastCtrl: ToastController
  ,           private modalController: ModalController, private userService: UserServiceService, private colectionService: ColectionServiceService
              ,private alertController: AlertController) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe( param => {
      if (!param.has('colectionId')) {
        // back
        return;
      }
      this.colectionId = parseInt(param.get('colectionId'));  
    });
    this.comic = this.colectionService.viewComic
    this.cards = this.colectionService.viewComic.pagesList.map(card => `assets/${card}`);
    console.log(this.cards);
    this.coments = await this.colectionService.getComents(this.comic.Id);
  }
  displayBack(card: number) {
    
  }

  makeComent() {
    this.colectionService.setComent({
        userName: this.userService.user.nickname,
        commentText: this.comentText,
        id: null,
        idComicComm: this.comic.Id,
        idUserComm: this.userService.user.Id
    });
    this.comentText = "";
    //setTimeout( () =>this.coments = this.colectionService.getComents(this.comic.Id),500 ) ;
     
  }
  
  slideLeft() {
    this.slide--;
    console.log(this.slide);
  }

  slideRight() {
    this.slide++;
    console.log(this.slide);
  }
  async doRefresh(event) {

    //this.cards = this.cardService.getCards(this.colectionId);
    this.coments = await this.colectionService.getComents(this.comic.Id);
    event.target.complete();
  }
  async makeEditToast() {
    const toast = await this.toastCtrl.create({
      message: 'Click Setings button then the edit button to add a Question',
      duration: 7000,
      position: 'top'
    });
    toast.present();
  }
  
  
}
