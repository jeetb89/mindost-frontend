import Link from 'next/link';

export const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center">
        {/* min text */}
        <span className="text-4xl font-bold text-black">
          min
        </span>
        {/* D letter */}
        <span className="text-4xl font-bold text-[#FFD700]">
          D
        </span>
        {/* st text */}
        <span className="text-4xl font-bold text-black">
          st
        </span>
        {/* Pink character mascot */}
        <div className="relative -mt-1">
          <div className="absolute -right-1 top-0 transform translate-x-full">
            <div className="relative">
              {/* Body */}
              <div className="w-6 h-6 rounded-full bg-[#FFB6C1]" />
              {/* Eyes */}
              <div className="absolute top-1.5 left-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="absolute top-1.5 right-1 w-1.5 h-1.5 rounded-full bg-black" />
              {/* Speech bubble */}
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