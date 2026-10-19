import React, { useState } from 'react';

export default function App() {
  const [url, setUrl] = useState('https://example.com');
  const [targetUrl, setTargetUrl] = useState('https://example.com');
  const [overlayImage, setOverlayImage] = useState(null);
  const [opacity, setOpacity] = useState(0.4);
  const [isInteractive, setIsInteractive] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setOverlayImage(imageUrl);
    }
  };

  const handleLoadUrl = (e) => {
    e.preventDefault();
    setTargetUrl(url);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950">
      {/* Top Control Bar */}
      <header className="bg-slate-900 border-b border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 z-30">
        <form onSubmit={handleLoadUrl} className="flex items-center gap-2 flex-1 min-w-[280px]">
          <input 
            type="url" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL..."
            className="flex-1 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-sm text-white focus:outline-none focus:border-indigo-500"
            required
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded text-sm font-medium transition">
            Load Site
          </button>
        </form>

        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded border border-slate-700 transition">
            <span>📁 Upload Overlay Image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          {overlayImage && (
            <div className="flex items-center gap-2">
              <span>Opacity: {Math.round(opacity * 100)}%</span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={opacity} 
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-24 accent-indigo-500"
              />
              <button 
                onClick={() => setIsInteractive(!isInteractive)}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${isInteractive ? 'bg-amber-600' : 'bg-slate-700'}`}
              >
                {isInteractive ? 'Touches: Pass-Through OFF' : 'Touches: Pass-Through ON'}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Viewport Container */}
      <div className="relative flex-1 w-full h-full bg-black overflow-hidden">
        {/* Underlying Website (Iframe) */}
        <iframe 
          src={targetUrl} 
          title="Target Site"
          className="absolute inset-0 w-full h-full border-0 bg-white"
        />

        {/* Transparent Overlay Image Layer */}
        {overlayImage && (
          <div 
            className={`absolute inset-0 z-20 flex items-center justify-center overflow-hidden ${isInteractive ? 'pointer-events-none' : ''}`}
          >
            <img 
              src={overlayImage} 
              alt="Overlay reference" 
              style={{ opacity }} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
