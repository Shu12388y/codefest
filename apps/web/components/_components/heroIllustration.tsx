import {
  GraduationCap, Code2, ClipboardList, Building2,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const floatCards = [
  {
    icon: GraduationCap,
    label: 'GATE Preparation',
    className: 'left-0 top-6 animate-float-slow',
    iconBg: 'bg-primary-100 text-primary-600',
  },
  {
    icon: Code2,
    label: 'DSA Practice',
    className: 'right-0 top-0 animate-float',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    icon: ClipboardList,
    label: 'Mock Tests',
    className: 'left-0 bottom-20 animate-float',
    iconBg: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Building2,
    label: 'Latest Jobs',
    className: 'right-0 bottom-14 animate-float-slow',
    iconBg: 'bg-success-100 text-success-600',
  },
];

export function HeroIllustration() {
  return (
    <div className="relative mx-auto max-w-md">
      {/* Soft background glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-100/50 to-primary-200/20 blur-3xl dark:from-primary-600/10 dark:to-primary-800/5" />

      {/* SVG illustration: graduation cap + laptop + books + connecting lines */}
      <svg
        viewBox="0 0 400 380"
        fill="none"
        className="relative mx-auto w-full max-w-[400px]"
        role="img"
        aria-label="Learning dashboard illustration with laptop, graduation cap and books"
      >
        {/* Dotted connecting lines from cards to laptop */}
        <g stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" opacity="0.7">
          <path d="M 60 70 Q 120 100 160 150" />
          <path d="M 340 50 Q 280 90 240 140" />
          <path d="M 50 290 Q 110 270 160 230" />
          <path d="M 350 270 Q 290 260 250 235" />
        </g>

        {/* Graduation cap (mortarboard) — above laptop */}
        <g className="animate-float-slow">
          {/* Cap base shadow */}
          <ellipse cx="200" cy="62" rx="42" ry="6" fill="#4F46E5" opacity="0.08" />
          {/* Mortarboard top — diamond shape */}
          <path d="M 200 30 L 248 50 L 200 70 L 152 50 Z" fill="#4F46E5" />
          {/* Cap band */}
          <path d="M 168 56 Q 168 70 200 74 Q 232 70 232 56 L 232 60 Q 232 72 200 76 Q 168 72 168 60 Z" fill="#4338CA" />
          {/* Tassel */}
          <circle cx="248" cy="50" r="3.5" fill="#6366F1" />
          <path d="M 248 50 Q 252 58 252 66" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="252" cy="69" r="3" fill="#818CF8" />
          {/* Highlight on cap */}
          <path d="M 200 32 L 230 46 L 200 40 L 170 46 Z" fill="#6366F1" opacity="0.5" />
        </g>

        {/* Laptop — center, largest element */}
        <g>
          {/* Laptop screen back/shadow */}
          <rect x="118" y="100" width="164" height="110" rx="10" fill="#4F46E5" opacity="0.06" transform="translate(4 4)" />
          {/* Screen bezel */}
          <rect x="118" y="100" width="164" height="110" rx="10" fill="#1E1B4B" />
          {/* Screen */}
          <rect x="124" y="106" width="152" height="98" rx="6" fill="#F8FAFC" />
          {/* Screen content — learning dashboard / video player */}
          {/* Top bar */}
          <rect x="132" y="114" width="60" height="5" rx="2.5" fill="#E0E7FF" />
          <rect x="132" y="124" width="36" height="3.5" rx="1.75" fill="#C7D2FE" />
          {/* Video player area */}
          <rect x="132" y="134" width="136" height="48" rx="5" fill="#EEF2FF" />
          {/* Play button */}
          <circle cx="200" cy="158" r="12" fill="#4F46E5" />
          <path d="M 196 152 L 208 158 L 196 164 Z" fill="white" />
          {/* Progress bar */}
          <rect x="142" y="190" width="80" height="3.5" rx="1.75" fill="#E0E7FF" />
          <rect x="142" y="190" width="50" height="3.5" rx="1.75" fill="#4F46E5" />
          <circle cx="192" cy="192" r="3" fill="#4F46E5" />
          {/* Side widgets */}
          <rect x="232" y="186" width="36" height="14" rx="3" fill="#E0E7FF" />
          <rect x="236" y="190" width="12" height="6" rx="1.5" fill="#6366F1" />

          {/* Laptop base */}
          <path d="M 108 210 L 292 210 L 300 226 L 100 226 Z" fill="#C7D2FE" />
          <path d="M 108 210 L 292 210 L 296 218 L 104 218 Z" fill="#A5B4FC" />
          {/* Trackpad notch */}
          <rect x="186" y="212" width="28" height="3" rx="1.5" fill="#818CF8" opacity="0.5" />
        </g>

        {/* Books — below laptop */}
        <g>
          {/* Bottom book (widest) */}
          <rect x="128" y="250" width="144" height="16" rx="3" fill="#6366F1" />
          <rect x="128" y="250" width="144" height="4" rx="2" fill="#818CF8" />
          <rect x="134" y="256" width="6" height="10" rx="1" fill="#4338CA" opacity="0.4" />

          {/* Middle book */}
          <rect x="136" y="232" width="128" height="16" rx="3" fill="#4F46E5" />
          <rect x="136" y="232" width="128" height="4" rx="2" fill="#6366F1" />
          <rect x="142" y="238" width="5" height="10" rx="1" fill="#312E81" opacity="0.3" />

          {/* Top book (narrowest) */}
          <rect x="148" y="214" width="104" height="16" rx="3" fill="#A5B4FC" />
          <rect x="148" y="214" width="104" height="4" rx="2" fill="#C7D2FE" />
          <rect x="154" y="220" width="4" height="10" rx="1" fill="#818CF8" opacity="0.4" />
        </g>

        {/* Small plant — right side for balance */}
        <g className="animate-float-slow">
          {/* Pot */}
          <path d="M 330 270 L 352 270 L 348 292 L 334 292 Z" fill="#C7D2FE" />
          <rect x="330" y="268" width="22" height="4" rx="2" fill="#A5B4FC" />
          {/* Stem */}
          <path d="M 341 268 Q 341 252 341 240" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          {/* Leaves */}
          <ellipse cx="334" cy="250" rx="8" ry="5" fill="#10B981" transform="rotate(-30 334 250)" />
          <ellipse cx="348" cy="244" rx="7" ry="4.5" fill="#10B981" transform="rotate(25 348 244)" />
          <ellipse cx="341" cy="236" rx="6" ry="4" fill="#059669" />
        </g>

        {/* Subtle decorative dots */}
        <circle cx="70" cy="140" r="3" fill="#C7D2FE" opacity="0.5" />
        <circle cx="330" cy="120" r="3" fill="#C7D2FE" opacity="0.5" />
        <circle cx="80" cy="240" r="2.5" fill="#A5B4FC" opacity="0.4" />
      </svg>

      {/* Floating cards around the illustration */}
      {floatCards.map((card) => (
        <div
          key={card.label}
          className={cn(
            'absolute flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2 shadow-soft dark:border-slate-700 dark:bg-slate-800/90',
            card.className,
          )}
        >
          <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', card.iconBg)}>
            <card.icon className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{card.label}</span>
        </div>
      ))}
    </div>
  );
}
