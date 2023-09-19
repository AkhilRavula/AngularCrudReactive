import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILogin } from '../Models/ILogin';
import { AuthServiceService } from '../auth-service.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  Registerform : FormGroup;
  Login : ILogin;
  constructor(private fb : FormBuilder,private toastr: ToastrService
    ,private router : Router,private authservice : AuthServiceService)
  {

  }

  ngOnInit(): void {
    this.Registerform = this.fb.group(
      {
        Username : ['',Validators.required],
        Password : ['',Validators.required]
      }
    )
  }

  get Username()
  {
    return this.Registerform.get('Username') as FormControl;
  }

  get Password()
  {
    return this.Registerform.get('Password') as FormControl;
  }

  onSubmit()
  {
    this.MapObjects();
    console.log(this.Login);
    this.authservice.AuthenticateUser(this.Login).subscribe(
      {
        next : (data)=>
        {
          localStorage.setItem('Username',data.username);
          localStorage.setItem('Token',data.token);
          this.toastr.success('Login Successfull','',{
            timeOut:4000
          });
          this.router.navigate(['/Home']);
        },
        error : (err)=>this.toastr.error(err,'',{
          timeOut:4000
        })
      }
    )

  }

   MapObjects() {
    this.Login = {
      Username : this.Username.value,
      Password : this.Password.value
    }
  }
}


