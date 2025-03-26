import Link from 'next/link'

export default function CTASection() {
  return (
    <div className="bg-dark-200">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get your car serviced?
            <br />
            Book an appointment today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Experience professional auto care with our expert technicians. We're here to keep your vehicle running at its best.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/book"
              className="rounded-md bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
            >
              Book Now
            </Link>
            <Link 
              href="/contact" 
              className="text-base font-semibold leading-6 text-white hover:text-primary-500 transition-colors"
            >
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}