/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['my.ku.th'], // เพิ่มโดเมนของภาพที่คุณต้องการให้ Next.js โหลด
    },
    output: 'standalone',
};

export default nextConfig;
