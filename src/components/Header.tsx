'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

const navigation = [
    { name: 'Trang chủ', href: '/home' },
    { name: 'Giá cả', href: '/pricing' },
    { name: 'Sản phẩm', href: '#products' },
    { name: 'Về chúng tôi', href: '#about' },
    { name: 'Liên hệ', href: '#contact' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Top contact bar */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>0842 879 238</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>khoapham1509.kp@gmail.com</span>
                        </div>
                    </div>
                    <a
                        href="https://maps.app.goo.gl/cSizV3SU5sSEoRHR6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <MapPin className="w-4 h-4" />
                        <span>Tiền Giang, Việt Nam</span>
                    </a>
                </div>
            </div>

            {/* Main header */}
            <motion.header
                className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/90 backdrop-blur-lg shadow-xl border border-white/20' 
                        : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-sm opacity-60"></div>
                                <img
                                    src="/images/logo.png"
                                    alt="Vựa mít Khoa"
                                    className="relative h-10 w-10 rounded-full object-cover border-2 border-white shadow-lg"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    Vựa Mít Khoa
                                </h1>
                                <p className="text-xs text-gray-600">Mít ngon từ đồng ruộng</p>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navigation.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="relative text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {item.name}
                                    <motion.div
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.a>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <motion.button
                            className="hidden md:block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Liên hệ ngay
                        </motion.button>

                        {/* Mobile menu button */}
                        <motion.button
                            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-6 space-y-4">
                                {navigation.map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        className="block text-gray-700 hover:text-green-600 font-medium py-2"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                                <motion.button
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold mt-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Đặt hàng ngay
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    )
}
