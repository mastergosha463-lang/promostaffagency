interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const AlexCloudLogo = ({ className = "", showText = true, size = "md" }: LogoProps) => {
  const dims = size === "sm" ? 28 : size === "lg" ? 56 : 38;
  const textSize =
    size === "sm" ? "text-base" : size === "lg" ? "text-3xl md:text-4xl" : "text-xl md:text-2xl";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={dims}
        height={dims}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
        style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.8))" }}
      >
        <defs>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
        {/* Cloud body */}
        <path
          d="M48 30c0-7.18-5.82-13-13-13-5.4 0-10.04 3.3-12.02 7.99A9.5 9.5 0 0 0 8 34c0 5.25 4.25 9.5 9.5 9.5h28a8.5 8.5 0 0 0 2.5-16.66"
          fill="url(#cloudGrad)"
        />
        {/* Drips */}
        <path d="M18 43.5c0 3 1.5 5 3 7s-1 3-3 3-3-1-3-3 1.5-4 3-7z" fill="hsl(var(--primary))" />
        <path d="M30 43.5c0 4 2 6 2 9s-1.2 4-2 4-2-1-2-4 1-5 2-9z" fill="hsl(var(--accent))" />
        <path d="M42 43.5c0 2.5 1.2 4 2.5 5.5s-.5 2.5-2.5 2.5-2.5-.8-2.5-2.5 1.2-3 2.5-5.5z" fill="hsl(var(--primary))" />
      </svg>
      {showText && (
        <span
          className={`font-heading font-normal tracking-[0.25em] leading-none ${textSize} text-foreground`}
          style={{ textShadow: "0 0 12px hsl(var(--primary) / 0.5)" }}
        >
          CLOUD<span className="text-primary">STAFF</span>
        </span>
      )}
    </div>
  );
};

export default AlexCloudLogo;
