import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'snake-like-scoreboard';
  data: any;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.firestore.collection('scoreboard').valueChanges().subscribe(data => {
      this.data = data;
      console.log('Firestore Data:', this.data);
    }, error => {
      console.error('Error fetching data from Firestore:', error);
    });
  }
}
