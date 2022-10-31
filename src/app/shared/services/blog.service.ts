import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private users: Array <IUser> = [
    {
      id:0,
      userName: 'admin',
      email: 'admin@gmail.com',
      password: 'admin12345'
    }
  ];
  private posts: Array <IPost> = [
    {
      id: 0,
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(),
      message: 'Sign up to create your account and start to use Angular Blog'
    }
  ]
constructor() { }

  getUser(): Array<IUser>{
    return this.users;
  } 
  addUser(user:IUser): void{
    this.users.push(user);
  }
  getPost(): Array<IPost>{
    return this.posts;
  }
  addPost(post:IPost): void{
    this.posts.push(post);
  }
}
