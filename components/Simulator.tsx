
import React, { useState, useRef } from 'react';
import { analyzeProjectImage } from '../geminiService';

const Simulator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    const analysis = await analyzeProjectImage(image);
    setResult(analysis);
    setAnalyzing(false);
  };

  return (
    <div className="bg-indigo-50 p-6 rounded-xl border-2 border-dashed border-indigo-200">
      <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
        <i className="fas fa-microchip"></i> Interactive AI-Vision Simulator
      </h3>
      <p className="text-sm text-indigo-700 mb-6">
        Upload an image to simulate how the ESP32-CAM and Gemini AI would process a potential hazard in real-time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className="w-full h-64 bg-white rounded-lg border border-indigo-100 flex items-center justify-center overflow-hidden shadow-inner mb-4 relative">
            {image ? (
              <img src={image} alt="Upload" className="w-full h-full object-cover" />
            ) : (
              <div className="text-slate-400 flex flex-col items-center">
                <i className="fas fa-cloud-upload-alt text-4xl mb-2"></i>
                <span>No image selected</span>
              </div>
            )}
            {analyzing && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <span className="text-indigo-600 font-medium">AI Processing...</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Select Image
            </button>
            <button 
              onClick={handleAnalyze}
              disabled={!image || analyzing}
              className={`px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50`}
            >
              Analyze Hazard
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 text-emerald-400 font-mono text-sm overflow-auto max-h-80 shadow-lg">
          <div className="mb-4 border-b border-slate-700 pb-2 flex justify-between">
            <span>DEVICE_LOGS @ ESP32_SENTINEL</span>
            <span className="text-slate-500">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="space-y-1">
            <p><span className="text-blue-400">[SYSTEM]</span> Initializing IoT Node...</p>
            <p><span className="text-blue-400">[SYSTEM]</span> Sensors: MQ-2 (OK), PIR (OK)</p>
            <p><span className="text-blue-400">[WIFI]</span> Connected to Cloud Server</p>
            {image && <p><span className="text-yellow-400">[EVENT]</span> Motion/Gas Trigger! Capture Frame...</p>}
            {analyzing && <p><span className="text-indigo-400">[CLOUD]</span> Sending payload to Gemini API...</p>}
            {result && (
              <>
                <p className="text-white mt-4 border-t border-slate-700 pt-2">--- ANALYSIS RESULT ---</p>
                <p><span className="text-pink-400">HAZARD_DETECTED:</span> {result.hazard_detected?.toString().toUpperCase()}</p>
                <p><span className="text-pink-400">TYPE:</span> {result.type || 'N/A'}</p>
                <p><span className="text-pink-400">CONFIDENCE:</span> {result.confidence || 0}%</p>
                {result.hazard_detected ? (
                  <p className="text-red-500 font-bold mt-2 animate-pulse underline">!!! TRIGGERING BUZZER & NOTIFICATION !!!</p>
                ) : (
                  <p className="text-emerald-500 mt-2 font-bold">✓ STATUS: SECURE (FALSE TRIGGER)</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
