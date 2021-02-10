import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ContactHomeComponent } from './pages/contact-home/contact-home.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'contact/:id', component: ContactDetailsComponent },
  { path: 'contact', component: ContactHomeComponent },
  { path: 'edit/:id', component: ContactEditComponent },
  { path: 'edit/:id', component: ContactEditComponent },
  { path: 'edit', component: ContactEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
