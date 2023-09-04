import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { getAction } from './image-annotation-state/image-annotation-selector';
import { annotationSuccess, drawImageAnnotation, imageSuccess } from './image-annotation-state/image-annotation.action';
import { ImageAnnotationState, ImageAnnotationTypes } from './image-annotation-state/image-annotation.state';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ngrx-image-processor';

  constructor(private store:Store<ImageAnnotationState>, private appService:AppService){}


  ngOnInit(){
    this.store.pipe(
      tap(console.log),
      select(getAction)
    ).subscribe(action => {
        switch(action){
          case ImageAnnotationTypes.Draw_Image_Annotation :
            this.appService.loadImage();
            break;
          case ImageAnnotationTypes.Image_Success :
            this.appService.loadAnnotations();
            break;
          case ImageAnnotationTypes.Annotation_Success :
            this.appService.drawImageAndAnnotation();
            break;
        }
    })
    this.store.dispatch(drawImageAnnotation());
  }
}
