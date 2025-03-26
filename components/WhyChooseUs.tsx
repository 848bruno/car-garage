import { CheckCircleIcon } from '@heroicons/react/24/outline'

const features = [
  'Certified Professional Technicians',
  'State-of-the-Art Equipment',
  'Genuine Parts and Materials',
  'Transparent Pricing',
  'Warranty on Services',
  'Convenient Online Booking',
]

export default function WhyChooseUs() {
  return (
    <div className="bg-dark-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-500">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Trusted Choice for Auto Care
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            We pride ourselves on delivering exceptional service and maintaining the highest standards in automotive care.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-x-3 bg-dark-100 p-6 rounded-lg transition-colors hover:bg-dark-300">
                <CheckCircleIcon className="h-6 w-6 flex-none text-primary-500" aria-hidden="true" />
                <dt className="text-base font-semibold leading-7 text-white">{feature}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}