import { Component } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore'
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PostingSiteProject';
  firestore = new FirebaseTSFirestore;

  constructor(public router: Router){}


  onStartBackClick(){
    this.router.navigate(['home'])
  }


}
