'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin, User, LogOut, UserCircle, ChevronDown, DollarSign } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { NAVIGATION_ITEMS, CONTACT_INFO } from '@/constants'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button'
import AdminPriceForm from '@/components/AdminPriceForm'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [showPriceForm, setShowPriceForm] = useState(false)
    const { isScrolled } = useScrollPosition()
    const { user, loading, isAuthenticated, logout } = useAuth()

    const handleLogout = () => {
        logout()
        setIsUserMenuOpen(false)
        window.location.href = '/'
    }

    const handleShowPriceForm = () => {
        setShowPriceForm(true)
        setIsUserMenuOpen(false)
    }

    return (
        <>
            {/* Top contact bar */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{CONTACT_INFO.PHONE}</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{CONTACT_INFO.EMAIL}</span>
                        </div>
                    </div>

                    {/* Auth Info in top bar */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated && user && (
                            <div className="hidden md:flex items-center space-x-2 text-xs">
                                <UserCircle className="w-4 h-4" />
                                <span>Xin chào, {user.name}!</span>
                            </div>
                        )}
                        <a
                            href={CONTACT_INFO.GOOGLE_MAPS}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <MapPin className="w-4 h-4" />
                            <span className="hidden md:inline">{CONTACT_INFO.ADDRESS}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <motion.header
                className={`fixed w-full top-[42px] z-40 transition-all duration-300 ${
                    isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href="/">
                                <div className="relative">
                                    <Image
                                        alt="Vựa mít Khoa"
                                        src="/images/logo.png"
                                        width={48}
                                        height={48}
                                        className="rounded-full shadow-lg"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400/20 to-transparent"></div>
                                </div>
                            </Link>
                            <div>
                                <Link href="/">
                                    <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            Vựa Mít Khoa
                                        </span>
                                    </h1>
                                </Link>
                                <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-green-100'}`}>
                                    Thu mua mít giá cao
                                </p>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {NAVIGATION_ITEMS.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className={`font-medium transition-colors duration-300 ${
                                        isScrolled
                                            ? 'text-gray-700 hover:text-green-600'
                                            : 'text-white hover:text-green-200'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                </motion.a>
                            ))}

                            {/* Auth Section */}
                            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/20">
                                {loading ? (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                                ) : isAuthenticated && user ? (
                                    /* Authenticated User Menu */
                                    <div className="relative">
                                        <motion.button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                                                isScrolled 
                                                    ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                                                    : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <UserCircle className="w-5 h-5" />
                                            <span className="font-medium">{user.name}</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                        </motion.button>

                                        <AnimatePresence>
                                            {isUserMenuOpen && (
                                                <motion.div
                                                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="px-4 py-3 border-b border-gray-100">
                                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.phoneNumber}</p>
                                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                                            user.role === 'Admin' 
                                                                ? 'bg-blue-100 text-blue-700' 
                                                                : 'bg-green-100 text-green-700'
                                                        }`}>
                                                            {user.role === 'Admin' ? 'Chủ cửa hàng' : 'Khách hàng'}
                                                        </span>
                                                    </div>

                                                    <div className="py-1">
                                                        {/* Admin exclusive feature */}
                                                        {user.role === 'Admin' && (
                                                            <button
                                                                onClick={handleShowPriceForm}
                                                                className="flex items-center w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors border-b border-gray-100"
                                                            >
                                                                <DollarSign className="w-4 h-4 mr-3" />
                                                                Đăng giá hôm nay
                                                            </button>
                                                        )}

                                                        <Link
                                                            href="/profile"
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                        >
                                                            <User className="w-4 h-4 mr-3" />
                                                            Thông tin cá nhân
                                                        </Link>

                                                        <button
                                                            onClick={handleLogout}
                                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                        >
                                                            <LogOut className="w-4 h-4 mr-3" />
                                                            Đăng xuất
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    /* Unauthenticated Auth Buttons */
                                    <div className="flex items-center space-x-3">
                                        <Link href="/login">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`${
                                                    isScrolled 
                                                        ? 'border-green-500 text-green-600 hover:bg-green-50' 
                                                        : 'border-white text-white hover:bg-white/10'
                                                }`}
                                            >
                                                Đăng nhập
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl"
                                            >
                                                Đăng ký
                                            </Button>
                                        </Link>
                                    </div>
                                )}

                                {/* Call Button */}
                                <motion.a
                                    href={`tel:${CONTACT_INFO.PHONE}`}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    📞 Gọi ngay
                                </motion.a>
                            </div>
                        </nav>

                        {/* Mobile menu button */}
                        <motion.button
                            className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-6 space-y-4">
                                {/* User Info Mobile */}
                                {isAuthenticated && user && (
                                    <div className="pb-4 border-b border-gray-200">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <UserCircle className="w-8 h-8 text-green-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                            user.role === 'Admin' 
                                                ? 'bg-blue-100 text-blue-700' 
                                                : 'bg-green-100 text-green-700'
                                        }`}>
                                            {user.role === 'Admin' ? 'Chủ cửa hàng' : 'Khách hàng'}
                                        </span>
                                    </div>
                                )}

                                {/* Navigation Links */}
                                {NAVIGATION_ITEMS.map((item) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        className="block py-2 text-gray-700 font-medium hover:text-green-600 transition-colors duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                        whileHover={{ x: 10 }}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}

                                {/* Mobile Auth Section */}
                                <div className="pt-4 border-t border-gray-200 space-y-3">
                                    {isAuthenticated ? (
                                        <div className="space-y-2">
                                            {/* Admin exclusive feature for mobile */}
                                            {user?.role === 'Admin' && (
                                                <button
                                                    onClick={handleShowPriceForm}
                                                    className="flex items-center py-2 text-blue-700 hover:text-blue-800 transition-colors"
                                                >
                                                    <DollarSign className="w-4 h-4 mr-3" />
                                                    Đăng giá hôm nay
                                                </button>
                                            )}

                                            <Link
                                                href="/profile"
                                                className="flex items-center py-2 text-gray-700 hover:text-green-600 transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <User className="w-4 h-4 mr-3" />
                                                Thông tin cá nhân
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full py-2 text-red-600 hover:text-red-700 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-2">
                                            <Link href="/login">
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-green-500 text-green-600 hover:bg-green-50"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Đăng nhập
                                                </Button>
                                            </Link>
                                            <Link href="/register">
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Đăng ký
                                                </Button>
                                            </Link>
                                        </div>
                                    )}

                                    <motion.a
                                        href={`tel:${CONTACT_INFO.PHONE}`}
                                        className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold shadow-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        📞 Gọi ngay: {CONTACT_INFO.PHONE}
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Admin Price Form Modal */}
                <AnimatePresence>
                    {showPriceForm && (
                        <AdminPriceForm
                            onClose={() => setShowPriceForm(false)}
                            onSuccess={() => {
                                setShowPriceForm(false);
                                // Có thể thêm logic để refresh data nếu cần
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    )
}
