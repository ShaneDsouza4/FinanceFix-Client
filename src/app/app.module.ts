import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BudgetDetailsComponent } from './pages/budget-details/budget-details.component';
import { RegisterAccountComponent } from './pages/register-account/register-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BudgetDetailsComponent,
    RegisterAccountComponent,
    NavBarComponent,
    FormWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
