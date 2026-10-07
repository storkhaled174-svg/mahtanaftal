/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/frontend/types/OrderTracking';
export type * from '../../../../../src/frontend/types/OrderTracking';

type Actions = typeof import('../../../../../src/frontend/actions/OrderTracking');
export const searchTireOrder = (...args: Parameters<Actions["searchTireOrder"]>) => 
  rpcCall<Awaited<ReturnType<Actions["searchTireOrder"]>>>("src.frontend.actions.OrderTracking.searchTireOrder", ...args);
export const getSampleOrders = (...args: Parameters<Actions["getSampleOrders"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getSampleOrders"]>>>("src.frontend.actions.OrderTracking.getSampleOrders", ...args);
export const getOrderByOrderNumber = (...args: Parameters<Actions["getOrderByOrderNumber"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getOrderByOrderNumber"]>>>("src.frontend.actions.OrderTracking.getOrderByOrderNumber", ...args);
