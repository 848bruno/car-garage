'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { useSupabase } from '@/lib/supabase-provider'

const timeSlots = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
]

export default function BookingForm() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [services, setServices] = useState<{ id: string; name: string; price: string }[]>([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    notes: ''
  })

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase.from('services').select('id, name, price');
      if (error) console.error('Error fetching services:', error);
      else setServices(data);
    }
    fetchServices();
  }, [supabase]); // Add supabase as dependency
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !timeSlot || selectedServices.length === 0) {
      toast.error('Please select a date, time, and at least one service')
      return
    }

    try {
      const appointmentDate = new Date(date)
      const [hours, minutes] = timeSlot.split(':')
      appointmentDate.setHours(parseInt(hours), parseInt(minutes))

      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          email: formData.email,
          full_name: formData.name,
          phone: formData.phone
        })
        .select()
        .single()

      if (userError) throw userError

      const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .insert({
          user_id: userData.id,
          make: formData.vehicleMake,
          model: formData.vehicleModel,
          year: parseInt(formData.vehicleYear)
        })
        .select()
        .single()

      if (vehicleError) throw vehicleError

      const appointmentPromises = selectedServices.map(serviceId =>
        supabase.from('appointments').insert({
          user_id: userData.id,
          vehicle_id: vehicleData.id,
          service_id: serviceId,
          appointment_date: appointmentDate.toISOString(),
          status: 'pending',
          notes: formData.notes
        })
      )

      const appointmentResults = await Promise.all(appointmentPromises)
      const appointmentError = appointmentResults.find(result => result.error)

      if (appointmentError) throw appointmentError.error

      toast.success('Appointment booked successfully!')
      router.push('/')
    } catch (error: any) {
      console.error('Booking error:', error)
      toast.error('Failed to book appointment. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-8">
        {/* Personal Information */}
        <div className="bg-dark-300 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-primary-500 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {['name', 'email', 'phone'].map(field => (
              <div key={field}>
               <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
      {field === 'name' ? 'Full Name' : field === 'email' ? 'Email' : 'Phone Number'}
    </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  id={field}
                  required
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="block w-full rounded-md bg-dark-200 text-white border-dark-400 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-dark-300 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-primary-500 mb-4">Vehicle Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {['vehicleMake', 'vehicleModel', 'vehicleYear'].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
                  {field.replace('vehicle', '')}
                </label>
                <input
                  type={field === 'vehicleYear' ? 'number' : 'text'}
                  name={field}
                  id={field}
                  required
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="block w-full rounded-md bg-dark-200 text-white border-dark-400 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-dark-300 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-primary-500 mb-4">Select Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id)}
                className={`p-4 rounded-lg border transition ${
                  selectedServices.includes(service.id)
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-200 text-gray-300 hover:bg-dark-400'
                }`}
              >
                <div className="font-medium">{service.name}</div>
                <div className="text-sm mt-1 text-primary-500">{service.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Date and Time */}
        <div className="bg-dark-300 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-primary-500 mb-4">Appointment Details</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <DayPicker 
                mode="single" 
                selected={date} 
                onSelect={setDate} 
                disabled={[{ before: new Date() }]} 
              />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`px-4 py-3 rounded-md transition ${
                      timeSlot === slot ? 'bg-primary-600 text-white' : 'bg-dark-200 text-gray-300 hover:bg-dark-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit" 
          className="bg-primary-600 py-3 px-6 rounded-md text-white hover:bg-primary-500 transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </form>
  )
}