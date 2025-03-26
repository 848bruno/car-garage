import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="bg-dark-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">About AutoCare Pro</h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-300">
                AutoCare Pro has been serving our community with exceptional auto repair and maintenance services since 2010. 
                Our commitment to quality service and customer satisfaction has made us the trusted choice for vehicle care.
              </p>
              <div className="mt-10 max-w-xl text-base leading-7 text-gray-300">
                <p>
                  Our team of certified technicians brings decades of combined experience to every service we provide. 
                  We stay up-to-date with the latest automotive technologies and use state-of-the-art equipment to 
                  ensure your vehicle receives the best possible care.
                </p>
                <p className="mt-6">
                  We believe in transparent pricing, honest service recommendations, and building long-term relationships 
                  with our customers. Whether you need routine maintenance or complex repairs, you can count on 
                  AutoCare Pro to keep your vehicle running at its best.
                </p>
              </div>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                <div className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-gray-300">Years in business</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-primary-500">13+</dd>
                </div>
                <div className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-gray-300">Certified technicians</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-primary-500">10+</dd>
                </div>
                <div className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-gray-300">Satisfied customers</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-primary-500">5K+</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}