import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRegister } from '../Models/IRegister';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.css']
})
export class LoginEmployeeComponent implements OnInit {
    Loginform : FormGroup;
    Register : IRegister;


    constructor(private fb : FormBuilder,private toastr: ToastrService,
      private router : Router,private authservice : AuthServiceService)
    {

    }
  ngOnInit(): void {
    this.Loginform = this.fb.group({
      Username : ['',Validators.required],
      Password : ['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword : ['',[Validators.required]],
      Role : ['',[Validators.required]]
    },
    {validators : PasswordValidator} as AbstractControlOptions)
  }

    get Username()
    {
      return this.Loginform.get('Username') as FormControl
    }

    get Password()
    {
      return this.Loginform.get('Password') as FormControl
    }

    get ConfirmPassword()
    {
      return this.Loginform.get('ConfirmPassword') as FormControl
    }

    get Role()
    {
      return this.Loginform.get('Role') as FormControl
    }

    onSubmit() : void
    {
         this.MaptoRegisterObject();
         console.log(this.Register);
         this.authservice.RegisterUser();
         this.toastr.success('Registeration Successfull Login to Continue','',{
          timeOut:5000
        });
        this.router.navigate(['/Login'])
    }


    MaptoRegisterObject()
    {
          this.Register = {
            Username : this.Username.value,
            Password : this.Password.value,
            ConfirmPassword : this.ConfirmPassword.value,
            Role : this.Role.value
          }
    }

}


function PasswordValidator(fg : AbstractControl): { [key: string]: any } | null
{
  if(fg.get('ConfirmPassword').dirty)
  {
  const error =
  fg.get('Password')?.value != fg.get('ConfirmPassword')?.value ? { passwordmismatch: true } : null;
  fg.get('ConfirmPassword').setErrors(error);
   return error;
  }
  else
  {
    return null;
  }
}



