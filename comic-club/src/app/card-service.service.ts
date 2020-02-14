import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserServiceService } from './user-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  kartice: Observable<Card[]>;
  url: string = 'http://localhost:56650/';
  constructor(private http: HttpClient, private userService: UserServiceService) { }

  getCards(colId: number): Observable<Card[]> {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    return this.http.get<Card[]>(`${this.url}api/Card/${colId}`, options);
    
  }
  addCard(card: Card, col: number) {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    this.http.post<Card[]>(`${this.url}AddCard?index=${col}`,card, options).subscribe();
    return this.getCards(col);
  }
  deleteCard(index: number) {
    //this.kartice.splice(index,1);
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    });
    const options = {
      headers: httpHeaders
    };
    this.http.delete(`${this.url}api/Card/${index}`, options).subscribe();
  }
 
  edit(cardData: any, id: number) {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    this.http.post<Card>(`${this.url}UpdateCard?id=${id}`,cardData, options).subscribe();
  }
  add(card: Card) {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    this.http.post<Card>(`${this.url}AddUser`,card, options).subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }
}
