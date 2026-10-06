import type { TextObject, ImageObject } from "./objects";

type Slide = {
    id: string
    name: string
    objects: SlideObject[]
    background?: Background
}

type SlideObject = TextObject | ImageObject;

type Background = ColorBackground | ImageBackground | GradientBackground;

type ImageBackground = {
    type: "image"
    url: string
}

type ColorBackground = {
    type: "color"
    color: string
}

type GradientBackground = {
    type: "gradient"
    colors: string[]
    angle?: number
}

export type { Slide, Background, SlideObject }