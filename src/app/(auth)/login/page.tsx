'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button'
import { UserRole } from "@/consts/constantEnum"

type LoginStep = 'phone' | 'role-check' | 'customer-login' | 'admin-login'

export default function LoginPage() {
  const router = useRouter()
  const { login: authLogin } = useAuth()
  const [step, setStep] = useState<LoginStep>('phone')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    adminPassword: ''
  })

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber.trim()) {
      setError('Vui lòng nhập số điện thoại')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await authService.checkUserRole(phoneNumber)
      
      if (response.success && response.response != null) {
        if (response.response.userRole === UserRole.Customer) {
          await handleCustomerAutoLogin()
        } else {
          setStep('admin-login')
        }
      } else {
        setError('Không thể kiểm tra vai trò người dùng')
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleCustomerAutoLogin = async () => {
    try {
      const loginData = {
        grant_type: 'password',
        username: 'edusmartAI@gmail.com',
        password: 'Edusmart@123',
        phoneNumber: phoneNumber
      }

      const response = await authService.login(loginData)

      if (response.success && response.response) {
        await authLogin()
        router.push('/')
      } else {
        setError('Đăng nhập thất bại')
      }
    } catch {
      setError('Có lỗi xảy ra khi đăng nhập.')
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const loginData = {
        grant_type: 'password',
        username: 'admin@vuamitkhoa.com', // Dùng username mặc định cho admin
        password: formData.adminPassword,
        phoneNumber: phoneNumber
      }

      const response = await authService.login(loginData)

      if (response.success && response.response) {
        await authLogin()
        router.push('/')
      } else {
        setError('Đăng nhập thất bại');
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false)
    }
  }

  const resetToPhoneStep = () => {
    setStep('phone')
    setError('')
    setFormData({ username: '', password: '', adminPassword: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200 rounded-full blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-200 rounded-full blur-lg opacity-50 animate-bounce"></div>
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Đăng Nhập
            </h1>
            <p className="text-gray-600">
              {step === 'phone' && 'Nhập số điện thoại để tiếp tục'}
              {step === 'admin-login' && 'Nhập thông tin đăng nhập quản trị viên'}
            </p>
          </div>

          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          {/* Phone Number Step */}
          {step === 'phone' && (
            <motion.form
              onSubmit={handlePhoneSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Đang kiểm tra...' : 'Tiếp tục'}
              </Button>
            </motion.form>
          )}

          {/* Admin Login Step */}
          {step === 'admin-login' && (
            <motion.form
              onSubmit={handleAdminLogin}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Vai trò:</span> Quản trị viên
                </p>
                <p className="text-sm text-blue-600">
                  Vui lòng nhập thông tin đăng nhập
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.adminPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, adminPassword: e.target.value }))}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetToPhoneStep}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </div>
            </motion.form>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link
                href="/register"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Về trang chủ
              </Link>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-600 mb-2">
            Cần hỗ trợ đăng nhập?
          </p>
          <a
            href="tel:0842879238"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            0842 879 238
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
