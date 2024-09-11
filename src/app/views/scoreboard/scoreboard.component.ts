import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Score } from '../../models/score';
import confetti from 'canvas-confetti'; // Import confetti

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  scores$: Observable<{ id: string, score: Score }[]>; // Observable to hold the list of scores with document IDs
  previousScores: { id: string, score: Score }[] = [];
  colors: string[] = [
    '#7f00ff', // Violet
    '#0000ff', // Blue
    '#007fff', // Azure
    '#00ffff', // Cyan
    '#00ff7f', // Spring Green
    '#00ff00', // Lime
    '#7fff00', // Chartreuse
    '#ffff00', // Yellow
    '#ff7f00', // Orange
    '#ff0000'  // Red
  ];
  newScoreAlert: string | null = null; // Variable to hold the new score alert message
  alertData: { player: string; score: number; rank: number } | null = null; // Data for the alert
  alertTimeout: any; // Variable to hold the timeout reference

  constructor(private firestore: AngularFirestore) {
    // Initialize the observable with sorting by score in descending order
    this.scores$ = this.firestore.collection<Score>('scoreboard', ref =>
      ref.orderBy('score', 'desc')
    ).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Score;
          const id = a.payload.doc.id;
          return { id, score: data };
        })
      )
    );
  }

  ngOnInit(): void {
    this.scores$.subscribe(data => {
      if (this.previousScores.length === 0) {
        this.previousScores = data;
        return;
      }

      const newScores = data.filter(scoreData =>
        !this.previousScores.some(prevScore => prevScore.id === scoreData.id)
      );
      if (newScores.length > 0) {
        // Combine and sort the scores to determine rank
        const allScores = [...data]; // Use the latest data for accurate ranking
        allScores.sort((a, b) => b.score.score - a.score.score); // Sort in descending order

        newScores.forEach(newScore => {
          // Find the rank based on index in sorted list
          const rank = allScores.findIndex(scoreData => scoreData.id === newScore.id) + 1;
          this.showAlert(newScore.score, rank);

          // Trigger confetti if it's a high score (e.g., top 3)
          if (rank <= 3) {
            this.triggerConfetti();
          }
        });
      }

      this.previousScores = data;
    }, error => {
      console.error('Error fetching scores:', error);
    });
  }

  getBackgroundColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  showAlert(score: Score, rank: number): void {
    this.alertData = {
      player: score.player,
      score: score.score,
      rank: rank
    };
    this.newScoreAlert = `New High Score!`;

    // Clear any existing timeout
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    // Automatically hide the alert after 4 seconds
    this.alertTimeout = setTimeout(() => {
      this.newScoreAlert = null;
      this.alertData = null;
    }, 4000);
  }

  closeAlert(): void {
    this.newScoreAlert = null;
    this.alertData = null;
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }

  triggerConfetti(): void {
    // Confetti from bottom-left
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 1 }, // Adjusted from bottom-left
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
    });

    // Confetti from bottom-right
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.8, y: 1 }, // Adjusted from bottom-right
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
    });
  }

}
