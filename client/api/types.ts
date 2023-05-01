export interface RegisterPayload {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface CreatePostPayload {
  content: string
  accessToken: string
}

export interface Payload {
  accessToken: string
}

export interface PostLikePayload extends Payload {
  id: string
}

export interface FollowPayload extends Payload {
  id: string
}

export interface User {
  first_name: string
  last_name: string
  id: string
  followers: Array<string>
}
