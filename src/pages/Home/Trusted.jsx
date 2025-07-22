import TrustedOrgsCarousel from '../../components/SimpleAutoCarousel.jsx'
import React from 'react'

export default function Trusted() {
  return (
    <div>
         <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-xl text-gray-600">
              Join thousands of event organizers who trust our platform
            </p>
          </div>

          <div className=" items-center">
            <TrustedOrgsCarousel />
          </div>
        </div>
      </section>
    </div>
  )
}
