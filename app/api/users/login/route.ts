import clientPromise from '@/lib/mongodb'
import {
  createUserAndGenerateTokens,
  findUserByEmail,
  getDbAndReqBody,
} from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

  const user = await findUserByEmail(db, reqBody.email)

  if (!user) {
    return NextResponse.json({
      warningMessage: 'Пользователя не существует',
    })
  }

  if (!bcrypt.compareSync(reqBody.password, user.password)) {
    return NextResponse.json({
      warningMessage: 'Неправильный логин или пароль',
    })
  }

  const tokens = await createUserAndGenerateTokens(db, reqBody)

  return NextResponse.json(tokens)
}
