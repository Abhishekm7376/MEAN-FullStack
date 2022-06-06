import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  constructor(private userService: UserService, private router: Router) { }
userData:any;
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userData = res;
        
        this.userDetails = this.userData.user;
        console.log('data',this.userDetails.fullName);
        
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}