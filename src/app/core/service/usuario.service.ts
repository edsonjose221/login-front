import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api: string = `${environment.api}/api/user`

  constructor(private http: HttpClient) { }

  listUsers(id: number) {
    return this.http.get<any>(`${this.api}/admin/list/${id}`)
  }

  insertUser(user: IUsuario): Observable<IUsuario> {  
    return this.http.post<IUsuario>(`${this.api}/save`, user)
  }

  userLogged(user: IUsuario) {
    return this.http.post<IUsuario>(`${this.api}/logado`, user)
  }

  editUser(user: IUsuario) {
    return this.http.put<IUsuario>(`${this.api}/edit`, user)
  }
  
  deletarUsuario(id: number) {
    return this.http.delete(`${this.api}/delete` + id);
  }

  roles() {
    return this.http.get<any>(`${this.api}/roles`)
  }
}
