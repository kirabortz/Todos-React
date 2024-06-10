import { instance } from "common/instance/instance"

export const AuthApi = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string | undefined) {
    return instance.post(`auth/login`, { email: email, password: password, rememberMe: rememberMe, captcha: captcha })
  },
  logout() {
    return instance.delete(`auth/login`)
  },
  getCaptcha() {
    return instance.get(`security/get-captcha-url`)
  },
}
