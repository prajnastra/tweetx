import axios from 'axios'

import { API } from '@/utils'
import { Posts } from '@/types'
import { CreatePostPayload, PostLikePayload } from './types'

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

export const getAllPostsAPI = async (
  url: string,
  token: string
): Promise<Posts> =>
  await axios
    .get(`${API}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

export const postLikeToggleAPI = async (
  url: string,
  { arg }: { arg: PostLikePayload }
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
