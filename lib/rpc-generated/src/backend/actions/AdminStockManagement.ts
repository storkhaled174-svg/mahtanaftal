/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/backend/types/AdminStockManagement';
export type * from '../../../../../src/backend/types/AdminStockManagement';

type Actions = typeof import('../../../../../src/backend/actions/AdminStockManagement');
export const getStockManagementData = (...args: Parameters<Actions["getStockManagementData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getStockManagementData"]>>>("src.backend.actions.AdminStockManagement.getStockManagementData", ...args);
export const createTireStock = (...args: Parameters<Actions["createTireStock"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createTireStock"]>>>("src.backend.actions.AdminStockManagement.createTireStock", ...args);
export const updateTireStock = (...args: Parameters<Actions["updateTireStock"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateTireStock"]>>>("src.backend.actions.AdminStockManagement.updateTireStock", ...args);
export const toggleTireAvailability = (...args: Parameters<Actions["toggleTireAvailability"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleTireAvailability"]>>>("src.backend.actions.AdminStockManagement.toggleTireAvailability", ...args);
