'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface PriceCardProps {
  readonly name: string;
  readonly price: number;
  readonly createAt: string;
  readonly trend?: 'up' | 'down' | 'stable';
  readonly index: number;
}

export default function PriceCard({ name, price, createAt, trend = 'stable', index }: PriceCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500 text-xl">↗</span>;
      case 'down':
        return <span className="text-red-500 text-xl">↘</span>;
      default:
        return <span className="text-gray-500 text-xl">→</span>;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'border-l-green-500 bg-green-50';
      case 'down':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTrendBadgeStyle = () => {
    switch (trend) {
      case 'up':
        return 'bg-green-100 text-green-700';
      case 'down':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case 'up':
        return 'Tăng giá';
      case 'down':
        return 'Giảm giá';
      default:
        return 'Ổn định';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      className={`bg-white rounded-xl shadow-md border-l-4 ${getTrendColor()} p-4 mb-4 hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">🥭</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg leading-tight">{name}</h3>
            <p className="text-sm text-gray-500">Giá hôm nay</p>
          </div>
        </div>
        {getTrendIcon()}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-right flex-1">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {formatPrice(price)}
          </div>
          <div className="text-xs text-gray-500">
            Cập nhật: {formatDate(createAt)}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Trạng thái:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendBadgeStyle()}`}>
            {getTrendText()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
