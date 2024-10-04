export type userType = { first_name: string, last_name: string, id: number, active_subscription?: any, profile_photo_url?: any}
export type tokenType = string|null

export interface AuthState {
    user: userType | {};
    loggedIn: boolean,
    authToken: tokenType;
}
