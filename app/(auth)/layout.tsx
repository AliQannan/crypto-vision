"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        {children}
      </div>
    </div>
  );
}
