
// Fix: Import React to resolve 'Cannot find namespace React' error
import React from 'react';

export interface ProjectSection {
  id: string;
  title: string;
  content: string | string[] | React.ReactNode;
  icon: string;
}

export interface ComponentItem {
  name: string;
  use: string;
  cost: number;
}

export interface ProjectData {
  title: string;
  problemDefinition: string;
  workingLogic: string[];
  hardwareComponents: ComponentItem[];
  softwareTools: string[];
  futureScope: string[];
  report: {
    abstract: string;
    introduction: string;
    proposedSystem: string;
    workingMethodology: string;
    hardwareDescription: string;
    softwareDescription: string;
    expectedOutput: string;
    advantages: string[];
    applications: string[];
    conclusion: string;
  };
}
