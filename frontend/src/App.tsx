import { useState, useCallback } from 'react';
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
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Excalibur - Mejorador de Imágenes</h1>
      
      {/* Componente de PB-01 */}
      <ImageUploader onImageReady={handleImageReady} />

      {/* Componente de PB-02 */}
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