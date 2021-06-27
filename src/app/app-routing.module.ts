import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserByAdminComponent } from './components/create-user-by-admin/create-user-by-admin.component';
import { HomeComponent } from './components/home/home.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileUserSelectComponent } from './components/profile-user-select/profile-user-select.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LeagueComponent } from './components/league/league.component';
import { LeagueSelectComponent } from './components/league-select/league-select.component';
import { ProfileLeagueComponent } from './components/profile-league/profile-league.component';
import { CreateLeagueComponent } from './components/create-league/create-league.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'Home', pathMatch:'full'},
  {path: 'home', component: HomeComponent },
  {path: 'navbar', component: NavbarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'createUser', component: CreateUserByAdminComponent},
  {path: 'listUsers', component: ListUserComponent},
  {path: 'profileUserSelect', component: ProfileUserSelectComponent},
  {path: 'leagues', component: LeagueComponent},
  {path: 'leagueSelect', component: LeagueSelectComponent},
  {path: 'profileLeague', component: ProfileLeagueComponent},
  {path: 'createLeague', component: CreateLeagueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
