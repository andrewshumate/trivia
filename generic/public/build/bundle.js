
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    
                const CAR_LOGO_FILES = ["Acura.png","Alfa Romeo.png","Aston Martin.png","Audi.png","Bentley.png","BMW.png","Bugatti.png","Buick.png","Cadillac.png","Chevrolet,Chevy.png","Chrysler.png","Citroen.png","Daewoo.png","Daihatsu.png","Datsun.png","Ferrari.png","Fiat.png","Ford.png","Genesis,Hyundai Genesis.png","Holden.png","Honda.png","Hyundai.png","Infiniti.png","Jaguar.png","Kia.png","Koenigsegg.png","Lamborghini,Lambo.png","Land Rover.png","Lexus.png","Lincoln.png","Lotus.png","Maserati.png","Mazda.png","McLaren.png","Mercedes-Benz,Mercedes.png","Mercury.png","Mini.png","Mitsubishi.png","Nissan.png","Oldsmobile.png","Opel.png","Pagani.png","Peugeot.png","Pontiac.png","Porsche.png","Ram Trucks,RAM,Dodge RAM.png","Renault.png","Saab.png","Saturn.png","Scion.png","Seat.png","Skoda.png","Smart.png","Subaru.png","Suzuki.png","Tesla.png","Toyota.png","Volkswagen,VW.png","Volvo.png"];
                const PLANE_MOVIE_FILES = ["Air Force One.webp","Airplane.webp","Con Air.webp","Die Hard 2.webp","Final Destination.webp","Flight.webp","Flightplan.webp","Non-Stop.webp","Planes Trains and Automobiles.webp","Planes.webp","Red Eye.webp","Rescue Dawn.webp","Secondhand Lions.webp","Snakes on a Plane.webp","Sully.webp","The Aviator,Aviator.webp","Top Gun.webp","United 93.webp"];
            

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const areStringsSimilar = (s1, s2) => {
        const stringSimilarity = getStringSimilarity(standardizeString(s1), standardizeString(s2));
        return stringSimilarity >= 0.6;
    };
    const getStringSimilarity = (s1, s2) => {
        // If they don't start with the same letter, the guess is way off anyway
        if (s1[0] != s2[0])
            return 0;
        return 1 - (levenshteinDistance(s1, s2) * 1.0) / s1.length;
    };
    const standardizeString = (s) => {
        return s.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
    };
    /*
    MIT License

    Copyright (c) 2017 Gustaf Andersson

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    /* eslint-disable */
    const _min = (d0, d1, d2, bx, ay) => {
        return d0 < d1 || d2 < d1 ? (d0 > d2 ? d2 + 1 : d0 + 1) : bx === ay ? d1 : d1 + 1;
    };
    const levenshteinDistance = (a, b) => {
        if (a === b) {
            return 0;
        }
        if (a.length > b.length) {
            var tmp = a;
            a = b;
            b = tmp;
        }
        var la = a.length;
        var lb = b.length;
        while (la > 0 && a.charCodeAt(la - 1) === b.charCodeAt(lb - 1)) {
            la--;
            lb--;
        }
        var offset = 0;
        while (offset < la && a.charCodeAt(offset) === b.charCodeAt(offset)) {
            offset++;
        }
        la -= offset;
        lb -= offset;
        if (la === 0 || lb < 3) {
            return lb;
        }
        var x = 0;
        var y;
        var d0;
        var d1;
        var d2;
        var d3;
        var dd = 0;
        var dy;
        var ay;
        var bx0;
        var bx1;
        var bx2;
        var bx3;
        var vector = [];
        for (y = 0; y < la; y++) {
            vector.push(y + 1);
            vector.push(a.charCodeAt(offset + y));
        }
        var len = vector.length - 1;
        for (; x < lb - 3;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            bx1 = b.charCodeAt(offset + (d1 = x + 1));
            bx2 = b.charCodeAt(offset + (d2 = x + 2));
            bx3 = b.charCodeAt(offset + (d3 = x + 3));
            dd = x += 4;
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                ay = vector[y + 1];
                d0 = _min(dy, d0, d1, bx0, ay);
                d1 = _min(d0, d1, d2, bx1, ay);
                d2 = _min(d1, d2, d3, bx2, ay);
                dd = _min(d2, d3, dd, bx3, ay);
                vector[y] = dd;
                d3 = d2;
                d2 = d1;
                d1 = d0;
                d0 = dy;
            }
        }
        for (; x < lb;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            dd = ++x;
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
                d0 = dy;
            }
        }
        return dd;
    };

    var NflTeam;
    (function (NflTeam) {
        NflTeam[NflTeam["LAS_VEGAS_RAIDERS"] = 0] = "LAS_VEGAS_RAIDERS";
        NflTeam[NflTeam["KANSAS_CITY_CHIEFS"] = 1] = "KANSAS_CITY_CHIEFS";
        NflTeam[NflTeam["DALLAS_COWBOYS"] = 2] = "DALLAS_COWBOYS";
        NflTeam[NflTeam["CAROLINA_PANTHERS"] = 3] = "CAROLINA_PANTHERS";
        NflTeam[NflTeam["NEW_ORLEANS_SAINTS"] = 4] = "NEW_ORLEANS_SAINTS";
        NflTeam[NflTeam["DENVER_BRONCOS"] = 5] = "DENVER_BRONCOS";
        NflTeam[NflTeam["WASHINGTON_FOOTBALL_TEAM"] = 6] = "WASHINGTON_FOOTBALL_TEAM";
        NflTeam[NflTeam["CLEVELAND_BROWNS"] = 7] = "CLEVELAND_BROWNS";
        NflTeam[NflTeam["DETROIT_LIONS"] = 8] = "DETROIT_LIONS";
        NflTeam[NflTeam["NEW_ENGLAND_PATRIOTS"] = 9] = "NEW_ENGLAND_PATRIOTS";
        NflTeam[NflTeam["MIAMI_DOLPHINS"] = 10] = "MIAMI_DOLPHINS";
        NflTeam[NflTeam["PITTSBURGH_STEELERS"] = 11] = "PITTSBURGH_STEELERS";
        NflTeam[NflTeam["BUFFALO_BILLS"] = 12] = "BUFFALO_BILLS";
        NflTeam[NflTeam["GREEN_BAY_PACKERS"] = 13] = "GREEN_BAY_PACKERS";
        NflTeam[NflTeam["SAN_FRANCISCO_49ERS"] = 14] = "SAN_FRANCISCO_49ERS";
        NflTeam[NflTeam["PHILADELPHIA_EAGLES"] = 15] = "PHILADELPHIA_EAGLES";
        NflTeam[NflTeam["INDIANAPOLIS_COLTS"] = 16] = "INDIANAPOLIS_COLTS";
        NflTeam[NflTeam["SEATTLE_SEAHAWKS"] = 17] = "SEATTLE_SEAHAWKS";
        NflTeam[NflTeam["BALTIMORE_RAVENS"] = 18] = "BALTIMORE_RAVENS";
        NflTeam[NflTeam["ATLANTA_FALCONS"] = 19] = "ATLANTA_FALCONS";
        NflTeam[NflTeam["NEW_YORK_JETS"] = 20] = "NEW_YORK_JETS";
        NflTeam[NflTeam["NEW_YORK_GIANTS"] = 21] = "NEW_YORK_GIANTS";
        NflTeam[NflTeam["TENNESSEE_TITANS"] = 22] = "TENNESSEE_TITANS";
        NflTeam[NflTeam["HOUSTON_TEXANS"] = 23] = "HOUSTON_TEXANS";
        NflTeam[NflTeam["CINCINNATI_BENGALS"] = 24] = "CINCINNATI_BENGALS";
        NflTeam[NflTeam["TAMPA_BAY_BUCCANEERS"] = 25] = "TAMPA_BAY_BUCCANEERS";
        NflTeam[NflTeam["LOS_ANGELES_RAMS"] = 26] = "LOS_ANGELES_RAMS";
        NflTeam[NflTeam["LOS_ANGELES_CHARGERS"] = 27] = "LOS_ANGELES_CHARGERS";
        NflTeam[NflTeam["CHICAGO_BEARS"] = 28] = "CHICAGO_BEARS";
        NflTeam[NflTeam["ARIZONA_CARDINALS"] = 29] = "ARIZONA_CARDINALS";
        NflTeam[NflTeam["JACKSONVILLE_JAGUARS"] = 30] = "JACKSONVILLE_JAGUARS";
        NflTeam[NflTeam["MINNESOTA_VIKINGS"] = 31] = "MINNESOTA_VIKINGS";
        // Not really "teams", but we need to show them
        NflTeam[NflTeam["NFL_MEXICO_GAME"] = 32] = "NFL_MEXICO_GAME";
        NflTeam[NflTeam["HALL_OF_FAME_GAME"] = 33] = "HALL_OF_FAME_GAME";
        NflTeam[NflTeam["NFL_LONDON_GAME"] = 34] = "NFL_LONDON_GAME";
        NflTeam[NflTeam["NFL_LONDON_GAME2"] = 35] = "NFL_LONDON_GAME2";
    })(NflTeam || (NflTeam = {}));
    function getTeamInfo(teamName) {
        switch (teamName) {
            case NflTeam.LAS_VEGAS_RAIDERS:
                return {
                    stadiumNames: ["Allegiant Stadium", "Allegiant"],
                    cityNames: ["Paradise, Nevada"],
                    teamNames: ["Las Vegas Raiders", "Raiders"],
                };
            case NflTeam.KANSAS_CITY_CHIEFS:
                return {
                    stadiumNames: [
                        "Geha Field at Arrowhead Stadium",
                        "Geha Field",
                        "Arrowhead Stadium",
                        "Geha",
                        "Arrowhead",
                    ],
                    cityNames: ["Kansas City, Missouri"],
                    teamNames: ["Kansas City Chiefs", "Chiefs"],
                };
            case NflTeam.DALLAS_COWBOYS:
                return {
                    stadiumNames: ["AT&T Stadium", "AT&T"],
                    cityNames: ["Arlington, Texas"],
                    teamNames: ["Dallas Cowboys", "Cowboys"],
                };
            case NflTeam.CAROLINA_PANTHERS:
                return {
                    stadiumNames: ["Bank of America Stadium", "BOA stadium", "BOA", "Bank of America"],
                    cityNames: ["Charlotte, North Carolina"],
                    teamNames: ["Carolina Panthers", "Panthers"],
                };
            case NflTeam.NEW_ORLEANS_SAINTS:
                return {
                    stadiumNames: ["Caesars Superdome", "Superdome"],
                    cityNames: ["New Orleans, Louisiana"],
                    teamNames: ["New Orleans Saints", "Saints"],
                };
            case NflTeam.DENVER_BRONCOS:
                return {
                    stadiumNames: ["Empower Field at Mile High", "Mile High", "New Mile High", "Mile High Stadium"],
                    cityNames: ["Denver, Colorado"],
                    teamNames: ["Denver Broncos", "Broncos"],
                };
            case NflTeam.WASHINGTON_FOOTBALL_TEAM:
                return {
                    stadiumNames: ["FedExField", "FedEx"],
                    cityNames: ["Landover, Maryland"],
                    teamNames: ["Washington Football Team", "Washington Football Team"],
                };
            case NflTeam.CLEVELAND_BROWNS:
                return {
                    stadiumNames: ["FirstEnergy Stadium", "FirstEnergy"],
                    cityNames: ["Cleveland, Ohio"],
                    teamNames: ["Cleveland Browns", "Browns"],
                };
            case NflTeam.DETROIT_LIONS:
                return {
                    stadiumNames: ["Ford Field", "Ford"],
                    cityNames: ["Detroit, Michigan"],
                    teamNames: ["Detroit Lions", "Lions"],
                };
            case NflTeam.NEW_ENGLAND_PATRIOTS:
                return {
                    stadiumNames: ["Gillette Stadium", "Gillette"],
                    cityNames: ["Foxborough, Massachusetts"],
                    teamNames: ["New England Patriots", "Patriots"],
                };
            case NflTeam.MIAMI_DOLPHINS:
                return {
                    stadiumNames: ["Hard Rock Stadium", "Hard Rock"],
                    cityNames: ["Miami Gardens, Florida"],
                    teamNames: ["Miami Dolphins", "Dolphins"],
                };
            case NflTeam.PITTSBURGH_STEELERS:
                return {
                    stadiumNames: ["Heinz Field", "Heinz"],
                    cityNames: ["Pittsburgh, Pennsylvania"],
                    teamNames: ["Pittsburgh Steelers", "Steelers"],
                };
            case NflTeam.BUFFALO_BILLS:
                return {
                    stadiumNames: ["Highmark Stadium", "Highmark"],
                    cityNames: ["Orchard Park, New York"],
                    teamNames: ["Buffalo Bills", "Bills"],
                };
            case NflTeam.GREEN_BAY_PACKERS:
                return {
                    stadiumNames: ["Lambeau Field", "Lambeau"],
                    cityNames: ["Green Bay, Wisconsin"],
                    teamNames: ["Green Bay Packers", "Packers"],
                };
            case NflTeam.SAN_FRANCISCO_49ERS:
                return {
                    stadiumNames: ["Levi's Stadium", "Levi's"],
                    cityNames: ["Santa Clara, California"],
                    teamNames: ["San Francisco 49ers", "49ers"],
                };
            case NflTeam.PHILADELPHIA_EAGLES:
                return {
                    stadiumNames: ["Lincoln Financial Field", "Lincoln Financial", "Lincoln"],
                    cityNames: ["Philadelphia, Pennsylvania"],
                    teamNames: ["Philadelphia Eagles", "Eagles"],
                };
            case NflTeam.INDIANAPOLIS_COLTS:
                return {
                    stadiumNames: ["Lucas Oil Stadium", "Lucas Oil"],
                    cityNames: ["Indianapolis, Indiana"],
                    teamNames: ["Indianapolis Colts", "Colts"],
                };
            case NflTeam.SEATTLE_SEAHAWKS:
                return {
                    stadiumNames: ["Lumen Field", "Lumen"],
                    cityNames: ["Seattle, Washington"],
                    teamNames: ["Seattle Seahawks", "Seahawks"],
                };
            case NflTeam.BALTIMORE_RAVENS:
                return {
                    stadiumNames: ["M&T Bank Stadium", "M&T Bank"],
                    cityNames: ["Baltimore, Maryland"],
                    teamNames: ["Baltimore Ravens", "Ravens"],
                };
            case NflTeam.ATLANTA_FALCONS:
                return {
                    stadiumNames: ["Mercedes-Benz Stadium", "Mercedes", "Mercedes-Benz"],
                    cityNames: ["Atlanta, Georgia"],
                    teamNames: ["Atlanta Falcons", "Falcons"],
                };
            case NflTeam.NEW_YORK_GIANTS:
                return {
                    stadiumNames: ["MetLife Stadium", "MetLife"],
                    cityNames: ["East Rutherford, New Jersey"],
                    teamNames: ["New York Giants", "Giants"],
                };
            case NflTeam.NEW_YORK_JETS:
                return {
                    stadiumNames: ["MetLife Stadium", "MetLife"],
                    cityNames: ["East Rutherford, New Jersey"],
                    teamNames: ["New York Jets", "Jets"],
                };
            case NflTeam.TENNESSEE_TITANS:
                return {
                    stadiumNames: ["Nissan Stadium", "Nissan"],
                    cityNames: ["Nashville, Tennessee"],
                    teamNames: ["Tennessee Titans", "Titans"],
                };
            case NflTeam.HOUSTON_TEXANS:
                return {
                    stadiumNames: ["NRG Stadium", "NRG"],
                    cityNames: ["Houston, Texas"],
                    teamNames: ["Houston Texans", "Texans"],
                };
            case NflTeam.CINCINNATI_BENGALS:
                return {
                    stadiumNames: ["Paul Brown Stadium", "Paul Brown"],
                    cityNames: ["Cincinnati, Ohio"],
                    teamNames: ["Cincinnati Bengals", "Bengals"],
                };
            case NflTeam.TAMPA_BAY_BUCCANEERS:
                return {
                    stadiumNames: ["Raymond James Stadium", "Raymond James"],
                    cityNames: ["Tampa, Florida"],
                    teamNames: ["Tampa Bay Buccaneers", "Buccaneers"],
                };
            case NflTeam.LOS_ANGELES_RAMS:
                return {
                    stadiumNames: ["SoFi Stadium", "SoFi"],
                    cityNames: ["Inglewood, California"],
                    teamNames: ["Los Angeles Rams", "Rams"],
                };
            case NflTeam.LOS_ANGELES_CHARGERS:
                return {
                    stadiumNames: ["SoFi Stadium", "SoFi"],
                    cityNames: ["Inglewood, California"],
                    teamNames: ["Los Angeles Chargers", "Chargers"],
                };
            case NflTeam.CHICAGO_BEARS:
                return {
                    stadiumNames: ["Soldier Field", "Soldier"],
                    cityNames: ["Chicago, Illinois"],
                    teamNames: ["Chicago Bears", "Bears"],
                };
            case NflTeam.ARIZONA_CARDINALS:
                return {
                    stadiumNames: ["State Farm Stadium", "Start Farm"],
                    cityNames: ["Glendale, Arizona"],
                    teamNames: ["Arizona Cardinals", "Cardinals"],
                };
            case NflTeam.JACKSONVILLE_JAGUARS:
                return {
                    stadiumNames: ["TIAA Bank Field", "TIAA Bank", "TIAA"],
                    cityNames: ["Jacksonville, Florida"],
                    teamNames: ["Jacksonville Jaguars", "Jaguars"],
                };
            case NflTeam.MINNESOTA_VIKINGS:
                return {
                    stadiumNames: ["U.S. Bank Stadium", "U.S. Bank"],
                    cityNames: ["Minneapolis, Minnesota"],
                    teamNames: ["Minnesota Vikings", "Vikings"],
                };
            case NflTeam.NFL_MEXICO_GAME:
                return {
                    stadiumNames: ["Estadio Azteca"],
                    cityNames: ["Mexico City, Mexico"],
                    teamNames: ["NFL Mexico Games", "NFL Mexico Games"],
                };
            case NflTeam.HALL_OF_FAME_GAME:
                return {
                    stadiumNames: ["Tom Benson Hall of Fame Stadium", "Tom Benson Hall of Fame", "Tom Benson"],
                    cityNames: ["Canton Ohio"],
                    teamNames: ["Hall of Fame Games", "Hall of Fame Games"],
                };
            case NflTeam.NFL_LONDON_GAME:
                return {
                    stadiumNames: ["Wembley Stadium", "Wembley"],
                    cityNames: ["London, England"],
                    teamNames: ["old NFL London Games", "old NFL London Games"],
                };
            case NflTeam.NFL_LONDON_GAME2:
                return {
                    stadiumNames: ["Tottenham Hotspur Stadium", "Tottenham Hotspur"],
                    cityNames: ["London, England"],
                    teamNames: ["new NFL London Games", "new NFL London Games"],
                };
        }
    }
    const allKeys = Object.values(NflTeam).filter((x) => typeof x == "string");
    function x$2() {
        const result = new Map();
        for (let i = 0; i < allKeys.length; i++) {
            const team = NflTeam[allKeys[i]];
            const teamInfo = getTeamInfo(team);
            for (let j = 0; j < teamInfo.stadiumNames.length; j++) {
                result.set(standardizeString(teamInfo.stadiumNames[j]), teamInfo.stadiumNames[0]);
            }
        }
        return result;
    }
    const possibleGuessToOfficialGuess$2 = x$2();
    function guessToKeys(guess) {
        const result = [];
        for (let i = 0; i < allKeys.length; i++) {
            const team = NflTeam[allKeys[i]];
            const teamInfo = getTeamInfo(team);
            if (teamInfo.stadiumNames[0] === guess)
                result.push(allKeys[i]);
        }
        return result;
    }

    const shuffle = (array) => {
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const setStats = (key, wasGuessCorrect, guess, getOfficialGuess) => {
        const statsString = localStorage.getItem(key);
        const stats = statsString
            ? JSON.parse(statsString)
            : {
                numCorrectGuesses: 0,
                numIncorrectGuesses: 0,
                numTotalGuesses: 0,
                percentCorrect: 0.0,
                incorrectGuesses: [],
            };
        stats.numTotalGuesses += 1;
        if (wasGuessCorrect) {
            stats.numCorrectGuesses += 1;
        }
        else {
            stats.numIncorrectGuesses += 1;
            let standardizedGuess = getOfficialGuess(standardizeString(guess));
            if (standardizedGuess == null)
                standardizedGuess = guess.trim();
            if (standardizedGuess && !stats.incorrectGuesses.includes(standardizedGuess)) {
                stats.incorrectGuesses.push(standardizedGuess);
            }
        }
        stats.percentCorrect = stats.numCorrectGuesses / stats.numTotalGuesses;
        localStorage.setItem(key, JSON.stringify(stats));
    };
    const getStats = (key) => {
        const statsString = localStorage.getItem(key);
        if (statsString) {
            return JSON.parse(statsString);
        }
        else {
            return null;
        }
    };
    const getQuestionSetString = (triviaCategory) => {
        return localStorage.getItem(`${triviaCategory}-question-set`) || "All";
    };
    const getMode = () => {
        return localStorage.getItem("mode") || "Show unseen mode";
    };
    const getShouldReshowUnknown = () => {
        return localStorage.getItem("shouldReshowUnknown") !== "false";
    };

    var storage = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setStats: setStats,
        getStats: getStats,
        getQuestionSetString: getQuestionSetString,
        getMode: getMode,
        getShouldReshowUnknown: getShouldReshowUnknown
    });

    class QuestionSetHandler {
        constructor() {
            /**
             * Given a key `K`, returns a list [K, K_1, ..., K_n] where each
             * element is associated with K. Usually, this should just be [K],
             * but if there are multiple keys with the same value, this function
             * may be useful:
             * "Washington State" => "Olympia" (state capitals)
             * "New York Jets" -> ["New York Jets", "New York Giants"] (stadium names)
             */
            this.getAllAssociatedKeys = (key) => {
                return [key];
            };
            this.doesGuessExist = (guess) => {
                return this.allKeys.includes(guess);
            };
            this.getQuestionSet = (questionSetString) => {
                const questionSets = this.getQuestionSets();
                for (let i = 0; i < questionSets.length; i++) {
                    if (questionSetString === questionSets[i].description) {
                        return shuffle([...questionSets[i].questions]);
                    }
                }
                return shuffle([...questionSets[0].questions]);
            };
            /** Returns length of new eligible questions list */
            this.recalculateEligibleQuestions = () => {
                const mode = getMode();
                let questionSet = this.getQuestionSet(getQuestionSetString(this.triviaCategory));
                if (mode == "Show unseen mode") {
                    const seenQuestions = Object.keys(localStorage);
                    questionSet = questionSet.filter((question) => !seenQuestions.includes(question));
                }
                else if (mode == "Show unknown mode") {
                    questionSet = questionSet.filter((question) => {
                        const stats = getStats(question);
                        return stats ? stats.percentCorrect < 0.6 || stats.numCorrectGuesses < 2 : true;
                    });
                }
                if (questionSet.length == 0) {
                    const allQuestions = shuffle(this.getQuestionSet("All"));
                    questionSet = allQuestions;
                }
                this.eligibleQuestions = questionSet;
                this.numNonReshownQuestionsAnswered = -1;
                this.numAllQuestionsAnswered = -1;
                this.numEligibleQuestions = this.eligibleQuestions.length;
            };
            this.getNextQuestion = (currentQuestion) => {
                let result;
                if (this.numAllQuestionsAnswered % 5 == 0 &&
                    this.eligibleQuestions.length > 5 &&
                    getShouldReshowUnknown()) {
                    const questionSet = this.getQuestionSet(getQuestionSetString(this.triviaCategory));
                    for (let i = 0; i < questionSet.length; i++) {
                        const stats = getStats(questionSet[i]);
                        if (stats && questionSet[i] != currentQuestion && stats.percentCorrect < 0.6) {
                            result = questionSet[i];
                            this.numAllQuestionsAnswered++;
                            return result;
                        }
                    }
                }
                if (this.eligibleQuestions.length == 0)
                    this.recalculateEligibleQuestions();
                result = this.eligibleQuestions.pop();
                this.numNonReshownQuestionsAnswered = (this.numNonReshownQuestionsAnswered + 1) % this.numEligibleQuestions;
                this.numAllQuestionsAnswered++;
                return result;
            };
        }
    }

    const questionSetHandler$2 = new (class extends QuestionSetHandler {
        constructor() {
            super(...arguments);
            this.triviaCategory = "NFL stadiums";
            this.questionType = "Stadium";
            this.allKeys = allKeys;
            this.doesGuessExist = (guess) => {
                return this.getOfficialGuess(guess) != undefined;
            };
            this.getKeysFromGuess = (guess) => {
                const officializedGuess = this.getOfficialGuess(guess);
                if (officializedGuess) {
                    return guessToKeys(officializedGuess);
                }
                else {
                    return [];
                }
            };
            this.getAllAssociatedKeys = (key) => {
                if (key === "New York Jets" || key === "New York Giants") {
                    return ["New York Jets", "New York Giants"];
                }
                else if (key === "Los Angeles Rams" || key === "Los Angeles Chargers") {
                    return ["Los Angeles Rams", "Los Angeles Chargers"];
                }
                else {
                    return [key];
                }
            };
            this.isCorrectAnswer = (currentKey, userInput) => {
                const team = NflTeam[currentKey];
                const stadiumNames = getTeamInfo(team).stadiumNames;
                for (let i = 0; i < stadiumNames.length; i++) {
                    if (areStringsSimilar(stadiumNames[i], userInput))
                        return true;
                }
                return false;
            };
            this.getOfficialGuess = (guess) => {
                return possibleGuessToOfficialGuess$2.get(standardizeString(guess));
            };
            this.getQuestionSets = () => {
                return [
                    {
                        description: "All",
                        questions: this.allKeys,
                    },
                    {
                        description: "Additional stadiums",
                        questions: [
                            NflTeam.NFL_MEXICO_GAME,
                            NflTeam.HALL_OF_FAME_GAME,
                            NflTeam.NFL_LONDON_GAME,
                            NflTeam.NFL_LONDON_GAME2,
                        ].map((team) => NflTeam[team]),
                    },
                    {
                        description: "AFC",
                        questions: [
                            NflTeam.BUFFALO_BILLS,
                            NflTeam.MIAMI_DOLPHINS,
                            NflTeam.NEW_ENGLAND_PATRIOTS,
                            NflTeam.NEW_YORK_JETS,
                            NflTeam.BALTIMORE_RAVENS,
                            NflTeam.CINCINNATI_BENGALS,
                            NflTeam.CLEVELAND_BROWNS,
                            NflTeam.PITTSBURGH_STEELERS,
                            NflTeam.HOUSTON_TEXANS,
                            NflTeam.INDIANAPOLIS_COLTS,
                            NflTeam.JACKSONVILLE_JAGUARS,
                            NflTeam.TENNESSEE_TITANS,
                            NflTeam.DENVER_BRONCOS,
                            NflTeam.KANSAS_CITY_CHIEFS,
                            NflTeam.LAS_VEGAS_RAIDERS,
                            NflTeam.LOS_ANGELES_CHARGERS,
                        ].map((team) => NflTeam[team]),
                    },
                    {
                        description: "NFC",
                        questions: [
                            NflTeam.DALLAS_COWBOYS,
                            NflTeam.NEW_YORK_GIANTS,
                            NflTeam.PHILADELPHIA_EAGLES,
                            NflTeam.WASHINGTON_FOOTBALL_TEAM,
                            NflTeam.CHICAGO_BEARS,
                            NflTeam.DETROIT_LIONS,
                            NflTeam.GREEN_BAY_PACKERS,
                            NflTeam.MINNESOTA_VIKINGS,
                            NflTeam.ATLANTA_FALCONS,
                            NflTeam.CAROLINA_PANTHERS,
                            NflTeam.NEW_ORLEANS_SAINTS,
                            NflTeam.TAMPA_BAY_BUCCANEERS,
                            NflTeam.ARIZONA_CARDINALS,
                            NflTeam.LOS_ANGELES_RAMS,
                            NflTeam.SAN_FRANCISCO_49ERS,
                            NflTeam.SEATTLE_SEAHAWKS,
                        ].map((team) => NflTeam[team]),
                    },
                    {
                        description: "Banks",
                        questions: [
                            NflTeam.CAROLINA_PANTHERS,
                            NflTeam.BALTIMORE_RAVENS,
                            NflTeam.JACKSONVILLE_JAGUARS,
                            NflTeam.MINNESOTA_VIKINGS,
                        ].map((team) => NflTeam[team]),
                    },
                ];
            };
        }
    })();

    /* src\generic\Results.svelte generated by Svelte v3.44.2 */
    const file$7 = "src\\generic\\Results.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    const get_previous_answer_slot_changes$1 = dirty => ({
    	keys: dirty & /*questionSetHandler, stats*/ 9
    });

    const get_previous_answer_slot_context$1 = ctx => ({
    	keys: /*questionSetHandler*/ ctx[0].getKeysFromGuess(/*guess*/ ctx[7])
    });

    const get_answer_slot_changes_1 = dirty => ({
    	keys: dirty & /*questionSetHandler, currentKey*/ 5
    });

    const get_answer_slot_context_1 = ctx => ({
    	keys: /*questionSetHandler*/ ctx[0].getAllAssociatedKeys(/*currentKey*/ ctx[2])
    });

    const get_answer_slot_changes$1 = dirty => ({
    	keys: dirty & /*questionSetHandler, currentKey*/ 5
    });

    const get_answer_slot_context$1 = ctx => ({
    	keys: /*questionSetHandler*/ ctx[0].getAllAssociatedKeys(/*currentKey*/ ctx[2])
    });

    // (12:4) {:else}
    function create_else_block_1(ctx) {
    	let t;
    	let current;
    	const answer_slot_template = /*#slots*/ ctx[5].answer;
    	const answer_slot = create_slot(answer_slot_template, ctx, /*$$scope*/ ctx[4], get_answer_slot_context_1);

    	const block = {
    		c: function create() {
    			t = text("Wrong! ");
    			if (answer_slot) answer_slot.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);

    			if (answer_slot) {
    				answer_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (answer_slot) {
    				if (answer_slot.p && (!current || dirty & /*$$scope, questionSetHandler, currentKey*/ 21)) {
    					update_slot_base(
    						answer_slot,
    						answer_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(answer_slot_template, /*$$scope*/ ctx[4], dirty, get_answer_slot_changes_1),
    						get_answer_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(answer_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(answer_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (answer_slot) answer_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(12:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (10:4) {#if wasCorrectAnswer}
    function create_if_block_3(ctx) {
    	let t;
    	let current;
    	const answer_slot_template = /*#slots*/ ctx[5].answer;
    	const answer_slot = create_slot(answer_slot_template, ctx, /*$$scope*/ ctx[4], get_answer_slot_context$1);

    	const block = {
    		c: function create() {
    			t = text("Correct! ");
    			if (answer_slot) answer_slot.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);

    			if (answer_slot) {
    				answer_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (answer_slot) {
    				if (answer_slot.p && (!current || dirty & /*$$scope, questionSetHandler, currentKey*/ 21)) {
    					update_slot_base(
    						answer_slot,
    						answer_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(answer_slot_template, /*$$scope*/ ctx[4], dirty, get_answer_slot_changes$1),
    						get_answer_slot_context$1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(answer_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(answer_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (answer_slot) answer_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(10:4) {#if wasCorrectAnswer}",
    		ctx
    	});

    	return block;
    }

    // (19:4) {#if stats}
    function create_if_block$3(ctx) {
    	let t0;
    	let b0;
    	let t1_value = /*stats*/ ctx[3].numCorrectGuesses + "";
    	let t1;
    	let t2;
    	let t3_value = /*stats*/ ctx[3].numTotalGuesses + "";
    	let t3;
    	let t4;
    	let b1;
    	let t5_value = (/*stats*/ ctx[3].percentCorrect * 100).toFixed() + "";
    	let t5;
    	let t6;
    	let t7;
    	let if_block_anchor;
    	let current;
    	let if_block = /*stats*/ ctx[3].incorrectGuesses.length > 0 && create_if_block_1$3(ctx);

    	const block = {
    		c: function create() {
    			t0 = text("You've gotten this right ");
    			b0 = element("b");
    			t1 = text(t1_value);
    			t2 = text("/");
    			t3 = text(t3_value);
    			t4 = text("\r\n        (");
    			b1 = element("b");
    			t5 = text(t5_value);
    			t6 = text("%");
    			t7 = text(") times.\r\n        ");
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			add_location(b0, file$7, 19, 33, 643);
    			add_location(b1, file$7, 20, 9, 710);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, b0, anchor);
    			append_dev(b0, t1);
    			append_dev(b0, t2);
    			append_dev(b0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, b1, anchor);
    			append_dev(b1, t5);
    			append_dev(b1, t6);
    			insert_dev(target, t7, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*stats*/ 8) && t1_value !== (t1_value = /*stats*/ ctx[3].numCorrectGuesses + "")) set_data_dev(t1, t1_value);
    			if ((!current || dirty & /*stats*/ 8) && t3_value !== (t3_value = /*stats*/ ctx[3].numTotalGuesses + "")) set_data_dev(t3, t3_value);
    			if ((!current || dirty & /*stats*/ 8) && t5_value !== (t5_value = (/*stats*/ ctx[3].percentCorrect * 100).toFixed() + "")) set_data_dev(t5, t5_value);

    			if (/*stats*/ ctx[3].incorrectGuesses.length > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*stats*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(b0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(b1);
    			if (detaching) detach_dev(t7);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(19:4) {#if stats}",
    		ctx
    	});

    	return block;
    }

    // (22:8) {#if stats.incorrectGuesses.length > 0}
    function create_if_block_1$3(ctx) {
    	let t;
    	let ul;
    	let current;
    	let each_value = /*stats*/ ctx[3].incorrectGuesses;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			t = text("Previous guesses:\r\n            ");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(ul, file$7, 23, 12, 860);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$$scope, questionSetHandler, stats*/ 25) {
    				each_value = /*stats*/ ctx[3].incorrectGuesses;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(22:8) {#if stats.incorrectGuesses.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (30:20) {:else}
    function create_else_block$2(ctx) {
    	let li;
    	let t0_value = /*guess*/ ctx[7] + "";
    	let t0;
    	let t1;
    	let t2_value = /*questionSetHandler*/ ctx[0].questionType.toLowerCase() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = text(" (not a ");
    			t2 = text(t2_value);
    			t3 = text(")");
    			add_location(li, file$7, 30, 24, 1216);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    			append_dev(li, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stats*/ 8 && t0_value !== (t0_value = /*guess*/ ctx[7] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*questionSetHandler*/ 1 && t2_value !== (t2_value = /*questionSetHandler*/ ctx[0].questionType.toLowerCase() + "")) set_data_dev(t2, t2_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(30:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (26:20) {#if questionSetHandler.doesGuessExist(guess)}
    function create_if_block_2(ctx) {
    	let li;
    	let t;
    	let current;
    	const previous_answer_slot_template = /*#slots*/ ctx[5]["previous-answer"];
    	const previous_answer_slot = create_slot(previous_answer_slot_template, ctx, /*$$scope*/ ctx[4], get_previous_answer_slot_context$1);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (previous_answer_slot) previous_answer_slot.c();
    			t = space();
    			add_location(li, file$7, 26, 24, 1015);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);

    			if (previous_answer_slot) {
    				previous_answer_slot.m(li, null);
    			}

    			append_dev(li, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (previous_answer_slot) {
    				if (previous_answer_slot.p && (!current || dirty & /*$$scope, questionSetHandler, stats*/ 25)) {
    					update_slot_base(
    						previous_answer_slot,
    						previous_answer_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(previous_answer_slot_template, /*$$scope*/ ctx[4], dirty, get_previous_answer_slot_changes$1),
    						get_previous_answer_slot_context$1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(previous_answer_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(previous_answer_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (previous_answer_slot) previous_answer_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(26:20) {#if questionSetHandler.doesGuessExist(guess)}",
    		ctx
    	});

    	return block;
    }

    // (25:16) {#each stats.incorrectGuesses as guess}
    function create_each_block$2(ctx) {
    	let show_if;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (show_if == null || dirty & /*questionSetHandler, stats*/ 9) show_if = !!/*questionSetHandler*/ ctx[0].doesGuessExist(/*guess*/ ctx[7]);
    		if (show_if) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx, -1);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(25:16) {#each stats.incorrectGuesses as guess}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let p;
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let button;
    	let t2;
    	let section;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_3, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*wasCorrectAnswer*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = /*stats*/ ctx[3] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if_block0.c();
    			t0 = space();
    			button = element("button");
    			button.textContent = "Next";
    			t2 = space();
    			section = element("section");
    			if (if_block1) if_block1.c();
    			attr_dev(p, "id", "results");
    			attr_dev(p, "class", "svelte-19sgwjq");
    			add_location(p, file$7, 8, 0, 189);
    			attr_dev(button, "id", "next-button");
    			button.autofocus = true;
    			add_location(button, file$7, 16, 0, 502);
    			attr_dev(section, "id", "additional-info");
    			attr_dev(section, "class", "svelte-19sgwjq");
    			add_location(section, file$7, 17, 0, 561);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			if_blocks[current_block_type_index].m(p, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, section, anchor);
    			if (if_block1) if_block1.m(section, null);
    			current = true;
    			button.focus();

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				} else {
    					if_block0.p(ctx, dirty);
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(p, null);
    			}

    			if (/*stats*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*stats*/ 8) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(section, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if_blocks[current_block_type_index].d();
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(section);
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Results', slots, ['answer','previous-answer']);
    	let { questionSetHandler } = $$props;
    	let { wasCorrectAnswer } = $$props;
    	let { currentKey } = $$props;
    	let { stats } = $$props;
    	const writable_props = ['questionSetHandler', 'wasCorrectAnswer', 'currentKey', 'stats'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Results> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('questionSetHandler' in $$props) $$invalidate(0, questionSetHandler = $$props.questionSetHandler);
    		if ('wasCorrectAnswer' in $$props) $$invalidate(1, wasCorrectAnswer = $$props.wasCorrectAnswer);
    		if ('currentKey' in $$props) $$invalidate(2, currentKey = $$props.currentKey);
    		if ('stats' in $$props) $$invalidate(3, stats = $$props.stats);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		questionSetHandler,
    		wasCorrectAnswer,
    		currentKey,
    		stats
    	});

    	$$self.$inject_state = $$props => {
    		if ('questionSetHandler' in $$props) $$invalidate(0, questionSetHandler = $$props.questionSetHandler);
    		if ('wasCorrectAnswer' in $$props) $$invalidate(1, wasCorrectAnswer = $$props.wasCorrectAnswer);
    		if ('currentKey' in $$props) $$invalidate(2, currentKey = $$props.currentKey);
    		if ('stats' in $$props) $$invalidate(3, stats = $$props.stats);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		questionSetHandler,
    		wasCorrectAnswer,
    		currentKey,
    		stats,
    		$$scope,
    		slots,
    		click_handler
    	];
    }

    class Results extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			questionSetHandler: 0,
    			wasCorrectAnswer: 1,
    			currentKey: 2,
    			stats: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Results",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*questionSetHandler*/ ctx[0] === undefined && !('questionSetHandler' in props)) {
    			console.warn("<Results> was created without expected prop 'questionSetHandler'");
    		}

    		if (/*wasCorrectAnswer*/ ctx[1] === undefined && !('wasCorrectAnswer' in props)) {
    			console.warn("<Results> was created without expected prop 'wasCorrectAnswer'");
    		}

    		if (/*currentKey*/ ctx[2] === undefined && !('currentKey' in props)) {
    			console.warn("<Results> was created without expected prop 'currentKey'");
    		}

    		if (/*stats*/ ctx[3] === undefined && !('stats' in props)) {
    			console.warn("<Results> was created without expected prop 'stats'");
    		}
    	}

    	get questionSetHandler() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set questionSetHandler(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wasCorrectAnswer() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wasCorrectAnswer(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentKey() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentKey(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stats() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stats(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\generic\Settings.svelte generated by Svelte v3.44.2 */
    const file$6 = "src\\generic\\Settings.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (25:8) {#each questionSetHandler.getQuestionSets() as questionSet}
    function create_each_block$1(ctx) {
    	let label;
    	let input;
    	let input_id_value;
    	let input_value_value;
    	let t0;
    	let t1_value = /*questionSet*/ ctx[14].description + "";
    	let t1;
    	let t2;
    	let t3_value = /*questionSet*/ ctx[14].questions.length + "";
    	let t3;
    	let t4;
    	let label_for_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = text(" (");
    			t3 = text(t3_value);
    			t4 = text(")");
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "id", input_id_value = /*questionSet*/ ctx[14].description);
    			attr_dev(input, "name", "question-set");
    			input.__value = input_value_value = /*questionSet*/ ctx[14].description;
    			input.value = input.__value;
    			attr_dev(input, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[6][0].push(input);
    			add_location(input, file$6, 26, 16, 1245);
    			attr_dev(label, "for", label_for_value = /*questionSet*/ ctx[14].description);
    			attr_dev(label, "class", "svelte-1tmq7vv");
    			add_location(label, file$6, 25, 12, 1190);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = input.__value === /*questionSetValue*/ ctx[1];
    			append_dev(label, t0);
    			append_dev(label, t1);
    			append_dev(label, t2);
    			append_dev(label, t3);
    			append_dev(label, t4);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[5]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*questionSetHandler*/ 1 && input_id_value !== (input_id_value = /*questionSet*/ ctx[14].description)) {
    				attr_dev(input, "id", input_id_value);
    			}

    			if (dirty & /*questionSetHandler*/ 1 && input_value_value !== (input_value_value = /*questionSet*/ ctx[14].description)) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    			}

    			if (dirty & /*questionSetValue*/ 2) {
    				input.checked = input.__value === /*questionSetValue*/ ctx[1];
    			}

    			if (dirty & /*questionSetHandler*/ 1 && t1_value !== (t1_value = /*questionSet*/ ctx[14].description + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*questionSetHandler*/ 1 && t3_value !== (t3_value = /*questionSet*/ ctx[14].questions.length + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*questionSetHandler*/ 1 && label_for_value !== (label_for_value = /*questionSet*/ ctx[14].description)) {
    				attr_dev(label, "for", label_for_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			/*$$binding_groups*/ ctx[6][0].splice(/*$$binding_groups*/ ctx[6][0].indexOf(input), 1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(25:8) {#each questionSetHandler.getQuestionSets() as questionSet}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let section;
    	let form;
    	let p0;
    	let b0;
    	let t1;
    	let t2;
    	let p1;
    	let b1;
    	let t4;
    	let label0;
    	let input0;
    	let t5;
    	let t6;
    	let label1;
    	let input1;
    	let t7;
    	let t8;
    	let label2;
    	let input2;
    	let t9;
    	let t10;
    	let p2;
    	let b2;
    	let t12;
    	let label3;
    	let input3;
    	let t13;
    	let t14;
    	let button;
    	let mounted;
    	let dispose;
    	let each_value = /*questionSetHandler*/ ctx[0].getQuestionSets();
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			form = element("form");
    			p0 = element("p");
    			b0 = element("b");
    			b0.textContent = "Question set";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			p1 = element("p");
    			b1 = element("b");
    			b1.textContent = "Filter out";
    			t4 = space();
    			label0 = element("label");
    			input0 = element("input");
    			t5 = text("\r\n            Do not hide any questions");
    			t6 = space();
    			label1 = element("label");
    			input1 = element("input");
    			t7 = text("\r\n            Hide questions I've already seen");
    			t8 = space();
    			label2 = element("label");
    			input2 = element("input");
    			t9 = text("\r\n            Hide questions I've gotten right >60% of the time");
    			t10 = space();
    			p2 = element("p");
    			b2 = element("b");
    			b2.textContent = "Extra settings";
    			t12 = space();
    			label3 = element("label");
    			input3 = element("input");
    			t13 = text("\r\n            Show questions I've gotten wrong more often");
    			t14 = space();
    			button = element("button");
    			button.textContent = "Exit";
    			add_location(b0, file$6, 23, 37, 1084);
    			attr_dev(p0, "class", "settings-category svelte-1tmq7vv");
    			add_location(p0, file$6, 23, 8, 1055);
    			add_location(b1, file$6, 38, 37, 1700);
    			attr_dev(p1, "class", "settings-category svelte-1tmq7vv");
    			add_location(p1, file$6, 38, 8, 1671);
    			attr_dev(input0, "type", "radio");
    			attr_dev(input0, "id", "show-all-mode");
    			attr_dev(input0, "name", "mode");
    			input0.__value = "Show all mode";
    			input0.value = input0.__value;
    			attr_dev(input0, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[6][1].push(input0);
    			add_location(input0, file$6, 40, 12, 1772);
    			attr_dev(label0, "for", "show-all-mode");
    			attr_dev(label0, "class", "svelte-1tmq7vv");
    			add_location(label0, file$6, 39, 8, 1731);
    			attr_dev(input1, "type", "radio");
    			attr_dev(input1, "id", "show-unseen-mode");
    			attr_dev(input1, "name", "mode");
    			input1.__value = "Show unseen mode";
    			input1.value = input1.__value;
    			attr_dev(input1, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[6][1].push(input1);
    			add_location(input1, file$6, 50, 12, 2090);
    			attr_dev(label1, "for", "show-unseen-mode");
    			attr_dev(label1, "class", "svelte-1tmq7vv");
    			add_location(label1, file$6, 49, 8, 2046);
    			attr_dev(input2, "type", "radio");
    			attr_dev(input2, "id", "show-unknown-mode");
    			attr_dev(input2, "name", "mode");
    			input2.__value = "Show unknown mode";
    			input2.value = input2.__value;
    			attr_dev(input2, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[6][1].push(input2);
    			add_location(input2, file$6, 60, 12, 2422);
    			attr_dev(label2, "for", "show-unknown-mode");
    			attr_dev(label2, "class", "svelte-1tmq7vv");
    			add_location(label2, file$6, 59, 8, 2377);
    			add_location(b2, file$6, 70, 37, 2759);
    			attr_dev(p2, "class", "settings-category svelte-1tmq7vv");
    			add_location(p2, file$6, 70, 8, 2730);
    			attr_dev(input3, "type", "checkbox");
    			attr_dev(input3, "id", "reshow-unknown");
    			attr_dev(input3, "name", "reshow-unknwon");
    			input3.__value = "Re-show unknown";
    			input3.value = input3.__value;
    			attr_dev(input3, "class", "svelte-1tmq7vv");
    			add_location(input3, file$6, 72, 12, 2836);
    			attr_dev(label3, "for", "reshow-unknown");
    			attr_dev(label3, "class", "svelte-1tmq7vv");
    			add_location(label3, file$6, 71, 8, 2794);
    			attr_dev(button, "id", "exit");
    			add_location(button, file$6, 81, 8, 3141);
    			attr_dev(form, "class", "svelte-1tmq7vv");
    			add_location(form, file$6, 22, 4, 1039);
    			attr_dev(section, "id", "settings-section");
    			attr_dev(section, "class", "svelte-1tmq7vv");
    			add_location(section, file$6, 21, 0, 1002);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, form);
    			append_dev(form, p0);
    			append_dev(p0, b0);
    			append_dev(form, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(form, null);
    			}

    			append_dev(form, t2);
    			append_dev(form, p1);
    			append_dev(p1, b1);
    			append_dev(form, t4);
    			append_dev(form, label0);
    			append_dev(label0, input0);
    			input0.checked = input0.__value === /*questionsToFilterOut*/ ctx[2];
    			append_dev(label0, t5);
    			append_dev(form, t6);
    			append_dev(form, label1);
    			append_dev(label1, input1);
    			input1.checked = input1.__value === /*questionsToFilterOut*/ ctx[2];
    			append_dev(label1, t7);
    			append_dev(form, t8);
    			append_dev(form, label2);
    			append_dev(label2, input2);
    			input2.checked = input2.__value === /*questionsToFilterOut*/ ctx[2];
    			append_dev(label2, t9);
    			append_dev(form, t10);
    			append_dev(form, p2);
    			append_dev(p2, b2);
    			append_dev(form, t12);
    			append_dev(form, label3);
    			append_dev(label3, input3);
    			input3.checked = /*reshowQuestions*/ ctx[3];
    			append_dev(label3, t13);
    			append_dev(form, t14);
    			append_dev(form, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*input0_change_handler*/ ctx[7]),
    					listen_dev(input1, "change", /*input1_change_handler*/ ctx[8]),
    					listen_dev(input2, "change", /*input2_change_handler*/ ctx[9]),
    					listen_dev(input3, "change", /*input3_change_handler*/ ctx[10]),
    					listen_dev(button, "click", prevent_default(/*handleSaveSettings*/ ctx[4]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*questionSetHandler, questionSetValue*/ 3) {
    				each_value = /*questionSetHandler*/ ctx[0].getQuestionSets();
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(form, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*questionsToFilterOut*/ 4) {
    				input0.checked = input0.__value === /*questionsToFilterOut*/ ctx[2];
    			}

    			if (dirty & /*questionsToFilterOut*/ 4) {
    				input1.checked = input1.__value === /*questionsToFilterOut*/ ctx[2];
    			}

    			if (dirty & /*questionsToFilterOut*/ 4) {
    				input2.checked = input2.__value === /*questionsToFilterOut*/ ctx[2];
    			}

    			if (dirty & /*reshowQuestions*/ 8) {
    				input3.checked = /*reshowQuestions*/ ctx[3];
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			/*$$binding_groups*/ ctx[6][1].splice(/*$$binding_groups*/ ctx[6][1].indexOf(input0), 1);
    			/*$$binding_groups*/ ctx[6][1].splice(/*$$binding_groups*/ ctx[6][1].indexOf(input1), 1);
    			/*$$binding_groups*/ ctx[6][1].splice(/*$$binding_groups*/ ctx[6][1].indexOf(input2), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Settings', slots, []);
    	let { questionSetHandler } = $$props;
    	let dispatch = createEventDispatcher();
    	let oldQuestionSet = getQuestionSetString(questionSetHandler.triviaCategory);
    	let oldQuestionsToFilterOut = getMode();
    	let questionSetValue = oldQuestionSet;
    	let questionsToFilterOut = oldQuestionsToFilterOut;
    	let reshowQuestions = getShouldReshowUnknown();

    	const handleSaveSettings = () => {
    		const wasSettingsUpdated = questionSetValue != oldQuestionSet || questionsToFilterOut != oldQuestionsToFilterOut;

    		if (wasSettingsUpdated) {
    			localStorage.setItem(`${questionSetHandler.triviaCategory}-question-set`, questionSetValue);
    			localStorage.setItem("mode", questionsToFilterOut);
    		}

    		localStorage.setItem("shouldReshowUnknown", reshowQuestions.toString());
    		dispatch("settingsClosed", wasSettingsUpdated);
    	};

    	const writable_props = ['questionSetHandler'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[], []];

    	function input_change_handler() {
    		questionSetValue = this.__value;
    		$$invalidate(1, questionSetValue);
    	}

    	function input0_change_handler() {
    		questionsToFilterOut = this.__value;
    		$$invalidate(2, questionsToFilterOut);
    	}

    	function input1_change_handler() {
    		questionsToFilterOut = this.__value;
    		$$invalidate(2, questionsToFilterOut);
    	}

    	function input2_change_handler() {
    		questionsToFilterOut = this.__value;
    		$$invalidate(2, questionsToFilterOut);
    	}

    	function input3_change_handler() {
    		reshowQuestions = this.checked;
    		$$invalidate(3, reshowQuestions);
    	}

    	$$self.$$set = $$props => {
    		if ('questionSetHandler' in $$props) $$invalidate(0, questionSetHandler = $$props.questionSetHandler);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		storage,
    		questionSetHandler,
    		dispatch,
    		oldQuestionSet,
    		oldQuestionsToFilterOut,
    		questionSetValue,
    		questionsToFilterOut,
    		reshowQuestions,
    		handleSaveSettings
    	});

    	$$self.$inject_state = $$props => {
    		if ('questionSetHandler' in $$props) $$invalidate(0, questionSetHandler = $$props.questionSetHandler);
    		if ('dispatch' in $$props) dispatch = $$props.dispatch;
    		if ('oldQuestionSet' in $$props) oldQuestionSet = $$props.oldQuestionSet;
    		if ('oldQuestionsToFilterOut' in $$props) oldQuestionsToFilterOut = $$props.oldQuestionsToFilterOut;
    		if ('questionSetValue' in $$props) $$invalidate(1, questionSetValue = $$props.questionSetValue);
    		if ('questionsToFilterOut' in $$props) $$invalidate(2, questionsToFilterOut = $$props.questionsToFilterOut);
    		if ('reshowQuestions' in $$props) $$invalidate(3, reshowQuestions = $$props.reshowQuestions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		questionSetHandler,
    		questionSetValue,
    		questionsToFilterOut,
    		reshowQuestions,
    		handleSaveSettings,
    		input_change_handler,
    		$$binding_groups,
    		input0_change_handler,
    		input1_change_handler,
    		input2_change_handler,
    		input3_change_handler
    	];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { questionSetHandler: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*questionSetHandler*/ ctx[0] === undefined && !('questionSetHandler' in props)) {
    			console.warn("<Settings> was created without expected prop 'questionSetHandler'");
    		}
    	}

    	get questionSetHandler() {
    		throw new Error("<Settings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set questionSetHandler(value) {
    		throw new Error("<Settings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\generic\TopBar.svelte generated by Svelte v3.44.2 */

    const file$5 = "src\\generic\\TopBar.svelte";

    function create_fragment$5(ctx) {
    	let section;
    	let p;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let svg;
    	let g;
    	let path0;
    	let path1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			p = element("p");
    			t0 = text(/*numQuestionsAnswered*/ ctx[0]);
    			t1 = text("/");
    			t2 = text(/*numEligibleQuestions*/ ctx[1]);
    			t3 = space();
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(p, "id", "counter");
    			attr_dev(p, "class", "svelte-1kqorct");
    			add_location(p, file$5, 5, 4, 127);
    			attr_dev(path0, "d", "M0,0h24v24H0V0z");
    			attr_dev(path0, "fill", "none");
    			add_location(path0, file$5, 9, 12, 307);
    			attr_dev(path1, "d", "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z");
    			add_location(path1, file$5, 10, 12, 361);
    			add_location(g, file$5, 8, 8, 290);
    			attr_dev(svg, "id", "settings-icon");
    			attr_dev(svg, "height", "24px");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "width", "24px");
    			attr_dev(svg, "class", "svelte-1kqorct");
    			add_location(svg, file$5, 7, 4, 200);
    			attr_dev(section, "id", "top-bar");
    			attr_dev(section, "class", "svelte-1kqorct");
    			add_location(section, file$5, 4, 0, 99);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(section, t3);
    			append_dev(section, svg);
    			append_dev(svg, g);
    			append_dev(g, path0);
    			append_dev(g, path1);

    			if (!mounted) {
    				dispose = listen_dev(svg, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*numQuestionsAnswered*/ 1) set_data_dev(t0, /*numQuestionsAnswered*/ ctx[0]);
    			if (dirty & /*numEligibleQuestions*/ 2) set_data_dev(t2, /*numEligibleQuestions*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TopBar', slots, []);
    	let { numQuestionsAnswered } = $$props;
    	let { numEligibleQuestions } = $$props;
    	const writable_props = ['numQuestionsAnswered', 'numEligibleQuestions'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopBar> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('numQuestionsAnswered' in $$props) $$invalidate(0, numQuestionsAnswered = $$props.numQuestionsAnswered);
    		if ('numEligibleQuestions' in $$props) $$invalidate(1, numEligibleQuestions = $$props.numEligibleQuestions);
    	};

    	$$self.$capture_state = () => ({
    		numQuestionsAnswered,
    		numEligibleQuestions
    	});

    	$$self.$inject_state = $$props => {
    		if ('numQuestionsAnswered' in $$props) $$invalidate(0, numQuestionsAnswered = $$props.numQuestionsAnswered);
    		if ('numEligibleQuestions' in $$props) $$invalidate(1, numEligibleQuestions = $$props.numEligibleQuestions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [numQuestionsAnswered, numEligibleQuestions, click_handler];
    }

    class TopBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			numQuestionsAnswered: 0,
    			numEligibleQuestions: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TopBar",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*numQuestionsAnswered*/ ctx[0] === undefined && !('numQuestionsAnswered' in props)) {
    			console.warn("<TopBar> was created without expected prop 'numQuestionsAnswered'");
    		}

    		if (/*numEligibleQuestions*/ ctx[1] === undefined && !('numEligibleQuestions' in props)) {
    			console.warn("<TopBar> was created without expected prop 'numEligibleQuestions'");
    		}
    	}

    	get numQuestionsAnswered() {
    		throw new Error("<TopBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set numQuestionsAnswered(value) {
    		throw new Error("<TopBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get numEligibleQuestions() {
    		throw new Error("<TopBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set numEligibleQuestions(value) {
    		throw new Error("<TopBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\generic\Content.svelte generated by Svelte v3.44.2 */
    const file$4 = "src\\generic\\Content.svelte";
    const get_answer_slot_changes = dirty => ({ currentKey: dirty & /*keys*/ 32768 });

    const get_answer_slot_context = ctx => ({
    	slot: "answer",
    	currentKey: /*keys*/ ctx[15]
    });

    const get_previous_answer_slot_changes = dirty => ({ currentKey: dirty & /*keys*/ 32768 });

    const get_previous_answer_slot_context = ctx => ({
    	slot: "previous-answer",
    	currentKey: /*keys*/ ctx[15]
    });

    const get_question_slot_changes = dirty => ({ currentKey: dirty & /*currentKey*/ 8 });

    const get_question_slot_context = ctx => ({
    	currentKey: /*currentKey*/ ctx[3],
    	isResult: false
    });

    // (47:0) {#if showSettings}
    function create_if_block_1$2(ctx) {
    	let settings;
    	let current;

    	settings = new Settings({
    			props: {
    				questionSetHandler: /*questionSetHandler*/ ctx[0]
    			},
    			$$inline: true
    		});

    	settings.$on("settingsClosed", /*handleSettingsClosed*/ ctx[10]);

    	const block = {
    		c: function create() {
    			create_component(settings.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(settings, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const settings_changes = {};
    			if (dirty & /*questionSetHandler*/ 1) settings_changes.questionSetHandler = /*questionSetHandler*/ ctx[0];
    			settings.$set(settings_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(settings.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(settings.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(settings, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(47:0) {#if showSettings}",
    		ctx
    	});

    	return block;
    }

    // (63:4) {:else}
    function create_else_block$1(ctx) {
    	let form;
    	let input;
    	let input_title_value;
    	let t0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			form = element("form");
    			input = element("input");
    			t0 = space();
    			button = element("button");
    			button.textContent = "Submit";
    			attr_dev(input, "type", "text");
    			attr_dev(input, "id", "input");
    			attr_dev(input, "title", input_title_value = "Guess the " + /*questionSetHandler*/ ctx[0].questionType.toLowerCase());
    			attr_dev(input, "autocomplete", "off");
    			input.autofocus = true;
    			attr_dev(input, "class", "svelte-knh1ca");
    			add_location(input, file$4, 65, 12, 2371);
    			attr_dev(button, "id", "submit-button");
    			add_location(button, file$4, 72, 12, 2610);
    			add_location(form, file$4, 64, 8, 2311);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, input);
    			append_dev(form, t0);
    			append_dev(form, button);
    			input.focus();

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[9]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*questionSetHandler*/ 1 && input_title_value !== (input_title_value = "Guess the " + /*questionSetHandler*/ ctx[0].questionType.toLowerCase())) {
    				attr_dev(input, "title", input_title_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(63:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (58:4) {#if showResults}
    function create_if_block$2(ctx) {
    	let results;
    	let current;

    	results = new Results({
    			props: {
    				questionSetHandler: /*questionSetHandler*/ ctx[0],
    				wasCorrectAnswer: /*wasCorrectAnswer*/ ctx[7],
    				currentKey: /*currentKey*/ ctx[3],
    				stats: /*stats*/ ctx[6],
    				$$slots: {
    					"previous-answer": [
    						create_previous_answer_slot$3,
    						({ keys }) => ({ 15: keys }),
    						({ keys }) => keys ? 32768 : 0
    					],
    					answer: [
    						create_answer_slot$3,
    						({ keys }) => ({ 15: keys }),
    						({ keys }) => keys ? 32768 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	results.$on("click", /*handleNext*/ ctx[8]);

    	const block = {
    		c: function create() {
    			create_component(results.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(results, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const results_changes = {};
    			if (dirty & /*questionSetHandler*/ 1) results_changes.questionSetHandler = /*questionSetHandler*/ ctx[0];
    			if (dirty & /*wasCorrectAnswer*/ 128) results_changes.wasCorrectAnswer = /*wasCorrectAnswer*/ ctx[7];
    			if (dirty & /*currentKey*/ 8) results_changes.currentKey = /*currentKey*/ ctx[3];
    			if (dirty & /*stats*/ 64) results_changes.stats = /*stats*/ ctx[6];

    			if (dirty & /*$$scope, keys*/ 40960) {
    				results_changes.$$scope = { dirty, ctx };
    			}

    			results.$set(results_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(results.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(results.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(results, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(58:4) {#if showResults}",
    		ctx
    	});

    	return block;
    }

    // (60:12) 
    function create_answer_slot$3(ctx) {
    	let current;
    	const answer_slot_template = /*#slots*/ ctx[12].answer;
    	const answer_slot = create_slot(answer_slot_template, ctx, /*$$scope*/ ctx[13], get_answer_slot_context);

    	const block = {
    		c: function create() {
    			if (answer_slot) answer_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (answer_slot) {
    				answer_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (answer_slot) {
    				if (answer_slot.p && (!current || dirty & /*$$scope, keys*/ 40960)) {
    					update_slot_base(
    						answer_slot,
    						answer_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(answer_slot_template, /*$$scope*/ ctx[13], dirty, get_answer_slot_changes),
    						get_answer_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(answer_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(answer_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (answer_slot) answer_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_answer_slot$3.name,
    		type: "slot",
    		source: "(60:12) ",
    		ctx
    	});

    	return block;
    }

    // (61:12) 
    function create_previous_answer_slot$3(ctx) {
    	let current;
    	const previous_answer_slot_template = /*#slots*/ ctx[12]["previous-answer"];
    	const previous_answer_slot = create_slot(previous_answer_slot_template, ctx, /*$$scope*/ ctx[13], get_previous_answer_slot_context);

    	const block = {
    		c: function create() {
    			if (previous_answer_slot) previous_answer_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (previous_answer_slot) {
    				previous_answer_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (previous_answer_slot) {
    				if (previous_answer_slot.p && (!current || dirty & /*$$scope, keys*/ 40960)) {
    					update_slot_base(
    						previous_answer_slot,
    						previous_answer_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(previous_answer_slot_template, /*$$scope*/ ctx[13], dirty, get_previous_answer_slot_changes),
    						get_previous_answer_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(previous_answer_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(previous_answer_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (previous_answer_slot) previous_answer_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_previous_answer_slot$3.name,
    		type: "slot",
    		source: "(61:12) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let t0;
    	let section;
    	let topbar;
    	let t1;
    	let t2;
    	let current_block_type_index;
    	let if_block1;
    	let current;
    	let if_block0 = /*showSettings*/ ctx[4] && create_if_block_1$2(ctx);

    	topbar = new TopBar({
    			props: {
    				numQuestionsAnswered: /*numQuestionsAnswered*/ ctx[1],
    				numEligibleQuestions: /*numEligibleQuestions*/ ctx[2]
    			},
    			$$inline: true
    		});

    	topbar.$on("click", /*handleShowSettings*/ ctx[11]);
    	const question_slot_template = /*#slots*/ ctx[12].question;
    	const question_slot = create_slot(question_slot_template, ctx, /*$$scope*/ ctx[13], get_question_slot_context);
    	const if_block_creators = [create_if_block$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*showResults*/ ctx[5]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			section = element("section");
    			create_component(topbar.$$.fragment);
    			t1 = space();
    			if (question_slot) question_slot.c();
    			t2 = space();
    			if_block1.c();
    			attr_dev(section, "id", "quiz-section");
    			attr_dev(section, "class", "svelte-knh1ca");
    			toggle_class(section, "success-animation", /*showResults*/ ctx[5] && /*wasCorrectAnswer*/ ctx[7]);
    			toggle_class(section, "error-animation", /*showResults*/ ctx[5] && !/*wasCorrectAnswer*/ ctx[7]);
    			add_location(section, file$4, 50, 0, 1622);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(topbar, section, null);
    			append_dev(section, t1);

    			if (question_slot) {
    				question_slot.m(section, null);
    			}

    			append_dev(section, t2);
    			if_blocks[current_block_type_index].m(section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*showSettings*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*showSettings*/ 16) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const topbar_changes = {};
    			if (dirty & /*numQuestionsAnswered*/ 2) topbar_changes.numQuestionsAnswered = /*numQuestionsAnswered*/ ctx[1];
    			if (dirty & /*numEligibleQuestions*/ 4) topbar_changes.numEligibleQuestions = /*numEligibleQuestions*/ ctx[2];
    			topbar.$set(topbar_changes);

    			if (question_slot) {
    				if (question_slot.p && (!current || dirty & /*$$scope, currentKey*/ 8200)) {
    					update_slot_base(
    						question_slot,
    						question_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(question_slot_template, /*$$scope*/ ctx[13], dirty, get_question_slot_changes),
    						get_question_slot_context
    					);
    				}
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block1 = if_blocks[current_block_type_index];

    				if (!if_block1) {
    					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block1.c();
    				} else {
    					if_block1.p(ctx, dirty);
    				}

    				transition_in(if_block1, 1);
    				if_block1.m(section, null);
    			}

    			if (dirty & /*showResults, wasCorrectAnswer*/ 160) {
    				toggle_class(section, "success-animation", /*showResults*/ ctx[5] && /*wasCorrectAnswer*/ ctx[7]);
    			}

    			if (dirty & /*showResults, wasCorrectAnswer*/ 160) {
    				toggle_class(section, "error-animation", /*showResults*/ ctx[5] && !/*wasCorrectAnswer*/ ctx[7]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(topbar.$$.fragment, local);
    			transition_in(question_slot, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(topbar.$$.fragment, local);
    			transition_out(question_slot, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(topbar);
    			if (question_slot) question_slot.d(detaching);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Content', slots, ['question','previous-answer','answer']);
    	let { questionSetHandler } = $$props;
    	let numQuestionsAnswered;
    	let numEligibleQuestions;
    	let currentKey;
    	let showSettings = false;
    	let showResults = false;
    	let stats;
    	let wasCorrectAnswer;

    	const updateQuestion = () => {
    		$$invalidate(3, currentKey = questionSetHandler.getNextQuestion());
    		$$invalidate(1, numQuestionsAnswered = questionSetHandler.numNonReshownQuestionsAnswered);
    		$$invalidate(2, numEligibleQuestions = questionSetHandler.numEligibleQuestions);
    	};

    	const handleNext = () => {
    		updateQuestion();
    		$$invalidate(5, showResults = false);
    	};

    	const handleSubmit = event => {
    		const form = event.target;
    		const userInput = form.input.value;
    		$$invalidate(7, wasCorrectAnswer = questionSetHandler.isCorrectAnswer(currentKey, userInput));
    		setStats(currentKey, wasCorrectAnswer, userInput, questionSetHandler.getOfficialGuess);
    		$$invalidate(5, showResults = true);
    		$$invalidate(6, stats = getStats(currentKey));
    	};

    	const handleSettingsClosed = event => {
    		const wasSettingsUpdated = event.detail;

    		if (wasSettingsUpdated) {
    			questionSetHandler.recalculateEligibleQuestions();
    			updateQuestion();
    			$$invalidate(5, showResults = false);
    		}

    		$$invalidate(4, showSettings = false);
    	};

    	const handleShowSettings = () => {
    		$$invalidate(4, showSettings = true);
    	};

    	questionSetHandler.recalculateEligibleQuestions();
    	updateQuestion();
    	const writable_props = ['questionSetHandler'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Content> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('questionSetHandler' in $$props) $$invalidate(0, questionSetHandler = $$props.questionSetHandler);
    		if ('$$scope' in $$props) $$invalidate(13, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Results,
    		Settings,
    		TopBar,
    		storage,
    		questionSetHandler,
    		numQuestionsAnswered,
    		numEligibleQuestions,
    		currentKey,
    		showSettings,
    		showResults,
    		stats,
    		wasCorrectAnswer,
    		updateQuestion,
    		handleNext,
    		handleSubmit,
    		handleSettingsClosed,
    		handleShowSettings
    	});

    	$$self.$inject_state = $$props => {
    		if ('questionSetHandler' in $$props) $$invalidate(0, questionSetHandler = $$props.questionSetHandler);
    		if ('numQuestionsAnswered' in $$props) $$invalidate(1, numQuestionsAnswered = $$props.numQuestionsAnswered);
    		if ('numEligibleQuestions' in $$props) $$invalidate(2, numEligibleQuestions = $$props.numEligibleQuestions);
    		if ('currentKey' in $$props) $$invalidate(3, currentKey = $$props.currentKey);
    		if ('showSettings' in $$props) $$invalidate(4, showSettings = $$props.showSettings);
    		if ('showResults' in $$props) $$invalidate(5, showResults = $$props.showResults);
    		if ('stats' in $$props) $$invalidate(6, stats = $$props.stats);
    		if ('wasCorrectAnswer' in $$props) $$invalidate(7, wasCorrectAnswer = $$props.wasCorrectAnswer);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		questionSetHandler,
    		numQuestionsAnswered,
    		numEligibleQuestions,
    		currentKey,
    		showSettings,
    		showResults,
    		stats,
    		wasCorrectAnswer,
    		handleNext,
    		handleSubmit,
    		handleSettingsClosed,
    		handleShowSettings,
    		slots,
    		$$scope
    	];
    }

    class Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { questionSetHandler: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Content",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*questionSetHandler*/ ctx[0] === undefined && !('questionSetHandler' in props)) {
    			console.warn("<Content> was created without expected prop 'questionSetHandler'");
    		}
    	}

    	get questionSetHandler() {
    		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set questionSetHandler(value) {
    		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\stadiums\StadiumsApp.svelte generated by Svelte v3.44.2 */
    const file$3 = "src\\stadiums\\StadiumsApp.svelte";

    // (24:4) 
    function create_question_slot$2(ctx) {
    	let span1;
    	let t0;
    	let span0;
    	let t1;
    	let t2_value = /*getShortTeamNameFromKey*/ ctx[1](/*currentKey*/ ctx[5]) + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			span1 = element("span");
    			t0 = text("What is the stadium name for\r\n        ");
    			span0 = element("span");
    			t1 = text("the ");
    			t2 = text(t2_value);
    			t3 = text("?");
    			attr_dev(span0, "class", "team-name svelte-13ewbhe");
    			add_location(span0, file$3, 25, 8, 851);
    			attr_dev(span1, "slot", "question");
    			add_location(span1, file$3, 23, 4, 781);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t0);
    			append_dev(span1, span0);
    			append_dev(span0, t1);
    			append_dev(span0, t2);
    			append_dev(span1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 32 && t2_value !== (t2_value = /*getShortTeamNameFromKey*/ ctx[1](/*currentKey*/ ctx[5]) + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_question_slot$2.name,
    		type: "slot",
    		source: "(24:4) ",
    		ctx
    	});

    	return block;
    }

    // (30:8) {#if currentKey[1]}
    function create_if_block_1$1(ctx) {
    	let t0;
    	let span;
    	let t1;
    	let t2_value = /*getLongTeamNameFromKey*/ ctx[2](/*currentKey*/ ctx[5][1]) + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			t0 = text("and ");
    			span = element("span");
    			t1 = text("the ");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(span, "class", "team-name svelte-13ewbhe");
    			add_location(span, file$3, 30, 16, 1094);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			insert_dev(target, t3, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 32 && t2_value !== (t2_value = /*getLongTeamNameFromKey*/ ctx[2](/*currentKey*/ ctx[5][1]) + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(30:8) {#if currentKey[1]}",
    		ctx
    	});

    	return block;
    }

    // (28:4) 
    function create_answer_slot$2(ctx) {
    	let span3;
    	let span0;
    	let t0;
    	let t1_value = /*getLongTeamNameFromKey*/ ctx[2](/*currentKey*/ ctx[5][0]) + "";
    	let t1;
    	let t2;
    	let t3;
    	let span1;
    	let t4_value = /*getStadiumNameFromKey*/ ctx[3](/*currentKey*/ ctx[5][0]) + "";
    	let t4;
    	let t5;
    	let span2;
    	let t6_value = /*getStadiumLocationFromKey*/ ctx[4](/*currentKey*/ ctx[5][0]) + "";
    	let t6;
    	let t7;
    	let if_block = /*currentKey*/ ctx[5][1] && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			span3 = element("span");
    			span0 = element("span");
    			t0 = text("The ");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = text("are at ");
    			span1 = element("span");
    			t4 = text(t4_value);
    			t5 = text("\r\n        in ");
    			span2 = element("span");
    			t6 = text(t6_value);
    			t7 = text(".");
    			attr_dev(span0, "class", "team-name svelte-13ewbhe");
    			add_location(span0, file$3, 28, 8, 973);
    			attr_dev(span1, "class", "stadium-name svelte-13ewbhe");
    			add_location(span1, file$3, 31, 20, 1190);
    			attr_dev(span2, "class", "city-name svelte-13ewbhe");
    			add_location(span2, file$3, 32, 11, 1275);
    			attr_dev(span3, "slot", "answer");
    			add_location(span3, file$3, 27, 4, 943);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span3, anchor);
    			append_dev(span3, span0);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    			append_dev(span3, t2);
    			if (if_block) if_block.m(span3, null);
    			append_dev(span3, t3);
    			append_dev(span3, span1);
    			append_dev(span1, t4);
    			append_dev(span3, t5);
    			append_dev(span3, span2);
    			append_dev(span2, t6);
    			append_dev(span3, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 32 && t1_value !== (t1_value = /*getLongTeamNameFromKey*/ ctx[2](/*currentKey*/ ctx[5][0]) + "")) set_data_dev(t1, t1_value);

    			if (/*currentKey*/ ctx[5][1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					if_block.m(span3, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*currentKey*/ 32 && t4_value !== (t4_value = /*getStadiumNameFromKey*/ ctx[3](/*currentKey*/ ctx[5][0]) + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*currentKey*/ 32 && t6_value !== (t6_value = /*getStadiumLocationFromKey*/ ctx[4](/*currentKey*/ ctx[5][0]) + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span3);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_answer_slot$2.name,
    		type: "slot",
    		source: "(28:4) ",
    		ctx
    	});

    	return block;
    }

    // (37:8) {#if currentKey[1]}
    function create_if_block$1(ctx) {
    	let t0;
    	let span;
    	let t1;
    	let t2_value = /*getLongTeamNameFromKey*/ ctx[2](/*currentKey*/ ctx[5][1]) + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			t0 = text("and ");
    			span = element("span");
    			t1 = text("the ");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(span, "class", "team-name svelte-13ewbhe");
    			add_location(span, file$3, 37, 16, 1528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			insert_dev(target, t3, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 32 && t2_value !== (t2_value = /*getLongTeamNameFromKey*/ ctx[2](/*currentKey*/ ctx[5][1]) + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(37:8) {#if currentKey[1]}",
    		ctx
    	});

    	return block;
    }

    // (35:4) 
    function create_previous_answer_slot$2(ctx) {
    	let span3;
    	let span0;
    	let t0;
    	let t1_value = /*getLongTeamNameFromKey*/ ctx[2](/*currentKey*/ ctx[5][0]) + "";
    	let t1;
    	let t2;
    	let t3;
    	let span1;
    	let t4_value = /*getStadiumNameFromKey*/ ctx[3](/*currentKey*/ ctx[5][0]) + "";
    	let t4;
    	let t5;
    	let span2;
    	let t6_value = /*getStadiumLocationFromKey*/ ctx[4](/*currentKey*/ ctx[5][0]) + "";
    	let t6;
    	let t7;
    	let if_block = /*currentKey*/ ctx[5][1] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			span3 = element("span");
    			span0 = element("span");
    			t0 = text("The ");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = text("are at ");
    			span1 = element("span");
    			t4 = text(t4_value);
    			t5 = text("\r\n        in ");
    			span2 = element("span");
    			t6 = text(t6_value);
    			t7 = text(".");
    			attr_dev(span0, "class", "team-name svelte-13ewbhe");
    			add_location(span0, file$3, 35, 8, 1407);
    			attr_dev(span1, "class", "stadium-name svelte-13ewbhe");
    			add_location(span1, file$3, 38, 20, 1624);
    			attr_dev(span2, "class", "city-name svelte-13ewbhe");
    			add_location(span2, file$3, 39, 11, 1709);
    			attr_dev(span3, "slot", "previous-answer");
    			add_location(span3, file$3, 34, 4, 1368);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span3, anchor);
    			append_dev(span3, span0);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    			append_dev(span3, t2);
    			if (if_block) if_block.m(span3, null);
    			append_dev(span3, t3);
    			append_dev(span3, span1);
    			append_dev(span1, t4);
    			append_dev(span3, t5);
    			append_dev(span3, span2);
    			append_dev(span2, t6);
    			append_dev(span3, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 32 && t1_value !== (t1_value = /*getLongTeamNameFromKey*/ ctx[2](/*currentKey*/ ctx[5][0]) + "")) set_data_dev(t1, t1_value);

    			if (/*currentKey*/ ctx[5][1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(span3, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*currentKey*/ 32 && t4_value !== (t4_value = /*getStadiumNameFromKey*/ ctx[3](/*currentKey*/ ctx[5][0]) + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*currentKey*/ 32 && t6_value !== (t6_value = /*getStadiumLocationFromKey*/ ctx[4](/*currentKey*/ ctx[5][0]) + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span3);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_previous_answer_slot$2.name,
    		type: "slot",
    		source: "(35:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				questionSetHandler: /*questionSetHandler*/ ctx[0],
    				$$slots: {
    					"previous-answer": [
    						create_previous_answer_slot$2,
    						({ currentKey }) => ({ 5: currentKey }),
    						({ currentKey }) => currentKey ? 32 : 0
    					],
    					answer: [
    						create_answer_slot$2,
    						({ currentKey }) => ({ 5: currentKey }),
    						({ currentKey }) => currentKey ? 32 : 0
    					],
    					question: [
    						create_question_slot$2,
    						({ currentKey }) => ({ 5: currentKey }),
    						({ currentKey }) => currentKey ? 32 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const content_changes = {};

    			if (dirty & /*$$scope, currentKey*/ 96) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('StadiumsApp', slots, []);
    	const questionSetHandler = questionSetHandler$2;

    	const getShortTeamNameFromKey = key => {
    		const team = NflTeam[key];
    		return getTeamInfo(team).teamNames[1];
    	};

    	const getLongTeamNameFromKey = key => {
    		const team = NflTeam[key];
    		return getTeamInfo(team).teamNames[0];
    	};

    	const getStadiumNameFromKey = key => {
    		const team = NflTeam[key];
    		return getTeamInfo(team).stadiumNames[0];
    	};

    	const getStadiumLocationFromKey = key => {
    		const team = NflTeam[key];
    		return getTeamInfo(team).cityNames[0];
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StadiumsApp> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		getTeamInfo,
    		NflTeam,
    		x: questionSetHandler$2,
    		Content,
    		questionSetHandler,
    		getShortTeamNameFromKey,
    		getLongTeamNameFromKey,
    		getStadiumNameFromKey,
    		getStadiumLocationFromKey
    	});

    	return [
    		questionSetHandler,
    		getShortTeamNameFromKey,
    		getLongTeamNameFromKey,
    		getStadiumNameFromKey,
    		getStadiumLocationFromKey
    	];
    }

    class StadiumsApp extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StadiumsApp",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const files$1 = CAR_LOGO_FILES.map((fileName) => `carlogos/images/${fileName}`);
    console.log(files$1);
    function x$1() {
        const result = new Map();
        for (let i = 0; i < files$1.length; i++) {
            const fileName = files$1[i];
            const possibleNames = fileName.split("/")[2].split(".")[0].split(",");
            possibleNames.forEach((name) => result.set(standardizeString(name), possibleNames[0]));
        }
        return result;
    }
    const possibleGuessToOfficialGuess$1 = x$1();
    const convertKeyToOfficialGuess$1 = (key) => {
        return key.split("/")[2].split(".")[0].split(",")[0];
    };
    function y$1() {
        const result = new Map();
        for (let i = 0; i < files$1.length; i++) {
            const fileName = files$1[i];
            const possibleNames = fileName.split("/")[2].split(".")[0].split(",");
            result.set(possibleNames[0], fileName);
        }
        return result;
    }
    const officalGuessToKey$1 = y$1();
    function preload$1(imageArray, index) {
        index = index || 0;
        if (imageArray && imageArray.length > index) {
            const img = new Image();
            img.onload = function () {
                preload$1(imageArray, index + 1);
            };
            img.src = imageArray[index];
        }
    }

    const questionSetHandler$1 = new (class extends QuestionSetHandler {
        constructor() {
            super(...arguments);
            this.triviaCategory = "Car logos";
            this.questionType = "Car brand";
            this.allKeys = files$1;
            this.doesGuessExist = (guess) => {
                return this.getOfficialGuess(guess) != undefined;
            };
            this.getKeysFromGuess = (guess) => {
                const officializedGuess = this.getOfficialGuess(guess);
                if (officializedGuess) {
                    return [officalGuessToKey$1.get(officializedGuess)];
                }
                else {
                    return [];
                }
            };
            this.isCorrectAnswer = (currentKey, userInput) => {
                var _a;
                const correctAnswer = convertKeyToOfficialGuess$1(currentKey);
                return areStringsSimilar(correctAnswer, (_a = this.getOfficialGuess(userInput)) !== null && _a !== void 0 ? _a : "");
            };
            this.getOfficialGuess = (guess) => {
                return possibleGuessToOfficialGuess$1.get(standardizeString(guess));
            };
            this.getQuestionSets = () => {
                return [
                    {
                        description: "All",
                        questions: this.allKeys,
                    },
                ];
            };
        }
    })();

    /* src\carlogos\CarLogos.svelte generated by Svelte v3.44.2 */
    const file$2 = "src\\carlogos\\CarLogos.svelte";

    // (9:4) 
    function create_question_slot$1(ctx) {
    	let span;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			img = element("img");
    			attr_dev(img, "class", "logo svelte-1q5vrhc");
    			if (!src_url_equal(img.src, img_src_value = /*currentKey*/ ctx[1])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Car logo");
    			add_location(img, file$2, 9, 8, 364);
    			attr_dev(span, "slot", "question");
    			add_location(span, file$2, 8, 4, 332);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, img);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 2 && !src_url_equal(img.src, img_src_value = /*currentKey*/ ctx[1])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_question_slot$1.name,
    		type: "slot",
    		source: "(9:4) ",
    		ctx
    	});

    	return block;
    }

    // (12:4) 
    function create_answer_slot$1(ctx) {
    	let span;
    	let t0;
    	let b;
    	let t1_value = convertKeyToOfficialGuess$1(/*currentKey*/ ctx[1][0]) + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("The answer is ");
    			b = element("b");
    			t1 = text(t1_value);
    			add_location(b, file$2, 12, 22, 479);
    			attr_dev(span, "slot", "answer");
    			add_location(span, file$2, 11, 4, 435);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, b);
    			append_dev(b, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 2 && t1_value !== (t1_value = convertKeyToOfficialGuess$1(/*currentKey*/ ctx[1][0]) + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_answer_slot$1.name,
    		type: "slot",
    		source: "(12:4) ",
    		ctx
    	});

    	return block;
    }

    // (15:4) 
    function create_previous_answer_slot$1(ctx) {
    	let span;
    	let t0_value = convertKeyToOfficialGuess$1(/*currentKey*/ ctx[1][0]) + "";
    	let t0;
    	let t1;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(":\r\n        ");
    			img = element("img");
    			attr_dev(img, "class", "mini-logo svelte-1q5vrhc");
    			if (!src_url_equal(img.src, img_src_value = /*currentKey*/ ctx[1][0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Car logo");
    			add_location(img, file$2, 16, 8, 639);
    			attr_dev(span, "slot", "previous-answer");
    			add_location(span, file$2, 14, 4, 547);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, img);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 2 && t0_value !== (t0_value = convertKeyToOfficialGuess$1(/*currentKey*/ ctx[1][0]) + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*currentKey*/ 2 && !src_url_equal(img.src, img_src_value = /*currentKey*/ ctx[1][0])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_previous_answer_slot$1.name,
    		type: "slot",
    		source: "(15:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				questionSetHandler: /*questionSetHandler*/ ctx[0],
    				$$slots: {
    					"previous-answer": [
    						create_previous_answer_slot$1,
    						({ currentKey }) => ({ 1: currentKey }),
    						({ currentKey }) => currentKey ? 2 : 0
    					],
    					answer: [
    						create_answer_slot$1,
    						({ currentKey }) => ({ 1: currentKey }),
    						({ currentKey }) => currentKey ? 2 : 0
    					],
    					question: [
    						create_question_slot$1,
    						({ currentKey }) => ({ 1: currentKey }),
    						({ currentKey }) => currentKey ? 2 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const content_changes = {};

    			if (dirty & /*$$scope, currentKey*/ 6) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CarLogos', slots, []);
    	const questionSetHandler = questionSetHandler$1;
    	preload$1(files$1, 0);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CarLogos> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		x: questionSetHandler$1,
    		Content,
    		convertKeyToOfficialGuess: convertKeyToOfficialGuess$1,
    		preload: preload$1,
    		files: files$1,
    		questionSetHandler
    	});

    	return [questionSetHandler];
    }

    class CarLogos extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CarLogos",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    const files = PLANE_MOVIE_FILES.map((fileName) => `planemovies/images/${fileName}`);
    console.log(files);
    function x() {
        const result = new Map();
        for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const possibleNames = fileName.split("/")[2].split(".")[0].split(",");
            possibleNames.forEach((name) => result.set(standardizeString(name), possibleNames[0]));
        }
        return result;
    }
    const possibleGuessToOfficialGuess = x();
    const convertKeyToOfficialGuess = (key) => {
        return key.split("/")[2].split(".")[0].split(",")[0];
    };
    function y() {
        const result = new Map();
        for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const possibleNames = fileName.split("/")[2].split(".")[0].split(",");
            result.set(possibleNames[0], fileName);
        }
        return result;
    }
    const officalGuessToKey = y();
    function preload(imageArray, index) {
        index = index || 0;
        if (imageArray && imageArray.length > index) {
            const img = new Image();
            img.onload = function () {
                preload(imageArray, index + 1);
            };
            img.src = imageArray[index];
        }
    }

    const questionSetHandler = new (class extends QuestionSetHandler {
        constructor() {
            super(...arguments);
            this.triviaCategory = "Car logos";
            this.questionType = "Car brand";
            this.allKeys = files;
            this.doesGuessExist = (guess) => {
                return this.getOfficialGuess(guess) != undefined;
            };
            this.getKeysFromGuess = (guess) => {
                const officializedGuess = this.getOfficialGuess(guess);
                if (officializedGuess) {
                    return [officalGuessToKey.get(officializedGuess)];
                }
                else {
                    return [];
                }
            };
            this.isCorrectAnswer = (currentKey, userInput) => {
                var _a;
                const correctAnswer = convertKeyToOfficialGuess(currentKey);
                return areStringsSimilar(correctAnswer, (_a = this.getOfficialGuess(userInput)) !== null && _a !== void 0 ? _a : "");
            };
            this.getOfficialGuess = (guess) => {
                return possibleGuessToOfficialGuess.get(standardizeString(guess));
            };
            this.getQuestionSets = () => {
                return [
                    {
                        description: "All",
                        questions: this.allKeys,
                    },
                ];
            };
        }
    })();

    /* src\planemovies\PlaneMoviesApp.svelte generated by Svelte v3.44.2 */
    const file$1 = "src\\planemovies\\PlaneMoviesApp.svelte";

    // (9:4) 
    function create_question_slot(ctx) {
    	let span;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			img = element("img");
    			attr_dev(img, "class", "logo svelte-1q5vrhc");
    			if (!src_url_equal(img.src, img_src_value = /*currentKey*/ ctx[1])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Car logo");
    			add_location(img, file$1, 9, 8, 371);
    			attr_dev(span, "slot", "question");
    			add_location(span, file$1, 8, 4, 339);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, img);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 2 && !src_url_equal(img.src, img_src_value = /*currentKey*/ ctx[1])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_question_slot.name,
    		type: "slot",
    		source: "(9:4) ",
    		ctx
    	});

    	return block;
    }

    // (12:4) 
    function create_answer_slot(ctx) {
    	let span;
    	let t0;
    	let b;
    	let t1_value = convertKeyToOfficialGuess(/*currentKey*/ ctx[1][0]) + "";
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("The answer is ");
    			b = element("b");
    			t1 = text(t1_value);
    			add_location(b, file$1, 12, 22, 486);
    			attr_dev(span, "slot", "answer");
    			add_location(span, file$1, 11, 4, 442);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, b);
    			append_dev(b, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 2 && t1_value !== (t1_value = convertKeyToOfficialGuess(/*currentKey*/ ctx[1][0]) + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_answer_slot.name,
    		type: "slot",
    		source: "(12:4) ",
    		ctx
    	});

    	return block;
    }

    // (15:4) 
    function create_previous_answer_slot(ctx) {
    	let span;
    	let t0_value = convertKeyToOfficialGuess(/*currentKey*/ ctx[1][0]) + "";
    	let t0;
    	let t1;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(":\r\n        ");
    			img = element("img");
    			attr_dev(img, "class", "mini-logo svelte-1q5vrhc");
    			if (!src_url_equal(img.src, img_src_value = /*currentKey*/ ctx[1][0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Car logo");
    			add_location(img, file$1, 16, 8, 646);
    			attr_dev(span, "slot", "previous-answer");
    			add_location(span, file$1, 14, 4, 554);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, img);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentKey*/ 2 && t0_value !== (t0_value = convertKeyToOfficialGuess(/*currentKey*/ ctx[1][0]) + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*currentKey*/ 2 && !src_url_equal(img.src, img_src_value = /*currentKey*/ ctx[1][0])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_previous_answer_slot.name,
    		type: "slot",
    		source: "(15:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				questionSetHandler: /*questionSetHandler*/ ctx[0],
    				$$slots: {
    					"previous-answer": [
    						create_previous_answer_slot,
    						({ currentKey }) => ({ 1: currentKey }),
    						({ currentKey }) => currentKey ? 2 : 0
    					],
    					answer: [
    						create_answer_slot,
    						({ currentKey }) => ({ 1: currentKey }),
    						({ currentKey }) => currentKey ? 2 : 0
    					],
    					question: [
    						create_question_slot,
    						({ currentKey }) => ({ 1: currentKey }),
    						({ currentKey }) => currentKey ? 2 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(content.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(content, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const content_changes = {};

    			if (dirty & /*$$scope, currentKey*/ 6) {
    				content_changes.$$scope = { dirty, ctx };
    			}

    			content.$set(content_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(content.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(content.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(content, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PlaneMoviesApp', slots, []);
    	const questionSetHandler$1 = questionSetHandler;
    	preload(files, 0);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PlaneMoviesApp> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		x: questionSetHandler,
    		Content,
    		convertKeyToOfficialGuess,
    		preload,
    		files,
    		questionSetHandler: questionSetHandler$1
    	});

    	return [questionSetHandler$1];
    }

    class PlaneMoviesApp extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PlaneMoviesApp",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.2 */
    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (13:8) {#each tabs as tab}
    function create_each_block(ctx) {
    	let li;
    	let t0_value = /*tab*/ ctx[3] + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[2](/*tab*/ ctx[3]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(li, "class", "svelte-1lxsts3");
    			toggle_class(li, "active-tab", /*tab*/ ctx[3] === /*currentTab*/ ctx[0]);
    			add_location(li, file, 13, 12, 491);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);

    			if (!mounted) {
    				dispose = listen_dev(li, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*tabs, currentTab*/ 3) {
    				toggle_class(li, "active-tab", /*tab*/ ctx[3] === /*currentTab*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(13:8) {#each tabs as tab}",
    		ctx
    	});

    	return block;
    }

    // (29:4) {:else}
    function create_else_block(ctx) {
    	let stadiumsapp;
    	let current;
    	stadiumsapp = new StadiumsApp({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(stadiumsapp.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(stadiumsapp, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stadiumsapp.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stadiumsapp.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(stadiumsapp, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(29:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (27:40) 
    function create_if_block_1(ctx) {
    	let planemoviesapp;
    	let current;
    	planemoviesapp = new PlaneMoviesApp({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(planemoviesapp.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(planemoviesapp, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(planemoviesapp.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(planemoviesapp.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(planemoviesapp, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(27:40) ",
    		ctx
    	});

    	return block;
    }

    // (25:4) {#if currentTab == carLogos}
    function create_if_block(ctx) {
    	let carlogosapp;
    	let current;
    	carlogosapp = new CarLogos({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(carlogosapp.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(carlogosapp, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(carlogosapp.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(carlogosapp.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(carlogosapp, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(25:4) {#if currentTab == carLogos}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let ul;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let each_value = /*tabs*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*currentTab*/ ctx[0] == carLogos) return 0;
    		if (/*currentTab*/ ctx[0] == planeMovies) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			if_block.c();
    			attr_dev(ul, "class", "svelte-1lxsts3");
    			add_location(ul, file, 11, 4, 444);
    			attr_dev(main, "class", "svelte-1lxsts3");
    			add_location(main, file, 10, 0, 432);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(main, t);
    			if_blocks[current_block_type_index].m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*tabs, currentTab, localStorage*/ 3) {
    				each_value = /*tabs*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(main, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const nflStadiums = "Stadiums";
    const carLogos = "Car logos";
    const planeMovies = "Movies";

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let currentTab = localStorage.getItem("trivia-category") ?? nflStadiums;
    	const tabs = [nflStadiums, carLogos, planeMovies];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = tab => {
    		$$invalidate(0, currentTab = tab);
    		localStorage.setItem("trivia-category", currentTab);
    	};

    	$$self.$capture_state = () => ({
    		StadiumsApp,
    		CarLogosApp: CarLogos,
    		PlaneMoviesApp,
    		nflStadiums,
    		carLogos,
    		planeMovies,
    		currentTab,
    		tabs
    	});

    	$$self.$inject_state = $$props => {
    		if ('currentTab' in $$props) $$invalidate(0, currentTab = $$props.currentTab);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [currentTab, tabs, click_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
