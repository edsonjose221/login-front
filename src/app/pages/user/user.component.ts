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
    this.list();
  }

  list() {
    let id = sessionStorage.getItem('usuario')
    this.userService.listUsers(Number(id)).subscribe(data => {
      this.usuario = data;
    });
  }

  messageDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja deletar este usuário?',
      accept: () => {
        this.delete(id);
      }
    });
  }

  delete(id: number) {
    this.userService.deletarUsuario(id).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  edit(usuario: IUsuario) {
    let reference = this.dialogService.open(CadastroComponent, {
      header: "Editar Usuário",
      width: '60%',
      data: {
        op: 'update',
        admin: 'admin',
        usuario: usuario
      }
    });

    reference.onDestroy.subscribe(() =>  this.list());
  }
}
