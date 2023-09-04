import { createReducer, on } from "@ngrx/store";
import { annotationFailure, annotationSuccess, drawImageAnnotation, imageFailure, imageSuccess } from "./image-annotation.action";
import { ImageAnnotationState } from "./image-annotation.state";


export const initialState:ImageAnnotationState = {
    error: "",
    action:"",
    annotations:[],
    image:null
}

export const imageAnnotationReducer = createReducer(initialState, 
    on(drawImageAnnotation, (state, action) => ({
        ...state,
        ...initialState,
        action:action.type,
    })),

    on(imageSuccess, (state, action) => ({
        ...state,
        action:action.type,
        image:action.image
    })),

    on(imageFailure, (state, action) => ({
        ...state,
        action:action.type,
        error:action.error
    })),

    on(annotationSuccess, (state, action) => ({
        ...state,
        action:action.type,
        annotations:[...state.annotations, ...action.annotations]
    })),

    on(annotationFailure, (state, action) => ({
        ...state,
        action:action.type,
        error:action.error
    })),
    )

