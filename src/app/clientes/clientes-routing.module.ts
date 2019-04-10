import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CLIENTE'] }
  },
  {
    path: 'clientes/novo',
    component: ClienteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CLIENTE'] }
  },
  {
    path: 'clientes/:codigo',
    component: ClienteCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CLIENTE'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }