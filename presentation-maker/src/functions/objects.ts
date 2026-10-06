import type { Slide } from "../types/slide";
import type { TextObject, SizeObjectOptions, TextObjectOptions, CoordinatesObjectOptions, TextStylesOptions } from "../types/objects";

function generateObjectId(parentId: string): string {
  const randomPart = Math.random().toString(36).substring(0, 4)
  return `${parentId}-${randomPart}`
}

function addTextObject(slide: Slide, options: TextObjectOptions = {}): Slide {
    const slideId = slide.id;
    return {
        ...slide,
        objects: [
            ...(slide.objects || []),
            {
                type: "text",
                content: options.content || "add_text",
                fontFamily: options.fontFamily || "Calibri, sans-serif",
                fontSize: options.fontSize || 18,
                fontColor: options.fontColor || "#000000",
                x: options.x || 0,
                y: options.y || 0,
                height: options.height || 10,
                width: options.width || 10,
                id: generateObjectId(slideId)
            }
        ]
    }
}

function addImageObject(slide: Slide, imageUrl: string, size: SizeObjectOptions = {}, coordinates: CoordinatesObjectOptions = {}): Slide {
    const slideId = slide.id;
    return {
        ...slide,
        objects: [
            ...(slide.objects || []),
            {
                type: "image",
                imageUrl: imageUrl,
                x: coordinates.x || 0,
                y: coordinates.y || 0,
                height: size.height || 10,
                width: size.width || 10,
                id: generateObjectId(slideId)
            }
        ]
    }
}

function removeObject(slide: Slide, objectId: string): Slide {
    if (!slide.objects) {
        return { ...slide };
    }

    const slideCopy = { 
        ...slide,
        objects: [ ...slide.objects]
     }

    const deleteIndex = slideCopy.objects?.findIndex(object => object.id === objectId)

    if (deleteIndex == undefined || deleteIndex < 0) {
        return { ...slide };
    }

    slideCopy.objects?.splice(deleteIndex, 1)
    return { ...slideCopy }
}

function moveObject(slide: Slide, objectId: string, newCoordinates: CoordinatesObjectOptions = {}): Slide {
    const slideCopy = { ...slide }
    const objectIndex = slideCopy.objects?.findIndex(object => object.id === objectId)
    
    if (objectIndex == undefined || objectIndex < 0 || !slideCopy.objects) {
        return { ...slide };
    }

    const objectsCopy = [ ...slideCopy.objects ]

    if (objectsCopy[objectIndex]) {
        objectsCopy[objectIndex] = {
            ...objectsCopy[objectIndex],
            x: newCoordinates.x || objectsCopy[objectIndex].x,
            y: newCoordinates.y || objectsCopy[objectIndex].y
        }
        return { 
            ...slideCopy,
            objects: objectsCopy 
        }
    }  
    return { ...slideCopy }
}  

function resizeObject(slide: Slide, objectId: string, newSizes: SizeObjectOptions = {}): Slide {
    const slideCopy = { ...slide }
    const objectIndex = slideCopy.objects?.findIndex(object => object.id === objectId)
    
    if (objectIndex == undefined || objectIndex < 0 || !slideCopy.objects) {
        return { ...slide };
    }

    const updatedObjects = [...slideCopy.objects];
    if (updatedObjects[objectIndex]) {
        updatedObjects[objectIndex] = {
            ...updatedObjects[objectIndex],
            width: newSizes.width || updatedObjects[objectIndex].width,
            height: newSizes.height || updatedObjects[objectIndex].height
        };
        return {
            ...slideCopy,
            objects: updatedObjects
        }
    }
    
    return { ...slideCopy }
}

function updateTextObjectStyle(slide: Slide, objectId: string, newStyles: TextStylesOptions = {}): Slide {
    if (!slide.objects) {
        return slide;
    }

    const updatedObjects = slide.objects.map(object => {
        if (object.id === objectId && object.type === "text") {
            return {
                ...object,
                fontFamily: newStyles.fontFamily || object.fontFamily,
                fontSize: newStyles.fontSize || object.fontSize,
                fontColor: newStyles.fontColor || object.fontColor
            };
        }
        return { ...object }
    });

    return {
        ...slide,
        objects: updatedObjects
    };
}

export { 
    addTextObject,
    addImageObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextObjectStyle
}