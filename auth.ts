import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        // Hardcoded credentials
        const hardcodedUser = {
          email: 'admin@example.com',
          password: '123456', 
        };

        // Validate credentials
        if (
          credentials?.email === hardcodedUser.email &&
          credentials?.password === hardcodedUser.password
        ) {
          // Return user object on success
          return { id: '1', name: 'Admin', email: hardcodedUser.email };
        }

        console.log('Invalid credentials');
        return null; // Return null if authentication fails
      },
    }),
  ],
  // Optional: Customize pages for errors or redirects
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error page
  },
  // Optional: Enable debug mode for development
  debug: process.env.NODE_ENV === 'development',
});
