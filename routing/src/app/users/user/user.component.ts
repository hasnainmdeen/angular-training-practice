import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'], // accessing the id received in url
      name: this.route.snapshot.params['name']
    };

// To dynamically reflect the changes in URL, we subscribe to params which is an observable and reflects the
// changes. Without this if we ask angular to reload the same component with different params, it doesn't do
// this since by default it won't dynaimally react to new params in URL
    this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )

    // angular destroys the above subscription on destroying the component. Otherwise the subscription will
    // reside in memory. We can also do this manually though it won't make any impact. Example below
    // this.paramSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.user.id = params['id'];
    //     this.user.name = params['name'];
    //   }
    // )

  }


  // ngOnDestroy() {
  //   this.paramSubscription.unsubscribe();
  // }

}
