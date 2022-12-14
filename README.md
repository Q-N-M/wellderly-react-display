# wellderly-react-display
Interactive display for wellderly appplication with react

## Installation

1. React display
```bash
git clone https://github.com/Q-N-M/wellderly-react-display.git
cd ./wellderly-react-display/wellderly-display
npm install
```

2.1 Pyserial (Windows)
```bash
cd ./wellderly-react-display/wellderly-pyserial
python -m venv env
.\env\Scripts\activate.bat
pip install -r requirements.txt
python pyserial-card-drag.py comX Y
```

2.2 Pyserial (Linux)
```bash
cd ./wellderly-react-display/wellderly-pyserial
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python pyserial-card-drag.py comX Y
```

Where comX is the allocated arduino port and Y is the baud rate (based on the arduino code, the baud rate is 115200)

3. Arduino
Use Arduino IDE to compile the code to arduino board

## How to run the display

1. Compile and run the arduino with Arduino IDE
2. Check the allocated port of the arduino and run pyserial-card-drag.py 
3. Run the react display with `npm start`
4. Browser will pop up and the user can use the screen as the visual display

## Required module
* [React Swipeable Cards](https://github.com/ravelinx22/react-swipeable-cards)
* [Pyserial](https://pypi.org/project/pyserial/)
* [PyAutoGUI](https://pypi.org/project/PyAutoGUI/)

## Arduino setup

For this project, we are using the Ultrasonic Distance Sensor HC-SR04. In order to incorporate the sensor to the arduino we connected the sensor Ground Pins, Echo Pins, Trigger Pins, VCC Pins to arduino ports Ground Port, Port-8, Port-10, 5V Port. For hand gesture, move the hand closer to the sensor to swipe the card to the right and move the hand further from the sensore to swipe card to the left.

## Connection

In order to connect to custom API, modify `wellderlyAPI` in `/wellderly-display/src/App.js`.

## NOTES

One thing to note about the sensor is make sure to keep the mouse up. Arduino will send serial command to pyserial and pyserial will move the mouse based on the specified direction by using pyautogui module. If the system doesn't has mouse input or the mouse pointer is not appeared in the screen (mouse is in sleep mode), pyautogui can't contact the mouse.

## Mention
Thanks to [Vecteezy](https://www.vecteezy.com/vector-art/442722-question-mark-vector-icon) for the question mark image for the display.

## References
[https://www.youtube.com/watch?v=sC5FNQU71gA](https://www.youtube.com/watch?v=sC5FNQU71gA)

## License
[MIT license](https://github.com/Q-N-M/wellderly-react-display/blob/main/LICENSE)
