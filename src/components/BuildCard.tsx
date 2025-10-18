import type { Build } from "../types";

interface BuildCardProps {
  build: Build;
}

export function BuildCard({ build }: BuildCardProps) {
  return (
    <div className="bg-gradient-to-br from-bg3-darker to-bg3-dark border-2 border-bg3-gold rounded-lg p-8 shadow-2xl max-w-2xl w-full">
      <h2 className="text-3xl font-serif text-bg3-gold mb-6 text-center border-b-2 border-bg3-gold pb-3">
        Your Random Build
      </h2>

      <div className="space-y-6">
        {/* Race */}
        <div className="flex items-start gap-4">
          <span className="text-4xl">🧝</span>
          <div className="flex-1">
            <h3 className="text-xl font-serif text-bg3-gold mb-1">Race</h3>
            <p className="text-gray-200 text-lg">
              {build.subrace ? (
                <>
                  <span className="font-semibold">{build.subrace}</span>
                  <span className="text-gray-400"> ({build.race})</span>
                </>
              ) : (
                <span className="font-semibold">{build.race}</span>
              )}
            </p>
          </div>
        </div>

        {/* Class */}
        <div className="flex items-start gap-4">
          <span className="text-4xl">⚔️</span>
          <div className="flex-1">
            <h3 className="text-xl font-serif text-bg3-gold mb-1">Class</h3>
            <p className="text-gray-200 text-lg">
              <span className="font-semibold">{build.class}</span>
              {build.subclass && (
                <>
                  <span className="text-bg3-gold mx-2">—</span>
                  <span className="text-gray-300">{build.subclass}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Background */}
        <div className="flex items-start gap-4">
          <span className="text-4xl">🎭</span>
          <div className="flex-1">
            <h3 className="text-xl font-serif text-bg3-gold mb-1">
              Background
            </h3>
            <p className="text-gray-200 text-lg font-semibold">
              {build.background}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
