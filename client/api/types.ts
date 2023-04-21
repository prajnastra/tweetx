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
