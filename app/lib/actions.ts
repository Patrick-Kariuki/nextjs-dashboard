'use server';

import { z } from 'zod';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

// we are going to omit these from the form
const CreateInvoice = FormSchema.omit({id: true, date: true});
 
export async function createInvoice(formData: FormData) {
  const {customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // always a good idea to store monetary value in cents in the db
  const amountInCents = amount * 100;
  // get date in 'YYYY-MM-DD' format
  const date = new Date().toISOString().split('T')[0];
}