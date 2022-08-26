import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PrimengModule } from './modules/primeng/primeng.module';
import { AdministradorModule } from './pages/administrador/administrador.module';
import { CadastroModule } from './components/cadastro/cadastro.module';
import { HeaderModule } from './components/header/header.module';
import { LoginModule } from './components/login/login.module';
import { MessageModule } from './message/message.module';
import { UsersModule } from './pages/user/users.module';

import { LoginService } from './core/service/login.service';
import { UsuarioService } from './core/service/usuario.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdministradorModule,
    CadastroModule,
    HeaderModule,
    LoginModule,
    MessageModule,
    PrimengModule,
    UsersModule
  ],
  providers: [
    UsuarioService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
