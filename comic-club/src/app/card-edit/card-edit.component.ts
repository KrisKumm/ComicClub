import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
})
export class CardEditComponent implements OnInit {

  question: string = '';
  answer: string = '';
  questionImg: string = '';
  answerImg: string = '';
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss({
      'FrontText': this.question,
      'BackText': this.answer,
      'BackImg': this.answerImg,
      'FrontImg': this.questionImg
    })
  }
  cancle() {
    this.modalController.dismiss();
  }
  setAnswer(ev) {
    this.answer = ev.target.value;
  }
  setQuestion(ev) {
    this.question = ev.target.value;
  }
  setQueImg(ev) {
    this.questionImg = ev.target.value;
  }
  setAnsImg(ev) {
    this.answerImg = ev.target.value;
  }
}
