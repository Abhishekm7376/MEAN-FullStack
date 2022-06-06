import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees : Employee[];

  constructor(private http: HttpClient) { }

   //HttpMethods
   postEmployee(emp: Employee){
    return this.http.post(environment.apiBaseUrl + '/employee', emp);
  }

  getEmployeeList(){
    return this.http.get(environment.apiBaseUrl + '/employee');
  }

  putEmployee(emp: Employee){
    console.log(environment.apiBaseUrl + `/${emp._id}`);
    return this.http.put(environment.apiBaseUrl + '/employee' +  `/${emp._id}`, emp);
  }
  


  deleteEmployee(_id: any){
    return this.http.delete(environment.apiBaseUrl + '/employee' + `/${_id}`);
  }

}
