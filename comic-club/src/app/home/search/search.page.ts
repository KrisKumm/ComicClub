import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';
import { Router } from '@angular/router';
import {  Observable,pipe } from 'rxjs';
import {   map } from 'rxjs/operators';
import { ColectionServiceService } from 'src/app/colection-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  colection: Colection[];
  searchText: string;
  searchFax: number;
  constructor(private userService: UserServiceService, private router: Router,
    private colectionService: ColectionServiceService) {
   }
   async ngOnInit() {
      setTimeout(() => this.userService.searching = true);
      this.colection = await this.colectionService.getAllComics();
  }
  async likeCol(comic: Colection){
    
    if(comic.liked === "heart"){
      this.colection = this.colection.map(com => com.Id === comic.Id ? { ...com , liked:"heart-empty" , numberLikes: com.numberLikes-1} : com);
      this.colectionService.unLike(comic.Id);
    }
    else{
      this.colection = this.colection.map(com => com.Id === comic.Id ? { ...com , liked:"heart",numberLikes: com.numberLikes+1} : com);
      this.colectionService.like(comic.Id);
    }
  }
  // searchOn(): Promise<boolean>{
  //   //setTimeout( x => this.userService.searching = true,);
  //   return new Promise( resolve => {
  //     resolve(true);
  //   }) 
  // }
  openUser(sFax: number, sIndex: number) {
    this.userService.user = this.userService.searchUser;
    this.userService.searchUser = {
      Id: null,
      comicIdList: [],
      nickname: '',
      index: sIndex,
      password: '',
      fax: sFax,
      picture: '../assets/proba.jpg'
    };
    
    this.router.navigate(['/home/user']);
  }
  setComic(col: Colection){
    this.colectionService.setComic(col);
  }
  async search(eve: any) {
    if(eve.key === "Enter" && this.searchText !== undefined && this.searchText !== "" )
    this.colection = await this.colectionService.searchName(this.searchText);
  }
  searchOff() {
    setTimeout(() => this.userService.searching = false);
  }
}
