const typescript = require('rollup-plugin-typescript');
const uglify = require('rollup-plugin-uglify');
const uglifyEs = require("rollup-plugin-uglify-es");
const license = require('rollup-plugin-license');
const camelCase=  require("lodash.camelCase");
const banner=`@license <%= pkg.name %> v<%= pkg.version %>
(c) <%= moment().format('YYYY') %> Finsi, Inc.
`,
    name = "jquery.crossword",
    fileName=name,
    packageName =camelCase(name.replace("jquery","jq")),
    src = "./src/index.ts",
    external=(id)=>id.indexOf("node_modules")!=-1,
    globals= {
        jquery: '$'
    };
module.exports= [
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
];