import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { environment } from './../../environments/environment';
import { Cliente } from './../core/model';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable()
export class ClienteService {

  clientesUrl: string;

  constructor(private http: MoneyHttp) {
    this.clientesUrl = `${environment.apiUrl}/clientes`;
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.clientesUrl)
      .toPromise()
      .then(response => response);
  }

  listarTiposTelefones(): Promise<any> {
    return this.http.get<any>(this.clientesUrl + '/tipos-telefone')
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.clientesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(cliente: Cliente): Promise<Cliente> {
    return this.http.post<Cliente>(this.clientesUrl, cliente)
      .toPromise();
  }

  atualizar(cliente: Cliente): Promise<Cliente> {
    return this.http.put<Cliente>(`${this.clientesUrl}/${cliente.codigo}`, cliente)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Cliente> {
    return this.http.get<Cliente>(`${this.clientesUrl}/${codigo}`)
      .toPromise();
  }
}