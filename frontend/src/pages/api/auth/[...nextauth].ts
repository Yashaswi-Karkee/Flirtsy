// src/pages/api/auth/[...nextauth].ts
import axios from 'axios'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {},
      authorize: async (credentials: any) => {
        const res = await axios.post('http://localhost:8000/api/user/login/', {
          username: credentials.username,
          password: credentials.password,
        })

        if (res.data) {
          return { status: 'success', data: res.data }
        } else {
          return null
        }
      },
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.data.token;
      }
      return token
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session
    },
  },
})