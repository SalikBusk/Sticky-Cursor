'use client'; // Denne linje ser ud til at være en fejl. Måske er det meningen at sige 'use strict' i stedet.

import { useEffect, useState } from 'react'; // Importerer useEffect og useState hooks fra React.
import { motion, useMotionValue, useSpring } from 'framer-motion'; // Importerer motion, useMotionValue og useSpring hooks fra framer-motion.

export default function StickyCursor({ stickyElement, hoveredClassName }) {
  // Funktionen for det tilpassede kursor-komponent, der tager nogle props.

  const [isHovered, setIsHovered] = useState(false); // Bruger useState hook til at oprette en state-variabel til at spore, om kursor er hoveret over et element.
    const cursorSize = isHovered ? hoveredClassName ? 50 : 15 : 15; 
    
  const mouse = {
    x: useMotionValue(0), // Opretter en motion value til x-koordinaten for musepositionen.
    y: useMotionValue(0) // Opretter en motion value til y-koordinaten for musepositionen.
  }

  // Options til at glatte museværdierne.
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 }
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions), // Anvender en fjeder til x-koordinaten for at gøre bevægelsen glat.
    y: useSpring(mouse.y, smoothOptions) // Anvender en fjeder til y-koordinaten for at gøre bevægelsen glat.
  }

  // Funktion til at håndtere musebevægelse.
const manageMouseMove = e => {
    const { clientX, clientY } = e; // Henter musepositionen fra event objektet.
    if (isHovered && stickyElement.current) {
        const { left, top, height, width } = stickyElement.current.getBoundingClientRect(); // Får dimensionerne og positionen af det element, som kursor skal "klæbe" til.

        // Beregner midten af det element, som kursor skal "klæbe" til.
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Flyt kursor til midten af det element.
        mouse.x.set(centerX - cursorSize / 2);
        mouse.y.set(centerY - cursorSize / 2);
    } else {
        // Flyt det tilpassede kursor til den aktuelle museposition.
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
    }
}


  // Funktion til at håndtere musehover over elementet.
  const manageMouseOver = () => {
    setIsHovered(true); // Sætter isHovered til true, når musemarkøren er hoveret over elementet.
  }

  // Funktion til at håndtere musehover, når musemarkøren forlader elementet.
  const manageMouseLeave = () => {
    setIsHovered(false); // Sætter isHovered til false, når musemarkøren forlader elementet.
  }

  // Effekt-hook, der håndterer event listeners for musebevægelser og hover.
  useEffect(() => {
    if (stickyElement.current) {
      stickyElement.current.addEventListener("mouseenter", manageMouseOver); // Lytter efter mouseenter event på det givne element.
      stickyElement.current.addEventListener("mouseleave", manageMouseLeave); // Lytter efter mouseleave event på det givne element.
    }
    window.addEventListener("mousemove", manageMouseMove); // Lytter efter mousemove event på vinduet.
    return () => {
      if (stickyElement.current) {
        stickyElement.current.removeEventListener("mouseenter", manageMouseOver); // Fjerner mouseenter event listener, når komponenten fjernes.
        stickyElement.current.removeEventListener("mouseleave", manageMouseLeave); // Fjerner mouseleave event listener, når komponenten fjernes.
      }
      window.removeEventListener("mousemove", manageMouseMove); // Fjerner mousemove event listener, når komponenten fjernes.
    }
  }, [stickyElement, isHovered]); // Køres kun, når stickyElement eller isHovered ændrer sig.

  return (
    <div className=''>
      <motion.div
        style={{
          left: smoothMouse.x, // Indstiller x-koordinaten for det tilpassede kursor til den glattede værdi.
          top: smoothMouse.y, // Indstiller y-koordinaten for det tilpassede kursor til den glattede værdi.
        }}
              animate={{
                  width: isHovered? `${hoveredClassName}`: `${isHovered}`, // Animerer bredden af det tilpassede kursor.
                  height: isHovered? `${hoveredClassName}`: `${isHovered}` // Animerer højden af det tilpassede kursor.
        }}
        className={`fixed border border-black pointer-events-none ${isHovered ? `${hoveredClassName}` : "w-5 h-5 rounded-full"}`}
      />
    </div>
  )
}
