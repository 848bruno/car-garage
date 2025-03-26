import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    name: 'Oil Change Service',
    description: 'Regular oil changes are crucial for maintaining your engine\'s performance and longevity.',
    price: 'From KSH.10,350.71',
    image: 'https://images.unsplash.com/photo-1597766353939-aee87a830f08?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Brake Service',
    description: 'Complete brake inspection and repair service to ensure your safety on the road.',
    price: 'From KSH.31,960.51',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Engine Diagnostics',
    description: 'Advanced diagnostic testing to identify and resolve engine issues.',
    price: 'From KSH.11,644.71',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'AC Service',
    description: 'Complete brake inspection and repair service to ensure your safety on the road.',
    price: 'From KSH.16,820.71',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tire Rotation',
    description: 'Complete brake inspection and repair service to ensure your safety on the road.',
    price: 'From KSH.6,468.71',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-dark-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Services</h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Professional auto repair and maintenance services for all makes and models.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.name} className="flex flex-col items-start">
              <div className="relative w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={800}
                  height={500}
                  className="aspect-[16/9] w-full rounded-2xl bg-dark-200 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time className="text-primary-500">{service.price}</time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-primary-500">
                    {service.name}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-300">{service.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/book"
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Book a Service
          </Link>
        </div>
      </div>
    </div>
  )
}