import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';
import { RegisterAccountComponent } from './pages/register-account/register-account.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: BudgetDetailsComponent },
  { path: 'register', component: RegisterAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
