
/*
 * References : - https://www.youtube.com/watch?v=05jDQV4_uXU
 *              - https://drive.google.com/drive/folders/1jI3PyvacqJM9QB_igrxPdf-vDzHp22tD (from the youtube video above)
 *              - https://surtrtech.com/2018/01/27/how-to-use-hc-sr04-ultrasonic-module-to-measure-distance-in-cm-and-inch/
 */

// Constants for sensor and arduino
#define ULTRASONIC_TRIGGER 10
#define ULTRASONIC_ECHO 8
#define SERIAL_BAUD 115200

// Variables for sensor
int distance;
int sensor_distance;
long duration;
float radius;
unsigned long sensor_current_time = 0;

// Function to find distance
void find_distance(void);
void find_distance(void){
  digitalWrite(ULTRASONIC_TRIGGER, LOW);
  delayMicroseconds(2);
  digitalWrite(ULTRASONIC_TRIGGER, HIGH);
  delayMicroseconds(10);
  digitalWrite(ULTRASONIC_TRIGGER, LOW);

  duration = pulseIn(ULTRASONIC_ECHO, HIGH, 5000);
  radius = 3.4 * duration / 2;
  distance = radius / 100.00;
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  // Setup sensor module
  pinMode(ULTRASONIC_TRIGGER, OUTPUT);
  pinMode(ULTRASONIC_ECHO, INPUT);
}

void loop() {
  find_distance();
  sensor_distance = distance;

  // If the hand distance is between 10 to 30 cm
  if(sensor_distance >= 10 && sensor_distance <= 30){
    sensor_current_time = millis();
    // For the first 1 second when the sensor detected user's hand
    while(millis() <= (sensor_current_time+600)){
      find_distance();
      // If the current distance is bigger than the first distance + 2 cm, it means the hand is moving away from the sensor
      if((sensor_distance + 2) < distance){
        Serial.println("away");
        break;
      }
      // If the current distance is smaller than the first distance - 2 cm, it means the hand is moving towards the sensor
      else if((sensor_distance - 2) > distance){
        Serial.println("towards");
        break;
      }
    }
  }
  delay(600);
}
