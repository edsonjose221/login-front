import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/core/interface/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formGroup: FormGroup;
  op: string = '';
  adm: string = '';
  roles = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private dynamicDialogRef: DynamicDialogRef,
    private dynamicDialogConf: DynamicDialogConfig,
    private messageService: MessageService) { 
      this.formGroup = this.formBuilder.group({
        email: this.formBuilder.control('', [Validators.required]),
        senha: this.formBuilder.control('', [Validators.required]),
        nome: this.formBuilder.control(''),
        roles: this.formBuilder.control(null)
      });  
  }

  ngOnInit(): void {
    this.op = this.dynamicDialogConf.data;
    this.adm = this.dynamicDialogConf.data;
    this.getRoles();

    if (this.op === 'update') {
      this.editUser();
    }
  }

  getRoles() {
    this.userService.roles().subscribe(data => {
      this.roles = data;
    });
  }

  saveData(): void {
    const value = this.formGroup.value;
    
    const request: IUsuario = {
      ... value
    };

    if (this.op === 'update' && value.senha != null) {
      this.userService.editUser(request).subscribe(data => {
        console.log(this.userService);
        this.messageDialog();
        this.dynamicDialogRef.destroy();
      });  
    }
    else if (this.op == 'create') {
      this.userService.insertUser(request).subscribe(data => {
        this.messageDialog();
        this.dynamicDialogRef.destroy();
      });
    }
    else {
      this.messageDialog();
    }
  }

  messageDialog() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Tudo certo!',
      key:'sucesso'
    });
  }

  editUser(): void {
    this.formGroup.get('nome')?.patchValue(this.dynamicDialogConf.data.usuario.nome)
    this.formGroup.get('email')?.patchValue(this.dynamicDialogConf.data.usuario.email)
    this.formGroup.get('roles')?.patchValue(this.dynamicDialogConf.data.usuario.roles)
  }
}
