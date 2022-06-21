import { AxiosResponse } from 'axios'
import { fetch } from './index'

export type User = {
  id: number
  name: string
  email: string
  cpf: string
  phone: string
  address: string
}

type UsersResponse = Promise<AxiosResponse<User[]>>

export function getUsers(): UsersResponse {
  return fetch({
    path: 'users',
  })
}

export function postUser(data: Omit<User, 'id'>): Promise<AxiosResponse> {
  return fetch({
    path: 'users',
    method: 'POST',
    data
  })
}
