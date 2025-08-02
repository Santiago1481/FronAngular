import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardModel } from '../../shared/Models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  private urlBase = environment.apiUrl + "Card";
  private http = inject(HttpClient);

  public getCard():Observable<CardModel[]>{
    return this.http.get<CardModel[]>(this.urlBase);
  }
}
