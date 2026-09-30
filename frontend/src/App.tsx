import { useState, useCallback } from 'react';
import './App.css'; // Importación de nuestra nueva hoja de estilos
import ImageUploader from './components/ImageUploader';
import ScaleSelector from './components/ScaleSelector';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentScale, setCurrentScale] = useState<number>(2);

  const handleImageReady = (file: File, width: number, height: number) => {
    setSelectedFile(file);
    setDimensions({ width, height });
  };

  const handleScaleChange = useCallback((scale: number) => {
    setCurrentScale(scale);
  }, []);

  return (
    <main className="main-container">
      <h1 className="title">Excalibur - Mejorador de Imágenes</h1>
      
      <ImageUploader onImageReady={handleImageReady} />

      {selectedFile && (
        <ScaleSelector 
          originalWidth={dimensions.width} 
          originalHeight={dimensions.height}
          onScaleChange={handleScaleChange}
        />
      )}
    </main>
  );
}

export default App;