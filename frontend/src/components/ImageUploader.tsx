import React, { useState } from 'react';

// 1. Definimos la interfaz para las props
interface ImageUploaderProps {
  onImageReady?: (file: File, width: number, height: number) => void;
}

export default function ImageUploader({ onImageReady }: ImageUploaderProps) {
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const processFile = (file: File) => {
    setError('');
    
    // Validar formato estricto JPG/PNG según PB-01
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Formato no válido. Por favor, sube un archivo JPG o PNG.');
      setPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    
    // Extraer dimensiones en píxeles
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setPreview(imageUrl);
      if (onImageReady) onImageReady(file, img.width, img.height);
    };
    img.src = imageUrl;
  };

  // 2. Tipamos los eventos de React
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
    <div className="uploader-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={handleDrop}
        style={{ border: '2px dashed #888', padding: '2rem', textAlign: 'center', borderRadius: '8px' }}
      >
        <p>Arrastra tu imagen aquí o</p>
        <input 
          type="file" 
          accept="image/jpeg, image/png" 
          onChange={handleChange} 
          id="file-upload"
          style={{ display: 'none' }}
        />
        <label 
          htmlFor="file-upload" 
          style={{ cursor: 'pointer', background: '#007bff', color: 'white', padding: '8px 16px', borderRadius: '4px', display: 'inline-block', marginTop: '10px' }}
        >
          Seleccionar archivo
        </label>
      </div>

      {error && <p style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>{error}</p>}

      {preview && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Vista previa original</h3>
          <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p>Dimensiones: {dimensions.width} x {dimensions.height} px</p>
        </div>
      )}
    </div>
  );
}