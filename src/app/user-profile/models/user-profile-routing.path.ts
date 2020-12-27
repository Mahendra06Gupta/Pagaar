export enum UserProfileTab {
    USER_PROFILE_ABOUT_ME = 'aboutme',
    USER_PROFILE_RESUME = 'resume'
}

export const UserProfileRoutingPath = {
    userProfile: ':userId',
    aboutMe: `:userId/${UserProfileTab.USER_PROFILE_ABOUT_ME}`,
    resume: `:userId/${UserProfileTab.USER_PROFILE_RESUME}`
};
