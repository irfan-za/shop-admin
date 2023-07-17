import './globals.css'

export const metadata = {
  title: 'Shop Admin',
  description: 'Shop Admin page.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-scren bg-white">
      <body>
        {children}
      </body>
    </html>
  )
}
