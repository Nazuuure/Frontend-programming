import { describe, test, expect } from 'vitest';
import { createPresentation, updatePresentationName, savePresentation, loadPresentation } from '../functions/presentation.js';

describe('Presentation', () => {
    test('Presentation was successfully created with name "My Presentation"', () => {
        const presentation = createPresentation('My Presentation')
        expect(presentation.name).toBe('My Presentation')
        if (presentation.slides) {
            expect(presentation.slides.length).toBe(1)
        }
    });
    test('Name of presentation was successfully updated', () => {
        const presentation = createPresentation('My Presentation')
        const updatedPresentation = updatePresentationName(presentation, 'Updated Presentation')
        expect(updatedPresentation).not.toStrictEqual(presentation)
        expect(updatedPresentation.name).toBe('Updated Presentation')
    });
    test('Presentation save was complete successfully', () => {
        const presentation = createPresentation('My Presentation')
        const savedPresentation = savePresentation(presentation)
        expect(savedPresentation).toBe(JSON.stringify(presentation))
    });
    test('Presentation load was complete successfully', () => {
        const presentation = createPresentation('My Presentation')
        const stringifiedPresentation = JSON.stringify(presentation)
        const loadedPresentation = loadPresentation(stringifiedPresentation)
        expect(loadedPresentation).toStrictEqual(presentation)
        expect(loadedPresentation).toStrictEqual(JSON.parse(stringifiedPresentation))
    });
});