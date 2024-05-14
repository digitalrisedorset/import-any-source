// admin/pages/custom-page.tsx
import Link from 'next/link';
import { PageContainer } from '@keystone-6/core/admin-ui/components';

export default function CustomPage () {
    return (
        <PageContainer header="Custom Page">
            <h1>This is a custom Admin UI Page</h1>
            <p>It can be accessed via the route <Link href="/custom-page">/custom-page</Link></p>
        </PageContainer>
    )
}