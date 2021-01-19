import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { RootState } from '@app/store';
import { JobPostingTab } from '@app/job-posting/models/job-posting-routing.path';

@Component({
  selector: 'app-job-posting-landing',
  templateUrl: './job-posting-landing.component.html',
  styleUrls: ['./job-posting-landing.component.scss']
})
export class JobPostingLandingComponent implements OnInit {
  public jobPostingTab = JobPostingTab;

  constructor(
    public readonly store$: Store<RootState>
  ) {}

  public ngOnInit(): void {
  }

}
