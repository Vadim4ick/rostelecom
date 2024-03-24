/* eslint-disable @typescript-eslint/no-unused-vars */
import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  getAuthRouteData,
  parseJwt,
} from '@/lib/utils/api-routes'
import { IUser } from '@/types/user'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { db, validatedTokenResult, token } = await getAuthRouteData(
      clientPromise,
      req,
      false
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    const { password, ...user } = (await findUserByEmail(
      db,
      parseJwt(token as string).email
    )) as unknown as IUser

    return NextResponse.json({
      status: 200,
      message: 'token is valid',
      user,
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
