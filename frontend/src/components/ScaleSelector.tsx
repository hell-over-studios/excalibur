import React, { useState, useEffect } from 'react';

interface ScaleSelectorProps {
  originalWidth: number;
  originalHeight: number;
  onScaleChange: (scale: number) => void;
}

export default function ScaleSelector({ originalWidth, originalHeight, onScaleChange }: ScaleSelectorProps) {
  // El factor 2x está seleccionado por defecto[cite: 2]
  const [scale, setScale] = useState<number>(2);

  // Avisar a App.tsx cuando el usuario cambie la escala
  useEffect(() => {
    onScaleChange(scale);
  }, [scale, onScaleChange]);

  const newWidth = originalWidth * scale;
  const newHeight = originalHeight * scale;

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
        Seleccionar factor de escala:
      </label>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {/* Ofrecer factores predefinidos de 2x, 3x y 4x[cite: 2] */}
        {[2, 3, 4].map(val => (
          <button
            key={val}
            onClick={() => setScale(val)}
            style={{
              padding: '8px 16px',
              backgroundColor: scale === val ? '#007bff' : '#f8f9fa',
              color: scale === val ? 'white' : 'black',
              border: '1px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {val}x
          </button>
        ))}
      </div>

      {/* Mostrar dimensiones resultantes en píxeles antes de procesar[cite: 2] */}
      {originalWidth > 0 && (
        <div style={{ padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
          <p style={{ margin: 0, color: '#495057' }}>
            <strong>Dimensiones resultantes estimadas:</strong> {newWidth} x {newHeight} px
          </p>
        </div>
      )}
    </div>
  );
}