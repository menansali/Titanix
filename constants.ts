import { Project, Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "IoT Solutions",
    description: "End-to-end hardware and software integration. We build smart devices that communicate seamlessly with the cloud.",
    icon: "Cpu"
  },
  {
    id: 2,
    title: "Mobile Development",
    description: "High-performance native and cross-platform mobile applications for iOS and Android using React Native and Swift.",
    icon: "Smartphone"
  },
  {
    id: 3,
    title: "Custom Software",
    description: "Tailored web platforms and enterprise software designed to scale with your business needs.",
    icon: "Code"
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Env Monitor Pro",
    category: "IoT / Analytics",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop",
    description: "Automated indoor/outdoor environmental monitoring system collecting PM1, PM2.5, PM10, and humidity data. visualized via Grafana dashboards.",
    tech: ["Raspberry Pi 4", "Python", "Bash", "OPC-N3", "Grafana"]
  },
  {
    id: 2,
    title: "Edge LoRa Network",
    category: "Hardware / Embedded",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    description: "Long-range sensor network using T-Beam and Nano 33 BLE. Optimized for low-power consumption with custom sleep cycles and efficient protocols.",
    tech: ["C++", "Arduino", "LilyGO T-Beam", "LoRa", "Nano 33 BLE"]
  },
  {
    id: 3,
    title: "SheetGenius AI",
    category: "Mobile / AI",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    description: "iOS application integrating LLMs to generate Excel formulas from natural language, featuring a PDF-to-Excel converter and AI chat assistant.",
    tech: ["iOS Swift", "Node.js", "OpenAI API", "OCR", "UIKit"]
  },
  {
    id: 4,
    title: "WanderLens AI",
    category: "AI / Travel",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    description: "Transforms scattered screenshots and vague ideas into personalized, bookable travel itineraries using Google's Gemini 3 & 2.5 Flash models.",
    tech: ["Gemini 2.5 Flash", "React Native", "Google Maps", "Computer Vision", "Node.js"]
  }
];