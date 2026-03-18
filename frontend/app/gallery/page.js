'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_9bab05d4-0d45-4f8d-a396-cf0659408542/artifacts/lv5k959m_Ilt%20logo.png'

// Default gallery images
const DEFAULT_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1542227844-5e56c7c2687d?w=800', caption: 'Brotherhood Ride 2024' },
  { url: 'https://images.unsplash.com/photo-1597738620274-dfcefdcde990?w=800', caption: 'Club Meeting' },
  { url: 'https://images.unsplash.com/photo-1592766845554-f2b181f8ed7c?w=800', caption: 'Highway Adventures' },
  { url: 'https://images.unsplash.com/photo-1582358680471-143e93a1e234?w=800', caption: 'Group Photo' },
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', caption: 'Sunset Ride' },
  { url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800', caption: 'Mountain Trail' },
  { url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800', caption: 'Night Cruise' },
  { url: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800', caption: 'Charity Event' },
]

// Lightbox Component
function Lightbox({ images, currentIndex, onClose, onNext, onPrev, onSelectImage }) {
  const currentImage = images[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight size={32} className="text-white" />
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-[95vw] max-w-5xl max-h-[85vh] mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.url}
            alt={currentImage.caption}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
          <div className="text-center mt-4">
            <p className="text-white text-lg font-medium">{currentImage.caption}</p>
            <p className="text-gray-400 text-sm mt-1">{currentIndex + 1} / {images.length}</p>
          </div>
        </motion.div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] p-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); onSelectImage(idx) }}
              className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                idx === currentIndex ? 'border-red-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.caption || img.title || img.alt || 'Gallery photo'} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="ILTMC" className="h-12 w-12 object-contain" />
            <div>
              <p className="font-bold text-lg tracking-wider" style={{ fontFamily: 'Oswald, sans-serif' }}>ILTMC</p>
              <p className="text-xs text-red-500">Est. 2013</p>
            </div>
          </a>
          <a href="/">
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Button>
          </a>
        </div>
      </div>
    </nav>
  )
}

// Main Gallery Page
export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/content')
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
      const data = await res.json()
      if (data?.gallery && data.gallery.length > 0) {
        setImages(data.gallery)
      } else {
        setImages(DEFAULT_IMAGES)
      }
    } catch (error) {
      setImages(DEFAULT_IMAGES)
      console.warn('Gallery failed to load from API, showing defaults')
    }
    setLoading(false)
  }

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <img src={LOGO_URL} alt="ILTMC" className="w-20 h-20 mx-auto animate-pulse mb-4" />
          <p className="text-gray-400">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4 border-red-500 text-red-500">MEMORIES</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              OUR <span className="text-red-500">GALLERY</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Capturing the spirit of brotherhood, adventure, and the open road. 
              Every ride tells a story, every photo holds a memory.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-500">{images.length} Photos</span>
              <span className="text-red-500">•</span>
              <span className="text-gray-500">Click any image to view</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          {/* Masonry-style Gallery */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                data-gallery-index={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-xl bg-zinc-900">
                  <img
                    src={image.url}
                    alt={image.caption || `Gallery ${index + 1}`}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    style={{ 
                      aspectRatio: index % 3 === 0 ? '4/5' : index % 3 === 1 ? '1/1' : '3/4'
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn size={24} />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium">{image.caption || `Photo ${index + 1}`}</p>
                    </div>
                  </div>
                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {images.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No images in gallery yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to Homepage
          </a>
          <p className="text-gray-600 text-sm mt-4">
            © {new Date().getFullYear()} ILTMC - Intrepidus Leones Tripura Motorcycle Club
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          onSelectImage={setCurrentIndex}
        />
      )}
    </div>
  )
}
