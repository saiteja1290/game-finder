import './globals.css'
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
        <NavBar />
        {children}
      </body>
    </html>
  )
}