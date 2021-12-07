import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as onMount, J as createEventDispatcher, f as element, g as text, A as space, h as claim_element, j as children, k as claim_text, l as detach_dev, B as claim_space, q as attr_dev, r as add_location, p as set_style, u as insert_hydration_dev, w as append_hydration_dev, K as set_data_dev, n as noop, x as binding_callbacks } from './client.245115e6.js';
import { D as Draggable } from './Draggable.326cf938.js';

/* src\routes\Cell.svelte generated by Svelte v3.44.1 */
const file = "src\\routes\\Cell.svelte";

function create_fragment(ctx) {
	let div1;
	let div0;
	let t0;
	let t1;
	let t2_value = /*row*/ ctx[0].title + "";
	let t2;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t0 = text("[=]");
			t1 = space();
			t2 = text(t2_value);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true, style: true, id: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			t0 = claim_text(div0_nodes, "[=]");
			div0_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			t2 = claim_text(div1_nodes, t2_value);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "handle svelte-zdstf8");
			add_location(div0, file, 76, 2, 1623);
			attr_dev(div1, "class", "cell field svelte-zdstf8");
			set_style(div1, "background-color", /*row*/ ctx[0].color);
			attr_dev(div1, "id", /*id*/ ctx[1]);
			add_location(div1, file, 70, 0, 1516);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div1, anchor);
			append_hydration_dev(div1, div0);
			append_hydration_dev(div0, t0);
			/*div0_binding*/ ctx[4](div0);
			append_hydration_dev(div1, t1);
			append_hydration_dev(div1, t2);
			/*div1_binding*/ ctx[5](div1);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*row*/ 1 && t2_value !== (t2_value = /*row*/ ctx[0].title + "")) set_data_dev(t2, t2_value);

			if (dirty & /*row*/ 1) {
				set_style(div1, "background-color", /*row*/ ctx[0].color);
			}

			if (dirty & /*id*/ 2) {
				attr_dev(div1, "id", /*id*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			/*div0_binding*/ ctx[4](null);
			/*div1_binding*/ ctx[5](null);
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

function onDrag(ev) {
	
}

function onDrop() {
	
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Cell', slots, []);
	let { row } = $$props;
	let { id } = $$props;
	const draggable = new Draggable();
	draggable.closest = '.field';
	let cells = [];
	let handle;

	function onDragStart(ev) {
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
		cells.forEach(item => {
			draggable.setElement(item, { onDragStart, onDrag, onDrop }, handle);
		});
	});

	const writable_props = ['row', 'id'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cell> was created with unknown prop '${key}'`);
	});

	function div0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			handle = $$value;
			$$invalidate(3, handle);
		});
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			cells[id] = $$value;
			$$invalidate(2, cells);
			$$invalidate(1, id);
		});
	}

	$$self.$$set = $$props => {
		if ('row' in $$props) $$invalidate(0, row = $$props.row);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
	};

	$$self.$capture_state = () => ({
		onMount,
		createEventDispatcher,
		Draggable,
		row,
		id,
		draggable,
		cells,
		handle,
		onDragStart,
		onDrag,
		onDrop
	});

	$$self.$inject_state = $$props => {
		if ('row' in $$props) $$invalidate(0, row = $$props.row);
		if ('id' in $$props) $$invalidate(1, id = $$props.id);
		if ('cells' in $$props) $$invalidate(2, cells = $$props.cells);
		if ('handle' in $$props) $$invalidate(3, handle = $$props.handle);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [row, id, cells, handle, div0_binding, div1_binding];
}

class Cell extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { row: 0, id: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Cell",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*row*/ ctx[0] === undefined && !('row' in props)) {
			console.warn("<Cell> was created without expected prop 'row'");
		}

		if (/*id*/ ctx[1] === undefined && !('id' in props)) {
			console.warn("<Cell> was created without expected prop 'id'");
		}
	}

	get row() {
		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set row(value) {
		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { Cell as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2VsbC44NDBhYThiZi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9DZWxsLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxyXG4gIGltcG9ydCB7IG9uTW91bnQsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XHJcbiAgaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi9EcmFnZ2FibGUuanMnO1xyXG5cclxuICBleHBvcnQgbGV0IHJvdztcclxuICBleHBvcnQgbGV0IGlkO1xyXG5cclxuICBjb25zdCBkcmFnZ2FibGUgPSBuZXcgRHJhZ2dhYmxlKCk7XHJcbiAgZHJhZ2dhYmxlLmNsb3Nlc3QgPSAnLmZpZWxkJztcclxuXHJcbiAgbGV0IGNlbGxzID0gW107XHJcbiAgbGV0IGhhbmRsZTtcclxuXHJcbiAgZnVuY3Rpb24gb25EcmFnU3RhcnQoZXYpIHtcclxuICAgIGlmIChkcmFnZ2FibGUuZHJhZ0RhdGEgJiYgZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lICYmICFkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUucGFyZW50Tm9kZSkge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZHJhZ2dhYmxlICYmIGRyYWdnYWJsZS5kcmFnRGF0YSAmJiBkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUpIHtcclxuICAgICAgZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lLnN0eWxlLmxlZnQgPVxyXG4gICAgICAgIGV2LmNsaWVudFggLSBkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUub2Zmc2V0V2lkdGggLyA4ICsgXCJweFwiO1xyXG4gICAgICBkcmFnZ2FibGUuZHJhZ0RhdGEuY2xvbmUuc3R5bGUudG9wID1cclxuICAgICAgICBldi5jbGllbnRZIC0gZHJhZ2dhYmxlLmRyYWdEYXRhLmNsb25lLm9mZnNldEhlaWdodCAvIDQgKyBcInB4XCI7XHJcbiAgICAgIGRyYWdnYWJsZS5kcmFnRGF0YS5jbG9uZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ29yYW5nZSdcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkRyYWcoZXYpIHtcclxuXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkRyb3AoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgb25Nb3VudCgoKSA9PiB7XHJcbiAgICBjZWxscy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGRyYWdnYWJsZS5zZXRFbGVtZW50KGl0ZW0sIHtcclxuICAgICAgICBvbkRyYWdTdGFydCxcclxuICAgICAgICBvbkRyYWcsXHJcbiAgICAgICAgb25Ecm9wXHJcbiAgICAgIH0sIGhhbmRsZSlcclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZT5cclxuICAgIC5jZWxsIHtcclxuICAgICAgICBmbGV4OiAxO1xyXG4gICAgICAgIGNvbG9yOiAjYmJiO1xyXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICAuY2VsbDpub3QoOmZpcnN0LW9mLXR5cGUpLFxyXG4gICAgLmNlbGw6Zmlyc3Qtb2YtdHlwZSB7XHJcbiAgICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLmhhbmRsZSB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGxlZnQ6IDRweDtcclxuICAgICAgICBjdXJzb3I6IGdyYWI7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgfVxyXG48L3N0eWxlPlxyXG5cclxuPGRpdlxyXG4gIGNsYXNzPVwiY2VsbCBmaWVsZFwiXHJcbiAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB7cm93LmNvbG9yfVwiXHJcbiAge2lkfVxyXG4gIGJpbmQ6dGhpcz17Y2VsbHNbaWRdfVxyXG4+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJoYW5kbGVcIlxyXG4gICAgYmluZDp0aGlzPXtoYW5kbGV9XHJcbiAgPlxyXG4gICAgWz1dXHJcbiAgPC9kaXY+XHJcbiAge3Jvdy50aXRsZX1cclxuPC9kaXY+XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozt3QkFrRkcsR0FBRyxJQUFDLEtBQUs7Ozs7Ozs7YUFIVCxLQUVEOzs7Ozs7Ozs7OytCQUZDLEtBRUQ7Ozs7Ozs7Ozs7OytDQVQwQixHQUFHLElBQUMsS0FBSzs7Ozs7R0FGckMsb0JBYU07R0FQSixvQkFLTTs7Ozs7Ozs7NkRBQ0wsR0FBRyxJQUFDLEtBQUs7OztnREFWZ0IsR0FBRyxJQUFDLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQTdDMUIsTUFBTSxDQUFDLEVBQUU7Ozs7U0FJVCxNQUFNOzs7Ozs7O09BM0JKLEdBQUc7T0FDSCxFQUFFO09BRVAsU0FBUyxPQUFPLFNBQVM7Q0FDL0IsU0FBUyxDQUFDLE9BQU8sR0FBRyxRQUFRO0tBRXhCLEtBQUs7S0FDTCxNQUFNOztVQUVELFdBQVcsQ0FBQyxFQUFFO01BQ2pCLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVTtHQUN4RixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUs7OztNQUVoRCxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUs7R0FDN0QsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FDakMsRUFBRSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUk7R0FDOUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FDaEMsRUFBRSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUk7R0FDL0QsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFROzs7O0NBYXhELE9BQU87RUFDTCxLQUFLLENBQUMsT0FBTyxDQUFFLElBQUk7R0FDakIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQ3ZCLFdBQVcsRUFDWCxNQUFNLEVBQ04sTUFBTSxJQUNMLE1BQU07Ozs7Ozs7Ozs7OztHQXFDQSxNQUFNOzs7Ozs7O0dBSlIsS0FBSyxDQUFDLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
