interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const AlexCloudLogo = ({ className = "", showText = true, size = "md" }: LogoProps) => {
  const dims = size === "sm" ? 28 : size === "lg" ? 56 : 36;
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
      >
        {/* Cloud body */}
        <path
          d="M48 30c0-7.18-5.82-13-13-13-5.4 0-10.04 3.3-12.02 7.99A9.5 9.5 0 0 0 8 34c0 5.25 4.25 9.5 9.5 9.5h28a8.5 8.5 0 0 0 2.5-16.66"
          fill="hsl(var(--accent))"
        />
        {/* Drips */}
        <path
          d="M18 43.5c0 3 1.5 5 3 7s-1 3-3 3-3-1-3-3 1.5-4 3-7z"
          fill="hsl(var(--accent))"
        />
        <path
          d="M30 43.5c0 4 2 6 2 9s-1.2 4-2 4-2-1-2-4 1-5 2-9z"
          fill="hsl(var(--primary))"
        />
        <path
          d="M42 43.5c0 2.5 1.2 4 2.5 5.5s-.5 2.5-2.5 2.5-2.5-.8-2.5-2.5 1.2-3 2.5-5.5z"
          fill="hsl(var(--accent))"
        />
      </svg>
      {showText && (
        <span className={`font-heading font-normal tracking-[0.2em] leading-none ${textSize}`}>
          <span className="text-foreground">ALEX</span>
          <span className="text-primary"> CLOUD</span>
        </span>
      )}
    </div>
  );
};

export default AlexCloudLogo;
