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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20"></div>
        <div className="relative px-6 py-24 sm:px-12 sm:py-32 lg:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                COSMIC
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                DEALS
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 font-medium">
              🌟 Unikátní obchod s nevšedními produkty 🌟
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <span className="animate-bounce text-2xl">✨</span>
              <span className="animate-pulse text-2xl">🚀</span>
              <span className="animate-bounce text-2xl delay-100">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-6 py-16 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Naše Exkluzivní Produkty</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={`group relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  selectedProduct === product.name
                    ? 'ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/50'
                    : 'hover:shadow-xl hover:shadow-purple-500/50'
                }`}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 h-full border border-gray-700">
                  <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-6xl opacity-50">📦</div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 min-h-[3rem]">{product.name}</h3>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-yellow-400">{product.price}</span>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedProduct === product.name
                          ? 'bg-yellow-400 text-black'
                          : 'bg-purple-600 text-white group-hover:bg-purple-500'
                      }`}
                    >
                      {selectedProduct === product.name ? 'Vybráno' : 'Vybrat'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-16 sm:px-12 lg:px-16 bg-black/20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Dokončete Objednávku</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Jméno a příjmení *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Zadejte vaše jméno"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="vas@email.cz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Vybraný produkt *</label>
                  <input
                    type="text"
                    value={selectedProduct}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg text-white cursor-not-allowed"
                    placeholder="Vyberte produkt výše"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Předmět zprávy *</label>
                  <input
                    type="text"
                    name="caseSubject"
                    value={formData.caseSubject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Objednávka produktu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Popis objednávky *</label>
                  <textarea
                    name="caseDescription"
                    value={formData.caseDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Popište vaše požadavky a dotazy k objednávce..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || mutation.isPending}
                className={`w-full mt-8 py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                  isFormValid && !mutation.isPending
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {mutation.isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Odesílání...</span>
                  </div>
                ) : (
                  'Odeslat Objednávku 🚀'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400">
        <p>© 2024 Cosmic Deals - Tam, kde sen potkává realitu ✨</p>
      </footer>
    </div>
  );
}
