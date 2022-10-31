import { Component, OnInit } from '@angular/core';
import { IPost } from '../shared/interfaces/post.interface';
import { IUser } from '../shared/interfaces/user.interface';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  /* Header buttons */
    public btnGroups = true;
    public currentUserName!:string;

    /* Sign In */
      public signInActive = false;
      public passwordValueIn!:string;
      public emailValueIn!:string;
      public emailIndex = -1;
      public correctPassword = false;

    /* Sign Up */
      public signUpActive = false;
      public userNameUp!:string;
      public passwordValueUp!:string;
      public emailValueUp!:string;
      public emailIfExists!:boolean;
      public passIfExists!:boolean;

    /* Add post */
      public postActive = false;
      public postTitle!:string;
      public textArea!:string;

  /* Modal windows */
    public modalActive = false;
  
  /* Post control */
    public currentIndex!:number;
    public editPostActive = false;

  /* Servises */
    public blogUsers: Array<IUser> = [];
    public blogPosts: Array<IPost> = [];

  constructor(
    public userService: BlogService,
    public postService: BlogService
  ) { }

  ngOnInit(): void {
    this.blogUsers = this.userService.getUser();
    this.blogPosts = this.postService.getPost();
  }
  
  /* Header buttons */
    signIn(): void{
      this.modalActive=true;
      this.signInActive = true;
      this.signUpActive = false;
      this.postActive = false;
    }
    signUp(): void{
      this.modalActive =true;
      this.signUpActive=true;
      this.postActive = false;

    }
    signOut(): void{
      this.btnGroups = true;
      this.postActive = false;
      this.currentUserName = '';
    }
    addPost(): void{
      this.modalActive = true;
      this.postActive = true;
      this.signUpActive = false;
      this.signUpActive=false;
    }
    
  /* Modal windows */  
    closeModal(): void{
      this.modalActive = false;
      this.signInActive = false;
      this.clearLogIn();
      this.clearLogUp();
      this.clearPostForm();
    }
    /* Log In */
      checkEmail(email:string):void{
        this.emailIndex = this.blogUsers.findIndex((userEmail)=> userEmail.email === email);
      }
      checkPassword(password:string):void{
        this.correctPassword = this.blogUsers[this.emailIndex].password === password;
      }
      logIn(): void{
        if(this.emailValueIn && this.passwordValueIn){
          if(this.correctPassword){
            this.closeModal();
            this.btnGroups = false;
            this.currentUserName = this.blogUsers[this.emailIndex].userName;
            this.clearLogIn();
          }
          else{
            alert('Not such user exist!');
          }
        }
        else{
          alert('Enter your login and password');
        }
      }
    /* Sign Up */
      createUser():void{
        if(this.userNameUp && this.emailValueUp && this.passwordValueUp){
          const newUser = {
            id: 2,
            userName: this.userNameUp,
            email: this.emailValueUp,
            password: this.passwordValueUp
          }
          this.userService.addUser(newUser);
          this.closeModal();
          this.clearLogUp();
        }
        else{
          alert('Please fill in all fields');
        }
        
      }
    /* Add post */
      createPost():void {
        if(this.postTitle && this.textArea){
          const post = {
            id: this.blogPosts.length,
            postedBy: this.blogUsers[this.emailIndex].userName,
            topic: this.postTitle,
            date: new Date(),
            message: this.textArea
          }
          this.userService.addPost(post);
          this.closeModal();
          this.clearPostForm();
          this.postActive = false;
        }
        else{
          alert('Please fill in all fields');
        }
      }

  /* Post control */
    editPost(postIndex:number):void {
      this.currentIndex = postIndex;
      this.modalActive = true;
      this.postActive = true;
      this.editPostActive = true;
      this.postTitle = this.blogPosts[postIndex].topic;
      this.textArea = this.blogPosts[postIndex].message;
    }
    deletePost(postIndex:number): void{
      this.blogPosts.splice(postIndex, 1);
    }
    saveEditedPost():void {
      this.blogPosts[this.currentIndex].topic = this.postTitle;
      this.blogPosts[this.currentIndex].message = this.textArea;
      this.clearPostForm();
      this.closeModal();
    }

  clearLogIn():void {
    this.emailValueIn = '';
    this.passwordValueIn = '';
  }
  clearLogUp():void {
    this.userNameUp = '';
    this.emailValueUp = '';
    this.passwordValueUp = '';
  }
  clearPostForm():void {
    this.postTitle = '';
    this.textArea = '';
  }

  ifExistsEmail(email:string):void {
    this.emailIfExists = this.blogUsers.some((newUser) => newUser.email === email);
    if(this.emailIfExists) { alert("This email already exists");}
  }
  ifExistsPass(password:string):void {
    this.passIfExists = this.blogUsers.some((newUser)=> newUser.password === password);
    if(this.passIfExists) { alert("This password already exists");}
  }

  checkAdminOrPostRights(userName: string): boolean {
    return this.currentUserName === 'admin' || this.currentUserName === userName;
  }

}
