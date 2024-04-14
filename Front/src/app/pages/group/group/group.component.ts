import { Component } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  groups: any[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe((data: any[]) => {
      this.groups = data;
    });
  }

}