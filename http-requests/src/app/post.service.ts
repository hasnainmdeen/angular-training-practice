import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postChanged = new Subject<boolean>();
  errorOccurred = new Subject<string>();
  constructor(private http: HttpClient) {}

  // createAndStorePost(title: string, content: string) {
  createAndStorePost(postData: Post) {

    // we are not communitcating directy with the database. Instead, we are communicating with the rest api provided by fire base
    // adding /posts.json in url is the requirement of firebase, nothing related to angular or rest. with this fire base will parse the url and create sub folders as per url
    // return this.http
    this.http
      .post<{name: string}>(
        // angular http client will convert the javascript object to json data for us
        'https://ng-complete-guide-4598d-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          // observe: 'body' // body is default. It just gives us the response body converted in javascript object
          observe: 'response' // telling javascript that we need all things (headers and all) in response
        }
      )
      .subscribe(responseData => { // requests are only sent when we subscribe. when someone is listening
          console.log(responseData);
          this.postChanged.next(true);
        },
        error => {
          this.errorOccurred.next(error.message);
        }
      );
  }

  fetchPosts(){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('print', 'pretty')
    queryParams = queryParams.append('anyKey', 'anyValue'); // doesn't do anything with firebase

    return this.http
    .get<{ [key: string]: Post }>(
      'https://ng-complete-guide-4598d-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        params: queryParams
      }
    )
    .pipe(
      // telling type script the of data we expect as response data. since we don't know the exact name of the
      // key, we are telling that key could be any string (one way of telling the type is shown below)
      // map((responseData: {[key: string]: Post}) => {
      // second way is, in get method above
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            // spread operator will pull out all the key value pair of the nested object we are accessing here
            postsArray.push( {...responseData[key], id: key} );
          }
        }
        return postsArray;
      }),
      catchError(errorResponse => {
        console.log(errorResponse);
        return throwError(errorResponse); // throw error will yeild an observable by wrapping the error
      })
    );
    // One approach would have been to use a subject and pass next to our app component and then subscribe to
    // that subject there in app component.
    // We used the other approach here. Since our component does care about the data this fetch posts returns,
    // hence we are subscribing in app component. otherwise it would be fine to subscribe here if it wasn't the
    // case.
    // .subscribe(posts => {
      // console.log(posts);
      // this.isFetching = false;
      // this.loadedPosts = posts;
    // });
  }

  deletePosts() {
    return this.http
      .delete(
        'https://ng-complete-guide-4598d-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
          responseType: 'text' // telling angular the type of our response
        }
      )
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) { // to fine grain control over our request status we can use events
            console.log(event.type);
          }
          if(event.type === HttpEventType.Response){
            console.log(event.body);
          }
        })
      ) ;
    // .subscribe(responseData => {
    //   console.log(responseData);
    // });

    // this.postChanged.next(true);
  }


}
