import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, combineLatest, forkJoin, map, tap } from "rxjs";
import { getImage, getLastAnnotations } from "../image-annotation-state/image-annotation-selector";
import { annotationFailure, annotationSuccess, imageFailure, imageSuccess } from "../image-annotation-state/image-annotation.action";
import { Annotation, ImageAnnotationState } from "../image-annotation-state/image-annotation.state";

export interface APIResponse{
    status:string,
    message:string
}


@Injectable({providedIn:'root'})
export class AppService{

    imageUrl:string = "https://image.dummyjson.com/512x512/101010";
    annotationUrl:string = "https://dummyjson.com/http/200/[%7B%22id%22:%22a2%22,%22radiusX%22:20,%22radiusY%22:25,%22x%22:50,%22y%22:60%7D]";

    constructor(private store:Store<ImageAnnotationState>, private httpClient:HttpClient){}

    loadImage(){
        return this.httpClient.get(this.imageUrl, {responseType: 'blob'}).pipe(
            catchError((err,_) =>{
                this.store.dispatch(imageFailure({error:err.error}));
                throw new Error(err);
            })
        ).subscribe(res =>{
            this.store.dispatch(imageSuccess({image:res}));
        })
    }

    loadAnnotations(){
        return this.httpClient.get<APIResponse>(this.annotationUrl)
        .pipe(
            map(res => res.message),
            map(message => JSON.parse(message)),
            catchError((err,_) =>{
                this.store.dispatch(annotationFailure({error:err.error}));
                throw new Error(err);
            })
        ).subscribe((res:Annotation[]) =>{
            this.store.dispatch(annotationSuccess({annotations:res}));
        })
    }

    drawImageAndAnnotation(){
        console.log("Processing started");
        combineLatest([this.store.select(getImage),
            this.store.select(getLastAnnotations)])
            .subscribe(([imageData, annotationData]) =>{
                console.log(imageData, annotationData);
            })
    }

    
}