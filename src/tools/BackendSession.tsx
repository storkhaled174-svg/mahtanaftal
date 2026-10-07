// 后台 Session Store
// 使用方法: import { useAdminSession } from '@/tools/BackendSession';
import { createPersistStore } from './storeFactory';

export type BackendAdminRole = 'ADMIN';
//backenduse, جلسة تسجيل دخول المشرف الإداري لنفطال
export class AdminSession{ 
    token: string;
    user_id: string;
    username: string;
    role: BackendAdminRole;
    constructor() { 
        this.token='';
        this.user_id='';
        this.username='';
        this.role='ADMIN';
    }
}

export const useAdminSession = createPersistStore<AdminSession>('AdminSession', { token: '', user_id: '', username: '', role: 'ADMIN' });
