import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {SnackErrorAuthService} from "../../services/errors/snack-error-auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  user!:User;
  constructor(private authService: AuthService,
              private loginErrorSnack: SnackErrorAuthService,
              private formB: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.formB.group(
      {
        username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    )
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  login() {
    this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value).subscribe(par => {
      localStorage.setItem('a_token', par.access_token);
      localStorage.setItem('r_token', par.refresh_token);
      if (this.authService.tokenIsNotExpired(par.access_token)) {
        this.loginErrorSnack.successLogin('Success!');
        this.getUserByUsername(this.form.get('username')?.value);
        this.router.navigateByUrl("/");
      } else {
        this.form.reset();
        this.loginErrorSnack.errorLogin();
      }
    }, error => {
      if (error.status == 401) {
        this.loginErrorSnack.errorLogin();
      }
    });
  }
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
  async getUserByUsername(username: string) {
    this.userService.getUserDataByUsername(username).subscribe(user => {
      this.user=user;
    });
  }
}
