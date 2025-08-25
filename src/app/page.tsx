'use client'
import { motion } from 'framer-motion'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Carousel from "@/components/Carousel"
import Link from 'next/link'
import { services, stats, carouselImages } from '@/data/mockData'
import { ANIMATION_VARIANTS } from '@/constants'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section với Carousel */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200 rounded-full blur-xl opacity-70 animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">

            {/* Left Column - Hero Content */}
            <motion.div
              className="text-center lg:text-left"
              {...ANIMATION_VARIANTS.fadeInLeft}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                {...ANIMATION_VARIANTS.scaleIn}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Vựa Mít Khoa
                </span>
                <br />
                <span className="text-gray-800 text-2xl md:text-3xl lg:text-4xl">
                  Thu Mua Mít Giá Cao
                </span>
                <br />
                <span className="text-red-400 text-xl md:text-2xl lg:text-2xl">
                  Có mít - Có tiền liền tay
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
                {...ANIMATION_VARIANTS.fadeInUp}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Thu mua mít tận nơi với giá cao.
                Không giới hạn số lượng. Đối tác tin cậy của hơn 500 nông dân.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
                {...ANIMATION_VARIANTS.fadeInUp}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  📞 Gọi ngay: 0842 879 238
                </motion.button>

                <Link href="/pricing" passHref>
                  <motion.button
                      className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Xem bảng giá hôm nay
                  </motion.button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                {...ANIMATION_VARIANTS.fadeInUp}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={`stat-${stat.label.replace(/\s+/g, '-')}`}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <stat.icon className="w-6 h-6 text-green-600 mx-auto lg:mx-0 mb-2" />
                    <div className="text-xl font-bold text-gray-800">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Carousel */}
            <motion.div
              className="relative"
              {...ANIMATION_VARIANTS.fadeInRight}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                {/* Decorative elements for carousel */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl opacity-30"></div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl opacity-20"></div>

                {/* Carousel container */}
                <div className="relative z-10">
                  <Carousel
                    images={carouselImages}
                    autoSlide={true}
                    autoSlideInterval={4000}
                    showDots={true}
                    showArrows={true}
                    height="h-[400px] lg:h-[500px]"
                  />
                </div>
              </div>

              {/* Caption under carousel */}
              <motion.div
                className="mt-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-gray-600 text-sm">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-semibold">
                    Vựa Mít Khoa?
                  </span>
                  {' '}- Hình ảnh thực tế từ vườn mít
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Dịch Vụ
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Chuyên Nghiệp</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp dịch vụ thu mua mít toàn diện, từ tư vấn đến thu mua tận nơi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={`service-${service.title.replace(/\s+/g, '-')}`}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 mx-auto`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
