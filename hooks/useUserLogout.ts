import { setIsAuth } from '@/context/auth'
import { useEarthoOne } from '@eartho/one-client-react'
import { useRouter } from 'next/navigation'

const useUserLogout = () => {
  const router = useRouter()
  const { logout } = useEarthoOne()

  return () => {
    logout({ client_id: process.env.NEXT_PUBLIC_EARTHO_CLIENT_ID })
    localStorage.removeItem('auth')
    setIsAuth(false)
    router.push('/')
    window.location.reload()
  }
}

export { useUserLogout }
