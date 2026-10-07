'use server';

import prisma from '@/tools/prisma';
import { hashPassword, signToken, withResult } from '@/backend/action_utils';
import { RegisterAdminInput, RegisterAdminOutput, UserRole } from '@/backend/types/AdminRegister';

/**
 * تسجيل مشرف إداري جديد لنظام نفطال محطتي
 * 
 * القواعد والقيود:
 * 1. اسم المستخدم يجب أن يكون فريداً على مستوى المنصة
 * 2. الدور التشغيلي مثبت كـ ADMIN بصورة أمنية صارمة ولا يقبل تعيين أدوار أخرى
 * 3. كلمة المرور تُشفر باستخدام hashPassword قبل الحفظ
 * 4. إنشاء الرمز الأمني JWT (Token) المرتبط بمعرف المشرف وصلاحيته
 */
export async function registerAdmin(input: RegisterAdminInput): Promise<RegisterAdminOutput> {
  return withResult(async () => {
    const trimmedUsername = input.username.trim().toLowerCase();
    const trimmedFullName = input.fullName.trim();
    const trimmedPhone = input.phoneNumber.trim();

    // 1. التحقق من الحقول الأساسية
    if (!trimmedUsername || !trimmedFullName || !input.password) {
      throw new Error('جميع حقول البيانات الإدارية إجبارية');
    }

    if (input.password.length < 8) {
      throw new Error('كلمة المرور يجب ألا تقل عن 8 خانات');
    }

    // 2. التحقق من فرادة اسم المستخدم
    const existingUser = await prisma.accountUser.findUnique({
      where: { username: trimmedUsername },
      select: { id: true }
    });

    if (existingUser) {
      throw new Error('اسم المستخدم مسجل مسبقاً في النظام الإداري، يرجى اختيار اسم مستخدم آخر');
    }

    // 3. تشفير كلمة المرور وتثبيت دور ADMIN
    const passwordHash = hashPassword(input.password);
    
    const newUser = await prisma.accountUser.create({
      data: {
        fullName: trimmedFullName,
        username: trimmedUsername,
        passwordHash,
        role: 'ADMIN',
        phoneNumber: trimmedPhone || null
      }
    });

    // 4. توليد جلسة التوكن الإدارية المعتمدة
    const token = await signToken(newUser.id, 'ADMIN');

    return {
      id: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
      role: newUser.role as UserRole,
      phoneNumber: newUser.phoneNumber,
      token
    };
  })();
}