import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 mt-8 ">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Logo + About */}
      <div>
        <h2 className="text-2xl font-bold mb-3">YourBrand</h2>
        <p className="text-sm text-gray-400">
          Helping you find the perfect place to call home. We connect people with the right property.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition">Home</a></li>
          <li><a href="#" className="hover:text-white transition">Listings</a></li>
          <li><a href="#" className="hover:text-white transition">Agents</a></li>
          <li><a href="#" className="hover:text-white transition">Contact</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Contact</h3>
        <ul className="text-sm space-y-2">
          <li>Email: support@yourbrand.com</li>
          <li>Phone: +123 456 7890</li>
          <li>Location: Kathmandu, Nepal</li>
        </ul>
      </div>

      {/* Newsletter */}
 
    </div>

    {/* Divider */}
    <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-gray-400">&copy; 2025 YourBrand. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition">Facebook</a>
        <a href="#" className="hover:text-white transition">Twitter</a>
        <a href="#" className="hover:text-white transition">LinkedIn</a>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer