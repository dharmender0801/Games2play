import { UserAccountDetailContainerComponent } from './user-account-detail-container/user-account-detail-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'detail/:tab', component: UserAccountDetailContainerComponent},
  {path: 'detail', component: UserAccountDetailContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
