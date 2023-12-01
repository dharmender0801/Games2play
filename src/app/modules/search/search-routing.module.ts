import { SearchContainerComponent } from './search-container/search-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { V2SearchContainerComponent } from './v2-search-container/v2-search-container.component';

const routes: Routes = [
  {
    path: ':layout',
    component: V2SearchContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
