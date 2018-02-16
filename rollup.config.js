import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import uglifyEs from "rollup-plugin-uglify-es";
import license from 'rollup-plugin-license';
import camelCase from "lodash.camelCase";
const banner=`@license <%= pkg.name %> v<%= pkg.version %>
(c) <%= moment().format('YYYY') %> Finsi, Inc.
`,
    name = "jquery.crossword",
    fileName=name,
    packageName =camelCase(name.replace("jquery","jq")),
    src = "./src/index.ts",
    external=["jquery","crossword-definition"],
    globals= {
        jquery: '$'
    };
export default [
    {
        input: src,
        output: {
            file: `dist/${name}.js`,
            name:name,
            format: 'umd',
            globals:globals
        },
        plugins: [
            typescript({
                typescript:require("typescript"),
            }),
            license({
                banner:banner
            })
        ],
        external:external
    },
    //min
    {
        input: src,
        output: {
            file: `dist/${name}.min.js`,
            name:name,
            format: 'umd',
            globals:globals
        },
        plugins: [
            typescript({
                typescript:require("typescript"),
            }),
            uglify(),
            license({
                banner:banner
            })
        ],
        external:external
    },
    //esm2015
    {
        input: src,
        output: {
            file: `esm2015/${fileName}.js`,
            name:packageName,
            format: 'es'
        },
        plugins: [
            typescript({
                typescript:require("typescript"),
                target:"es2015"
            }),
            license({
                banner:banner
            })
        ],
        external:external
    },
    //esm2015 min
    {
        input: src,
        output: {
            file: `esm2015/${fileName}.min.js`,
            name:packageName,
            format: 'es'
        },
        plugins: [
            typescript({
                typescript:require("typescript"),
                target:"es2015"
            }),
            uglifyEs(),
            license({
                banner:banner
            })
        ],
        external:external
    }
]