"""

References: * https://drive.google.com/drive/folders/1jI3PyvacqJM9QB_igrxPdf-vDzHp22tD (for pyserial and arduino code, checkout 'https://www.youtube.com/watch?v=05jDQV4_uXU')
            * https://www.tutorialspoint.com/flask/ (for flask server)
            * https://pythonforundergradengineers.com/python-arduino-LED.html (for LED programming with pyserial)

"""

from flask import Flask

import sys, serial, time, pyautogui

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    # Only accept GET request
    if request.method == "GET":
        # ?cc= for getting color code
        color_code = request.args.get("cc")
        # Code the LED via pyserial
    else:
        return "[-] Invalid"

if __name__ == "__main__":
    if(len(sys.argv) < 3):
        print("[-] Invalid argument")
        print("[*] To run the server : python flask-pyserial-server.py (arduino communication port) (baud rate)\n")
        sys.exit()
    else:
        # First argument after the filename will be the arduino com port for Arduino serial
        # Second argument will be the baud rate
        arduino_serial = serial.Serial(sys.argv[1], int(sys.argv[2]))
        app.run()