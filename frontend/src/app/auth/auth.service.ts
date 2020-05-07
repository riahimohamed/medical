import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { User } from '../models/user';
import { TokenReponse } from '../models/tokenReponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:3000/users';
  token: string;

  constructor(private http: HttpClient, private router: Router) { }

  saveToken(token: string): void{
  	localStorage.setItem('userToken', token);
  	this.token = token;
  }

  getToken(): string{
  	if(!this.token){
  		this.token = localStorage.getItem('userToken')
  	}
  	return this.token;
  }

  getUserDetails(): User{
  	const token = this.getToken();
  	let payload;
  	if(token){
  		payload = token.split('.')[1];
  		payload = window.atob(payload);
  		return JSON.parse(payload);
  	}else{
  		return null;
  	}
  }

  isLoggedIn(): boolean{
  	const user = this.getUserDetails();

  	if(user){
  		return user.exp > Date.now() /1000;
  	}else{
  		return false;
  	}
  }

  register(user: User): Observable<any>{
  	const base = this.http.post(this.BASE_URL + '/register', user);

  	const request = base.pipe(
	  		map((data: TokenReponse) => {

	  			if(data.token){
	  				this.saveToken(data.token);
	  			}
	  			return data;
	  		})
  		)
  	return request;
  }

  login(user: User): Observable<any>{
  	const base = this.http.post(this.BASE_URL + '/login', user);

  	const request = base.pipe(
	  		map((data: TokenReponse) => {
	  			if(data.token){
	  				this.saveToken(data.token);
	  			}
	  			return data;
	  		})
  		)
  	return request;
  }

  getProfile(user: User): Observable<any>{
  	return this.http.get(this.BASE_URL+ '/profile', {
  		headers: {Authorization: `${this.getToken()}`}
  	})
  }

  logout(): void{
  	this.token = '';
  	window.localStorage.removeItem('userToken');
  	this.router.navigateByUrl('/');
  }

}
