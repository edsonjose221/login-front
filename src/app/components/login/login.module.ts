import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordModule} from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms'
import { PrimengModule } from 'src/app/modules/primeng/primeng.module';
import { NgxLoadingModule } from "ngx-loading";

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PasswordModule,
    CheckboxModule,
    FormsModule,
    NgxLoadingModule,
    PrimengModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
