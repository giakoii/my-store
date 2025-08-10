'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'

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
                                <Image
                                    src="/images/logo.png"
                                    alt="Vựa mít Khoa"
                                    width={40}
                                    height={40}
                                    className="relative rounded-full object-cover border-2 border-white shadow-lg"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className={`font-bold text-lg ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                                    Vựa Mít Khoa
                                </span>
                                <span className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-emerald-100'}`}>
                                    Thu mua mít giá cao
                                </span>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navigation.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                        isScrolled 
                                            ? 'text-gray-700 hover:text-green-600' 
                                            : 'text-white hover:text-emerald-200'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </motion.a>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <motion.button
                            className="hidden md:block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📞 Gọi ngay
                        </motion.button>

                        {/* Mobile menu button */}
                        <motion.button
                            className="md:hidden p-2 rounded-lg"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMenuOpen ? (
                                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
                            ) : (
                                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-4 space-y-3">
                                {navigation.map((item) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-3 text-gray-800 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                        whileHover={{ x: 5 }}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                                <motion.button
                                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    📞 Gọi ngay
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    )
}
