import { useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackInitials?: string;
}

export function UserAvatar({ src, alt = 'User avatar', className, size = 'md', fallbackInitials }: UserAvatarProps) {
  const [isLoading, setIsLoading] = useState(!!src);
  const [error, setError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-24 w-24 text-lg',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  const getInitials = () => {
    if (!fallbackInitials) return '';
    return fallbackInitials
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const showImage = src && !error;
  const showPlaceholder = !src || error;

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border',
        sizeClasses[size],
        className
      )}
    >
      {/* Loading skeleton */}
      {isLoading && <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-full" />}

      {/* Image */}
      {showImage && (
        <img
          src={src || '/placeholder.svg'}
          alt={alt}
          className={cn(
            'w-full h-full object-cover rounded-full',
            isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-200'
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Placeholder */}
      {showPlaceholder && !isLoading && (
        <>
          {fallbackInitials ? (
            <span className="text-gray-600 font-medium select-none">{getInitials()}</span>
          ) : (
            <User className={cn('text-gray-400', iconSizes[size])} />
          )}
        </>
      )}
    </div>
  );
}
