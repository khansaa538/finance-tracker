"use client";

import dynamic from "next/dynamic";

// Dynamic import untuk menghindari SSR issues
const RegisterContent = dynamic(() => import("../components/RegisterContent"), {
  ssr: false,
  loading: () => <p className="text-center mt-20 text-white">Loading...</p>,
});

export default function RegisterPage() {
  return <RegisterContent />;
} 