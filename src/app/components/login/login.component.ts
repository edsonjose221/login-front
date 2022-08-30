import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUsuario } from 'src/app/core/interface/usuario';

import { LoginService } from 'src/app/core/service/login.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { CadastroComponent } from '../cadastro/cadastro.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  usuario = {} as IUsuario;
  display = false;

  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    public dialogService: DialogService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

    login() {
    this.loading = true;
    this.loginService.login(this.usuario).subscribe((data) => {
      if (data) {
        this.loading = false;
        let token = data;
        sessionStorage.setItem('token', token);

        this.usuarioService.userLogged(this.usuario).subscribe(usuario => {
          this.usuario = usuario;
          console.log(usuario);
          sessionStorage.setItem('usuario', `${usuario.id}`);
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Usuário logado!', key: 'success'});
          this.routerData();
        });
      }
    },
    err => {
      this.loading = false;
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Usuário Inválido!', key: 'error'});
    });
  }

  routerData() {
    if (sessionStorage.getItem('token')) {
      if(this.usuario.userRoles === 'ADMIN') {
        this.router.navigate(['/usuario/admin']);
      }
      if (this.usuario.userRoles === 'USER'){
        this.router.navigate(['/usuario/usuario']);
      }
      let logout = 'Logout';
      sessionStorage.setItem('logout', logout);
    }
  }
  
  dataUser(operacao: string){
    this.dialogService.open(CadastroComponent, {
      header: 'Cadastrar',
      width: '55%',
      data: {
        operacao: operacao
      }
    });
  }
}
