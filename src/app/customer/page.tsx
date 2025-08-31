'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function CustomerPage() {
  const router = useRouter()
  const { isAuthenticated, user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login')
        return
      }

      if (user?.role !== 'Customer') {
        router.push('/')
        return
      }
    }
  }, [loading, isAuthenticated, user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'Customer') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Trang Khách Hàng
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-600">Chào mừng bạn đến với trang khách hàng!</p>
          <p className="text-sm text-gray-500 mt-2">
            Trang này đang được phát triển. Vui lòng quay lại sau.
          </p>
        </div>
      </div>
    </div>
  )
}
