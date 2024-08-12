#instalaciones necesarias (se hacen por consola): 
#pip install opencv-python-headless
#pip install numpy
# en caso de error probar con --user o actualizar el pip install

#importanciones
import cv2
import numpy as np
import os
import glob
import time
#from deepface import DeepFace

carpeta = "Fotos.Emociones"
count = 0

#veo que version son
print("OpenCV version:", cv2.__version__)
print("NumPy version:", np.__version__)

#abro la cámara

cap = cv2.VideoCapture(1)
if not cap.isOpened():
    print("Error: No se puede abrir la cámara")
    exit()

#def AnalizarFotos ():
 # foto = 'C:\Users\48113111\Documents\Juego 2\proyecto\Tagy-games\IA-Emociones\Fotos.Emociones'
  #analisis = DeepFace.analyze(foto , actions=["emotion"])
 #print (analisis)
    
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
        ubicacion = os.path.join(carpeta, nombre)
        cv2.imwrite(ubicacion, roi)
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
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
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
       # AnalizarFotos() 
      
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) == ord('q'):         #para cerrar la camara tocar la letra q
        break

    if cv2.waitKey(1) == ord('s'): # para tomar foto letra s
        ListaDeFotos = glob.glob(os.path.join("Fotos.Emociones", '*'))
        count = len(ListaDeFotos) + 1
        TomarFoto("Fotos.Emociones", f'Foto nro{count}.jpg')
    
cap.release()
cv2.destroyAllWindows()