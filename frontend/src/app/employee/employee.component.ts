import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

declare var M : any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor( public employeeService: EmployeeService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
    if (form) form.reset();
    this.employeeService.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: null,
    };
  }

   data:any;
  refreshEmployeeList() {
    console.log('Fetching all records');
    this.employeeService.getEmployeeList().subscribe((res) => {
      console.log(res);
       this.data = res;
      this.employeeService.employees = this.data.users;
      
    });
  }


  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      console.log('creating new record');

      this.employeeService.postEmployee(form.value).subscribe((res) => {
        console.log('new record is: ', res);
        this.resetForm(form);
        this.refreshEmployeeList();
        // M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    } else {
      try {
        console.log('upating record');
        this.employeeService.putEmployee(form.value).subscribe((res) => {
          console.log('updated record is :', res);
          this.resetForm(form);
          this.refreshEmployeeList();
          // M.toast({ html: 'Updated successfully', classes: 'rounded' });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    Swal.fire({
      title: 'Are you sureeeeee to delete this record ?',
      icon: 'info',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('yes');
        this.employeeService.deleteEmployee(_id).subscribe((res) => {
          console.log('deleted record is: ', res);
          this.refreshEmployeeList();
          this.resetForm(form);
        });
        Swal.fire('Selectd Record is Deleted!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Selectd Record is Not Deleted', '', 'info');
        console.log('no');
      }
    });
  }

}
