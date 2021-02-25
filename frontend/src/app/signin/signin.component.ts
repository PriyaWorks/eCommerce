import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from "@angular/forms";
import { AuthService } from '../services/auth.service'
import { SignIn } from '../model/signin.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userModel:SignIn = {
    email:'',
    password: ''
  };
  constructor(public dialogBox: MatDialogRef<SigninComponent>,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(userForm : NgForm){
    if(userForm.invalid){ return; }
    
    this.authService.userLogin(userForm.value);
    userForm.resetForm();
    this.onClose();
  }

  onClose() {
    this.dialogBox.close();
  }
}
