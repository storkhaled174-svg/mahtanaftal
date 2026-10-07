/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/backend/types/AdminDashboard';
export type * from '../../../../../src/backend/types/AdminDashboard';

type Actions = typeof import('../../../../../src/backend/actions/AdminDashboard');
export const getAdminDashboardData = (...args: Parameters<Actions["getAdminDashboardData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getAdminDashboardData"]>>>("src.backend.actions.AdminDashboard.getAdminDashboardData", ...args);
export const updateOrderStatus = (...args: Parameters<Actions["updateOrderStatus"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateOrderStatus"]>>>("src.backend.actions.AdminDashboard.updateOrderStatus", ...args);
export const updateOrderDetails = (...args: Parameters<Actions["updateOrderDetails"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateOrderDetails"]>>>("src.backend.actions.AdminDashboard.updateOrderDetails", ...args);
export const deleteOrder = (...args: Parameters<Actions["deleteOrder"]>) => 
  rpcCall<Awaited<ReturnType<Actions["deleteOrder"]>>>("src.backend.actions.AdminDashboard.deleteOrder", ...args);
export const addTireStock = (...args: Parameters<Actions["addTireStock"]>) => 
  rpcCall<Awaited<ReturnType<Actions["addTireStock"]>>>("src.backend.actions.AdminDashboard.addTireStock", ...args);
export const updateTireStock = (...args: Parameters<Actions["updateTireStock"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateTireStock"]>>>("src.backend.actions.AdminDashboard.updateTireStock", ...args);
export const toggleStockAvailability = (...args: Parameters<Actions["toggleStockAvailability"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleStockAvailability"]>>>("src.backend.actions.AdminDashboard.toggleStockAvailability", ...args);
export const addPlatformFaq = (...args: Parameters<Actions["addPlatformFaq"]>) => 
  rpcCall<Awaited<ReturnType<Actions["addPlatformFaq"]>>>("src.backend.actions.AdminDashboard.addPlatformFaq", ...args);
export const updatePlatformFaq = (...args: Parameters<Actions["updatePlatformFaq"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updatePlatformFaq"]>>>("src.backend.actions.AdminDashboard.updatePlatformFaq", ...args);
export const deletePlatformFaq = (...args: Parameters<Actions["deletePlatformFaq"]>) => 
  rpcCall<Awaited<ReturnType<Actions["deletePlatformFaq"]>>>("src.backend.actions.AdminDashboard.deletePlatformFaq", ...args);
export const updateSupportChannel = (...args: Parameters<Actions["updateSupportChannel"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateSupportChannel"]>>>("src.backend.actions.AdminDashboard.updateSupportChannel", ...args);
