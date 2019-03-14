import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicsPage } from './comics.page';
import { ListComponent } from 'src/app/components/list/list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ComicsPage }])
  ],
  declarations: [ComicsPage, ListComponent]
})
export class ComicsPageModule {}
