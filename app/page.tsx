'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

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
    image: '/placeholder-cup.jpg',
  },
  {
    id: '2',
    name: 'Kláda z filmu Final Destination 2 (vysoká sběratelská hodnota)',
    price: '84 000 Kč',
    image: '/placeholder-log.jpg',
  },
  {
    id: '3',
    name: 'Znalost přesného času vaší smrti (tolerance 2 hod.)',
    price: '2000 Kč',
    image: '/placeholder-crystal.jpg',
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Eldritch Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,_theme(colors.green.900/20)_0%,_transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_theme(colors.purple.900/20)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_100%,_theme(colors.indigo.900/20)_0%,_transparent_70%)]"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-green-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-indigo-400/25 rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="px-6 py-24 sm:px-12 sm:py-32 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8">
              <div className="text-green-400/60 text-6xl mb-4 animate-pulse">⚬</div>
            </div>
            <h1 className="text-6xl font-bold tracking-wider text-gray-100 sm:text-7xl lg:text-8xl font-serif">
              <span className="block text-green-300/90 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">COSMIC</span>
              <span className="block text-gray-300 text-5xl sm:text-6xl lg:text-7xl mt-2 tracking-[0.2em]">DEALS</span>
            </h1>
            <div className="mt-8 border-t border-gray-600/30 pt-6">
              <p className="text-lg leading-8 text-gray-400 font-light italic">
                &ldquo;That which beckons from the void... awaits your commerce&rdquo;
              </p>
              <p className="text-sm text-gray-500 mt-2 tracking-widest">∴ ANTIQUARIUS COSMICUS ∴</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02] ${
                  selectedProduct === product.name
                    ? 'ring-2 ring-green-400/50 shadow-2xl shadow-green-400/20'
                    : 'hover:shadow-2xl hover:shadow-gray-900/80'
                }`}
              >
                <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/90 rounded-lg p-6 h-full border border-gray-700/50 backdrop-blur-sm relative overflow-hidden group-hover:border-gray-600/70 transition-all duration-300">
                  {/* Subtle eldritch pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_theme(colors.green.500)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>

                  <div className="aspect-square bg-gradient-to-br from-gray-700/50 to-gray-800/70 rounded-lg mb-6 flex items-center justify-center overflow-hidden border border-gray-600/30 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-purple-900/10"></div>
                    <div className="text-5xl opacity-30 text-gray-400 relative z-10">◌</div>
                    <div className="absolute bottom-2 right-2 text-xs text-gray-600 opacity-50">◊</div>
                  </div>

                  <h3 className="text-base font-medium text-gray-200 mb-4 min-h-[3rem] font-serif leading-tight">
                    {product.name}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-300/90 font-mono tracking-wider">
                      {product.price}
                    </span>
                    <div
                      className={`px-4 py-2 rounded-sm text-xs font-medium transition-all duration-300 border ${
                        selectedProduct === product.name
                          ? 'bg-green-400/20 text-green-300 border-green-400/40 shadow-inner'
                          : 'bg-gray-700/50 text-gray-300 border-gray-600/50 group-hover:bg-gray-600/60 group-hover:text-gray-200'
                      }`}
                    >
                      {selectedProduct === product.name ? 'VYBRÁNO' : 'ZÍSKAT'}
                    </div>
                  </div>

                  {/* Subtle corner ornaments */}
                  <div className="absolute top-2 left-2 text-gray-600/30 text-xs">⌜</div>
                  <div className="absolute top-2 right-2 text-gray-600/30 text-xs">⌝</div>
                  <div className="absolute bottom-2 left-2 text-gray-600/30 text-xs">⌞</div>
                  <div className="absolute bottom-2 right-2 text-gray-600/30 text-xs">⌟</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 bg-gradient-to-b from-transparent to-black/40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_theme(colors.green.900/5)_0%,_transparent_70%)]"></div>
        <div className="mx-auto max-w-2xl relative">
          <div className="text-center mb-12">
            <div className="text-green-400/30 text-3xl mb-4">⟐</div>
            <h2 className="text-4xl font-bold text-gray-200 mb-4 font-serif tracking-wide">
              Povoleni Vyřízeni Ritualu
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto"></div>
            <p className="text-gray-500 mt-4 italic text-sm">Sigillum et nomen... ad contractum æternum</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-b from-gray-800/60 to-gray-900/80 rounded-lg p-8 backdrop-blur-sm border border-gray-700/40 relative overflow-hidden">
              {/* Subtle eldritch overlay */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,_theme(colors.green.500)_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
              <div className="grid grid-cols-1 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-3 tracking-wide">
                    ◊ Označeni Subjektu *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600/50 rounded-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Vaše skutečné jméno..."
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-3 tracking-wide">
                    ◊ Komunikační Nexus *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600/50 rounded-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="vas@astral.void"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-3 tracking-wide">
                    ◊ Vyvolený Artefakt *
                  </label>
                  <input
                    type="text"
                    value={selectedProduct}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-sm text-gray-300 cursor-not-allowed backdrop-blur-sm"
                    placeholder="Zvolte artefakt z katalogu..."
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-3 tracking-wide">
                    ◊ Primární Invokace *
                  </label>
                  <input
                    type="text"
                    name="caseSubject"
                    value={formData.caseSubject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600/50 rounded-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Rituální objednávka artefaktu"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-3 tracking-wide">
                    ◊ Detailní Incantatio *
                  </label>
                  <textarea
                    name="caseDescription"
                    value={formData.caseDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-600/50 rounded-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 resize-none backdrop-blur-sm"
                    placeholder="Popište vaše záměry a požadavky pro rituál..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || mutation.isPending}
                className={`w-full mt-8 py-4 px-6 rounded-sm font-medium text-base tracking-wide transition-all duration-500 border relative overflow-hidden ${
                  isFormValid && !mutation.isPending
                    ? 'bg-gradient-to-r from-green-900/60 to-green-800/80 hover:from-green-800/70 hover:to-green-700/90 text-green-200 border-green-400/40 shadow-lg shadow-green-900/30 hover:shadow-xl hover:shadow-green-900/40 backdrop-blur-sm'
                    : 'bg-gray-700/50 text-gray-500 cursor-not-allowed border-gray-600/30'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/5 to-transparent animate-pulse"></div>
                {mutation.isPending ? (
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <div className="animate-spin rounded-full h-4 w-4 border border-green-300/30 border-t-green-300"></div>
                    <span>Vykonává se rituál...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 relative z-10">
                    <span>⟐</span>
                    <span>Zahájit Rituál</span>
                    <span>⟐</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-12 text-gray-600 border-t border-gray-800/50 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-900/30 to-transparent"></div>
        <div className="space-y-3">
          <p className="text-xs tracking-[0.2em] opacity-60">◊ ANNO DOMINI MMXXIV ◊</p>
          <p className="text-sm font-serif italic">
            &ldquo;Ph&rsquo;nglui mglw&rsquo;nafh Cthulhu R&rsquo;lyeh wgah&rsquo;nagl fhtagn&rdquo;
          </p>
          <p className="text-xs text-gray-700 tracking-wider">∴ COSMIC DEALS - Ubi Somnia Fiunt Realitas ∴</p>
        </div>
      </footer>
    </div>
  );
}
