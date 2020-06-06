import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  user: User;

  loginForm: FormGroup;

  constructor(private auth:AuthService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('riahi@gmail.com'),
      password: new FormControl('0000')
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
  	this.auth.login(this.loginForm.value).subscribe(res => {
      //console.log(res);
  		this.router.navigate(['/profile']);
  	},
  	err => {
  		console.error(err);
      //this.router.navigate(['/profile']);
  	})
  }

}
