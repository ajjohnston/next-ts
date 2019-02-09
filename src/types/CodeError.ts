export class CodeError extends Error {
  public code: string

  constructor(code: string) {
    super()
    this.code = code
  }
}
