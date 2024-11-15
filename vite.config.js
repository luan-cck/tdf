import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    build: {
        outDir: "public/admin/build",
        manifest: "manifest.json",
    },
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/css/auth/base.css",
                "resources/js/common.js",

                "resources/css/dashboard/base.css",
                "resources/css/dashboard/accountManage.css",
                "resources/css/dashboard/receptionList.css",
                "resources/css/dashboard/receptionDetail.css",
                "resources/css/dashboard/sms.css",
                "resources/js/dashboard/createNew.js",
                "resources/js/dashboard/accountManage.js",
                "resources/js/dashboard/filterSearch.js",
                "resources/js/sms/search.js",
                "resources/js/returnList/edit.js",
                "resources/js/dashboard/receptionList.js",
                "resources/js/dashboard/convertDate.js",
                "resources/js/dashboard/request-form-detail.js",
            ],
            refresh: true,
            manifest: "/admin/build/manifest.json",
        }),
    ],
});
