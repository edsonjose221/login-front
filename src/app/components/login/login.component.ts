import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUsuario } from 'src/app/core/interface/usuario';

import { LoginService } from 'src/app/core/service/login.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { DialogService } from 'primeng/dynamicdialog';

import { CadastroComponent } from '../cadastro/cadastro.component';
import { MessageService } from 'primeng/api';

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

  login(): void { 
    this.loading = true;
    this.loginService.login(this.usuario).subscribe((data) => {
      if (data) {
        this.loading = false;
        let token = data;
        sessionStorage.setItem('token', token);

        this.usuarioService.userLogged(this.usuario).subscribe(usuario => {
          this.usuario = usuario;
          sessionStorage.setItem('usuario', `${this.usuario}`);
          this.routerData();
        });
      }

    });
  }

  routerData() {
    if (sessionStorage.getItem('token')) {
      if(this.usuario.roles === 'ADMIN') {
        this.router.navigate(['/user/admin']);
      }
      if (this.usuario.roles === 'USER'){
        this.router.navigate(['/user/user']);
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
