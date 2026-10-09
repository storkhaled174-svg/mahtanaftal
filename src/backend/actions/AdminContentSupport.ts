'use server';

import prisma from '@/tools/prisma';
import { withResult } from '@/@base/BaseActionFun';
import { requireRole, UserRole } from '../action_utils';
import {
  AdminContentSupportDataOutput,
  PlatformFaq,
  SupportChannel,
  FaqCategory,
  CreatePlatformFaqInput,
  UpdatePlatformFaqInput,
  ToggleEntityStatusInput,
  CreateSupportChannelInput,
  UpdateSupportChannelInput,
} from '@/backend/types/AdminContentSupport';

/**
 * جلب قائمة الأسئلة الشائعة وقنوات الدعم والإحصائيات التشغيلية المركزية
 * مخصص للمشرفين الإداريين (ADMIN) في منصة نفطال محطتي
 */
export async function getContentSupportWorkbenchData(): Promise<AdminContentSupportDataOutput> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<AdminContentSupportDataOutput> => {
      // جلب جميع الأسئلة الشائعة مرتبة بالأحدث
      const faqsRaw = await prisma.platformFaq.findMany({
        orderBy: { createdAt: 'desc' },
      });

      // جلب جميع قنوات الدعم الرسمية
      const channelsRaw = await prisma.supportChannel.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const faqs: PlatformFaq[] = faqsRaw.map((item) => ({
        id: item.id, // data-from: PlatformFaq-id
        question: item.question, // data-from: PlatformFaq-question
        answer: item.answer, // data-from: PlatformFaq-answer
        category: item.category as FaqCategory, // data-from: PlatformFaq-category
        isActive: item.isActive, // data-from: PlatformFaq-isActive
        createdAt: item.createdAt, // data-from: PlatformFaq-createdAt
        updatedAt: item.updatedAt, // data-from: PlatformFaq-updatedAt
      }));

      const channels: SupportChannel[] = channelsRaw.map((item) => ({
        id: item.id, // data-from: SupportChannel-id
        title: item.title, // data-from: SupportChannel-title
        value: item.value, // data-from: SupportChannel-value
        description: item.description, // data-from: SupportChannel-description
        isActive: item.isActive, // data-from: SupportChannel-isActive
        createdAt: item.createdAt, // data-from: SupportChannel-createdAt
        updatedAt: item.updatedAt, // data-from: SupportChannel-updatedAt
      }));

      // حساب الإحصائيات الحقيقية المباشرة من قاعدة البيانات
      const stats = {
        totalFaqs: faqs.length,
        activeFaqs: faqs.filter((f) => f.isActive).length,
        ordersFaqsCount: faqs.filter((f) => f.category === 'ORDERS').length,
        paymentFaqsCount: faqs.filter((f) => f.category === 'PAYMENT').length,
        deliveryFaqsCount: faqs.filter((f) => f.category === 'DELIVERY').length,
        warrantyFaqsCount: faqs.filter((f) => f.category === 'WARRANTY').length,
        totalChannels: channels.length,
        activeChannels: channels.filter((c) => c.isActive).length,
      };

      return {
        faqs,
        channels,
        stats,
      };
    })
  )();
}

/**
 * إنشاء وتسجيل سؤال شائع جديد في النظام (platform_faq)
 * يظهر فورياً في البوابة للزبائن إذا كان مفعل (isActive = true)
 */
export async function createPlatformFaq(
  input: CreatePlatformFaqInput
): Promise<PlatformFaq> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<PlatformFaq> => {
      const created = await prisma.platformFaq.create({
        data: {
          question: input.question.trim(),
          answer: input.answer.trim(),
          category: input.category,
          isActive: input.isActive ?? true,
        },
      });

      return {
        id: created.id, // data-from: PlatformFaq-id
        question: created.question, // data-from: PlatformFaq-question
        answer: created.answer, // data-from: PlatformFaq-answer
        category: created.category as FaqCategory, // data-from: PlatformFaq-category
        isActive: created.isActive, // data-from: PlatformFaq-isActive
        createdAt: created.createdAt, // data-from: PlatformFaq-createdAt
        updatedAt: created.updatedAt, // data-from: PlatformFaq-updatedAt
      };
    })
  )();
}

/**
 * تحديث بيانات سؤال شائع معتمد (نص السؤال، الإجابة، التصنيف، وحالة الظهور)
 */
