export default function LangsiLogo({ className = 'h-20 w-auto' }) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className}
      role="img"
      aria-label="Langsi"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="langsi-logo-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#langsi-logo-glow)" fill="#4ADE80">
        <path d="M120 6 C123 26 129 39 150 43 C129 47 123 60 120 80 C117 60 111 47 90 43 C111 39 117 26 120 6 Z" />
        <path d="M170 16 C171.6 24.5 174.2 28.6 182.5 30.5 C174.2 32.4 171.6 36.5 170 45 C168.4 36.5 165.8 32.4 157.5 30.5 C165.8 28.6 168.4 24.5 170 16 Z" />
        <text
          x="120"
          y="110"
          textAnchor="middle"
          fontFamily="'Poppins', sans-serif"
          fontWeight="700"
          fontSize="42"
          letterSpacing="1"
        >
          LANGSI
        </text>
        <path
          d="M42 128 C75 142 165 142 198 122"
          stroke="#4ADE80"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M168 116 L182 132 L208 102"
          stroke="#4ADE80"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
