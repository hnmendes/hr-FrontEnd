import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { People } from './model/people';

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {

  constructor(private httpClient : HttpClient) { }
  
  protected urlPeopleAPI: string = "https://localhost:5001/api/people";

  //GET - Get All Employees  
  getPeoples() : Observable<People[]>{
    return this.httpClient.get<People[]>(this.urlPeopleAPI);
  }

  //GET - Get Employee by ID
  getPeopleById(id: string) : Observable<People>{
    return this.httpClient.get<People>(this.urlPeopleAPI + "/" + id);
  }

  //POST - Add a new Employee
  registerPeople(people: People) : Observable<People> {
    return this.httpClient.post<People>(this.urlPeopleAPI, people);
  }

  //PUT - Edit an Employee
  editPeople(people: People) : Observable<People> {    
    return this.httpClient.put<People>(this.urlPeopleAPI + "/" + people.id, people);
  }

  //DELETE - Delete an Employee
  removePeople(people: People): Observable<People>{
    return this.httpClient.delete<People>(this.urlPeopleAPI + "/" + people.id);
  }
  
}
