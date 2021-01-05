import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, observable, Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private observableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.observableSubscription = interval(1000).subscribe(
    //   count => { // anonymous function gets the value that is emitted as in argument (count)
    //     console.log(count);
    //   }
    // );
    const customIntervalObservable = Observable.create(observer => {
        let count = 0;
        setInterval( () => {
          observer.next(count); // emitting new event
          if(count === 5){
            observer.complete(); // when an observer gets completed, it stops emitting events
          }
          if(count > 3){
            observer.error(new Error('count exceeds 3!')); // error cancels the observer but doesn't complete it
          }
          count++;
        }, 1000);
      }
    );



    // here we are just subscribing to the observable output.
    // this.observableSubscription = customIntervalObservable.subscribe(data => {
      // but here we are first transforming the output from concrete observable and then subscribing it
      this.observableSubscription = customIntervalObservable.pipe(filter(data => {
        return data > 0;
      }), map( (data: number) => {
        return 'Round: ' + (data + 1);
      })).subscribe(data => { // first argument function the data we are getting
        console.log(data);
      }, error => { // second argument function is error
        console.log(error);
        alert(error.message);
      }, () => { // handling when the observable gets completed. Third argument function
        console.log('Completed!')
      }
    );

  }

  ngOnDestroy() {
    this.observableSubscription.unsubscribe();
  }

}
