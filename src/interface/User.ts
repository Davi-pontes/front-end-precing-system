export interface IUser {
    id: string;
    name: string;
    phone_number: string;
    email: string;
    is_admin: boolean;
    first_access: string;
    last_access: string;
    active: number
    product_count: string
  }

export interface IColumnsTableUser{
    nome: string;
    numero: string;
    email: string;
    admin: boolean;
    primeiroAcesso: string;
    ultimoAcesso: string;
    ativo: number
    produtoCadastrado: string
}