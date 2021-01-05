import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  postChangedSubscription: Subscription;
  errorOccurredSubscription: Subscription;

  // injecting http client
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorOccurredSubscription = this.postService.errorOccurred.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.postChangedSubscription.unsubscribe();
    this.errorOccurredSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    console.log(postData);
    this.postService.createAndStorePost(postData);

    this.postChangedSubscription = this.postService.postChanged.subscribe( didChange => {
      console.log('Post changed? ' + didChange);
      this.onFetchPosts();
    });

  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe( () => {
      this.loadedPosts = [];
    });

  }

  onHandleError() {
    this.isFetching = false;
    this.error = null;
  }


}
