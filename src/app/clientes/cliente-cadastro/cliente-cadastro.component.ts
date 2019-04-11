import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ClienteService } from './../cliente.service';
import { Cliente, Email, Telefone } from './../../core/model';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  cliente = new Cliente();
 
  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigocliente = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova cliente');

    if (codigocliente) {
      this.carregarcliente(codigocliente);
    } else {
      this.adicionarEmail();
      this.adicionarTelefone();
    }
  }

  
  get editando() {
    return Boolean(this.cliente.codigo)
  }

  carregarcliente(codigo: number) {
    this.clienteService.buscarPorCodigo(codigo)
      .then(cliente => {
        this.cliente = cliente;

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCliente(form);
    } else {
      this.adicionarCliente(form);
    }
  }

  adicionarCliente(form: FormControl) {
    this.clienteService.adicionar(this.cliente)
      .then(clienteAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Cliente adicionado com sucesso!' });
        this.router.navigate(['/clientes', clienteAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCliente(form: FormControl) {
    this.clienteService.atualizar(this.cliente)
      .then(cliente => {
        this.cliente = cliente;

        this.messageService.add({ severity: 'success', detail: 'Cliente alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.cliente = new Cliente();
    }.bind(this), 1);

    this.router.navigate(['/clientes/novo']);
  }

  adicionarEmail() {
    this.cliente.emails.push(new Email());
  }

  adicionarTelefone() {
    this.cliente.telefones.push(new Telefone());
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de cliente: ${this.cliente.nome}`);
  }

}
