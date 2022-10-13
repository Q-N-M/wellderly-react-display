"""
References: * https://drive.google.com/drive/folders/1jI3PyvacqJM9QB_igrxPdf-vDzHp22tD (for pyserial and arduino code, checkout 'https://www.youtube.com/watch?v=05jDQV4_uXU')
            * https://create.arduino.cc/projecthub/ansh2919/serial-communication-between-python-and-arduino-e7cce0
            * https://pyautogui.readthedocs.io/en/latest/mouse.html
"""

import sys, serial, time, pyautogui

if(len(sys.argv) < 3):
    print("[-] Invalid argument")
    print("[*] To run the server : python pyserial-card-drag.py (arduino communication port) (baud rate)")
    print("[*] Example : python pyserial-card-drag.py com4 115200\n")
    sys.exit()
else:
    # First argument after the filename will be the arduino com port for Arduino serial
    # Second argument will be the baud rate
    arduino_serial = serial.Serial(port=sys.argv[1], baudrate=int(sys.argv[2]))
    time.sleep(2)

print("[*] Screen size : " + str(pyautogui.size()))
# Move the mouse to the center of the screen
screen_x, screen_y = pyautogui.size()
def move_to_center_of_screen():
    pyautogui.moveTo(screen_x // 2, screen_y - (screen_y // 5))
move_to_center_of_screen()

print("[*] Listening the serial....")
while True:
    data = arduino_serial.readline().decode()
    print("[+] Data : " + data)

    # Hand movement towards the sensor means drag a card to the left
    if("towards" in data):
        # Mouse drag to the left side of the <CardWrapper>
        move_to_center_of_screen()
        pyautogui.dragTo((screen_x // 2) - 800, screen_y - (screen_y // 5), button='left')
        # Return the mouse position
        move_to_center_of_screen()
    # Hand movement away from the sensor means drag a card to the right
    elif("away" in data):
        # Mouse drag to the right side of the <CardWrapper>
        move_to_center_of_screen()
        pyautogui.dragTo((screen_x // 2) + 800, screen_y - (screen_y // 5), button='left')
        # Return the mouse position
        move_to_center_of_screen()
    else:
        print("[-] Invalid data => " + data)
        break

    data = ""

arduino_serial.close()
sys.exit()