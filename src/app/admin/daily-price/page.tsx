'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, DollarSign, Save, TrendingUp, Calendar, Package, X } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { productTypeService } from '@/services/productTypeService'
import { pricingService } from '@/services/pricingService'
import { ProductType, BatchPricingRequest } from '@/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDailyPricePage() {
  const router = useRouter()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showAddProductType, setShowAddProductType] = useState(false)
  const [newTypeName, setNewTypeName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  const [priceForm, setPriceForm] = useState({
    title: `Giá mít hôm nay - ${new Date().toLocaleDateString('vi-VN')}`,
    description: 'Bảng giá mít cập nhật hàng ngày',
    prices: {} as Record<number, string>
  })

  // Check authentication and admin role
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || user?.role !== 'Admin') {
        router.push('/login')
        return
      }
    }
  }, [authLoading, isAuthenticated, user, router])

  // Fetch product types on mount
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setLoading(true)
        const response = await productTypeService.getProductTypes()
        if (response.success && response.response) {
          setProductTypes(response.response)
          // Initialize price form with empty prices
          const initialPrices = response.response.reduce((acc, type) => {
            acc[type.productTypeId] = ''
            return acc
          }, {} as Record<number, string>)
          setPriceForm(prev => ({ ...prev, prices: initialPrices }))
        } else {
          setError(response.message || 'Không thể tải danh sách loại mít')
        }
      } catch {
        setError('Có lỗi xảy ra khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user?.role === 'Admin') {
      fetchProductTypes()
    }
  }, [isAuthenticated, user])

  const handlePriceChange = (productTypeId: number, value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '')
    setPriceForm(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [productTypeId]: numericValue
      }
    }))
  }

  const handleCreateProductType = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTypeName.trim()) {
      setError('Vui lòng nhập tên loại mít')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await productTypeService.createProductType({
        typeName: newTypeName.trim()
      })

      if (response.success) {
        setSuccess('Tạo loại mít mới thành công!')
        setNewTypeName('')
        setShowAddProductType(false)
        
        // Refresh product types
        const refreshResponse = await productTypeService.getProductTypes()
        if (refreshResponse.success && refreshResponse.response) {
          setProductTypes(refreshResponse.response)
          // Update price form
          const updatedPrices = refreshResponse.response.reduce((acc, type) => {
            acc[type.productTypeId] = priceForm.prices[type.productTypeId] || ''
            return acc
          }, {} as Record<number, string>)
          setPriceForm(prev => ({ ...prev, prices: updatedPrices }))
        }

        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(response.message || 'Có lỗi xảy ra khi tạo loại mít mới')
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitPrices = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      // Validate form
      const priceDetails = Object.entries(priceForm.prices)
        .filter(([, price]) => price.trim() !== '')
        .map(([productTypeId, price]) => ({
          productTypeId: parseInt(productTypeId),
          price: parseInt(price)
        }))

      if (priceDetails.length === 0) {
        setError('Vui lòng nhập ít nhất một giá sản phẩm')
        return
      }

      const requestData: BatchPricingRequest = {
        title: priceForm.title,
        description: priceForm.description,
        priceDetails
      }

      const result = await pricingService.createBatchPricing(requestData)

      if (result.success) {
        setSuccess('Đăng giá thành công!')
        // Reset form
        const resetPrices = productTypes.reduce((acc, type) => {
          acc[type.productTypeId] = ''
          return acc
        }, {} as Record<number, string>)
        setPriceForm({
          title: `Giá mít hôm nay - ${new Date().toLocaleDateString('vi-VN')}`,
          description: 'Bảng giá mít cập nhật hàng ngày',
          prices: resetPrices
        })
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(result.message || 'Có lỗi xảy ra khi đăng giá')
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated admin (will redirect)
  if (!isAuthenticated || user?.role !== 'Admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Quản Lý Giá
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Hằng Ngày</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Đăng và quản lý giá mít hằng ngày cho khách hàng
            </p>
          </motion.div>

          {/* Success/Error Messages */}
          <AnimatePresence>
            {success && (
              <motion.div
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {success}
              </motion.div>
            )}

            {error && (
              <motion.div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Price Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <DollarSign className="w-7 h-7 mr-3 text-green-600" />
                  Đăng Giá Hôm Nay
                </h2>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleSubmitPrices} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      value={priceForm.title}
                      onChange={(e) => setPriceForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      disabled={submitting}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả
                    </label>
                    <input
                      type="text"
                      value={priceForm.description}
                      onChange={(e) => setPriceForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      disabled={submitting}
                    />
                  </div>

                  {/* Price Inputs */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                      Giá các loại mít
                    </h3>
                    <div className="grid gap-4">
                      {productTypes.map((type) => (
                        <div key={type.productTypeId} className="group">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {type.typeName}
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={priceForm.prices[type.productTypeId] || ''}
                              onChange={(e) => handlePriceChange(type.productTypeId, e.target.value)}
                              placeholder={`Nhập giá ${type.typeName}`}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent group-hover:border-green-400 transition-colors"
                              disabled={submitting}
                            />
                            {priceForm.prices[type.productTypeId] && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                                VND/kg
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full py-4 text-lg"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Đang đăng giá...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Save className="w-5 h-5 mr-2" />
                        Đăng Giá Hôm Nay
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Product Type Management */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Package className="w-7 h-7 mr-3 text-blue-600" />
                  Quản Lý Loại Mít
                </h2>
                <Button
                  onClick={() => setShowAddProductType(true)}
                  size="sm"
                  className="flex items-center"
                  disabled={submitting}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm loại mít
                </Button>
              </div>

              {/* Add Product Type Form */}
              <AnimatePresence>
                {showAddProductType && (
                  <motion.div
                    className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <form onSubmit={handleCreateProductType} className="flex gap-3">
                      <input
                        type="text"
                        value={newTypeName}
                        onChange={(e) => setNewTypeName(e.target.value)}
                        placeholder="Nhập tên loại mít mới"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={submitting}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        disabled={submitting}
                      >
                        {submitting ? 'Đang tạo...' : 'Tạo'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowAddProductType(false)
                          setNewTypeName('')
                        }}
                        disabled={submitting}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Product Types List */}
              {loading ? (
                <div className="space-y-3">
                  {[...Array(9)].map((_, index) => (
                    <div key={index} className="animate-pulse flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {productTypes.map((type, index) => (
                    <motion.div
                      key={type.productTypeId}
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {type.productTypeId}
                        </div>
                        <span className="font-medium text-gray-800">{type.typeName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">ID: {type.productTypeId}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{productTypes.length}</div>
                    <div className="text-sm text-gray-600">Loại mít</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">
                      {Object.values(priceForm.prices).filter(p => p.trim() !== '').length}
                    </div>
                    <div className="text-sm text-gray-600">Đã nhập giá</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Thao tác nhanh</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/pricing"
                  className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Xem bảng giá công khai
                </a>
                <Link
                  href="/"
                  className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
