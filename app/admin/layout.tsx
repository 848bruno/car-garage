import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  
  // Check if we're on the login page
  const isLoginPage = new URL(cookies().get('next-url')?.value || '/', 'http://localhost').pathname === '/admin/login'

  if (!session && !isLoginPage) {
    redirect('/admin/login')
  }

  if (session && isLoginPage) {
    redirect('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-dark-100">
      <nav className="bg-dark-200 border-b border-dark-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary-500">Admin Dashboard</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}