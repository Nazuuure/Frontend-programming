import { describe, test, expect } from 'vitest'
import { createPresentation } from '../functions/presentation.js'
import { addTextObject, addImageObject, removeObject, moveObject, resizeObject, updateTextObjectStyle } from '../functions/objects.js'

describe('Object', () => {
    test('TextObject was successfully added', () => {
        const presentation = createPresentation('My Presentation')
        if (presentation.slides) {
            const slideCopy = presentation.slides[0]
            if (slideCopy) {

                const updatedSlide = addTextObject(slideCopy, {content: "Hello World!", x: 0, y: 0, width: 100, height: 100, fontFamily: "sans-serif", fontSize: 14, fontColor: "#000000"})
                expect(updatedSlide.objects).not.toStrictEqual(slideCopy.objects)

                if (updatedSlide?.objects) {
                    const objectId = updatedSlide?.objects[0]?.id
                    expect(updatedSlide?.objects).toStrictEqual([{
                        type: "text",
                        content: "Hello World!",  
                        fontFamily: "sans-serif", 
                        fontSize: 14,
                        fontColor: "#000000",
                        x: 0,
                        y: 0,
                        height: 100,
                        width: 100,
                        id: objectId
                    }])
                }
            }   
        }   
    });
    test('ImageObject was successfully added', () => {
        const presentation = createPresentation('My Presentation')
        if (presentation.slides) {
            const slideCopy = presentation.slides[0]
            if (slideCopy) {

                const updatedSlide = addImageObject(slideCopy, "./images/photo.png", {height: 100, width: 100}, {x: 0, y: 0})
                expect(updatedSlide).not.toStrictEqual(slideCopy)

                if (updatedSlide?.objects) {
                const objectId = updatedSlide?.objects[0]?.id
                    expect(updatedSlide?.objects).toStrictEqual([{
                        type: "image",
                        imageUrl: "./images/photo.png",
                        x: 0,
                        y: 0,
                        height: 100,
                        width: 100,
                        id: objectId
                    }]);
                }
            }
        }   
    });
    test('Object was successfully removed (deleted)', () => {
        const presentation = createPresentation('My Presentation')
        const slideCopy = presentation.slides[0]
        if (slideCopy) {
            const slideWithNewText = addTextObject(slideCopy, {content: "Hello World!", x: 0, y: 0, width: 100, height: 100, fontFamily: "sans-serif", fontSize: 14, fontColor: "#000000"})
            if (slideWithNewText?.objects) {
                const objectId = slideWithNewText?.objects[0]?.id
                if (objectId) {

                    const updatedSlide = removeObject(slideWithNewText, objectId)
                    expect(slideWithNewText.objects).not.toStrictEqual(updatedSlide.objects)                    
                    
                    expect(updatedSlide?.objects).toStrictEqual([])
                }
            }
        }
    });
    test('Object was successfully moved to newX, newY', () => {
        const presentation = createPresentation('My Presentation')
        const slideCopy = presentation.slides[0];
        if (slideCopy) {
            const slideWithNewImage = addImageObject(slideCopy, "./images/photo.png", {height: 100, width: 100}, {x: 0, y: 0})
            if (slideWithNewImage?.objects) {
                const objectId = slideWithNewImage?.objects[0]?.id
                if (objectId) {

                    const updatedSlide = moveObject(slideWithNewImage, objectId, {x: 10, y: 10})
                    expect(updatedSlide).not.toStrictEqual(slideCopy)

                    if (updatedSlide?.objects) {
                        expect(updatedSlide?.objects[0]).toStrictEqual({
                            type: "image",
                            imageUrl: "./images/photo.png",
                            x: 10,
                            y: 10,
                            height: 100,
                            width: 100,
                            id: objectId
                        });
                    }
                }
            }
        }        
    });
    test('Object was successfully resized', () => {
        const presentation = createPresentation('My Presentation')
        if (presentation.slides) {
            const slideCopy = presentation.slides[0]
            if (slideCopy) {
                const slideWithNewText = addTextObject(slideCopy, {content: "Hello World!", x: 0, y: 0, width: 100, height: 100, fontFamily: "sans-serif", fontSize: 14, fontColor: "#000000"})
                if (slideWithNewText?.objects) {
                    const objectId = slideWithNewText?.objects[0]?.id
                    if (objectId) {

                        const updatedSlide = resizeObject(slideWithNewText, objectId, {height: 50, width: 50})
                        expect(updatedSlide).not.toStrictEqual(slideCopy)

                        if (updatedSlide?.objects) {
                            expect(updatedSlide?.objects).toStrictEqual([{
                                type: "text",
                                content: "Hello World!",  
                                fontFamily: "sans-serif", 
                                fontSize: 14, 
                                fontColor: "#000000",
                                x: 0,
                                y: 0,
                                height: 50,
                                width: 50,
                                id: objectId
                            }]);
                        }
                    }
                }
            }
        }         
    });
    test('Styles of TextObject were successfully updated', () => {
        const presentation = createPresentation('My Presentation')
        if (presentation.slides) {
            const slideCopy = presentation.slides[0]
            if (slideCopy) {
                const slideWithNewText = addTextObject(slideCopy, {content: "Hello World!", x: 0, y: 0, width: 100, height: 100, fontFamily: "sans-serif", fontSize: 14, fontColor: "#000000"})
                if (slideWithNewText?.objects) {
                    const objectId = slideWithNewText?.objects[0]?.id
                    if (objectId) {

                        const updatedSlide = updateTextObjectStyle(slideWithNewText, objectId, {fontFamily: "Roboto", fontSize: 11, fontColor: "#FF00FF"})
                        expect(updatedSlide).not.toStrictEqual(slideCopy)

                        if (updatedSlide?.objects) {
                            expect(updatedSlide?.objects).toStrictEqual([{
                                type: "text",
                                content: "Hello World!",  
                                fontFamily: "Roboto", 
                                fontSize: 11, 
                                fontColor: "#FF00FF",
                                x: 0,
                                y: 0,
                                height: 100,
                                width: 100,
                                id: objectId
                            }]);
                        }
                    }
                }
            }
        }         
    });
});