import type { Presentation } from "../types/presentation";
import type { Slide } from "../types/slide";
import { generateSlideId } from "./slide";

function generatePresentationId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(0, 16);
  return `${timestamp}-${randomPart}`;
}

function createPresentation(name: string): Presentation {
    const presentationId: string = generatePresentationId();
    const newPresentation: Presentation = {
        id: presentationId,
        name: name,
        slides: []
    };
    const defaultPresentationSlide: Slide = {
        id: generateSlideId(presentationId),
        name: "firstSlide",
        objects: []
    };

    return {
        ...newPresentation,
        slides: [defaultPresentationSlide]
    };
}

function updatePresentationName(presentation: Presentation, name: string): Presentation {
    console.log(`Presentation name (${presentation.name}) was updated to: `, name)
    return {
        ...presentation,
        name: name,
    };
}

function savePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation)
}

function loadPresentation(json: string): Presentation {
    return JSON.parse(json)
}

export { 
    generatePresentationId,  
    createPresentation, 
    updatePresentationName, 
    savePresentation, 
    loadPresentation 
};