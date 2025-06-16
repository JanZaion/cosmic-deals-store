'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface FormData {
  customerName: string;
  customerEmail: string;
  product: string;
  caseSubject: string;
  caseDescription: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Použitý festivalový kelímek (vratný, výhodné)',
    price: '51 Kč',
    image: '/kelimek.png',
  },
  {
    id: '2',
    name: 'Kláda z filmu Final Destination 2 (vysoká sběratelská hodnota)',
    price: '84 000 Kč',
    image: '/log.png',
  },
  {
    id: '3',
    name: 'Znalost přesného času vaší smrti (tolerance 2 hod.)',
    price: '2000 Kč',
    image: '/goon.png',
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    product: '',
    caseSubject: '',
    caseDescription: '',
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

      if (!endpoint) {
        throw new Error('API endpoint not configured');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText || 'Network response was not ok'}`);
      }

      // Handle different response types
      if (responseText.trim() === '') {
        return { success: true, message: 'Request completed successfully' };
      }

      try {
        return JSON.parse(responseText);
      } catch {
        return { success: true, message: responseText || 'Request completed successfully' };
      }
    },
    onSuccess: () => {
      alert('Vaše objednávka byla přijata... Artefakt byl získán...');
      setFormData({
        customerName: '',
        customerEmail: '',
        product: '',
        caseSubject: '',
        caseDescription: '',
      });
      setSelectedProduct('');
    },
    onError: (error) => {
      alert(`Prastaré síly odmítají: ${error.message}`);
    },
  });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product.name);
    setFormData((prev) => ({
      ...prev,
      product: product.name,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { customerName, customerEmail, product, caseSubject, caseDescription } = formData;

    if (!customerName || !customerEmail || !product || !caseSubject || !caseDescription) {
      alert('Rituál vyžaduje všechny potřebné součásti...');
      return;
    }

    mutation.mutate(formData);
  };

  const isFormValid =
    formData.customerName &&
    formData.customerEmail &&
    formData.product &&
    formData.caseSubject &&
    formData.caseDescription;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dark Cosmic Horror Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,25,15,0.8)_0%,_rgba(0,0,0,1)_70%)]"></div>
        <div
          className="absolute inset-0 bg-[conic-gradient(from_0deg,_rgba(0,40,20,0.15),_transparent_30%,_rgba(20,40,0,0.1),_transparent_70%,_rgba(0,40,20,0.15))] animate-spin opacity-30"
          style={{ animationDuration: '120s' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/30 to-black"></div>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <div
                className="text-emerald-600 text-6xl mb-6 opacity-60"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))' }}
              >
                🐙
              </div>
            </div>

            <div className="relative mb-12">
              {/* Dark atmospheric background layers */}
              <div className="absolute inset-0 text-7xl sm:text-8xl lg:text-[10rem] font-black transform blur-2xl opacity-10">
                <div className="text-emerald-900">COSMIC DEALS</div>
              </div>
              <div className="absolute inset-0 text-7xl sm:text-8xl lg:text-[10rem] font-black transform blur-lg opacity-5">
                <div className="text-green-800">COSMIC DEALS</div>
              </div>

              {/* Main heading with dark horror styling */}
              <h1 className="text-7xl font-black tracking-tight sm:text-8xl lg:text-[10rem] font-serif relative z-20">
                <span className="block text-gray-200 relative">
                  <span
                    className="absolute inset-0 text-black"
                    style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}
                  >
                    COSMIC
                  </span>
                  <span
                    className="relative z-10 text-gray-300"
                    style={{ textShadow: '0 0 30px rgba(0,100,60,0.3), 0 0 60px rgba(0,50,30,0.2)' }}
                  >
                    COSMIC
                  </span>
                </span>

                <span className="block text-gray-200 relative text-6xl sm:text-7xl lg:text-[8rem] mt-4">
                  <span
                    className="absolute inset-0 text-black"
                    style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}
                  >
                    DEALS
                  </span>
                  <span
                    className="relative z-10 text-gray-400"
                    style={{ textShadow: '0 0 30px rgba(0,80,40,0.4), 0 0 60px rgba(0,40,20,0.3)' }}
                  >
                    DEALS
                  </span>
                </span>
              </h1>
            </div>

            <div className="mt-8 flex justify-center space-x-6 opacity-40">
              <span className="text-emerald-700 text-2xl" style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))' }}>
                🌒
              </span>
              <span className="text-green-700 text-2xl" style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))' }}>
                🔮
              </span>
              <span className="text-gray-600 text-2xl" style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))' }}>
                ⚫
              </span>
              <span className="text-emerald-600 text-2xl" style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))' }}>
                🌌
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="text-4xl mb-6 opacity-50 text-emerald-700">🛸</div>

            <p className="text-emerald-500 font-medium text-lg opacity-70 tracking-wide">Vyberte si svůj artefakt:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={`group relative cursor-pointer transform transition-all duration-700 hover:scale-102 ${
                  selectedProduct === product.name
                    ? 'ring-1 ring-emerald-700 shadow-2xl shadow-emerald-950/60 scale-102'
                    : 'hover:shadow-2xl hover:shadow-emerald-950/30'
                }`}
              >
                <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6 h-full backdrop-blur-sm relative overflow-hidden">
                  {/* Dark pattern overlay */}
                  <div className="absolute inset-0 opacity-3 bg-[radial-gradient(circle_at_center,_rgba(60,60,60,0.3)_1px,_transparent_1px)] bg-[length:40px_40px]"></div>

                  <div className="aspect-square bg-gray-900 border border-gray-800 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative shadow-inner">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-2 left-2 text-emerald-400 font-bold text-xs bg-black/90 border border-emerald-800 px-2 py-1 rounded">
                      #{product.id}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <h3
                    className="text-lg font-bold text-gray-300 mb-4 min-h-[3rem] leading-tight"
                    style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
                  >
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span
                      className="text-xl font-black text-emerald-400"
                      style={{ textShadow: '0 0 10px rgba(0,40,20,0.6)' }}
                    >
                      {product.price}
                    </span>
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-500 border ${
                        selectedProduct === product.name
                          ? 'bg-emerald-900 text-emerald-300 border-emerald-700 shadow-lg shadow-emerald-950/50'
                          : 'bg-gray-900 text-gray-500 border-gray-700 hover:bg-emerald-900 hover:text-emerald-400 hover:border-emerald-700'
                      }`}
                    >
                      {selectedProduct === product.name ? '✓ VYBRÁNO' : 'VYBRAT'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 bg-gradient-to-b from-gray-950/30 to-black/50 relative">
        <div className="mx-auto max-w-2xl relative">
          <div className="text-center mb-12">
            <div className="text-4xl mb-6 opacity-50 text-emerald-700">📿</div>
            <h2
              className="text-4xl font-black text-gray-300 mb-8 font-serif"
              style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
            >
              <span className="text-gray-300">ZÍSKEJTE ARTEFAKT</span>
            </h2>
            <div className="bg-gray-900 border border-emerald-800 text-emerald-400 font-bold py-3 px-8 rounded-lg inline-block text-lg shadow-2xl shadow-black/50">
              🌙 VYPLŇTE SMLOUVU S KOSMICKÝMI MOCNOSTMI 🌙
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-950/95 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-black/60 relative overflow-hidden">
              {/* Dark pattern overlay */}
              <div className="absolute inset-0 opacity-2 bg-[conic-gradient(from_0deg,_rgba(60,60,60,0.1),_rgba(40,40,40,0.05),_rgba(50,50,50,0.1),_rgba(60,60,60,0.1))]"></div>

              <div className="grid grid-cols-1 gap-8 relative z-10">
                <div className="relative">
                  <label className="block text-lg font-bold text-emerald-400 mb-3">🩸 TVOJE JMÉNO *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-300 font-medium text-lg shadow-inner"
                    placeholder="Jméno pro smluvní spojení..."
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-bold text-emerald-400 mb-3">📧 SPOJENÍ PRO ARTEFAKT *</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-300 font-medium text-lg shadow-inner"
                    placeholder="tvuj@artefakt-spojeni.void"
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-bold text-emerald-400 mb-3">🔮 VYBRANÝ ARTEFAKT *</label>
                  <input
                    type="text"
                    value={selectedProduct}
                    readOnly
                    className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed font-medium text-lg shadow-inner"
                    placeholder="Vyberte si artefakt z nabídky..."
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-bold text-emerald-400 mb-3">💀 PŘEDMĚT RITUÁLU *</label>
                  <input
                    type="text"
                    name="caseSubject"
                    value={formData.caseSubject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-300 font-medium text-lg shadow-inner"
                    placeholder="Účel temného obřadu..."
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-bold text-emerald-400 mb-3">📜 ZAKLÍNADLO *</label>
                  <textarea
                    name="caseDescription"
                    value={formData.caseDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition-all duration-300 resize-none font-medium text-lg shadow-inner"
                    placeholder="Napište své přání do temnoty..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || mutation.isPending}
                className={`w-full mt-8 py-6 px-8 rounded-xl font-bold text-xl tracking-wide transition-all duration-500 border relative overflow-hidden transform ${
                  isFormValid && !mutation.isPending
                    ? 'bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border-emerald-700 shadow-2xl shadow-emerald-950/60 hover:shadow-emerald-950/80 hover:scale-101'
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed border-gray-800'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-emerald-800/10 to-emerald-900/20 opacity-50"></div>
                {mutation.isPending ? (
                  <div className="flex items-center justify-center space-x-4 relative z-10">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-400 border-t-transparent"></div>
                    <span>🌀 RITUÁL PROBÍHÁ... 🌀</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <span>🌙</span>
                    <span>ZÍSKAT ARTEFAKT</span>
                    <span>🌙</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-16 bg-black/90 border-t border-emerald-900 relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <div className="flex justify-center space-x-4 text-2xl opacity-30">
            <span className="text-emerald-800">👁️</span>
            <span className="text-green-800">🌙</span>
            <span className="text-gray-700">⚫</span>
            <span className="text-emerald-700">🌌</span>
          </div>
          <p
            className="text-lg font-normal text-gray-600 mb-4 italic font-serif tracking-wider opacity-60"
            style={{ textShadow: '0 0 10px rgba(0,0,0,0.6)' }}
          >
            Ph&apos;nglui mglw&apos;nafh Cthulhu R&apos;lyeh wgah&apos;nagl fhtagn
          </p>
          <p className="text-xl font-bold text-gray-500" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
            © 2025 COSMIC DEALS
          </p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,40,20,0.1)_0%,_transparent_70%)]"></div>
      </footer>
    </div>
  );
}
