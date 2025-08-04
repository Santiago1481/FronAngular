import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { PlayerModel } from '../../shared/Models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl + "Player";
  constructor() { }

  getPlayer():Observable<PlayerModel[]>{
    return this.http.get<PlayerModel[]>(this.urlBase);
  }

  createPlayer(object:PlayerModel):Observable<any>{
    return this.http.post<any>(this.urlBase, object);
  }

  deleteLogic(id:number):Observable<any>{
    return this.http.patch(`${this.urlBase}/${id}`,[])
  }
}
