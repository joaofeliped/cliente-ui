import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { environment } from './../../environments/environment';
import { Pessoa } from './../core/model';
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
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.clientesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.clientesUrl, pessoa)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.clientesUrl}/${pessoa.codigo}`, pessoa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.clientesUrl}/${codigo}`)
      .toPromise();
  }
}