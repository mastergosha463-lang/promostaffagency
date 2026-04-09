

interface ContactIconsProps {
  size?: "sm" | "md" | "lg";
}

const ContactIcons = ({ size = "md" }: ContactIconsProps) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconClass = iconSizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* VK */}
      <a
        href="https://vk.com/idplow777"
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconClass} flex items-center justify-center rounded-full bg-[#0077FF] hover:scale-110 transition-transform`}
        aria-label="VK"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.01-1.49-1.147-1.744-1.147-.356 0-.458.101-.458.593v1.563c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.101-.492.593-.492h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.675 2.862 4.675.22 0 .322-.101.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.575 2.15-3.575.119-.254.305-.492.745-.492h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"/>
        </svg>
      </a>
    </div>
  );
};

export default ContactIcons;
