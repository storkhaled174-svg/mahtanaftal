/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
import type * as Types from '../../../../../src/frontend/types/CustomerRegister';
export type * from '../../../../../src/frontend/types/CustomerRegister';

type Actions = typeof import('../../../../../src/frontend/actions/CustomerRegister');
export const registerCustomer = (...args: Parameters<Actions["registerCustomer"]>) => 
  rpcCall<Awaited<ReturnType<Actions["registerCustomer"]>>>("src.frontend.actions.CustomerRegister.registerCustomer", ...args);
export const checkUsernameAvailability = (...args: Parameters<Actions["checkUsernameAvailability"]>) => 
  rpcCall<Awaited<ReturnType<Actions["checkUsernameAvailability"]>>>("src.frontend.actions.CustomerRegister.checkUsernameAvailability", ...args);
