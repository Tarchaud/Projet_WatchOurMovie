import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groups: any[] = [];
  expandedGroupId: string | null = null;
  userNames: { [key: string]: string } = {};

  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUserGroups();
  }

  loadUserGroups(): void {
    const user = this.authService.currentUserValue;
    if (user && user.id) {
      this.groupService.getGroupsByUserId(user.id).subscribe(
        (groups) => {
          this.groups = groups;
          groups.forEach((group: any) => {
            group.user_ids.forEach((userId: string) => {
              this.authService.getUserById(userId).subscribe((user: any) => {
                this.userNames[userId] = user.username;
              });
            });
          });
        },
        (error) => {
          console.error('Error fetching groups', error);
        }
      );
    } else {
      console.error('No user ID found for fetching groups');
    }
  }

  createGroup(groupName: string): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.groupService.createGroup(groupName, user.id).subscribe(
        (group) => {
          this.groups.push(group);
        },
        (error) => {
          console.error('Error creating group', error);
        }
      );
    } else {
      console.error('User not logged in');
    }
  }

  toggleGroup(groupId: string): void {
    this.expandedGroupId = this.expandedGroupId === groupId ? null : groupId;
  }

  addUserToGroup(userId: string, groupId: string): void {

  }

  removeUserFromGroup(userId: string, groupId: string): void {

  }
}
