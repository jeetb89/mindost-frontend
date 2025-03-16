import { Link } from 'react-router-dom';

export const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center">
        <span className="text-4xl font-bold text-black">
          min
        </span>
        <span className="text-4xl font-bold text-[#FFD700]">
          D
        </span>
        <span className="text-4xl font-bold text-black">
          st
        </span>
        <div className="relative -mt-1">
          <div className="absolute -right-1 top-0 transform translate-x-full">
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-[#FFB6C1]" />
              <div className="absolute top-1.5 left-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="absolute top-1.5 right-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="absolute -top-1 -right-2">
                <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 