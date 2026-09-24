interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'dark' ? 'text-ink' : 'text-white'

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-ink">
        <svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M9 22.5 16 8l7 14.5-7-3.6-7 3.6Z" fill="#2452E8" />
        </svg>
      </span>
      <span className={`font-display text-[17px] font-bold tracking-tight ${textColor}`}>
        LeadPilot<span className="text-accent"> AI</span>
      </span>
    </span>
  )
}

export default Logo
