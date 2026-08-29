import type {NextConfig} from "next";

import createNextIntlPlugin
    from "next-intl/plugin";


const withNextIntl =
    createNextIntlPlugin(
        "/Users/kadayhein/Project Workspace/Portfolio Projects/Fashion-StoreHub/webstore-next-frontend/i18n/request.ts"
    );


const nextConfig: NextConfig = {

    reactStrictMode: true,

};


export default withNextIntl(
    nextConfig
);