import { expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';

// Deliberately fail (not skip) when live verification cannot run.
// Run only against the existing database with explicit operator authorization.
it('persists a synthetic order in MySQL and returns it through the authorized dashboard action', async () => {
  if (!process.env.DATABASE_URL) throw new Error('BLOCKED: DATABASE_URL is missing; live persistence has NOT been verified.');
  if (process.env.ALLOW_REGISTRATION_DB_TEST !== 'yes') throw new Error('BLOCKED: set ALLOW_REGISTRATION_DB_TEST=yes to authorize one synthetic row and its cleanup.');
  const { default: prisma } = await import('../src/tools/prisma');
  const { createTireOrder } = await import('../src/frontend/actions/HomePage');
  const { getAdminDashboardData } = await import('../src/backend/actions/AdminDashboard');
  const { runWithAuth } = await import('../src/@base/BaseActionFun');
  const submissionKey = randomUUID();
  try {
    // Query live schema and seed prerequisites; never create replacement tables/data.
    await prisma.$queryRaw`SELECT submissionKey FROM TireOrder LIMIT 0`;
    const admin = await prisma.accountUser.findFirst({ where: { role: 'ADMIN' }, select: { id: true } });
    const tire = await prisma.tireStock.findFirst({ where: { isAvailable: true, availableStock: { gte: 1 } } });
    const locations = await prisma.algerianWilaya.findMany();
    const location = locations.find(w => Array.isArray(w.communes) && w.communes.length > 0);
    if (!admin || !tire || !location) throw new Error('BLOCKED: existing ADMIN, available TireStock and AlgerianWilaya communes are required.');
    const input = {
      submissionKey, customerName: 'طلب اختبار آلي - يحذف بعد التحقق',
      phoneNumber: '0550000000', secondaryPhone: '0660000000',
      wilayaCode: location.code, commune: (location.communes as string[])[0],
      brand: tire.brand, tireSize: tire.size, quantity: 1,
      nationalIdNumber: '123456789', dahabiaCardNumber: '12345678', dahabiaExpiry: '12/30',
    };
    const receipt = await runWithAuth(null, () => createTireOrder(input));
    const persisted = await prisma.tireOrder.findUnique({ where: { submissionKey } });
    expect(persisted?.orderNumber).toBe(receipt.orderNumber);
    expect(persisted?.customerName).toBe(input.customerName);
    expect(persisted?.quantity).toBe(1);
    const retry = await runWithAuth(null, () => createTireOrder(input));
    expect(retry.orderNumber).toBe(receipt.orderNumber);
    expect(await prisma.tireOrder.count({ where: { submissionKey } })).toBe(1);
    await expect(runWithAuth(null, getAdminDashboardData)).rejects.toThrow();
    const dashboard = await runWithAuth({ userId: admin.id, role: 'ADMIN' }, getAdminDashboardData);
    expect(dashboard.orders.find(o => o.orderNumber === receipt.orderNumber)?.id).toBe(persisted?.id);
    console.log('PASS: MySQL row, idempotent retry, guest denial and authorized dashboard action. Browser UI/login were not tested.');
  } finally {
    // Match only this run's key, including when saving succeeded but receipt failed.
    try {
      await prisma.tireOrder.deleteMany({ where: { submissionKey } });
    } finally {
      await prisma.$disconnect();
    }
  }
}, 60000);
