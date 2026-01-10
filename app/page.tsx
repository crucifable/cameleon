"use client";

import { Particles } from "@/components/ui/particles"
import { Header } from "@/components/header-with-search"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const Demo = () => {
  const [os, setOs] = useState<{ name: string; icon: string }>({ name: "Windows", icon: "🪟" });

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Mac") !== -1) {
      setOs({ name: "Mac", icon: "🍎" });
    } else if (userAgent.indexOf("Linux") !== -1) {
      setOs({ name: "Linux", icon: "🐧" });
    } else if (userAgent.indexOf("Android") !== -1) {
      setOs({ name: "Android", icon: "🤖" });
    } else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
      setOs({ name: "iOS", icon: "📱" });
    } else {
      setOs({ name: "Windows", icon: "🪟" });
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Header />
      {/* Full-screen particle background */}
      <div className="absolute inset-0 z-0">
        <Particles quantity={300} className="h-full w-full" color="#000000" />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center w-full max-w-5xl px-4">
        {/* Brand Label */}
        <div className="flex items-center gap-2 mb-8 animate-fade-in-up">
          <img src="/cameleon.png" alt="Cameleon Logo" className="size-8" />
          <span className="font-product text-2xl font-medium text-foreground">Crucible Cameleon</span>
        </div>

        {/* Main Headlines */}
        <h1 className="font-product text-6xl md:text-8xl font-medium tracking-tight mb-4 text-foreground animate-fade-in-up delay-100">
          Experience liftoff
        </h1>
        <p className="font-product text-4xl md:text-6xl text-muted-foreground mb-12 animate-fade-in-up delay-200">
          with the next-generation IDE
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 animate-fade-in-up delay-300">
          <Button size="lg" className="rounded-full h-12 px-8 text-lg">
            <span className="mr-2">{os.icon}</span> Download for {os.name}
          </Button>
          <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 text-lg bg-secondary/80 hover:bg-secondary">
            Explore use cases
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Demo;