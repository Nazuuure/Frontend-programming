type TextObject = BaseObject & TextStyles & {
    type: "text"
    content: string
}

type TextStyles = {
    fontFamily: string
    fontSize: number
    fontColor: string
}

type ImageObject = BaseObject & {
    type: "image"
    imageUrl: string
}

type BaseObject = Coordinates & Size & {
    id: string
}

type Coordinates = {
    x: number
    y: number
}

type Size = {
    height: number
    width: number
}

type TextObjectOptions = TextStylesOptions & SizeObjectOptions & CoordinatesObjectOptions & {
    content?: string
}

type SizeObjectOptions = Partial<Size>

type CoordinatesObjectOptions = Partial<Coordinates>

type TextStylesOptions = Partial<TextStyles>

export type { TextObject, ImageObject, TextObjectOptions, CoordinatesObjectOptions, SizeObjectOptions, TextStylesOptions }