import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserContainerComponent } from './pages/user/user-container.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserContainerComponent
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
