import { createAction, props } from "@ngrx/store";
import { Annotation, ImageAnnotationState, ImageAnnotationTypes } from "./image-annotation.state";

export const drawImageAnnotation = createAction(ImageAnnotationTypes.Draw_Image_Annotation);
export const imageSuccess = createAction(ImageAnnotationTypes.Image_Success, props<{image:any}>());
export const imageFailure = createAction(ImageAnnotationTypes.Image_Failure, props<{error:string}>());
export const annotationSuccess = createAction(ImageAnnotationTypes.Annotation_Success, props<{annotations:Annotation[]}>());
export const annotationFailure = createAction(ImageAnnotationTypes.Annotation_Failure, props<{error:string}>());