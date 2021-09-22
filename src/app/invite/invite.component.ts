import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { InviteService, User } from '../service/invite.service';
import { ErrorTypes } from '../shared/models/error-types';

const users: User[] = [
  { email: 'user0@comtravo.com' },
  { email: 'user1@comtravo.com' },
  { email: 'user2@comtravo.com' },
  { email: 'user3@comtravo.com' },
  { email: 'user4@comtravo.com' },
  { email: 'user5@comtravo.com' },
  { email: 'user6@comtravo.com' },
  { email: 'user7@comtravo.com' },
  { email: 'user8@comtravo.com' },
  { email: 'user9@comtravo.com' },
  { email: 'user10@comtravo.com' }
];

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  public isProcessing$ = new BehaviorSubject(false);
  constructor(private readonly router: Router, private inviteService: InviteService) { }

  ngOnInit(): void {
    console.log(users);
  }

  onSubmit(): void {
    this.inviteService.existsEmail = [];
    this.inviteService.internalError = [];
    this.inviteService.successfulInvitation = 0;

    alert('Invite users');
    this.isProcessing$.next(true);
    let successInvitation: number = 0;
    let alreadyExists: string[] = [];
    let internalError: string[] = [];
    from(users).pipe(
      concatMap((user) => this.inviteService.invite(user).pipe(
        catchError((error) => {
          if (error.status === ErrorTypes.AlreadyExists) {
            alreadyExists.push(` _${user.email}_`);
          } else if (error.status === ErrorTypes.InternalServer) {
            internalError.push(` _${user.email}_`);
          }
          console.log(error.status);
          return of(null);
        })
      )
      ),
    )
      .subscribe(
        (res) => {
          console.warn(res);
          if (res !== null) {
            successInvitation = successInvitation + 1;
          }
        },
        (error) => console.log(error),
        () => {
          this.isProcessing$.next(false);
          this.inviteService.existsEmail.push(...alreadyExists);
          this.inviteService.internalError.push(...internalError);
          this.inviteService.successfulInvitation = successInvitation;
          this.router.navigate(['list']);
        }
      )
  }

}

