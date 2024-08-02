#importanciones
import cv2
import numpy as np

#veo que version son
print("OpenCV version:", cv2.__version__)
print("NumPy version:", np.__version__)

#abro la cámara
cap = cv2.VideoCapture(1)
if not cap.isOpened():
    print("Error: No se puede abrir la cámara")
    exit()

#importo el reconocedor de caras
cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(cascade_path)

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
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 5)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]

    cv2.imshow('frame', frame)

    if cv2.waitKey(1) == ord('q'):         #para cerrar la camara tocar la letra q
        break

cap.release()
cv2.destroyAllWindows()