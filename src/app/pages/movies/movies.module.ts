import { ListComponent } from 'src/app/components/list/list.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesPage } from './movies.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
  IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: MoviesPage }])
  ],
  declarations: [MoviesPage]
})
export class MoviesPageModule {}
