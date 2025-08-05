import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DeckPlayerModel } from '../../shared/Models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl + 'Deck';

  constructor() {}
  getDeckPlayer(id: number): Observable<DeckPlayerModel> {
    return this.http.get<DeckPlayerModel>(`${this.urlBase}/player/${id}`);
  }

  deleteDeck(playerId:number,cardId:number):Observable<any>{
    return this.http.delete<any>(`${this.urlBase}/used/${playerId}/${cardId}`)
  }
}
