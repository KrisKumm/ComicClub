import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import {map} from 'rxjs/operators';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserServiceService } from './user-service.service';
@Injectable({
  providedIn: 'root'
})
export class ColectionServiceService {

  private colection: Colection[] = [];
  public viewComic: Colection = {
    Id: "",
    liked: "",
    name: "",
    numberLikes: 0,
    pagesList: []
  };
  url: string = 'http://localhost:23785/';
  constructor(private http: HttpClient, private userService: UserServiceService) { }

  getColections(colIdS: string[]): Colection[] {
    this.colection = [];
    colIdS.forEach( idC => {
      this.getColection(idC).then(com => this.colection.push(com));
        
    })
    
    return this.colection;
  }
  async getColection(id: string): Promise<Colection>{
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    
    return await this.http.get<Colection>(`${this.url}/GetComicById/${id}`, options).toPromise();
  }
  async getAllComics(): Promise<Colection[]>{

    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    let comics = await this.http.get<Colection[]>(`${this.url}GetComics`, options).toPromise();
    comics.map(comic => {
      let newComic = comic;
      newComic.liked = "heart-empty";
      this.userService.user.comicIdList.forEach(com => {
        if(comic.Id === com){
          newComic.liked = "heart";
        }
      })
      return newComic;
    })
    ;
    return comics;
  }
  setComic(comic: Colection){
    this.viewComic = comic;
  }
  async getComents(col: string): Promise<Coments[]> {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };

    return await this.http.get<Coments[]>(`${this.url}GetCommentsByComic/${col}`, options).toPromise();
  }
  setComent(coment: Coments) {
    console.log(coment);
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    this.http.post(`${this.url}api/Comment`,coment, options).subscribe();
  }
  async searchName(searchText: string): Promise<Colection[]>{
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    
    let comics = await this.http.get<Colection[]>(`${this.url}GetComicsByNameLike/${searchText}`, options).toPromise();
    comics.map(comic => {
      let newComic = comic;
      newComic.liked = "heart-empty";
      this.userService.user.comicIdList.forEach(com => {
        if(comic.Id === com){
          newComic.liked = "heart";
        }
      })
      return newComic;
    })
    ;
    return comics
  }
  deleteColection(i: number) {
    console.log(i);
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    });
    const options = {
      headers: httpHeaders
    };
    this.http.delete(`${this.url}api/Colection/${i}`, options).subscribe();
  }
  like(col: string) {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    this.http.put(`${this.url}PutComicInUserList/${this.userService.user.Id}/${col}`, options).subscribe( res => 
      { 
        this.http.put(`${this.url}ComicNumberLikesInc/${col}`, options).subscribe( done => {
            this.userService.user.comicIdList.push(col);
        });
      });

  }
  unLike(col: string) {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    this.http.put(`${this.url}PullComicInUserList/${this.userService.user.Id}/${col}`, options).subscribe( res => 
      { 
        this.http.put(`${this.url}ComicNumberLikesDec/${col}`, options).subscribe( done => {
          this.userService.user.comicIdList = this.userService.user.comicIdList.filter(id => id != col);
        });
      });

  }
  checkName(name: string) {
    return true;
  }
}
