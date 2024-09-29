import { Routes } from '@angular/router';
import { AddSongComponent } from './components/add-song/add-song.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-song',
    component: AddSongComponent,
    title: 'add-song 🎵',
  },
];
