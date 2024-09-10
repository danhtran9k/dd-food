import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  // https://github.com/vercel/next.js/issues/55960
  // tags là string[] hay chỉ string
  revalidateTag(tag ?? '')
  return Response.json({ revalidated: true, now: Date.now() })
}
