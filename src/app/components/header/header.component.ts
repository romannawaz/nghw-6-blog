import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { PostsService } from 'src/app/shared/services/posts.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  emailField: string;
  passwordField: string;

  currentUser: IUser;
  isLogged: boolean;

  newPostTopic: string;
  newPostMessage: string;

  newUserNameField: string;
  newUserEmailField: string;
  newUserPasswordField: string;

  constructor(
    private userService: UsersService,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
  }

  singInFormReset(): void {
    this.emailField = null;
    this.passwordField = null;
  }

  singUpFormReset(): void {
    this.newUserNameField = null;
    this.newUserEmailField = null;
    this.newUserPasswordField = null;
  }

  singIn(e: Event): void {
    e.preventDefault();

    if (this.emailField.trim() !== '' && this.passwordField.trim() !== '') {
      let res = this.userService.getUser(this.emailField, this.passwordField);

      if (res) {
        this.currentUser = res;
        this.isLogged = true;
      }
      else {
        console.log('wrong data');
      }
    }
    else {
      console.log('field is empty');
    }

    this.singInFormReset();
  }

  addUser(): void {
    let tmpCurrentUser = this.userService.addUser(this.newUserNameField, this.newUserEmailField, this.newUserPasswordField);

    if (tmpCurrentUser) {
      this.currentUser = tmpCurrentUser;
      this.isLogged = true;

      this.singUpFormReset();
    }
    else {
      console.log('addUser() error');
    }
  }

  singOut(): void {
    this.currentUser = null;
    this.isLogged = false;
  }

  addNewPost(): void {
    if (this.newPostTopic.trim() !== '' && this.newPostMessage !== '') {
      this.postService.addPost(this.newPostTopic, this.newPostMessage, this.currentUser.username);

      this.newPostTopic = null;
      this.newPostMessage = null;
    }
  }

}
