import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IUsuario } from '../interface/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api =`${environment.api}/api/usuario`;

  constructor(private http: HttpClient) { }

  listUsers(id: number) {
    return this.http.get<any>(`${this.api}/admin/listar/${id}`)
  }

  insertUser(user: IUsuario): Observable<IUsuario> {  
    return this.http.post<IUsuario>(`${this.api}/salvar`, user)
  }

  editUser(user: IUsuario) {
    return this.http.put<IUsuario>(`${this.api}/editar`, user)
  }

  userLogged(user: IUsuario) {
    return this.http.post<IUsuario>(`${this.api}/logado`, user)
  }

  deletarUsuario(id: number) {
    return this.http.delete(`${this.api}/excluir/${id}`);
  }

  roles() {
    return this.http.get<any>(`${this.api}/roles`)
  }
}
