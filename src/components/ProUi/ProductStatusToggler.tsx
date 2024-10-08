"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ToggleLeft, ToggleRight } from 'lucide-react'

type Product = {
  id: string
  name: string
  status: 'active' | 'inactive'
}

type ProductStatusTogglerProps = {
  products: Product[]
  onToggleStatus: (productId: string) => void
}

export default function ProductStatusToggler({ products, onToggleStatus }: ProductStatusTogglerProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Status Toggler</h2>
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="p-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="p-2 text-right">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleStatus(product.id)}
                    className={`p-2 rounded-full ${
                      product.status === 'active'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {product.status === 'active' ? (
                      <ToggleRight className="w-6 h-6" />
                    ) : (
                      <ToggleLeft className="w-6 h-6" />
                    )}
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}