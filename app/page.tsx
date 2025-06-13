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
      alert('Objednávka byla úspěšně odeslána!');
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
      alert(`Chyba při odesílání objednávky: ${error.message}`);
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
      alert('Prosím vyplňte všechna povinná pole.');
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
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600 relative overflow-hidden">
      {/* Subtle Retro Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_theme(colors.cyan.400/60)_1px,_transparent_1px)] bg-[length:60px_60px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,_theme(colors.magenta.400/60)_1px,_transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      {/* Floating Neon Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 text-yellow-300 text-2xl animate-bounce">★</div>
        <div className="absolute top-1/3 right-1/3 text-pink-300 text-xl animate-pulse">✨</div>
        <div className="absolute bottom-1/4 left-1/3 text-cyan-300 text-lg animate-bounce delay-1000">⭐</div>
        <div className="absolute top-2/3 right-1/4 text-purple-300 text-xl animate-pulse delay-2000">💫</div>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6">
              <div className="text-yellow-300 text-8xl mb-4 animate-bounce drop-shadow-[0_0_20px_rgba(253,224,71,0.8)]">
                ★
              </div>
            </div>
            <div className="relative mb-8">
              {/* Multiple glowing background layers for maximum drama */}
              <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-black transform -skew-x-6 blur-xl opacity-60">
                <div className="text-yellow-300 animate-pulse">COSMIC DEALS!</div>
              </div>
              <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-black transform -skew-x-6 blur-lg opacity-40">
                <div className="text-white">COSMIC DEALS!</div>
              </div>

              {/* Main heading with maximum contrast */}
              <h1 className="text-8xl font-black tracking-tight sm:text-9xl lg:text-[12rem] font-sans transform -skew-x-6 relative z-20">
                <span className="block text-white relative">
                  {/* Multiple text shadows for 3D effect */}
                  <span
                    className="absolute inset-0 text-black"
                    style={{
                      textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 6px 6px 0 #000',
                    }}
                  >
                    COSMIC
                  </span>
                  <span
                    className="relative z-10 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent"
                    style={{
                      filter:
                        'drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 255, 0, 0.6))',
                    }}
                  >
                    COSMIC
                  </span>
                </span>

                <span className="block text-white relative text-7xl sm:text-8xl lg:text-[10rem] mt-2">
                  {/* Multiple text shadows for 3D effect */}
                  <span
                    className="absolute inset-0 text-black"
                    style={{
                      textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 6px 6px 0 #000',
                    }}
                  >
                    DEALS!
                  </span>
                  <span
                    className="relative z-10 bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
                    style={{
                      filter:
                        'drop-shadow(0 0 20px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 255, 255, 0.6))',
                    }}
                  >
                    DEALS!
                  </span>
                </span>
              </h1>

              {/* Animated sparkle effects */}
              <div className="absolute top-1/4 -left-8 text-4xl text-yellow-300 animate-spin">✨</div>
              <div className="absolute top-1/3 -right-8 text-4xl text-cyan-300 animate-bounce">⚡</div>
              <div className="absolute bottom-1/4 -left-12 text-3xl text-pink-300 animate-pulse">💥</div>
              <div className="absolute bottom-1/3 -right-12 text-3xl text-yellow-300 animate-ping">🌟</div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <span className="animate-bounce text-3xl delay-0">🎉</span>
              <span className="animate-bounce text-3xl delay-200">🚀</span>
              <span className="animate-bounce text-3xl delay-400">💎</span>
              <span className="animate-bounce text-3xl delay-600">🎊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="text-6xl mb-4 animate-pulse">🛸</div>
            <h2 className="text-5xl font-black text-white mb-6 font-sans transform -skew-x-3 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                EXKLUZIVNÍ NABÍDKA!
              </span>
            </h2>
            <div className="bg-gradient-to-r from-yellow-400 to-pink-400 text-black font-bold py-3 px-8 rounded-full inline-block text-xl animate-bounce border-4 border-white shadow-2xl">
              🔥 LIMITOVANÁ EDICE • POUZE 3 KUSY! 🔥
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={`group relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                  selectedProduct === product.name
                    ? 'ring-4 ring-yellow-400 shadow-2xl shadow-pink-500/50 scale-105 rotate-1'
                    : 'hover:shadow-2xl hover:shadow-cyan-500/50'
                }`}
              >
                <div className="bg-gradient-to-br from-pink-500/90 to-purple-600/90 rounded-2xl p-6 h-full border-4 border-white backdrop-blur-sm relative overflow-hidden">
                  {/* Subtle retro pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,_theme(colors.cyan.400)_0px,_theme(colors.cyan.400)_2px,_transparent_2px,_transparent_40px)]"></div>

                  {/* Flashy badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-black text-xs py-1 px-3 rounded-full border-2 border-white shadow-lg animate-pulse z-10">
                    HOT!
                  </div>

                  <div className="aspect-square bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl mb-6 flex items-center justify-center overflow-hidden border-4 border-white relative shadow-inner">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 text-white font-bold text-xs bg-black/70 px-2 py-1 rounded">
                      #{product.id}
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white mb-4 min-h-[3rem] leading-tight drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-yellow-300 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                      {product.price}
                    </span>
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-black transition-all duration-300 border-2 ${
                        selectedProduct === product.name
                          ? 'bg-yellow-400 text-black border-white shadow-lg animate-pulse'
                          : 'bg-white text-black border-black hover:bg-yellow-300 hover:scale-110'
                      }`}
                    >
                      {selectedProduct === product.name ? '✓ VYBRÁNO!' : 'CHCI!'}
                    </div>
                  </div>

                  {/* Flashy corner stars */}
                  <div className="absolute top-3 left-3 text-yellow-300 text-lg animate-spin">✨</div>
                  <div className="absolute top-3 right-3 text-cyan-300 text-lg animate-spin">⭐</div>
                  <div className="absolute bottom-3 left-3 text-pink-300 text-lg animate-spin">💫</div>
                  <div className="absolute bottom-3 right-3 text-yellow-300 text-lg animate-spin">🌟</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 bg-gradient-to-b from-purple-600/15 to-pink-600/15 relative">
        <div className="mx-auto max-w-2xl relative">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4 animate-bounce">🛍️</div>
            <h2 className="text-5xl font-black text-white mb-6 font-sans transform -skew-x-3 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
                OBJEDNEJ HNED!
              </span>
            </h2>
            <div className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold py-3 px-8 rounded-full inline-block text-xl border-4 border-white shadow-2xl animate-pulse">
              💸 RYCHLÉ VYŘÍZENÍ • DORUČENÍ DO 24H! 💸
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-br from-white/95 to-cyan-50/95 rounded-3xl p-8 backdrop-blur-sm border-4 border-white shadow-2xl relative overflow-hidden">
              {/* Very subtle retro pattern overlay */}
              <div className="absolute inset-0 opacity-3 bg-[conic-gradient(from_0deg,_theme(colors.pink.400),_theme(colors.yellow.400),_theme(colors.cyan.400),_theme(colors.pink.400))]"></div>
              <div className="grid grid-cols-1 gap-8 relative z-10">
                <div className="relative">
                  <label className="block text-lg font-black text-purple-700 mb-3 transform -skew-x-3">
                    🎯 TVOJE JMÉNO *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gradient-to-r from-pink-200 to-purple-200 border-4 border-purple-500 rounded-xl text-black placeholder-purple-600 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 font-bold text-lg"
                    placeholder="Zadej svoje super jméno!"
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-black text-purple-700 mb-3 transform -skew-x-3">
                    📧 TVŮJ EMAIL *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gradient-to-r from-cyan-200 to-blue-200 border-4 border-cyan-500 rounded-xl text-black placeholder-cyan-700 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 font-bold text-lg"
                    placeholder="tvuj@mega-email.cz"
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-black text-purple-700 mb-3 transform -skew-x-3">
                    🎁 VYBRANÝ PRODUKT *
                  </label>
                  <input
                    type="text"
                    value={selectedProduct}
                    readOnly
                    className="w-full px-4 py-4 bg-gradient-to-r from-yellow-200 to-orange-200 border-4 border-yellow-500 rounded-xl text-black cursor-not-allowed font-bold text-lg"
                    placeholder="Vyber si produkt nahoře!"
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-black text-purple-700 mb-3 transform -skew-x-3">
                    💬 PŘEDMĚT ZPRÁVY *
                  </label>
                  <input
                    type="text"
                    name="caseSubject"
                    value={formData.caseSubject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gradient-to-r from-green-200 to-emerald-200 border-4 border-green-500 rounded-xl text-black placeholder-green-700 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 font-bold text-lg"
                    placeholder="Objednávka cosmic produktu!"
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-black text-purple-700 mb-3 transform -skew-x-3">
                    📝 TVOJE ZPRÁVA *
                  </label>
                  <textarea
                    name="caseDescription"
                    value={formData.caseDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-4 bg-gradient-to-r from-pink-200 to-rose-200 border-4 border-pink-500 rounded-xl text-black placeholder-pink-700 focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 resize-none font-bold text-lg"
                    placeholder="Napiš nám co chceš a my to vyřídíme!"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || mutation.isPending}
                className={`w-full mt-8 py-6 px-8 rounded-2xl font-black text-2xl tracking-wide transition-all duration-300 border-4 relative overflow-hidden transform ${
                  isFormValid && !mutation.isPending
                    ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-pink-500 hover:via-purple-600 hover:to-cyan-500 text-white border-white shadow-2xl hover:shadow-3xl hover:scale-105 animate-pulse'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed border-gray-500'
                }`}
              >
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_theme(colors.cyan.400),_theme(colors.pink.400),_theme(colors.yellow.400),_theme(colors.cyan.400))] opacity-10"></div>
                {mutation.isPending ? (
                  <div className="flex items-center justify-center space-x-4 relative z-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
                    <span>⚡ ZPRACOVÁVÁ SE... ⚡</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <span>🚀</span>
                    <span>OBJEDNAT TEEED!</span>
                    <span>🚀</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-16 bg-gradient-to-r from-purple-600/80 to-pink-600/80 border-t-8 border-yellow-400 relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <div className="flex justify-center space-x-4 text-4xl">
            <span className="animate-bounce delay-0">🌟</span>
            <span className="animate-bounce delay-200">💎</span>
            <span className="animate-bounce delay-400">🎉</span>
            <span className="animate-bounce delay-600">🚀</span>
          </div>
          <p className="text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">© 2024 COSMIC DEALS</p>
          <p className="text-xl font-bold text-yellow-300 animate-pulse">🌈 TAM, KDE SEN POTKÁVÁ REALITU! 🌈</p>
          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-black py-2 px-6 rounded-full inline-block text-lg border-4 border-white">
            ⚡ NEJLEPŠÍ CENY • NEJRYCHLEJŠÍ DODÁNÍ • 100% SPOKOJENOST! ⚡
          </div>
        </div>
      </footer>
    </div>
  );
}
