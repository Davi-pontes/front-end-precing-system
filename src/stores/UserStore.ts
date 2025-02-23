import { defineStore } from 'pinia'

// Interface para o usuário
interface IUser {
  id: string
  name: string
  email: string
  firstAccess: boolean
}

export const useUserStore = defineStore('user', {
  state: (): IUser => ({
    id: localStorage.getItem('id') || '',
    name: localStorage.getItem('name') || '',
    email: localStorage.getItem('email') || '',
    firstAccess: JSON.parse(localStorage.getItem('firstAccess') || 'false')
  }),
  getters: {
    getFirstAccess: (state): boolean => state.firstAccess,
    getUserId: (state): string => state.id,
    getUserData: (state): IUser => ({
      id: state.id,
      name: state.name,
      email: state.email,
      firstAccess: state.firstAccess
    })
  },
  actions: {
    setUser(userData: IUser) {
      this.id = userData.id
      this.name = userData.name
      this.email = userData.email
      this.firstAccess = userData.firstAccess

      // Salvar no localStorage
      localStorage.setItem('id', userData.id)
      localStorage.setItem('name', userData.name)
      localStorage.setItem('email', userData.email)
      localStorage.setItem('firstAccess', JSON.stringify(userData.firstAccess))
    },
    clearUser() {
      this.id = ''
      this.name = ''
      this.email = ''
      this.firstAccess = false

      // Remover do localStorage
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('firstAccess')
    }
  }
})
