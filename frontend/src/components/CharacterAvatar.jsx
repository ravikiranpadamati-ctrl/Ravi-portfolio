export default function CharacterAvatar({ className = "w-full h-full", framed = false }) {
  return (
    <svg
      viewBox="0 0 280 280"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {framed ? (
        <>
          <circle cx="140" cy="140" r="120" fill="#F4F0E6" stroke="#E6DFD3" strokeWidth="2" />
          <circle cx="140" cy="140" r="100" fill="#FFFDF9" stroke="#E6DFD3" strokeDasharray="4 4" />
        </>
      ) : null}

      {/* Shoulders / Torso / Navy Hoodie */}
      <path
        d="M60 250 C60 200, 100 185, 140 185 C180 185, 220 200, 220 250"
        fill="#0B192C"
      />
      {/* Hoodie Collar / Zipper Details */}
      <path d="M125 185 L140 215 L155 185" fill="#FAF7F2" />
      <path d="M140 215 L140 250" stroke="#FAF7F2" strokeWidth="2" strokeDasharray="2 2" />

      {/* Lanyard Cord around neck */}
      <path d="M115 185 L135 235" stroke="#1E3E62" strokeWidth="3" />
      <path d="M165 185 L145 235" stroke="#1E3E62" strokeWidth="3" />
      {/* Miniature Badge Clip on chest */}
      <rect x="132" y="232" width="16" height="18" rx="2" fill="#FAF7F2" stroke="#0B192C" strokeWidth="1.5" />
      <rect x="135" y="235" width="10" height="2" fill="#10B981" />

      {/* Neck */}
      <rect x="124" y="150" width="32" height="38" rx="6" fill="#FCD3B6" />
      {/* Shadow under chin */}
      <path d="M124 165 C132 172, 148 172, 156 165 L156 150 L124 150 Z" fill="#E8B490" opacity="0.6" />

      {/* Head Base */}
      <rect x="100" y="85" width="80" height="85" rx="30" fill="#FCD3B6" />

      {/* Ears */}
      <circle cx="98" cy="130" r="10" fill="#FCD3B6" />
      <circle cx="182" cy="130" r="10" fill="#FCD3B6" />

      {/* Hair (Deep Navy, Modern crop) */}
      <path
        d="M96 110 C96 70, 120 58, 140 58 C160 58, 184 70, 184 110 C184 95, 175 80, 140 80 C105 80, 96 95, 96 110 Z"
        fill="#0B192C"
      />
      <path
        d="M100 85 C115 65, 145 65, 180 85 C170 75, 155 70, 140 70 C125 70, 110 75, 100 85 Z"
        fill="#1E3E62"
      />

      {/* Eyebrows */}
      <path d="M115 112 Q125 109 132 112" stroke="#0B192C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M148 112 Q155 109 165 112" stroke="#0B192C" strokeWidth="2.5" strokeLinecap="round" />

      {/* Glasses Frame (Modern Stylish Navy Wireframes) */}
      <rect x="110" y="116" width="25" height="18" rx="6" stroke="#0B192C" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.4" />
      <rect x="145" y="116" width="25" height="18" rx="6" stroke="#0B192C" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.4" />
      {/* Bridge & Temples */}
      <path d="M135 124 L145 124" stroke="#0B192C" strokeWidth="2.5" />
      <path d="M100 122 L110 124" stroke="#0B192C" strokeWidth="2" />
      <path d="M170 124 L180 122" stroke="#0B192C" strokeWidth="2" />

      {/* Eyes Behind Glasses */}
      <circle cx="122" cy="125" r="3" fill="#0B192C" />
      <circle cx="157" cy="125" r="3" fill="#0B192C" />
      <circle cx="123" cy="124" r="1" fill="#FFFFFF" />
      <circle cx="158" cy="124" r="1" fill="#FFFFFF" />

      {/* Nose */}
      <path d="M138 128 L142 136 L137 138" stroke="#D89D78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Confident Smile */}
      <path d="M130 148 Q140 156 150 148" stroke="#0B192C" strokeWidth="2.5" strokeLinecap="round" />

      {/* Sleek Over-Ear Studio Headphones (Tech Vibe) */}
      <path d="M96 115 C92 90, 110 70, 140 70 C170 70, 188 90, 184 115" stroke="#1E3E62" strokeWidth="4" strokeLinecap="round" />
      <rect x="88" y="115" width="12" height="28" rx="6" fill="#0B192C" stroke="#1E3E62" strokeWidth="1.5" />
      <rect x="180" y="115" width="12" height="28" rx="6" fill="#0B192C" stroke="#1E3E62" strokeWidth="1.5" />

      {/* Laptop Corner Silhouette at Bottom */}
      <rect x="85" y="240" width="110" height="40" rx="6" fill="#FAF7F2" stroke="#E6DFD3" strokeWidth="2" />
      <circle cx="140" cy="256" r="6" fill="#0B192C" />
    </svg>
  )
}
