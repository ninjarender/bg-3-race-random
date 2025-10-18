export interface Race {
  name: string;
  subraces?: string[];
}

export interface Class {
  name: string;
  subclasses?: string[];
  primaryAbilities: string[];
}

export type Background = string;

export interface Build {
  race: string;
  subrace?: string;
  class: string;
  subclass?: string;
  background: string;
}

