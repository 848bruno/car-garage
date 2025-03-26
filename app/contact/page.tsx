'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSupabase } from '@/lib/supabase-provider'

export default function ContactPage() {
  const { supabase } = useSupabase()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message
        }])

      if (error) throw error

      toast.success('Message sent successfully!')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error: any) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-dark-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contact Us</h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="bg-dark-200 p-6 rounded-lg">
              <h3 className="text-base font-semibold leading-7 text-white">Location</h3>
              <p className="mt-2 text-base leading-7 text-gray-300">
                MP-SHA hospital<br />
                Nairobi, Parklands
              </p>
            </div>
            <div className="bg-dark-200 p-6 rounded-lg">
              <h3 className="text-base font-semibold leading-7 text-white">Contact Info</h3>
              <p className="mt-2 text-base leading-7 text-gray-300">
                Phone: +254114939391<br />
                Email: brunoambale@gmail.com
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-12 space-y-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-white">
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-dark-200 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-dark-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-dark-200 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-dark-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-white">
                  Phone Number
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-dark-200 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-dark-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-dark-200 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-dark-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}