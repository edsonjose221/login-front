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
  operacao: string = '';
  admin: string = '';
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
    this.operacao = this.dynamicDialogConf.data.operacao;
    this.admin = this.dynamicDialogConf.data.admin;
    this.getRoles();

    if (this.operacao === 'update') {
      this.editarUsuario()
    }
  }  

  getRoles() {
    this.userService.roles().subscribe(data => {
      this.roles = data;
    });
  }

  salvarDados(): void {
    const value = this.formGroup.value;
    
    const request: IUsuario = {
      ... value
    };

    if (this.operacao == 'update' && value.senha != null) {
      this.userService.editUser(request).subscribe(data => {
        console.log(data);
        this.messageDialog();
        this.dynamicDialogRef.close(data);
      });  
    }
    else if (this.operacao == 'create') {
      this.userService.insertUser(request).subscribe( data => {
        this.messageDialog();
        this.dynamicDialogRef.close(data);
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

  editarUsuario(): void {
    this.formGroup.get('email')?.patchValue(this.dynamicDialogConf.data.usuario.email);
    this.formGroup.get('roles')?.patchValue(this.dynamicDialogConf.data.usuario.roles);
    this.formGroup.get('nome')?.patchValue(this.dynamicDialogConf.data.usuario.nome);
  }
}
