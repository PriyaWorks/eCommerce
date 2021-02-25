import { Component, OnInit } from '@angular/core';
import { User } from '../model/signup.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from "@angular/forms";
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userModel:User = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'select'
  };
  userTypes = ['User','Admin'];

  userTypeHasError = true;
  // msg: string = null;

  submitted = false;
  isLoading = false;

  validateUserType(value : any){
    if(value === 'select'){
      this.userTypeHasError = true;
    } else {
      this.userTypeHasError = false;
    }
  }
  constructor(public dialogBox: MatDialogRef<SignupComponent>,
    private formBuilder:FormBuilder, private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(userForm: NgForm){
  
    // stop here if form is invalid
    if (userForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.authService.createUser(userForm.value).subscribe(res => {
      this.router.navigate(["/products"]);      
    });
    console.log(userForm.value);
    this.onClose();
  }

  onClose() {
    this.dialogBox.close();
  }

}
