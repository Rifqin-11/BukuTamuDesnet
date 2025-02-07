// Error.tsx
import React, { useEffect } from 'react';
import { XCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

interface ErrorProps {
  message: string;
  onRetry: () => void;
}

function ErrorPage({ message, onRetry }: ErrorProps) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Error";
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 bg-gray-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Terjadi Kesalahan!</h2>
          <p className="text-xl text-gray-600">{message}</p>
          <button
            onClick={() => {
              onRetry(); // Reset form sebelum navigasi
              navigate("/"); // Navigasi ke halaman Home
            }}
            className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;
