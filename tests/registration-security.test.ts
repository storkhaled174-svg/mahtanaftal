import { beforeEach, describe, expect, it, vi } from 'vitest';
import { randomUUID } from 'node:crypto';
const db = vi.hoisted(() => ({
  tireStock: {findFirst: vi.fn(), findMany: vi.fn()},
  tireOrder: {upsert:vi.fn(), findMany:vi.fn(), findUnique:vi.fn()},
  algerianWilaya: {findUnique:vi.fn(), findMany:vi.fn()},
  platformFaq:{findMany:vi.fn()}, supportChannel:{findMany:vi.fn()},
}));
vi.mock('../src/tools/prisma', () => ({default:db}));
import { createTireOrder } from '../src/frontend/actions/HomePage';
import { getAdminDashboardData, updateOrderDetails, updateOrderStatus } from '../src/backend/actions/AdminDashboard';
import { registerAdmin } from '../src/backend/actions/AdminRegister';
import { searchTireOrder, getSampleOrders, getOrderByOrderNumber } from '../src/frontend/actions/OrderTracking';
import { runWithAuth } from '../src/@base/BaseActionFun';
const input = () => ({submissionKey:randomUUID(),customerName:'عميل اختبار',phoneNumber:'0550000000',secondaryPhone:'0660000000',wilayaCode:'16',commune:'الجزائر',brand:'IRIS' as const,tireSize:'205/55R16',quantity:2,nationalIdNumber:'123456789',registrationDate:new Date('2026-10-09')});
const decimal = (n:number) => ({toNumber:()=>n, valueOf:()=>n});
beforeEach(() => {
 vi.clearAllMocks();
 db.tireStock.findFirst.mockResolvedValue({priceDzd:decimal(10000)});
 db.tireStock.findMany.mockResolvedValue([]);
 db.algerianWilaya.findUnique.mockResolvedValue({code:'16',nameAr:'الجزائر',communes:['الجزائر']});
 db.algerianWilaya.findMany.mockResolvedValue([]); db.platformFaq.findMany.mockResolvedValue([]); db.supportChannel.findMany.mockResolvedValue([]);
 const rows = new Map<string, any>();
 db.tireOrder.upsert.mockImplementation(async ({where,create}) => {
  if(!rows.has(where.submissionKey)) rows.set(where.submissionKey,{...create,id:randomUUID(),createdAt:new Date(),updatedAt:new Date(),unitPriceDzd:decimal(10000),totalPriceDzd:decimal(20000)});
  return rows.get(where.submissionKey);
 });
 db.tireOrder.findMany.mockImplementation(async ()=>Array.from(rows.values()));
});
describe('registration and private management', () => {
 it('saves registration without payment-card fields and the dashboard reads it', async () => {
  const receipt = await createTireOrder(input());
  expect(receipt.orderNumber).toMatch(/^NM-\d{4}-[A-F0-9]{32}$/);
  const saved = db.tireOrder.upsert.mock.calls[0][0].create;
  expect(saved).not.toHaveProperty('dahabiaCardNumber');
  expect(saved).not.toHaveProperty('dahabiaExpiry');
  expect(saved.registrationDate.toISOString()).toBe('2026-10-09T00:00:00.000Z');
  const dashboard = await runWithAuth({userId:'admin',role:'ADMIN'},getAdminDashboardData);
  expect(dashboard.orders[0].orderNumber).toBe(receipt.orderNumber);
 });
 it('accepts no secondary phone and ignores legacy payment-card arguments', async () => {
  await createTireOrder({...input(),secondaryPhone:undefined,dahabiaCardNumber:'ignored',dahabiaExpiry:'ignored'} as any);
  const saved = db.tireOrder.upsert.mock.calls[0][0].create;
  expect(saved.secondaryPhone).toBe('');
  expect(saved).not.toHaveProperty('dahabiaCardNumber');
  expect(saved).not.toHaveProperty('dahabiaExpiry');
 });
 it('rejects invalid registration date before storage', async () => {
  await expect(createTireOrder({...input(),registrationDate:new Date('invalid')})).rejects.toThrow('تاريخ');
  expect(db.tireOrder.upsert).not.toHaveBeenCalled();
 });
 it('uses one unique storage key across retries', async () => {
  const submission = input(); const receipts = await Promise.all([createTireOrder(submission),createTireOrder(submission)]);
  expect(receipts[0].orderNumber).toBe(receipts[1].orderNumber);
  expect(await db.tireOrder.findMany()).toHaveLength(1);
 });
 it.each([null,{role:'CUSTOMER',userId:'customer'}])('blocks unauthorized reads, edits and admin creation', async identity => {
  await expect(runWithAuth(identity,getAdminDashboardData)).rejects.toThrow();
  await expect(runWithAuth(identity,()=>updateOrderStatus({orderId:'x',newStatus:'COMPLETED'}))).rejects.toThrow();
  await expect(runWithAuth(identity,()=>updateOrderDetails({} as any))).rejects.toThrow();
  await expect(runWithAuth(identity,()=>registerAdmin({} as any))).rejects.toThrow();
  expect(db.tireOrder.findMany).not.toHaveBeenCalled();
 });
 it('propagates storage failure instead of producing a success receipt', async () => {
  db.tireOrder.upsert.mockRejectedValueOnce(new Error('storage unavailable'));
  await expect(createTireOrder(input())).rejects.toThrow('storage unavailable');
 });
 it('requires exact phone matching and masks sensitive tracking fields', async () => {
  const submission = input(); await createTireOrder(submission);
  const [record] = await db.tireOrder.findMany();
  db.tireOrder.findUnique.mockResolvedValue(record);
  const match = await searchTireOrder({orderNumber:record.orderNumber,phoneNumber:submission.phoneNumber});
  expect(match.found).toBe(true);
  expect(match.order?.dahabiaCardNumber).toBe('••••••••');
  expect(match.order?.nationalIdNumber).toBe('••••••••');
  const mismatch = await searchTireOrder({orderNumber:record.orderNumber,phoneNumber:'0770000000'});
  expect(mismatch.found).toBe(false);
  expect(mismatch.order).toBeNull();
 });
 it('does not publish sample customer registrations', async()=>expect(await getSampleOrders()).toEqual([]));
 it('requires full phone verification and blocks reference-only lookup', async()=>{
  await expect(searchTireOrder({orderNumber:'NM-2026-1234',phoneNumber:''})).rejects.toThrow();
  await expect(searchTireOrder({orderNumber:'NM-2026-1234',phoneNumber:'0000'})).rejects.toThrow();
  await expect(getOrderByOrderNumber('NM-2026-1234')).rejects.toThrow();
  expect(db.tireOrder.findUnique).not.toHaveBeenCalled();
 });
});
