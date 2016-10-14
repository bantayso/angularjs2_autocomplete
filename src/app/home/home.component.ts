import { Component } from '@angular/core';
import { AppState } from '../app.service';
import {TypeaheadMatch} from 'ng2-bootstrap/ng2-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
@Component({
  selector: 'home',
  providers: [

  ],
  styleUrls: [ './home.style.css' ],

  templateUrl: './home.template.html'
})
export class Home {
 public selected:string = '';
  public dataSource:Observable<any>;
   public asyncSelected:string = '';
   person :any={
     name:"",
     address:"",
     phone:"",
     Gender:"",
     email:""
   };
public persons:Array<any> = [
  {name:"Steve",address:"Washinton DC",phone:"01648584762",Gender:"Female",email:"steve@gmail.com"},
  {name:"John",address:"New York",phone:"0164854256",Gender:"Male",email:"John@gmail.com"},
  {name:"Mecury",address:"Canada",phone:"01855484762",Gender:"Female",email:"Mecury@gmail.com"},
  {name:"Lothar",address:"Alaska",phone:"01644458762",Gender:"Female",email:"Lothar@gmail.com"},
  {name:"Aba",address:"California",phone:"01547622589",Gender:"Female",email:"Aba@gmail.com"},
  {name:"Phoenix",address:"Maryland",phone:"07741258687",Gender:"Male",email:"Phoenix@gmail.com"},
  {name:"Mac",address:"Oregon",phone:"0215728652",Gender:"Male",email:"Mac@gmail.com"},
  {name:"Jonny",address:" Virginia",phone:"01248756581",Gender:"Male",email:"Jonny@gmail.com"},
  {name:"Euler",address:"Texas",phone:"015547895",Gender:"Male",email:"Euler@gmail.com"},
  {name:"Kata",address:"Wyoming",phone:"013554796",Gender:"Male",email:"Kata@gmail.com"}
]
  constructor(public appState: AppState) {
 this.dataSource = Observable.create((observer:any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).mergeMap((token:string) => this.getStatesAsObservable(token));
  }

  ngOnInit() {
  }

   public getStatesAsObservable(token:string):Observable<any> {
    let query = new RegExp(token, 'ig');
 
    return Observable.of(
      this.persons.filter((state:any) => {
        return query.test(state.name);
      })
    );
  }
 
  public typeaheadOnSelect(e:any):void {
    this.person = e.item;
    console.log('Selected value: ', e.item);
  }
}
