
  
  export class Endereco {
    codigo: number; 
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
  }
  
  export class Telefone {
    codigo: number;
    tipo: string;
    numero: number;
  }

  export class Email {
    codigo: number;
    descricao: string;
  }

  export class Cliente {
    codigo: number;
    nome: string;
    cpf: string;
    endereco = new Endereco();
    telefones = new Array<Telefone>();
    emails = new Array<Email>();
  }