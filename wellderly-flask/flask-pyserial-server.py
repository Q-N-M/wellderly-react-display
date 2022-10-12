"""

References: * https://drive.google.com/drive/folders/1jI3PyvacqJM9QB_igrxPdf-vDzHp22tD (for pyserial and arduino code, checkout 'https://www.youtube.com/watch?v=05jDQV4_uXU')
            * https://www.tutorialspoint.com/flask/ (for flask server)
            * https://pythonforundergradengineers.com/python-arduino-LED.html (for LED programming with pyserial)
            * https://create.arduino.cc/projecthub/ansh2919/serial-communication-between-python-and-arduino-e7cce0

"""

from flask import Flask, request

import sys, serial, time, pyautogui

app = Flask(__name__)

if(len(sys.argv) < 3):
    print("[-] Invalid argument")
    print("[*] To run the server : python flask-pyserial-server.py (arduino communication port) (baud rate)")
    print("[*] Example : python flask-pyserial-server.py COM4 115200\n")
    sys.exit()
else:
    # First argument after the filename will be the arduino com port for Arduino serial
    # Second argument will be the baud rate
    arduino_serial = serial.Serial(port=sys.argv[1], baudrate=int(sys.argv[2]))

@app.route("/", methods=["GET"])
def index():
    # Only accept GET request
    if request.method == "GET":
        # ?cc= for getting color code
        color_code = request.args.get("cc")
        # Code the LED via pyserial
        arduino_serial.write(bytes(color_code, 'utf-8'))
        data = arduino_serial.readline().decode('utf-8')
        print(data)
        return ""
    else:
        return "[-] Invalid"

if __name__ == "__main__":
    app.run()