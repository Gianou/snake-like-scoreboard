import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Score } from '../../models/score';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  scores$: Observable<Score[]>; // Observable to hold the list of scores
  colors: string[] = [
    '#ff0000', // Red
    '#ff7f00', // Orange
    '#ffff00', // Yellow
    '#7fff00', // Chartreuse
    '#00ff00', // Lime
    '#00ff7f', // Spring Green
    '#00ffff', // Cyan
    '#007fff', // Azure
    '#0000ff', // Blue
    '#7f00ff'  // Violet
  ];

  constructor(private firestore: AngularFirestore) {
    // Initialize the observable with sorting by score in descending order
    this.scores$ = this.firestore.collection<Score>('scoreboard', ref =>
      ref.orderBy('score', 'desc')
    ).valueChanges();
  }

  ngOnInit(): void {
    // Fetch data when the component initializes
    this.scores$.subscribe(data => {
      console.log('Fetched scores:', data);
    }, error => {
      console.error('Error fetching scores:', error);
    });
  }

  getBackgroundColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
