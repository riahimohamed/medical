import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
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

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth:AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login(){
  	this.auth.login(this.user).subscribe(() => {
  		this.router.navigateByUrl('/profile');
  	},
  	err => {
  		console.error(err);
  	})
  }

}
