// Header.tsx
import React from 'react';
import { Building2, Headset } from 'lucide-react';
import Logo from '@/assets/desnetLogo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Company Logo" className=" h-10" />
          </Link>
          <button
            onClick={() => window.location.href = "tel:+1234567890"}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Headset className="w-4 h-4 mr-2" />
            Customer Service
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
