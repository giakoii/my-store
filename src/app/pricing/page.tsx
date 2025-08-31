'use client'
import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { CalendarDays, RefreshCw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DailyPriceCard from '@/components/DailyPriceCard'
import Pagination from '@/components/Pagination'
import DateFilter from '@/components/DateFilter'
import { pricingService } from '@/services/pricingService'
import { BatchPricingResponse, PricingPaginationRequest } from '@/types'

export default function PricingPage() {
  const [prices, setPrices] = useState<BatchPricingResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize] = useState(6) // Mobile-optimized page size
  const [refreshing, setRefreshing] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<{ fromDate?: string; toDate?: string }>({})

  const fetchPrices = useCallback(async (params?: PricingPaginationRequest) => {
    try {
      setLoading(true)
      const response = await pricingService.getBatchPricings(params)

      if (response.success && response.response) {
        setPrices(response.response.data)
        setTotalPages(response.response.totalPages)
        setTotalCount(response.response.totalCount)
        setCurrentPage(response.response.page)
        setError('')
      } else {
        setError(response.message || 'Có lỗi xảy ra khi tải dữ liệu')
        setPrices([])
      }
    } catch (error) {
      console.error('Error fetching prices:', error)
      setError('Có lỗi xảy ra khi tải dữ liệu')
      setPrices([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    fetchPrices({ page, pageSize, ...currentFilter })
  }, [pageSize, fetchPrices, currentFilter])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchPrices({ page: currentPage, pageSize, ...currentFilter })
    setRefreshing(false)
  }, [currentPage, pageSize, fetchPrices, currentFilter])

  const handleDateFilter = useCallback((fromDate?: string, toDate?: string) => {
    const newFilter = { fromDate, toDate }
    setCurrentFilter(newFilter)
    setCurrentPage(1) // Reset to first page when filtering
    fetchPrices({ page: 1, pageSize, ...newFilter })
  }, [pageSize, fetchPrices])

  useEffect(() => {
    fetchPrices({ page: 1, pageSize })
  }, [fetchPrices, pageSize])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
              Bảng Giá
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Mít Hôm Nay</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Giá mít được cập nhật hàng ngày, minh bạch và cạnh tranh.
              Liên hệ ngay để được báo giá chi tiết!
            </p>

            {/* Stats for mobile */}
            {totalCount > 0 && (
              <div className="mt-6 flex justify-center items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  <span>{totalCount} bảng giá</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div>Trang {currentPage}/{totalPages}</div>
              </div>
            )}
          </motion.div>

          {/* Filter and Refresh Controls */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <DateFilter
              onFilter={handleDateFilter}
              loading={loading || refreshing}
              className="order-2 sm:order-1"
            />

            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="order-1 sm:order-2 inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Đang tải...' : 'Làm mới'}
            </button>
          </motion.div>

          {/* Price Cards Grid */}
          <div className="space-y-6">
            {loading && !refreshing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={`skeleton-${index}`} className="animate-pulse">
                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <motion.div
                className="text-center py-12 sm:py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
                  <div className="text-red-600 mb-4">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Không thể tải dữ liệu giá</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{error}</p>
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {refreshing ? 'Đang tải...' : 'Thử lại'}
                  </button>
                </div>
              </motion.div>
            ) : prices.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {prices.map((batch, index) => (
                    <motion.div
                      key={batch.pricingBatchId}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <DailyPriceCard
                        title={batch.title}
                        date={new Date(new Date(batch.createdAt).getTime() + (7 * 60 * 60 * 1000)).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        description={batch.description}
                        prices={batch.priceDetails.map(detail => ({
                          type: detail.typeName,
                          price: detail.price,
                          unit: 'VND/kg'
                        }))}
                        isLatest={currentPage === 1 && index === 0}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    className="mt-8 sm:mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      loading={loading}
                      className="justify-center"
                    />
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                className="text-center py-12 sm:py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Chưa có dữ liệu giá</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">Hiện tại chưa có bảng giá nào được đăng tải.</p>
                  <a
                    href="tel:0842879238"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors inline-block text-sm sm:text-base"
                  >
                    📞 Gọi để hỏi giá: 0842 879 238
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Contact CTA */}
          <motion.div
            className="mt-12 sm:mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Cần tư vấn giá cụ thể?</h2>
              <p className="text-base sm:text-lg mb-6 text-green-100">
                Liên hệ trực tiếp với chúng tôi để được báo giá chính xác nhất
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:0842879238"
                  className="bg-white text-green-600 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center text-sm sm:text-base"
                >
                  📞 Gọi ngay: 0842 879 238
                </a>
                <a
                  href="#contact"
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center text-sm sm:text-base"
                >
                  💬 Nhắn tin tư vấn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