export async function updatePlatformFaq(
  input: UpdatePlatformFaqInput
): Promise<PlatformFaq> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<PlatformFaq> => {
      const updated = await prisma.platformFaq.update({
        where: { id: input.id },
        data: {
          question: input.question.trim(),
          answer: input.answer.trim(),
          category: input.category,
          isActive: input.isActive,
        },
      });

      return {
        id: updated.id, // data-from: PlatformFaq-id
        question: updated.question, // data-from: PlatformFaq-question
        answer: updated.answer, // data-from: PlatformFaq-answer
        category: updated.category as FaqCategory, // data-from: PlatformFaq-category
        isActive: updated.isActive, // data-from: PlatformFaq-isActive
        createdAt: updated.createdAt, // data-from: PlatformFaq-createdAt
        updatedAt: updated.updatedAt, // data-from: PlatformFaq-updatedAt
      };
    })
  )();
}

/**
 * تبديل فوري لحالة تفعيل السؤال الشائع (isActive)
 */
export async function togglePlatformFaqStatus(
  input: ToggleEntityStatusInput
): Promise<PlatformFaq> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<PlatformFaq> => {
      const updated = await prisma.platformFaq.update({
        where: { id: input.id },
        data: {
          isActive: input.isActive,
        },
      });

      return {
        id: updated.id, // data-from: PlatformFaq-id
        question: updated.question, // data-from: PlatformFaq-question
        answer: updated.answer, // data-from: PlatformFaq-answer
        category: updated.category as FaqCategory, // data-from: PlatformFaq-category
        isActive: updated.isActive, // data-from: PlatformFaq-isActive
        createdAt: updated.createdAt, // data-from: PlatformFaq-createdAt
        updatedAt: updated.updatedAt, // data-from: PlatformFaq-updatedAt
      };
    })
  )();
}

/**
 * إضافة قناة اتصال ودعم فني جديدة (support_channel)
 */
export async function createSupportChannel(
  input: CreateSupportChannelInput
): Promise<SupportChannel> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<SupportChannel> => {
      const created = await prisma.supportChannel.create({
        data: {
          title: input.title.trim(),
          value: input.value.trim(),
          description: input.description ? input.description.trim() : null,
          isActive: input.isActive ?? true,
        },
      });

      return {
        id: created.id, // data-from: SupportChannel-id
        title: created.title, // data-from: SupportChannel-title
        value: created.value, // data-from: SupportChannel-value
        description: created.description, // data-from: SupportChannel-description
        isActive: created.isActive, // data-from: SupportChannel-isActive
        createdAt: created.createdAt, // data-from: SupportChannel-createdAt
        updatedAt: created.updatedAt, // data-from: SupportChannel-updatedAt
      };
    })
  )();
}

/**
 * تحديث بيانات قناة اتصال ودعم فني معتمدة
 */
export async function updateSupportChannel(
  input: UpdateSupportChannelInput
): Promise<SupportChannel> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<SupportChannel> => {
      const updated = await prisma.supportChannel.update({
        where: { id: input.id },
        data: {
          title: input.title.trim(),
          value: input.value.trim(),
          description: input.description ? input.description.trim() : null,
          isActive: input.isActive,
        },
      });

      return {
        id: updated.id, // data-from: SupportChannel-id
        title: updated.title, // data-from: SupportChannel-title
        value: updated.value, // data-from: SupportChannel-value
        description: updated.description, // data-from: SupportChannel-description
        isActive: updated.isActive, // data-from: SupportChannel-isActive
        createdAt: updated.createdAt, // data-from: SupportChannel-createdAt
        updatedAt: updated.updatedAt, // data-from: SupportChannel-updatedAt
      };
    })
  )();
}

/**
 * تبديل فوري لحالة تفعيل قناة الاتصال والدعم (isActive)
 */
export async function toggleSupportChannelStatus(
  input: ToggleEntityStatusInput
): Promise<SupportChannel> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<SupportChannel> => {
      const updated = await prisma.supportChannel.update({
        where: { id: input.id },
        data: {
          isActive: input.isActive,
        },
      });

      return {
        id: updated.id, // data-from: SupportChannel-id
        title: updated.title, // data-from: SupportChannel-title
        value: updated.value, // data-from: SupportChannel-value
        description: updated.description, // data-from: SupportChannel-description
        isActive: updated.isActive, // data-from: SupportChannel-isActive
        createdAt: updated.createdAt, // data-from: SupportChannel-createdAt
        updatedAt: updated.updatedAt, // data-from: SupportChannel-updatedAt
      };
    })
  )();
}