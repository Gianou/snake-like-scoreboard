import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';
import { LinkedInQrComponent } from './components/linked-in-qr/linked-in-qr.component';
import { SelfLinkComponent } from './components/self-link/self-link.component';
import { GithubQrComponent } from './components/github-qr/github-qr.component';
@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    LinkedInQrComponent,
    SelfLinkComponent,
    GithubQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
