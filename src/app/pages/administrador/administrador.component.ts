import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';
import { IUsuario } from 'src/app/core/interface/usuario';

import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  usuario = [] as IUsuario[];
  colunas: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.colunas = [
      { title: 'id', dataKey: 'id'},
      { title: 'email', dataKey: 'email'},
      { title: 'senha', dataKey: 'senha'}
    ];
  }

  ngOnInit(): void {
    this.listerUsers();
  }

  listerUsers(): void {
    let id = sessionStorage.getItem('usuario');
    this.usuarioService.listUsers(Number(id)).subscribe((data) => {
      this.usuario = data;
    });
  }

  deleteUser(id: number): void {
    this.usuarioService.deletarUsuario(id).subscribe((data) => this.listerUsers());
  }

  dataUser(op: string, usuario?: IUsuario): void {
    let ref = this.dialogService.open(CadastroComponent, {
      header: op === 'create' ? 'Cadastro' : 'Editar Informações',
      width: '60%',
      data: {
        op: 'op',
        adm: 'adm',
        usuario: usuario
      } 
    });

    ref.onClose.subscribe((data) => {
      this.listerUsers();
    });
  }

  dialogDelete(id: number): void {
    this.confirmationService.confirm({
      message: `Do you really want to delete user?`,
      accept: () => {
        this.deleteUser(id);
      },
    })
  }
}
