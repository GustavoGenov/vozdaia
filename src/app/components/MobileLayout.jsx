// components/MobileLayout.jsx
import React from 'react';

export default function MobileLayout({ children }) {
  // No extra markup; mobile drawer is handled by Header component and CSS.
  return <>{children}</>;
}
