/*
 * References : https://www.arduino.cc/reference/en/language/functions/communication/serial/readstring/
 */

#define SERIAL_BAUD 115200

void setup() {
  // put your setup code here, to run once:
  Serial.begin(SERIAL_BAUD);
}

void loop() {
  // put your main code here, to run repeatedly:

  while (Serial.available()){
    String data = Serial.readString();

    if(data == "emoji_1_data"){
      String res = "Happy";
      Serial.println(res);
    }else if(data == "emoji_2_data"){
      String res = "Sad";
      Serial.println(res);
    }else if(data == "emoji_3_data"){
      String res = "Angry";
      Serial.println(res);
    }else if(data == "emoji_4_data"){
      String res = "Neutral";
      Serial.println(res);
    }else if(data == "emoji_5_data"){
      String res = "Ecstatic";
      Serial.println(res);
    }else{
      String res = "Last";
      Serial.println(res);
    }
  }
}
