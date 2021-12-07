import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as onMount, f as element, g as text, h as claim_element, j as children, k as claim_text, l as detach_dev, p as set_style, q as attr_dev, r as add_location, u as insert_hydration_dev, w as append_hydration_dev, n as noop, x as binding_callbacks, y as validate_each_argument, z as validate_each_keys, c as create_component, a as claim_component, m as mount_component, t as transition_in, b as transition_out, e as destroy_component, A as space, B as claim_space, C as check_outros, D as update_keyed_each, E as destroy_each, F as group_outros, G as destroy_block } from './client.06b5359d.js';
import Row from './Row.18cd1363.js';
import { D as Draggable } from './Draggable.3983f0bf.js';
import './Cell.224db412.js';
import './Placeholder.61426ac7.js';

/* src\routes\example.svelte generated by Svelte v3.44.1 */
const file$1 = "src\\routes\\example.svelte";

function create_fragment$1(ctx) {
	let div1;
	let div0;
	let t;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t = text("[=]");
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true, style: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { style: true, class: true });
			var div0_nodes = children(div0);
			t = claim_text(div0_nodes, "[=]");
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_style(div0, "cursor", "grab");
			set_style(div0, "width", "20px");
			attr_dev(div0, "class", "handle");
			add_location(div0, file$1, 50, 2, 1272);
			attr_dev(div1, "class", "myitem");
			set_style(div1, "width", "100%");
			set_style(div1, "height", "80px");
			set_style(div1, "background-color", "#555");
			add_location(div1, file$1, 49, 0, 1171);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div1, anchor);
			append_hydration_dev(div1, div0);
			append_hydration_dev(div0, t);
			/*div0_binding*/ ctx[2](div0);
			/*div1_binding*/ ctx[3](div1);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			/*div0_binding*/ ctx[2](null);
			/*div1_binding*/ ctx[3](null);
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

function onDragStart(ev) {
	
} /*
// set cloned object and its bg color
const clone = ev.target.cloneNode(true);
clone.classList.add("clone");

draggable.dragData = {
  clone,

};
*/

