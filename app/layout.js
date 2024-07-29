import './globals.css'
import { AuthProvider } from './contexts/AuthContext'
import NavBar from './components/NavBar'
import { ThemeProvider } from './components/theme-provider'
export const metadata = {
  title: 'Game Finder',
  description: 'Find and join local games',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}