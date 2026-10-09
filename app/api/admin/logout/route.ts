import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return new NextResponse(null,{status:403});
  const response = NextResponse.json({success:true});
  response.cookies.set('naftal_admin','',{httpOnly:true,sameSite:'strict',path:'/',maxAge:0});
  return response;
}
