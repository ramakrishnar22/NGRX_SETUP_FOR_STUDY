import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ImageAnnotationState } from "./image-annotation.state";

export const getFeatureForImageAnnotation = createFeatureSelector<ImageAnnotationState>('imageAnnotation');

export const getAction = createSelector(getFeatureForImageAnnotation, (state)=>state.action);

export const getAnnotations = createSelector(getFeatureForImageAnnotation, (state)=>state.annotations);

export const getImage = createSelector(getFeatureForImageAnnotation, (state) => state.image)

export const getLastAnnotations = createSelector(getFeatureForImageAnnotation, (state) => state.annotations.slice(-1)[0])

