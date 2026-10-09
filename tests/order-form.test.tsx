// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import type { OrderFormData, TireSizeOption } from '../src/frontend/types/HomePage';
const mocks = vi.hoisted(() => ({ save: vi.fn(), success: vi.fn(), error: vi.fn() }));
vi.mock('@/frontend/actions/HomePage', () => ({ createTireOrder: mocks.save }));
vi.mock('sonner', () => ({ toast: { success: mocks.success, error: mocks.error } }));
import OrderFormSection from '../src/frontend/components/HomePage/OrderFormSection';
const formData: OrderFormData = {
 fullName:'عميل اختبار', primaryPhone:'055 000 0000', secondaryPhone:'066 000 0000',
 wilayaCode:'16', commune:'الجزائر', brand:'iris', selectedSizeId:'tire', quantity:2,
 nidNumber:'123456789', edahabiaNumber:'12345678', edahabiaExpiry:'12/30', registrationDate:'2026-10-09',
};
const size: TireSizeOption = {id:'tire',brand:'iris',dimension:'205/55R16',loadSpeed:'91V',season:'all',inStock:true,availableStock:10,priceDzd:10000,category:'tourism'};
function mount(overrides: Partial<OrderFormData> = {}) {
 const onSuccess = vi.fn();
 const view = render(<OrderFormSection formData={{...formData,...overrides}} sizeOptions={[size]} wilayas={[{id:'w',code:'16',nameAr:'الجزائر',communes:['الجزائر']}]} onFormChange={vi.fn()} onSubmitSuccess={onSuccess} />);
 const button = view.getByRole('button', {name:'تأكيد وتسجيل الطلبية الرسمية'});
 return {...view,button,onSuccess};
}
beforeEach(() => vi.resetAllMocks());
afterEach(cleanup);
it('the actual submit button calls save with normalized data and waits for its receipt', async () => {
 let resolve!: (value:any) => void;
 mocks.save.mockReturnValue(new Promise(r => {resolve=r;}));
 const {button,onSuccess} = mount();
 fireEvent.click(button);
 expect(mocks.save).toHaveBeenCalledTimes(1);
 expect(mocks.save.mock.calls[0][0]).toMatchObject({customerName:formData.fullName,phoneNumber:'0550000000',secondaryPhone:'0660000000',brand:'IRIS',tireSize:'205/55R16',quantity:2});
 expect(mocks.success).not.toHaveBeenCalled();
 expect(onSuccess).not.toHaveBeenCalled();
 fireEvent.click(button);
 expect(mocks.save).toHaveBeenCalledTimes(1);
 const receipt = {orderNumber:'NM-TEST'};
 resolve(receipt);
 await waitFor(() => expect(onSuccess).toHaveBeenCalledWith(receipt));
 expect(mocks.success).toHaveBeenCalledTimes(1);
});
it('shows storage failure, no success, and reuses the key on retry', async () => {
 mocks.save.mockRejectedValue(new Error('تعذر حفظ البيانات'));
 const {button,onSuccess,getByRole} = mount();
 fireEvent.click(button);
 await waitFor(() => expect(getByRole('status').textContent).toBe('تعذر حفظ البيانات'));
 expect(mocks.success).not.toHaveBeenCalled();
 expect(onSuccess).not.toHaveBeenCalled();
 const key = mocks.save.mock.calls[0][0].submissionKey;
 fireEvent.click(button);
 await waitFor(() => expect(mocks.save).toHaveBeenCalledTimes(2));
 expect(mocks.save.mock.calls[1][0].submissionKey).toBe(key);
});
it.each([{primaryPhone:'0550000000',secondaryPhone:'055 000 0000'},{nidNumber:'12345678x'}])('rejects invalid data without saving: %j', async overrides => {
 const {button} = mount(overrides);
 fireEvent.click(button);
 expect(mocks.save).not.toHaveBeenCalled();
 expect(mocks.success).not.toHaveBeenCalled();
 expect(mocks.error).toHaveBeenCalled();
});

it('accepts an omitted secondary phone and does not collect payment-card data', async () => {
 mocks.save.mockResolvedValue({orderNumber:'NM-TEST'});
 const {button,container,onSuccess} = mount({secondaryPhone:'',edahabiaNumber:'',edahabiaExpiry:''});
 fireEvent.click(button);
 await waitFor(() => expect(onSuccess).toHaveBeenCalled());
 expect(mocks.save.mock.calls[0][0].secondaryPhone).toBe('');
 expect(mocks.save.mock.calls[0][0]).not.toHaveProperty('dahabiaCardNumber');
 expect(mocks.save.mock.calls[0][0]).not.toHaveProperty('dahabiaExpiry');
 expect(container.querySelector('input[placeholder="12345678"]')).toBeNull();
});
