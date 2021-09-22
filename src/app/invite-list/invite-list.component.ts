import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InviteService, User } from '../service/invite.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {
  users$: Observable<User[]>;
  existsEmail: string[] = [];
  internalError: string [] = [];
  successfulInvitation: number = 0;

  constructor(private inviteService: InviteService) {
    this.users$ = this.inviteService.get();
    this.existsEmail = this.inviteService.existsEmail;
    this.internalError = this.inviteService.internalError;
    this.successfulInvitation = this.inviteService.successfulInvitation;
  }

  ngOnInit(): void {}
}
