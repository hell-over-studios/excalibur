#  Excalibur (Reconstrucción y Escalado de Imágenes Digitales)

##  Descripción del Proyecto
Este proyecto implementa una aplicación web de procesamiento de señales e imágenes enfocada en el escalado (upscaling) por software. El objetivo es aumentar la resolución de texturas o imágenes de baja calidad (archivos `.bmp`) sin generar una pixelación evidente, calculando y rellenando los nuevos píxeles de forma matemática. 

El proyecto contrasta dos enfoques de métodos numéricos para la resolución de sistemas de ecuaciones locales basados en matrices de píxeles adyacentes.

##  Métodos Numéricos Implementados
1. **Interpolación Bilineal:** Calcula el valor de los nuevos píxeles realizando una interpolación lineal en ambas direcciones (ejes X e Y) utilizando los 4 píxeles vecinos más cercanos.
2. **Interpolación Bicúbica:** Ofrece un suavizado superior resolviendo ecuaciones polinómicas de tercer grado sobre una cuadrícula de 4x4 (16 píxeles adyacentes), mejorando notablemente la nitidez en los bordes.

##  Objetivos de la Aplicación
- Ingestar un archivo bitmap (`.bmp`) de baja resolución y convertirlo en una matriz numérica.
- Aplicar las matrices de transformación matemática para interpolar los nuevos valores espaciales.
- Exportar la imagen resultante a una resolución mayor.
- **Comparación Analítica:** Evaluar y contrastar visualmente la calidad de la imagen generada, así como medir el costo y rendimiento computacional (tiempo de ejecución) entre el método lineal y el cúbico.

##  Tecnologías
- **Lenguaje:** Python 3.x
- **Librerías principales:** 
  - `NumPy`: Para el manejo eficiente de las matrices de píxeles y resolución de ecuaciones.
  - `Pillow` / `OpenCV` (Opcional): Exclusivamente para facilitar la lectura/escritura de los formatos de archivo.
