import { useEffect, useState } from "react";

interface OptionSelectorProps {
  options: string[];
  selectedOption: string;
  onComplete: () => void;
  highlightDuration?: number;
}

export function OptionSelector({
  options,
  selectedOption,
  onComplete,
  highlightDuration = 2000,
}: OptionSelectorProps) {
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const selectedIndex = options.indexOf(selectedOption);
    const interval = highlightDuration / (options.length * 2 + 5);
    let index = 0;
    let cycles = 0;
    const maxCycles = 2;

    const timer = setInterval(() => {
      setCurrentHighlight(index % options.length);
      index++;

      if (index % options.length === 0) {
        cycles++;
      }

      // After a few cycles, stop at the selected option
      if (cycles >= maxCycles && index % options.length === selectedIndex) {
        clearInterval(timer);
        setIsComplete(true);
        setTimeout(onComplete, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [options, selectedOption, highlightDuration, onComplete]);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
        {options.map((option, index) => {
          const isHighlighted = currentHighlight === index;
          const isSelected = isComplete && option === selectedOption;

          return (
            <div
              key={option}
              className={`
                px-4 py-3 rounded-lg border-2 transition-all duration-200
                ${
                  isSelected
                    ? "bg-bg3-gold text-bg3-darker border-bg3-gold scale-110 shadow-lg shadow-bg3-gold/50"
                    : isHighlighted
                    ? "bg-yellow-600/30 text-gray-100 border-yellow-600 scale-105"
                    : "bg-gray-800/50 text-gray-400 border-gray-700"
                }
              `}
            >
              <span className="font-semibold text-sm">{option}</span>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-2">
        <p className="text-gray-400 text-sm mb-1">
          {isComplete ? "Selected:" : "Choosing..."}
        </p>
        <p className="text-bg3-gold text-lg font-bold">
          {isComplete ? selectedOption : "???"}
        </p>
      </div>
    </div>
  );
}
