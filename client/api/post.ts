import axios from 'axios'

import { API } from '@/utils'
import { CreatePostPayload } from './types'

export const createPostAPI = async (
  url: string,
  { arg }: { arg: CreatePostPayload }
) =>
  await axios
    .post(
      `${API}${url}`,
      { content: arg.content },
      {
        headers: {
          Authorization: `Bearer ${arg.accessToken}`,
        },
      }
    )
    .then((res) => res.data)
