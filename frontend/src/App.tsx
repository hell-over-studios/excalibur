import ImageUploader from './components/ImageUploader'; // Asegúrate de que la ruta sea correcta

function App() {
  const handleImageReady = (file: File, width: number, height: number) => {
    console.log("Imagen lista:", file.name, width, "x", height);
    // Aquí luego enviaremos los datos al backend
  };

  return (
    <main>
      <h1>Excalibur - Mejorador de Imágenes</h1>
      <ImageUploader onImageReady={handleImageReady} />
    </main>
  );
}

export default App;