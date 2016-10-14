/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/*
 * App Component 
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
      './app.scss',
  ],
  template: `

    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
 
    </footer>
  `
})
export class App {

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
