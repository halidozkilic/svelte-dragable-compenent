
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
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
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
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
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
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
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
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
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
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
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

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).
    var getRandomValues;
    var rnds8 = new Uint8Array(16);
    function rng() {
      // lazy load so that environments that need to polyfill have a chance to do so
      if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

        if (!getRandomValues) {
          throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
      }

      return getRandomValues(rnds8);
    }

    var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

    function validate(uuid) {
      return typeof uuid === 'string' && REGEX.test(uuid);
    }

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */

    var byteToHex = [];

    for (var i = 0; i < 256; ++i) {
      byteToHex.push((i + 0x100).toString(16).substr(1));
    }

    function stringify(arr) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // Note: Be careful editing this code!  It's been tuned for performance
      // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
      var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
      // of the following:
      // - One or more input array values don't map to a hex octet (leading to
      // "undefined" in the uuid)
      // - Invalid input values for the RFC `version` or `variant` fields

      if (!validate(uuid)) {
        throw TypeError('Stringified UUID is invalid');
      }

      return uuid;
    }

    function v4(options, buf, offset) {
      options = options || {};
      var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        offset = offset || 0;

        for (var i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }

        return buf;
      }

      return stringify(rnds);
    }

    class Utils {
      static bindMethods(o, methods) {
        const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(o));

        methodNames.forEach((methodName) => {
          if (methods.includes(o[methodName])) {
            o[methodName] = o[methodName].bind(o);
          }
        });
      }
    }

    class DraggableEvent extends Event {
      get target() {
        return this._target || this.baseEvent.target;
      }

      get clientX() {
        return this.baseEvent.clientX;
      }

      get clientY() {
        return this.baseEvent.clientY;
      }

      constructor(name, baseEvent, extraParams = {}) {
        super(name);

        this.baseEvent = baseEvent;

        for (const key of Object.keys(extraParams)) {
          if (key === 'target') {
            this._target = extraParams.target;
            continue;
          }

          if (this.hasOwnProperty(key)) {
            throw new Error(`Error: Assigning to the native property ${key}`);
          }
          this[key] = extraParams[key];
        }
      }
    }

    class Draggable extends EventTarget {

      constructor() {
        super();

        this.units = {};

        Utils.bindMethods(this, [
          this.onPointerDown,
          this.onPointerMove,
          this.onPointerUp,
        ]);

        this.state = {};

        document.addEventListener('pointerdown', this.onPointerDown);
      }

      createUnit() {
        const id = v4();

        this.units[id] = {
          draggableElements: new Map(),
        };

        return id;
      }

      addDraggableElement(el, id, data) {
        const unit = this.units[id];

        if (!unit) {
          return false;
        }

        unit.draggableElements.set(el, data);
      }

      setDropZone(zone, id) {
        const unit = this.units[id];

        if (!unit) {
          return false;
        }

        unit.zone = zone;
      }

      onPointerDown(ev) {
        this.state = {
          el: ev.target,
          x: ev.clientX,
          y: ev.clientY,
          initX: ev.target.offsetLeft,
          initY: ev.target.offsetTop,
        };

        this.state.downElement = ev.target;

        document.addEventListener('pointermove', this.onPointerMove);
        document.addEventListener('pointerup', this.onPointerUp);
      }

      shouldBeginDrag(ev) {
        const movedSome =
          Math.abs(ev.clientX - this.state.x) > 40 ||
          Math.abs(ev.clientY - this.state.y) > 40;

        if (movedSome) {
          // drag starts
          const id = this.state.downElement.getAttribute('data-draggable-id');

          if (id) {
            const event = new DraggableEvent(`dragstart:${id}`, {}, {
              target: this.state.downElement,
            });

            this.dispatchEvent(event);

            this.state.draggingElement = this.state.downElement;

            const cloneWidth = 200;
            this.state.draggingElement.offsetHeight;

            const clone = this.state.clone || this.state.draggingElement.cloneNode(true);
            
            clone.style.position = 'absolute';
            clone.style.width = cloneWidth + 'px';

            [...clone.children].forEach((el) => el.style.pointerEvents = 'none');

            document.body.appendChild(clone);

            this.state.clone = clone;

            // initial positioning
            this.onDrag(ev);

          } else {
            this.cancelDrag();
          }
        }
      }

      getUnitIdsHavingElement(el) {
        return Object.keys(this.units).filter((id) => {
          if (this.units[id] && this.units[id].draggableElements.has(el)) {
            return true;
          }
        });
      }

      onDrag(ev) {
        const unitIdsHavingElement = this.getUnitIdsHavingElement(this.state.downElement);

        if (unitIdsHavingElement.length > 0) {
          const newX = this.state.initX + (ev.clientX - this.state.x);
          const newY = this.state.initY + (ev.clientY - this.state.y);

          this.state.clone.style.left = newX + 'px';
          this.state.clone.style.top = newY + 'px';

          const elements = Array.from(document.elementsFromPoint(ev.clientX, ev.clientY));
          const cloneIndex = elements.findIndex((element) => element === this.state.clone);
          
          elements.splice(0, cloneIndex);
          
          for (const element of Array.from(elements))

          for (const id of unitIdsHavingElement) {
            const unit = this.units[id];

            if ([...elements].includes(unit.zone)) {
              if (!unit.inDropZone) {
                unit.inDropZone = true;
                const event = new DraggableEvent(`dragenter:${id}`);
                this.dispatchEvent(event);
              }

              const event = new DraggableEvent(`drag:${id}`, ev, {
                elements: elements,
                downElement: this.state.downElement,
              });

              this.dispatchEvent(event);
            } else if (unit.inDropZone) {
              unit.inDropZone = false;
              const event = new DraggableEvent(`dragleave:${id}`);
              this.dispatchEvent(event);
            }
          }
        }
      }

      onPointerMove(ev) {
        if (!this.state.draggingElement) {
          return this.shouldBeginDrag(ev);
        }

        return this.onDrag(ev);
      }

      cancelDrag() {
        if (this.state.clone) {
          this.state.clone.remove();
        }

        this.state = {};
        document.removeEventListener('pointermove', this.onPointerMove);
        document.removeEventListener('pointerup', this.onPointerUp);
      }

      onPointerUp(ev) {
        // drag ends
        const unitIdsHavingElement = this.getUnitIdsHavingElement(this.state.downElement);
        const elements = document.elementsFromPoint(ev.clientX, ev.clientY);
        const cloneIndex = elements.findIndex((element) => element === this.state.clone);

        elements.splice(0, cloneIndex);

        for (const id of unitIdsHavingElement) {
          const unit = this.units[id];
          
          const event = new DraggableEvent(`drop:${id}`, ev, {
            elements,
            data: unit.draggableElements.get(this.state.downElement),
          });

          this.dispatchEvent(event);
        }

        this.cancelDrag();
      }
    }

    const draggableStore = readable(new Draggable());

    /* src\Cell.svelte generated by Svelte v3.44.1 */
    const file$3 = "src\\Cell.svelte";

    function create_fragment$4(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "[=]";
    			attr_dev(div0, "class", "handle svelte-zdstf8");
    			add_location(div0, file$3, 36, 2, 651);
    			attr_dev(div1, "class", "cell field svelte-zdstf8");
    			set_style(div1, "background-color", /*row*/ ctx[0].color);
    			attr_dev(div1, "data-type", "cell");
    			attr_dev(div1, "data-index", /*index*/ ctx[1]);
    			add_location(div1, file$3, 30, 0, 535);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*row*/ 1) {
    				set_style(div1, "background-color", /*row*/ ctx[0].color);
    			}

    			if (dirty & /*index*/ 2) {
    				attr_dev(div1, "data-index", /*index*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
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
    	validate_slots('Cell', slots, []);
    	let { row } = $$props;
    	let { index } = $$props;
    	const writable_props = ['row', 'index'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cell> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('row' in $$props) $$invalidate(0, row = $$props.row);
    		if ('index' in $$props) $$invalidate(1, index = $$props.index);
    	};

    	$$self.$capture_state = () => ({ draggableStore, row, index });

    	$$self.$inject_state = $$props => {
    		if ('row' in $$props) $$invalidate(0, row = $$props.row);
    		if ('index' in $$props) $$invalidate(1, index = $$props.index);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [row, index];
    }

    class Cell extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { row: 0, index: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cell",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*row*/ ctx[0] === undefined && !('row' in props)) {
    			console.warn("<Cell> was created without expected prop 'row'");
    		}

    		if (/*index*/ ctx[1] === undefined && !('index' in props)) {
    			console.warn("<Cell> was created without expected prop 'index'");
    		}
    	}

    	get row() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set row(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get index() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Placeholder.svelte generated by Svelte v3.44.1 */

    const file$2 = "src\\Placeholder.svelte";

    // (21:0) {#if placeholder}
    function create_if_block$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "placeholder svelte-1to8rlq");
    			set_style(div, "background-color", /*placeholder*/ ctx[0].color);
    			attr_dev(div, "data-placeholder", "true");
    			toggle_class(div, "placeholderw", /*placeholder*/ ctx[0].hIdx || /*placeholder*/ ctx[0].hIdx === 0);
    			add_location(div, file$2, 21, 2, 364);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*placeholder*/ 1) {
    				set_style(div, "background-color", /*placeholder*/ ctx[0].color);
    			}

    			if (dirty & /*placeholder*/ 1) {
    				toggle_class(div, "placeholderw", /*placeholder*/ ctx[0].hIdx || /*placeholder*/ ctx[0].hIdx === 0);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(21:0) {#if placeholder}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let if_block = /*placeholder*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*placeholder*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
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
    	validate_slots('Placeholder', slots, []);
    	let { placeholder } = $$props;
    	const writable_props = ['placeholder'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Placeholder> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('placeholder' in $$props) $$invalidate(0, placeholder = $$props.placeholder);
    	};

    	$$self.$capture_state = () => ({ placeholder });

    	$$self.$inject_state = $$props => {
    		if ('placeholder' in $$props) $$invalidate(0, placeholder = $$props.placeholder);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [placeholder];
    }

    class Placeholder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { placeholder: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Placeholder",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*placeholder*/ ctx[0] === undefined && !('placeholder' in props)) {
    			console.warn("<Placeholder> was created without expected prop 'placeholder'");
    		}
    	}

    	get placeholder() {
    		throw new Error("<Placeholder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Placeholder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Row.svelte generated by Svelte v3.44.1 */
    const file$1 = "src\\Row.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (49:4) {:else}
    function create_else_block(ctx) {
    	let cell;
    	let current;

    	cell = new Cell({
    			props: {
    				row: /*row*/ ctx[5],
    				index: /*index*/ ctx[7]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(cell.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(cell, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const cell_changes = {};
    			if (dirty & /*rows*/ 1) cell_changes.row = /*row*/ ctx[5];
    			cell.$set(cell_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cell.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cell.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(cell, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(49:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (45:4) {#if row.placeholder}
    function create_if_block(ctx) {
    	let placeholder_1;
    	let current;

    	placeholder_1 = new Placeholder({
    			props: { placeholder: /*placeholder*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(placeholder_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(placeholder_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const placeholder_1_changes = {};
    			if (dirty & /*placeholder*/ 2) placeholder_1_changes.placeholder = /*placeholder*/ ctx[1];
    			placeholder_1.$set(placeholder_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(placeholder_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(placeholder_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(placeholder_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(45:4) {#if row.placeholder}",
    		ctx
    	});

    	return block;
    }

    // (44:2) {#each rows as row, index}
    function create_each_block$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*row*/ ctx[5].placeholder) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
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
    			current_block_type_index = select_block_type(ctx);

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
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(44:2) {#each rows as row, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let current;
    	let each_value = /*rows*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "row svelte-q9irty");
    			attr_dev(div, "data-index", /*rowIndex*/ ctx[2]);
    			toggle_class(div, "placeholderh", /*shouldInsertFullRowPlaceholder*/ ctx[3]);
    			add_location(div, file$1, 38, 0, 738);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*placeholder, rows*/ 3) {
    				each_value = /*rows*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*rowIndex*/ 4) {
    				attr_dev(div, "data-index", /*rowIndex*/ ctx[2]);
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
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
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
    	validate_slots('Row', slots, []);
    	let { rows } = $$props;
    	let { placeholder } = $$props;
    	let { rowIndex } = $$props;
    	let id;

    	function shouldInsertFullRowPlaceholder() {
    		return placeholder && placeholder.position[0] === indexJ && placeholder.position[1] === null;
    	}

    	const writable_props = ['rows', 'placeholder', 'rowIndex'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Row> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('rows' in $$props) $$invalidate(0, rows = $$props.rows);
    		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ('rowIndex' in $$props) $$invalidate(2, rowIndex = $$props.rowIndex);
    	};

    	$$self.$capture_state = () => ({
    		Cell,
    		Placeholder,
    		rows,
    		placeholder,
    		rowIndex,
    		id,
    		shouldInsertFullRowPlaceholder
    	});

    	$$self.$inject_state = $$props => {
    		if ('rows' in $$props) $$invalidate(0, rows = $$props.rows);
    		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ('rowIndex' in $$props) $$invalidate(2, rowIndex = $$props.rowIndex);
    		if ('id' in $$props) id = $$props.id;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rows, placeholder, rowIndex, shouldInsertFullRowPlaceholder];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { rows: 0, placeholder: 1, rowIndex: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*rows*/ ctx[0] === undefined && !('rows' in props)) {
    			console.warn("<Row> was created without expected prop 'rows'");
    		}

    		if (/*placeholder*/ ctx[1] === undefined && !('placeholder' in props)) {
    			console.warn("<Row> was created without expected prop 'placeholder'");
    		}

    		if (/*rowIndex*/ ctx[2] === undefined && !('rowIndex' in props)) {
    			console.warn("<Row> was created without expected prop 'rowIndex'");
    		}
    	}

    	get rows() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rows(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rowIndex() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rowIndex(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Form.svelte generated by Svelte v3.44.1 */

    const { Error: Error_1 } = globals;
    const file = "src\\Form.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	child_ctx[23] = list;
    	child_ctx[24] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[25] = list[i];
    	child_ctx[24] = i;
    	return child_ctx;
    }

    // (269:2) {#each dropZoneItems as rows, index}
    function create_each_block_1(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				placeholder: /*placeholder*/ ctx[2],
    				rowIndex: /*index*/ ctx[24],
    				rows: /*rows*/ ctx[25]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};
    			if (dirty & /*placeholder*/ 4) row_changes.placeholder = /*placeholder*/ ctx[2];
    			if (dirty & /*dropZoneItems*/ 16) row_changes.rows = /*rows*/ ctx[25];
    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(269:2) {#each dropZoneItems as rows, index}",
    		ctx
    	});

    	return block;
    }

    // (275:2) {#each dragItems as item, index (item.id)}
    function create_each_block(key_1, ctx) {
    	let div;
    	let input;
    	let t;
    	let index = /*index*/ ctx[24];
    	const assign_div = () => /*div_binding*/ ctx[7](div, index);
    	const unassign_div = () => /*div_binding*/ ctx[7](null, index);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t = space();
    			attr_dev(input, "type", "text");
    			add_location(input, file, 282, 6, 6392);
    			attr_dev(div, "class", "cell svelte-ymd5js");
    			attr_dev(div, "data-id", /*item*/ ctx[22].id);
    			attr_dev(div, "data-draggable-id", /*draggableId*/ ctx[0]);
    			set_style(div, "background-color", /*item*/ ctx[22].color);
    			add_location(div, file, 275, 4, 6206);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			append_dev(div, t);
    			assign_div();
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*draggableId*/ 1) {
    				attr_dev(div, "data-draggable-id", /*draggableId*/ ctx[0]);
    			}

    			if (index !== /*index*/ ctx[24]) {
    				unassign_div();
    				index = /*index*/ ctx[24];
    				assign_div();
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			unassign_div();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(275:2) {#each dragItems as item, index (item.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div0;
    	let t;
    	let div1;
    	let each_blocks = [];
    	let each1_lookup = new Map();
    	let current;
    	let each_value_1 = /*dropZoneItems*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*dragItems*/ ctx[5];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*item*/ ctx[22].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "zone svelte-ymd5js");
    			add_location(div0, file, 267, 0, 5968);
    			attr_dev(div1, "class", "drag-list svelte-ymd5js");
    			attr_dev(div1, "id", "dragList");
    			add_location(div1, file, 273, 0, 6117);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			/*div0_binding*/ ctx[6](div0);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*placeholder, dropZoneItems*/ 20) {
    				each_value_1 = /*dropZoneItems*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*dragItems, draggableId, bindItems*/ 41) {
    				each_value = /*dragItems*/ ctx[5];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each1_lookup, div1, destroy_block, create_each_block, null, get_each_context);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_each(each_blocks_1, detaching);
    			/*div0_binding*/ ctx[6](null);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
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
    	let $draggableStore;
    	validate_store(draggableStore, 'draggableStore');
    	component_subscribe($$self, draggableStore, $$value => $$invalidate(10, $draggableStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Form', slots, []);
    	let draggable = $draggableStore;
    	let draggableId;
    	let zone;
    	let activeArea = 25;
    	let placeholder = null;
    	let to;
    	let dontMove;

    	//export let relocate = false;
    	let bindItems = [];

    	//$: console.trace(placeholder);
    	const COLORS = {
    		brown: "#721919",
    		blue: "#22228d",
    		orange: "#976100",
    		green: "#1f621f",
    		red: "#873e3e",
    		pink: "#873e75",
    		gray: "#424242",
    		yellow: "#767614"
    	};

    	let dragItems = [
    		{
    			id: 1,
    			title: "Drag Item 1",
    			color: COLORS.brown
    		},
    		{
    			id: 2,
    			title: "Drag Item 2",
    			color: COLORS.green
    		},
    		{
    			id: 3,
    			title: "Drag Item 3",
    			color: COLORS.pink
    		},
    		{
    			id: 4,
    			title: "Drag Item 4",
    			color: COLORS.gray
    		},
    		{
    			id: 10,
    			title: "Drag Item 4",
    			color: COLORS.blue
    		}
    	];

    	let dropZoneItems = [
    		[
    			{
    				id: 13,
    				title: "Item (blue)",
    				color: COLORS.blue
    			}
    		],
    		[
    			{
    				id: 5,
    				title: "Item (yellow)",
    				color: COLORS.yellow
    			},
    			{
    				id: 6,
    				title: "Item (orange)",
    				color: COLORS.orange
    			},
    			{
    				id: 7,
    				title: "Item (blue)",
    				color: "#22228d"
    			}
    		]
    	];

    	function generatePlaceHolder(vIdx, hIdx, item) {
    		if (vIdx === null) return;

    		$$invalidate(2, placeholder = {
    			item,
    			placeholder: true,
    			color: "rgb(124 124 124 / 72%)",
    			vIdx,
    			hIdx
    		});

    		insertCell(placeholder, hIdx, vIdx);
    	}

    	function insertCell(item, hIdx, vIdx) {
    		let cells = [item];

    		if (hIdx === null) {
    			dropZoneItems.splice(vIdx, 0, cells);
    		} else {
    			cells = dropZoneItems[vIdx];
    			cells.splice(hIdx, 0, item);
    		}

    		$$invalidate(4, dropZoneItems[vIdx] = cells, dropZoneItems);
    	}

    	function removePlaceholder() {
    		if (!placeholder) return;

    		if (placeholder.hIdx === null) {
    			dropZoneItems.splice(placeholder.vIdx, 1);
    		} else {
    			dropZoneItems[placeholder.vIdx].splice(placeholder.hIdx, 1);
    		}

    		$$invalidate(4, dropZoneItems);
    		$$invalidate(2, placeholder = null);
    	}

    	function onDragStart(ev) {
    		if (ev.target.getAttribute('data-draggable-id') === draggableId) {
    			const id = Number(ev.target.getAttribute('data-id'));
    			const item = dragItems.find(item => item.id === id);

    			if (!item) {
    				throw new Error(`Dragged item is null`);
    			}

    			draggable.addDraggableElement(ev.target, draggableId, item);
    		}
    	}

    	function onDragLeave(ev) {
    		removePlaceholder();
    	}

    	function onDrag(ev) {
    		if (dontMove) return;
    		const elementUnderClone = ev.elements[1];

    		if (elementUnderClone === zone && dropZoneItems.length === 0) {
    			if (!placeholder) {
    				generatePlaceHolder(0, null, ev.data);
    			}

    			return;
    		}

    		// we possibly are on a form-field
    		const cell = ev.elements[1];

    		if (cell.getAttribute('data-type') !== 'cell') return;
    		if (cell.getAttribute("data-placeholder")) return;
    		const { hIdx, vIdx } = calculateIndexes(ev.clientX, ev.clientY, cell);

    		if (!placeholder) {
    			generatePlaceHolder(vIdx, hIdx, ev.data);
    			dontMove = true;
    			clearTimeout(to);

    			to = setTimeout(
    				() => {
    					dontMove = false;
    				},
    				200
    			);
    		} else {
    			const deletePlaceHolder = (vIdx !== placeholder.vIdx || hIdx !== placeholder.hIdx) && !cell.getAttribute("data-placeholder");

    			if (placeholder && deletePlaceHolder) {
    				removePlaceholder();
    			}
    		}
    	}

    	function onDrop(ev) {
    		if (!placeholder) return;
    		const { hIdx, vIdx } = placeholder;
    		removePlaceholder();
    		insertCell(ev.data, hIdx, vIdx);
    	}

    	function calculateIndexes(x, y, cell) {
    		const rect = cell.getBoundingClientRect();
    		const row = cell.closest('.row');
    		let hIdx = null;
    		let vIdx = Number(row.getAttribute('data-index'));
    		const onLeft = x <= rect.left + activeArea;
    		const onRight = x >= rect.left + rect.width - activeArea;

    		if (onLeft || onRight) {
    			hIdx = Number(cell.getAttribute('data-index'));

    			if (onRight) {
    				hIdx++;
    			}
    		} else {
    			const onTop = y >= rect.top + rect.height - activeArea;
    			const onBottom = y <= rect.top + activeArea;

    			if (onTop) {
    				vIdx++;
    			} else if (!onBottom) {
    				vIdx = null;
    			}
    		}

    		return { hIdx, vIdx };
    	}

    	onMount(() => {
    		$$invalidate(0, draggableId = draggable.createUnit());
    		draggable.setDropZone(zone, draggableId);
    		draggable.addEventListener(`dragstart:${draggableId}`, onDragStart);
    		draggable.addEventListener(`drag:${draggableId}`, onDrag);
    		draggable.addEventListener(`drop:${draggableId}`, onDrop);
    		draggable.addEventListener(`dragleave:${draggableId}`, onDragLeave);

    		bindItems.forEach(item => {
    			
    		}); /*
    draggable.setElement(item, {
      onDragStart,
      onDrag,
      onDrop,
    });
    */
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Form> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			zone = $$value;
    			$$invalidate(1, zone);
    		});
    	}

    	function div_binding($$value, index) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			bindItems[index] = $$value;
    			$$invalidate(3, bindItems);
    			$$invalidate(5, dragItems);
    		});
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		Row,
    		draggableStore,
    		draggable,
    		draggableId,
    		zone,
    		activeArea,
    		placeholder,
    		to,
    		dontMove,
    		bindItems,
    		COLORS,
    		dragItems,
    		dropZoneItems,
    		generatePlaceHolder,
    		insertCell,
    		removePlaceholder,
    		onDragStart,
    		onDragLeave,
    		onDrag,
    		onDrop,
    		calculateIndexes,
    		$draggableStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('draggable' in $$props) draggable = $$props.draggable;
    		if ('draggableId' in $$props) $$invalidate(0, draggableId = $$props.draggableId);
    		if ('zone' in $$props) $$invalidate(1, zone = $$props.zone);
    		if ('activeArea' in $$props) activeArea = $$props.activeArea;
    		if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ('to' in $$props) to = $$props.to;
    		if ('dontMove' in $$props) dontMove = $$props.dontMove;
    		if ('bindItems' in $$props) $$invalidate(3, bindItems = $$props.bindItems);
    		if ('dragItems' in $$props) $$invalidate(5, dragItems = $$props.dragItems);
    		if ('dropZoneItems' in $$props) $$invalidate(4, dropZoneItems = $$props.dropZoneItems);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		draggableId,
    		zone,
    		placeholder,
    		bindItems,
    		dropZoneItems,
    		dragItems,
    		div0_binding,
    		div_binding
    	];
    }

    class Form extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.1 */

    function create_fragment(ctx) {
    	let form;
    	let current;
    	form = new Form({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(form.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(form, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(form.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(form, detaching);
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
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Form });
    	return [];
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
    	props: {
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
