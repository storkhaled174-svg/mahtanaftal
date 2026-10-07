'use server';

import prisma from '@/tools/prisma';
import {
  UnauthorizedError,
  hashPassword,
  signToken,
  withResult,
} from '@/frontend/action_utils';
import { LoginInput, LoginResult, UserRole } from '@/frontend/types/CustomerLogin';

/**
 * تسجيل دخول الزبون (Customer Login)
 * - البحث عن الحساب بواسطة اسم المستخدم أو رقم الهاتف المسجل
 * - التحقق من مطابقة تجزئة كلمة المرور hashPassword
 * - التأكد من أن دور الحساب هو زبون (CUSTOMER) وفق عقد allowed_login_roles
 * - إصدار رمز توثيق رقمي signToken
 */
export async function loginCustomer(input: LoginInput): Promise<LoginResult> {
  return withResult(async () => {
    const trimmedIdentifier = input.username?.trim();
    if (!trimmedIdentifier || !input.password) {
      throw new UnauthorizedError('بيانات الاعتماد غير مكتملة');
    }

    // 1. البحث عن الحساب باسم المستخدم أو رقم الهاتف
    const user = await prisma.accountUser.findFirst({
      where: {
        OR: [
          { username: trimmedIdentifier },
          { phoneNumber: trimmedIdentifier },
        ],
      },
      select: {
        id: true,
        fullName: true,
        username: true,
        passwordHash: true,
        role: true,
        phoneNumber: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    // 2. التحقق من الدور: يجب أن يكون دور الحساب زبون (CUSTOMER) حصراً
    if (user.role !== 'CUSTOMER') {
      throw new UnauthorizedError('هذا الفضاء مخصص حصرياً للزبائن والمواطنين');
    }

    // 3. مطابقة كلمة المرور المشفرة
    const hashedPassword = hashPassword(input.password);
    if (user.passwordHash !== hashedPassword) {
      throw new UnauthorizedError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    // 4. إصدار رمز الجلسة الرسمي
    const token = await signToken(user.id, user.role);

    return {
      token,
      userId: user.id, // data-from: AccountUser-id
      username: user.username, // data-from: AccountUser-username
      fullName: user.fullName, // data-from: AccountUser-fullName
      role: user.role as UserRole, // data-from: AccountUser-role
    };
  })();
}