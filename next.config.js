/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'de'],
    },
    /** To avoid issues when deploying to some paas (vercel...) */
    localePath:
        typeof window === 'undefined'
            ? require('path').resolve('./public/locales')
            : '/locales',
};

export default nextConfig;
