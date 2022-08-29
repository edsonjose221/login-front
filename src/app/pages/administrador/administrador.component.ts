import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
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

  usuarios = [] as IUsuario[];

  colunas: any[] = [];
  loading: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.colunas = [
      { title: 'id', dataKey: 'id'},
      { title: 'Email', dataKey: 'email'},
      { title: 'Senha', dataKey: 'senha'}
    ];
  }

  ngOnInit(): void {
    this.listerUsers();
  }

  listerUsers(): void {
    let id = sessionStorage.getItem('usuario');
    this.usuarioService.listUsers(Number(id)).subscribe((data) => {
      this.usuarios = data;
    });
  }

  deleteUser(id: number): void {
    this.usuarioService.deletarUsuario(id).subscribe((data) => this.listerUsers());
  }

  dataUser(operacao: string, usuario?: IUsuario): void {
    let ref = this.dialogService.open(CadastroComponent, {
      header: operacao === 'create' ? 'Cadastro' : 'Editar Informações',
      width: '60%',
      height: '130%',
      data: {
        operacao: operacao,
        admin: 'admin',
        usuario: usuario
      } 
    });

    ref.onClose.subscribe((data) => {
      this.listerUsers();
    });
  }

  dialogDelete(id: number): void {
    this.confirmationService.confirm({
      message: `Você deseja deletar este usuário?`,
      accept: () => {
        this.deleteUser(id);
      },
    })
  }

  reload() {
    window.location.reload();
  }
}
