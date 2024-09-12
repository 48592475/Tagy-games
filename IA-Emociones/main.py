# instalaciones necesarias (se hacen por consola):
# pip install opencv-python
# pip install numpy
# pip install deepface --user
# pip install tf-keras --user

import cv2
import numpy as np
import os
import time
from deepface import DeepFace

carpeta = "Fotos.Emociones"
count = 0

# Inicializa un diccionario para contar las emociones
emociones_contador = {}

# Verificar si la carpeta existe, si no, crearla
if not os.path.exists(carpeta):
    os.makedirs(carpeta)

# Abrir la cámara
cap = cv2.VideoCapture(0)  
if not cap.isOpened():
    print("Error: No se puede abrir la cámara")
    exit()

# Función para analizar emociones de la foto
def AnalizarFotos():
    foto = os.path.join(carpeta, 'Foto_auto_1.jpg')
    
    try:
        # Analiza la foto para detectar emociones
        analisis = DeepFace.analyze(img_path=foto, actions=["emotion"], enforce_detection=False)
       
        # Verifica si se ha detectado una cara
        if 'dominant_emotion' in analisis[0]:
            emocion_dominante = analisis[0]['dominant_emotion']
            face_confidence = analisis[0].get('face_confidence', 0)
             
            # Solo imprime si la confianza de la detección de la cara es mayor a 0.3
            if face_confidence > 0.3:
                print(f"Emoción dominante: {emocion_dominante}, Confianza que detecte cara: {face_confidence:.2f}")

                 # Actualiza el conteo de la emoción
                if emocion_dominante in emociones_contador:
                    emociones_contador[emocion_dominante] += 1
                else:
                    emociones_contador[emocion_dominante] = 1
                
                # Verifica si la emoción se ha detectado por segunda vez
                if emociones_contador[emocion_dominante] == 2:
                    print(f"La emoción '{emocion_dominante}' ha sido detectada por segunda vez.")
                    # Reinicia el diccionario después de la detección
                    emociones_contador.clear()
            else:
                print("La confianza en la detección de la cara es demasiado baja.")
        else:
            print("No se detectó una cara en la foto.")
   
    except Exception as e:
        print(f"Ocurrió un error: {e}")
   

# Función para tomar una foto y sobreescribir si es necesario
def TomarFoto(carpeta, nombre, faces, frame):
    if len(faces) > 0:  # Si hay caras detectadas
        for (x, y, w, h) in faces:
            roi = frame[y:y+h, x:x+w]
            roi_resized = cv2.resize(roi, (600, 600))
            ubicacion = os.path.join(carpeta, nombre)
            
            # Elimina la foto existente antes de guardar la nueva
            if os.path.exists(ubicacion):
                os.remove(ubicacion)
            
            # Guarda la nueva foto
            cv2.imwrite(ubicacion, roi_resized)
            
            # Imprime la ruta completa para verificar
            print(f"Se guardó en la carpeta: {os.path.abspath(ubicacion)} con el nombre {nombre}")
            return ubicacion  # Devuelve la ubicación de la foto tomada
    else:
        print("No se detectaron caras.")
        return None  # Devuelve None si no se detectan caras

# Importo el reconocedor de caras
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

    for (x, y, w, h) in faces:  # Dibujo un rectángulo alrededor de las caras detectadas
        cv2.rectangle(frame, (x, y), (x + w, y + h), (103, 46, 1), 3)

    # Verifica si han pasado 3 segundos
    tiempo_actual = time.time()
    tiempo_transcurrido = tiempo_actual - inicio

    if tiempo_transcurrido >= 3:  # Si pasaron 3 segundos desde la última foto
        nombre = 'Foto_auto_1.jpg'  # Nombre fijo para la foto
        foto_tomada = TomarFoto(carpeta, nombre, faces, frame)

        if foto_tomada is not None:
            AnalizarFotos()  # Analiza la foto tomada solo si se detectó una cara

        inicio = time.time()  # Reiniciar el contador de tiempo

    cv2.imshow('frame', frame)

    if cv2.waitKey(1) == ord('q'):  # Para cerrar la cámara, presiona 'q'
        break

cap.release()
cv2.destroyAllWindows()
