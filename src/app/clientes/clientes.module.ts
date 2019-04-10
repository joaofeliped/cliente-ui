import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';

import { SharedModule } from './../shared/shared.module';

import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { ClientesRoutingModule } from './clientes-routing.module';



@NgModule({
  declarations: [ClienteCadastroComponent, ClientesPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,

    SharedModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
