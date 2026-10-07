// 前台 Session Store
// 使用方法: import { useUserSession } from '@/tools/FrontendSession';
import { createPersistStore } from './storeFactory';

export type FrontendUserRole = 'CUSTOMER';
//frontenduse, جلسة تسجيل دخول الزبون في منصة نفطال
export class UserSession{ 
    token: string;
    user_id: string;
    username: string;
    role: FrontendUserRole;
    constructor() { 
        this.token='';
        this.user_id='';
        this.username='';
        this.role='CUSTOMER';
    }
}

export const useUserSession = createPersistStore<UserSession>('UserSession', { token: '', user_id: '', username: '', role: 'CUSTOMER' });
