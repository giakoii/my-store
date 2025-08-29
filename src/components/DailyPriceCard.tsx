// filepath: /Users/giakhoi/CodeProject/WebstormProjects/vua-mit-khoa/src/components/DailyPriceCard.tsx

'use client'
import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Star } from 'lucide-react'
import { formatPrice } from '@/utils'

interface PriceItem {
  type: string
  price: number
  unit: string
}

interface DailyPriceCardProps {
  title: string
  date: string
  description?: string
  prices: PriceItem[]
  isLatest?: boolean
}

export default function DailyPriceCard({
  title,
  date,
  description,
  prices,
  isLatest = false
}: Readonly<DailyPriceCardProps>) {
  const getColorForIndex = (index: number) => {
    const colors = ['text-green-600', 'text-blue-600', 'text-orange-600', 'text-purple-600', 'text-red-600'];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      className={`relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        isLatest 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 ring-2 ring-green-200 ring-opacity-50' 
          : 'bg-white border border-gray-200'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Latest Badge - Enhanced */}
      {isLatest && (
        <div className="absolute -top-4 -right-4">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 30 }}
          >
            <Star className="w-4 h-4 mr-2" />
            GIÁ MỚI NHẤT
            <motion.div
              className="absolute inset-0 rounded-full bg-white opacity-0"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className={`text-sm font-medium ${isLatest ? 'text-green-700' : ''}`}>
            {date}
          </span>
        </div>
        <TrendingUp className={`w-5 h-5 ${
          isLatest ? 'text-green-500 animate-pulse' : 'text-gray-400'
        }`} />
      </div>

      {/* Title - Enhanced for latest */}
      <h3 className={`text-xl font-bold mb-2 ${
        isLatest ? 'text-green-800' : 'text-gray-800'
      }`}>
        {title}
        {isLatest && (
          <motion.span
            className="ml-2 text-green-600"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🌟
          </motion.span>
        )}
      </h3>

      {/* Description */}
      {description && (
        <p className={`text-sm mb-4 ${
          isLatest ? 'text-green-700' : 'text-gray-600'
        }`}>
          {description}
        </p>
      )}

      {/* Price List - Enhanced */}
      <div className="space-y-3">
        {prices.map((item, index) => (
          <motion.div
            key={`${item.type}-${index}`}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              isLatest 
                ? 'bg-green-50 hover:bg-green-100 border border-green-200' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <span className={`font-medium ${
              isLatest ? 'text-green-800' : 'text-gray-700'
            }`}>
              {item.type}
            </span>
            <div className="text-right">
              <span className={`text-lg font-bold ${
                isLatest 
                  ? 'text-green-600' 
                  : getColorForIndex(index)
              }`}>
                {formatPrice(item.price)}
              </span>
              <span className="text-xs text-gray-500 ml-1">{item.unit}</span>
              {isLatest && (
                <motion.span
                  className="ml-2 text-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA - Enhanced for latest */}
      <motion.div
        className="mt-6 pt-4 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="tel:0842879238"
          className={`w-full px-4 py-2 rounded-lg text-center font-medium transition-all duration-300 block ${
            isLatest
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📞 {isLatest ? 'Gọi ngay để đặt hàng' : 'Liên hệ báo giá'}
        </a>
      </motion.div>
    </motion.div>
  )
}
