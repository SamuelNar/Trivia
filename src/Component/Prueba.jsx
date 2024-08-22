
import { useState, useEffect } from 'react';
const Prueba = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      // Cambia el estado después de que el componente se monta
      const timer = setTimeout(() => {
        setIsExpanded(true);
      }, 40000); // Pequeño retraso para asegurar que la animación empiece antes de aplicar el cambio de color
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className="outer-border">
        <div className={`inner-border ${isExpanded ? 'expanded' : ''}`}></div>
      </div>
    );
}

export default Prueba;