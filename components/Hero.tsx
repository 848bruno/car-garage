"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getContent } from '@/lib/getContent'

export default function Hero() {
  const [content, setContent] = useState({
    hero_title: 'Expert Auto Care You Can Trust',
    hero_subtitle: 'Professional Auto Service',
    hero_description: 'Professional auto repair and maintenance services delivered by certified technicians. We keep your vehicle running smoothly and safely.',
    cta_primary: 'Book Now',
    cta_secondary: 'View Services'
  })

  useEffect(() => {
    async function fetchContent() {
      const data = await getContent('home')
      if (Object.keys(data).length > 0) {
        setContent(prev => ({ ...prev, ...data }))
      }
    }
    fetchContent()
  }, [])

  return (
    <div className="relative min-h-[80vh] flex items-start pt-24 px-6 sm:px-12 lg:px-16">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Modern garage background"
          fill
          className="object-cover brightness-75"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
      </div>

      {/* Content Wrapper */}
      <div className="relative mx-auto max-w-[900px] text-center">
        {/* Subtitle */}
        <div className="mb-4">
          <span className="inline-block rounded-full bg-primary-600/20 px-4 py-1.5 text-sm font-semibold text-primary-400 ring-1 ring-primary-500/30">
            {content.hero_subtitle}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
          {content.hero_title}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          {content.hero_description}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-center items-center gap-4">
          <Link
            href="/book"
            className="rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-primary-500 transition-transform hover:scale-105"
          >
            {content.cta_primary}
          </Link>
          <Link 
            href="/services" 
            className="text-base font-semibold leading-6 text-white hover:text-primary-400 transition-colors"
          >
            {content.cta_secondary} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
