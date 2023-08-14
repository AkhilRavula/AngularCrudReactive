import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, AbstractControlOptions, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { employeeservice } from './employee.service';
import { Iemployee } from './IEMPLOYEE';
import { ISkill } from './ISKILL';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  employeeForm!: FormGroup
  empid! : number
  constructor(private fb: FormBuilder,
    private _activatedroute : ActivatedRoute,private _employeeservice : employeeservice) {

  };

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



    // this.employeeForm = new FormGroup(
    // {
    //   fullname : new FormControl(),
    //   email : new FormControl(),

    //   skills : new FormGroup(
    //     {
    //      skillName : new FormControl(),
    //       experience : new FormControl(),
    //       proficiency : new FormControl()
    //     }
    //   )
    // });
      this._activatedroute.paramMap.subscribe(
        (url) => 
        {

          this.empid= Number(url.get('id'));
          if(this.empid)
          {
            this.getemployee(this.empid);
          }

        }
      )
    
  }

  getemployee(empid : number)
  {
      this._employeeservice.GetEmployee(empid).subscribe(
        {
          next : (employee:Iemployee)=>this.employeebind(employee),
          error : (err) => console.log(err)
        }
      )
  }

  employeebind(employee : Iemployee)
  {
     this.employeeForm.patchValue(
      {
        fullname : employee.fullname,
        emailGroup : {
          email : employee.email,
          confirmemail : employee.confirmemail
        }
      }
     );

     this.employeeForm.setControl('skills',this.setSkills(employee.skills));
  }

  setSkills(skillsarray : ISkill[]) :FormArray
  {
        const formArray =  new FormArray<any>([]);
        skillsarray.forEach(s=>{
        formArray.push(this.fb.group({ skillName : s.skillName,experience : s.experience,
          proficiency : s.proficiency }));
      })

      return formArray;
  }


  RemoveSkill(skillIndex: number): void {

    //(this.employeeForm.get('skills') as FormArray).removeAt(skillIndex);
    
    const skillformarray =  (this.employeeForm.get('skills') as FormArray);

    skillformarray.removeAt(skillIndex);
    skillformarray.markAsDirty;
    skillformarray.markAsTouched;

  }
  getControls() {
    return (this.employeeForm.get('skills') as FormArray).controls;
  }

  addSkillsGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: [''],
      proficiency: ['begineer']
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
          skillName: 'c#',
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

        for (var errorkey in abstractcntrl.errors) {
          this.formErrors[key as keyof typeof this.formErrors] += validationmsgs[errorkey as keyof typeof validationmsgs] + ' ';

        }      }


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
    console.log(this.employeeForm);
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