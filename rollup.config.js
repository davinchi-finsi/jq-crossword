import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import license from 'rollup-plugin-license';
const banner=`@license <%= pkg.name %> v<%= pkg.version %>
(c) <%= moment().format('YYYY') %> Finsi, Inc.
`,
    name = "jquery.crossword",
    src = "./src/index.ts",
    externalModules=[
        "jquery",
        "jquery-ui",
        "jquery-ui-dist",
        "crossword-definition"
    ],
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
            typescript(),
            license({
                banner:banner
            })
        ],
        external:externalModules
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
            typescript(),
            uglify(),
            license({
                banner:banner
            })
        ],
        external:externalModules
    }
]