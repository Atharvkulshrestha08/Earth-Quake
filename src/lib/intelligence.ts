"use client";

import { AlertTriangle, Droplets, Wind, Activity } from "lucide-react";

export type DisasterType = "EARTHQUAKE" | "FLOOD" | "CYCLONE" | "HEATWAVE";

export interface DisasterProfile {
  city: string;
  historicalEvents: {
    type: DisasterType;
    date: string;
    magnitude?: string;
    impact: string;
  }[];
  prediction: {
    nextProbableDate: string;
    riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    confidence: number;
    safetyMeasures: string[];
  };
}

const CITY_DATA: Record<string, DisasterProfile> = {
  Delhi: {
    city: "Delhi",
    historicalEvents: [
      { type: "EARTHQUAKE", date: "2024-04-03", magnitude: "4.2", impact: "Minor tremors felt across NCR" },
      { type: "HEATWAVE", date: "2023-06-15", impact: "Record 48°C temperatures" },
      { type: "FLOOD", date: "2023-07-20", impact: "Yamuna river levels reached historic high" },
    ],
    prediction: {
      nextProbableDate: "November 14, 2024", // Literal date based on recurrence windows
      riskLevel: "HIGH",
      confidence: 78,
      safetyMeasures: [
        "Reinforce old building structures",
        "Maintain a disaster survival kit",
        "Identify safe open spaces near your home",
      ],
    },
  },
  Mumbai: {
    city: "Mumbai",
    historicalEvents: [
      { type: "FLOOD", date: "2023-08-04", impact: "Suburban areas submerged under 2m water" },
      { type: "CYCLONE", date: "2021-05-17", impact: "Cyclone Tauktae caused massive coast damage" },
    ],
    prediction: {
      nextProbableDate: "August 12, 2024",
      riskLevel: "CRITICAL",
      confidence: 85,
      safetyMeasures: [
        "Check drainage systems in your locality",
        "Avoid low-lying areas during high tide",
        "Keep emergency power backups ready",
      ],
    },
  },
};

export const getCityRiskProfile = (city: string): DisasterProfile => {
  // Mock logic: Use provided city or fallback to Delhi for demo
  return CITY_DATA[city] || CITY_DATA["Delhi"];
};

export const getAlertIcon = (type: DisasterType) => {
  switch (type) {
    case "EARTHQUAKE": return Activity;
    case "FLOOD": return Droplets;
    case "CYCLONE": return Wind;
    case "HEATWAVE": return AlertTriangle;
    default: return AlertTriangle;
  }
};
