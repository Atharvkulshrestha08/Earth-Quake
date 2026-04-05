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
      { type: "EARTHQUAKE", date: "2026-04-03", magnitude: "5.1", impact: "Felt across NCR, minor damage reported in old Delhi" },
      { type: "EARTHQUAKE", date: "2025-11-12", magnitude: "4.2", impact: "Tremors felt for 15 seconds" },
      { type: "FLOOD", date: "2024-07-20", impact: "Yamuna river levels reached historic high" },
    ],
    prediction: {
      nextProbableDate: "April 24, 2026", // Imminent follow-up window
      riskLevel: "CRITICAL",
      confidence: 94,
      safetyMeasures: [
        "Expect aftershocks within next 48-72 hours",
        "Reinforce old building structures",
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
