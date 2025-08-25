// filepath: /Users/giakhoi/CodeProject/WebstormProjects/vua-mit-khoa/src/components/DailyPriceCard.tsx

'use client'
import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Star } from 'lucide-react'
import { formatDate, formatPrice } from '@/utils'

interface DailyPriceCardProps {
  date: string
  mitType1: number
  mitType2: number
  mitCL: number
  mitCho: number
  isLatest?: boolean
}

export default function DailyPriceCard({
  date,
  mitType1,
  mitType2,
  mitCL,
  mitCho,
  isLatest = false
}: Readonly<DailyPriceCardProps>) {
  const priceItems = [
    { label: 'Mít I', price: mitType1, color: 'text-green-600' },
    { label: 'Mít II', price: mitType2, color: 'text-blue-600' },
    { label: 'Mít CL', price: mitCL, color: 'text-orange-600' },
    { label: 'Mít Chợ', price: mitCho, color: 'text-purple-600' }
  ]

  return (
    <motion.div
      className={`relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        isLatest 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' 
          : 'bg-white border border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Latest Badge */}
      {isLatest && (
        <div className="absolute -top-3 -right-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Mới nhất
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isLatest ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Calendar className={`w-5 h-5 ${isLatest ? 'text-green-600' : 'text-gray-600'}`} />
          </div>
          <div>
            <h3 className={`font-bold text-lg ${isLatest ? 'text-green-800' : 'text-gray-800'}`}>
              Giá mít hôm nay
            </h3>
            <p className="text-gray-600 text-sm">tại Vựa mít Khoa</p>
          </div>
        </div>
        <div className="flex items-center text-gray-500">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm">Cập nhật</span>
        </div>
      </div>

      {/* Date */}
      <div className={`mb-4 p-3 rounded-lg ${isLatest ? 'bg-green-100' : 'bg-gray-50'}`}>
        <p className={`text-center font-semibold ${isLatest ? 'text-green-800' : 'text-gray-800'}`}>
          {formatDate(date)}
        </p>
      </div>

      {/* Price List */}
      <div className="space-y-3">
        {priceItems.map((item, index) => (
          <motion.div
            key={`price-${item.label.replace(/\s+/g, '-')}`}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${item.color.replace('text-', 'bg-')}`}></div>
              <span className="font-medium text-gray-800">{item.label}:</span>
            </div>
            <div className="text-right">
              <span className={`text-lg font-bold ${item.color}`}>
                {formatPrice(item.price)}
              </span>
              <p className="text-xs text-gray-500">/kg</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        className="mt-6 pt-4 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.a
          href="tel:0842879238"
          className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
            isLatest
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          📞 Liên hệ ngay: 0842 879 238
        </motion.a>
      </motion.div>

      {/* Decorative element */}
      {isLatest && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-200/30 to-transparent rounded-bl-full -z-10"></div>
      )}
    </motion.div>
  )
}
