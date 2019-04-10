import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-clientes-pesquisa',
  templateUrl: './clientes-pesquisa.component.html',
  styleUrls: ['./clientes-pesquisa.component.css']
})
export class ClientesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  clientes = [];
  @ViewChild('tabela') grid;

  constructor(private clienteService: ClienteService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de clientes');
  }

  pesquisar(pagina = 0) {
    this.clienteService.listarTodas()
      .then(resultado => {
        this.totalRegistros = resultado.clientes.length;
        this.clientes = resultado.clientes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(cliente: any) {
    this.clienteService.excluir(cliente.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Cliente excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
