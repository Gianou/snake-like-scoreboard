import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // For Firestore
// import { AngularFireDatabase } from '@angular/fire/compat/database'; // Uncomment if using Realtime Database
import { Observable } from 'rxjs';
import { Score } from '../../models/score';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  scores$: Observable<Score[]>; // Observable to hold the list of scores

  constructor(private firestore: AngularFirestore) { // Inject Firestore service
    // Initialize the observable
    this.scores$ = this.firestore.collection<Score>('scoreboard').valueChanges();
  }

  ngOnInit(): void {
    // Fetch data when the component initializes
    this.fetchScores();
  }

  fetchScores(): void {
    // You can implement additional logic here if needed
    this.scores$.subscribe(data => {
      console.log('Fetched scores:', data);
    }, error => {
      console.error('Error fetching scores:', error);
    });
  }
}
