import { useEffect, useState } from "react";
import { useBuildStore } from "./store/useBuildStore";
import { BuildCard } from "./components/BuildCard";
import { BuildAnimator } from "./components/BuildAnimator";
import { buildFromURLParams } from "./utils/buildGenerator";

function App() {
  const {
    currentBuild,
    generateBuild,
    setBuild,
    resetBuild,
    shareURL,
    copyToClipboard,
  } = useBuildStore();
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingBuild, setPendingBuild] = useState<typeof currentBuild>(null);

  // Load build from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const buildFromURL = buildFromURLParams(params);

    if (buildFromURL) {
      setBuild(buildFromURL);
    }
  }, [setBuild]);

  const handleGenerate = () => {
    setCopySuccess(false);
    setShareSuccess(false);
    // Clear URL params
    window.history.replaceState({}, "", window.location.pathname);

    // Generate build and start animation
    const newBuild = generateBuild();
    setPendingBuild(newBuild);
    setIsGenerating(true);
  };

  const handleAnimationComplete = () => {
    setIsGenerating(false);
    setPendingBuild(null);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard();
    setCopySuccess(success);
    if (success) {
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleShare = async () => {
    const url = shareURL();
    try {
      await navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handleReset = () => {
    resetBuild();
    setCopySuccess(false);
    setShareSuccess(false);
    window.history.replaceState({}, "", window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg3-darker via-bg3-dark to-bg3-darker flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-serif text-bg3-gold mb-3 drop-shadow-lg">
          🎲 BG3 Random Build Generator
        </h1>
        <p className="text-gray-400 text-lg">
          Generate a random character build for Baldur's Gate 3
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl flex flex-col items-center gap-6">
        {isGenerating && pendingBuild ? (
          <BuildAnimator
            build={pendingBuild}
            onComplete={handleAnimationComplete}
          />
        ) : currentBuild ? (
          <>
            <BuildCard build={currentBuild} />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleGenerate}
                className="bg-bg3-gold hover:bg-yellow-600 text-bg3-darker font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
              >
                🎲 Generate Again
              </button>

              <button
                onClick={handleShare}
                className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
              >
                {shareSuccess ? "✓ URL Copied!" : "🔗 Share URL"}
              </button>

              <button
                onClick={handleCopy}
                className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
              >
                {copySuccess ? "✓ Copied!" : "📋 Copy Build"}
              </button>

              <button
                onClick={handleReset}
                className="bg-red-900 hover:bg-red-800 text-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
              >
                🗑️ Reset
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <button
              onClick={handleGenerate}
              className="bg-bg3-gold hover:bg-yellow-600 text-bg3-darker font-bold text-xl px-12 py-6 rounded-lg transition-all shadow-2xl hover:scale-105"
            >
              🎲 Generate Random Build
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm max-w-2xl">
        <p className="mb-2">
          Fan-made randomizer for{" "}
          <span className="text-bg3-gold">Baldur's Gate 3</span>
        </p>
        <p>
          Not affiliated with{" "}
          <span className="font-semibold">Larian Studios</span> or{" "}
          <span className="font-semibold">Wizards of the Coast</span>
        </p>
        <p className="mt-2">Created by Vadym Kruchyna • 2025</p>
      </footer>
    </div>
  );
}

export default App;
