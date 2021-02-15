import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  POSTS: IPost[] = [
    {
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(2020, 11, 30, 11, 53),
      message: 'Message by first post',
      id: 0
    },
    {
      postedBy: 'admin',
      topic: 'Second post',
      date: new Date(2021, 2, 14, 21, 53),
      message: 'Message by second post',
      id: 1
    }
  ];

  constructor() { }

  getPosts(): IPost[] {
    return this.POSTS;
  }

  getPostById(id: number): IPost {
    let index = this.POSTS.findIndex(item => item.id == id);

    return this.POSTS[index];
  }

  addPost(topic: string, message: string, postedBy: string): void {
    let newPost: IPost = {
      topic: topic,
      message: message,
      date: new Date(),
      postedBy: postedBy,
      id: this.POSTS[this.POSTS.length - 1].id + 1
    }

    this.POSTS.push(newPost);
  }

  changePost(editedPost: IPost): void {
    let index = this.POSTS.findIndex(item => item.id == editedPost.id);

    this.POSTS.splice(index, 1, editedPost);
  }

  deletePost(id: number): void {
    this.POSTS.splice(id, 1);
  }
}
