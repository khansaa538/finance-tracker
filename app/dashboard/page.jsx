"use client";

import dynamic from "next/dynamic";

// Dynamic import untuk menghindari SSR issues
const DashboardContent = dynamic(() => import("../components/DashboardContent"), {
  ssr: false,
  loading: () => <p className="text-center mt-20 text-white">Loading...</p>,
});

export default function DashboardPage() {
  return <DashboardContent />;
} 