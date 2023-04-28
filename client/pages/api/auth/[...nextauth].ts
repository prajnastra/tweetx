import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosResponse } from 'axios'

interface AuthResponse {
  id: string
  first_name: string
  last_name: string
  role: number
  email: string
  access: string
  refresh: string
}

const refreshAccessToken = async (token: any) => {
  const response: AxiosResponse<{ access: string }, any> = await axios.post(
    `${process.env.API}/api/refresh`,
    {
      refresh: token.tokens.refresh,
    }
  )

  if (response.status === 200 && response.data.access) {
    return {
      ...token,
      tokens: {
        access: response.data.access,
        refresh: token.tokens.refresh,
      },
      expiresAt: Date.now() + 5000,
    }
  }

  return {
    ...token,
    error: 'RefreshAccessTokenError',
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'api-auth',
      name: 'Server Auth',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials) {
        const user: AxiosResponse<AuthResponse> = await axios.post(
          `${process.env.API}/api/login`,
          credentials
        )
        console.log(user.status)
        if (user.status === 200) {
          return {
            id: user.data.id,
            email: user.data.email,
            first_name: user.data.first_name,
            last_name: user.data.last_name,
            user_type: user.data.role === 0 ? 'CUSTOMER' : 'ADMIN',
            tokens: {
              access: user.data.access,
              refresh: user.data.refresh,
            },
          }
        }

        throw new Error(
          JSON.stringify({
            errors: 'err',
            status: false,
          })
        )
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          ...user,
        }
      }

      if (Date.now() < token.expiresAt) {
        return token
      }

      const newToken = await refreshAccessToken(token)
      return newToken
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.tokens.access

      if (user) {
        session.user = {
          ...user,
          id: token.id,
          first_name: token.first_name,
          last_name: token.last_name,
          email: token.email,
          user_type: token.user_type,
        }
      } else {
        session.user = {
          id: token.id,
          first_name: token.first_name,
          last_name: token.last_name,
          email: token.email,
          user_type: token.user_type,
        }
      }

      return session
    },
  },
  debug: true,
} as NextAuthOptions

export default NextAuth(authOptions)
