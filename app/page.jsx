"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/register"); // redirect otomatis
  }, [router]);

  return <p className="text-center mt-20 text-gray-700">Redirecting to Register...</p>;
}
