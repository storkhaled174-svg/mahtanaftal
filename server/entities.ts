import { PrismaClient, Prisma } from '../prisma-generated/client';
import {
  AccountUser, 
  AccountUser_uniqueKey, 
  AccountUser_without_PKs, 
  AlgerianWilaya, 
  AlgerianWilaya_uniqueKey, 
  AlgerianWilaya_without_PKs, 
  PlatformFaq, 
  PlatformFaq_uniqueKey, 
  PlatformFaq_without_PKs, 
  SupportChannel, 
  SupportChannel_uniqueKey, 
  SupportChannel_without_PKs, 
  TireOrder, 
  TireOrder_uniqueKey, 
  TireOrder_without_PKs, 
  TireStock, 
  TireStock_uniqueKey, 
  TireStock_without_PKs, 
  filtered_AccountUser, 
  filtered_AlgerianWilaya, 
  filtered_PlatformFaq, 
  filtered_SupportChannel, 
  filtered_TireOrder, 
  filtered_TireStock,
  Entities
} from './entities.type';

export const prisma = new PrismaClient();

export const default_entities: Entities = {
  accountuser: {
    /**
        * 创建accountuser记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: AccountUser): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating accountuser:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: AccountUser_uniqueKey): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting accountuser:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_AccountUser): Promise<AccountUser[]> => {
            try {
                return await prisma.accountuser.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all accountuser:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_AccountUser
        ): Promise<AccountUser[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.accountuser.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged accountuser:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 记录数量
        */
        Count: async (args?: filtered_AccountUser): Promise<number> => {
            try {
                return await prisma.accountuser.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting accountuser:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: AccountUser_uniqueKey; data: AccountUser_without_PKs }): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating accountuser:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: AccountUser_uniqueKey): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting accountuser:`, error);
                return null;
            }
        },  },
  algerianwilaya: {
    /**
        * 创建algerianwilaya记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: AlgerianWilaya): Promise<AlgerianWilaya | null> => {
            try {
                return await prisma.algerianwilaya.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating algerianwilaya:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: AlgerianWilaya_uniqueKey): Promise<AlgerianWilaya | null> => {
            try {
                return await prisma.algerianwilaya.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting algerianwilaya:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_AlgerianWilaya)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_AlgerianWilaya): Promise<AlgerianWilaya[]> => {
            try {
                return await prisma.algerianwilaya.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all algerianwilaya:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_AlgerianWilaya)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_AlgerianWilaya
        ): Promise<AlgerianWilaya[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.algerianwilaya.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged algerianwilaya:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_AlgerianWilaya)
        * @returns 记录数量
        */
        Count: async (args?: filtered_AlgerianWilaya): Promise<number> => {
            try {
                return await prisma.algerianwilaya.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting algerianwilaya:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: AlgerianWilaya_uniqueKey; data: AlgerianWilaya_without_PKs }): Promise<AlgerianWilaya | null> => {
            try {
                return await prisma.algerianwilaya.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating algerianwilaya:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: AlgerianWilaya_uniqueKey): Promise<AlgerianWilaya | null> => {
            try {
                return await prisma.algerianwilaya.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting algerianwilaya:`, error);
                return null;
            }
        },  },
  tirestock: {
    /**
        * 创建tirestock记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: TireStock): Promise<TireStock | null> => {
            try {
                return await prisma.tirestock.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating tirestock:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: TireStock_uniqueKey): Promise<TireStock | null> => {
            try {
                return await prisma.tirestock.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting tirestock:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_TireStock)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_TireStock): Promise<TireStock[]> => {
            try {
                return await prisma.tirestock.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all tirestock:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_TireStock)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_TireStock
        ): Promise<TireStock[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.tirestock.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged tirestock:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_TireStock)
        * @returns 记录数量
        */
        Count: async (args?: filtered_TireStock): Promise<number> => {
            try {
                return await prisma.tirestock.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting tirestock:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: TireStock_uniqueKey; data: TireStock_without_PKs }): Promise<TireStock | null> => {
            try {
                return await prisma.tirestock.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating tirestock:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: TireStock_uniqueKey): Promise<TireStock | null> => {
            try {
                return await prisma.tirestock.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting tirestock:`, error);
                return null;
            }
        },  },
  platformfaq: {
    /**
        * 创建platformfaq记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: PlatformFaq): Promise<PlatformFaq | null> => {
            try {
                return await prisma.platformfaq.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating platformfaq:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: PlatformFaq_uniqueKey): Promise<PlatformFaq | null> => {
            try {
                return await prisma.platformfaq.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting platformfaq:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_PlatformFaq)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_PlatformFaq): Promise<PlatformFaq[]> => {
            try {
                return await prisma.platformfaq.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all platformfaq:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_PlatformFaq)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_PlatformFaq
        ): Promise<PlatformFaq[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.platformfaq.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged platformfaq:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_PlatformFaq)
        * @returns 记录数量
        */
        Count: async (args?: filtered_PlatformFaq): Promise<number> => {
            try {
                return await prisma.platformfaq.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting platformfaq:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: PlatformFaq_uniqueKey; data: PlatformFaq_without_PKs }): Promise<PlatformFaq | null> => {
            try {
                return await prisma.platformfaq.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating platformfaq:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: PlatformFaq_uniqueKey): Promise<PlatformFaq | null> => {
            try {
                return await prisma.platformfaq.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting platformfaq:`, error);
                return null;
            }
        },  },
  supportchannel: {
    /**
        * 创建supportchannel记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: SupportChannel): Promise<SupportChannel | null> => {
            try {
                return await prisma.supportchannel.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating supportchannel:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: SupportChannel_uniqueKey): Promise<SupportChannel | null> => {
            try {
                return await prisma.supportchannel.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting supportchannel:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_SupportChannel)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_SupportChannel): Promise<SupportChannel[]> => {
            try {
                return await prisma.supportchannel.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all supportchannel:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_SupportChannel)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_SupportChannel
        ): Promise<SupportChannel[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.supportchannel.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged supportchannel:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_SupportChannel)
        * @returns 记录数量
        */
        Count: async (args?: filtered_SupportChannel): Promise<number> => {
            try {
                return await prisma.supportchannel.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting supportchannel:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: SupportChannel_uniqueKey; data: SupportChannel_without_PKs }): Promise<SupportChannel | null> => {
            try {
                return await prisma.supportchannel.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating supportchannel:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: SupportChannel_uniqueKey): Promise<SupportChannel | null> => {
            try {
                return await prisma.supportchannel.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting supportchannel:`, error);
                return null;
            }
        },  },
  tireorder: {
    /**
        * 创建tireorder记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: TireOrder): Promise<TireOrder | null> => {
            try {
                return await prisma.tireorder.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating tireorder:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: TireOrder_uniqueKey): Promise<TireOrder | null> => {
            try {
                return await prisma.tireorder.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting tireorder:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_TireOrder)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_TireOrder): Promise<TireOrder[]> => {
            try {
                return await prisma.tireorder.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all tireorder:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_TireOrder)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_TireOrder
        ): Promise<TireOrder[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.tireorder.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged tireorder:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_TireOrder)
        * @returns 记录数量
        */
        Count: async (args?: filtered_TireOrder): Promise<number> => {
            try {
                return await prisma.tireorder.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting tireorder:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: TireOrder_uniqueKey; data: TireOrder_without_PKs }): Promise<TireOrder | null> => {
            try {
                return await prisma.tireorder.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating tireorder:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: TireOrder_uniqueKey): Promise<TireOrder | null> => {
            try {
                return await prisma.tireorder.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting tireorder:`, error);
                return null;
            }
        },  },
};
