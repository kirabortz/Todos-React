export type LoginProps = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type LoginName = "password" | "email" | "rememberMe" | "captcha"
