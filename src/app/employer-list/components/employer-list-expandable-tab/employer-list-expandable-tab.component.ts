import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store/models/root-state.model';
import { EmployersDetail } from '@app/employer-profile/models/employer-detail.model';

@Component({
  selector: 'app-employer-list-expandable-tab',
  templateUrl: './employer-list-expandable-tab.component.html',
  styleUrls: ['./employer-list-expandable-tab.component.scss']
})
export class EmployerListExpandableTabComponent implements OnInit {

  @Input() public employerList: EmployersDetail[];
  @Output() public pageChange = new EventEmitter<any>();
  public loader = true;
  public isDescendingByDate = true;

  constructor(
    public readonly store$: Store<RootState>
  ) { }

  public ngOnInit(): void {
    setTimeout(() => this.loader = false, 200);
  }

  // public onPageChange(event): any {
  //   this.pageChange.emit(event);
  // }

}
