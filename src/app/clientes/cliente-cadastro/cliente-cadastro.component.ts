import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ClienteService } from './../cliente.service';
import { Cliente, Email, Telefone } from './../../core/model';
import { CepService } from '../../core/cep.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  cliente = new Cliente();
  tipoTelefones = [];
  mascaraTelefone = '(99)99999-9999';

  constructor(
    private clienteService: ClienteService,
    private cepService: CepService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigocliente = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova cliente');

    this.buscarTiposTelefone();

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

  buscarPorCep() {
    if (this.cliente.endereco.cep && this.cliente.endereco.cep.length === 10) {
      this.cepService.buscarPorCep(this.cliente.endereco.cep.replace(/[^\d]+/g, ''))
        .then(endereco => {
          this.cliente.endereco.bairro = endereco.bairro;
          this.cliente.endereco.cidade = endereco.localidade;
          this.cliente.endereco.uf = endereco.uf;
          this.cliente.endereco.logradouro = endereco.logradouro;
          this.cliente.endereco.complemento = endereco.complemento;
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  }

  selecionarTipoTelefone(telefone: Telefone) {
    /* if(telefone.tipo === 'RESIDENCIAL') {
       
     } else if(telefone.tipo === 'COMERCIAL') {

     } else {

     }*/
  }

  buscarTiposTelefone() {
    this.clienteService.listarTiposTelefones()
      .then(tiposTelefones => {
        this.tipoTelefones = tiposTelefones;
      })
      .catch(erro => this.errorHandler.handle(erro));
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
    this.cliente.telefones.map(t => {
      t.tipo = 'CELULAR';
      t.numero = t.numero.replace(/[^\d]+/g, '');
    });
    this.cliente.endereco.cep = this.cliente.endereco.cep.replace(/[^\d]+/g, '');
    this.cliente.cpf = this.cliente.cpf.replace(/[^\d]+/g, '');

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
