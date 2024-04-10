'use client';

import Card from "@/components/Card/Card";
import StickyCursor from "@/components/StickyCursor/StickyCursor";
import { useRef } from "react"; // Importerer useRef hook fra React.

export default function Home() {
  const cardRef = useRef(null); // Opretter en ref til det element, som StickyCursor skal "klæbe" til.

  return (
    <div className="w-full h-screen flex flex-col gap-10 justify-center items-center">
      {/* Render Card komponenten og tilføj en ref */}
      {/* the StickyCursor should stick to this component when hovering it */}
      <Card ref={cardRef} /> 

      {/* Render StickyCursor komponenten og overfør stickyElementRef som prop */}
      <StickyCursor stickyElement={cardRef} hoveredClassName="hidden"/>
    </div>
  );
}
