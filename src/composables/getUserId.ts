import { useUserStore } from '@/stores/UserStore'

export const getUserIdLocalStorage = (): string => {
  const userStore = useUserStore()
  return userStore.getUserId
}
