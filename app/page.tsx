'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [optimized, setOptimized] = useState('');
  const [format, setFormat] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  const tokenCount = Math.round(prompt.length / 4);

  const getFormatBadgeColor = (fmt: string) => {
    const colors: Record<string, string> = {
      JSON: 'bg-violet-500/20 text-violet-300',
      XML: 'bg-amber-500/20 text-amber-300',
      MD: 'bg-teal-500/20 text-teal-300',
      TXT: 'bg-gray-500/20 text-gray-300',
    };
    return colors[fmt] || 'bg-primary-container/20 text-primary-container';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setShowValidationError(true);
      return;
    }

    setShowValidationError(false);
    setLoading(true);
    setError('');
    setOptimized('');
    setFormat('');

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Optimization failed');
      }

      const data = await response.json();
      setOptimized(data.optimized);
      setFormat(data.format);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimized);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="dark">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-lg shadow-top-nav bg-gradient-to-b from-primary/5 to-transparent">
        <div className="flex justify-between items-center max-w-[760px] mx-auto px-4 h-16">
          <div className="flex items-center gap-2 text-lg font-bold text-zinc-100 font-headline tracking-tight text-sm">
            <span className="text-primary material-symbols-outlined filled" style={{ fontSize: '20px' }}>
              bolt
            </span>
            <span>Prompt Rock</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 min-h-screen">
        <div className="max-w-[760px] mx-auto space-y-10">
          {/* Hero Section */}
          <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-on-surface">
              Optimize your prompt.{' '}
              <span className="text-primary-container">Get more with less.</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-lg mx-auto leading-relaxed">
              Paste your prompt below and get a token-efficient, refined version instantly.
            </p>
          </header>

          {/* Main Input Card */}
          <section className="glass-panel rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold tracking-[0.1em] text-on-surface-variant uppercase">
                YOUR PROMPT
              </label>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                ~{tokenCount} tokens
              </span>
            </div>
            <div className="relative group">
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setShowValidationError(false);
                }}
                className="w-full bg-surface-container-low border border-outline-variant/15 rounded-lg p-4 mono-text text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none placeholder:text-zinc-700"
                placeholder="System: You are an expert assistant..."
                rows={6}
              ></textarea>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div
                className={`flex items-center gap-2 text-error text-[11px] transition-opacity ${
                  showValidationError ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">error</span>
                Please enter a prompt first.
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-[0_0_20px_rgba(124,111,247,0.4)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Optimizing...
                  </>
                ) : (
                  <>
                    Optimize Prompt
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Error Message */}
          {error && (
            <div className="glass-panel rounded-xl p-4 border border-error/50 bg-error-container/10">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {/* Output Panel */}
          {optimized && (
            <section className="glass-panel rounded-xl overflow-hidden opacity-90">
              <div className="px-6 py-4 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <label className="text-[10px] font-bold tracking-[0.1em] text-on-surface-variant uppercase">
                    OPTIMIZED PROMPT
                  </label>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${getFormatBadgeColor(format)}`}>
                    {format}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-white group"
                  title={copied ? 'Copied!' : 'Copy'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              {/* Code Block Content */}
              <div className="p-6 bg-surface-container-lowest/50">
                <pre className="mono-text text-sm text-on-surface leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
                  {optimized}
                </pre>
              </div>

              <div className="px-6 py-4 flex items-center justify-between bg-primary/5 border-t border-white/[0.04]">
                <div className="flex items-center gap-2 text-primary text-[11px] font-semibold tracking-wide">
                  <span className="material-symbols-outlined text-[16px] filled" style={{ fontSize: '16px' }}>
                    check_circle
                  </span>
                  Optimization complete
                </div>
              </div>
            </section>
          )}

          {/* Decorative Visual Trace */}
          {optimized && (
            <div className="flex justify-center py-4">
              <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent opacity-30"></div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-transparent">
        <div className="max-w-[760px] mx-auto text-center px-4 font-body uppercase tracking-[0.05em] text-[10px]">
          <div className="flex justify-center gap-8 mb-6 text-zinc-500">
            <a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </a>
            <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
              Terms of Service
            </a>
            <a href="https://www.mdhabibullahmahmud.work/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
              Contact Xenon
            </a>
          </div>
          <p className="text-zinc-600">
            Prompt Rock by Xenon · Built on OpenRouter · No data stored.
          </p>
        </div>
      </footer>
    </div>
  );
}
