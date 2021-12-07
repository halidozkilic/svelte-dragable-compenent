import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, c as create_component, a as claim_component, m as mount_component, n as noop, t as transition_in, b as transition_out, e as destroy_component } from './client.d18c5560.js';
import Form from './Form.c8a1c81a.js';
import './Row.623f7424.js';
import './Cell.2a3dedd8.js';
import './Draggable.517ce278.js';
import './Placeholder.529730e3.js';

/* src\routes\index.svelte generated by Svelte v3.44.1 */

function create_fragment(ctx) {
	let form;
	let current;
	form = new Form({ $$inline: true });

	const block = {
		c: function create() {
			create_component(form.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(form.$$.fragment, nodes);
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
	validate_slots('Routes', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Form });
	return [];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export { Routes as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYjVmMDBlZmUuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
