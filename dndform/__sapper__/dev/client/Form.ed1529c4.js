import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as onMount, f as element, g as text, h as claim_element, j as children, k as claim_text, l as detach_dev, p as set_style, q as attr_dev, r as add_location, u as insert_hydration_dev, w as append_hydration_dev, n as noop, x as binding_callbacks, y as validate_each_argument, z as validate_each_keys, c as create_component, a as claim_component, m as mount_component, t as transition_in, b as transition_out, e as destroy_component, A as space, B as claim_space, C as check_outros, D as update_keyed_each, E as destroy_each, F as group_outros, G as destroy_block } from './client.acbfd31d.js';
import Row from './Row.7dc83e5f.js';
import { D as Draggable } from './Cell.b162054f.js';
import './Placeholder.6320198e.js';

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
			add_location(div0, file$1, 53, 2, 1330);
			attr_dev(div1, "class", "myitem");
			set_style(div1, "width", "100%");
			set_style(div1, "height", "80px");
			set_style(div1, "background-color", "#555");
			add_location(div1, file$1, 52, 0, 1229);
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

function onDrop() {
	
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Example', slots, []);
	let mydiv;
	let handle;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5lZDE1MjljNC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9leGFtcGxlLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvRm9ybS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPCEtLTxzY3JpcHQ+LS0+XHJcbjwhLS0gIGltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gJy4vRHJhZ2dhYmxlLmpzJzstLT5cclxuPCEtLSAgY29uc3QgZHJhZ2dhYmxlID0gbmV3IERyYWdnYWJsZSgpOy0tPlxyXG48IS0tPC9zY3JpcHQ+LS0+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xyXG5cclxuICBsZXQgbXlkaXY7XHJcbiAgbGV0IGhhbmRsZTtcclxuIC8vIGNvbnN0IGRyYWdnYWJsZSA9IG5ldyBEcmFnZ2FibGUoKTtcclxuXHJcbiAgZnVuY3Rpb24gb25EcmFnU3RhcnQoZXYpIHtcclxuICAgIC8qXHJcbiAgICAvLyBzZXQgY2xvbmVkIG9iamVjdCBhbmQgaXRzIGJnIGNvbG9yXHJcbiAgICBjb25zdCBjbG9uZSA9IGV2LnRhcmdldC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKFwiY2xvbmVcIik7XHJcblxyXG4gICAgZHJhZ2dhYmxlLmRyYWdEYXRhID0ge1xyXG4gICAgICBjbG9uZSxcclxuXHJcbiAgICB9O1xyXG4gICAgKi9cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uRHJhZyhldikge1xyXG4gICAgaWYgKGRyYWdnYWJsZS5kcmFnRGF0YSAmJiBkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUgJiYgIWRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZS5wYXJlbnROb2RlKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lKTtcclxuICAgIH1cclxuICAgIGlmIChkcmFnZ2FibGUgJiYgZHJhZ2dhYmxlLmRyYWdEYXRhICYmIGRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZSkge1xyXG4gICAgICBkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUuc3R5bGUubGVmdCA9XHJcbiAgICAgICAgZXYuY2xpZW50WCAtIGRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZS5vZmZzZXRXaWR0aCAvIDggKyBcInB4XCI7XHJcbiAgICAgIGRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZS5zdHlsZS50b3AgPVxyXG4gICAgICAgIGV2LmNsaWVudFkgLSBkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUub2Zmc2V0SGVpZ2h0IC8gNCArIFwicHhcIjtcclxuICAgICAgZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lLnN0eWxlLmJhY2tncm91bmQgPSAnb3JhbmdlJ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25Ecm9wKCkge1xyXG5cclxuICB9XHJcblxyXG4gIG9uTW91bnQoKCkgPT4ge1xyXG4gICAgZHJhZ2dhYmxlLnNldEVsZW1lbnQobXlkaXYsIHtcclxuICAgICAgb25EcmFnU3RhcnQsXHJcbiAgICAgIG9uRHJhZyxcclxuICAgICAgb25Ecm9wXHJcbiAgICB9LCBoYW5kbGUpXHJcblxyXG4gIH0pO1xyXG48L3NjcmlwdD5cclxuXHJcbjxkaXYgY2xhc3M9XCJteWl0ZW1cIiBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDgwcHg7IGJhY2tncm91bmQtY29sb3I6ICM1NTU7XCIgYmluZDp0aGlzPXtteWRpdn0+XHJcbiAgPGRpdlxyXG4gICAgc3R5bGU9XCIgY3Vyc29yOiBncmFiO3dpZHRoOiAyMHB4XCJcclxuICAgIGNsYXNzPVwiaGFuZGxlXCJcclxuICAgIGJpbmQ6dGhpcz17aGFuZGxlfVxyXG4gID5cclxuICAgIFs9XVxyXG4gIDwvZGl2PlxyXG48L2Rpdj4iLCI8c2NyaXB0PlxyXG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tIFwic3ZlbHRlXCI7XHJcbiAgaW1wb3J0IFJvdyBmcm9tIFwiLi9Sb3cuc3ZlbHRlXCI7XHJcbiAgaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4vRHJhZ2dhYmxlLmpzXCI7XHJcbiAgaW1wb3J0IEV4YW1wbGUgZnJvbSBcIi4vZXhhbXBsZS5zdmVsdGVcIjtcclxuXHJcbiAgY29uc3QgZHJhZ2dhYmxlID0gbmV3IERyYWdnYWJsZSgpO1xyXG5cclxuICBsZXQgYWN0aXZlQXJlYSA9IDI1O1xyXG4gIGxldCBwbGFjZWhvbGRlciA9IG51bGw7XHJcbiAgbGV0IHRvO1xyXG4gIGxldCBkb250TW92ZTtcclxuICAvL2V4cG9ydCBsZXQgcmVsb2NhdGUgPSBmYWxzZTtcclxuICBsZXQgYmluZEl0ZW1zID0gW107XHJcblxyXG4gIC8vJDogY29uc29sZS50cmFjZShwbGFjZWhvbGRlcik7XHJcblxyXG4gIGNvbnN0IENPTE9SUyA9IHtcclxuICAgIGJyb3duOiBcIiM3MjE5MTlcIixcclxuICAgIGJsdWU6IFwiIzIyMjI4ZFwiLFxyXG4gICAgb3JhbmdlOiBcIiM5NzYxMDBcIixcclxuICAgIGdyZWVuOiBcIiMxZjYyMWZcIixcclxuICAgIHJlZDogXCIjODczZTNlXCIsXHJcbiAgICBwaW5rOiBcIiM4NzNlNzVcIixcclxuICAgIGdyYXk6IFwiIzQyNDI0MlwiLFxyXG4gICAgeWVsbG93OiBcIiM3Njc2MTRcIixcclxuICB9O1xyXG5cclxuICBsZXQgZHJhZ0l0ZW1zID0gW1xyXG4gICAgeyBpZDogMSwgdGl0bGU6IFwiRHJhZyBJdGVtIDFcIiwgY29sb3I6IENPTE9SUy5icm93biB9LFxyXG4gICAgeyBpZDogMiwgdGl0bGU6IFwiRHJhZyBJdGVtIDJcIiwgY29sb3I6IENPTE9SUy5ncmVlbiB9LFxyXG4gICAgeyBpZDogMywgdGl0bGU6IFwiRHJhZyBJdGVtIDNcIiwgY29sb3I6IENPTE9SUy5waW5rIH0sXHJcbiAgICB7IGlkOiA0LCB0aXRsZTogXCJEcmFnIEl0ZW0gNFwiLCBjb2xvcjogQ09MT1JTLmdyYXkgfSxcclxuICAgIHsgaWQ6IDEwLCB0aXRsZTogXCJEcmFnIEl0ZW0gNFwiLCBjb2xvcjogQ09MT1JTLmJsdWUgfSxcclxuICBdO1xyXG5cclxuICBsZXQgZHJvcFpvbmVJdGVtcyA9IFtcclxuICAgIC8vIFt7IGlkOiAxMywgdGl0bGU6IFwiSXRlbSAoYmx1ZSlcIiwgY29sb3I6IENPTE9SUy5ibHVlIH1dLFxyXG4gICAgLy8gW1xyXG4gICAgLy8gICB7IGlkOiA1LCB0aXRsZTogXCJJdGVtICh5ZWxsb3cpXCIsIGNvbG9yOiBDT0xPUlMueWVsbG93IH0sXHJcbiAgICAvLyAgIHsgaWQ6IDYsIHRpdGxlOiBcIkl0ZW0gKG9yYW5nZSlcIiwgY29sb3I6IENPTE9SUy5vcmFuZ2UgfSxcclxuICAgIC8vICAgeyBpZDogNywgdGl0bGU6IFwiSXRlbSAoYmx1ZSlcIiwgY29sb3I6IFwiIzIyMjI4ZFwiIH0sXHJcbiAgICAvLyBdLFxyXG4gICAgLy8gW3sgaWQ6IDgsIHRpdGxlOiBcIkl0ZW0gKGdyZWVuKVwiLCBjb2xvcjogQ09MT1JTLmdyZWVuIH1dLFxyXG4gICAgLy8gW1xyXG4gICAgLy8gICB7IGlkOiA5LCB0aXRsZTogXCJJdGVtICh5ZWxsb3cpXCIsIGNvbG9yOiBDT0xPUlMueWVsbG93IH0sXHJcbiAgICAvLyAgIHsgaWQ6IDEwLCB0aXRsZTogXCJJdGVtIChibHVlKVwiLCBjb2xvcjogQ09MT1JTLmJsdWUgfSxcclxuICAgIC8vICAgeyBpZDogMTEsIHRpdGxlOiBcIkl0ZW0gKG9yYW5nZSlcIiwgY29sb3I6IENPTE9SUy5vcmFuZ2UgfSxcclxuICAgIC8vICAgeyBpZDogMTIsIHRpdGxlOiBcIkl0ZW0gKHJlZClcIiwgY29sb3I6IENPTE9SUy5yZWQgfSxcclxuICAgIC8vICAgeyBpZDogMTMsIHRpdGxlOiBcIkl0ZW0gKHJlZClcIiwgY29sb3I6IENPTE9SUy5yZWQgfSxcclxuICAgIC8vICAgeyBpZDogMTQsIHRpdGxlOiBcIkl0ZW0gKHJlZClcIiwgY29sb3I6IENPTE9SUy5yZWQgfSxcclxuICAgIC8vICAgeyBpZDogMTYsIHRpdGxlOiBcIkl0ZW0gKHJlZClcIiwgY29sb3I6IENPTE9SUy5yZWQgfSxcclxuICAgIC8vIF0sXHJcbiAgXTtcclxuXHJcbiAgZnVuY3Rpb24gZ2VuZXJhdGVQbGFjZUhvbGRlcih2SWR4LCBoSWR4KSB7XHJcbiAgICBwbGFjZWhvbGRlciA9IHtcclxuICAgICAgaXRlbTogZHJhZ2dhYmxlLmRyYWdEYXRhLml0ZW0sXHJcbiAgICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxyXG4gICAgICBjb2xvcjogXCJyZ2IoMTI0IDEyNCAxMjQgLyA3MiUpXCIsXHJcbiAgICAgIHBvc2l0aW9uOiBbdklkeCwgaElkeF0sXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTmV3Q2VsbCgpIHtcclxuICAgIGlmIChwbGFjZWhvbGRlci5wb3NpdGlvblsxXSA9PT0gbnVsbCkge1xyXG4gICAgICBkcm9wWm9uZUl0ZW1zLnNwbGljZShwbGFjZWhvbGRlci5wb3NpdGlvblswXSwgMCwgW3BsYWNlaG9sZGVyXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkcm9wWm9uZUl0ZW1zW3BsYWNlaG9sZGVyLnBvc2l0aW9uWzBdXS5zcGxpY2UoXHJcbiAgICAgICAgcGxhY2Vob2xkZXIucG9zaXRpb25bMV0sXHJcbiAgICAgICAgMCxcclxuICAgICAgICBwbGFjZWhvbGRlclxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgZHJvcFpvbmVJdGVtcyA9IGRyb3Bab25lSXRlbXM7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVDZWxsKFZJZHgsIEhJZHgpIHtcclxuICAgIGlmICghcGxhY2Vob2xkZXIpIHJldHVybjtcclxuICAgIGlmIChwbGFjZWhvbGRlciAmJiBwbGFjZWhvbGRlci5wb3NpdGlvblsxXSA9PT0gbnVsbCkge1xyXG4gICAgICBkcm9wWm9uZUl0ZW1zLnNwbGljZShwbGFjZWhvbGRlci5wb3NpdGlvblswXSwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkcm9wWm9uZUl0ZW1zW3BsYWNlaG9sZGVyLnBvc2l0aW9uWzBdXS5zcGxpY2UocGxhY2Vob2xkZXIucG9zaXRpb25bMV0sIDEpO1xyXG4gICAgfVxyXG4gICAgZHJvcFpvbmVJdGVtcyA9IGRyb3Bab25lSXRlbXM7XHJcbiAgICBwbGFjZWhvbGRlciA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVQbGFjZUhvbGRlcktleSgpIHtcclxuICAgIC8vQWxsIGRyb3Bab25lSXRlbXMgbXVzdCBoYXZlIHNhbWUgZGF0YSBzdHJ1Y3RyZVxyXG4gICAgaWYgKHBsYWNlaG9sZGVyICYmIHBsYWNlaG9sZGVyLnBvc2l0aW9uKVxyXG4gICAgICBkcm9wWm9uZUl0ZW1zW3BsYWNlaG9sZGVyLnBvc2l0aW9uWzBdXVtwbGFjZWhvbGRlci5wb3NpdGlvblsxXSB8fCAwXSA9XHJcbiAgICAgICAgcGxhY2Vob2xkZXIuaXRlbTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0KGV2KSB7XHJcbiAgICBkcmFnZ2FibGUuZHJhZ0RhdGEuaXRlbSA9IGRyYWdJdGVtcy5maW5kKFxyXG4gICAgICAobykgPT4gby5pZCA9PT0gTnVtYmVyKGV2LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uRHJhZyhldikge1xyXG4gICAgY29uc3Qgb25GaWVsZCA9XHJcbiAgICAgIGRyYWdnYWJsZS5lbGVtZW50c1sxXSAmJlxyXG4gICAgICAoZHJhZ2dhYmxlLmVsZW1lbnRzWzFdLmNsYXNzTGlzdC5jb250YWlucyhcImZpZWxkXCIpIHx8XHJcbiAgICAgICAgZHJhZ2dhYmxlLmVsZW1lbnRzWzFdLmNsYXNzTGlzdC5jb250YWlucyhcInBsYWNlaG9sZGVyXCIpKTtcclxuXHJcbiAgICBjb25zdCBvblpvbmUgPVxyXG4gICAgICBkcmFnZ2FibGUuZWxlbWVudHNbMV0gJiYgZHJhZ2dhYmxlLmVsZW1lbnRzWzFdLmNsYXNzTGlzdC5jb250YWlucyhcInpvbmVcIik7XHJcblxyXG4gICAgaWYgKG9uRmllbGQgJiYgIWRvbnRNb3ZlKSB7XHJcbiAgICAgIGNvbnN0IG9uSG9yaXpvbnRhbCA9XHJcbiAgICAgICAgZHJhZ2dhYmxlLmxlZnQgPCBhY3RpdmVBcmVhIHx8XHJcbiAgICAgICAgZHJhZ2dhYmxlLmxlZnQgPiBkcmFnZ2FibGUuZWxlbWVudHNbMV0ub2Zmc2V0V2lkdGggLSBhY3RpdmVBcmVhO1xyXG5cclxuICAgICAgbGV0IGhJZHg7XHJcbiAgICAgIGxldCB2SWR4O1xyXG5cclxuICAgICAgaWYgKGRyYWdnYWJsZS5lbGVtZW50c1sxXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBsYWNlaG9sZGVyXCIpKSByZXR1cm47XHJcblxyXG4gICAgICB2SWR4ID0gY2FsY3VsYXRlVklkeChcclxuICAgICAgICBkcmFnZ2FibGUuZWxlbWVudHMsXHJcbiAgICAgICAgZHJhZ2dhYmxlLnRvcCxcclxuICAgICAgICBvbkhvcml6b250YWxcclxuICAgICAgKTtcclxuICAgICAgaWYgKHZJZHggPT09IG51bGwpIHtcclxuICAgICAgICBpZiAocGxhY2Vob2xkZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgIHJlbW92ZUNlbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob25Ib3Jpem9udGFsKSB7XHJcbiAgICAgICAgaElkeCA9IGNhbGN1bGF0ZUhJZHgoZHJhZ2dhYmxlLmVsZW1lbnRzLCBkcmFnZ2FibGUubGVmdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaElkeCA9IG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghcGxhY2Vob2xkZXIpIHtcclxuICAgICAgICBnZW5lcmF0ZVBsYWNlSG9sZGVyKHZJZHgsIGhJZHgpO1xyXG4gICAgICAgIGFkZE5ld0NlbGwoKTtcclxuXHJcbiAgICAgICAgZG9udE1vdmUgPSB0cnVlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0byk7XHJcbiAgICAgICAgdG8gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGRvbnRNb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgODAwKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkZWxldGVQbGFjZUhvbGRlciA9XHJcbiAgICAgICAgKHZJZHggIT09IHBsYWNlaG9sZGVyLnBvc2l0aW9uWzBdIHx8XHJcbiAgICAgICAgICBoSWR4ICE9PSBwbGFjZWhvbGRlci5wb3NpdGlvblsxXSkgJiZcclxuICAgICAgICAhZHJhZ2dhYmxlLmVsZW1lbnRzWzFdLmdldEF0dHJpYnV0ZShcImRhdGEtcGxhY2Vob2xkZXJcIik7XHJcblxyXG4gICAgICBpZiAocGxhY2Vob2xkZXIgJiYgZGVsZXRlUGxhY2VIb2xkZXIpIHtcclxuICAgICAgICByZW1vdmVDZWxsKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL29uY2UgbW91c2UgbGVmdHMgZnJvbSBmaWVsZCB0aGVuIGRlbGV0ZSBwbGFjZXJob2xkZXJcclxuICAgIGlmICghb25GaWVsZCAmJiBwbGFjZWhvbGRlcikge1xyXG4gICAgICByZW1vdmVDZWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9kcm9wcGluZyBmaXJzdCBlbGVtZW50XHJcbiAgICBpZiAoIW9uRmllbGQgJiYgb25ab25lKSB7XHJcbiAgICAgIGdlbmVyYXRlUGxhY2VIb2xkZXIoMCwgbnVsbCk7XHJcbiAgICAgIGFkZE5ld0NlbGwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uRHJvcChldikge1xyXG4gICAgcmVtb3ZlUGxhY2VIb2xkZXJLZXkoKTtcclxuICAgIHBsYWNlaG9sZGVyID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUhJZHgoZWxlbWVudHMsIGxlZnQpIHtcclxuICAgIGlmIChsZWZ0ID4gZWxlbWVudHNbMV0ub2Zmc2V0V2lkdGggLyAyKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIoZWxlbWVudHNbMV0uaWQpICsgMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBlbGVtZW50c1syXS5jbGFzc0xpc3QuY29udGFpbnMoXCJmaWVsZFwiKVxyXG4gICAgICAgID8gTnVtYmVyKGVsZW1lbnRzWzJdLmlkKVxyXG4gICAgICAgIDogTnVtYmVyKGVsZW1lbnRzWzFdLmlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVZJZHgoZWxlbWVudHMsIHRvcCwgb25Ib3Jpem9udGFsKSB7XHJcbiAgICBjb25zdCBsaW5lRWxlbWVudCA9IGVsZW1lbnRzWzFdLmNsb3Nlc3QoJy5yb3cnKTtcclxuXHJcbiAgICBpZiAob25Ib3Jpem9udGFsKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIobGluZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodG9wID4gbGluZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gYWN0aXZlQXJlYSkge1xyXG4gICAgICByZXR1cm4gTnVtYmVyKGxpbmVFbGVtZW50LmlkKSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRvcCA8IGFjdGl2ZUFyZWEpIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihsaW5lRWxlbWVudC5pZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxuXHJcbiAgb25Nb3VudCgoKSA9PiB7XHJcbiAgICBiaW5kSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBkcmFnZ2FibGUuc2V0RWxlbWVudChpdGVtLCB7XHJcbiAgICAgICAgb25EcmFnU3RhcnQsXHJcbiAgICAgICAgb25EcmFnLFxyXG4gICAgICAgIG9uRHJvcCxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuPC9zY3JpcHQ+XHJcblxyXG48IS0tZHJvcCB6b25lLS0+XHJcbjxkaXYgY2xhc3M9XCJ6b25lXCI+XHJcbiAgeyNlYWNoIGRyb3Bab25lSXRlbXMgYXMgcm93cywgaW5kZXh9XHJcbiAgICA8Um93IHtwbGFjZWhvbGRlcn0gcm93SW5kZXg9e2luZGV4fSB7cm93c30gLz5cclxuICB7L2VhY2h9XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cImRyYWctbGlzdFwiIGlkPVwiZHJhZ0xpc3RcIj5cclxuICB7I2VhY2ggZHJhZ0l0ZW1zIGFzIGl0ZW0sIGluZGV4IChpdGVtLmlkKX1cclxuICAgIDxkaXZcclxuICAgICAgYmluZDp0aGlzPXtiaW5kSXRlbXNbaW5kZXhdfVxyXG4gICAgICBjbGFzcz1cImNlbGxcIlxyXG4gICAgICBkYXRhLWlkPXtpdGVtLmlkfVxyXG4gICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHtpdGVtLmNvbG9yfTtcIlxyXG4gICAgPlxyXG4gICAgICB7aXRlbS50aXRsZX1cclxuICAgIDwvZGl2PlxyXG4gIHsvZWFjaH1cclxuPC9kaXY+XHJcblxyXG48RXhhbXBsZSAvPlxyXG5cclxuPHN0eWxlPlxyXG4gIDpnbG9iYWwoaHRtbCksXHJcbiAgOmdsb2JhbChib2R5KSB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgfVxyXG5cclxuICBAa2V5ZnJhbWVzIHcge1xyXG4gICAgMCUge1xyXG4gICAgICBmbGV4OiAwO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgIGZsZXg6IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAa2V5ZnJhbWVzIGgge1xyXG4gICAgMCUge1xyXG4gICAgICBoZWlnaHQ6IDA7XHJcbiAgICB9XHJcbiAgICAxMDAlIHtcclxuICAgICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgOmdsb2JhbCgucGxhY2Vob2xkZXJ3KSB7XHJcbiAgICBhbmltYXRpb246IHcgMC4ycztcclxuICB9XHJcblxyXG4gIDpnbG9iYWwoLnBsYWNlaG9sZGVyaCkge1xyXG4gICAgYW5pbWF0aW9uOiBoIDAuMnM7XHJcbiAgfVxyXG5cclxuICAuY2VsbCB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgY29sb3I6ICNiYmI7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgfVxyXG5cclxuICAuem9uZSB7XHJcbiAgICBib3JkZXI6ICM5OTkgMXB4IHNvbGlkO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xyXG4gICAgbWluLWhlaWdodDogODBweDtcclxuICB9XHJcblxyXG4gIC5kcmFnLWxpc3Qge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQ7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgfVxyXG5cclxuICA6Z2xvYmFsKC5jbG9uZSkge1xyXG4gICAgd2lkdGg6IDIwMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBvcGFjaXR5OiAwLjY7XHJcbiAgfVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF5REcsS0FFRDs7Ozs7Ozs7OEJBRkMsS0FFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FQRixvQkFRTTtHQVBKLG9CQU1NOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQS9DRyxXQUFXLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7OztTQWFkLE1BQU0sQ0FBQyxFQUFFO0tBQ1osU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVO0VBQ3hGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSzs7O0tBRWhELFNBQVMsSUFBSSxTQUFT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
