import { ListComponent } from 'src/app/components/list/list.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesPage } from './movies.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MoviesPage }])
  ],
  declarations: [MoviesPage, ListComponent]
})
export class MoviesPageModule {}
