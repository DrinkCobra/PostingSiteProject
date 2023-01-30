import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "postfeed", component: PostFeedComponent},
  {path: "home", component: HomeComponent},
  {path: "**", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