function onDrop() {
	
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Example', slots, []);
	const draggable = new Draggable();
	draggable.closest = 'myitem';
	let mydiv;
	let handle;

	function onDrag(ev) {
		if (draggable.dragData && draggable.dragData.clone && !draggable.dragData.clone.parentNode) {
			document.body.appendChild(draggable.dragData.clone);
		}

		if (draggable && draggable.dragData && draggable.dragData.clone) {
			draggable.dragData.clone.style.left = ev.clientX - draggable.dragData.clone.offsetWidth / 8 + "px";
			draggable.dragData.clone.style.top = ev.clientY - draggable.dragData.clone.offsetHeight / 4 + "px";
			draggable.dragData.clone.style.background = 'orange';
		}
	}

	onMount(() => {
		draggable.setElement(mydiv, { onDragStart, onDrag, onDrop }, handle);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Example> was created with unknown prop '${key}'`);
	});

	function div0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			handle = $$value;
			$$invalidate(1, handle);
		});
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			mydiv = $$value;
			$$invalidate(0, mydiv);
		});
	}

	$$self.$capture_state = () => ({
		onMount,
		Draggable,
		draggable,
		mydiv,
		handle,
		onDragStart,
		onDrag,
		onDrop
	});

	$$self.$inject_state = $$props => {
		if ('mydiv' in $$props) $$invalidate(0, mydiv = $$props.mydiv);
		if ('handle' in $$props) $$invalidate(1, handle = $$props.handle);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [mydiv, handle, div0_binding, div1_binding];
}

class Example extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Example",
			options,
			id: create_fragment$1.name
		});
	}
}

/* src\routes\Form.svelte generated by Svelte v3.44.1 */
const file = "src\\routes\\Form.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	child_ctx[19] = list;
	child_ctx[20] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[21] = list[i];
	child_ctx[20] = i;
	return child_ctx;
}

// (216:2) {#each dropZoneItems as rows, index}
function create_each_block_1(ctx) {
	let row;
	let current;

	row = new Row({
			props: {
				placeholder: /*placeholder*/ ctx[0],
				rowIndex: /*index*/ ctx[20],
				rows: /*rows*/ ctx[21]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(row.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(row.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(row, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const row_changes = {};
			if (dirty & /*placeholder*/ 1) row_changes.placeholder = /*placeholder*/ ctx[0];
			if (dirty & /*dropZoneItems*/ 4) row_changes.rows = /*rows*/ ctx[21];
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
		source: "(216:2) {#each dropZoneItems as rows, index}",
		ctx
	});

	return block;
}

// (222:2) {#each dragItems as item, index (item.id)}
function create_each_block(key_1, ctx) {
	let div;
	let t0_value = /*item*/ ctx[18].title + "";
	let t0;
	let t1;
	let index = /*index*/ ctx[20];
	const assign_div = () => /*div_binding*/ ctx[4](div, index);
	const unassign_div = () => /*div_binding*/ ctx[4](null, index);

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {
				class: true,
				"data-id": true,
				style: true
			});

			var div_nodes = children(div);
			t0 = claim_text(div_nodes, t0_value);
			t1 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "cell svelte-zdflb6");
			attr_dev(div, "data-id", /*item*/ ctx[18].id);
			set_style(div, "background-color", /*item*/ ctx[18].color);
			add_location(div, file, 222, 4, 6052);
			this.first = div;
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, t0);
			append_hydration_dev(div, t1);
			assign_div();
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (index !== /*index*/ ctx[20]) {
				unassign_div();
				index = /*index*/ ctx[20];
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
		source: "(222:2) {#each dragItems as item, index (item.id)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div0;
	let t0;
	let div1;
	let each_blocks = [];
	let each1_lookup = new Map();
	let t1;
	let example;
	let current;
	let each_value_1 = /*dropZoneItems*/ ctx[2];
	validate_each_argument(each_value_1);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
		each_blocks_1[i] = null;
	});

	let each_value = /*dragItems*/ ctx[3];
	validate_each_argument(each_value);
	const get_key = ctx => /*item*/ ctx[18].id;
	validate_each_keys(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	example = new Example({ $$inline: true });

	const block = {
		c: function create() {
			div0 = element("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t0 = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			create_component(example.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div0 = claim_element(nodes, "DIV", { class: true });
			var div0_nodes = children(div0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].l(div0_nodes);
			}

			div0_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div1 = claim_element(nodes, "DIV", { class: true, id: true });
			var div1_nodes = children(div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div1_nodes);
			}

			div1_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			claim_component(example.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "zone svelte-zdflb6");
			add_location(div0, file, 214, 0, 5831);
			attr_dev(div1, "class", "drag-list svelte-zdflb6");
			attr_dev(div1, "id", "dragList");
			add_location(div1, file, 220, 0, 5963);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div0, anchor);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div0, null);
			}

			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, div1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			insert_hydration_dev(target, t1, anchor);
			mount_component(example, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*placeholder, dropZoneItems*/ 5) {
				each_value_1 = /*dropZoneItems*/ ctx[2];
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

			if (dirty & /*dragItems, bindItems*/ 10) {
				each_value = /*dragItems*/ ctx[3];
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

			transition_in(example.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			each_blocks_1 = each_blocks_1.filter(Boolean);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				transition_out(each_blocks_1[i]);
			}

			transition_out(example.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_each(each_blocks_1, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (detaching) detach_dev(t1);
			destroy_component(example, detaching);
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

function calculateHIdx(elements, left) {
	if (left > elements[1].offsetWidth / 2) {
		return Number(elements[1].id) + 1;
	} else {
		return elements[2].classList.contains("field")
		? Number(elements[2].id)
		: Number(elements[1].id);
	}
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Form', slots, []);
	const draggable = new Draggable();
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

	let dropZoneItems = []; // [{ id: 13, title: "Item (blue)", color: COLORS.blue }],
	// [
	//   { id: 5, title: "Item (yellow)", color: COLORS.yellow },

	//   { id: 6, title: "Item (orange)", color: COLORS.orange },
	//   { id: 7, title: "Item (blue)", color: "#22228d" },
	// ],
	// [{ id: 8, title: "Item (green)", color: COLORS.green }],
	// [
	//   { id: 9, title: "Item (yellow)", color: COLORS.yellow },
	//   { id: 10, title: "Item (blue)", color: COLORS.blue },
	//   { id: 11, title: "Item (orange)", color: COLORS.orange },
	//   { id: 12, title: "Item (red)", color: COLORS.red },
	//   { id: 13, title: "Item (red)", color: COLORS.red },
	//   { id: 14, title: "Item (red)", color: COLORS.red },
	//   { id: 16, title: "Item (red)", color: COLORS.red },
	// ],
	function generatePlaceHolder(vIdx, hIdx) {
		$$invalidate(0, placeholder = {
			item: draggable.dragData.item,
			placeholder: true,
			color: "rgb(124 124 124 / 72%)",
			position: [vIdx, hIdx]
		});
	}

	function addNewCell() {
		if (placeholder.position[1] === null) {
			dropZoneItems.splice(placeholder.position[0], 0, [placeholder]);
		} else {
			dropZoneItems[placeholder.position[0]].splice(placeholder.position[1], 0, placeholder);
		}

		$$invalidate(2, dropZoneItems);
	}

	function removeCell(VIdx, HIdx) {
		if (!placeholder) return;

		if (placeholder && placeholder.position[1] === null) {
			dropZoneItems.splice(placeholder.position[0], 1);
		} else {
			dropZoneItems[placeholder.position[0]].splice(placeholder.position[1], 1);
		}

		$$invalidate(2, dropZoneItems);
		$$invalidate(0, placeholder = null);
	}

	function removePlaceHolderKey() {
		//All dropZoneItems must have same data structre
		if (placeholder && placeholder.position) $$invalidate(2, dropZoneItems[placeholder.position[0]][placeholder.position[1] || 0] = placeholder.item, dropZoneItems);
	}

	function onDragStart(ev) {
		draggable.dragData.item = dragItems.find(o => o.id === Number(ev.target.getAttribute("data-id")));
	}

	function onDrag(ev) {
		const onField = draggable.elements[1] && (draggable.elements[1].classList.contains("field") || draggable.elements[1].classList.contains("placeholder"));
		const onZone = draggable.elements[1] && draggable.elements[1].classList.contains("zone");

		if (onField && !dontMove) {
			const onHorizontal = draggable.left < activeArea || draggable.left > draggable.elements[1].offsetWidth - activeArea;
			let hIdx;
			let vIdx;
			if (draggable.elements[1].getAttribute("data-placeholder")) return;
			vIdx = calculateVIdx(draggable.elements, draggable.top, onHorizontal);

			if (vIdx === null) {
				if (placeholder !== null) {
					removeCell();
				}

				return;
			}

			if (onHorizontal) {
				hIdx = calculateHIdx(draggable.elements, draggable.left);
			} else {
				hIdx = null;
			}

			if (!placeholder) {
				generatePlaceHolder(vIdx, hIdx);
				addNewCell();
				dontMove = true;
				clearTimeout(to);

				to = setTimeout(
					() => {
						dontMove = false;
					},
					800
				);
			}

			const deletePlaceHolder = (vIdx !== placeholder.position[0] || hIdx !== placeholder.position[1]) && !draggable.elements[1].getAttribute("data-placeholder");

			if (placeholder && deletePlaceHolder) {
				removeCell();
			}
		}

		//once mouse lefts from field then delete placerholder
		if (!onField && placeholder) {
			removeCell();
		}

		//dropping first element
		if (!onField && onZone) {
			generatePlaceHolder(0, null);
			addNewCell();
		}
	}

	function onDrop(ev) {
		removePlaceHolderKey();
		$$invalidate(0, placeholder = null);
	}

	function calculateVIdx(elements, top, onHorizontal) {
		const lineElement = elements[1].closest('.row');

		if (onHorizontal) {
			return Number(lineElement.getAttribute('id'));
		}

		if (top > lineElement.offsetHeight - activeArea) {
			return Number(lineElement.id) + 1;
		}

		if (top < activeArea) {
			return Number(lineElement.id);
		}

		return null;
	}

	onMount(() => {
		bindItems.forEach(item => {
			draggable.setElement(item, { onDragStart, onDrag, onDrop });
		});
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Form> was created with unknown prop '${key}'`);
	});

	function div_binding($$value, index) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			bindItems[index] = $$value;
			$$invalidate(1, bindItems);
			$$invalidate(3, dragItems);
		});
	}

	$$self.$capture_state = () => ({
		onMount,
		Row,
		Draggable,
		Example,
		draggable,
		activeArea,
		placeholder,
		to,
		dontMove,
		bindItems,
		COLORS,
		dragItems,
		dropZoneItems,
		generatePlaceHolder,
		addNewCell,
		removeCell,
		removePlaceHolderKey,
		onDragStart,
		onDrag,
		onDrop,
		calculateHIdx,
		calculateVIdx
	});

	$$self.$inject_state = $$props => {
		if ('activeArea' in $$props) activeArea = $$props.activeArea;
		if ('placeholder' in $$props) $$invalidate(0, placeholder = $$props.placeholder);
		if ('to' in $$props) to = $$props.to;
		if ('dontMove' in $$props) dontMove = $$props.dontMove;
		if ('bindItems' in $$props) $$invalidate(1, bindItems = $$props.bindItems);
		if ('dragItems' in $$props) $$invalidate(3, dragItems = $$props.dragItems);
		if ('dropZoneItems' in $$props) $$invalidate(2, dropZoneItems = $$props.dropZoneItems);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [placeholder, bindItems, dropZoneItems, dragItems, div_binding];
}

