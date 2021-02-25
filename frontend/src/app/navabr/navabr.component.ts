import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {MatDialogConfig, MatDialog,  MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navabr',
  templateUrl: './navabr.component.html',
  styleUrls: ['./navabr.component.css']
})
export class NavabrComponent implements OnInit {

  userIsAuthenticated: boolean = false;
  private _authListenerSubs: Subscription;
  linkDisable = true;

  constructor(private router: Router,public dialog: MatDialog, private authService: AuthService,
             ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this._authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onRegiterDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(SignupComponent, dialogConfig);
  }

  onLoginDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(SigninComponent, dialogConfig);
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this._authListenerSubs.unsubscribe();
  }

}
