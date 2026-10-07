'use server';

import prisma from '@/tools/prisma';
import { hashPassword, withResult } from '@/frontend/action_utils';
import {
  CustomerRegisterInput,
  CustomerRegisterOutput,
  CheckUsernameAvailabilityInput,
  CheckUsernameAvailabilityOutput,
  UserRole,
} from '@/frontend/types/CustomerRegister';

/**
 * تسجيل حساب زبون جديد في المنصة (Customer Registration)
 * 
 * القواعد المهنية والمجالية:
 * 1. الحساب يسجل حصراً بدور CUSTOMER وفق العقد التشغيلي للبوابة الرقمية لنفطال.
 * 2. التحقق من تفرد اسم المستخدم / المعرف (username) وعدم تكراره في النظام.
 * 3. تشفير كلمة المرور بـ hashPassword قبل التخزين في قاعدة البيانات.
 * 4. حفظ وتوثيق رقم الهاتف ورقم التعريف الوطني البيومتري (NIN).
 */
export async function registerCustomer(
  input: CustomerRegisterInput
): Promise<CustomerRegisterOutput> {
  return withResult(async () => {
    const trimmedUsername = input.username.trim();
    const trimmedFullName = input.fullName.trim();
    const trimmedPhone = input.phoneNumber.trim();
    const trimmedNIN = input.nationalIdNumber.trim();

    if (!trimmedFullName) {
      throw new Error('الاسم واللقب الكامل مطلوب');
    }
    if (!trimmedUsername) {
      throw new Error('اسم المستخدم / المعرف الوحيد مطلوب');
    }
    if (!input.password || input.password.length < 6) {
      throw new Error('كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام');
    }

    // التحقق من عدم وجود حساب مسبق بنفس اسم المستخدم
    const existingUser = await prisma.accountUser.findUnique({
      where: { username: trimmedUsername },
    });

    if (existingUser) {
      throw new Error('اسم المستخدم أو رقم المعرف مسجل مسبقاً في النظام');
    }

    // تشفير كلمة المرور
    const passwordHash = hashPassword(input.password);

    // إنشاء سجل حساب الزبون الجديد برتبة زبون مؤكدة (CUSTOMER)
    const newUser = await prisma.accountUser.create({
      data: {
        fullName: trimmedFullName,
        username: trimmedUsername,
        passwordHash: passwordHash,
        role: 'CUSTOMER',
        phoneNumber: trimmedPhone || null,
        nationalIdNumber: trimmedNIN || null,
      },
    });

    return {
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      role: newUser.role as UserRole,
      phoneNumber: newUser.phoneNumber,
      nationalIdNumber: newUser.nationalIdNumber,
      createdAt: newUser.createdAt,
    };
  })();
}

/**
 * فحص توفر اسم المستخدم في المنصة
 */
export async function checkUsernameAvailability(
  input: CheckUsernameAvailabilityInput
): Promise<CheckUsernameAvailabilityOutput> {
  return withResult(async () => {
    const username = input.username.trim();
    if (!username) {
      return { isAvailable: false, message: 'اسم المستخدم غير محدد' };
    }

    const existing = await prisma.accountUser.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existing) {
      return {
        isAvailable: false,
        message: 'اسم المستخدم مسجل بالفعل',
      };
    }

    return {
      isAvailable: true,
      message: 'اسم المستخدم متاح',
    };
  })();
}