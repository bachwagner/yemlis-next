import { AuthProvider } from './Providers';

import { Inter, Nunito, Paytone_One } from 'next/font/google'
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
export default function RootLayout({ children }) {
  return (
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
                  <AuthProvider>
                    {children}
                  </AuthProvider>
                </section>
              </Container>
            </Box>
          </main>
        </ThemeRegistry>
      </body>
    </html>
  )
}