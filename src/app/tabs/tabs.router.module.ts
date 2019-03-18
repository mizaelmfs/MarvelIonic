import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        children: [
          {
            path: '',
            loadChildren: '../pages/movies/movies.module#MoviesPageModule'
          }
        ]
      },
      {
        path: 'characters',
        children: [
          {
            path: '',
            loadChildren: '../pages/characters/characters.module#CharactersPageModule'
          }
        ]
      },
      {
        path: 'comics',
        children: [
          {
            path: '',
            loadChildren: '../pages/comics/comics.module#ComicsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/movies',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [RouterModule, TranslateModule]
})
export class TabsPageRoutingModule {}
