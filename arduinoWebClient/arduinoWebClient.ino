#include <SPI.h>
#include <Ethernet.h>

#define DEBUG false

#define TIME_BETWEEN_REQUESTS 500

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
byte ip[] = {192, 168, 1, 120};
IPAddress server(192,168,1, 2);

long timeElapsed = 0;

EthernetClient client;

int values[3] = {0, 0, 0};

void initClient() {

#if DEBUG
    Serial.begin(9600);
    Serial.println("Starting Ethernet...");
#endif

    if(Ethernet.begin(mac) == 0) {
        Ethernet.begin(mac, ip);
    }

#if DEBUG 
    else {
        Serial.println("Ethernet connected");
        Serial.println(Ethernet.localIP());
    }
#endif

    delay(1000);
}

void updateState() {
    if(values[1] >= 5 && values[1] <= 9)
        digitalWrite(values[1], values[2] == 1 ? HIGH : LOW);
}

/* Find the start of the json response */
void parseJson(byte buf[]) {
    char *json = NULL;
    char *ptrData = NULL;
    char temp[20];
  
    int i = 0;
    
    json = strstr((char*)buf, "\n{\"");
    json ++;
    if(json) {
        ptrData = strstr(json, "\"error\"");
        if(!ptrData) {
            ptrData = strtok(json, "{\":,}");
            while(ptrData) {
                strcpy(temp, ptrData);
                if(temp[0] >= 48 && temp[0] <= 57) {
                    values[i] = atoi(temp);
                    i++;
                }
                ptrData = strtok(NULL,  "\":,{}");           
            }

#if DEBUG
            Serial.println(values[0]);
            Serial.println(values[1]);
            Serial.println(values[2]);
#endif
            updateState();
        }
    }
}

void sendRequest() {
    client.stop();
  
    /* GET request to server */
    if(client.connect(server, 3333) == 1) {
        client.println("GET /arduino HTTP/1.1");
        client.print("Host: ");
        client.println(server);
        client.println("User-Agent: arduino-ethernet");
        client.println("Connection: close");
        client.println();

#if DEBUG
        Serial.println("HTTP GET Request Send.");
#endif
    }
    
#if DEBUG
    else
        Serial.println("connection failed.");
#endif
}

void readResponse() {
    byte buffer[302] = {0};
    int resLen = 0;
  
    while(!client.available());

    resLen = client.available();
    if(resLen > 300) {
        resLen = 300;
    }
    client.read(buffer, resLen);
    buffer[resLen] = '\n';
    buffer[resLen+1] = '\0';
#if DEBUG
    Serial.write(buffer, resLen);
    Serial.println();
#endif
    parseJson(buffer);
}

void setup() {
    pinMode(5, OUTPUT);
    pinMode(6, OUTPUT);
    pinMode(7, OUTPUT);
    pinMode(8, OUTPUT);
    pinMode(9, OUTPUT);
  
    initClient();
    timeElapsed = millis();
}

void loop() {  
    if(millis() - timeElapsed >= TIME_BETWEEN_REQUESTS) {
        timeElapsed = millis();
        sendRequest();
        if(client.connected()) {
            readResponse(); 
        }   
    }
}
