import axios from 'axios'

import { API } from '@/utils'
import { User } from './types'

export const getAllUsersAPI = async (
  url: string,
  token: string
): Promise<Array<User>> =>
  await axios
    .get(`${API}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
