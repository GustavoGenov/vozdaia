// components/DesktopLayout.jsx
import React from 'react';

export default function DesktopLayout({ children }) {
  // Desktop uses the existing sidebar (already in layout) and just renders children.
  return <>{children}</>;
}
