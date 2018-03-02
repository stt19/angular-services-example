import { Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string;
  password: string;
  auth_token: string;
  some_string: string;

    getSecurityServer() {
        return "http://localhost:54321/";
    }

    constructor(private http: Http) { 
        this.getMentorsList();
    }

    // Would normally be in a service file
    getMentorsList() {
        return this.http.get(this.getSecurityServer() + '/api/pathway/mentors')
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
    }

    loginService(body) {
        return this.http.post('http://localhost:54321/auth', body)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json()));
    }


    // Calls the subscription to log in
    login() {
        let body = {
            "username": this.username,
            "password": this.password
        }
        this.loginService(body).subscribe(data => {
            this.auth_token = data['access_token'];
        });
    }

    populateMentorsList() {
        this.getMentorsList().subscribe(data => {
            this.some_string = data['PathwayMentors'];
        });  
    }


}
