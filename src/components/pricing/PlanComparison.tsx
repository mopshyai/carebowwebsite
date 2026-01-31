'use client';

import { planComparison } from '@/data/planComparison';
import { Check, X, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export function PlanComparison() {
  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-gray-900 font-medium">{value}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-900">
                Features
              </th>
              <th className="py-4 px-6 font-semibold text-gray-900 text-center">
                <span className="text-primary-700">Monthly</span>
                <span className="block text-sm font-normal text-gray-500">$30/mo</span>
              </th>
              <th className="py-4 px-6 font-semibold text-purple-600 text-center bg-purple-50">
                6-Month
                <span className="block text-sm font-normal">$150 total</span>
              </th>
              <th className="py-4 px-6 font-semibold text-orange-600 text-center">
                Yearly
                <span className="block text-sm font-normal">$300 total</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {planComparison.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{row.feature}</span>
                    {row.tooltip && (
                      <div className="group relative">
                        <Info className="w-4 h-4 text-gray-400 cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded-lg z-10">
                          {row.tooltip}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  {renderValue(row.monthly)}
                </td>
                <td className="py-4 px-6 text-center bg-purple-50/50">
                  {renderValue(row.sixMonth)}
                </td>
                <td className="py-4 px-6 text-center">
                  {renderValue(row.yearly)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
