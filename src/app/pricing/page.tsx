'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DailyPriceCard from '@/components/DailyPriceCard'
import { pricingService } from '@/services/pricingService'
import { DailyPrice } from '@/types'

export default function PricingPage() {
  const [prices, setPrices] = useState<DailyPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await pricingService.getDailyPrices()
        if (response.success && response.data) {
          setPrices(response.data)
        }
      } catch (error) {
        console.error('Error fetching prices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Bảng Giá
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Mít Hôm Nay</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Giá mít được cập nhật hàng ngày, minh bạch và cạnh tranh nhất thị trường.
              Liên hệ ngay để được báo giá chi tiết!
            </p>
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={`skeleton-${item}`} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-80"></div>
                </div>
              ))}
            </div>
          ) : (
            /* Price Cards */
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {prices.map((price, index) => (
                <motion.div
                  key={`price-card-${price.date}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <DailyPriceCard
                    date={price.date}
                    mitType1={price.mitType1}
                    mitType2={price.mitType2}
                    mitCL={price.mitCL}
                    mitCho={price.mitCho}
                    isLatest={index === 0}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Contact Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Cần tư vấn giá mít?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và báo giá mít chi tiết theo từng loại và số lượng
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:0842879238"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  📞 Gọi ngay: 0842 879 238
                </motion.a>
                <motion.a
                  href="mailto:khoapham1509.kp@gmail.com"
                  className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✉️ Gửi email tư vấn
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
