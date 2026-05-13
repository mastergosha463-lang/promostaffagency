import logoImage from "@/assets/eventwave-logo.jpg";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AlexCloudLogo = ({ className = "", size = "md" }: LogoProps) => {
  const sizeClass =
    size === "sm" ? "h-10" : size === "lg" ? "h-20 md:h-24" : "h-12 md:h-14";

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="EVENTWAVE"
        className={`${sizeClass} w-auto object-contain`}
      />
    </div>
  );
};

export default AlexCloudLogo;
