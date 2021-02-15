import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { PostsService } from 'src/app/shared/services/posts.service';
import { IPost } from '../../shared/interfaces/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() currentUser: IUser;

  POSTS: IPost[];

  editedPost: IPost;
  postTopic: string;
  postMessage: string;

  editStatus: boolean;

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  formReset(): void {
    this.editedPost = null;
    this.postTopic = null;
    this.postMessage = null;
  }

  getPosts(): void {
    this.POSTS = this.postService.getPosts();
  }

  editPost(id: number): void {
    this.editedPost = this.postService.getPostById(id);

    let { topic, message } = this.editedPost;

    this.postTopic = topic;
    this.postMessage = message;

    this.editStatus = true;
  }

  saveChangesPost(): void {
    if (this.postTopic.trim() !== '' && this.postMessage !== '') {
      this.editedPost.topic = this.postTopic;
      this.editedPost.message = this.postMessage;

      this.postService.changePost(this.editedPost);

      this.editStatus = false;
      this.formReset();
    }
  }

  deletePost(id: number): void {
    this.postService.deletePost(id);
  }

}
