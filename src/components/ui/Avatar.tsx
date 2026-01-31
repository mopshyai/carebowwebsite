import { User, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  verified?: boolean;
  className?: string;
}

export default function Avatar({ src, alt = "Avatar", size = "md", verified = false, className }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div className={cn("rounded-full overflow-hidden bg-gray-200 flex items-center justify-center", sizes[size])}>
        {src ? (
          <Image src={src} alt={alt} width={96} height={96} className="w-full h-full object-cover" />
        ) : (
          <User className={cn("text-gray-400", iconSizes[size])} />
        )}
      </div>

      {verified && (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
          <CheckCircle className="w-4 h-4 text-green-500 fill-current" />
        </div>
      )}
    </div>
  );
}
