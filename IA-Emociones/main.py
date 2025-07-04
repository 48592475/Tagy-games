# instalaciones necesarias (se hacen por consola):
# pip install opencv-python
# pip install deepface --user
# pip install tensorflow --user                          antes era: pip install tf-keras --user  , pero no hace falta instalar keras por separado ya que tensorflow lo incluye, probar en compu de ort.
# pip install matplotlib --user
# pip install requests
# pip install fastapi uvicorn
# para correr poner: python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
#  esto va antes de correr: cd .\IA-Emociones\

# importaciones principales
import cv2
import numpy as np
import os
import time
from deepface import DeepFace
import threading
import matplotlib.pyplot as plt
import requests

# importaciones fast api
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# Abrir la cámara
cap = cv2.VideoCapture(0)  
if not cap.isOpened():
 print("Error: No se puede abrir la cámara")    
 exit()

temporizador_activo = False  #variable global para solucionar problemas con timers

# modelo para recibir el ID del usuario:
app = FastAPI()

class UserRequest(BaseModel):
    username: str

#variables globales
user_global = None
activado = True
carpeta = "Fotos.Emociones"
count = 0
PlayRelajante = False
PlayAlegre = False
EscuchandoMusica = False
emociones_contador = {}
emociones_totales = {}
EmocionAnt = None
EmocionDesp = None

faces = None
frame = None

# Verificar si la carpeta existe, si no, crearla
if not os.path.exists(carpeta):
    os.makedirs(carpeta)

# Importo el reconocedor de caras
cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(cascade_path)

if face_cascade.empty():
        print("Error: No se puede cargar el clasificador de cascada")
        exit()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/process_user")
async def process_user(request: UserRequest):
    print(request)
    global user_global
    user_global = request.username
    #inicio el subproceso al recibir el usuario, pasandole la cámara como argumento
    threading.Thread(target=Subproceso_principal, args=(cap,)).start()
    return {"status": "User processed", "username": user_global}

# abrir subproceso
def Subproceso_principal(cap):
    global activado, count, emociones_contador, emociones_totales, carpeta, PlayAlegre, PlayRelajante, EmocionAnt, EmocionDesp, EscuchandoMusica

    try:
        # Bucle principal
        inicio = time.time()
        
        #TimerInformes()  #función que a los 20 segundos llama a hacer un informe
        try:
            while activado:
                ret, frame = cap.read()
                if not ret:
                    print("Error: No se puede recibir frame")
                    break

                if frame is None:
                    print("Error: Frame está vacío")
                    break

                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=6, minSize=(50, 50))

                for (x, y, w, h) in faces:
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (103, 46, 1), 3)

                tiempo_actual = time.time()
                tiempo_transcurrido = tiempo_actual - inicio

                if tiempo_transcurrido >= 3:
                    nombre = 'Foto_auto_1.jpg'
                    foto_tomada = TomarFoto(carpeta, nombre, faces, frame)

                    if foto_tomada is not None:
                        AnalizarFotos()

                    inicio = time.time()
                
                TimerInformes()  #función que a los 20 segundos llama a hacer un informe
                #cv2.imshow('frame', frame)
                key = cv2.waitKey(1) & 0xFF
                if key == ord('q'):
                    print("cerrando")
                    activado = False
                    break
        except Exception as e:
            print(e)
        finally:
            # Este bloque se ejecutará cuando termine el bucle o si hay un error
            cap.release()  # Libera la cámara
            #cv2.destroyAllWindows()  # Cierra las ventanas de OpenCV
    except Exception as e:
        print(e)



def detener_musica():
    global EscuchandoMusica, EmocionDesp, PlayAlegre, PlayRelajante, temporizador_activo
    if not temporizador_activo:  # Solo permitir que se ejecute si no hay otro temporizador activo
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
        
        # Marcar como que el temporizador ya está activo
        temporizador_activo = True
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
 
def TimerInformes():
 global temporizador_activo
 if not temporizador_activo:  # Solo iniciar si no hay temporizador activo
     timer_Informe = threading.Timer(20.0, HacerInforme)
     timer_Informe.start()
     temporizador_activo = True

def HacerInforme():
    global emociones_totales, temporizador_activo
    if not emociones_totales:
        print("No hay datos de emociones para generar un informe.")
        return
    print("Informe de Emociones")
    informe_texto = ""
    for emocion, cantidad in emociones_totales.items():
        informe_texto += f"La emoción: {emocion}, fue detectada un total de {cantidad} veces "
   
    emociones = list(emociones_totales.keys())
    cantidad = list(emociones_totales.values())  

    plt.figure(figsize=(10, 5))                         #grafico de cuantas veces fue detectada cada emocion
    plt.bar(emociones, cantidad, color='navy')
    plt.xlabel('Emociones')
    plt.ylabel('Cuantas veces fue detectada')
    plt.title('Emociones y cuantas veces fueron detectadas')
    #plt.show()
    plt.savefig('informe_emociones.png')  # guardo como png el informe
    #plt.close('all')  # Cerrar las figuras activas
    #pasarle el informe a la base de datos
     # Llamo a la API para guardar el informe en la base de datos
   
    if user_global is not None:
     url = "http://localhost:3000/informe"  # URL backend
     headers = {'Content-Type': 'application/json'}
   
     payload = {
        "usuario": user_global,  #falta cambiar a variable
        "texto": informe_texto  
     }

     try:
        response = requests.post(url, json=payload, headers=headers) # hay que ver si hay que cambiar el .get por un .post
        if response.status_code == 200:
             print("Informe enviado y guardado correctamente en la base de datos.")
        else:
             print(f"Error al enviar el informe: {response.status_code}, {response.text}")
     except Exception as e:
         print(f"Error en la solicitud HTTP para guardar el informe: {e}")

    # Reinicio las emociones para el próximo informe
    emociones_totales.clear()
    temporizador_activo = False  # Reseteo el temporizador
    #TimerInformes() #llamo el timer para que luego de 20 segundos se vuelva a hacer un informe

def ManejarPlaylist(emocion_dominante):
    global EscuchandoMusica, PlayAlegre, PlayRelajante, EmocionAnt

    EmocionAnt = emocion_dominante
    print("Emoción antes de reproducir música:", EmocionAnt)

    if not EscuchandoMusica:
   
        if emocion_dominante in ["disgust", "angry"]:
            print("Iniciando playlist relajante.")
            PlayRelajante = True

        elif emocion_dominante in ["sad", "fear"]:
            print("Iniciando playlist alegre.")
            PlayAlegre = True

        if PlayRelajante:
            url = "http://localhost:3000/emocion"
            tipo = "playRelajante"
            data = {"tipo": tipo}
            response = requests.post( url,json=data)  #le mando playRelajante
            if response.status_code == 200:
              print("Playlist relajante activada:", response.json())
            else:
                print("Error al activar la playlist relajante:", response.text)

            PlayRelajante = False #reinicio

        if PlayAlegre:
          url = "http://localhost:3000/emocion"
          tipo = "playAlegre"   #le mando playAlegre
          data = {"tipo": tipo}
          response = requests.post( url, json=data)
          if response.status_code == 200:
             print("Playlist alegre activada:", response.json())
          else:
              print("Error al activar la playlist alegre:", response.text)

          PlayAlegre = False  #reinicio
               
        EscuchandoMusica = True
        emociones_contador.clear()
     
        timer = threading.Timer(60.0, detener_musica)
        timer.start()

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
    if faces is not None and len(faces) > 0:  # Si hay caras detectadas
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
