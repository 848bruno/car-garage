import Image from 'next/image'

const testimonials = [
  {
    body: "The service was exceptional. They explained everything clearly and completed the work quickly.",
    author: {
      name: 'Sarah Thompson',
      handle: 'Satisfied Customer',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    body: "I've been taking my cars here for years. They're always honest, reliable, and do great work.",
    author: {
      name: 'Michael Chen',
      handle: 'Loyal Customer',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function Testimonials() {
  return (
    <div className="bg-dark-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-500">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Our Customers Say
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author.name} className="flex flex-col bg-dark-200 p-8 rounded-xl transition-transform hover:scale-105">
                <blockquote className="text-lg leading-8 text-gray-300">
                  "{testimonial.body}"
                </blockquote>
                <div className="mt-6 flex items-center gap-x-4">
                  <Image
                    className="h-10 w-10 rounded-full bg-dark-300"
                    src={testimonial.author.imageUrl}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.author.name}</div>
                    <div className="text-primary-500">{testimonial.author.handle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}