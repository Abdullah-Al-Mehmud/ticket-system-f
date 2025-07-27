import React from 'react';
import './style.css'; // Make sure this CSS file is imported

const PageLoading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center  backdrop-blur-sm fixed inset-0 z-50">
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="45" fill="none" stroke="#d97706" strokeWidth="2" opacity="0.2" />

        <circle className="progress-circle"
          cx="60" cy="60" r="45"
          fill="none"
          stroke="#d97706"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0 283"
        />

        <line x1="60" y1="0" x2="60" y2="120" stroke="#d97706" strokeWidth="0.5" opacity="0.3" strokeDasharray="2,2" />
        <line x1="0" y1="60" x2="120" y2="60" stroke="#d97706" strokeWidth="0.5" opacity="0.3" strokeDasharray="2,2" />

        <circle cx="60" cy="60" r="1" fill="#d97706" opacity="0.5" />

        <g className="ticket-icon">
          <path d="M35 45 L75 45 Q80 45 80 50 L80 55 Q85 55 85 60 Q85 65 80 65 L80 70 Q80 75 75 75 L35 75 Q30 75 30 70 L30 65 Q25 65 25 60 Q25 55 30 55 L30 50 Q30 45 35 45 Z"
            fill="#d97706" />

          <circle cx="80" cy="52" r="1.5" fill="white" />
          <circle cx="80" cy="60" r="1.5" fill="white" />
          <circle cx="80" cy="68" r="1.5" fill="white" />

          <rect x="38" y="52" width="20" height="1.5" rx="0.5" fill="white" opacity="0.9" />
          <rect x="38" y="57" width="25" height="1.5" rx="0.5" fill="white" opacity="0.7" />
          <rect x="38" y="65" width="15" height="1.5" rx="0.5" fill="white" opacity="0.7" />

          <path d="M65 54 L66.5 57 L70 57 L67.2 59.5 L68 63 L65 60.8 L62 63 L62.8 59.5 L60 57 L63.5 57 Z"
            fill="white" opacity="0.8" />
        </g>

        <g className="circle-border">
          <circle cx="60" cy="15" r="2" fill="#d97706" opacity="0.8" />
          <circle cx="105" cy="60" r="2" fill="#d97706" opacity="0.6" />
          <circle cx="60" cy="105" r="2" fill="#d97706" opacity="0.4" />
          <circle cx="15" cy="60" r="2" fill="#d97706" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
};

export default PageLoading;
