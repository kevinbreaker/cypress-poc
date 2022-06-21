import { AxiosResponse } from 'axios'
import { fetch } from './index'

type SigninParameters = {
  username: string
  password: string
}

type SigninResponse = Promise<AxiosResponse<{
  id: number
  name: string
  email: string
  document: string
  phone: string
  token: string
}>>

export function signin(auth: SigninParameters): SigninResponse {
  return fetch({
    method: 'POST',
    path: 'auth',
    data: auth,
  })
}

// export function getMe(): GetMeResponse {
//   return fetch({
//     path: 'auth/me',
//   })
// }
