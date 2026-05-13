interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AlexCloudLogo = ({ className = "", size = "md" }: LogoProps) => {
  const textSize =
    size === "sm" ? "text-base" : size === "lg" ? "text-3xl md:text-4xl" : "text-xl md:text-2xl";

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-heading font-normal tracking-[0.25em] leading-none ${textSize}`}>
        <span className="text-primary">CLOUD</span>
        <span className="text-foreground">STAFF</span>
      </span>
    </div>
  );
};

export default AlexCloudLogo;
