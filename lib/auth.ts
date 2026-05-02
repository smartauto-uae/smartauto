import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'change-this-secret-min-32-chars!!'
)

export async function verifySession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}