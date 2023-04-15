import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosResponse } from 'axios'

interface AuthResponse {
  id: string
  first_name: string
  last_name?: string
  avatar: string
  email: string
  role: number
  access: string
  refresh: string
  otp_verification: boolean
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
        first_name: { label: 'first_name', type: 'text' },
        last_name: { label: 'last_name', type: 'text' },
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials) {
        const user: AxiosResponse<AuthResponse> = await axios.post(
          `${process.env.API}/api/login`,
          credentials
        )

        if (user.status === 200) {
          return {
            id: user.data.id,
            email: user.data.email,
            first_name: user.data.first_name,
            last_name: user.data.last_name,
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
          expiresAt: Date.now() + 9000,
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
        }
      } else {
        session.user = {
          id: token.id,
          first_name: token.first_name,
          last_name: token.last_name,
          email: token.email,
        }
      }

      return session
    },
  },
  debug: true,
} as NextAuthOptions

export default NextAuth(authOptions)
