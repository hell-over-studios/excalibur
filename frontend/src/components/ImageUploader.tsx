import React, { useState } from 'react';

interface ImageUploaderProps {
  onImageReady?: (file: File, width: number, height: number) => void;
}

export default function ImageUploader({ onImageReady }: ImageUploaderProps) {
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const processFile = (file: File) => {
    setError('');
    
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Formato no válido. Por favor, sube un archivo JPG o PNG.');
      setPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setPreview(imageUrl);
      if (onImageReady) onImageReady(file, img.width, img.height);
    };
    img.src = imageUrl;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="card">
      <h2 className="card-title">1. Carga tu imagen</h2>
      <div 
        className="drop-zone"
        onDragOver={(e) => e.preventDefault()} 
        onDrop={handleDrop}
      >
        <p>Arrastra tu imagen aquí o</p>
        <input 
          type="file" 
          accept="image/jpeg, image/png" 
          onChange={handleChange} 
          id="file-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" className="btn btn-primary">
          Seleccionar archivo
        </label>
      </div>

      {error && <p className="error-text">{error}</p>}

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Vista previa" />
          <div className="info-box">
            <strong>Dimensiones originales:</strong> {dimensions.width} x {dimensions.height} px
          </div>
        </div>
      )}
    </div>
  );
}