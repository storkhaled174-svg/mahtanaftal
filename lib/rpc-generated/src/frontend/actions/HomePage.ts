/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/frontend/types/HomePage';
export type * from '../../../../../src/frontend/types/HomePage';

type Actions = typeof import('../../../../../src/frontend/actions/HomePage');
export const getHomePageData = (...args: Parameters<Actions["getHomePageData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getHomePageData"]>>>("src.frontend.actions.HomePage.getHomePageData", ...args);
export const createTireOrder = (...args: Parameters<Actions["createTireOrder"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createTireOrder"]>>>("src.frontend.actions.HomePage.createTireOrder", ...args);
