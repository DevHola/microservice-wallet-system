// eslint-disable-next-line @typescript-eslint/no-unused-vars
export {}
declare global {
  namespace Express {
    export interface User {
      user?: {
        user_id?: string
        name?: string
        email: string
        usertype?: number
      }
    }
  }
}
