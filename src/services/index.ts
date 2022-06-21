import axios, { AxiosRequestConfig, AxiosResponse, } from 'axios'

import { UI } from '../store'

type FetchParams = {
  baseURL?: string
  path?: string
  headers?: { Authorization: string }
  data?: JSON | Record<string, unknown>
  params?: any
  method?: AxiosRequestConfig['method']
  removeStopLoading?: boolean
}

function requestInterceptor(config: any) {
  const ui = UI()
  ui.value.isLoading = true

  const token = localStorage.getItem('token')
  if (token)
    config.headers.Authorization = `Bearer ${token}`

  return config
}

export function fetch({
  method = 'GET',
  baseURL = `${import.meta.env.VITE_APP_BASE_URL || 'http://localhost:3000/api/v1'}/`,
  path,
  ...data
}: FetchParams): Promise<AxiosResponse> {
  const axiosInstance = axios.create()

  axiosInstance.interceptors.request.use(requestInterceptor)

  axiosInstance.interceptors.response.use(
    (config) => {
      const ui = UI()
      ui.value.isLoading = false
      return Promise.resolve(config)
    },
    (config) => {
      const ui = UI()
      ui.value.isLoading = false
      return Promise.reject(config)
    },
  )

  return axiosInstance({
    method,
    baseURL,
    url: path,
    ...data,
  })
}