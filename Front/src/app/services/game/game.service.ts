// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment.development';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class GameService {

//   private http = inject(HttpClient);
//   private urlBase = environment.apiUrl + "Game";
//   constructor() { }

//   CreateGame(id:number =1):Observable<any>{
//     return this.http.post<any>(`${this.urlBase}/${id}/start`,[])
//   }
// }
