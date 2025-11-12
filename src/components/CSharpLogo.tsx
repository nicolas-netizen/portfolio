import React from 'react';

interface CSharpLogoProps {
  className?: string;
}

const CSharpLogo: React.FC<CSharpLogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <img
      src="/Csharp_Logo.png"
      alt="C# Logo"
      className={className}
    />
  );
};

export default CSharpLogo;

