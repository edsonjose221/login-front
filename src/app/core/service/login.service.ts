import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api =`${environment.api}/login`

  constructor(private http: HttpClient) { }

  login(user: IUsuario) {
    return this.http.post(this.api, JSON.stringify(user), {responseType: 'text'}).pipe(
      retry(2)
    )
  }
}
