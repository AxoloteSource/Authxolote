export enum ApisEnum {
  BaseUrl = import.meta.env.VITE_APP_URL || '/api',
  BaseLogin = import.meta.env.VITE_AUTH_URL || '/auth'
}
