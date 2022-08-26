export class AppConstants {
    public static get baseServer(): string { return 'http://localhost:8080'}
    public static get baseLogin(): string { return this.baseServer + '/login'}
    public static get baseURL(): string { return this.baseServer + '/api/user'}
}