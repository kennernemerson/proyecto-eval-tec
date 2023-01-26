// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {PlanComponent} from "./plan/plan.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/plan',
    pathMatch: 'full'
  },
  {
    path: 'plan',
    component: PlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
