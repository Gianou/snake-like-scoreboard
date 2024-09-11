export interface Score {
    id?: string; // Optional, for Firestore or Realtime Database
    player: string;
    score: number;
    timestamp?: Date;
}