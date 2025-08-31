'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, User, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'
import Button from '@/components/Button'
import {CONTACT_INFO} from "@/constants";

interface FormData {
  name: string
  phoneNumber: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên của bạn')
      return false
    }

    if (formData.name.trim().length < 2) {
      setError('Tên phải có ít nhất 2 ký tự')
      return false
    }

    if (!formData.phoneNumber.trim()) {
      setError('Vui lòng nhập số điện thoại')
      return false
    }

    // Vietnamese phone number validation
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      setError('Số điện thoại không đúng định dạng')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const registerData = {
        fullName: formData.name.trim(),
        phoneNumber: formData.phoneNumber.replace(/\s/g, '')
      }

      const result = await authService.register(registerData)

      if (result.success) {
        setSuccess('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...')

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(result.message || 'Đăng ký thất bại. Vui lòng thử lại.')
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200 rounded-full blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-200 rounded-full blur-lg opacity-50 animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-green-300 rounded-full blur-md opacity-60 animate-pulse delay-500"></div>
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Register Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Đăng Ký Tài Khoản
            </h1>
            <p className="text-gray-600">
              Tạo tài khoản để trải nghiệm dịch vụ của chúng tôi
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Nhập họ và tên của bạn"
                  required
                  disabled={loading || !!success}
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Nhập số điện thoại"
                  required
                  disabled={loading || !!success}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Ví dụ: 0901234567
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !!success}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Đang đăng ký...
                </div>
              ) : success ? (
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Đăng ký thành công
                </div>
              ) : (
                'Đăng ký'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link
                href="/login"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Về trang chủ
              </Link>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              Bằng cách đăng ký, bạn đồng ý với{' '}
              <Link href="/terms" className="text-green-600 hover:underline">
                Điều khoản sử dụng
              </Link>
              {' '}và{' '}
              <Link href="/privacy" className="text-green-600 hover:underline">
                Chính sách bảo mật
              </Link>
              {' '}của chúng tôi.
            </p>
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
            Cần hỗ trợ đăng ký?
          </p>
          <a
            href="tel:0842879238"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            {CONTACT_INFO.PHONE}
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
