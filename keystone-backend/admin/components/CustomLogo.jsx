"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogo = void 0;
/** @jsxRuntime classic */
/** @jsx jsx */
var link_1 = require("next/link");
var core_1 = require("@keystone-ui/core");
var CustomLogo = function () {
    return (<core_1.H3>
            <link_1.default href="/" css={{
            // TODO: we don't have colors in our design-system for this.
            backgroundImage: "linear-gradient(to right, #0ea5e9, #6366f1)",
            backgroundClip: 'text',
            lineHeight: '1.75rem',
            color: 'transparent',
            verticalAlign: 'middle',
            transition: 'color 0.3s ease',
            textDecoration: 'none',
        }}>
                Digital Rise Dorset / Keystone
            </link_1.default>
        </core_1.H3>);
};
exports.CustomLogo = CustomLogo;
