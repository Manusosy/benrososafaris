import { createLegalPageMetadata, createLegalPageRoute } from '@/lib/public/legal-page-route';

export const generateMetadata = createLegalPageMetadata('terms-conditions');
export default createLegalPageRoute('terms-conditions');
