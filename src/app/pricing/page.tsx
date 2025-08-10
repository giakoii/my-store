'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
            <header className="w-full bg-gradient-to-r from-green-700 to-emerald-600 py-4 shadow">
                <div className="max-w-7xl mx-auto flex items-center">
                    <Link href="/" className="flex items-center text-white hover:text-emerald-200 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Trang chủ
                    </Link>
                    <h2 className="ml-6 text-xl font-bold text-white">Cập nhật giá cả hàng ngày</h2>
                </div>
            </header>
            <main className="flex flex-1 items-center justify-center">
                <div className="bg-white/80 rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
                    <img
                        src="/images/price-update.svg"
                        alt="Cập nhật giá"
                        className="w-32 h-32 mb-6"
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(16,185,129,0.15))' }}
                        onError={e => (e.currentTarget.style.display = 'none')}
                    />
                    <h1 className="text-2xl font-bold text-green-700 mb-2">Tính năng đang được cập nhật</h1>
                    <p className="text-gray-600 text-center mb-4">
                        Trang cập nhật giá cả sẽ sớm ra mắt. Vui lòng quay lại sau!
                    </p>
                    <Link
                        href="/"
                        className="mt-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow hover:shadow-lg transition"
                    >
                        Quay về trang chủ
                    </Link>
                </div>
            </main>
        </div>
    )
}