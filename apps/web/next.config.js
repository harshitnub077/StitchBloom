/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@crochetverse/shared", "@crochetverse/database"],
    images: {
        domains: ["example.com", "via.placeholder.com"],
    },
};

module.exports = nextConfig;
