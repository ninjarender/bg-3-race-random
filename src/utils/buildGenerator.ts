import type { Build, Race, Class, Background } from '../types';
import racesData from '../data/races.json';
import classesData from '../data/classes.json';
import backgroundsData from '../data/backgrounds.json';

const races = racesData as Race[];
const classes = classesData as Class[];
const backgrounds = backgroundsData as Background[];

/**
 * Get a random element from an array
 */
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a random character build for BG3
 */
export function generateRandomBuild(): Build {
  // Pick random race
  const race = getRandomElement(races);
  const raceName = race.name;

  // Pick random subrace if available
  const subrace = race.subraces
    ? getRandomElement(race.subraces)
    : undefined;

  // Pick random class
  const characterClass = getRandomElement(classes);
  const className = characterClass.name;

  // Pick random subclass if available
  const subclass = characterClass.subclasses
    ? getRandomElement(characterClass.subclasses)
    : undefined;

  // Pick random background
  const background = getRandomElement(backgrounds);

  return {
    race: raceName,
    subrace,
    class: className,
    subclass,
    background,
  };
}

/**
 * Create a build from URL parameters
 */
export function buildFromURLParams(params: URLSearchParams): Build | null {
  const race = params.get('race');
  const subrace = params.get('subrace');
  const className = params.get('class');
  const subclass = params.get('subclass');
  const background = params.get('background');

  if (!race || !className || !background) {
    return null;
  }

  return {
    race,
    subrace: subrace || undefined,
    class: className,
    subclass: subclass || undefined,
    background,
  };
}

/**
 * Create URL parameters from a build
 */
export function buildToURLParams(build: Build): URLSearchParams {
  const params = new URLSearchParams();
  params.set('race', build.race);
  if (build.subrace) params.set('subrace', build.subrace);
  params.set('class', build.class);
  if (build.subclass) params.set('subclass', build.subclass);
  params.set('background', build.background);
  return params;
}

/**
 * Convert build to plain text for copying
 */
export function buildToText(build: Build): string {
  const racePart = build.subrace
    ? `${build.subrace} (${build.race})`
    : build.race;

  const classPart = build.subclass
    ? `${build.class} — ${build.subclass}`
    : build.class;

  return `🧝 Race: ${racePart}\n⚔️ Class: ${classPart}\n🎭 Background: ${build.background}`;
}

