import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UsuarioService } from 'src/app/core/service/usuario.service';

import { IUsuario } from 'src/app/core/interface/usuario';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuario = {} as IUsuario;

  constructor(private userService: UsuarioService, private router: Router, private dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    let id = sessionStorage.getItem('usuario')
    this.userService.listUsers(Number(id)).subscribe(data => {
      console.log(data);
      this.usuario = data;
    });
  }

  messageDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja deletar este usuário?',
      accept: () => {
        this.excluirUsuario(id);
      }
    });
  }

  excluirUsuario(id: number) {
    this.userService.deletarUsuario(id).subscribe(data => {
      this.router.navigate(['/login']);
    });
  }

  editarUsuario(usuario: IUsuario) {
    let reference = this.dialogService.open(CadastroComponent, {
      header: "Editar Usuário",
      width: '60%',
      data: {
        operacao: 'update',
        admin: 'admin',
        usuario: usuario
      }
    });

    reference.onDestroy.subscribe(data => this.listarUsuarios());
  }
}
