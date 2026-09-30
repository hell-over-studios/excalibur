import React, { useState, useEffect } from 'react';

interface ScaleSelectorProps {
  originalWidth: number;
  originalHeight: number;
  onScaleChange: (scale: number) => void;
}

export default function ScaleSelector({ originalWidth, originalHeight, onScaleChange }: ScaleSelectorProps) {
  const [scale, setScale] = useState<number>(2);

  useEffect(() => {
    onScaleChange(scale);
  }, [scale, onScaleChange]);

  const newWidth = originalWidth * scale;
  const newHeight = originalHeight * scale;
  const factors = [2, 3, 4];

  return (
    <div className="card">
      <h2 className="card-title">2. Factor de escala</h2>
      
      <div className="button-group">
        {factors.map(val => (
          <button
            key={val}
            onClick={() => setScale(val)}
            className={`btn ${scale === val ? 'btn-active' : 'btn-outline'}`}
          >
            {val}x
          </button>
        ))}
      </div>

      {originalWidth > 0 && (
        <div className="info-box">
          <strong>Dimensiones resultantes estimadas:</strong> {newWidth} x {newHeight} px
        </div>
      )}
    </div>
  );
}