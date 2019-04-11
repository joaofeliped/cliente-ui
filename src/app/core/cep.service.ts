import { Injectable } from "@angular/core";
import { MoneyHttp } from "../seguranca/money-http";

@Injectable()
export class CepService {

    cepUrl: string;

    constructor(private http: MoneyHttp) {
        this.cepUrl = 'https://viacep.com.br/ws/';
     }

     buscarPorCep(cep: string): Promise<any> {
        return this.http.get<any>(this.cepUrl + cep + '/json')
          .toPromise()
          .then(response => response);
      }
}