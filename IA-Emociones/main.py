# instalaciones necesarias (se hacen por consola):
# pip install opencv-python
# pip install numpy
# pip install deepface --user
# pip install tf-keras --user
#pip install matplotlib --user

import cv2
import numpy as np
import os
import time
from deepface import DeepFace
import threading
import matplotlib.pyplot as plt

carpeta = "Fotos.Emociones"
count = 0

PlayRelajante = False
PlayAlegre = False      #booleanos para activar la musica

EmocionAnt = None
EmocionDesp = None

EscuchandoMusica = False
# Inicializa un diccionario para contar las emociones
emociones_contador = {}
emociones_totales ={}

# Verificar si la carpeta existe, si no, crearla
if not os.path.exists(carpeta):
    os.makedirs(carpeta)

# Abrir la cámara
cap = cv2.VideoCapture(0)  
if not cap.isOpened():
    print("Error: No se puede abrir la cámara")
    exit()

def detener_musica():
    global EscuchandoMusica, EmocionDesp, PlayAlegre, PlayRelajante
    EscuchandoMusica = False
    print("Deteniendo la música después de 60 segundos.")
    PlayRelajante = False
    PlayAlegre = False
    #conectar con back o front para que detengan la musica
    # Saco una nueva foto para ver la emocion al terminar la musica
    nombre = 'Foto_auto_1.jpg'
    foto_tomada = TomarFoto(carpeta, nombre, faces, frame)  # saco la foto
    if foto_tomada is not None:
        # Analiza la emoción de la foto tomada
        analisis = DeepFace.analyze(img_path=foto_tomada, actions=["emotion"], enforce_detection=False)
        
        if 'dominant_emotion' in analisis[0]:
            face_confidence = analisis[0].get('face_confidence', 0)
            # Verifica que la confianza en la detección de la cara sea mayor a 0.3
            if face_confidence > 0.3: # si hay la suficiente confianza
                EmocionDesp = analisis[0]['dominant_emotion']
                print(f"Emoción después de la música: {EmocionDesp}, Confianza en la detección de la cara: {face_confidence:.2f}")
            else:
                print(f"Confianza en la detección de la cara demasiado baja: {face_confidence:.2f}")
                EmocionDesp = "No detectada" # la foto no es precisa para determinar una emocion
        else:
            print("No se pudo detectar una emoción después de la música.")
    
    # Comparo la emoción antes y después de la música
    RendimientoMusica(EmocionAnt, EmocionDesp)
    
    return()

def RendimientoMusica(EmocionAnt, EmocionDesp):
    if EmocionAnt is None or EmocionDesp is None:
     print(f"Alguna de las emociones es nula. EmocionAnt: {EmocionAnt}, EmocionDesp: {EmocionDesp}")
     EmocionAnt = None #actualizo para que despues funcione
     EmocionDesp = None#actualizo para que despues funcione
    else:
     print(f"Emoción antes: {EmocionAnt}, Emoción después: {EmocionDesp}")
     EmocionAnt = None #actualizo para que despues funcione
     EmocionDesp = None #actualizo para que despues funcione


def HacerInforme():
    global emociones_totales
    if not emociones_totales:
        print("No hay datos de emociones para generar un informe.")
        return
    print("Informe de Emociones")
    for emocion, cantidad in emociones_totales.items():
        print(f"La Emoción: {emocion}, Fue detectada un Total de {cantidad}, veces")
   
    emociones = list(emociones_totales.keys())
    cantidad = list(emociones_totales.values())  

    plt.figure(figsize=(10, 5))                         #grafico de cuantas veces fue detectada cada emocion
    plt.bar(emociones, cantidad, color='navy')
    plt.xlabel('Emociones')
    plt.ylabel('Cuantas veces fue detectada')
    plt.title('Emociones y cuantas veces fueron detectadas')
    #plt.show()
    plt.savefig('informe_emociones.png')  # guardo como png el informe
    plt.close('all')  # Cerrar las figuras activas
    #pasarle el informe a la base de datos

timer = threading.Timer(60.0, HacerInforme) # cada 60 segundo llamo a la funcion de hacer informe
timer.start()
def ManejarPlaylist(emocion_dominante):
 #EmocionAnt = emocion_dominante
 print("la emocion ant es" , EmocionAnt) 
 global EscuchandoMusica, PlayAlegre, PlayRelajante          #si no hay musica pone la musica acorde a la emocion dominante detectada
 if not EscuchandoMusica:
    if emocion_dominante in ["disgust", "angry"]:
      print("poner playlist relajante")   #poner codigo para poner la musica, puedo hacer una función
      PlayRelajante = True
      #ver de pasarle esto a la base de datos para que ponga la musica
      
    elif emocion_dominante in ["sad", "fear"]:
     print ("poner playlist alegre") #poner codigo para poner la musica, puedo hacer una función
     PlayAlegre = True
     #ver de pasarle esto a la base de datos para que ponga la musica
     
                        
    EscuchandoMusica = True                    
    emociones_contador.clear()
            # Inicia un temporizador que tras 60 segundos detiene la musica
    timer = threading.Timer(60.0, detener_musica)
    timer.start()
    return (EmocionAnt)

# Función para analizar emociones de la foto
def AnalizarFotos():
    foto = os.path.join(carpeta, 'Foto_auto_1.jpg')
    global EmocionAnt
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
                if emocion_dominante in emociones_totales:
                    emociones_totales[emocion_dominante] += 1
                else:
                    emociones_totales[emocion_dominante] = 1
                 # Solo agrega al contador si la emoción es 'fear', 'sad'  'angry', o 'disgust'
                if emocion_dominante in ["fear", "sad", "angry", "disgust"]:
                    if emocion_dominante in emociones_contador:
                        emociones_contador[emocion_dominante] += 1
                    else:
                        emociones_contador[emocion_dominante] = 1
                        
                    if emociones_contador[emocion_dominante] == 2:  #si detecto dos veces la misma emocion
                     print(f"La emoción '{emocion_dominante}' ha sido detectada por segunda vez.")
                     if emocion_dominante in ["disgust", "angry"] and not EscuchandoMusica:
                         EmocionAnt = emocion_dominante
                         print(f"Reproduciendo playlist relajante por la emoción: {emocion_dominante}")
                         #llamar función poner musica relajante
                         ManejarPlaylist(emocion_dominante)
                         emociones_contador.clear()
                         return
                     elif emocion_dominante in ["sad", "fear"] and not EscuchandoMusica:
                         EmocionAnt = emocion_dominante
                         print(f"Reproduciendo playlist alegre por la emoción: {emocion_dominante}")
                          #llamar función poner musica relajante
                         ManejarPlaylist(emocion_dominante)
                         emociones_contador.clear()
                         return
                            
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