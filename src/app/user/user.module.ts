import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserRouterModule } from './user/user.routing';
import {  MatCardModule, MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UserRouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [UserComponent, UserDialogComponent],
  providers: [UserService],
  entryComponents: [UserDialogComponent]
})
export class UserModule { }
