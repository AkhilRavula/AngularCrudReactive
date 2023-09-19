/* eslint-disable @typescript-eslint/no-array-constructor */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, AbstractControlOptions, FormArray } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { employeeservice } from './employee.service';
import { Iemployee } from './IEMPLOYEE';
import { ISkill } from './ISKILL';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalErrorHandlerService } from '../Services/global-error-handler.service';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{

  employeeForm!: FormGroup
  empid!: number
  employee! : Iemployee
  DeleteSkillIds = new Array();
  errorMessage: string;
  loading = false;

  constructor(private fb: FormBuilder,private _router : Router,
    private _activatedroute: ActivatedRoute, private _employeeservice: employeeservice,
    private toaster : ToastrService,
    private errhandler : GlobalErrorHandlerService,private auth:AuthServiceService) {

  }

  ValidationMessages = {
    'fullname': {
      'required': 'fullname field is required',
      'minlength': 'minlength should be atleast 2',
      'maxlength': 'maxlength should be 10'
    },
    'email': {
      'required': 'email is a required filed',
      'CustomEmailValidator': 'email domain should be yahoo.com'
    },
    'confirmemail': {
      'required': 'confirm email is required'
    },
    'emailGroup': {
      'emailMisMatch': 'confirm-mail & mail doesnt match'
    }
  }

  formErrors = {
    'fullname': '',
    'email': '',
    'confirmemail': '',
    'emailGroup': ''
  }



  ngOnInit() {


    this.auth.isAuthenticated();

    this.employeeForm = this.fb.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
        emailGroup: this.fb.group({
          email: ['', [Validators.required, CustomEmailValidator]],
          confirmemail: ['', Validators.required]
        }, { validators: matchEmails } as AbstractControlOptions),
        skills: this.fb.array([
          this.addSkillsGroup()
        ])
      });

    this.employeeForm.valueChanges.subscribe(
      {
        next: (data) => {
          this.CheckValidation(this.employeeForm);
          console.log(this.formErrors);
        }
      }
    )

    this._activatedroute.paramMap.subscribe(
      (url) => {

        this.empid = Number(url.get('id'));
        if (this.empid) {
          this.getemployee(this.empid);
        }
        else
        {
          this.employee = {
            id : null!,
            fullname : '',
            email : '',
            confirmemail : '',
            skills : []
          }
        }

      }
    )

  }

  getemployee(empid: number) {

    //Implemented route resolver
    this._activatedroute.data.subscribe(
      {
        next: (data: Iemployee) => {
          console.log(data['empresol']);
          this.employeebind(data['empresol']);
          this.employee = data['empresol'];
        }
      }
    );

    // this._employeeservice.GetEmployee(empid).subscribe(
    //   {
    //     next: (employee: Iemployee) => {
    //       console.log(employee);
    //       this.employeebind(employee);
    //       this.employee = employee;
    //     },
    //     error: (err) =>
    //     {
    //       console.log(err);
    //       this.toaster.error(err);
    //     }
    //   }
    // )

  }

  employeebind(employee: Iemployee) {
    this.employeeForm.patchValue(
      {
        fullname: employee.fullname,
        emailGroup: {
          email: employee.email,
          confirmemail: employee.confirmemail
        }
      }
    );

    this.employeeForm.setControl('skills', this.setSkills(employee.skills));
  }

  setSkills(skillsarray: ISkill[]): FormArray {
    const formArray = new FormArray<any>([]);
    skillsarray.forEach(s => {
      formArray.push(
        this.fb.group({
        skillname: [s.skillname, Validators.required], experience: s.experience,
        proficiency: s.proficiency,skillId : s.skillId
      }));
    })

    return formArray;
  }


  RemoveSkill(skillIndex: number): void {

    //(this.employeeForm.get('skills') as FormArray).removeAt(skillIndex);

    const skillformarray = (this.employeeForm.get('skills') as FormArray);
    const skilllid = skillformarray.value[skillIndex].skillId;
    skillformarray.removeAt(skillIndex);
    skillformarray.markAsDirty;
    skillformarray.markAsTouched;

    if(skilllid){
      this.DeleteSkillIds.push(skilllid);
    //this._employeeservice.deleteSkill(skilllid).subscribe();
    }

  }
  getControls() {
    return (this.employeeForm.get('skills') as FormArray).controls;
  }

  addSkillsGroup(): FormGroup {
    return this.fb.group({
      skillname: ['', Validators.required],
      experience: [''],
      proficiency: ['begineer'],
      skillId : []
    })
  }

  AddSkills(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillsGroup());
  }
  LoadData() {
    this.employeeForm.setValue(
      {
        fullname: "Akhil",
        emailGroup: {
          email: "ravula@123",
          confirmemail: ''
        },
        skills: {
          skillname: 'c#',
          experience: 5, proficiency: 'Advanced'
        }
      });
    // this.CheckValidation(this.employeeForm);
    // console.log(this.formErrors);
  }


  CheckValidation(group: FormGroup = this.employeeForm) {

    Object.keys(group.controls).forEach((key: string) => {
      const abstractcntrl = group.get(key);

      this.formErrors[key as keyof typeof this.formErrors] = '';
      if (abstractcntrl && !abstractcntrl.valid && (abstractcntrl.touched ||
        abstractcntrl.dirty || abstractcntrl.value != '')) {
        const validationmsgs = this.ValidationMessages[key as keyof typeof this.ValidationMessages];

        for (const errorkey in abstractcntrl.errors) {
          this.formErrors[key as keyof typeof this.formErrors] += validationmsgs[errorkey as keyof typeof validationmsgs] + ' ';

        }
      }


      if (abstractcntrl instanceof FormGroup) {
        this.CheckValidation(abstractcntrl);
      }

      if (abstractcntrl instanceof FormArray) {
        for (const cntrl of abstractcntrl.controls) {
          if (cntrl instanceof FormGroup) {
            this.CheckValidation(cntrl);
          }
        }
      }
    });
  }

  onSubmit() {
    //console.log(this.employeeForm);
    this.MapEmployee();
    if(this.employee.id)
    {

    this.DeleteSkillIds.forEach(skillid=>
      {
        this._employeeservice.deleteSkill(skillid).subscribe();
      });

    this._employeeservice.UpdateEmployee(this.employee).subscribe(
       ()=>{
        this.employeeForm.markAsPristine();
        this._router.navigate(['employees/List'])}
        );

    }
    else
    {
       this._employeeservice.AddEmployee(this.employee).subscribe(
        {
          next :(emp:Iemployee)=>
          {
            this.employeeForm.markAsPristine();
            console.log(emp);
            this._router.navigate(['employees/List']);
          },
          error : (err:HttpErrorResponse)=>
          {
            console.log(err);
            this.errhandler.handleError(err);
            this.errorMessage = err.error ? err.message : err.statusText;
            this.toaster.error(this.errorMessage + ' Login as a ADMIN','',{timeOut:4000});
          }
        }
       );
    }
  }

  MapEmployee()
  {
    this.employee.fullname = this.employeeForm.value.fullname;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.confirmemail = this.employeeForm.value.emailGroup.confirmemail;
    this.employee.skills =  this.employeeForm.value.skills;
  }

  canExit() : boolean {
    if(this.employeeForm.dirty)
    {
    if (confirm("There are Unsaved Changes.Do you want to discard changes?")) {
        return true
      } else {
        return false
      }
    }
    else
      return true
  }
}

function CustomEmailValidator(control: AbstractControl): { [key: string]: any } | null {
  const email = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);

  if (domain.toLowerCase() == 'yahoo.com' || email == '') {
    return null;
  }
  else {
    return { 'CustomEmailValidator': true };
  }
}


function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailcontrol = group.get('email');
  const confirmemailcontrol = group.get('confirmemail');

  if (emailcontrol?.value == confirmemailcontrol?.value || (confirmemailcontrol?.pristine)) {
    return null;
  }
  else {
    return { 'emailMisMatch': true };
  }
}
