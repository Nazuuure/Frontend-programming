import type { Slide } from "../types/slide"
import type { Presentation } from "../types/presentation"

function generateSlideId(parentId: string): string {
  const randomPart = Math.random().toString(36).substring(0, 8)
  return `${parentId}-${randomPart}`
}

function addSlide(presentation: Presentation, slideName?: string): Presentation {
    const newSlide: Slide = {
        id: generateSlideId(presentation.id),
        name: slideName || "UntitledSlide",
        objects: []
    }
    
    return {
        ...presentation,
        slides: [
            ...(presentation.slides || []),
            newSlide
        ]
    };
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
    if (!presentation.slides || slideIds.length == 0) {
        return { ...presentation };
    }

    const slideIdSet = new Set(slideIds)
    const filteredSlides = presentation.slides.filter(slide => !slideIdSet.has(slide.id));

    return {
        ...presentation,
        slides: filteredSlides.length > 0 ? filteredSlides : []
    };
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    if (!presentation.slides) {
        return { ...presentation }
    }

    const currentSlideIndex = presentation.slides.findIndex(slide => slide.id == slideId);
    
    if (currentSlideIndex == -1) {
        return { ...presentation }
    }

    const maxIndex = presentation.slides.length - 1;
    const validNewIndex = Math.max(0, Math.min(newIndex, maxIndex));

    if (currentSlideIndex == validNewIndex) {
        return { ...presentation }
    }

    const slidesCopy = [...presentation.slides];
    const [movedSlide] = slidesCopy.splice(currentSlideIndex, 1);

    if (!movedSlide) {
        return { ...presentation }
    }

    slidesCopy.splice(validNewIndex, 0, movedSlide);

    return {
        ...presentation,
        slides: slidesCopy,
    };
}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {
    if (!presentation.slides) {
        return { ...presentation }
    }

    const slidesCopy = [...presentation.slides];
    const currentSlideIndex = slidesCopy.findIndex(slide => slide.id === slideId);
    const currentSlideId = slidesCopy[currentSlideIndex]?.id;
    if (currentSlideId && slidesCopy[currentSlideIndex]?.objects) {
        const currentSlideCopy = {
            ...slidesCopy[currentSlideIndex],
            name: `${slidesCopy[currentSlideIndex]?.name}-copy`,
            id: generateSlideId(currentSlideId),
        };

        slidesCopy.splice(currentSlideIndex + 1, 0, currentSlideCopy)
        return { 
            ...presentation,
            slides: slidesCopy
        };
    }
    return { ...presentation }
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    return {
        ...slide,
        background: {
            type: "color",
            color: color
        }
    }
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    return {
        ...slide,
        background: {
            type: "image",
            url: imageUrl
        }
    }
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle?: number): Slide {
    if (!angle) {
        angle = 0
    }
    
    return {
        ...slide,
        background: {
            type: "gradient",
            colors: colors,
            angle: angle
        }
    }
}

function clearSlideBackground(slide: Slide): Slide {
    const newSlide = {
        ...slide
    }
    delete newSlide.background
    return newSlide;
}

export { 
    generateSlideId,
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground
}