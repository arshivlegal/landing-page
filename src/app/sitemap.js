import { SEO_CONFIG } from '@/lib/seo-config';
export default async function sitemap() {
    const baseUrl = SEO_CONFIG.siteUrl.replace(/\/$/, '');
    // 1. MANUAL LIST: Core Pages
    // These are the top-level pages of your application.
    const coreRoutes = [
        '', // Homepage
        '/about',
        '/contact-us',
        '/team',
        '/legal-services',
        '/what-should-i-do-now',
        '/daily-legal-content', // Listing page
        '/blog',                // Listing page
        '/privacy-policy',
        '/terms-&-conditions',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
    }));
    // 2. MANUAL LIST: Service Pages
    // These match your folder names in src/app/services/ exactly.
    // Writing them manually prevents any "slugify" errors with special characters like "&" or ",".
    const serviceRoutes = [
        '/services/bail-&-anticipatory-bail',
        '/services/challenges-against-government-orders',
        '/services/cheating,-threats-&-harassment-cases',
        '/services/family-matters',
        '/services/fundamental-rights-protection',
        '/services/government-document-&-licensing-issues',
        '/services/land-ownership-&-title-verification',
        '/services/property-disputes',
        '/services/property-transfer-&-registration',
        '/services/public-interest-related-matters',
        '/services/rights-violation-complaints',
        '/services/writ-petitions',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));
    // 3. DYNAMIC LOGIC: Blog Posts
    // Only use logic here because these pages are created dynamically from your database.
    let blogRoutes = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?limit=1000`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: 3600 },
        });
        if (res.ok) {
            const json = await res.json();
            const blogs = json.data?.blogs || [];
            blogRoutes = blogs.map((post) => ({
                url: `${baseUrl}/blog/${post._id}`,
                lastModified: new Date(post.updatedAt || post.createdAt),
                changeFrequency: 'weekly',
                priority: 0.7,
            }));
        }
    } catch (error) {
        console.error('Sitemap Blog Fetch Error:', error);
    }
    // Combine and Return
    return [...coreRoutes, ...serviceRoutes, ...blogRoutes];
}
