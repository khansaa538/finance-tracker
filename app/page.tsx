"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/register"); // default diarahkan ke Daftar
  }, [router]);

  return <p className="text-center mt-20 text-gray-700">Redirecting...</p>;
}
