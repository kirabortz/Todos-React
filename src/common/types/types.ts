export type ActionTypeForTest<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

export type ResponseProps<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors?: FieldErrorProps[]
  data: D
}
type FieldErrorProps = {
  error: string
  field: string
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type NetworkErrorType = string | null
export type FilterValuesType = "all" | "active" | "completed"
