import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { SearchPage } from './home/search/search.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home',
  children: [
    {
      path: '',
      loadChildren: './home/home.module#HomePageModule' 
    },
    {
      path: ':colectionId',
      loadChildren: './home/card-page/card-page.module#CardPagePageModule'
    }
  ]},
  { path: 'search',
  children: [
    {
      path: '',
      loadChildren: './home/search/search.module#SearchPageModule' 
    },
  ]},
  { path: 'add-form', loadChildren: './home/add-form/add-form.module#AddFormPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  //{ path: 'search', loadChildren: './home/search/search.module#SearchPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
