import { describe, test, expect } from 'vitest';
import { createPresentation } from '../functions/presentation.js';
import { addSlide, removeSlides, moveSlide, duplicateSlide, setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground } from '../functions/slide.js';

describe('Slide', () => {
    test('Slide was successfully added', () => {
        const presentation = createPresentation('My Presentation');
        if (presentation) {

            const presentationCopy = addSlide(presentation, "newTestSlide");
            expect(presentationCopy).not.toStrictEqual(presentation);

            const slideIndex = presentationCopy.slides?.findIndex(slide => slide.name === "newTestSlide");
            if (presentationCopy.slides && slideIndex != undefined && slideIndex > -1) {
                const slideId = presentationCopy.slides[slideIndex]?.id;
                expect(presentationCopy.slides[slideIndex]).toStrictEqual({
                    id: slideId,
                    name: "newTestSlide",
                    objects: []
                });
            }
        }
    });
    test('Slide was successfully removed/deleted', () => {
        const presentation = createPresentation('My Presentation');
        if (presentation) {
            let presentationCopy = addSlide(presentation, "newTestSlide1");
            presentationCopy = addSlide(presentationCopy, "newTestSlide2");
            const slideIndex = presentationCopy.slides?.findIndex(slide => slide.name === "newTestSlide2");
            if (presentationCopy.slides && slideIndex != undefined && slideIndex > -1) {
                const slideId = presentationCopy.slides[slideIndex]?.id;
                if (slideId) {

                    const updatedPresentation = removeSlides(presentationCopy, [slideId]);
                    expect(updatedPresentation).not.toStrictEqual(presentationCopy)

                    expect(updatedPresentation.slides?.findIndex(slide => slide.id == slideId)).toBe(-1);
                    expect(updatedPresentation.slides?.length).toBe(2);
                }
            }
        }   
    });
    test('Slide was successfully moved', () => {
        const presentation = createPresentation('My Presentation');
        if (presentation) {
            let presentationCopy = addSlide(presentation, "newTestSlide1");
            presentationCopy = addSlide(presentationCopy, "newTestSlide2");
            presentationCopy = addSlide(presentationCopy, "newTestSlide3");
            presentationCopy = addSlide(presentationCopy, "movableSlide");
            const indexBeforeMove = presentationCopy.slides?.findIndex(slide => slide.name === "movableSlide");
            if (presentationCopy.slides && indexBeforeMove != undefined && indexBeforeMove > -1) {
                const slideId = presentationCopy.slides[indexBeforeMove]?.id;
                if (slideId) {
                    const newIndex = 1;

                    const updatedPresentation = moveSlide(presentationCopy, slideId, newIndex);
                    expect(updatedPresentation).not.toStrictEqual(presentationCopy)

                    const indexAfterMove = updatedPresentation.slides?.findIndex(slide => slide.name === "movableSlide");
                    if (updatedPresentation.slides && indexAfterMove != undefined && indexAfterMove > -1) {
                        expect(indexAfterMove).toBe(newIndex);
                    }   
                }
            }
        }   
    });
    test('Slide was successfully duplicated', () => {
        const presentation = createPresentation('My Presentation');
        if (presentation) {
            const presentationCopy = addSlide(presentation, "newTestSlide");
            const slideIndex = presentationCopy.slides?.findIndex(slide => slide.name === "newTestSlide");
            if (presentationCopy.slides && slideIndex != undefined && slideIndex > -1) {
                const slideId = presentationCopy.slides[slideIndex]?.id;
                if (slideId) {

                    const updatedPresentation = duplicateSlide(presentationCopy, slideId)
                    expect(updatedPresentation).not.toStrictEqual(presentationCopy) 
                    
                    const dublicateIndex = updatedPresentation.slides?.findIndex(slide => slide.name === "newTestSlide-copy");
                    if (updatedPresentation.slides && dublicateIndex != undefined && dublicateIndex > -1) {
                        expect(updatedPresentation.slides[dublicateIndex]?.name).toBe("newTestSlide-copy");
                        expect(updatedPresentation.slides[slideIndex]?.id).not.toBe(updatedPresentation.slides[dublicateIndex]?.id);
                    }
                }
            }
        }   
    });
    test('Slide background color was successfully set', () => {
        const presentation = createPresentation('My Presentation');
        if (presentation) {
            const presentationCopy = addSlide(presentation, "newTestSlide");
            const slideIndex = presentationCopy.slides?.findIndex(slide => slide.name === "newTestSlide");
            if (presentationCopy.slides && slideIndex != undefined && slideIndex > -1) {
                const slideId = presentationCopy.slides[slideIndex]?.id;
                const slide = presentationCopy.slides[slideIndex];
                if (slideId && slide) {
    
                    const updatedSlide = setSlideBackgroundColor(slide, "#FF00FF");
                    expect(updatedSlide).not.toStrictEqual(slide)

                    expect(updatedSlide.background).toStrictEqual({type: "color", color: "#FF00FF"});
                }
            }
        }   
    });
    test('Slide background image was successfully set', () => {
        const presentation = createPresentation('My Presentation');
        if (presentation) {
            const presentationCopy = addSlide(presentation, "newTestSlide");
            const slideIndex = presentationCopy.slides?.findIndex(slide => slide.name === "newTestSlide");
            if (presentationCopy.slides && slideIndex != undefined && slideIndex > -1) {
                const slideId = presentationCopy.slides[slideIndex]?.id;
                const slide = presentationCopy.slides[slideIndex];
                if (slideId && slide) {
    
                    const updatedSlide = setSlideBackgroundImage(slide, "./images/image.png")
                    expect(updatedSlide).not.toStrictEqual(slide)

                    expect(updatedSlide.background).toStrictEqual({type: "image", url: "./images/image.png"})
                }
            }
        }   
    });
    test('Slide background gradient was successfully set', () => {
        const presentation = createPresentation('My Presentation');
        if (presentation) {
            const presentationCopy = addSlide(presentation, "newTestSlide");
            const slideIndex = presentationCopy.slides?.findIndex(slide => slide.name === "newTestSlide");
            if (presentationCopy.slides && slideIndex != undefined && slideIndex > -1) {
                const slideId = presentationCopy.slides[slideIndex]?.id;
                const slide = presentationCopy.slides[slideIndex];
                if (slideId && slide) {
    
                    const updatedSlide = setSlideBackgroundGradient(slide, ["blue", "white"], 45);
                    expect(updatedSlide).not.toStrictEqual(slide)

                    expect(updatedSlide.background).toStrictEqual({type: "gradient", colors: ["blue", "white"], angle: 45});
                }
            }
        }   
    });
    test('Slide background was successfully cleared', () => {
        const presentation = createPresentation('My Presentation')
        if (presentation) {
            const presentationCopy = addSlide(presentation, "newTestSlide")
            const slideIndex = presentationCopy.slides?.findIndex(slide => slide.name === "newTestSlide");
            if (presentationCopy.slides && slideIndex != undefined && slideIndex > -1) {
                const slideId = presentationCopy.slides[slideIndex]?.id;
                const slide = presentationCopy.slides[slideIndex]
                if (slideId && slide) {
                    
                    const updatedSlide = setSlideBackgroundGradient(slide, ["blue", "white"], 45)
                    const clearedSlide = clearSlideBackground(updatedSlide)
                    expect(clearedSlide).not.toStrictEqual(updatedSlide)

                    expect(clearedSlide.background).toStrictEqual(undefined)
                }
            }
        }   
    });
})    