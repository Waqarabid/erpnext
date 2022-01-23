frappe.provide("erpnext.vehicles");

erpnext.vehicles.make_vehicle_checklist = function (frm, wrapper) {
	$(wrapper).empty();
	$(`<label class="control-label">Checklist</label>`).appendTo(wrapper);
	var checklist_area = $('<div></div>').appendTo(wrapper);
	return new erpnext.vehicles.VehicleChecklistEditor(frm, checklist_area);
};

erpnext.vehicles.VehicleChecklistEditor = Class.extend({
	init: function(frm, wrapper, read_only) {
		var me = this;
		me.wrapper = $(wrapper);
		me.checklist_wrapper = $(`<div class="row vehicle-checklist"></div>`).appendTo(me.wrapper);
		me.left_container = $(`<div class="col-sm-6"></div>`).appendTo(me.checklist_wrapper);
		me.right_container = $(`<div class="col-sm-6"></div>`).appendTo(me.checklist_wrapper);
		me.buttons_container = $(`<div style="margin-top: 5px;"></div>`).appendTo(me.wrapper);
		me.empty_checklist_container = $(`<div></div>`).appendTo(me.wrapper);

		me.frm = frm;
		me.read_only = cint(read_only);

		me.default_checklist_items = me.frm.doc.__onload && me.frm.doc.__onload.default_vehicle_checklist_items || [];

		var checklist_items = me.get_checklist_items();
		if (checklist_items && checklist_items.length) {
			me.make();
		} else {
			me.load_items_and_make();
		}

		me.bind();
	},

	clear: function () {
		this.left_container.empty();
		this.right_container.empty();
		this.buttons_container.empty();
		this.empty_checklist_container.empty();
	},

	load_items_and_make: function () {
		var me = this;
		frappe.call({
			method: "erpnext.vehicles.vehicle_checklist.get_default_vehicle_checklist_items",
			callback: function (r) {
				if (r.message && !r.exc) {
					me.default_checklist_items = r.message;

					if (me.can_write()) {
						$.each(r.message || [], function (i, item) {
							me.frm.add_child('vehicle_checklist', {
								"checklist_item": item,
								"checklist_item_checked": 0
							});
						});
					}
					me.make();
				}
			}
		});
	},

	make: function() {
		var me = this;
		this.clear();

		var checklist_items = me.get_checklist_items();

		var count = (checklist_items || []).length;
		if (count) {
			$.each(checklist_items || [], function (i, item) {
				if (i < checklist_items.length / 2) {
					me.make_checkbox(item, me.left_container);
				} else {
					me.make_checkbox(item, me.right_container);
				}
			});
		} else {
			$(`<h6 class="text-muted">No Checklist Items</h6>`).appendTo(me.empty_checklist_container);
		}

		me.refresh();

		if (me.can_write()) {
			me.make_buttons();
		}
	},

	make_checkbox: function(item, container) {
		if (!item) {
			return;
		}

		var label = frappe.utils.escape_html(item);
		var data_checklist_item = item.replace('"', '\\"');

		var wrapper = `
			<div class="checkbox" style="margin-top: 8px; margin-bottom: 8px;">
				<label>%(checklist_html)s</label>
			</div>
		`;

		var checklist_html;
		if (this.can_write()) {
			checklist_html = `
				<input type="checkbox" class="vehicle-checklist-check" data-checklist-item="${data_checklist_item}">
				${label}
				<i class="fa fa-times remove-checklist-item" data-checklist-item="${data_checklist_item}" style="margin-left: 3px; display: none;"></i>
			`;
		} else {
			checklist_html = `
				<span class="vehicle-checklist-check" data-checklist-item="${data_checklist_item}">
					${frappe.format(0, {'fieldtype': 'Check'})}
				</span>
				<span>${label}</span>
			`;
		}

		this.empty_checklist_container.empty();
		$(repl(wrapper, {checklist_html: checklist_html})).appendTo(container);
	},

	make_buttons: function () {
		$(`<button type="button" class="btn btn-light btn-sm add-checklist-item">
			${__('Add Checklist Item')}
		</button>`).appendTo(this.buttons_container);
	},

	refresh: function () {
		var me = this;
		me.wrapper.find(".vehicle-checklist-check").prop("checked", false);
		me.wrapper.find(".remove-checklist-item").hide();
		$.each(me.frm.doc.vehicle_checklist || [], function(i, d) {
			if (d.checklist_item) {
				var el = me.wrapper.find(`.vehicle-checklist-check[data-checklist-item='${d.checklist_item.replace("'", "\\'")}']`);
				var remove_el = me.wrapper.find(`.remove-checklist-item[data-checklist-item='${d.checklist_item.replace("'", "\\'")}']`);
				if (me.can_write()) {
					el.prop("checked", !!d.checklist_item_checked);
					if (d.is_custom_checklist_item) {
						remove_el.show();
					}
				} else {
					el.html(frappe.format(d.checklist_item_checked, {'fieldtype': 'Check'}));
				}
			}
		});
	},

	bind: function() {
		var me = this;
		me.checklist_wrapper.on("change", ".vehicle-checklist-check", function() {
			me.on_check(this);
		});

		me.buttons_container.on("click", ".add-checklist-item", function () {
			me.on_add_checklist_item();
		});

		me.checklist_wrapper.on("click", ".remove-checklist-item", function () {
			me.on_remove_checklist_item(this);
		});
	},

	on_check: function (el) {
		var me = this;

		var checklist_item = $(el).attr('data-checklist-item');
		var checked = cint($(el).prop("checked"));

		var found = false;
		$.each(me.frm.doc.vehicle_checklist || [], function(i, d) {
			if (d.checklist_item == checklist_item) {
				d.checklist_item_checked = checked;
				found = true;
			}
		});

		if (!found && checked) {
			me.frm.add_child('vehicle_checklist', {"checklist_item": checklist_item, "checklist_item_checked": checked});
		}

		me.frm.dirty();
	},

	on_add_checklist_item: function () {
		var me = this;
		frappe.prompt('Checklist Item', ({ value }) => {
			var exists = (me.frm.doc.vehicle_checklist || []).filter(d => d.checklist_item == value);
			if (exists.length) {
				frappe.throw(__("<b>{0}</b> Checklist Item already exists", [value]));
			} else {
				me.frm.add_child('vehicle_checklist', {
					"checklist_item": value,
					"checklist_item_checked": 1,
					"is_custom_checklist_item": 1
				});

				me.make();
				me.frm.dirty();
			}
		});
	},

	on_remove_checklist_item: function (el) {
		var me = this;

		var checklist_item = $(el).attr('data-checklist-item');
		if (checklist_item) {
			me.frm.doc.vehicle_checklist = (me.frm.doc.vehicle_checklist || []).filter(d => d.checklist_item != checklist_item);

			$.each(me.frm.doc.vehicle_checklist || [], function (i, d) {
				d.idx = i + 1;
			});

			me.make();
			me.frm.dirty();
		}
	},

	get_checklist_items: function () {
		if (this.frm.doc.vehicle_checklist && this.frm.doc.vehicle_checklist.length) {
			return this.frm.doc.vehicle_checklist.map(d => d.checklist_item);
		} else if (this.default_checklist_items && this.default_checklist_items.length) {
			return this.default_checklist_items;
		} else {
			return null;
		}
	},

	can_write: function () {
		return !this.read_only && this.frm.doc.docstatus == 0 && frappe.model.can_write(this.frm.doc.doctype);
	},
});
