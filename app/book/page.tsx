'use client'

import BookingForm from '@/components/BookingForm'

export default function BookPage() {
  return (
    <div className="min-h-screen bg-dark-100 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Book Your Service Appointment
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Schedule your vehicle service with our expert technicians.
          </p>
        </div>
        <div className="mt-16 bg-dark-200 rounded-lg shadow-xl p-8">
          <BookingForm />
        </div>
      </div>
    </div>
  )
}