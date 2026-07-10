import { alertSwal } from '@/components/AlertSwal/AlertSwal'
import { axiosApi } from '@/configs/axiosConfig'
import { AlertTypeEnum } from '@/enums/types/AlertTypeEnum'
import { useLogoutSync } from '@/hooks/useLogoutSync'
import { IUser } from '@/interfaces/models/User/user.interface'
import { createContext, useCallback, useEffect, useState } from 'react'
import { IAuthContextType } from './interfaces/IAuthContextType'
import { IAuthProviderProps } from './interfaces/IAuthProviderProps'

export const AxiosContext = createContext<IAuthContextType | undefined>(undefined)

export const AxiosProvider = ({ children }: IAuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'))
  const [user, setUser] = useState<IUser | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null)
  // const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false)
  const configureAxiosHeaders = (token: string | null) => {
    if (token) {
      axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('authToken', token)
    } else {
      delete axiosApi.defaults.headers.common['Authorization']
      localStorage.removeItem('authToken')
    }
    setAuthToken(token)
  }

  const configUser = (user: IUser | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
    setUser(user)
  }

  const logout = useCallback(() => {
    configureAxiosHeaders(null)
    configUser(null)
    window.location.replace('/login')
  }, [])

  // Synchronize logout across all browser tabs
  useLogoutSync(logout)

  useEffect(() => {
    const responseInterceptor = axiosApi.interceptors.response.use(
      (response) => {
        if ((response.status === 200 || response.status === 201) && response.config.responseType != 'blob') {
          response.data = response.data.data
        }
        return response
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          logout()
        }
        if (error.response && error.response.status === 403 && error.response.data.message) {
          alertSwal({ type: AlertTypeEnum.ErrorNotification, title: error.response.data.message })
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosApi.interceptors.response.eject(responseInterceptor)
    }
  }, [logout])

  useEffect(() => {
    if (authToken) {
      axiosApi.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
    }
  }, [authToken])

  const updateUser = useCallback((user: IUser) => {
    configUser(user)
  }, [])

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!isFetchingUser && authToken && user) {
  //       setIsFetchingUser(true)
  //       try {
  //         // const response = await axiosApi.get(`/users/${user.id}`)
  //         console.log('entro al fetch');
  //         const response = {
  //           id: 1,
  //           name: 'diego',
  //           email: 'email@gmail.com',
  //           email_verified_at: new Date('2025-03-20'),
  //           role_id: 1,
  //           user_status_id: 1
  //         }
  //         updateUser(response)
  //       } catch (error) {
  //         console.error('Error fetching user profile', error)
  //       }
  //     }
  //   }
  //
  //   fetchUser()
  // }, [authToken, isFetchingUser, updateUser, user])

  const saveAuth = (accessToken: string, user: IUser) => {
    console.log(user)
    try {
      configureAxiosHeaders(accessToken)
      configUser(user)
    } catch (error) {
      console.error('Authentication error', error)
      throw error
    }
  }

  const isAuth = !!authToken

  const value = {
    authToken,
    user,
    isAuth,
    saveAuth,
    updateUser,
    logout,
    axiosApi
  }

  return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
}
