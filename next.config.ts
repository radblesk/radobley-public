import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `
    @import '@/styles/breakpoints.module.scss';
    `,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
