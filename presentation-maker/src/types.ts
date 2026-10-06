import type { Presentation } from "./types/presentation.js";
import type { Slide, Background, SlideObject } from "./types/slide.js";
import type { 
    TextObject, 
    ImageObject, 
    TextObjectOptions, 
    CoordinatesObjectOptions, 
    SizeObjectOptions, 
    TextStylesOptions 
} from "./types/objects.js";
import { 
    generatePresentationId,  
    createPresentation, 
    updatePresentationName, 
    savePresentation, 
    loadPresentation  
} from "./functions/presentation.js";
import type { 
    addTextObject,
    addImageObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextObjectStyle
} from "./functions/objects.js";
import type { 
    generateSlideId,
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground
} from "./functions/slide.js";

export type {
    Presentation,
    Slide,
    Background, 
    SlideObject,
    TextObject, 
    ImageObject, 
    TextObjectOptions, 
    CoordinatesObjectOptions, 
    SizeObjectOptions, 
    TextStylesOptions,
    addTextObject,
    addImageObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextObjectStyle,
    generateSlideId,
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground
};
export {
    generatePresentationId,  
    createPresentation, 
    updatePresentationName, 
    savePresentation, 
    loadPresentation
}