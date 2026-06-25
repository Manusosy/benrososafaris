import { createLegalPageMetadata, createLegalPageRoute } from '@/lib/public/legal-page-route';

export const generateMetadata = createLegalPageMetadata('payment-terms');
export default createLegalPageRoute('payment-terms');
