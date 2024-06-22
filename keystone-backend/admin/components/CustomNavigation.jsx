"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNavigation = void 0;
var components_1 = require("@keystone-6/core/admin-ui/components");
function CustomNavigation(_a) {
    var lists = _a.lists, authenticatedItem = _a.authenticatedItem;
    return (<components_1.NavigationContainer authenticatedItem={authenticatedItem}>
            <components_1.NavItem href="/">Dashboard</components_1.NavItem>
            <components_1.NavItem href="/custom-page">Custom Page</components_1.NavItem>
            <components_1.ListNavItems lists={lists}/>
            <components_1.NavItem href="https://www.digitalrisedorset.co.uk/">Blog</components_1.NavItem>
        </components_1.NavigationContainer>);
}
exports.CustomNavigation = CustomNavigation;
