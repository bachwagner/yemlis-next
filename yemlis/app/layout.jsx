import { Inter, Nunito, Paytone_One } from 'next/font/google'
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth'
import ThemeRegistry from '@/styles/ThemeRegistry'
import Nav from '@/components/Nav'
import { Container, Box } from '@mui/material';
const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({ subsets: ['latin'] })
const paytone = Paytone_One({ weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'Yemlis',
  description: 'Besin ve Menü Paylaşım Platformu',
}
export default async function RootLayout({ children }) {
  const session = await auth()
  console.log("root session")
  console.log(session)
  return (
    <SessionProvider session={session}  >
      <html lang="tr">
        <body className={nunito.className}>
          <ThemeRegistry options={{ key: 'mui-theme' }}>
            <main>
              <Nav />
              <Box sx={{ flexGrow: 1 }}>
                <Container sx={{
                  display: "grid",
                  justifyContent: "center",
                  flexDirection: "row",
                  height: "100vh",
                  // backgroundColor: "bisque",
                }} >
                  <section>
                    {children}
                  </section >
                </Container >
              </Box >
            </main >
          </ThemeRegistry >
        </body >
      </html >
    </SessionProvider >
  )
}




/*
import { AuthProvider } from './Providers';
import { Inter, Nunito, Paytone_One } from 'next/font/google'
import { auth } from '@/auth'
import ThemeRegistry from '@/styles/ThemeRegistry'
import Nav from '@/components/Nav'
import { AuthProvider } from './Providers';
import { Container, Box } from '@mui/material';
const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({ subsets: ['latin'] })
const paytone = Paytone_One({ weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'Yemlis',
  description: 'Besin ve Menü Paylaşım Platformu',
}
export default async function RootLayout({ children }) {
  const session = await auth()
  console.log("root session")
  console.log(session)
  return (
    <html lang="tr">
      <body className={nunito.className}>
        <ThemeRegistry options={{ key: 'mui-theme' }}>
          <AuthProvider session={session}  >

            <main>
              <Nav />
              <Box sx={{ flexGrow: 1 }}>
                <Container sx={{
                  display: "grid",
                  justifyContent: "center",
                  flexDirection: "row",
                  height: "100vh",
                  // backgroundColor: "bisque",
                }} >
                  <section>
                    {children}
                  </section>
                </Container>
              </Box>
            </main>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
 */





