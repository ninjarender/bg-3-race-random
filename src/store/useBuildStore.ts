import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Build } from '../types';
import { generateRandomBuild, buildToURLParams, buildToText } from '../utils/buildGenerator';

interface BuildStore {
  currentBuild: Build | null;
  generateBuild: () => Build;
  setBuild: (build: Build) => void;
  resetBuild: () => void;
  shareURL: () => string;
  copyToClipboard: () => Promise<boolean>;
}

export const useBuildStore = create<BuildStore>()(
  persist(
    (set, get) => ({
      currentBuild: null,

      generateBuild: () => {
        const newBuild = generateRandomBuild();
        set({ currentBuild: newBuild });
        return newBuild;
      },

      setBuild: (build: Build) => {
        set({ currentBuild: build });
      },

      resetBuild: () => {
        set({ currentBuild: null });
      },

      shareURL: () => {
        const { currentBuild } = get();
        if (!currentBuild) return window.location.origin;

        const params = buildToURLParams(currentBuild);
        return `${window.location.origin}?${params.toString()}`;
      },

      copyToClipboard: async () => {
        const { currentBuild } = get();
        if (!currentBuild) return false;

        try {
          const text = buildToText(currentBuild);
          await navigator.clipboard.writeText(text);
          return true;
        } catch (error) {
          console.error('Failed to copy to clipboard:', error);
          return false;
        }
      },
    }),
    {
      name: 'bg3-build',
      partialize: (state) => ({ currentBuild: state.currentBuild }),
    }
  )
);

