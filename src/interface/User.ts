export interface IUser {
  id: string
  name: string
  phone_number: string
  email: string
  is_admin: boolean
  first_access: string
  firstAccess: boolean
  last_access: string
  active: boolean
  product_count: string
}

export interface IColumnsTableUser {
  nome: string
  numero: string
  email: string
  admin: boolean
  primeiroAcesso: string
  ultimoAcesso: string
  active: boolean
  produtoCadastrado: string
}
