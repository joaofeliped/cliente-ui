import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { ClientesRoutingModule } from './clientes-routing.module';

@NgModule({
  declarations: [ClienteCadastroComponent, ClientesPesquisaComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
