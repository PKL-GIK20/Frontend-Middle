
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

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
        if (node.parentNode) {
            node.parentNode.removeChild(node);
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
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function self(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
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
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
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
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
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
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
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
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
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
        seen_callbacks.clear();
        set_current_component(saved_component);
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
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
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
        else if (callback) {
            callback();
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
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
            flush_render_callbacks($$.after_update);
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
            ctx: [],
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
            if (!is_function(callback)) {
                return noop;
            }
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
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
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
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
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
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

    /* src\information.svelte generated by Svelte v3.59.2 */

    const file$3 = "src\\information.svelte";
    const get_header_slot_changes = dirty => ({});
    const get_header_slot_context = ctx => ({});

    function create_fragment$4(ctx) {
    	let dialog_1;
    	let div;
    	let t0;
    	let hr0;
    	let t1;
    	let t2;
    	let hr1;
    	let t3;
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	const header_slot_template = /*#slots*/ ctx[3].header;
    	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[2], get_header_slot_context);
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			dialog_1 = element("dialog");
    			div = element("div");
    			if (header_slot) header_slot.c();
    			t0 = space();
    			hr0 = element("hr");
    			t1 = space();
    			if (default_slot) default_slot.c();
    			t2 = space();
    			hr1 = element("hr");
    			t3 = space();
    			button = element("button");
    			button.textContent = "close modal";
    			add_location(hr0, file$3, 17, 2, 482);
    			add_location(hr1, file$3, 19, 2, 504);
    			button.autofocus = true;
    			attr_dev(button, "class", "svelte-19dligb");
    			add_location(button, file$3, 21, 2, 555);
    			attr_dev(div, "class", "svelte-19dligb");
    			add_location(div, file$3, 15, 1, 422);
    			attr_dev(dialog_1, "class", "svelte-19dligb");
    			add_location(dialog_1, file$3, 9, 0, 249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dialog_1, anchor);
    			append_dev(dialog_1, div);

    			if (header_slot) {
    				header_slot.m(div, null);
    			}

    			append_dev(div, t0);
    			append_dev(div, hr0);
    			append_dev(div, t1);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append_dev(div, t2);
    			append_dev(div, hr1);
    			append_dev(div, t3);
    			append_dev(div, button);
    			/*dialog_1_binding*/ ctx[6](dialog_1);
    			current = true;
    			button.focus();

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*click_handler_1*/ ctx[5], false, false, false, false),
    					listen_dev(div, "click", stop_propagation(/*click_handler*/ ctx[4]), false, false, true, false),
    					listen_dev(dialog_1, "close", /*close_handler*/ ctx[7], false, false, false, false),
    					listen_dev(dialog_1, "click", self(/*click_handler_2*/ ctx[8]), false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (header_slot) {
    				if (header_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						header_slot,
    						header_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(header_slot_template, /*$$scope*/ ctx[2], dirty, get_header_slot_changes),
    						get_header_slot_context
    					);
    				}
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header_slot, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header_slot, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dialog_1);
    			if (header_slot) header_slot.d(detaching);
    			if (default_slot) default_slot.d(detaching);
    			/*dialog_1_binding*/ ctx[6](null);
    			mounted = false;
    			run_all(dispose);
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
    	validate_slots('Information', slots, ['header','default']);
    	let { showModal } = $$props;
    	let dialog; // HTMLDialogElement

    	$$self.$$.on_mount.push(function () {
    		if (showModal === undefined && !('showModal' in $$props || $$self.$$.bound[$$self.$$.props['showModal']])) {
    			console.warn("<Information> was created without expected prop 'showModal'");
    		}
    	});

    	const writable_props = ['showModal'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Information> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	const click_handler_1 = () => dialog.close();

    	function dialog_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			dialog = $$value;
    			$$invalidate(1, dialog);
    		});
    	}

    	const close_handler = () => $$invalidate(0, showModal = false);
    	const click_handler_2 = () => dialog.close();

    	$$self.$$set = $$props => {
    		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ showModal, dialog });

    	$$self.$inject_state = $$props => {
    		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
    		if ('dialog' in $$props) $$invalidate(1, dialog = $$props.dialog);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*dialog, showModal*/ 3) {
    			if (dialog && showModal) dialog.showModal();
    		}
    	};

    	return [
    		showModal,
    		dialog,
    		$$scope,
    		slots,
    		click_handler,
    		click_handler_1,
    		dialog_1_binding,
    		close_handler,
    		click_handler_2
    	];
    }

    class Information extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { showModal: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Information",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get showModal() {
    		throw new Error("<Information>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showModal(value) {
    		throw new Error("<Information>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\CustomButton.svelte generated by Svelte v3.59.2 */

    const file$2 = "src\\CustomButton.svelte";

    function create_fragment$3(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Click me";
    			attr_dev(button, "class", "svelte-hg07jm");
    			add_location(button, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[0], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
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

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CustomButton', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CustomButton> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	return [click_handler];
    }

    class CustomButton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CustomButton",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\Inner.svelte generated by Svelte v3.59.2 */
    const file$1 = "src\\Inner.svelte";

    function create_fragment$2(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Click to say hello";
    			add_location(button, file$1, 12, 0, 200);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*sayHello*/ ctx[0], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
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
    	validate_slots('Inner', slots, []);
    	const dispatch = createEventDispatcher();

    	function sayHello() {
    		dispatch('message', { text: 'Hello!' });
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Inner> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		sayHello
    	});

    	return [sayHello];
    }

    class Inner extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Inner",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Outer.svelte generated by Svelte v3.59.2 */

    function create_fragment$1(ctx) {
    	let inner;
    	let current;
    	inner = new Inner({ $$inline: true });
    	inner.$on("message", /*message_handler*/ ctx[0]);

    	const block = {
    		c: function create() {
    			create_component(inner.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(inner, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inner.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inner.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inner, detaching);
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
    	validate_slots('Outer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Outer> was created with unknown prop '${key}'`);
    	});

    	function message_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$capture_state = () => ({ Inner });
    	return [message_handler];
    }

    class Outer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Outer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */
    const file = "src\\App.svelte";

    // (65:0) <Modal bind:showModal>
    function create_default_slot(ctx) {
    	let ol;
    	let li0;
    	let t1;
    	let li1;
    	let t3;
    	let li2;
    	let t5;
    	let li3;
    	let t7;
    	let li4;
    	let t9;
    	let li5;

    	const block = {
    		c: function create() {
    			ol = element("ol");
    			li0 = element("li");
    			li0.textContent = "of or relating to modality in logic";
    			t1 = space();
    			li1 = element("li");
    			li1.textContent = "containing provisions as to the mode of procedure or the manner of taking effect —used of a\n\t\t\tcontract or legacy";
    			t3 = space();
    			li2 = element("li");
    			li2.textContent = "of or relating to a musical mode";
    			t5 = space();
    			li3 = element("li");
    			li3.textContent = "of or relating to structure as opposed to substance";
    			t7 = space();
    			li4 = element("li");
    			li4.textContent = "of, relating to, or constituting a grammatical form or category characteristically indicating\n\t\t\tpredication";
    			t9 = space();
    			li5 = element("li");
    			li5.textContent = "of or relating to a statistical mode";
    			add_location(li0, file, 71, 2, 1654);
    			add_location(li1, file, 72, 2, 1701);
    			add_location(li2, file, 76, 2, 1833);
    			add_location(li3, file, 77, 2, 1877);
    			add_location(li4, file, 78, 2, 1940);
    			add_location(li5, file, 82, 2, 2067);
    			attr_dev(ol, "class", "definition-list");
    			add_location(ol, file, 70, 1, 1623);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ol, anchor);
    			append_dev(ol, li0);
    			append_dev(ol, t1);
    			append_dev(ol, li1);
    			append_dev(ol, t3);
    			append_dev(ol, li2);
    			append_dev(ol, t5);
    			append_dev(ol, li3);
    			append_dev(ol, t7);
    			append_dev(ol, li4);
    			append_dev(ol, t9);
    			append_dev(ol, li5);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ol);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(65:0) <Modal bind:showModal>",
    		ctx
    	});

    	return block;
    }

    // (66:1) 
    function create_header_slot(ctx) {
    	let h2;
    	let t0;
    	let small;
    	let em;
    	let t2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text("Information\n\t\t");
    			small = element("small");
    			em = element("em");
    			em.textContent = "adjective";
    			t2 = text(" mod·al \\ˈmō-dəl\\");
    			add_location(em, file, 67, 9, 1570);
    			add_location(small, file, 67, 2, 1563);
    			attr_dev(h2, "slot", "header");
    			add_location(h2, file, 65, 1, 1528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			append_dev(h2, small);
    			append_dev(small, em);
    			append_dev(small, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_header_slot.name,
    		type: "slot",
    		source: "(66:1) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let p0;
    	let t5;
    	let button0;
    	let t7;
    	let p1;
    	let t8;
    	let t9;
    	let t10;
    	let input;
    	let t11;
    	let p2;
    	let t12;
    	let t13;
    	let t14;
    	let button1;
    	let t16;
    	let button2;
    	let t18;
    	let form;
    	let p3;
    	let button3;
    	let t20;
    	let h20;
    	let t22;
    	let button4;
    	let t24;
    	let h21;
    	let t26;
    	let custombutton;
    	let t27;
    	let h22;
    	let t29;
    	let div;
    	let t30;
    	let t31_value = /*m*/ ctx[3].x + "";
    	let t31;
    	let t32;
    	let t33_value = /*m*/ ctx[3].y + "";
    	let t33;
    	let t34;
    	let h23;
    	let t36;
    	let outer;
    	let t37;
    	let modal;
    	let updating_showModal;
    	let current;
    	let mounted;
    	let dispose;
    	custombutton = new CustomButton({ $$inline: true });
    	custombutton.$on("click", handleClick);
    	outer = new Outer({ $$inline: true });
    	outer.$on("message", handleMessage);

    	function modal_showModal_binding(value) {
    		/*modal_showModal_binding*/ ctx[11](value);
    	}

    	let modal_props = {
    		$$slots: {
    			header: [create_header_slot],
    			default: [create_default_slot]
    		},
    		$$scope: { ctx }
    	};

    	if (/*showModal*/ ctx[1] !== void 0) {
    		modal_props.showModal = /*showModal*/ ctx[1];
    	}

    	modal = new Information({ props: modal_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal, 'showModal', modal_showModal_binding));

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			t0 = text("Hello ");
    			t1 = text(/*name*/ ctx[0]);
    			t2 = text("!");
    			t3 = space();
    			p0 = element("p");
    			p0.textContent = "Contoh Event Handling menggunakan Svelte";
    			t5 = space();
    			button0 = element("button");
    			button0.textContent = "Change name";
    			t7 = space();
    			p1 = element("p");
    			t8 = text("Request Your name: ");
    			t9 = text(/*name*/ ctx[0]);
    			t10 = space();
    			input = element("input");
    			t11 = space();
    			p2 = element("p");
    			t12 = text("Count: ");
    			t13 = text(/*counter*/ ctx[2]);
    			t14 = space();
    			button1 = element("button");
    			button1.textContent = "Increment";
    			t16 = space();
    			button2 = element("button");
    			button2.textContent = "Decrement";
    			t18 = space();
    			form = element("form");
    			p3 = element("p");
    			button3 = element("button");
    			button3.textContent = "Submit Form";
    			t20 = space();
    			h20 = element("h2");
    			h20.textContent = "Contoh lain";
    			t22 = space();
    			button4 = element("button");
    			button4.textContent = "show more information";
    			t24 = space();
    			h21 = element("h2");
    			h21.textContent = "DOM Events";
    			t26 = space();
    			create_component(custombutton.$$.fragment);
    			t27 = space();
    			h22 = element("h2");
    			h22.textContent = "Inline Handlers";
    			t29 = space();
    			div = element("div");
    			t30 = text("The mouse position is ");
    			t31 = text(t31_value);
    			t32 = text(" x ");
    			t33 = text(t33_value);
    			t34 = space();
    			h23 = element("h2");
    			h23.textContent = "Event Forwarding";
    			t36 = space();
    			create_component(outer.$$.fragment);
    			t37 = space();
    			create_component(modal.$$.fragment);
    			attr_dev(h1, "class", "svelte-13cg4hv");
    			add_location(h1, file, 34, 1, 642);
    			add_location(p0, file, 35, 1, 666);
    			add_location(button0, file, 36, 1, 715);
    			add_location(p1, file, 39, 1, 789);
    			attr_dev(input, "type", "text");
    			add_location(input, file, 40, 1, 825);
    			add_location(p2, file, 42, 1, 867);
    			add_location(button1, file, 43, 1, 894);
    			add_location(button2, file, 44, 1, 945);
    			add_location(button3, file, 48, 2, 1011);
    			add_location(p3, file, 47, 1, 1005);
    			add_location(form, file, 46, 1, 997);
    			add_location(h20, file, 51, 1, 1056);
    			add_location(button4, file, 52, 1, 1078);
    			add_location(h21, file, 53, 1, 1156);
    			add_location(h22, file, 55, 1, 1231);
    			attr_dev(div, "class", "svelte-13cg4hv");
    			add_location(div, file, 57, 1, 1317);
    			add_location(h23, file, 60, 1, 1429);
    			attr_dev(main, "class", "svelte-13cg4hv");
    			add_location(main, file, 33, 0, 634);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(h1, t0);
    			append_dev(h1, t1);
    			append_dev(h1, t2);
    			append_dev(main, t3);
    			append_dev(main, p0);
    			append_dev(main, t5);
    			append_dev(main, button0);
    			append_dev(main, t7);
    			append_dev(main, p1);
    			append_dev(p1, t8);
    			append_dev(p1, t9);
    			append_dev(main, t10);
    			append_dev(main, input);
    			append_dev(main, t11);
    			append_dev(main, p2);
    			append_dev(p2, t12);
    			append_dev(p2, t13);
    			append_dev(main, t14);
    			append_dev(main, button1);
    			append_dev(main, t16);
    			append_dev(main, button2);
    			append_dev(main, t18);
    			append_dev(main, form);
    			append_dev(form, p3);
    			append_dev(p3, button3);
    			append_dev(main, t20);
    			append_dev(main, h20);
    			append_dev(main, t22);
    			append_dev(main, button4);
    			append_dev(main, t24);
    			append_dev(main, h21);
    			append_dev(main, t26);
    			mount_component(custombutton, main, null);
    			append_dev(main, t27);
    			append_dev(main, h22);
    			append_dev(main, t29);
    			append_dev(main, div);
    			append_dev(div, t30);
    			append_dev(div, t31);
    			append_dev(div, t32);
    			append_dev(div, t33);
    			append_dev(main, t34);
    			append_dev(main, h23);
    			append_dev(main, t36);
    			mount_component(outer, main, null);
    			insert_dev(target, t37, anchor);
    			mount_component(modal, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[8], false, false, false, false),
    					listen_dev(input, "input", /*getInput*/ ctx[5], false, false, false, false),
    					listen_dev(button1, "click", /*increment*/ ctx[6], false, false, false, false),
    					listen_dev(button2, "click", /*decrement*/ ctx[7], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_1*/ ctx[9], false, false, false, false),
    					listen_dev(div, "mousemove", /*mousemove_handler*/ ctx[10], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 1) set_data_dev(t1, /*name*/ ctx[0]);
    			if (!current || dirty & /*name*/ 1) set_data_dev(t9, /*name*/ ctx[0]);
    			if (!current || dirty & /*counter*/ 4) set_data_dev(t13, /*counter*/ ctx[2]);
    			if ((!current || dirty & /*m*/ 8) && t31_value !== (t31_value = /*m*/ ctx[3].x + "")) set_data_dev(t31, t31_value);
    			if ((!current || dirty & /*m*/ 8) && t33_value !== (t33_value = /*m*/ ctx[3].y + "")) set_data_dev(t33, t33_value);
    			const modal_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_showModal && dirty & /*showModal*/ 2) {
    				updating_showModal = true;
    				modal_changes.showModal = /*showModal*/ ctx[1];
    				add_flush_callback(() => updating_showModal = false);
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(custombutton.$$.fragment, local);
    			transition_in(outer.$$.fragment, local);
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(custombutton.$$.fragment, local);
    			transition_out(outer.$$.fragment, local);
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(custombutton);
    			destroy_component(outer);
    			if (detaching) detach_dev(t37);
    			destroy_component(modal, detaching);
    			mounted = false;
    			run_all(dispose);
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

    function handleClick() {
    	alert('clicked');
    }

    function handleMessage(event) {
    	alert(event.detail.text);
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { name } = $$props;
    	let showModal = false;

    	function changeName(newName) {
    		$$invalidate(0, name = newName);
    	}

    	function getInput(event) {
    		// get the value of the input on the
    		// event object and assign it to 'name'
    		$$invalidate(0, name = event.target.value);
    	}

    	let counter = 0;
    	let m = { x: 0, y: 0 };

    	function increment() {
    		$$invalidate(2, counter++, counter);
    	}

    	function decrement() {
    		$$invalidate(2, counter--, counter);
    	}

    	$$self.$$.on_mount.push(function () {
    		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	});

    	const writable_props = ['name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => changeName('Zahwa');
    	const click_handler_1 = () => $$invalidate(1, showModal = true);
    	const mousemove_handler = e => $$invalidate(3, m = { x: e.clientX, y: e.clientY });

    	function modal_showModal_binding(value) {
    		showModal = value;
    		$$invalidate(1, showModal);
    	}

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({
    		Modal: Information,
    		CustomButton,
    		Outer,
    		name,
    		showModal,
    		changeName,
    		getInput,
    		counter,
    		m,
    		increment,
    		decrement,
    		handleClick,
    		handleMessage
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('showModal' in $$props) $$invalidate(1, showModal = $$props.showModal);
    		if ('counter' in $$props) $$invalidate(2, counter = $$props.counter);
    		if ('m' in $$props) $$invalidate(3, m = $$props.m);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		showModal,
    		counter,
    		m,
    		changeName,
    		getInput,
    		increment,
    		decrement,
    		click_handler,
    		click_handler_1,
    		mousemove_handler,
    		modal_showModal_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'Diana'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
