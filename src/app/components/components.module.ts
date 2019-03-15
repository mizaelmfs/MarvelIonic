import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListComponent } from './list/list.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DetailsItemComponent } from './details-item/details-item.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    imports: [
    IonicModule,
        CommonModule
    ],
    exports: [ListComponent, DetailsItemComponent, LoadingComponent],
    declarations: [ListComponent, DetailsItemComponent, LoadingComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
