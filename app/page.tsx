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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Cosmic Horror Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_theme(colors.purple.900/40)_0%,_transparent_50%)]"></div>
        <div
          className="absolute inset-0 bg-[conic-gradient(from_0deg,_theme(colors.emerald.900/20),_transparent_30%,_theme(colors.purple.900/20),_transparent_70%,_theme(colors.emerald.900/20))] animate-spin"
          style={{ animationDuration: '60s' }}
        ></div>
      </div>

      {/* Floating Cosmic Horror Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 text-green-400 text-2xl animate-pulse opacity-60">👁️</div>
        <div
          className="absolute top-1/3 right-1/3 text-purple-400 text-xl animate-pulse opacity-40"
          style={{ animationDelay: '2s' }}
        >
          🌙
        </div>
        <div
          className="absolute bottom-1/4 left-1/3 text-emerald-400 text-lg animate-pulse opacity-50"
          style={{ animationDelay: '4s' }}
        >
          🕳️
        </div>
        <div
          className="absolute top-2/3 right-1/4 text-slate-400 text-xl animate-pulse opacity-30"
          style={{ animationDelay: '6s' }}
        >
          💀
        </div>
        <div
          className="absolute top-1/2 left-1/6 text-purple-500 text-sm animate-pulse opacity-20"
          style={{ animationDelay: '1s' }}
        >
          🌌
        </div>
        <div
          className="absolute bottom-1/3 right-1/6 text-green-500 text-sm animate-pulse opacity-25"
          style={{ animationDelay: '3s' }}
        >
          ⚫
        </div>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6">
              <div
                className="text-emerald-400 text-8xl mb-4 animate-pulse drop-shadow-[0_0_30px_rgba(16,185,129,0.6)]"
                style={{ filter: 'drop-shadow(0 0 40px rgba(16,185,129,0.4))' }}
              >
                👁️
              </div>
            </div>
            <div className="relative mb-8">
              {/* Multiple glowing background layers for eldritch effect */}
              <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-black transform blur-xl opacity-30">
                <div className="text-emerald-400 animate-pulse">COSMIC DEALS</div>
              </div>
              <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-black transform blur-lg opacity-20">
                <div className="text-purple-500">COSMIC DEALS</div>
              </div>

              {/* Main heading with cosmic horror styling */}
              <h1 className="text-8xl font-black tracking-tight sm:text-9xl lg:text-[12rem] font-serif relative z-20">
                <span className="block text-slate-200 relative">
                  {/* Multiple text shadows for otherworldly effect */}
                  <span
                    className="absolute inset-0 text-black"
                    style={{
                      textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 4px 4px 0 #000',
                    }}
                  >
                    COSMIC
                  </span>
                  <span
                    className="relative z-10 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 bg-clip-text text-transparent"
                    style={{
                      filter:
                        'drop-shadow(0 0 30px rgba(16, 185, 129, 0.8)) drop-shadow(0 0 60px rgba(16, 185, 129, 0.4))',
                    }}
                  >
                    COSMIC
                  </span>
                </span>

                <span className="block text-slate-200 relative text-7xl sm:text-8xl lg:text-[10rem] mt-2">
                  {/* Multiple text shadows for otherworldly effect */}
                  <span
                    className="absolute inset-0 text-black"
                    style={{
                      textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 4px 4px 0 #000',
                    }}
                  >
                    DEALS
                  </span>
                  <span
                    className="relative z-10 bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-400 bg-clip-text text-transparent"
                    style={{
                      filter:
                        'drop-shadow(0 0 30px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.4))',
                    }}
                  >
                    DEALS
                  </span>
                </span>
              </h1>

              {/* Animated eldritch effects */}
              <div className="absolute top-1/4 -left-8 text-4xl text-emerald-400 animate-pulse opacity-60">🌊</div>
              <div
                className="absolute top-1/3 -right-8 text-4xl text-purple-400 animate-pulse opacity-50"
                style={{ animationDelay: '1s' }}
              >
                ⚡
              </div>
              <div
                className="absolute bottom-1/4 -left-12 text-3xl text-slate-400 animate-pulse opacity-40"
                style={{ animationDelay: '2s' }}
              >
                🌀
              </div>
              <div
                className="absolute bottom-1/3 -right-12 text-3xl text-green-400 animate-pulse opacity-50"
                style={{ animationDelay: '3s' }}
              >
                💫
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <span className="animate-pulse text-3xl delay-0 opacity-70">🌒</span>
              <span className="animate-pulse text-3xl delay-200 opacity-60">🔮</span>
              <span className="animate-pulse text-3xl delay-400 opacity-80">⚫</span>
              <span className="animate-pulse text-3xl delay-600 opacity-50">🌌</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="text-6xl mb-4 animate-pulse opacity-80">🛸</div>
            <h2 className="text-5xl font-black text-slate-200 mb-6 font-serif drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                ZAKAZANÉ ARTEFAKTY
              </span>
            </h2>
            <div className="bg-gradient-to-r from-emerald-900 to-purple-900 text-emerald-200 font-bold py-3 px-8 rounded-lg inline-block text-xl border border-emerald-400 shadow-2xl shadow-emerald-500/20">
              🌙 PŮVOD NEZNÁMÝ • SÍLA NEZMĚŘITELNÁ 🌙
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  selectedProduct === product.name
                    ? 'ring-2 ring-emerald-400 shadow-2xl shadow-emerald-500/30 scale-105'
                    : 'hover:shadow-2xl hover:shadow-purple-500/30'
                }`}
              >
                <div className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 rounded-xl p-6 h-full border border-slate-700 backdrop-blur-sm relative overflow-hidden">
                  {/* Subtle cosmic pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_theme(colors.emerald.400)_1px,_transparent_1px)] bg-[length:30px_30px]"></div>

                  {/* Eldritch badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-800 to-emerald-800 text-emerald-200 font-bold text-xs py-1 px-3 rounded-full border border-emerald-400 shadow-lg animate-pulse z-10">
                    CURSED
                  </div>

                  <div className="aspect-square bg-gradient-to-br from-slate-700 to-gray-800 rounded-lg mb-6 flex items-center justify-center overflow-hidden border border-slate-600 relative shadow-inner">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-2 left-2 text-emerald-200 font-bold text-xs bg-black/80 px-2 py-1 rounded border border-emerald-400">
                      #{product.id}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-200 mb-4 min-h-[3rem] leading-tight drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]">
                      {product.price}
                    </span>
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 border ${
                        selectedProduct === product.name
                          ? 'bg-emerald-800 text-emerald-200 border-emerald-400 shadow-lg shadow-emerald-500/30 animate-pulse'
                          : 'bg-slate-700 text-slate-200 border-slate-500 hover:bg-emerald-900 hover:text-emerald-200 hover:border-emerald-400'
                      }`}
                    >
                      {selectedProduct === product.name ? '✓ VYBRÁNO' : 'VYBRAT'}
                    </div>
                  </div>

                  {/* Eldritch corner elements */}
                  <div className="absolute top-3 left-3 text-emerald-400 text-lg animate-pulse opacity-60">👁️</div>
                  <div
                    className="absolute top-3 right-3 text-purple-400 text-lg animate-pulse opacity-50"
                    style={{ animationDelay: '1s' }}
                  >
                    🌙
                  </div>
                  <div
                    className="absolute bottom-3 left-3 text-slate-400 text-lg animate-pulse opacity-40"
                    style={{ animationDelay: '2s' }}
                  >
                    ⚫
                  </div>
                  <div
                    className="absolute bottom-3 right-3 text-emerald-400 text-lg animate-pulse opacity-60"
                    style={{ animationDelay: '3s' }}
                  >
                    🌌
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 bg-gradient-to-b from-black/30 to-slate-900/30 relative">
        <div className="mx-auto max-w-2xl relative">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4 animate-pulse opacity-80">📿</div>
            <h2 className="text-5xl font-black text-slate-200 mb-6 font-serif drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                ZÍSKEJTE ARTEFAKT
              </span>
            </h2>
            <div className="bg-gradient-to-r from-purple-900 to-emerald-900 text-emerald-200 font-bold py-3 px-8 rounded-lg inline-block text-xl border border-emerald-400 shadow-2xl shadow-emerald-500/20">
              🌙 VYPLŇTE SMLOUVU S KOSMICKÝMI MOCNOSTMI 🌙
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-br from-slate-800/95 to-gray-900/95 rounded-2xl p-8 backdrop-blur-sm border border-slate-600 shadow-2xl shadow-black/50 relative overflow-hidden">
              {/* Subtle cosmic pattern overlay */}
              <div className="absolute inset-0 opacity-5 bg-[conic-gradient(from_0deg,_theme(colors.emerald.400),_theme(colors.purple.400),_theme(colors.slate.400),_theme(colors.emerald.400))]"></div>
              <div className="grid grid-cols-1 gap-8 relative z-10">
                <div className="relative">
                  <label className="block text-lg font-bold text-emerald-400 mb-3">🩸 TVOJE JMÉNO *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gradient-to-r from-slate-700 to-gray-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 font-medium text-lg"
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
                    className="w-full px-4 py-4 bg-gradient-to-r from-slate-700 to-gray-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 font-medium text-lg"
                    placeholder="tvuj@artefakt-spojeni.void"
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-bold text-emerald-400 mb-3">🔮 VYBRANÝ ARTEFAKT *</label>
                  <input
                    type="text"
                    value={selectedProduct}
                    readOnly
                    className="w-full px-4 py-4 bg-gradient-to-r from-gray-800 to-slate-800 border border-gray-600 rounded-lg text-slate-300 cursor-not-allowed font-medium text-lg"
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
                    className="w-full px-4 py-4 bg-gradient-to-r from-slate-700 to-gray-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 font-medium text-lg"
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
                    className="w-full px-4 py-4 bg-gradient-to-r from-slate-700 to-gray-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 resize-none font-medium text-lg"
                    placeholder="Napište své přání do temnoty..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || mutation.isPending}
                className={`w-full mt-8 py-6 px-8 rounded-xl font-bold text-2xl tracking-wide transition-all duration-300 border relative overflow-hidden transform ${
                  isFormValid && !mutation.isPending
                    ? 'bg-gradient-to-r from-emerald-800 via-purple-800 to-slate-800 hover:from-purple-800 hover:via-emerald-800 hover:to-gray-800 text-emerald-200 border-emerald-400 shadow-2xl shadow-emerald-500/30 hover:shadow-purple-500/30 hover:scale-105'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed border-gray-600'
                }`}
              >
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_theme(colors.emerald.400/10),_theme(colors.purple.400/10),_theme(colors.slate.400/10),_theme(colors.emerald.400/10))] opacity-30"></div>
                {mutation.isPending ? (
                  <div className="flex items-center justify-center space-x-4 relative z-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-400 border-t-transparent"></div>
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
      <footer className="text-center py-16 bg-gradient-to-r from-black/80 to-slate-900/80 border-t border-emerald-400/30 relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <div className="flex justify-center space-x-4 text-4xl opacity-60">
            <span className="animate-pulse delay-0">👁️</span>
            <span className="animate-pulse delay-200">🌙</span>
            <span className="animate-pulse delay-400">⚫</span>
            <span className="animate-pulse delay-600">🌌</span>
          </div>
          <p className="text-2xl font-bold text-slate-300 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            © 2025 COSMIC DEALS
          </p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_theme(colors.emerald.900/10)_0%,_transparent_70%)] animate-pulse"></div>
      </footer>
    </div>
  );
}
