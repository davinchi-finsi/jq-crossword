const {
    FuseBox,
    QuantumPlugin
} = require("fuse-box");
const Sparky = require("fuse-box/sparky");
const extend = require("extend");
const path = require("path");
Sparky.context(class {
    getConfig(dist,es6) {
        return FuseBox.init({
            homeDir: "src",
            output: `${dist}/$name.js`,
            target: `browser@${es6 ? 'es2015' : 'es5'}`,
            cache:false,
            sourceMaps:!this.isProduction,
            globals: { 'default': '*' },
            plugins: [
                this.isProduction && QuantumPlugin({
                    containedAPI: true,
                    ensureES5: !es6,
                    uglify: this.isProduction,
                    bakeApiIntoBundle: "jq-crossword",
                    noConflictApi:true
                })
            ]
        });
    }
    createBundle(fuse) {
        const app = fuse.bundle("jq-crossword");
        if (!this.isProduction) {
            app.watch();
        }
        app.instructions(">[index.ts]");
        return app;
    }
    createES6Bundle(fuse) {
        const app = fuse.bundle("jq-crossword");
        if (!this.isProduction) {
            app.watch();
        }
        app.instructions(">[index.ts]");
        return app;
    }
});

Sparky.task("clean", async ()=> {
    await Sparky.src("dist").clean("dist").exec();
    await Sparky.src("esm2015").clean("esm2015").exec();
});

Sparky.task("default", ["clean"], context => {
    const fuse = context.getConfig("dist",false);
    context.createBundle(fuse);
    fuse.run();
});

Sparky.task("distES5",async context=>{
    context.isProduction = true;
    const fuse = context.getConfig("dist",false);
    context.createBundle(fuse);
    await fuse.run();
});
Sparky.task("distES2015",async context=>{
    context.isProduction = true;
    const fuse = context.getConfig("esm2015",true);
    context.createBundle(fuse);
    await fuse.run();
});

Sparky.task("dist", ["clean","distES5","distES2015"],async context=>{
});