import React from 'react';

interface BentoCardProps {
  tag?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'gold' | 'danger';
  children?: React.ReactNode;
  className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  tag,
  title,
  description,
  icon,
  variant = 'default',
  children,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gold':
        return 'card-luxury-gold';
      case 'danger':
        return 'bg-red-950/20 border border-red-500/20 shadow-[0_4px_20px_rgba(239,68,68,0.08)]';
      default:
        return 'card-luxury';
    }
  };

  return (
    <div
      className={`rounded-2xl p-4 flex flex-col justify-between transition-all ${getVariantStyles()} ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          {tag && (
            <span
              className={`text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full ${
                variant === 'gold'
                  ? 'bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40'
                  : variant === 'danger'
                  ? 'bg-red-500/15 text-red-300 border border-red-500/30'
                  : 'bg-white/[0.04] text-slate-400 border border-white/[0.08]'
              }`}
            >
              {tag}
            </span>
          )}
          {icon && <div className="text-[#D4AF37]">{icon}</div>}
        </div>

        <h3 className="font-serif text-base font-medium text-white tracking-tight leading-snug">
          {title}
        </h3>

        {description && (
          <p className="mt-1.5 text-xs text-slate-400 font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
};
