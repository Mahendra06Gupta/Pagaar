export enum JobPostingTab {
    JOB_POSTING = 'job-posting',
    ALL_JOB_POSTING_LIST = 'job-posting-list'
}

export const EmployeeProfileRoutingPath = {
    profile: ':userId',
    jobPosting: `:userId/${JobPostingTab.JOB_POSTING}`,
    jobPostingList: `:userId/${JobPostingTab.ALL_JOB_POSTING_LIST}`
};
