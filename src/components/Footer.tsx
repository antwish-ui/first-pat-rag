import React from 'react';

interface FooterProps {
  onOpenLegal: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="border-t border-[#f0f3fa] dark:border-[#2a2e39] bg-white dark:bg-[#131722] py-8 px-4 text-xs text-[#787b86] dark:text-[#9598a1] transition-colors duration-150 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-center md:text-left">
          <svg
            className="h-5 w-auto fill-current text-black dark:text-white shrink-0"
            fill="none"
            viewBox="0 0 36 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 22H7V6h7v16zm8-16h-5v22h5V6zm14 8h-6v14h6V14z" fill="currentColor"></path>
          </svg>
          <span>
            © 2024 TradingView, Inc. All quotes and data provided for demonstration purposes.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium text-[#131722] dark:text-[#d1d4dc]">
          {['Terms of service', 'Privacy policy', 'Cookies policy', 'Help Center'].map((item) => (
            <button
              key={item}
              onClick={() => onOpenLegal(item)}
              className="hover:text-[#2962ff] dark:hover:text-[#2962ff] transition-colors cursor-pointer text-xs"
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};
