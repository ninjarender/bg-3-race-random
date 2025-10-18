import { useState, useCallback } from "react";
import type { Build, Race, Class } from "../types";
import { WheelSpinner } from "./WheelSpinner";
import { OptionSelector } from "./OptionSelector";
import racesData from "../data/races.json";
import classesData from "../data/classes.json";

const races = racesData as Race[];
const classes = classesData as Class[];

type AnimationStep = "race" | "subrace" | "class" | "subclass" | "complete";

interface BuildAnimatorProps {
  build: Build;
  onComplete: () => void;
}

export function BuildAnimator({ build, onComplete }: BuildAnimatorProps) {
  const [currentStep, setCurrentStep] = useState<AnimationStep>("race");

  // Find race and class data
  const raceData = races.find((r) => r.name === build.race);
  const classData = classes.find((c) => c.name === build.class);

  const handleRaceComplete = useCallback(() => {
    setTimeout(() => {
      if (raceData?.subraces && build.subrace) {
        setCurrentStep("subrace");
      } else {
        setCurrentStep("class");
      }
    }, 800);
  }, [raceData, build.subrace]);

  const handleSubraceComplete = useCallback(() => {
    setTimeout(() => {
      setCurrentStep("class");
    }, 800);
  }, []);

  const handleClassComplete = useCallback(() => {
    setTimeout(() => {
      if (classData?.subclasses && build.subclass) {
        setCurrentStep("subclass");
      } else {
        setCurrentStep("complete");
        setTimeout(onComplete, 500);
      }
    }, 800);
  }, [classData, build.subclass, onComplete]);

  const handleSubclassComplete = useCallback(() => {
    setTimeout(() => {
      setCurrentStep("complete");
      setTimeout(onComplete, 500);
    }, 800);
  }, [onComplete]);

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-gradient-to-br from-bg3-darker to-bg3-dark border-2 border-bg3-gold rounded-lg p-8 shadow-2xl">
        <h2 className="text-3xl font-serif text-bg3-gold mb-6 text-center border-b-2 border-bg3-gold pb-3">
          Generating Your Build...
        </h2>

        {/* Race Selection */}
        {currentStep === "race" && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🧝</span>
              <h3 className="text-2xl font-serif text-bg3-gold">
                Selecting Race...
              </h3>
            </div>
            <WheelSpinner
              options={races.map((r) => r.name)}
              selectedOption={build.race}
              onComplete={handleRaceComplete}
              spinDuration={3000}
            />
          </div>
        )}

        {/* Subrace Selection */}
        {currentStep === "subrace" && raceData?.subraces && build.subrace && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🧝</span>
              <h3 className="text-2xl font-serif text-bg3-gold">
                Race: {build.race}
              </h3>
            </div>
            <div className="mt-4">
              <p className="text-gray-300 text-lg mb-4 text-center">
                Selecting Subrace...
              </p>
              <OptionSelector
                options={raceData.subraces}
                selectedOption={build.subrace}
                onComplete={handleSubraceComplete}
                highlightDuration={2000}
              />
            </div>
          </div>
        )}

        {/* Class Selection */}
        {currentStep === "class" && (
          <div className="mb-8">
            {/* Show selected race */}
            <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧝</span>
                <div>
                  <p className="text-gray-400 text-sm">Race</p>
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
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚔️</span>
              <h3 className="text-2xl font-serif text-bg3-gold">
                Selecting Class...
              </h3>
            </div>
            <WheelSpinner
              options={classes.map((c) => c.name)}
              selectedOption={build.class}
              onComplete={handleClassComplete}
              spinDuration={3000}
            />
          </div>
        )}

        {/* Subclass Selection */}
        {currentStep === "subclass" &&
          classData?.subclasses &&
          build.subclass && (
            <div className="mb-8">
              {/* Show selected race */}
              <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧝</span>
                  <div>
                    <p className="text-gray-400 text-sm">Race</p>
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
              </div>

              {/* Show selected class */}
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚔️</span>
                  <div>
                    <p className="text-gray-400 text-sm">Class</p>
                    <p className="text-gray-200 text-lg font-semibold">
                      {build.class}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚔️</span>
                <h3 className="text-2xl font-serif text-bg3-gold">
                  Selecting Subclass...
                </h3>
              </div>
              <OptionSelector
                options={classData.subclasses}
                selectedOption={build.subclass}
                onComplete={handleSubclassComplete}
                highlightDuration={2000}
              />
            </div>
          )}
      </div>
    </div>
  );
}
