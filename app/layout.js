import './globals.css'
// import { AuthProvider } from '@/contexts/AuthContext'
import { AuthProvider } from './contexts/AuthContext'
// import NavBar from '@/components/NavBar'
import NavBar from './components/NavBar'

export const metadata = {
  title: 'Game Finder',
  description: 'Find and join local games',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}