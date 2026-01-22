
import { ProjectData } from './types';

export const ECE_PROJECT_DATA: ProjectData = {
  title: "AI-Vision Enhanced IoT Safety Sentinel (AVISS)",
  problemDefinition: "In residential and industrial settings, traditional fire and hazard detection systems often rely on discrete sensors (like smoke or heat sensors) which are prone to false alarms and cannot provide visual verification. There is a critical need for an integrated system that not only detects hazards but uses AI to visually verify them, reducing false positives and providing real-time visual context to emergency responders via IoT.",
  workingLogic: [
    "The ESP32-CAM acts as the central processing unit, capturing periodic frames of the environment.",
    "A PIR (Passive Infrared) sensor and MQ-2 Gas Sensor act as 'wake-up' triggers to conserve power.",
    "When a hazard (smoke/motion) is detected locally, the ESP32-CAM captures a high-resolution image.",
    "The image is uploaded to a cloud server via the Wi-Fi module integrated in the ESP32.",
    "A Gemini AI model (Vision API) processes the image to identify if the threat is genuine (e.g., distinguishing between cigarette smoke and a developing fire).",
    "If verified, the system triggers a local buzzer and sends a push notification with the image to the user's mobile app via Firebase.",
    "Data logs are maintained on a dashboard for future safety audits."
  ],
  hardwareComponents: [
    { name: "ESP32-CAM Module", use: "Microcontroller with Wi-Fi and Camera for image capture and processing.", cost: 650 },
    { name: "MQ-2 Gas Sensor", use: "Detects LPG, Smoke, and Carbon Monoxide levels.", cost: 150 },
    { name: "PIR Motion Sensor", use: "Detects human presence or movement during restricted hours.", cost: 100 },
    { name: "5V Active Buzzer", use: "Local audible alarm for immediate alerts.", cost: 30 },
    { name: "FTDI Programmer", use: "Used to upload code from PC to the ESP32-CAM.", cost: 250 },
    { name: "Breadboard & Jumper Wires", use: "For prototyping and connecting components.", cost: 120 },
    { name: "Power Supply (5V/2A)", use: "Steady DC power for the microcontroller and sensors.", cost: 200 }
  ],
  softwareTools: [
    "Arduino IDE (C++ Programming)",
    "Firebase Realtime Database (Cloud storage & messaging)",
    // Fix: Updated to Gemini 3 as per model guidelines
    "Gemini 3 Flash API (Vision-based AI Analysis)",
    "Blynk or Custom Web Dashboard (User Interface)"
  ],
  futureScope: [
    "Integration with automated fire extinguishing systems (Solenoid valves for sprinklers).",
    "Edge-AI implementation for faster local processing without internet dependency.",
    "Adding thermal imaging sensors for high-accuracy heat mapping.",
    "Multi-room mesh networking using ESP-NOW for large industrial buildings.",
    "Predictive maintenance analysis using machine learning on sensor data logs."
  ],
  report: {
    abstract: "The AI-Vision Enhanced IoT Safety Sentinel (AVISS) is a low-cost, smart hazard detection system designed for modern homes and industries. By combining traditional gas and motion sensors with AI-powered visual verification, this project addresses the limitations of conventional alarms. The system uses an ESP32-CAM to capture images and the Gemini Vision API for intelligent threat assessment, ensuring that only genuine emergencies trigger high-priority alerts.",
    introduction: "Safety is a paramount concern in any built environment. Traditional fire alarms often fail to distinguish between minor smoke (cooking) and catastrophic fires. This project introduces an 'Eye' into the safety system. Using the Internet of Things (IoT) and Artificial Intelligence (AI), we create a 'cognitive' alarm system that sees, thinks, and alerts.",
    proposedSystem: "The proposed system consists of a hardware node equipped with sensors and a camera. It operates in a tiered alert mode: Stage 1 is local sensor detection; Stage 2 is AI verification via cloud; and Stage 3 is user notification. This hierarchy ensures high reliability and low false-alarm rates.",
    workingMethodology: "1. Hardware setup using ESP32 and MQ-2. 2. Coding the logic to capture images upon threshold crossing. 3. Interfacing with Gemini API for image analysis. 4. Integrating with a mobile dashboard for user alerts.",
    hardwareDescription: "The heart of the system is the ESP32-S module with an OV2640 camera. The MQ-2 sensor uses a tin-dioxide sensitive layer to detect flammable gases. The PIR sensor works by measuring infrared light radiating from objects in its field of view.",
    softwareDescription: "Software is developed in the Arduino environment. We utilize the 'HTTPClient' library for API calls and 'Firebase-ESP-Client' for real-time data sync. The AI analysis is handled by Google's Gemini Flash model due to its low latency and high accuracy in image classification.",
    expectedOutput: "The user should receive a notification within 5-10 seconds of a hazard detection, containing a text summary of the threat (e.g., 'Fire Detected - High Confidence') and a captured image of the scene.",
    advantages: [
      "Low cost compared to commercial smart security systems.",
      "High accuracy through AI visual verification.",
      "Real-time monitoring from anywhere in the world.",
      "Easy to install and scale."
    ],
    applications: [
      "Smart Home Safety Monitoring.",
      "Warehouse and Godown Security.",
      "Unmanned Electrical Substations.",
      "Server Rooms and Data Centers."
    ],
    conclusion: "AVISS demonstrates how ECE students can leverage modern cloud-AI and low-cost IoT hardware to solve critical real-world problems. This project successfully integrates sensor fusion with computer vision, providing a robust platform for future safety innovations."
  }
};
