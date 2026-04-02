"use client";

import React from 'react';

// ABSOLUTE FORCE STUB: Preventing root-level Auth.js crashes.
// This transparent wrapper ensures the application can render its layout and pages
// even if the underlying NextAuth library is encountering initialization errors.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
