import axios from 'axios'

import { API } from '@/utils'
import { RegisterPayload } from './types'

export const registerAPI = async (
  url: string,
  { arg }: { arg: RegisterPayload }
) => await axios.post(`${API}${url}`, arg).then((res) => res.data)
