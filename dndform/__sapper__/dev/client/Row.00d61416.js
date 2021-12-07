import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, y as validate_each_argument, v as validate_slots, H as empty, u as insert_hydration_dev, b as transition_out, C as check_outros, t as transition_in, l as detach_dev, f as element, h as claim_element, j as children, q as attr_dev, I as toggle_class, r as add_location, E as destroy_each, F as group_outros, c as create_component, a as claim_component, m as mount_component, e as destroy_component } from './client.cd852c33.js';
import Cell from './Cell.9c825791.js';
import Placeholder from './Placeholder.58fc1c90.js';
import './Draggable.7a0aea55.js';

/* src\routes\Row.svelte generated by Svelte v3.44.1 */
const file = "src\\routes\\Row.svelte";

function get_each_context(ctx, list, i) {
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
				id: /*index*/ ctx[7]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(cell.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(cell.$$.fragment, nodes);
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
		l: function claim(nodes) {
			claim_component(placeholder_1.$$.fragment, nodes);
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
function create_each_block(ctx) {
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
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
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
		id: create_each_block.name,
		type: "each",
		source: "(44:2) {#each rows as row, index}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let current;
	let each_value = /*rows*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
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

			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, id: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "row svelte-q9irty");
			attr_dev(div, "id", /*rowIndex*/ ctx[2]);
			toggle_class(div, "placeholderh", /*shouldInsertFullRowPlaceholder*/ ctx[3]);
			add_location(div, file, 38, 0, 738);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);

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
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
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
				attr_dev(div, "id", /*rowIndex*/ ctx[2]);
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
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
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
		init(this, options, instance, create_fragment, safe_not_equal, { rows: 0, placeholder: 1, rowIndex: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Row",
			options,
			id: create_fragment.name
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

export { Row as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm93LjAwZDYxNDE2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL1Jvdy5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cclxuICBpbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwuc3ZlbHRlJztcclxuICBpbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSAnLi9QbGFjZWhvbGRlci5zdmVsdGUnO1xyXG5cclxuICBleHBvcnQgbGV0IHJvd3M7XHJcbiAgZXhwb3J0IGxldCBwbGFjZWhvbGRlcjtcclxuICBleHBvcnQgbGV0IHJvd0luZGV4O1xyXG5cclxuICBsZXQgaWQ7XHJcblxyXG4gIGZ1bmN0aW9uIHNob3VsZEluc2VydEZ1bGxSb3dQbGFjZWhvbGRlcigpIHtcclxuICAgIHJldHVybiBwbGFjZWhvbGRlciAmJiBcclxuICAgICAgcGxhY2Vob2xkZXIucG9zaXRpb25bMF0gPT09IGluZGV4SiAmJiBcclxuICAgICAgcGxhY2Vob2xkZXIucG9zaXRpb25bMV0gPT09IG51bGw7XHJcbiAgfVxyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcbiAgICAucm93IHtcclxuICAgICAgICBmb250LXNpemU6IDE5cHg7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgICAgIGZsZXg6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgOmdsb2JhbCgucm93Om5vdCg6Zmlyc3Qtb2YtdHlwZSkgPiAuY2VsbCksXHJcbiAgICA6Z2xvYmFsKC5yb3c6Zmlyc3Qtb2YtdHlwZSA+IC5jZWxsKSB7XHJcbiAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICA6Z2xvYmFsKC5yb3c6bGFzdC1vZi10eXBlID4gLmNlbGwpIHtcclxuICAgICAgICBib3JkZXItYm90dG9tOiBub25lO1xyXG4gICAgfVxyXG5cclxuPC9zdHlsZT5cclxuXHJcbjxkaXZcclxuICBjbGFzcz1cInJvd1wiXHJcbiAgY2xhc3M6cGxhY2Vob2xkZXJoPXtzaG91bGRJbnNlcnRGdWxsUm93UGxhY2Vob2xkZXJ9XHJcbiAgaWQ9e3Jvd0luZGV4fVxyXG4+XHJcbiAgeyNlYWNoIHJvd3MgYXMgcm93LCBpbmRleH1cclxuICAgIHsjaWYgcm93LnBsYWNlaG9sZGVyfVxyXG4gICAgICA8UGxhY2Vob2xkZXJcclxuICAgICAgICB7cGxhY2Vob2xkZXJ9XHJcbiAgICAgIC8+XHJcbiAgICB7OmVsc2V9XHJcbiAgICAgIDxDZWxsXHJcbiAgICAgICAge3Jvd31cclxuICAgICAgICBpZD17aW5kZXh9XHJcbiAgICAgIC8+XHJcbiAgICB7L2lmfVxyXG4gIHsvZWFjaH1cclxuPC9kaXY+XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFtRFksR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0FQUixHQUFHLElBQUMsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBRGYsR0FBSTs7OztnQ0FBVCxNQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQUZGLEdBQVE7d0VBRFEsR0FBOEI7Ozs7R0FGcEQsb0JBaUJNOzs7Ozs7Ozs7OzBCQVpHLEdBQUk7Ozs7K0JBQVQsTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFBSixNQUFJOzs7Ozs7OztxQ0FGRixHQUFROzs7Ozs7a0NBRVYsTUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F2Q0ssSUFBSTtPQUNKLFdBQVc7T0FDWCxRQUFRO0tBRWYsRUFBRTs7VUFFRyw4QkFBOEI7U0FDOUIsV0FBVyxJQUNoQixXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxNQUFNLElBQ2xDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
