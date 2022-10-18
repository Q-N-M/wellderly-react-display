# wellderly-react-display
Interactive display for wellderly appplication with react

## Installation

1. React display
```bash
git clone https://github.com/Q-N-M/wellderly-react-display.git
cd ./wellderly-react-display/wellderly-display
npm install
```

2. Pyserial (Windows)
```bash
cd ./wellderly-react-display/wellderly-pyserial
python -m venv env
.\env\Scripts\activate
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

## Connection

In order to connect to custom API, modify `wellderlyAPI` in `/wellderly-display/src/App.js`.

## NOTES

One thing to note about the sensor is make sure to keep the mouse up. Arduino will send serial command to pyserial and pyserial will move the mouse based on the specified direction by using pyautogui module. If the system doesn't has mouse input or the mouse pointer is not appeared in the screen (mouse is in sleep mode), pyautogui can't contact the mouse.

## Mention
Thanks to [Vecteezy](https://www.vecteezy.com/vector-art/442722-question-mark-vector-icon) for the question mark image for the display

## License
[MIT license](https://github.com/Q-N-M/wellderly-react-display/blob/main/LICENSE)
