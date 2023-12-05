import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import autoProcess from "svelte-preprocess";
import fs from "fs";

const production = !process.env.ROLLUP_WATCH;
const carLogoFiles = fs.readdirSync("./public/carlogos/images");
const planeMovieFiles = fs.readdirSync("./public/planemovies/images");
const sportsTwoFirstNames = fs.readdirSync("./public/sports-two-first-names/images");
const celebritySantas = fs.readdirSync("./public/celebrity-santas/images");
const stateFlags = fs.readdirSync("./public/state-flags/images");
const europeanOutlines = fs.readdirSync("./public/european-outlines/images");
const movieAliens = fs.readdirSync("./public/movie-aliens/images");
const stateOutlines = fs.readdirSync("./public/state-outlines/images");

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
                stdio: ["ignore", "inherit", "inherit"],
                shell: true,
            });

            process.on("SIGTERM", toExit);
            process.on("exit", toExit);
        },
    };
}

export default {
    input: "src/main.ts",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "public/build/bundle.js",
        intro: `
            const CAR_LOGO_FILES = ${JSON.stringify(carLogoFiles)};
            const PLANE_MOVIE_FILES = ${JSON.stringify(planeMovieFiles)};
            const SPORTS_TWO_FIRST_NAMES = ${JSON.stringify(sportsTwoFirstNames)};
            const CELEBRITY_SANTAS = ${JSON.stringify(celebritySantas)};
            const STATE_FLAG_FILES = ${JSON.stringify(stateFlags)};
            const EUROPEAN_OUTLINE_FILES = ${JSON.stringify(europeanOutlines)};
            const MOVIE_ALIENS_FILES = ${JSON.stringify(movieAliens)};
            const STATE_OUTLINES_FILES = ${JSON.stringify(stateOutlines)};
        `,
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess({
                preprocess: autoProcess(),
                sourceMap: !production,
            }),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
            },
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: "bundle.css" }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload("public"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};
