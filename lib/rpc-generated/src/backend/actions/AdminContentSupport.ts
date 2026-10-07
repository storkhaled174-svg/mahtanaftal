/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/backend/types/AdminContentSupport';
export type * from '../../../../../src/backend/types/AdminContentSupport';

type Actions = typeof import('../../../../../src/backend/actions/AdminContentSupport');
export const getContentSupportWorkbenchData = (...args: Parameters<Actions["getContentSupportWorkbenchData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getContentSupportWorkbenchData"]>>>("src.backend.actions.AdminContentSupport.getContentSupportWorkbenchData", ...args);
export const createPlatformFaq = (...args: Parameters<Actions["createPlatformFaq"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createPlatformFaq"]>>>("src.backend.actions.AdminContentSupport.createPlatformFaq", ...args);
export const updatePlatformFaq = (...args: Parameters<Actions["updatePlatformFaq"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updatePlatformFaq"]>>>("src.backend.actions.AdminContentSupport.updatePlatformFaq", ...args);
export const togglePlatformFaqStatus = (...args: Parameters<Actions["togglePlatformFaqStatus"]>) => 
  rpcCall<Awaited<ReturnType<Actions["togglePlatformFaqStatus"]>>>("src.backend.actions.AdminContentSupport.togglePlatformFaqStatus", ...args);
export const createSupportChannel = (...args: Parameters<Actions["createSupportChannel"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createSupportChannel"]>>>("src.backend.actions.AdminContentSupport.createSupportChannel", ...args);
export const updateSupportChannel = (...args: Parameters<Actions["updateSupportChannel"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateSupportChannel"]>>>("src.backend.actions.AdminContentSupport.updateSupportChannel", ...args);
export const toggleSupportChannelStatus = (...args: Parameters<Actions["toggleSupportChannelStatus"]>) => 
  rpcCall<Awaited<ReturnType<Actions["toggleSupportChannelStatus"]>>>("src.backend.actions.AdminContentSupport.toggleSupportChannelStatus", ...args);
