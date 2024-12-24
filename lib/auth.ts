// import NextAuth, { User as NextAuthUser } from "next-auth";
// import { getUser } from "./actions";
// import Credentials from "next-auth/providers/credentials";

// interface User extends NextAuthUser {
//   user_password: string;
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         try {
//           const user = await getUser(credentials?.email as string);

//           if (!user) {
//             return null;
//           }

//           if (user.user_password !== credentials?.password) {
//             return null;
//           }

//           return user;
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, credentials }) {
//       if (!user) {
//         return false;
//       }
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/signin",
//   },
// });
