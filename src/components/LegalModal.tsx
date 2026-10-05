import React from 'react';
import { X, ShieldCheck, FileText, HelpCircle, Cookie } from 'lucide-react';

interface LegalModalProps {
  topic: string | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e0e3eb] dark:border-[#2a2e39] overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#f0f3fa] dark:border-[#2a2e39] pb-3">
          <div className="flex items-center space-x-2">
            {topic === 'Terms of service' && <FileText className="w-5 h-5 text-[#2962ff]" />}
            {topic === 'Privacy policy' && <ShieldCheck className="w-5 h-5 text-[#089981]" />}
            {topic === 'Cookies policy' && <Cookie className="w-5 h-5 text-amber-500" />}
            {topic === 'Help Center' && <HelpCircle className="w-5 h-5 text-[#2962ff]" />}
            <h2 className="text-lg font-bold">{topic}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#f0f3fa] dark:hover:bg-[#1e222d] text-[#787b86]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-[#787b86] dark:text-[#a0a3ad] space-y-3 leading-relaxed">
          <p>
            Welcome to the <strong>TradingView Markets Overview</strong> demonstration interface.
            All real-time indices, stock quotes, currency pairs, and commodity telemetry are synchronized
            for educational, analytical, and simulated testing purposes.
          </p>
          <p>
            <strong>Market Data Disclaimer:</strong> Quotes are sourced with minimal latency simulation.
            Past performance of indices or equities is not indicative of future investment returns.
          </p>
          <p>
            For inquiries or platform support, our dedicated Help Center is available 24/7 across global trading hours.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2962ff] hover:bg-[#1e54eb] text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
