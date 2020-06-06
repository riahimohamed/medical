import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
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

  registerForm: FormGroup;

  constructor(private auth:AuthService, 
              private router: Router) {

    this.registerForm = new FormGroup({
      fullName: new FormControl('Raihi'),
      birth_day: new FormControl('27/10/1989'),
      email: new FormControl('riahi@gmail.com'),
      password: new FormControl('0000')
    });
  }

  ngOnInit(): void {
  }

  register(){
  	this.auth.register(this.registerForm.value).subscribe((res) => {
        this.registerForm.reset()
  		  this.router.navigate(['/login'])
        console.log('Success '+ res)
  	},
    error => {
      console.log('Erreur '+ error);
      this.router.navigate(['/']);
    }
    );
  }

}