class Form extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Form",
			options,
			id: create_fragment.name
		});
	}
}

export { Form as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS42MjJiZjRmOS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9leGFtcGxlLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvRm9ybS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cclxuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcclxuICBpbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tICcuL0RyYWdnYWJsZS5qcyc7XHJcblxyXG4gIGNvbnN0IGRyYWdnYWJsZSA9IG5ldyBEcmFnZ2FibGUoKTtcclxuICBkcmFnZ2FibGUuY2xvc2VzdCA9ICdteWl0ZW0nO1xyXG4gIGxldCBteWRpdjtcclxuICBsZXQgaGFuZGxlO1xyXG5cclxuICBmdW5jdGlvbiBvbkRyYWdTdGFydChldikge1xyXG4gICAgLypcclxuICAgIC8vIHNldCBjbG9uZWQgb2JqZWN0IGFuZCBpdHMgYmcgY29sb3JcclxuICAgIGNvbnN0IGNsb25lID0gZXYudGFyZ2V0LmNsb25lTm9kZSh0cnVlKTtcclxuICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoXCJjbG9uZVwiKTtcclxuXHJcbiAgICBkcmFnZ2FibGUuZHJhZ0RhdGEgPSB7XHJcbiAgICAgIGNsb25lLFxyXG5cclxuICAgIH07XHJcbiAgICAqL1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25EcmFnKGV2KSB7XHJcbiAgICBpZiAoZHJhZ2dhYmxlLmRyYWdEYXRhICYmIGRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZSAmJiAhZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lLnBhcmVudE5vZGUpIHtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGRyYWdnYWJsZSAmJiBkcmFnZ2FibGUuZHJhZ0RhdGEgJiYgZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lKSB7XHJcbiAgICAgIGRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZS5zdHlsZS5sZWZ0ID1cclxuICAgICAgICBldi5jbGllbnRYIC0gZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lLm9mZnNldFdpZHRoIC8gOCArIFwicHhcIjtcclxuICAgICAgZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lLnN0eWxlLnRvcCA9XHJcbiAgICAgICAgZXYuY2xpZW50WSAtIGRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZS5vZmZzZXRIZWlnaHQgLyA0ICsgXCJweFwiO1xyXG4gICAgICBkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUuc3R5bGUuYmFja2dyb3VuZCA9ICdvcmFuZ2UnXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkRyb3AoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgb25Nb3VudCgoKSA9PiB7XHJcbiAgICBkcmFnZ2FibGUuc2V0RWxlbWVudChteWRpdiwge1xyXG4gICAgICBvbkRyYWdTdGFydCxcclxuICAgICAgb25EcmFnLFxyXG4gICAgICBvbkRyb3BcclxuICAgIH0sIGhhbmRsZSlcclxuXHJcbiAgfSk7XHJcbjwvc2NyaXB0PlxyXG5cclxuPGRpdiBjbGFzcz1cIm15aXRlbVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogODBweDsgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcIiBiaW5kOnRoaXM9e215ZGl2fT5cclxuICA8ZGl2XHJcbiAgICBzdHlsZT1cIiBjdXJzb3I6IGdyYWI7d2lkdGg6IDIwcHhcIlxyXG4gICAgY2xhc3M9XCJoYW5kbGVcIlxyXG4gICAgYmluZDp0aGlzPXtoYW5kbGV9XHJcbiAgPlxyXG4gICAgWz1dXHJcbiAgPC9kaXY+XHJcbjwvZGl2PiIsIjxzY3JpcHQ+XHJcbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcclxuICBpbXBvcnQgUm93IGZyb20gXCIuL1Jvdy5zdmVsdGVcIjtcclxuICBpbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi9EcmFnZ2FibGUuanNcIjtcclxuICBpbXBvcnQgRXhhbXBsZSBmcm9tIFwiLi9leGFtcGxlLnN2ZWx0ZVwiO1xyXG5cclxuICBjb25zdCBkcmFnZ2FibGUgPSBuZXcgRHJhZ2dhYmxlKCk7XHJcblxyXG4gIGxldCBhY3RpdmVBcmVhID0gMjU7XHJcbiAgbGV0IHBsYWNlaG9sZGVyID0gbnVsbDtcclxuICBsZXQgdG87XHJcbiAgbGV0IGRvbnRNb3ZlO1xyXG4gIC8vZXhwb3J0IGxldCByZWxvY2F0ZSA9IGZhbHNlO1xyXG4gIGxldCBiaW5kSXRlbXMgPSBbXTtcclxuXHJcbiAgLy8kOiBjb25zb2xlLnRyYWNlKHBsYWNlaG9sZGVyKTtcclxuXHJcbiAgY29uc3QgQ09MT1JTID0ge1xyXG4gICAgYnJvd246IFwiIzcyMTkxOVwiLFxyXG4gICAgYmx1ZTogXCIjMjIyMjhkXCIsXHJcbiAgICBvcmFuZ2U6IFwiIzk3NjEwMFwiLFxyXG4gICAgZ3JlZW46IFwiIzFmNjIxZlwiLFxyXG4gICAgcmVkOiBcIiM4NzNlM2VcIixcclxuICAgIHBpbms6IFwiIzg3M2U3NVwiLFxyXG4gICAgZ3JheTogXCIjNDI0MjQyXCIsXHJcbiAgICB5ZWxsb3c6IFwiIzc2NzYxNFwiLFxyXG4gIH07XHJcblxyXG4gIGxldCBkcmFnSXRlbXMgPSBbXHJcbiAgICB7IGlkOiAxLCB0aXRsZTogXCJEcmFnIEl0ZW0gMVwiLCBjb2xvcjogQ09MT1JTLmJyb3duIH0sXHJcbiAgICB7IGlkOiAyLCB0aXRsZTogXCJEcmFnIEl0ZW0gMlwiLCBjb2xvcjogQ09MT1JTLmdyZWVuIH0sXHJcbiAgICB7IGlkOiAzLCB0aXRsZTogXCJEcmFnIEl0ZW0gM1wiLCBjb2xvcjogQ09MT1JTLnBpbmsgfSxcclxuICAgIHsgaWQ6IDQsIHRpdGxlOiBcIkRyYWcgSXRlbSA0XCIsIGNvbG9yOiBDT0xPUlMuZ3JheSB9LFxyXG4gICAgeyBpZDogMTAsIHRpdGxlOiBcIkRyYWcgSXRlbSA0XCIsIGNvbG9yOiBDT0xPUlMuYmx1ZSB9LFxyXG4gIF07XHJcblxyXG4gIGxldCBkcm9wWm9uZUl0ZW1zID0gW1xyXG4gICAgLy8gW3sgaWQ6IDEzLCB0aXRsZTogXCJJdGVtIChibHVlKVwiLCBjb2xvcjogQ09MT1JTLmJsdWUgfV0sXHJcbiAgICAvLyBbXHJcbiAgICAvLyAgIHsgaWQ6IDUsIHRpdGxlOiBcIkl0ZW0gKHllbGxvdylcIiwgY29sb3I6IENPTE9SUy55ZWxsb3cgfSxcclxuICAgIC8vICAgeyBpZDogNiwgdGl0bGU6IFwiSXRlbSAob3JhbmdlKVwiLCBjb2xvcjogQ09MT1JTLm9yYW5nZSB9LFxyXG4gICAgLy8gICB7IGlkOiA3LCB0aXRsZTogXCJJdGVtIChibHVlKVwiLCBjb2xvcjogXCIjMjIyMjhkXCIgfSxcclxuICAgIC8vIF0sXHJcbiAgICAvLyBbeyBpZDogOCwgdGl0bGU6IFwiSXRlbSAoZ3JlZW4pXCIsIGNvbG9yOiBDT0xPUlMuZ3JlZW4gfV0sXHJcbiAgICAvLyBbXHJcbiAgICAvLyAgIHsgaWQ6IDksIHRpdGxlOiBcIkl0ZW0gKHllbGxvdylcIiwgY29sb3I6IENPTE9SUy55ZWxsb3cgfSxcclxuICAgIC8vICAgeyBpZDogMTAsIHRpdGxlOiBcIkl0ZW0gKGJsdWUpXCIsIGNvbG9yOiBDT0xPUlMuYmx1ZSB9LFxyXG4gICAgLy8gICB7IGlkOiAxMSwgdGl0bGU6IFwiSXRlbSAob3JhbmdlKVwiLCBjb2xvcjogQ09MT1JTLm9yYW5nZSB9LFxyXG4gICAgLy8gICB7IGlkOiAxMiwgdGl0bGU6IFwiSXRlbSAocmVkKVwiLCBjb2xvcjogQ09MT1JTLnJlZCB9LFxyXG4gICAgLy8gICB7IGlkOiAxMywgdGl0bGU6IFwiSXRlbSAocmVkKVwiLCBjb2xvcjogQ09MT1JTLnJlZCB9LFxyXG4gICAgLy8gICB7IGlkOiAxNCwgdGl0bGU6IFwiSXRlbSAocmVkKVwiLCBjb2xvcjogQ09MT1JTLnJlZCB9LFxyXG4gICAgLy8gICB7IGlkOiAxNiwgdGl0bGU6IFwiSXRlbSAocmVkKVwiLCBjb2xvcjogQ09MT1JTLnJlZCB9LFxyXG4gICAgLy8gXSxcclxuICBdO1xyXG5cclxuICBmdW5jdGlvbiBnZW5lcmF0ZVBsYWNlSG9sZGVyKHZJZHgsIGhJZHgpIHtcclxuICAgIHBsYWNlaG9sZGVyID0ge1xyXG4gICAgICBpdGVtOiBkcmFnZ2FibGUuZHJhZ0RhdGEuaXRlbSxcclxuICAgICAgcGxhY2Vob2xkZXI6IHRydWUsXHJcbiAgICAgIGNvbG9yOiBcInJnYigxMjQgMTI0IDEyNCAvIDcyJSlcIixcclxuICAgICAgcG9zaXRpb246IFt2SWR4LCBoSWR4XSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhZGROZXdDZWxsKCkge1xyXG4gICAgaWYgKHBsYWNlaG9sZGVyLnBvc2l0aW9uWzFdID09PSBudWxsKSB7XHJcbiAgICAgIGRyb3Bab25lSXRlbXMuc3BsaWNlKHBsYWNlaG9sZGVyLnBvc2l0aW9uWzBdLCAwLCBbcGxhY2Vob2xkZXJdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRyb3Bab25lSXRlbXNbcGxhY2Vob2xkZXIucG9zaXRpb25bMF1dLnNwbGljZShcclxuICAgICAgICBwbGFjZWhvbGRlci5wb3NpdGlvblsxXSxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBkcm9wWm9uZUl0ZW1zID0gZHJvcFpvbmVJdGVtcztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZUNlbGwoVklkeCwgSElkeCkge1xyXG4gICAgaWYgKCFwbGFjZWhvbGRlcikgcmV0dXJuO1xyXG4gICAgaWYgKHBsYWNlaG9sZGVyICYmIHBsYWNlaG9sZGVyLnBvc2l0aW9uWzFdID09PSBudWxsKSB7XHJcbiAgICAgIGRyb3Bab25lSXRlbXMuc3BsaWNlKHBsYWNlaG9sZGVyLnBvc2l0aW9uWzBdLCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRyb3Bab25lSXRlbXNbcGxhY2Vob2xkZXIucG9zaXRpb25bMF1dLnNwbGljZShwbGFjZWhvbGRlci5wb3NpdGlvblsxXSwgMSk7XHJcbiAgICB9XHJcbiAgICBkcm9wWm9uZUl0ZW1zID0gZHJvcFpvbmVJdGVtcztcclxuICAgIHBsYWNlaG9sZGVyID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZVBsYWNlSG9sZGVyS2V5KCkge1xyXG4gICAgLy9BbGwgZHJvcFpvbmVJdGVtcyBtdXN0IGhhdmUgc2FtZSBkYXRhIHN0cnVjdHJlXHJcbiAgICBpZiAocGxhY2Vob2xkZXIgJiYgcGxhY2Vob2xkZXIucG9zaXRpb24pXHJcbiAgICAgIGRyb3Bab25lSXRlbXNbcGxhY2Vob2xkZXIucG9zaXRpb25bMF1dW3BsYWNlaG9sZGVyLnBvc2l0aW9uWzFdIHx8IDBdID1cclxuICAgICAgICBwbGFjZWhvbGRlci5pdGVtO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25EcmFnU3RhcnQoZXYpIHtcclxuICAgIGRyYWdnYWJsZS5kcmFnRGF0YS5pdGVtID0gZHJhZ0l0ZW1zLmZpbmQoXHJcbiAgICAgIChvKSA9PiBvLmlkID09PSBOdW1iZXIoZXYudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25EcmFnKGV2KSB7XHJcbiAgICBjb25zdCBvbkZpZWxkID1cclxuICAgICAgZHJhZ2dhYmxlLmVsZW1lbnRzWzFdICYmXHJcbiAgICAgIChkcmFnZ2FibGUuZWxlbWVudHNbMV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmllbGRcIikgfHxcclxuICAgICAgICBkcmFnZ2FibGUuZWxlbWVudHNbMV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicGxhY2Vob2xkZXJcIikpO1xyXG5cclxuICAgIGNvbnN0IG9uWm9uZSA9XHJcbiAgICAgIGRyYWdnYWJsZS5lbGVtZW50c1sxXSAmJiBkcmFnZ2FibGUuZWxlbWVudHNbMV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiem9uZVwiKTtcclxuXHJcbiAgICBpZiAob25GaWVsZCAmJiAhZG9udE1vdmUpIHtcclxuICAgICAgY29uc3Qgb25Ib3Jpem9udGFsID1cclxuICAgICAgICBkcmFnZ2FibGUubGVmdCA8IGFjdGl2ZUFyZWEgfHxcclxuICAgICAgICBkcmFnZ2FibGUubGVmdCA+IGRyYWdnYWJsZS5lbGVtZW50c1sxXS5vZmZzZXRXaWR0aCAtIGFjdGl2ZUFyZWE7XHJcblxyXG4gICAgICBsZXQgaElkeDtcclxuICAgICAgbGV0IHZJZHg7XHJcblxyXG4gICAgICBpZiAoZHJhZ2dhYmxlLmVsZW1lbnRzWzFdLmdldEF0dHJpYnV0ZShcImRhdGEtcGxhY2Vob2xkZXJcIikpIHJldHVybjtcclxuXHJcbiAgICAgIHZJZHggPSBjYWxjdWxhdGVWSWR4KFxyXG4gICAgICAgIGRyYWdnYWJsZS5lbGVtZW50cyxcclxuICAgICAgICBkcmFnZ2FibGUudG9wLFxyXG4gICAgICAgIG9uSG9yaXpvbnRhbFxyXG4gICAgICApO1xyXG4gICAgICBpZiAodklkeCA9PT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChwbGFjZWhvbGRlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmVtb3ZlQ2VsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvbkhvcml6b250YWwpIHtcclxuICAgICAgICBoSWR4ID0gY2FsY3VsYXRlSElkeChkcmFnZ2FibGUuZWxlbWVudHMsIGRyYWdnYWJsZS5sZWZ0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoSWR4ID0gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFwbGFjZWhvbGRlcikge1xyXG4gICAgICAgIGdlbmVyYXRlUGxhY2VIb2xkZXIodklkeCwgaElkeCk7XHJcbiAgICAgICAgYWRkTmV3Q2VsbCgpO1xyXG5cclxuICAgICAgICBkb250TW92ZSA9IHRydWU7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRvKTtcclxuICAgICAgICB0byA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgZG9udE1vdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCA4MDApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGRlbGV0ZVBsYWNlSG9sZGVyID1cclxuICAgICAgICAodklkeCAhPT0gcGxhY2Vob2xkZXIucG9zaXRpb25bMF0gfHxcclxuICAgICAgICAgIGhJZHggIT09IHBsYWNlaG9sZGVyLnBvc2l0aW9uWzFdKSAmJlxyXG4gICAgICAgICFkcmFnZ2FibGUuZWxlbWVudHNbMV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1wbGFjZWhvbGRlclwiKTtcclxuXHJcbiAgICAgIGlmIChwbGFjZWhvbGRlciAmJiBkZWxldGVQbGFjZUhvbGRlcikge1xyXG4gICAgICAgIHJlbW92ZUNlbGwoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vb25jZSBtb3VzZSBsZWZ0cyBmcm9tIGZpZWxkIHRoZW4gZGVsZXRlIHBsYWNlcmhvbGRlclxyXG4gICAgaWYgKCFvbkZpZWxkICYmIHBsYWNlaG9sZGVyKSB7XHJcbiAgICAgIHJlbW92ZUNlbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2Ryb3BwaW5nIGZpcnN0IGVsZW1lbnRcclxuICAgIGlmICghb25GaWVsZCAmJiBvblpvbmUpIHtcclxuICAgICAgZ2VuZXJhdGVQbGFjZUhvbGRlcigwLCBudWxsKTtcclxuICAgICAgYWRkTmV3Q2VsbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25Ecm9wKGV2KSB7XHJcbiAgICByZW1vdmVQbGFjZUhvbGRlcktleSgpO1xyXG4gICAgcGxhY2Vob2xkZXIgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2FsY3VsYXRlSElkeChlbGVtZW50cywgbGVmdCkge1xyXG4gICAgaWYgKGxlZnQgPiBlbGVtZW50c1sxXS5vZmZzZXRXaWR0aCAvIDIpIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihlbGVtZW50c1sxXS5pZCkgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGVsZW1lbnRzWzJdLmNsYXNzTGlzdC5jb250YWlucyhcImZpZWxkXCIpXHJcbiAgICAgICAgPyBOdW1iZXIoZWxlbWVudHNbMl0uaWQpXHJcbiAgICAgICAgOiBOdW1iZXIoZWxlbWVudHNbMV0uaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2FsY3VsYXRlVklkeChlbGVtZW50cywgdG9wLCBvbkhvcml6b250YWwpIHtcclxuICAgIGNvbnN0IGxpbmVFbGVtZW50ID0gZWxlbWVudHNbMV0uY2xvc2VzdCgnLnJvdycpO1xyXG5cclxuICAgIGlmIChvbkhvcml6b250YWwpIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihsaW5lRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0b3AgPiBsaW5lRWxlbWVudC5vZmZzZXRIZWlnaHQgLSBhY3RpdmVBcmVhKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIobGluZUVsZW1lbnQuaWQpICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodG9wIDwgYWN0aXZlQXJlYSkge1xyXG4gICAgICByZXR1cm4gTnVtYmVyKGxpbmVFbGVtZW50LmlkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG5cclxuICBvbk1vdW50KCgpID0+IHtcclxuICAgIGJpbmRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGRyYWdnYWJsZS5zZXRFbGVtZW50KGl0ZW0sIHtcclxuICAgICAgICBvbkRyYWdTdGFydCxcclxuICAgICAgICBvbkRyYWcsXHJcbiAgICAgICAgb25Ecm9wLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG48L3NjcmlwdD5cclxuXHJcbjwhLS1kcm9wIHpvbmUtLT5cclxuPGRpdiBjbGFzcz1cInpvbmVcIj5cclxuICB7I2VhY2ggZHJvcFpvbmVJdGVtcyBhcyByb3dzLCBpbmRleH1cclxuICAgIDxSb3cge3BsYWNlaG9sZGVyfSByb3dJbmRleD17aW5kZXh9IHtyb3dzfSAvPlxyXG4gIHsvZWFjaH1cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwiZHJhZy1saXN0XCIgaWQ9XCJkcmFnTGlzdFwiPlxyXG4gIHsjZWFjaCBkcmFnSXRlbXMgYXMgaXRlbSwgaW5kZXggKGl0ZW0uaWQpfVxyXG4gICAgPGRpdlxyXG4gICAgICBiaW5kOnRoaXM9e2JpbmRJdGVtc1tpbmRleF19XHJcbiAgICAgIGNsYXNzPVwiY2VsbFwiXHJcbiAgICAgIGRhdGEtaWQ9e2l0ZW0uaWR9XHJcbiAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoge2l0ZW0uY29sb3J9O1wiXHJcbiAgICA+XHJcbiAgICAgIHtpdGVtLnRpdGxlfVxyXG4gICAgPC9kaXY+XHJcbiAgey9lYWNofVxyXG48L2Rpdj5cclxuXHJcbjxFeGFtcGxlIC8+XHJcblxyXG48c3R5bGU+XHJcbiAgOmdsb2JhbChodG1sKSxcclxuICA6Z2xvYmFsKGJvZHkpIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICB9XHJcblxyXG4gIEBrZXlmcmFtZXMgdyB7XHJcbiAgICAwJSB7XHJcbiAgICAgIGZsZXg6IDA7XHJcbiAgICB9XHJcbiAgICAxMDAlIHtcclxuICAgICAgZmxleDogMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBrZXlmcmFtZXMgaCB7XHJcbiAgICAwJSB7XHJcbiAgICAgIGhlaWdodDogMDtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICA6Z2xvYmFsKC5wbGFjZWhvbGRlcncpIHtcclxuICAgIGFuaW1hdGlvbjogdyAwLjJzO1xyXG4gIH1cclxuXHJcbiAgOmdsb2JhbCgucGxhY2Vob2xkZXJoKSB7XHJcbiAgICBhbmltYXRpb246IGggMC4ycztcclxuICB9XHJcblxyXG4gIC5jZWxsIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICBjb2xvcjogI2JiYjtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICB9XHJcblxyXG4gIC56b25lIHtcclxuICAgIGJvcmRlcjogIzk5OSAxcHggc29saWQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiA4MHB4O1xyXG4gIH1cclxuXHJcbiAgLmRyYWctbGlzdCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICB9XHJcblxyXG4gIDpnbG9iYWwoLmNsb25lKSB7XHJcbiAgICB3aWR0aDogMjAwcHggIWltcG9ydGFudDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIG9wYWNpdHk6IDAuNjtcclxuICB9XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFzREcsS0FFRDs7Ozs7Ozs7OEJBRkMsS0FFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FQRixvQkFRTTtHQVBKLG9CQU1NOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQS9DRyxXQUFXLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7OztTQTBCZCxNQUFNOzs7Ozs7O09BL0JULFNBQVMsT0FBTyxTQUFTO0NBQy9CLFNBQVMsQ0FBQyxPQUFPLEdBQUcsUUFBUTtLQUN4QixLQUFLO0tBQ0wsTUFBTTs7VUFlRCxNQUFNLENBQUMsRUFBRTtNQUNaLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVTtHQUN4RixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFD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
