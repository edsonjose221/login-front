import { Component, DoCheck, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  item: MenuItem[] = [];
  label: string = '';

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.item = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'login'},
      {label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: 'user/user'},
      {label: 'Novo Usuário', icon: 'pi pi-fw pi-plus', routerLink: 'cadastrar'},
    ]
  }
  
  ngDoCheck(): void {
    if(sessionStorage.getItem("logout") === 'Logout'){
      this.label = 'Logout';
    }
  }

  cadastrar() {
    this.router.navigate(['/cadastrar']);
    if (sessionStorage.getItem("logout") === 'Logout'){
      sessionStorage.clear();
    }
  }

}
