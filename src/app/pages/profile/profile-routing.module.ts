import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsResolver } from 'src/app/core/resolver/user-details.resolver';
import { MyFriendComponent } from './my-friend/my-friend.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path:'',
    component:ProfileComponent,
    resolve:{
      user:UserDetailsResolver
    },
    children:[
      {
        path:'',
        redirectTo:'posts',
        pathMatch:'full'
      },
      {
        path:'posts',
        component:MyPostsComponent,
        resolve:{
          user:UserDetailsResolver
        }
      },
      {
        path:'photos',
        component:MyPhotosComponent
      },
      {
        path:'friends',
        component:MyFriendComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
