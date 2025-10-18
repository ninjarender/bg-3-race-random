import { useEffect, useState } from "react";

interface WheelSpinnerProps {
  options: string[];
  selectedOption: string;
  onComplete: () => void;
  spinDuration?: number;
}

export function WheelSpinner({
  options,
  selectedOption,
  onComplete,
  spinDuration = 3000,
}: WheelSpinnerProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    const selectedIndex = options.indexOf(selectedOption);
    const segmentAngle = 360 / options.length;

    // Calculate final rotation to land on selected option
    // Add extra spins for effect (5 full rotations + position)
    const targetAngle = 360 * 5 + selectedIndex * segmentAngle;

    setRotation(targetAngle);

    const timer = setTimeout(() => {
      setIsSpinning(false);
      onComplete();
    }, spinDuration);

    return () => clearTimeout(timer);
  }, [options, selectedOption, spinDuration, onComplete]);

  const segmentAngle = 360 / options.length;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative w-96 h-96 md:w-[450px] md:h-[450px]">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[36px] border-t-bg3-gold drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-2xl"
          style={{
            transform: `rotate(${-rotation}deg)`,
            transition: isSpinning
              ? `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
              : "none",
          }}
        >
          {/* Center circle */}
          <circle cx="200" cy="200" r="200" fill="#1a1a1a" />

          {/* Segments */}
          {options.map((option, index) => {
            const startAngle = index * segmentAngle - 90;
            const endAngle = (index + 1) * segmentAngle - 90;
            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

            const startX = 200 + 200 * Math.cos((startAngle * Math.PI) / 180);
            const startY = 200 + 200 * Math.sin((startAngle * Math.PI) / 180);
            const endX = 200 + 200 * Math.cos((endAngle * Math.PI) / 180);
            const endY = 200 + 200 * Math.sin((endAngle * Math.PI) / 180);

            const pathData = `
              M 200 200
              L ${startX} ${startY}
              A 200 200 0 ${largeArcFlag} 1 ${endX} ${endY}
              Z
            `;

            // Alternate colors for segments
            const fillColor = index % 2 === 0 ? "#d4af37" : "#8b7355";
            const textAngle = startAngle + segmentAngle / 2;
            const textRadius = 140;

            // Create a circular path for text
            const textPathId = `textPath-${index}`;
            const arcRadius = textRadius;
            const arcStartAngle = startAngle;
            const arcEndAngle = endAngle;

            const arcStartX =
              200 + arcRadius * Math.cos((arcStartAngle * Math.PI) / 180);
            const arcStartY =
              200 + arcRadius * Math.sin((arcStartAngle * Math.PI) / 180);
            const arcEndX =
              200 + arcRadius * Math.cos((arcEndAngle * Math.PI) / 180);
            const arcEndY =
              200 + arcRadius * Math.sin((arcEndAngle * Math.PI) / 180);

            const textPathData = `
              M ${arcStartX} ${arcStartY}
              A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${arcEndX} ${arcEndY}
            `;

            return (
              <g key={option}>
                <path
                  d={pathData}
                  fill={fillColor}
                  stroke="#000"
                  strokeWidth="2"
                />

                {/* Define the path for text */}
                <defs>
                  <path id={textPathId} d={textPathData} />
                </defs>

                {/* Text along the arc */}
                <text
                  fill="#1a1a1a"
                  fontSize="16"
                  fontWeight="bold"
                  style={{
                    pointerEvents: "none",
                    textShadow: "0 0 2px rgba(255,255,255,0.5)",
                  }}
                >
                  <textPath
                    href={`#${textPathId}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {option}
                  </textPath>
                </text>
              </g>
            );
          })}

          {/* Center circle decoration */}
          <circle
            cx="200"
            cy="200"
            r="30"
            fill="#d4af37"
            stroke="#000"
            strokeWidth="2"
          />
          <circle cx="200" cy="200" r="15" fill="#1a1a1a" />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">
          {isSpinning ? "Spinning..." : "Selected:"}
        </p>
        <p className="text-bg3-gold text-xl font-bold">
          {isSpinning ? "???" : selectedOption}
        </p>
      </div>
    </div>
  );
}
