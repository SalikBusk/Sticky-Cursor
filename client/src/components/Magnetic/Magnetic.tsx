"use client"

import { useRef, useState } from 'react';  
import { motion } from 'framer-motion';     

export default function Magnetic({ children }) {  // Funktionen Magnetic er en React-komponent, der modtager et children-element som prop
    const ref = useRef(null);  // Opretter en reference til et DOM-element
    const [position, setPosition] = useState({ x: 0, y: 0 });  // Opretter en state-variabel til at holde positionen for musemarkøren

    const handleMouse = (e) => {  // En funktion, der håndterer musebevægelsesbegivenheder
        const { clientX, clientY } = e;  // Henter klientens X- og Y-koordinater fra musebegivenheden
        const { height, width, left, top } = ref.current.getBoundingClientRect();  // Henter størrelse og position af det ref-element, der er associeret med komponenten
        const middleX = clientX - (left + width / 2);  // Beregner afstanden fra musemarkørens X-koordinat til midten af elementet
        const middleY = clientY - (top + height / 2);  // Beregner afstanden fra musemarkørens Y-koordinat til midten af elementet
        setPosition({ x: middleX / 15, y: middleY / 15 });  // Opdaterer position-state med de nye koordinater
    };

    const reset = () => {  // En funktion til at nulstille position-state
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;  // Henter x- og y-koordinaterne fra position-state
    return (
        <div
            style={{ position: "relative" }}  // Styler div-elementet til relativ positionering
            ref={ref}  // Tilknytter ref til dette div-element
            onMouseMove={handleMouse}  // Lytter efter onMouseMove-begivenheder og kalder handleMouse-funktionen
            onMouseLeave={reset}  // Lytter efter onMouseLeave-begivenheder og kalder reset-funktionen
        >
            <motion.div
                style={{ left: 0, top: 0 }}  // Styler motion.div-elementet
                animate={{ x, y }}  // Animerer elementet med x- og y-koordinaterne fra position-state
                transition={{ type: "spring", stiffness: 50, damping: 10, mass: 0.2 }}  // Indstiller animationstransitionen
            >
                {children}  
            </motion.div>
        </div>
    );
}
