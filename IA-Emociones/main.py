#instalaciones necesarias (se hacen por consola):
#pip install opencv-python
#pip install numpy
#pip install deepface --user
#pip install tf-keras --user
# en caso de error ctualizar el pip install

#importanciones
import cv2
import numpy as np
import os
import glob
import time
from deepface import DeepFace

carpeta = "Fotos.Emociones"
count = 0
#abro la cámara
cap = cv2.VideoCapture(0)  
if not cap.isOpened():
    print("Error: No se puede abrir la cámara")
    exit()

def AnalizarFotos ():
       # Ruta relativa a la ubicación del script
    script_dir = os.path.dirname(__file__)  # Obtiene el directorio del script
    foto = os.path.join(script_dir, 'Fotos.Emociones', 'Foto_auto_1.jpg')
   
    try:
        # Analiza la foto para detectar emociones
        analisis = DeepFace.analyze(img_path=foto, actions=["emotion"], enforce_detection=False)
       
        # Verifica si se ha detectado una cara
        if 'dominant_emotion' in analisis[0]:
            # Guarda la emoción dominante y la confianza de la detección en variables
            emocion_dominante = analisis[0]['dominant_emotion']
            face_confidence = analisis[0].get('face_confidence', 0)
             
            # Solo imprime si la confianza de la detección de la cara es mayor a 0.3
            if face_confidence > 0.3:
                print(f"Emoción dominante: {emocion_dominante}, Confianza que detecte cara: {face_confidence:.2f}")
            else:
                print("La confianza en la detección de la cara es demasiado baja.")
        else:
            print("No se detectó una cara en la foto.")
   
    except Exception as e:
        print(f"Ocurrió un error: {e}")
   
       
def obtener_ultimo_jpg(carpeta):
    archivos_jpg = [f for f in os.listdir(carpeta) if f.endswith('.jpg')]
   
    if not archivos_jpg:
        return None  # No hay archivos JPG en la carpeta

    archivos_jpg.sort(key=lambda f: os.path.getctime(os.path.join(carpeta, f)))
    ultimo_jpg = archivos_jpg[-1]
   
    return os.path.join(carpeta, ultimo_jpg)

def TomarFoto (carpeta, nombre):
    for (x, y, w, h) in faces:
        roi = frame[y:y+h, x:x+w]
        roi_resized = cv2.resize(roi, (720, 720))
        ubicacion = os.path.join(carpeta, nombre)
        cv2.imwrite(ubicacion, roi_resized)
        print ("Se guardo en la carpeta" , carpeta , "con el nombre" , nombre)
        count =+ 1
        ultima_foto = os.path.join( "Fotos.Emociones", f"foto_{count}.jpg")
        return(ultima_foto)


#importo el reconocedor de caras
cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(cascade_path)

# Bucle principal
inicio = time.time()

if face_cascade.empty():
    print("Error: No se puede cargar el clasificador de cascada")
    exit()
while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: No se puede recibir frame ")
        break

    if frame is None:
        print("Error: Frame está vacío")
        break
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=6, minSize=(50, 50))
    for (x, y, w, h) in faces:    #hago un rectangulo que se ponga encima de las caras detectadas
        cv2.rectangle(frame, (x, y), (x + w, y + h), (103, 46, 1), 3)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]

  # Verifica si han pasado 3 segundos
    tiempo_actual = time.time()
    tiempo_transcurrido = tiempo_actual - inicio

    if int(tiempo_transcurrido) % 3 == 0:  # Si el tiempo transcurrido es divisible por 3
        nombre = f'Foto_auto_{count + 1}.jpg'
        TomarFoto(carpeta, nombre)
        time.sleep(1)
        AnalizarFotos()
     
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) == ord('q'):         #para cerrar la camara tocar la letra q
        break

    if cv2.waitKey(1) == ord('s'): # para tomar foto letra s
        ListaDeFotos = glob.glob(os.path.join("Fotos.Emociones", '*'))
        count = len(ListaDeFotos) + 1
        TomarFoto("Fotos.Emociones", f'Foto nro{count}.jpg')
   
cap.release()
cv2.destroyAllWindows()

