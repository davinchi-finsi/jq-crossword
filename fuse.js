const {
    FuseBox,
    QuantumPlugin
} = require("fuse-box");
const Sparky = require("fuse-box/sparky");
Sparky.context(class {
    getConfig() {
        this.fuse= FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target: "browser@es5",
            cache:false,
            sourceMaps:!this.isProduction,
            globals: { 'default': '*' },
            plugins: [
                this.isProduction && QuantumPlugin({
                    containedAPI: true,
                    ensureES5: true,
                    uglify: this.isProduction,
                    bakeApiIntoBundle: "jquery.crossword",
                    noConflictApi:true
                })
            ]
        });
        return this.fuse;
    }
    createBundle() {
        const app = this.fuse.bundle("jquery.crossword");
        if (!this.isProduction) {
            app.watch();
        }
        app.instructions(">[jquery.crossword.ts]");
        return app;
    }
    getTsConfig(){
        return require(path.resolve("src","tsconfig.json"));
    }
});

Sparky.task("clean", () => {
    Sparky.src("dist").clean("dist").exec();
    Sparky.src("esm2015").clean("esm2015").exec();
});

Sparky.task("default", ["clean"], context => {
    const fuse = context.getConfig();
    context.createBundle();
    fuse.run();
});

Sparky.task("dist", ["clean"],async context=>{
    context.isProduction = true;
    const fuse = context.getConfig();
    context.createBundle();
    await fuse.run();
});
