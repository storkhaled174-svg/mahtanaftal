import { NextRequest, NextResponse } from 'next/server';
import serializer from '../../../src/utils/serializer';
import { parseToken, runWithAuth } from '../../../src/backend/action_utils';
import * as HomePage from '../../../src/frontend/actions/HomePage';
import * as CustomerLogin from '../../../src/frontend/actions/CustomerLogin';
import * as CustomerRegister from '../../../src/frontend/actions/CustomerRegister';
import * as OrderTracking from '../../../src/frontend/actions/OrderTracking';
import * as AdminLogin from '../../../src/backend/actions/AdminLogin';
import * as AdminRegister from '../../../src/backend/actions/AdminRegister';
import * as AdminDashboard from '../../../src/backend/actions/AdminDashboard';
import * as AdminStockManagement from '../../../src/backend/actions/AdminStockManagement';
import * as AdminContentSupport from '../../../src/backend/actions/AdminContentSupport';

export const runtime = 'nodejs';
const modules: Record<string, Record<string, Function>> = {
  'src.frontend.actions.HomePage': HomePage,
  'src.frontend.actions.CustomerLogin': CustomerLogin,
  'src.frontend.actions.CustomerRegister': CustomerRegister,
  'src.frontend.actions.OrderTracking': OrderTracking,
  'src.backend.actions.AdminLogin': AdminLogin,
  'src.backend.actions.AdminRegister': AdminRegister,
  'src.backend.actions.AdminDashboard': AdminDashboard,
  'src.backend.actions.AdminStockManagement': AdminStockManagement,
  'src.backend.actions.AdminContentSupport': AdminContentSupport,
};
export async function POST(request: NextRequest) {
  const headers = { 'Cache-Control': 'no-store' };
  try {
    // Only the website origin may use the session cookie.
    const origin = request.headers.get('origin');
    if (origin && origin !== request.nextUrl.origin) return NextResponse.json({error: 'غير مصرح'}, {status:403, headers});
    const { actionName, args } = await request.json();
    if (typeof actionName !== 'string') throw new Error('طلب غير صالح');
    const separator = actionName.lastIndexOf('.');
    const moduleName = actionName.slice(0, separator);
    const functionName = actionName.slice(separator + 1);
    const mod = modules[moduleName];
    const fn = mod && Object.hasOwn(mod, functionName) ? mod[functionName] : null;
    if (typeof fn !== 'function') return NextResponse.json({error: 'غير موجود'}, {status:404, headers});
    const bearer = request.headers.get('authorization')?.replace(/^Bearer /, '');
    const token = bearer || request.cookies.get('naftal_admin')?.value;
    const identity = token ? await parseToken(token) : null;
    const adminAction = moduleName.startsWith('src.backend.') && actionName !== 'src.backend.actions.AdminLogin.loginAdmin';
    if (adminAction && !identity) return NextResponse.json({error:'يرجى تسجيل الدخول'}, {status:401, headers});
    if (adminAction && identity?.role !== 'ADMIN') return NextResponse.json({error:'هذه الخدمة مخصصة للمشرف فقط'}, {status:403, headers});
    const decodedArgs = serializer.deserialize(args);
    if (!Array.isArray(decodedArgs)) throw new Error('طلب غير صالح');
    const result: any = await runWithAuth(identity, () => fn(...decodedArgs));
    const response = NextResponse.json(serializer.serialize(result), {headers});
    if (identity) response.headers.set('X-Auth-Role', identity.role);
    if (actionName === 'src.backend.actions.AdminLogin.loginAdmin') {
      response.cookies.set('naftal_admin', result.token, {httpOnly:true, secure:process.env.NODE_ENV === 'production', sameSite:'strict', path:'/', maxAge:60*60*24*7});
    }
    return response;
  } catch (error: any) {
    const status = error?.statusCode === 401 || error?.statusCode === 403 ? error.statusCode : 400;
    // Do not disclose database errors, credentials or submitted personal data.
    const message = error?.code || /prisma|database|mysql/i.test(error?.message || '')
      ? 'تعذر حفظ البيانات. يرجى المحاولة لاحقاً أو الاتصال بالدعم'
      : error?.message || 'تعذر معالجة الطلب';
    return NextResponse.json({error:message}, {status, headers});
  }
}
