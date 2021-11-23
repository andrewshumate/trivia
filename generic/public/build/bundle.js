
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.1' }, detail), true));
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

    const flags = new Map([
        [
            "Afghanistan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/af-flag.gif",
            },
        ],
        [
            "Albania",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/al-flag.gif",
            },
        ],
        [
            "Algeria",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ag-flag.gif",
            },
        ],
        [
            "Andorra",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/an-flag.gif",
            },
        ],
        [
            "Angola",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ao-flag.gif",
            },
        ],
        [
            "Antigua and Barbuda",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ac-flag.gif",
            },
        ],
        [
            "Argentina",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ar-flag.gif",
            },
        ],
        [
            "Armenia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/am-flag.gif",
            },
        ],
        [
            "Australia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/as-flag.gif",
            },
        ],
        [
            "Austria",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/au-flag.gif",
            },
        ],
        [
            "Azerbaijan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/aj-flag.gif",
            },
        ],
        [
            "Bahamas",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bf-flag.gif",
            },
        ],
        [
            "Bahrain",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ba-flag.gif",
            },
        ],
        [
            "Bangladesh",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bg-flag.gif",
            },
        ],
        [
            "Barbados",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bb-flag.gif",
            },
        ],
        [
            "Belarus",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bo-flag.gif",
            },
        ],
        [
            "Belgium",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/be-flag.gif",
            },
        ],
        [
            "Belize",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bh-flag.gif",
            },
        ],
        [
            "Benin",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bn-flag.gif",
            },
        ],
        [
            "Bhutan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bt-flag.gif",
            },
        ],
        [
            "Bolivia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bl-flag.gif",
            },
        ],
        [
            "Bosnia and Herzegovina",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bk-flag.gif",
            },
        ],
        [
            "Botswana",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bc-flag.gif",
            },
        ],
        [
            "Brazil",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/br-flag.gif",
            },
        ],
        [
            "Brunei ",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bx-flag.gif",
            },
        ],
        [
            "Bulgaria",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bu-flag.gif",
            },
        ],
        [
            "Burkina Faso",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/uv-flag.gif",
            },
        ],
        [
            "Burundi",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/by-flag.gif",
            },
        ],
        [
            "Côte d'Ivoire",
            {
                alternateNames: ["Cote d'Ivoire", "Ivory Coast"],
                imageUrl: "https://www.worldometers.info/img/flags/iv-flag.gif",
            },
        ],
        [
            "Cabo Verde",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cv-flag.gif",
            },
        ],
        [
            "Cambodia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cb-flag.gif",
            },
        ],
        [
            "Cameroon",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cm-flag.gif",
            },
        ],
        [
            "Canada",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ca-flag.gif",
            },
        ],
        [
            "CAR",
            {
                alternateNames: ["Central African Republic"],
                imageUrl: "https://www.worldometers.info/img/flags/ct-flag.gif",
            },
        ],
        [
            "Chad",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cd-flag.gif",
            },
        ],
        [
            "Chile",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ci-flag.gif",
            },
        ],
        [
            "China",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ch-flag.gif",
            },
        ],
        [
            "Colombia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/co-flag.gif",
            },
        ],
        [
            "Comoros",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cn-flag.gif",
            },
        ],
        [
            "Congo",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cg-flag.gif",
            },
        ],
        [
            "Costa Rica",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cs-flag.gif",
            },
        ],
        [
            "Croatia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/hr-flag.gif",
            },
        ],
        [
            "Cuba",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cu-flag.gif",
            },
        ],
        [
            "Cyprus",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/cy-flag.gif",
            },
        ],
        [
            "Czechia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ez-flag.gif",
            },
        ],
        [
            "Denmark",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/da-flag.gif",
            },
        ],
        [
            "Djibouti",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/dj-flag.gif",
            },
        ],
        [
            "Dominica",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/do-flag.gif",
            },
        ],
        [
            "Dominican Republic",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/dr-flag.gif",
            },
        ],
        [
            "DPRK",
            {
                alternateNames: ["North Korea", "Democratic People's Republic of Korea"],
                imageUrl: "https://www.worldometers.info/img/flags/kn-flag.gif",
            },
        ],
        [
            "DRC",
            {
                alternateNames: ["Democratic Republic of the Congo", "DR Congo", "The DRC"],
                imageUrl: "https://www.worldometers.info/img/flags/congo-flag.gif",
            },
        ],
        [
            "Ecuador",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ec-flag.gif",
            },
        ],
        [
            "Egypt",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/eg-flag.gif",
            },
        ],
        [
            "El Salvador",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/es-flag.gif",
            },
        ],
        [
            "Equatorial Guinea",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ek-flag.gif",
            },
        ],
        [
            "Eritrea",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/er-flag.gif",
            },
        ],
        [
            "Estonia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/en-flag.gif",
            },
        ],
        [
            "Eswatini",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/wz-flag.gif",
            },
        ],
        [
            "Ethiopia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/et-flag.gif",
            },
        ],
        [
            "Fiji",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/fj-flag.gif",
            },
        ],
        [
            "Finland",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/fi-flag.gif",
            },
        ],
        [
            "France",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/fr-flag.gif",
            },
        ],
        [
            "Gabon",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gb-flag.gif",
            },
        ],
        [
            "Gambia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ga-flag.gif",
            },
        ],
        [
            "Georgia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gg-flag.gif",
            },
        ],
        [
            "Germany",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gm-flag.gif",
            },
        ],
        [
            "Ghana",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gh-flag.gif",
            },
        ],
        [
            "Greece",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gr-flag.gif",
            },
        ],
        [
            "Grenada",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gj-flag.gif",
            },
        ],
        [
            "Guatemala",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gt-flag.gif",
            },
        ],
        [
            "Guinea",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gv-flag.gif",
            },
        ],
        [
            "Guinea-Bissau",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/pu-flag.gif",
            },
        ],
        [
            "Guyana",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/gy-flag.gif",
            },
        ],
        [
            "Haiti",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ha-flag.gif",
            },
        ],
        [
            "Holy See",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/vt-flag.gif",
            },
        ],
        [
            "Honduras",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ho-flag.gif",
            },
        ],
        [
            "Hungary",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/hu-flag.gif",
            },
        ],
        [
            "Iceland",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ic-flag.gif",
            },
        ],
        [
            "India",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/in-flag.gif",
            },
        ],
        [
            "Indonesia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/id-flag.gif",
            },
        ],
        [
            "Iran",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ir-flag.gif",
            },
        ],
        [
            "Iraq",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/iz-flag.gif",
            },
        ],
        [
            "Ireland",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ei-flag.gif",
            },
        ],
        [
            "Israel",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/is-flag.gif",
            },
        ],
        [
            "Italy",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/it-flag.gif",
            },
        ],
        [
            "Jamaica",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/jm-flag.gif",
            },
        ],
        [
            "Japan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ja-flag.gif",
            },
        ],
        [
            "Jordan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/jo-flag.gif",
            },
        ],
        [
            "Kazakhstan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/kz-flag.gif",
            },
        ],
        [
            "Kenya",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ke-flag.gif",
            },
        ],
        [
            "Kiribati",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/kr-flag.gif",
            },
        ],
        [
            "Kuwait",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ku-flag.gif",
            },
        ],
        [
            "Kyrgyzstan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/kg-flag.gif",
            },
        ],
        [
            "Laos",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/la-flag.gif",
            },
        ],
        [
            "Latvia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/lg-flag.gif",
            },
        ],
        [
            "Lebanon",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/le-flag.gif",
            },
        ],
        [
            "Lesotho",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/lt-flag.gif",
            },
        ],
        [
            "Liberia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/li-flag.gif",
            },
        ],
        [
            "Libya",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ly-flag.gif",
            },
        ],
        [
            "Liechtenstein",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ls-flag.gif",
            },
        ],
        [
            "Lithuania",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/lh-flag.gif",
            },
        ],
        [
            "Luxembourg",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/lu-flag.gif",
            },
        ],
        [
            "Madagascar",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ma-flag.gif",
            },
        ],
        [
            "Malawi",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mi-flag.gif",
            },
        ],
        [
            "Malaysia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/my-flag.gif",
            },
        ],
        [
            "Maldives",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mv-flag.gif",
            },
        ],
        [
            "Mali",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ml-flag.gif",
            },
        ],
        [
            "Malta",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mt-flag.gif",
            },
        ],
        [
            "Marshall Islands",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/rm-flag.gif",
            },
        ],
        [
            "Mauritania",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mr-flag.gif",
            },
        ],
        [
            "Mauritius",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mp-flag.gif",
            },
        ],
        [
            "Mexico",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mx-flag.gif",
            },
        ],
        [
            "Micronesia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/fm-flag.gif",
            },
        ],
        [
            "Moldova",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/md-flag.gif",
            },
        ],
        [
            "Monaco",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mn-flag.gif",
            },
        ],
        [
            "Mongolia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mg-flag.gif",
            },
        ],
        [
            "Montenegro",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mj-flag.gif",
            },
        ],
        [
            "Morocco",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mo-flag.gif",
            },
        ],
        [
            "Mozambique",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mz-flag.gif",
            },
        ],
        [
            "Myanmar",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bm-flag.gif",
            },
        ],
        [
            "Namibia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/wa-flag.gif",
            },
        ],
        [
            "Nauru",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/nr-flag.gif",
            },
        ],
        [
            "Nepal",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/np-flag.gif",
            },
        ],
        [
            "Netherlands",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/nl-flag.gif",
            },
        ],
        [
            "New Zealand",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/nz-flag.gif",
            },
        ],
        [
            "Nicaragua",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/nu-flag.gif",
            },
        ],
        [
            "Niger",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ng-flag.gif",
            },
        ],
        [
            "Nigeria",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ni-flag.gif",
            },
        ],
        [
            "North Macedonia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mk-flag.gif",
            },
        ],
        [
            "Norway",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/no-flag.gif",
            },
        ],
        [
            "Oman",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/mu-flag.gif",
            },
        ],
        [
            "Pakistan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/pk-flag.gif",
            },
        ],
        [
            "Palau",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ps-flag.gif",
            },
        ],
        [
            "Panama",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/pm-flag.gif",
            },
        ],
        [
            "Papua New Guinea",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/pp-flag.gif",
            },
        ],
        [
            "Paraguay",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/pa-flag.gif",
            },
        ],
        [
            "Peru",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/pe-flag.gif",
            },
        ],
        [
            "Philippines",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/rp-flag.gif",
            },
        ],
        [
            "Poland",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/pl-flag.gif",
            },
        ],
        [
            "Portugal",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/po-flag.gif",
            },
        ],
        [
            "Qatar",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/qa-flag.gif",
            },
        ],
        [
            "Romania",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ro-flag.gif",
            },
        ],
        [
            "Russia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/rs-flag.gif",
            },
        ],
        [
            "Rwanda",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/rw-flag.gif",
            },
        ],
        [
            "Saint Kitts and Nevis",
            {
                alternateNames: ["St Kitts and Nevis"],
                imageUrl: "https://www.worldometers.info/img/flags/sc-flag.gif",
            },
        ],
        [
            "Saint Lucia",
            {
                alternateNames: ["St Lucia"],
                imageUrl: "https://www.worldometers.info/img/flags/st-flag.gif",
            },
        ],
        [
            "Samoa",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ws-flag.gif",
            },
        ],
        [
            "San Marino",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sm-flag.gif",
            },
        ],
        [
            "Sao Tome and Principe",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/tp-flag.gif",
            },
        ],
        [
            "Saudi Arabia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sa-flag.gif",
            },
        ],
        [
            "Senegal",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sg-flag.gif",
            },
        ],
        [
            "Serbia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ri-flag.gif",
            },
        ],
        [
            "Seychelles",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/se-flag.gif",
            },
        ],
        [
            "Sierra Leone",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sl-flag.gif",
            },
        ],
        [
            "Singapore",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sn-flag.gif",
            },
        ],
        [
            "Slovakia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/lo-flag.gif",
            },
        ],
        [
            "Slovenia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/si-flag.gif",
            },
        ],
        [
            "Solomon Islands",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/bp-flag.gif",
            },
        ],
        [
            "Somalia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/so-flag.gif",
            },
        ],
        [
            "South Africa",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sf-flag.gif",
            },
        ],
        [
            "South Korea",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ks-flag.gif",
            },
        ],
        [
            "South Sudan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/od-flag.gif",
            },
        ],
        [
            "Spain",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sp-flag.gif",
            },
        ],
        [
            "Sri Lanka",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ce-flag.gif",
            },
        ],
        [
            "St. Vincent Grenadines",
            {
                alternateNames: ["Saint Vincent Grenadines"],
                imageUrl: "https://www.worldometers.info/img/flags/vc-flag.gif",
            },
        ],
        [
            "State of Palestine",
            {
                alternateNames: ["Palestine"],
                imageUrl: "https://www.worldometers.info/img/flags/palestine-flag.gif",
            },
        ],
        [
            "Sudan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/su-flag.gif",
            },
        ],
        [
            "Suriname",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ns-flag.gif",
            },
        ],
        [
            "Sweden",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sw-flag.gif",
            },
        ],
        [
            "Switzerland",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sz-flag.gif",
            },
        ],
        [
            "Syria",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/sy-flag.gif",
            },
        ],
        [
            "Tajikistan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ti-flag.gif",
            },
        ],
        [
            "Tanzania",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/tz-flag.gif",
            },
        ],
        [
            "Thailand",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/th-flag.gif",
            },
        ],
        [
            "Timor-Leste",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/tt-flag.gif",
            },
        ],
        [
            "Togo",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/to-flag.gif",
            },
        ],
        [
            "Tonga",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/tn-flag.gif",
            },
        ],
        [
            "Trinidad and Tobago",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/td-flag.gif",
            },
        ],
        [
            "Tunisia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ts-flag.gif",
            },
        ],
        [
            "Turkey",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/tu-flag.gif",
            },
        ],
        [
            "Turkmenistan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/tx-flag.gif",
            },
        ],
        [
            "Tuvalu",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/tv-flag.gif",
            },
        ],
        [
            "U.A.E.",
            {
                alternateNames: ["United Arab Emirates"],
                imageUrl: "https://www.worldometers.info/img/flags/ae-flag.gif",
            },
        ],
        [
            "U.K.",
            {
                alternateNames: ["United Kingdom"],
                imageUrl: "https://www.worldometers.info/img/flags/uk-flag.gif",
            },
        ],
        [
            "U.S.",
            {
                alternateNames: ["United States"],
                imageUrl: "https://www.worldometers.info/img/flags/us-flag.gif",
            },
        ],
        [
            "Uganda",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ug-flag.gif",
            },
        ],
        [
            "Ukraine",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/up-flag.gif",
            },
        ],
        [
            "Uruguay",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/uy-flag.gif",
            },
        ],
        [
            "Uzbekistan",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/uz-flag.gif",
            },
        ],
        [
            "Vanuatu",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/nh-flag.gif",
            },
        ],
        [
            "Venezuela",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ve-flag.gif",
            },
        ],
        [
            "Vietnam",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/vm-flag.gif",
            },
        ],
        [
            "Yemen",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/ym-flag.gif",
            },
        ],
        [
            "Zambia",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/za-flag.gif",
            },
        ],
        [
            "Zimbabwe",
            {
                alternateNames: [],
                imageUrl: "https://www.worldometers.info/img/flags/zi-flag.gif",
            },
        ],
    ]);
    const x = (flags) => {
        const result = new Map();
        for (const [countryName, countryAndFlag] of flags) {
            result.set(standardizeString(countryName), countryName);
            countryAndFlag.alternateNames.forEach((name) => result.set(standardizeString(name), countryName));
        }
        return result;
    };
    const possibleNameToOfficalName = x(flags);
    // Lists for different game modes
    // Source: https://en.wikipedia.org/wiki/List_of_national_flags_by_design
    const nordicCrossFlags = ["Denmark", "Finland", "Iceland", "Norway", "Sweden"];
    // All categories for 'three equal stripes'
    const threeStripeFlags = [
        "Barbados",
        "Guatemala",
        "Mongolia",
        "Nigeria",
        "Peru",
        "Afghanistan",
        "Belgium",
        "Cameroon",
        "Chad",
        "France",
        "Guinea",
        "Ireland",
        "Italy",
        "Mexico",
        "Mali",
        "Moldova",
        "Romania",
        "Senegal",
        "Argentina",
        "Austria",
        "Bahamas",
        "Honduras",
        "Nicaragua",
        "El Salvador",
        "Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Bolivia",
        "Bulgaria",
        "Croatia",
        "Egypt",
        "Estonia",
        "Ethiopia",
        "Gabon",
        "Germany",
        "Ghana",
        "Equatorial Guinea",
        "Hungary",
        "India",
        "Iran",
        "Iraq",
        "Jordan",
        "Kenya",
        "Kuwait",
        "Lithuania",
        "Luxembourg",
        "Malawi",
        "Mozambique",
        "Myanmar",
        "Niger",
        "Netherlands",
        "Oman",
        "Paraguay",
        "State of Palestine",
        "Russia",
        "Sudan",
        "Sierra Leone",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "South Sudan",
        "Syria",
        "U.A.E.",
        "Uzbekistan",
        "Venezuela",
        "Yemen",
    ];
    const triangleOnHoistFlags = [
        "Bahamas",
        "Comoros",
        "Cuba",
        "Czechia",
        "Djibouti",
        "Timor-Leste",
        "Eritrea",
        "Equatorial Guinea",
        "Guyana",
        "Jamaica",
        "Jordan",
        "Mozambique",
        "State of Palestine",
        "Philippines",
        "Sao Tome and Principe",
        "Sudan",
        "Vanuatu",
        "Zimbabwe",
    ];

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

    const setStats = (key, wasGuessCorrect, guess) => {
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
            let standardizedGuess = possibleNameToOfficalName.get(standardizeString(guess));
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
    const getFlagSetString = () => {
        return localStorage.getItem("flag-set") || "All flags";
    };
    const getFlagSet = () => {
        const flagSetString = getFlagSetString();
        if (flagSetString == "All flags") {
            return shuffle(Array.from(flags.keys()));
        }
        else if (flagSetString == "Nordic cross flags") {
            return shuffle([...nordicCrossFlags]);
        }
        else if (flagSetString == "Three stripe flags") {
            return shuffle([...threeStripeFlags]);
        }
        else if (flagSetString == "Hoist triangle flags") {
            return shuffle([...triangleOnHoistFlags]);
        }
        else {
            return [];
        }
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
        getFlagSetString: getFlagSetString,
        getFlagSet: getFlagSet,
        getMode: getMode,
        getShouldReshowUnknown: getShouldReshowUnknown
    });

    /* src\generic\Results.svelte generated by Svelte v3.44.1 */
    const file$3 = "src\\generic\\Results.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (12:4) {:else}
    function create_else_block_1(ctx) {
    	let t0;
    	let b;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text("No, it's ");
    			b = element("b");
    			t1 = text(/*currentQuestion*/ ctx[2]);
    			t2 = text(".");
    			add_location(b, file$3, 12, 17, 284);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, b, anchor);
    			append_dev(b, t1);
    			append_dev(b, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*currentQuestion*/ 4) set_data_dev(t1, /*currentQuestion*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(b);
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

    	const block = {
    		c: function create() {
    			t = text("Correct!");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
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
    function create_if_block$1(ctx) {
    	let t0;
    	let b0;
    	let t1_value = /*stats*/ ctx[3].numCorrectGuesses + "";
    	let t1;
    	let t2;
    	let t3_value = /*stats*/ ctx[3].numTotalGuesses + "";
    	let t3;
    	let t4;
    	let b1;
    	let t5_value = /*stats*/ ctx[3].percentCorrect * 100 + "";
    	let t5;
    	let t6;
    	let t7;
    	let if_block_anchor;
    	let if_block = /*stats*/ ctx[3].incorrectGuesses.length > 0 && create_if_block_1$1(ctx);

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
    			add_location(b0, file$3, 19, 33, 508);
    			add_location(b1, file$3, 20, 9, 575);
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
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stats*/ 8 && t1_value !== (t1_value = /*stats*/ ctx[3].numCorrectGuesses + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*stats*/ 8 && t3_value !== (t3_value = /*stats*/ ctx[3].numTotalGuesses + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*stats*/ 8 && t5_value !== (t5_value = /*stats*/ ctx[3].percentCorrect * 100 + "")) set_data_dev(t5, t5_value);

    			if (/*stats*/ ctx[3].incorrectGuesses.length > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
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
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(19:4) {#if stats}",
    		ctx
    	});

    	return block;
    }

    // (22:8) {#if stats.incorrectGuesses.length > 0}
    function create_if_block_1$1(ctx) {
    	let t;
    	let ul;
    	let each_value = /*stats*/ ctx[3].incorrectGuesses;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			t = text("Previous guesses:\r\n            ");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(ul, file$3, 23, 12, 713);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*flags, stats, questionType*/ 9) {
    				each_value = /*stats*/ ctx[3].incorrectGuesses;
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
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(22:8) {#if stats.incorrectGuesses.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (31:20) {:else}
    function create_else_block$1(ctx) {
    	let li;
    	let t0_value = /*guess*/ ctx[5] + "";
    	let t0;
    	let t1;
    	let t2_value = /*questionType*/ ctx[0].toLowerCase() + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = text(" (not a ");
    			t2 = text(t2_value);
    			t3 = text(")");
    			add_location(li, file$3, 31, 24, 1094);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    			append_dev(li, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stats*/ 8 && t0_value !== (t0_value = /*guess*/ ctx[5] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*questionType*/ 1 && t2_value !== (t2_value = /*questionType*/ ctx[0].toLowerCase() + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(31:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (26:20) {#if flags.get(guess)}
    function create_if_block_2(ctx) {
    	let li;
    	let t0_value = /*guess*/ ctx[5] + "";
    	let t0;
    	let t1;
    	let t2_value = /*guess*/ ctx[5] + "";
    	let t2;
    	let t3;
    	let img;
    	let img_src_value;
    	let t4;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = text(". This is the ");
    			t2 = text(t2_value);
    			t3 = text(" flag:\r\n                            ");
    			img = element("img");
    			t4 = space();
    			attr_dev(img, "class", "mini-flags svelte-u2oqyh");
    			if (!src_url_equal(img.src, img_src_value = flags.get(/*guess*/ ctx[5])?.imageUrl)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$3, 28, 28, 942);
    			add_location(li, file$3, 26, 24, 844);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    			append_dev(li, t3);
    			append_dev(li, img);
    			append_dev(li, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stats*/ 8 && t0_value !== (t0_value = /*guess*/ ctx[5] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*stats*/ 8 && t2_value !== (t2_value = /*guess*/ ctx[5] + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*stats*/ 8 && !src_url_equal(img.src, img_src_value = flags.get(/*guess*/ ctx[5])?.imageUrl)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(26:20) {#if flags.get(guess)}",
    		ctx
    	});

    	return block;
    }

    // (25:16) {#each stats.incorrectGuesses as guess}
    function create_each_block(ctx) {
    	let show_if;
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (show_if == null || dirty & /*stats*/ 8) show_if = !!flags.get(/*guess*/ ctx[5]);
    		if (show_if) return create_if_block_2;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type_1(ctx, -1);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(25:16) {#each stats.incorrectGuesses as guess}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let p;
    	let t0;
    	let button;
    	let t2;
    	let section;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*wasCorrectAnswer*/ ctx[1]) return create_if_block_3;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*stats*/ ctx[3] && create_if_block$1(ctx);

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
    			attr_dev(p, "class", "svelte-u2oqyh");
    			add_location(p, file$3, 8, 0, 190);
    			attr_dev(button, "id", "next-button");
    			button.autofocus = true;
    			add_location(button, file$3, 16, 0, 367);
    			attr_dev(section, "id", "additional-info");
    			attr_dev(section, "class", "svelte-u2oqyh");
    			add_location(section, file$3, 17, 0, 426);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			if_block0.m(p, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, button, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, section, anchor);
    			if (if_block1) if_block1.m(section, null);
    			button.focus();

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(p, null);
    				}
    			}

    			if (/*stats*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(section, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if_block0.d();
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
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Results', slots, []);
    	let { questionType } = $$props;
    	let { wasCorrectAnswer } = $$props;
    	let { currentQuestion } = $$props;
    	let { stats } = $$props;
    	const writable_props = ['questionType', 'wasCorrectAnswer', 'currentQuestion', 'stats'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Results> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('questionType' in $$props) $$invalidate(0, questionType = $$props.questionType);
    		if ('wasCorrectAnswer' in $$props) $$invalidate(1, wasCorrectAnswer = $$props.wasCorrectAnswer);
    		if ('currentQuestion' in $$props) $$invalidate(2, currentQuestion = $$props.currentQuestion);
    		if ('stats' in $$props) $$invalidate(3, stats = $$props.stats);
    	};

    	$$self.$capture_state = () => ({
    		flags,
    		questionType,
    		wasCorrectAnswer,
    		currentQuestion,
    		stats
    	});

    	$$self.$inject_state = $$props => {
    		if ('questionType' in $$props) $$invalidate(0, questionType = $$props.questionType);
    		if ('wasCorrectAnswer' in $$props) $$invalidate(1, wasCorrectAnswer = $$props.wasCorrectAnswer);
    		if ('currentQuestion' in $$props) $$invalidate(2, currentQuestion = $$props.currentQuestion);
    		if ('stats' in $$props) $$invalidate(3, stats = $$props.stats);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [questionType, wasCorrectAnswer, currentQuestion, stats, click_handler];
    }

    class Results extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			questionType: 0,
    			wasCorrectAnswer: 1,
    			currentQuestion: 2,
    			stats: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Results",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*questionType*/ ctx[0] === undefined && !('questionType' in props)) {
    			console.warn("<Results> was created without expected prop 'questionType'");
    		}

    		if (/*wasCorrectAnswer*/ ctx[1] === undefined && !('wasCorrectAnswer' in props)) {
    			console.warn("<Results> was created without expected prop 'wasCorrectAnswer'");
    		}

    		if (/*currentQuestion*/ ctx[2] === undefined && !('currentQuestion' in props)) {
    			console.warn("<Results> was created without expected prop 'currentQuestion'");
    		}

    		if (/*stats*/ ctx[3] === undefined && !('stats' in props)) {
    			console.warn("<Results> was created without expected prop 'stats'");
    		}
    	}

    	get questionType() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set questionType(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wasCorrectAnswer() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wasCorrectAnswer(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentQuestion() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentQuestion(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stats() {
    		throw new Error("<Results>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stats(value) {
    		throw new Error("<Results>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\generic\Settings.svelte generated by Svelte v3.44.1 */
    const file$2 = "src\\generic\\Settings.svelte";

    function create_fragment$3(ctx) {
    	let section;
    	let form;
    	let p0;
    	let b0;
    	let t1;
    	let label0;
    	let input0;
    	let t2;
    	let t3;
    	let label1;
    	let input1;
    	let t4;
    	let t5;
    	let label2;
    	let input2;
    	let t6;
    	let t7;
    	let label3;
    	let input3;
    	let t8;
    	let t9;
    	let p1;
    	let b1;
    	let t11;
    	let label4;
    	let input4;
    	let t12;
    	let t13;
    	let label5;
    	let input5;
    	let t14;
    	let t15;
    	let label6;
    	let input6;
    	let t16;
    	let t17;
    	let p2;
    	let b2;
    	let t19;
    	let label7;
    	let input7;
    	let t20;
    	let t21;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			form = element("form");
    			p0 = element("p");
    			b0 = element("b");
    			b0.textContent = "Flag set";
    			t1 = space();
    			label0 = element("label");
    			input0 = element("input");
    			t2 = text("\r\n            All flags (195)");
    			t3 = space();
    			label1 = element("label");
    			input1 = element("input");
    			t4 = text("\r\n            Nordic cross flags (5)");
    			t5 = space();
    			label2 = element("label");
    			input2 = element("input");
    			t6 = text("\r\n            Three equal stripes flags (66)");
    			t7 = space();
    			label3 = element("label");
    			input3 = element("input");
    			t8 = text("\r\n            Triangle on hoist flags (18)");
    			t9 = space();
    			p1 = element("p");
    			b1 = element("b");
    			b1.textContent = "Filter out";
    			t11 = space();
    			label4 = element("label");
    			input4 = element("input");
    			t12 = text("\r\n            Do not hide any flags");
    			t13 = space();
    			label5 = element("label");
    			input5 = element("input");
    			t14 = text("\r\n            Hide flags I've already seen");
    			t15 = space();
    			label6 = element("label");
    			input6 = element("input");
    			t16 = text("\r\n            Hide flags I've gotten right >60% of the time");
    			t17 = space();
    			p2 = element("p");
    			b2 = element("b");
    			b2.textContent = "Extra settings";
    			t19 = space();
    			label7 = element("label");
    			input7 = element("input");
    			t20 = text("\r\n            Show flags I've gotten wrong more often");
    			t21 = space();
    			button = element("button");
    			button.textContent = "Exit";
    			add_location(b0, file$2, 20, 37, 797);
    			attr_dev(p0, "class", "settings-category svelte-1tmq7vv");
    			add_location(p0, file$2, 20, 8, 768);
    			attr_dev(input0, "type", "radio");
    			attr_dev(input0, "id", "all-flags");
    			attr_dev(input0, "name", "flag-set");
    			input0.__value = "All flags";
    			input0.value = input0.__value;
    			attr_dev(input0, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[5][0].push(input0);
    			add_location(input0, file$2, 22, 12, 863);
    			attr_dev(label0, "for", "all-flags");
    			attr_dev(label0, "class", "svelte-1tmq7vv");
    			add_location(label0, file$2, 21, 8, 826);
    			attr_dev(input1, "type", "radio");
    			attr_dev(input1, "id", "nordic-cross-flags");
    			attr_dev(input1, "name", "flag-set");
    			input1.__value = "Nordic cross flags";
    			input1.value = input1.__value;
    			attr_dev(input1, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[5][0].push(input1);
    			add_location(input1, file$2, 26, 12, 1058);
    			attr_dev(label1, "for", "nordic-cross-flags");
    			attr_dev(label1, "class", "svelte-1tmq7vv");
    			add_location(label1, file$2, 25, 8, 1012);
    			attr_dev(input2, "type", "radio");
    			attr_dev(input2, "id", "three-stripe-flags");
    			attr_dev(input2, "name", "flag-set");
    			input2.__value = "Three stripe flags";
    			input2.value = input2.__value;
    			attr_dev(input2, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[5][0].push(input2);
    			add_location(input2, file$2, 36, 12, 1376);
    			attr_dev(label2, "for", "three-stripe-flags");
    			attr_dev(label2, "class", "svelte-1tmq7vv");
    			add_location(label2, file$2, 35, 8, 1330);
    			attr_dev(input3, "type", "radio");
    			attr_dev(input3, "id", "hoist-triangle-flags");
    			attr_dev(input3, "name", "flag-set");
    			input3.__value = "Hoist triangle flags";
    			input3.value = input3.__value;
    			attr_dev(input3, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[5][0].push(input3);
    			add_location(input3, file$2, 46, 12, 1704);
    			attr_dev(label3, "for", "hoist-triangle-flags");
    			attr_dev(label3, "class", "svelte-1tmq7vv");
    			add_location(label3, file$2, 45, 8, 1656);
    			add_location(b1, file$2, 56, 37, 2017);
    			attr_dev(p1, "class", "settings-category svelte-1tmq7vv");
    			add_location(p1, file$2, 56, 8, 1988);
    			attr_dev(input4, "type", "radio");
    			attr_dev(input4, "id", "show-all-mode");
    			attr_dev(input4, "name", "mode");
    			input4.__value = "Show all mode";
    			input4.value = input4.__value;
    			attr_dev(input4, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[5][1].push(input4);
    			add_location(input4, file$2, 58, 12, 2089);
    			attr_dev(label4, "for", "show-all-mode");
    			attr_dev(label4, "class", "svelte-1tmq7vv");
    			add_location(label4, file$2, 57, 8, 2048);
    			attr_dev(input5, "type", "radio");
    			attr_dev(input5, "id", "show-unseen-mode");
    			attr_dev(input5, "name", "mode");
    			input5.__value = "Show unseen mode";
    			input5.value = input5.__value;
    			attr_dev(input5, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[5][1].push(input5);
    			add_location(input5, file$2, 62, 12, 2301);
    			attr_dev(label5, "for", "show-unseen-mode");
    			attr_dev(label5, "class", "svelte-1tmq7vv");
    			add_location(label5, file$2, 61, 8, 2257);
    			attr_dev(input6, "type", "radio");
    			attr_dev(input6, "id", "show-unknown-mode");
    			attr_dev(input6, "name", "mode");
    			input6.__value = "Show unknown mode";
    			input6.value = input6.__value;
    			attr_dev(input6, "class", "svelte-1tmq7vv");
    			/*$$binding_groups*/ ctx[5][1].push(input6);
    			add_location(input6, file$2, 72, 12, 2625);
    			attr_dev(label6, "for", "show-unknown-mode");
    			attr_dev(label6, "class", "svelte-1tmq7vv");
    			add_location(label6, file$2, 71, 8, 2580);
    			add_location(b2, file$2, 82, 37, 2954);
    			attr_dev(p2, "class", "settings-category svelte-1tmq7vv");
    			add_location(p2, file$2, 82, 8, 2925);
    			attr_dev(input7, "type", "checkbox");
    			attr_dev(input7, "id", "reshow-unknown");
    			attr_dev(input7, "name", "reshow-unknwon");
    			input7.__value = "Re-show unknown";
    			input7.value = input7.__value;
    			attr_dev(input7, "class", "svelte-1tmq7vv");
    			add_location(input7, file$2, 84, 12, 3031);
    			attr_dev(label7, "for", "reshow-unknown");
    			attr_dev(label7, "class", "svelte-1tmq7vv");
    			add_location(label7, file$2, 83, 8, 2989);
    			attr_dev(button, "id", "exit");
    			add_location(button, file$2, 93, 8, 3328);
    			attr_dev(form, "class", "svelte-1tmq7vv");
    			add_location(form, file$2, 19, 4, 752);
    			attr_dev(section, "id", "settings-section");
    			attr_dev(section, "class", "svelte-1tmq7vv");
    			add_location(section, file$2, 18, 0, 715);
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
    			append_dev(form, label0);
    			append_dev(label0, input0);
    			input0.checked = input0.__value === /*flagSet*/ ctx[0];
    			append_dev(label0, t2);
    			append_dev(form, t3);
    			append_dev(form, label1);
    			append_dev(label1, input1);
    			input1.checked = input1.__value === /*flagSet*/ ctx[0];
    			append_dev(label1, t4);
    			append_dev(form, t5);
    			append_dev(form, label2);
    			append_dev(label2, input2);
    			input2.checked = input2.__value === /*flagSet*/ ctx[0];
    			append_dev(label2, t6);
    			append_dev(form, t7);
    			append_dev(form, label3);
    			append_dev(label3, input3);
    			input3.checked = input3.__value === /*flagSet*/ ctx[0];
    			append_dev(label3, t8);
    			append_dev(form, t9);
    			append_dev(form, p1);
    			append_dev(p1, b1);
    			append_dev(form, t11);
    			append_dev(form, label4);
    			append_dev(label4, input4);
    			input4.checked = input4.__value === /*flagsToFilterOut*/ ctx[1];
    			append_dev(label4, t12);
    			append_dev(form, t13);
    			append_dev(form, label5);
    			append_dev(label5, input5);
    			input5.checked = input5.__value === /*flagsToFilterOut*/ ctx[1];
    			append_dev(label5, t14);
    			append_dev(form, t15);
    			append_dev(form, label6);
    			append_dev(label6, input6);
    			input6.checked = input6.__value === /*flagsToFilterOut*/ ctx[1];
    			append_dev(label6, t16);
    			append_dev(form, t17);
    			append_dev(form, p2);
    			append_dev(p2, b2);
    			append_dev(form, t19);
    			append_dev(form, label7);
    			append_dev(label7, input7);
    			input7.checked = /*reshowFlags*/ ctx[2];
    			append_dev(label7, t20);
    			append_dev(form, t21);
    			append_dev(form, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*input0_change_handler*/ ctx[4]),
    					listen_dev(input1, "change", /*input1_change_handler*/ ctx[6]),
    					listen_dev(input2, "change", /*input2_change_handler*/ ctx[7]),
    					listen_dev(input3, "change", /*input3_change_handler*/ ctx[8]),
    					listen_dev(input4, "change", /*input4_change_handler*/ ctx[9]),
    					listen_dev(input5, "change", /*input5_change_handler*/ ctx[10]),
    					listen_dev(input6, "change", /*input6_change_handler*/ ctx[11]),
    					listen_dev(input7, "change", /*input7_change_handler*/ ctx[12]),
    					listen_dev(button, "click", prevent_default(/*handleSaveSettings*/ ctx[3]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*flagSet*/ 1) {
    				input0.checked = input0.__value === /*flagSet*/ ctx[0];
    			}

    			if (dirty & /*flagSet*/ 1) {
    				input1.checked = input1.__value === /*flagSet*/ ctx[0];
    			}

    			if (dirty & /*flagSet*/ 1) {
    				input2.checked = input2.__value === /*flagSet*/ ctx[0];
    			}

    			if (dirty & /*flagSet*/ 1) {
    				input3.checked = input3.__value === /*flagSet*/ ctx[0];
    			}

    			if (dirty & /*flagsToFilterOut*/ 2) {
    				input4.checked = input4.__value === /*flagsToFilterOut*/ ctx[1];
    			}

    			if (dirty & /*flagsToFilterOut*/ 2) {
    				input5.checked = input5.__value === /*flagsToFilterOut*/ ctx[1];
    			}

    			if (dirty & /*flagsToFilterOut*/ 2) {
    				input6.checked = input6.__value === /*flagsToFilterOut*/ ctx[1];
    			}

    			if (dirty & /*reshowFlags*/ 4) {
    				input7.checked = /*reshowFlags*/ ctx[2];
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			/*$$binding_groups*/ ctx[5][0].splice(/*$$binding_groups*/ ctx[5][0].indexOf(input0), 1);
    			/*$$binding_groups*/ ctx[5][0].splice(/*$$binding_groups*/ ctx[5][0].indexOf(input1), 1);
    			/*$$binding_groups*/ ctx[5][0].splice(/*$$binding_groups*/ ctx[5][0].indexOf(input2), 1);
    			/*$$binding_groups*/ ctx[5][0].splice(/*$$binding_groups*/ ctx[5][0].indexOf(input3), 1);
    			/*$$binding_groups*/ ctx[5][1].splice(/*$$binding_groups*/ ctx[5][1].indexOf(input4), 1);
    			/*$$binding_groups*/ ctx[5][1].splice(/*$$binding_groups*/ ctx[5][1].indexOf(input5), 1);
    			/*$$binding_groups*/ ctx[5][1].splice(/*$$binding_groups*/ ctx[5][1].indexOf(input6), 1);
    			mounted = false;
    			run_all(dispose);
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
    	validate_slots('Settings', slots, []);
    	let dispatch = createEventDispatcher();
    	let oldFlagSet = getFlagSetString();
    	let oldFlagsToFilterOut = getMode();
    	let flagSet = oldFlagSet;
    	let flagsToFilterOut = oldFlagsToFilterOut;
    	let reshowFlags = getShouldReshowUnknown();

    	const handleSaveSettings = () => {
    		const wasSettingsUpdated = flagSet != oldFlagSet || flagsToFilterOut != oldFlagsToFilterOut;

    		if (wasSettingsUpdated) {
    			localStorage.setItem("flag-set", flagSet);
    			localStorage.setItem("mode", flagsToFilterOut);
    		}

    		dispatch("settingsClosed", wasSettingsUpdated);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[], []];

    	function input0_change_handler() {
    		flagSet = this.__value;
    		$$invalidate(0, flagSet);
    	}

    	function input1_change_handler() {
    		flagSet = this.__value;
    		$$invalidate(0, flagSet);
    	}

    	function input2_change_handler() {
    		flagSet = this.__value;
    		$$invalidate(0, flagSet);
    	}

    	function input3_change_handler() {
    		flagSet = this.__value;
    		$$invalidate(0, flagSet);
    	}

    	function input4_change_handler() {
    		flagsToFilterOut = this.__value;
    		$$invalidate(1, flagsToFilterOut);
    	}

    	function input5_change_handler() {
    		flagsToFilterOut = this.__value;
    		$$invalidate(1, flagsToFilterOut);
    	}

    	function input6_change_handler() {
    		flagsToFilterOut = this.__value;
    		$$invalidate(1, flagsToFilterOut);
    	}

    	function input7_change_handler() {
    		reshowFlags = this.checked;
    		$$invalidate(2, reshowFlags);
    	}

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		storage,
    		dispatch,
    		oldFlagSet,
    		oldFlagsToFilterOut,
    		flagSet,
    		flagsToFilterOut,
    		reshowFlags,
    		handleSaveSettings
    	});

    	$$self.$inject_state = $$props => {
    		if ('dispatch' in $$props) dispatch = $$props.dispatch;
    		if ('oldFlagSet' in $$props) oldFlagSet = $$props.oldFlagSet;
    		if ('oldFlagsToFilterOut' in $$props) oldFlagsToFilterOut = $$props.oldFlagsToFilterOut;
    		if ('flagSet' in $$props) $$invalidate(0, flagSet = $$props.flagSet);
    		if ('flagsToFilterOut' in $$props) $$invalidate(1, flagsToFilterOut = $$props.flagsToFilterOut);
    		if ('reshowFlags' in $$props) $$invalidate(2, reshowFlags = $$props.reshowFlags);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		flagSet,
    		flagsToFilterOut,
    		reshowFlags,
    		handleSaveSettings,
    		input0_change_handler,
    		$$binding_groups,
    		input1_change_handler,
    		input2_change_handler,
    		input3_change_handler,
    		input4_change_handler,
    		input5_change_handler,
    		input6_change_handler,
    		input7_change_handler
    	];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\generic\TopBar.svelte generated by Svelte v3.44.1 */

    const file$1 = "src\\generic\\TopBar.svelte";

    function create_fragment$2(ctx) {
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
    			t2 = text(/*numEligibleCountries*/ ctx[1]);
    			t3 = space();
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(p, "id", "counter");
    			attr_dev(p, "class", "svelte-1eot507");
    			add_location(p, file$1, 5, 4, 127);
    			attr_dev(path0, "d", "M0,0h24v24H0V0z");
    			attr_dev(path0, "fill", "none");
    			add_location(path0, file$1, 9, 12, 307);
    			attr_dev(path1, "d", "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z");
    			add_location(path1, file$1, 10, 12, 361);
    			add_location(g, file$1, 8, 8, 290);
    			attr_dev(svg, "id", "settings-icon");
    			attr_dev(svg, "height", "24px");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "width", "24px");
    			attr_dev(svg, "class", "svelte-1eot507");
    			add_location(svg, file$1, 7, 4, 200);
    			attr_dev(section, "id", "top-bar");
    			attr_dev(section, "class", "svelte-1eot507");
    			add_location(section, file$1, 4, 0, 99);
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
    			if (dirty & /*numEligibleCountries*/ 2) set_data_dev(t2, /*numEligibleCountries*/ ctx[1]);
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
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TopBar', slots, []);
    	let { numQuestionsAnswered } = $$props;
    	let { numEligibleCountries } = $$props;
    	const writable_props = ['numQuestionsAnswered', 'numEligibleCountries'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopBar> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('numQuestionsAnswered' in $$props) $$invalidate(0, numQuestionsAnswered = $$props.numQuestionsAnswered);
    		if ('numEligibleCountries' in $$props) $$invalidate(1, numEligibleCountries = $$props.numEligibleCountries);
    	};

    	$$self.$capture_state = () => ({
    		numQuestionsAnswered,
    		numEligibleCountries
    	});

    	$$self.$inject_state = $$props => {
    		if ('numQuestionsAnswered' in $$props) $$invalidate(0, numQuestionsAnswered = $$props.numQuestionsAnswered);
    		if ('numEligibleCountries' in $$props) $$invalidate(1, numEligibleCountries = $$props.numEligibleCountries);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [numQuestionsAnswered, numEligibleCountries, click_handler];
    }

    class TopBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			numQuestionsAnswered: 0,
    			numEligibleCountries: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TopBar",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*numQuestionsAnswered*/ ctx[0] === undefined && !('numQuestionsAnswered' in props)) {
    			console.warn("<TopBar> was created without expected prop 'numQuestionsAnswered'");
    		}

    		if (/*numEligibleCountries*/ ctx[1] === undefined && !('numEligibleCountries' in props)) {
    			console.warn("<TopBar> was created without expected prop 'numEligibleCountries'");
    		}
    	}

    	get numQuestionsAnswered() {
    		throw new Error("<TopBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set numQuestionsAnswered(value) {
    		throw new Error("<TopBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get numEligibleCountries() {
    		throw new Error("<TopBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set numEligibleCountries(value) {
    		throw new Error("<TopBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\generic\Content.svelte generated by Svelte v3.44.1 */
    const file = "src\\generic\\Content.svelte";

    // (49:4) {#if showSettings}
    function create_if_block_1(ctx) {
    	let settings;
    	let current;
    	settings = new Settings({ $$inline: true });
    	settings.$on("settingsClosed", /*handleSettingsClosed*/ ctx[10]);

    	const block = {
    		c: function create() {
    			create_component(settings.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(settings, target, anchor);
    			current = true;
    		},
    		p: noop,
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
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(49:4) {#if showSettings}",
    		ctx
    	});

    	return block;
    }

    // (62:8) {:else}
    function create_else_block(ctx) {
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
    			attr_dev(input, "title", input_title_value = "Guess the " + /*questionType*/ ctx[0].toLowerCase());
    			attr_dev(input, "autocomplete", "off");
    			input.autofocus = true;
    			attr_dev(input, "class", "svelte-95odf4");
    			add_location(input, file, 64, 16, 2549);
    			attr_dev(button, "id", "submit-button");
    			add_location(button, file, 71, 16, 2797);
    			add_location(form, file, 63, 12, 2485);
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
    			if (dirty & /*questionType*/ 1 && input_title_value !== (input_title_value = "Guess the " + /*questionType*/ ctx[0].toLowerCase())) {
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
    		id: create_else_block.name,
    		type: "else",
    		source: "(62:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (60:8) {#if showResults}
    function create_if_block(ctx) {
    	let results;
    	let current;

    	results = new Results({
    			props: {
    				wasCorrectAnswer: /*wasCorrectAnswer*/ ctx[7],
    				currentQuestion: /*currentQuestion*/ ctx[3],
    				questionType: /*questionType*/ ctx[0],
    				stats: /*stats*/ ctx[6]
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
    			if (dirty & /*wasCorrectAnswer*/ 128) results_changes.wasCorrectAnswer = /*wasCorrectAnswer*/ ctx[7];
    			if (dirty & /*currentQuestion*/ 8) results_changes.currentQuestion = /*currentQuestion*/ ctx[3];
    			if (dirty & /*questionType*/ 1) results_changes.questionType = /*questionType*/ ctx[0];
    			if (dirty & /*stats*/ 64) results_changes.stats = /*stats*/ ctx[6];
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
    		id: create_if_block.name,
    		type: "if",
    		source: "(60:8) {#if showResults}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let t0;
    	let section;
    	let topbar;
    	let t1;
    	let img;
    	let img_alt_value;
    	let img_src_value;
    	let t2;
    	let current_block_type_index;
    	let if_block1;
    	let current;
    	let if_block0 = /*showSettings*/ ctx[4] && create_if_block_1(ctx);

    	topbar = new TopBar({
    			props: {
    				numQuestionsAnswered: /*numQuestionsAnswered*/ ctx[1],
    				numEligibleCountries: /*numEligibleCountries*/ ctx[2]
    			},
    			$$inline: true
    		});

    	topbar.$on("click", /*handleShowSettings*/ ctx[11]);
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*showResults*/ ctx[5]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			section = element("section");
    			create_component(topbar.$$.fragment);
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			if_block1.c();
    			attr_dev(img, "id", "flag");
    			attr_dev(img, "alt", img_alt_value = "" + (/*questionType*/ ctx[0] + " flag"));
    			if (!src_url_equal(img.src, img_src_value = flags.get(/*currentQuestion*/ ctx[3])?.imageUrl)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "svelte-95odf4");
    			add_location(img, file, 58, 8, 2183);
    			attr_dev(section, "id", "quiz-section");
    			attr_dev(section, "class", "svelte-95odf4");
    			toggle_class(section, "success-animation", /*showResults*/ ctx[5] && /*wasCorrectAnswer*/ ctx[7]);
    			toggle_class(section, "error-animation", /*showResults*/ ctx[5] && !/*wasCorrectAnswer*/ ctx[7]);
    			add_location(section, file, 52, 4, 1902);
    			attr_dev(main, "class", "svelte-95odf4");
    			add_location(main, file, 47, 0, 1790);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			if (if_block0) if_block0.m(main, null);
    			append_dev(main, t0);
    			append_dev(main, section);
    			mount_component(topbar, section, null);
    			append_dev(section, t1);
    			append_dev(section, img);
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
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(main, t0);
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
    			if (dirty & /*numEligibleCountries*/ 4) topbar_changes.numEligibleCountries = /*numEligibleCountries*/ ctx[2];
    			topbar.$set(topbar_changes);

    			if (!current || dirty & /*questionType*/ 1 && img_alt_value !== (img_alt_value = "" + (/*questionType*/ ctx[0] + " flag"))) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (!current || dirty & /*currentQuestion*/ 8 && !src_url_equal(img.src, img_src_value = flags.get(/*currentQuestion*/ ctx[3])?.imageUrl)) {
    				attr_dev(img, "src", img_src_value);
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
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(topbar.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block0) if_block0.d();
    			destroy_component(topbar);
    			if_blocks[current_block_type_index].d();
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
    	validate_slots('Content', slots, []);
    	let { isCorrectAnswer } = $$props;
    	let { getNextQuestion } = $$props;
    	let { recalculateEligibleQuestions } = $$props;
    	let { questionType } = $$props;

    	// Begin internal stuff //////////////////////////////////////
    	let numQuestionsAnswered = 0;

    	let numEligibleCountries = recalculateEligibleQuestions();
    	let currentQuestion = getNextQuestion(numQuestionsAnswered);
    	let showSettings = false;
    	let showResults = false;
    	let stats;
    	let wasCorrectAnswer;

    	const handleNext = () => {
    		$$invalidate(1, numQuestionsAnswered = (numQuestionsAnswered + 1) % numEligibleCountries);
    		$$invalidate(3, currentQuestion = getNextQuestion(numQuestionsAnswered, currentQuestion));
    		$$invalidate(5, showResults = false);
    	};

    	const handleSubmit = event => {
    		const form = event.target;
    		const userInput = form.input.value;
    		$$invalidate(7, wasCorrectAnswer = isCorrectAnswer(currentQuestion, userInput));
    		setStats(currentQuestion, wasCorrectAnswer, userInput);
    		$$invalidate(5, showResults = true);
    		$$invalidate(6, stats = getStats(currentQuestion));
    	};

    	const handleSettingsClosed = event => {
    		const wasSettingsUpdated = event.detail;

    		if (wasSettingsUpdated) {
    			$$invalidate(2, numEligibleCountries = recalculateEligibleQuestions());
    			$$invalidate(3, currentQuestion = getNextQuestion(numQuestionsAnswered, currentQuestion));
    			$$invalidate(1, numQuestionsAnswered = 0);
    			$$invalidate(5, showResults = false);
    		}

    		$$invalidate(4, showSettings = false);
    	};

    	const handleShowSettings = () => {
    		$$invalidate(4, showSettings = true);
    	};

    	const writable_props = [
    		'isCorrectAnswer',
    		'getNextQuestion',
    		'recalculateEligibleQuestions',
    		'questionType'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Content> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('isCorrectAnswer' in $$props) $$invalidate(12, isCorrectAnswer = $$props.isCorrectAnswer);
    		if ('getNextQuestion' in $$props) $$invalidate(13, getNextQuestion = $$props.getNextQuestion);
    		if ('recalculateEligibleQuestions' in $$props) $$invalidate(14, recalculateEligibleQuestions = $$props.recalculateEligibleQuestions);
    		if ('questionType' in $$props) $$invalidate(0, questionType = $$props.questionType);
    	};

    	$$self.$capture_state = () => ({
    		Results,
    		Settings,
    		TopBar,
    		storage,
    		flags,
    		isCorrectAnswer,
    		getNextQuestion,
    		recalculateEligibleQuestions,
    		questionType,
    		numQuestionsAnswered,
    		numEligibleCountries,
    		currentQuestion,
    		showSettings,
    		showResults,
    		stats,
    		wasCorrectAnswer,
    		handleNext,
    		handleSubmit,
    		handleSettingsClosed,
    		handleShowSettings
    	});

    	$$self.$inject_state = $$props => {
    		if ('isCorrectAnswer' in $$props) $$invalidate(12, isCorrectAnswer = $$props.isCorrectAnswer);
    		if ('getNextQuestion' in $$props) $$invalidate(13, getNextQuestion = $$props.getNextQuestion);
    		if ('recalculateEligibleQuestions' in $$props) $$invalidate(14, recalculateEligibleQuestions = $$props.recalculateEligibleQuestions);
    		if ('questionType' in $$props) $$invalidate(0, questionType = $$props.questionType);
    		if ('numQuestionsAnswered' in $$props) $$invalidate(1, numQuestionsAnswered = $$props.numQuestionsAnswered);
    		if ('numEligibleCountries' in $$props) $$invalidate(2, numEligibleCountries = $$props.numEligibleCountries);
    		if ('currentQuestion' in $$props) $$invalidate(3, currentQuestion = $$props.currentQuestion);
    		if ('showSettings' in $$props) $$invalidate(4, showSettings = $$props.showSettings);
    		if ('showResults' in $$props) $$invalidate(5, showResults = $$props.showResults);
    		if ('stats' in $$props) $$invalidate(6, stats = $$props.stats);
    		if ('wasCorrectAnswer' in $$props) $$invalidate(7, wasCorrectAnswer = $$props.wasCorrectAnswer);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		questionType,
    		numQuestionsAnswered,
    		numEligibleCountries,
    		currentQuestion,
    		showSettings,
    		showResults,
    		stats,
    		wasCorrectAnswer,
    		handleNext,
    		handleSubmit,
    		handleSettingsClosed,
    		handleShowSettings,
    		isCorrectAnswer,
    		getNextQuestion,
    		recalculateEligibleQuestions
    	];
    }

    class Content extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			isCorrectAnswer: 12,
    			getNextQuestion: 13,
    			recalculateEligibleQuestions: 14,
    			questionType: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Content",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*isCorrectAnswer*/ ctx[12] === undefined && !('isCorrectAnswer' in props)) {
    			console.warn("<Content> was created without expected prop 'isCorrectAnswer'");
    		}

    		if (/*getNextQuestion*/ ctx[13] === undefined && !('getNextQuestion' in props)) {
    			console.warn("<Content> was created without expected prop 'getNextQuestion'");
    		}

    		if (/*recalculateEligibleQuestions*/ ctx[14] === undefined && !('recalculateEligibleQuestions' in props)) {
    			console.warn("<Content> was created without expected prop 'recalculateEligibleQuestions'");
    		}

    		if (/*questionType*/ ctx[0] === undefined && !('questionType' in props)) {
    			console.warn("<Content> was created without expected prop 'questionType'");
    		}
    	}

    	get isCorrectAnswer() {
    		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isCorrectAnswer(value) {
    		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getNextQuestion() {
    		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getNextQuestion(value) {
    		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get recalculateEligibleQuestions() {
    		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set recalculateEligibleQuestions(value) {
    		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get questionType() {
    		throw new Error("<Content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set questionType(value) {
    		throw new Error("<Content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.1 */

    const { Object: Object_1 } = globals;

    function create_fragment(ctx) {
    	let content;
    	let current;

    	content = new Content({
    			props: {
    				isCorrectAnswer: /*isCorrectAnswer*/ ctx[0],
    				recalculateEligibleQuestions: /*recalculateEligibleQuestions*/ ctx[2],
    				getNextQuestion: /*getNextQuestion*/ ctx[1],
    				questionType: "Country"
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
    		p: noop,
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
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let eligibleCountries;

    	const isCorrectAnswer = (currentCountry, guess) => {
    		if (areStringsSimilar(currentCountry, guess)) return true;
    		const alternateNames = flags.get(currentCountry).alternateNames;

    		for (let i = 0; i < alternateNames.length; i++) {
    			if (areStringsSimilar(alternateNames[i], guess)) return true;
    		}

    		return false;
    	};

    	const getNextQuestion = (numQuestionsAnswered, currentCountry) => {
    		let result;

    		if (numQuestionsAnswered % 5 == 0 && getShouldReshowUnknown()) {
    			const flagSet = getFlagSet();

    			for (let i = 0; i < flagSet.length; i++) {
    				const stats = getStats(flagSet[i]);

    				if (stats && flagSet[i] != currentCountry && stats.percentCorrect < 0.6) {
    					result = flagSet[i];
    					_prefetchNextImages(result);
    					return result;
    				}
    			}
    		}

    		if (eligibleCountries.length == 0) recalculateEligibleQuestions();
    		result = eligibleCountries.pop();
    		_prefetchNextImages(result);
    		return result;
    	};

    	/** Returns length of new eligible countries list */
    	const recalculateEligibleQuestions = () => {
    		const mode = getMode();
    		let flagSet = getFlagSet();

    		if (mode == "Show unseen mode") {
    			const seenCountries = Object.keys(localStorage);
    			flagSet = flagSet.filter(country => !seenCountries.includes(country));
    		} else if (mode == "Show unknown mode") {
    			flagSet = flagSet.filter(country => {
    				const stats = getStats(country);

    				return stats
    				? stats.percentCorrect < 0.6 || stats.numCorrectGuesses < 2
    				: true;
    			});
    		}

    		if (flagSet.length == 0) {
    			const allCountries = shuffle([...flags.keys()]);
    			flagSet = allCountries;
    		}

    		eligibleCountries = flagSet;
    		return eligibleCountries.length;
    	};

    	const _prefetchNextImages = currentCountry => {
    		// Pre-fetch failure page images
    		const stats = getStats(currentCountry);

    		if (stats) {
    			for (let i = 0; i < stats.incorrectGuesses.length; i++) {
    				const country = flags.get(stats.incorrectGuesses[i]);

    				if (country) {
    					const image = new Image();
    					image.src = country.imageUrl;
    				}
    			}
    		}

    		// Pre-fetch next image
    		if (eligibleCountries.length >= 1) {
    			const nextCountry = eligibleCountries[eligibleCountries.length - 1];
    			const image = new Image();
    			image.src = flags.get(nextCountry).imageUrl;
    		}
    	};

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Content,
    		areStringsSimilar,
    		flags,
    		storage,
    		shuffle,
    		eligibleCountries,
    		isCorrectAnswer,
    		getNextQuestion,
    		recalculateEligibleQuestions,
    		_prefetchNextImages
    	});

    	$$self.$inject_state = $$props => {
    		if ('eligibleCountries' in $$props) eligibleCountries = $$props.eligibleCountries;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isCorrectAnswer, getNextQuestion, recalculateEligibleQuestions];
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
