"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// admin/pages/custom-page.tsx
var link_1 = require("next/link");
var components_1 = require("@keystone-6/core/admin-ui/components");
function CustomPage() {
    return (<components_1.PageContainer header="Custom Page">
            <h1>This is a custom Admin UI Page</h1>
            <p>It can be accessed via the route <link_1.default href="/custom-page">/custom-page</link_1.default></p>
        </components_1.PageContainer>);
}
exports.default = CustomPage;
