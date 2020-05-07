import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;

  registerForm = new FormGroup({
  	fullName: new FormControl(),
  	birth_day: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth:AuthService, 
              private router: Router) { }

  ngOnInit(): void {
  }

  register(){
  	this.auth.register(this.user).subscribe(() => {
  		this.router.navigateByUrl('/profile')
  	},
  	 err => {
  	 	console.error(err);
  	 })
  }

}
