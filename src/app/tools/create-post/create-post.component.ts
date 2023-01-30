import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit{
  selectedImageFile :File;
  auth = new FirebaseTSAuth();
  app = new FirebaseTSApp();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  constructor(private dialog: MatDialogRef<CreatePostComponent>, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
    return false;
    };
  }
  ngOnInit(): void {
  }

  onPostClick(commentInput: HTMLTextAreaElement){
    let comment = commentInput.value;
    if(comment.length <= 0) return;
    if(this.selectedImageFile){
      this.uploadImagePost(comment);
    }else{
      this.uploadPost(comment);
    }
    this.router.navigateByUrl('/postfeed');
  }

  uploadImagePost(comment: string){
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts",postId,"image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestore.create(
            {
              path: ["Posts", postId],
              data: {
                comment: comment,
                imageUrl: downloadUrl,
                timestamp: FirebaseTSApp.getFirestoreTimestamp()
              },
              onComplete: (docId) => {
                this.dialog.close();
                this.router.navigateByUrl('/postfeed');
            }
          }
        );
       }
      }
    );
  }

  uploadPost(comment: string){
    this.firestore.create(
      {
        path: ["Posts"],
        data: {
          comment: comment,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          this.dialog.close();
          this.router.navigateByUrl('/postfeed');
      }
    }
  );
  }

  onPhotoSelected(photoSelector: HTMLInputElement){
    this.selectedImageFile = photoSelector.files[0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result?.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    )
  }
}
