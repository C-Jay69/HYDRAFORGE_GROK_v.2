import { cn } from '../utils/cn';

interface PlatformCardProps {
  platform: {
    id: number;
    name: string;
    description: string;
    category: string;
    status: 'Live' | 'Beta' | 'Alpha' | 'Draft';
    imageColor: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export default function PlatformCard({ platform, isActive, onClick }: PlatformCardProps) {
  return (
    <div
      className={cn(
        "group cursor-pointer rounded-2xl bg-[#2a2a2a] p-6 transition-all hover:scale-105 hover:shadow-2xl",
        isActive && "ring-2 ring-cyan-400"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${platform.imageColor}`} />
          <h3 className="mt-4 text-2xl font-bold">{platform.name}</h3>
          <p className="mt-2 text-gray-400">{platform.description}</p>
        </div>
        <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium">
          {platform.status}
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-gray-500">{platform.category}</span>
        <button className="rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white">
          View Demo
        </button>
      </div>
    </div>
  );
}