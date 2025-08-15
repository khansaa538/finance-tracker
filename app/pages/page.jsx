"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/register"); // redirect ke daftar
  }, [router]);

  return <p className="text-center mt-20">Redirecting to Register...</p>;
}
