'use server';

import prisma from '@/tools/prisma';
import {
  UnauthorizedError,
  signToken,
  hashPassword,
  withResult,
} from '@/backend/action_utils';
import { LoginAdminInput, LoginAdminOutput, UserRole } from '@/backend/types/AdminLogin';

/**
 * تسجيل دخول مشرف إدارة نفطال (Admin Login)
 * - حصر الولوج حصرياً على الحسابات برتبة ADMIN.
 * - إمكانية الولوج إما باسم المستخدم (username) أو برقم الهاتف المهني المعتمد (phoneNumber).
 * - التحقق من تشفير كلمة المرور بواسطة hashPassword.
 * - توقيع التوكن واستخراج معرّف المشرف.
 */
export async function loginAdmin(input: LoginAdminInput): Promise<LoginAdminOutput> {
  return withResult(async () => {
    const trimmedAccount = input.usernameOrPhone.trim();
    if (!trimmedAccount || !input.password) {
      throw new UnauthorizedError('يرجى تقديم بيانات الاعتماد كاملة');
    }

    // البحث عن حساب المشرف إما باسم المستخدم أو برقم الهاتف
    const user = await prisma.accountUser.findFirst({
      where: {
        OR: [
          { username: trimmedAccount },
          { phoneNumber: trimmedAccount },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    // التحقق الصارم من الدور الإداري - مقصور حصرياً على ADMIN
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedError('غير مصرح لك بالولوج إلى البوابة الإدارية المركزية');
    }

    // مطابقة كلمة المرور المشفرة
    const inputHash = hashPassword(input.password);
    if (user.passwordHash !== inputHash) {
      throw new UnauthorizedError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    // توليد وتوقيع التوكن الرسمي باستخدام معرّف المشرف في قاعدة البيانات
    const token = await signToken(user.id, user.role);

    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        role: user.role as UserRole,
        phoneNumber: user.phoneNumber,
      },
    };
  })();
}