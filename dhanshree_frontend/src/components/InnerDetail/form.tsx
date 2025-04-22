import React from 'react'

function Innerform() {
  return (
    <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-4">Book This Property</h3>
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        className="border rounded px-3 py-2"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="border rounded px-3 py-2"
      />
      <input
        type="date"
        className="border rounded px-3 py-2"
      />
      <textarea
        placeholder="Message"
        rows={3}
        className="border rounded px-3 py-2"
      />
      <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Submit Booking
      </button>
    </form>
  </div>  )
}

export default Innerform