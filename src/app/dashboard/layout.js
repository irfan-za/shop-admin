import '@/app/globals.css'
import HeaderDashboard from '@/components/HeaderDashboard';


export default function DashboardLayout({ children }) {
  return (
    <html className="bg-gray-100">
        <body>
          <div className="min-h-screen flex flex-col">
            <HeaderDashboard/>
            {children}
          </div>
        </body>
    </html>
  )
}
