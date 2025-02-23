import { useUserStore } from '@/stores/UserStore'

export const getUserDataLocalStorage = (): any => {
  const userStore = useUserStore()
  return userStore.getUserData
}
