"use client";

import * as React from "react";
import { Volume2, VolumeX, AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

export function EarlyWarningSystem({ isTriggered = false }: { isTriggered?: boolean }) {
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const audioContext = React.useRef<AudioContext | null>(null);
  const oscillator = React.useRef<OscillatorNode | null>(null);

  const startSiren = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.current.state === "suspended") {
      audioContext.current.resume();
    }

    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, audioContext.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioContext.current.currentTime + 1);
    osc.loop = true;

    gain.gain.setValueAtTime(0.3, audioContext.current.currentTime);
    gain.connect(audioContext.current.destination);
    osc.connect(gain);

    osc.start();
    oscillator.current = osc;
  };

  const stopSiren = () => {
    if (oscillator.current) {
      oscillator.current.stop();
      oscillator.current.disconnect();
      oscillator.current = null;
    }
  };

  React.useEffect(() => {
    if (isTriggered && audioEnabled) {
      startSiren();
    } else {
      stopSiren();
    }
    return () => stopSiren();
  }, [isTriggered, audioEnabled]);

  return (
    <div className={`p-6 rounded-xl border-2 transition-all duration-500 ${isTriggered ? "bg-alert-critical/20 border-alert-critical animate-pulse" : "bg-neutral-800 border-neutral-700"}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isTriggered ? "bg-alert-critical text-white" : "bg-neutral-700 text-neutral-400"}`}>
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white tracking-tight">Early Warning Monitor</h3>
            <p className="text-xs text-neutral-400">Live Sensory Data Stream</p>
          </div>
        </div>

        <Button
          variant={audioEnabled ? "outline" : "secondary"}
          size="sm"
          onClick={() => setAudioEnabled(!audioEnabled)}
          className={`h-9 px-3 gap-2 ${audioEnabled ? "border-primary-500/50 text-primary-400" : ""}`}
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-4 h-4" />
              Siren Enabled
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              Enable Siren
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-neutral-500 mb-1">
          <span>Seismic Sensitivity</span>
          <span>98.2%</span>
        </div>
        <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 w-[98.2%] shadow-[0_0_10px_rgba(var(--primary-500-rgb),0.5)]" />
        </div>
      </div>

      {isTriggered && (
        <div className="mt-4 p-3 bg-alert-critical/30 border border-alert-critical/50 rounded-lg text-center">
          <p className="text-sm font-bold text-white animate-bounce">CRITICAL DISASTER IMMINENT</p>
          <p className="text-[10px] text-neutral-200 mt-1 uppercase tracking-widest font-mono">Sensory trigger active</p>
        </div>
      )}
    </div>
  );
}
