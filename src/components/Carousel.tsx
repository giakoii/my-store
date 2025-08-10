'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

interface CarouselProps {
  images: {
    src: string
    alt: string
    title?: string
    description?: string
  }[]
  autoSlide?: boolean
  autoSlideInterval?: number
  showDots?: boolean
  showArrows?: boolean
  height?: string
}

export default function Carousel({
  images,
  autoSlide = true,
  autoSlideInterval = 5000,
  showDots = true,
  showArrows = true,
  height = 'h-96'
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto slide effect
  useEffect(() => {
    if (!autoSlide || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [autoSlide, autoSlideInterval, images.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 0) return null

  return (
    <div className={`relative ${height} overflow-hidden rounded-xl shadow-2xl group`}>
      {/* Images */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              priority={currentIndex === 0}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Content overlay */}
            {(images[currentIndex].title || images[currentIndex].description) && (
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {images[currentIndex].title && (
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {images[currentIndex].title}
                    </h3>
                  )}
                  {images[currentIndex].description && (
                    <p className="text-lg opacity-90 max-w-2xl">
                      {images[currentIndex].description}
                    </p>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((image, index) => (
            <button
              key={`carousel-${image.src}-${image.alt}`.replace(/\s+/g, '-').toLowerCase()}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {autoSlide && images.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: autoSlideInterval / 1000,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </div>
      )}
    </div>
  )
}
