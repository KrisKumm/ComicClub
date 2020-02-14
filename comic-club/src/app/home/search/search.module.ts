import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { HomePage } from '../home.page';
import { AppPage } from 'e2e/src/app.po';

const routes: Routes = [
  // {
  //   path: '',
  //   component: SearchPage
  // },
  { path: '',
  children: [
    {
      path: '',
      component: SearchPage,
    },
    {
      path: '/user',
      loadChildren: './home/home.module#HomePageModule' 
    }
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ SearchPage] 
})
export class SearchPageModule {}
