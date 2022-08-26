import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './administrador.component';
import { PrimengModule } from 'src/app/modules/primeng/primeng.module';

@NgModule({
  declarations: [
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    AdministradorComponent
  ]
})
export class AdministradorModule { }
