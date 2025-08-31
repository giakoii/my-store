'use client'
import React, { useState } from 'react'
import { Calendar, X, Search, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DateFilterProps {
  onFilter: (fromDate?: string, toDate?: string) => void
  loading?: boolean
  className?: string
}

export default function DateFilter({ onFilter, loading = false, className = '' }: DateFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [hasActiveFilter, setHasActiveFilter] = useState(false)

  const formatDateForInput = (date: Date): string => {
    // Convert to Vietnam timezone (UTC+7)
    const vietnamDate = new Date(date.getTime() + (7 * 60 * 60 * 1000))
    return vietnamDate.toISOString().split('T')[0]
  }

  const formatDateForApi = (dateString: string): string => {
    if (!dateString) return ''
    // Return date in YYYY-MM-DD format only, no time component
    return dateString
  }

  const getTodayDate = (): string => {
    // Get current date in Vietnam timezone
    const now = new Date()
    const vietnamDate = new Date(now.getTime() + (7 * 60 * 60 * 1000))
    return vietnamDate.toISOString().split('T')[0]
  }

  const handleTodayFilter = () => {
    const today = getTodayDate()
    setFromDate(today)
    setToDate(today)
    setHasActiveFilter(true)
    onFilter(formatDateForApi(today), formatDateForApi(today))
    setIsOpen(false)
  }

  const handleCustomFilter = () => {
    if (!fromDate && !toDate) {
      return
    }

    setHasActiveFilter(true)
    onFilter(
      fromDate ? formatDateForApi(fromDate) : undefined,
      toDate ? formatDateForApi(toDate) : undefined
    )
    setIsOpen(false)
  }

  const handleClearFilter = () => {
    setFromDate('')
    setToDate('')
    setHasActiveFilter(false)
    onFilter()
    setIsOpen(false)
  }

  const handleReset = () => {
    setFromDate('')
    setToDate('')
  }

  return (
    <div className={`relative ${className}`}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`inline-flex items-center px-4 py-2 rounded-full border transition-all duration-200 ${
          hasActiveFilter 
            ? 'bg-green-500 text-white border-green-500 shadow-lg' 
            : 'bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Calendar className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">
          {hasActiveFilter ? 'Đã lọc' : 'Lọc theo ngày'}
        </span>
        {hasActiveFilter && (
          <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
        )}
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 z-40 sm:hidden"
              onClick={() => setIsOpen(false)}
              onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
              role="button"
              tabIndex={0}
              aria-label="Close filter"
            />

            {/* Filter Content */}
            <motion.div
              className="absolute top-12 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-0 sm:transform-none z-50 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  Lọc theo ngày
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Filter: Today */}
              <div className="mb-6">
                <button
                  onClick={handleTodayFilter}
                  disabled={loading}
                  className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 font-medium"
                >
                  📅 Giá hôm nay
                </button>
              </div>

              {/* Custom Date Range */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-700 mb-3">
                  Hoặc chọn khoảng thời gian:
                </div>

                {/* From Date */}
                <div>
                  <label htmlFor="from-date" className="block text-sm font-medium text-gray-600 mb-2">
                    Từ ngày
                  </label>
                  <input
                    id="from-date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    max={getTodayDate()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    disabled={loading}
                  />
                </div>

                {/* To Date */}
                <div>
                  <label htmlFor="to-date" className="block text-sm font-medium text-gray-600 mb-2">
                    Đến ngày
                  </label>
                  <input
                    id="to-date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    min={fromDate || undefined}
                    max={getTodayDate()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    disabled={loading}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleReset}
                    disabled={loading || (!fromDate && !toDate)}
                    className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Xóa
                  </button>
                  <button
                    onClick={handleCustomFilter}
                    disabled={loading || (!fromDate && !toDate)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center"
                  >
                    <Search className="w-4 h-4 mr-1" />
                    Lọc
                  </button>
                </div>

                {/* Clear All Filter */}
                {hasActiveFilter && (
                  <button
                    onClick={handleClearFilter}
                    disabled={loading}
                    className="w-full mt-3 px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 text-sm font-medium"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                )}
              </div>

              {/* Active Filter Display */}
              {hasActiveFilter && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Đang lọc:</div>
                  <div className="text-sm text-gray-700">
                    {fromDate && toDate && fromDate === toDate ? (
                      <span>📅 {new Date(fromDate).toLocaleDateString('vi-VN')}</span>
                    ) : (
                      <span>
                        {fromDate && `Từ ${new Date(fromDate).toLocaleDateString('vi-VN')}`}
                        {fromDate && toDate && ' - '}
                        {toDate && `đến ${new Date(toDate).toLocaleDateString('vi-VN')}`}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
