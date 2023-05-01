import axios from 'axios'

import { API } from '@/utils'
import { User, FollowPayload } from './types'

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

export const followToggleAPI = async (
  url: string,
  { arg }: { arg: FollowPayload }
) =>
  await axios
    .post(
      `${API}${url}/${arg.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${arg.accessToken}`,
        },
      }
    )
    .then((res) => res.data)
