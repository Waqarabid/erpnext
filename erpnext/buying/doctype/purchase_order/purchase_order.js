// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.provide("erpnext.buying");
frappe.provide("erpnext.accounts.dimensions");
<<<<<<< HEAD
{% include 'erpnext/public/js/controllers/buying.js' %};
=======

cur_frm.cscript.tax_table = "Purchase Taxes and Charges";

erpnext.accounts.taxes.setup_tax_filters("Purchase Taxes and Charges");
erpnext.accounts.taxes.setup_tax_validations("Purchase Order");
erpnext.buying.setup_buying_controller();
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

frappe.ui.form.on("Purchase Order", {
	setup: function (frm) {
		frm.ignore_doctypes_on_cancel_all = ["Unreconcile Payment", "Unreconcile Payment Entries"];
		if (frm.doc.is_old_subcontracting_flow) {
<<<<<<< HEAD
			frm.set_query("reserve_warehouse", "supplied_items", function() {
				return {
					filters: {
						"company": frm.doc.company,
						"name": ['!=', frm.doc.supplier_warehouse],
						"is_group": 0
					}
				}
			});
		}

		frm.set_indicator_formatter('item_code',
			function(doc) { return (doc.qty<=doc.received_qty) ? "green" : "orange" })

		frm.set_query("expense_account", "items", function() {
			return {
				query: "erpnext.controllers.queries.get_expense_account",
				filters: {'company': frm.doc.company}
			}
		});

		frm.set_query("fg_item", "items", function() {
			return {
				filters: {
					'is_stock_item': 1,
					'is_sub_contracted_item': 1,
					'default_bom': ['!=', '']
				}
			}
		});
	},

	company: function(frm) {
		erpnext.accounts.dimensions.update_dimension(frm, frm.doctype);
	},

	refresh: function(frm) {
		if(frm.doc.is_old_subcontracting_flow) {
			frm.trigger('get_materials_from_supplier');

			$('a.grey-link').each(function () {
				var id = $(this).children(':first-child').attr('data-label');
				if (id == 'Duplicate') {
=======
			frm.set_query("reserve_warehouse", "supplied_items", function () {
				return {
					filters: {
						company: frm.doc.company,
						name: ["!=", frm.doc.supplier_warehouse],
						is_group: 0,
					},
				};
			});
		}

		frm.set_indicator_formatter("item_code", function (doc) {
			return doc.qty <= doc.received_qty ? "green" : "orange";
		});

		frm.set_query("expense_account", "items", function () {
			return {
				query: "erpnext.controllers.queries.get_expense_account",
				filters: { company: frm.doc.company },
			};
		});

		frm.set_query("fg_item", "items", function () {
			return {
				filters: {
					is_stock_item: 1,
					is_sub_contracted_item: 1,
					default_bom: ["!=", ""],
				},
			};
		});
	},

	company: function (frm) {
		erpnext.accounts.dimensions.update_dimension(frm, frm.doctype);
	},

	refresh: function (frm) {
		if (frm.doc.is_old_subcontracting_flow) {
			frm.trigger("get_materials_from_supplier");

			$("a.grey-link").each(function () {
				var id = $(this).children(":first-child").attr("data-label");
				if (id == "Duplicate") {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
					$(this).remove();
					return false;
				}
			});
		}
	},

<<<<<<< HEAD
	get_materials_from_supplier: function(frm) {
		let po_details = [];

		if (frm.doc.supplied_items && (frm.doc.per_received == 100 || frm.doc.status === 'Closed')) {
			frm.doc.supplied_items.forEach(d => {
				if (d.total_supplied_qty && d.total_supplied_qty != d.consumed_qty) {
					po_details.push(d.name)
=======
	supplier: function (frm) {
		// Do not update if inter company reference is there as the details will already be updated
		if (frm.updating_party_details || frm.doc.inter_company_invoice_reference) return;

		if (frm.doc.__onload && frm.doc.__onload.load_after_mapping) return;

		erpnext.utils.get_party_details(
			frm,
			"erpnext.accounts.party.get_party_details",
			{
				posting_date: frm.doc.transaction_date,
				bill_date: frm.doc.bill_date,
				party: frm.doc.supplier,
				party_type: "Supplier",
				account: frm.doc.credit_to,
				price_list: frm.doc.buying_price_list,
				fetch_payment_terms_template: cint(!frm.doc.ignore_default_payment_terms_template),
			},
			function () {
				frm.set_df_property("apply_tds", "read_only", frm.supplier_tds ? 0 : 1);
				frm.set_df_property("tax_withholding_category", "hidden", frm.supplier_tds ? 0 : 1);
			}
		);
	},

	get_materials_from_supplier: function (frm) {
		let po_details = [];

		if (frm.doc.supplied_items && (flt(frm.doc.per_received) == 100 || frm.doc.status === "Closed")) {
			frm.doc.supplied_items.forEach((d) => {
				if (d.total_supplied_qty && d.total_supplied_qty != d.consumed_qty) {
					po_details.push(d.name);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				}
			});
		}

		if (po_details && po_details.length) {
<<<<<<< HEAD
			frm.add_custom_button(__('Return of Components'), () => {
				frm.call({
					method: 'erpnext.controllers.subcontracting_controller.get_materials_from_supplier',
					freeze: true,
					freeze_message: __('Creating Stock Entry'),
					args: {
						subcontract_order: frm.doc.name,
						rm_details: po_details,
						order_doctype: cur_frm.doc.doctype
					},
					callback: function(r) {
						if (r && r.message) {
							const doc = frappe.model.sync(r.message);
							frappe.set_route("Form", doc[0].doctype, doc[0].name);
						}
					}
				});
			}, __('Create'));
		}
	},

	onload: function(frm) {
		set_schedule_date(frm);
		if (!frm.doc.transaction_date){
			frm.set_value('transaction_date', frappe.datetime.get_today())
		}

		erpnext.queries.setup_queries(frm, "Warehouse", function() {
=======
			frm.add_custom_button(
				__("Return of Components"),
				() => {
					frm.call({
						method: "erpnext.controllers.subcontracting_controller.get_materials_from_supplier",
						freeze: true,
						freeze_message: __("Creating Stock Entry"),
						args: {
							subcontract_order: frm.doc.name,
							rm_details: po_details,
							order_doctype: frm.doc.doctype,
						},
						callback: function (r) {
							if (r && r.message) {
								const doc = frappe.model.sync(r.message);
								frappe.set_route("Form", doc[0].doctype, doc[0].name);
							}
						},
					});
				},
				__("Create")
			);
		}
	},

	onload: function (frm) {
		set_schedule_date(frm);
		if (!frm.doc.transaction_date) {
			frm.set_value("transaction_date", frappe.datetime.get_today());
		}

		if (frm.doc.__onload && frm.doc.supplier) {
			if (frm.is_new()) {
				frm.doc.apply_tds = frm.doc.__onload.supplier_tds ? 1 : 0;
			}
			if (!frm.doc.__onload.supplier_tds) {
				frm.set_df_property("apply_tds", "read_only", 1);
			}
		}

		erpnext.queries.setup_queries(frm, "Warehouse", function () {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			return erpnext.queries.warehouse(frm.doc);
		});

		// On cancel and amending a purchase order with advance payment, reset advance paid amount
		if (frm.is_new()) {
<<<<<<< HEAD
			frm.set_value("advance_paid", 0)
		}
	},

	apply_tds: function(frm) {
		if (!frm.doc.apply_tds) {
			frm.set_value("tax_withholding_category", '');
=======
			frm.set_value("advance_paid", 0);
		}
	},

	apply_tds: function (frm) {
		if (!frm.doc.apply_tds) {
			frm.set_value("tax_withholding_category", "");
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		} else {
			frm.set_value("tax_withholding_category", frm.supplier_tds);
		}
	},
<<<<<<< HEAD
});

frappe.ui.form.on("Purchase Order Item", {
	schedule_date: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		if (row.schedule_date) {
			if(!frm.doc.schedule_date) {
=======

	get_subcontracting_boms_for_finished_goods: function (fg_item) {
		return frappe.call({
			method: "erpnext.subcontracting.doctype.subcontracting_bom.subcontracting_bom.get_subcontracting_boms_for_finished_goods",
			args: {
				fg_items: fg_item,
			},
		});
	},

	get_subcontracting_boms_for_service_item: function (service_item) {
		return frappe.call({
			method: "erpnext.subcontracting.doctype.subcontracting_bom.subcontracting_bom.get_subcontracting_boms_for_service_item",
			args: {
				service_item: service_item,
			},
		});
	},
});

frappe.ui.form.on("Purchase Order Item", {
	schedule_date: function (frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		if (row.schedule_date) {
			if (!frm.doc.schedule_date) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				erpnext.utils.copy_value_in_all_rows(frm.doc, cdt, cdn, "items", "schedule_date");
			} else {
				set_schedule_date(frm);
			}
		}
	},

<<<<<<< HEAD
	qty: function(frm, cdt, cdn) {
		if (frm.doc.is_subcontracted && !frm.doc.is_old_subcontracting_flow) {
			var row = locals[cdt][cdn];

			if (row.qty) {
				row.fg_item_qty = row.qty;
			}
		}
	}
});

erpnext.buying.PurchaseOrderController = class PurchaseOrderController extends erpnext.buying.BuyingController {
	setup() {
		this.frm.custom_make_buttons = {
			'Purchase Receipt': 'Purchase Receipt',
			'Purchase Invoice': 'Purchase Invoice',
			'Payment Entry': 'Payment',
			'Subcontracting Order': 'Subcontracting Order',
			'Stock Entry': 'Material to Supplier'
		}
=======
	item_code: async function (frm, cdt, cdn) {
		if (frm.doc.is_subcontracted && !frm.doc.is_old_subcontracting_flow) {
			var row = locals[cdt][cdn];

			if (row.item_code && !row.fg_item) {
				var result = await frm.events.get_subcontracting_boms_for_service_item(row.item_code);

				if (result.message && Object.keys(result.message).length) {
					var finished_goods = Object.keys(result.message);

					// Set FG if only one active Subcontracting BOM is found
					if (finished_goods.length === 1) {
						row.fg_item = result.message[finished_goods[0]].finished_good;
						row.uom = result.message[finished_goods[0]].finished_good_uom;
						refresh_field("items");
					} else {
						const dialog = new frappe.ui.Dialog({
							title: __("Select Finished Good"),
							size: "small",
							fields: [
								{
									fieldname: "finished_good",
									fieldtype: "Autocomplete",
									label: __("Finished Good"),
									options: finished_goods,
								},
							],
							primary_action_label: __("Select"),
							primary_action: () => {
								var subcontracting_bom = result.message[dialog.get_value("finished_good")];

								if (subcontracting_bom) {
									row.fg_item = subcontracting_bom.finished_good;
									row.uom = subcontracting_bom.finished_good_uom;
									refresh_field("items");
								}

								dialog.hide();
							},
						});

						dialog.show();
					}
				}
			}
		}
	},

	fg_item: async function (frm, cdt, cdn) {
		if (frm.doc.is_subcontracted && !frm.doc.is_old_subcontracting_flow) {
			var row = locals[cdt][cdn];

			if (row.fg_item) {
				var result = await frm.events.get_subcontracting_boms_for_finished_goods(row.fg_item);

				if (result.message && Object.keys(result.message).length) {
					frappe.model.set_value(cdt, cdn, "item_code", result.message.service_item);
					frappe.model.set_value(
						cdt,
						cdn,
						"qty",
						flt(row.fg_item_qty) * flt(result.message.conversion_factor)
					);
					frappe.model.set_value(cdt, cdn, "uom", result.message.service_item_uom);
				}
			}
		}
	},

	qty: async function (frm, cdt, cdn) {
		if (frm.doc.is_subcontracted && !frm.doc.is_old_subcontracting_flow) {
			var row = locals[cdt][cdn];

			if (row.fg_item) {
				var result = await frm.events.get_subcontracting_boms_for_finished_goods(row.fg_item);

				if (
					result.message &&
					row.item_code == result.message.service_item &&
					row.uom == result.message.service_item_uom
				) {
					frappe.model.set_value(
						cdt,
						cdn,
						"fg_item_qty",
						flt(row.qty) / flt(result.message.conversion_factor)
					);
				}
			}
		}
	},
});

erpnext.buying.PurchaseOrderController = class PurchaseOrderController extends (
	erpnext.buying.BuyingController
) {
	setup() {
		this.frm.custom_make_buttons = {
			"Purchase Receipt": "Purchase Receipt",
			"Purchase Invoice": "Purchase Invoice",
			"Payment Entry": "Payment",
			"Subcontracting Order": "Subcontracting Order",
			"Stock Entry": "Material to Supplier",
		};
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

		super.setup();
	}

	refresh(doc, cdt, cdn) {
		var me = this;
		super.refresh();
		var allow_receipt = false;
		var is_drop_ship = false;

<<<<<<< HEAD
		for (var i in cur_frm.doc.items) {
			var item = cur_frm.doc.items[i];
			if(item.delivered_by_supplier !== 1) {
=======
		for (var i in this.frm.doc.items) {
			var item = this.frm.doc.items[i];
			if (item.delivered_by_supplier !== 1) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				allow_receipt = true;
			} else {
				is_drop_ship = true;
			}

<<<<<<< HEAD
			if(is_drop_ship && allow_receipt) {
=======
			if (is_drop_ship && allow_receipt) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				break;
			}
		}

		this.frm.set_df_property("drop_ship", "hidden", !is_drop_ship);

<<<<<<< HEAD
		if(doc.docstatus == 1) {
			this.frm.fields_dict.items_section.wrapper.addClass("hide-border");
			if(!this.frm.doc.set_warehouse) {
				this.frm.fields_dict.items_section.wrapper.removeClass("hide-border");
			}

			if(!["Closed", "Delivered"].includes(doc.status)) {
				if(this.frm.doc.status !== 'Closed' && flt(this.frm.doc.per_received) < 100 && flt(this.frm.doc.per_billed) < 100) {
					// Don't add Update Items button if the PO is following the new subcontracting flow.
					if (!(this.frm.doc.is_subcontracted && !this.frm.doc.is_old_subcontracting_flow)) {
						this.frm.add_custom_button(__('Update Items'), () => {
=======
		if (doc.docstatus == 1) {
			this.frm.fields_dict.items_section.wrapper.addClass("hide-border");
			if (!this.frm.doc.set_warehouse) {
				this.frm.fields_dict.items_section.wrapper.removeClass("hide-border");
			}

			if (!["Closed", "Delivered"].includes(doc.status)) {
				if (
					this.frm.doc.status !== "Closed" &&
					flt(this.frm.doc.per_received) < 100 &&
					flt(this.frm.doc.per_billed) < 100
				) {
					if (!this.frm.doc.__onload || this.frm.doc.__onload.can_update_items) {
						this.frm.add_custom_button(__("Update Items"), () => {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
							erpnext.utils.update_child_items({
								frm: this.frm,
								child_docname: "items",
								child_doctype: "Purchase Order Detail",
								cannot_add_row: false,
<<<<<<< HEAD
							})
=======
							});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
						});
					}
				}
				if (this.frm.has_perm("submit")) {
<<<<<<< HEAD
					if(flt(doc.per_billed, 6) < 100 || flt(doc.per_received, 6) < 100) {
						if (doc.status != "On Hold") {
							this.frm.add_custom_button(__('Hold'), () => this.hold_purchase_order(), __("Status"));
						} else{
							this.frm.add_custom_button(__('Resume'), () => this.unhold_purchase_order(), __("Status"));
						}
						this.frm.add_custom_button(__('Close'), () => this.close_purchase_order(), __("Status"));
					}
				}

				if(is_drop_ship && doc.status!="Delivered") {
					this.frm.add_custom_button(__('Delivered'),
						this.delivered_by_supplier, __("Status"));

					this.frm.page.set_inner_btn_group_as_primary(__("Status"));
				}
			} else if(["Closed", "Delivered"].includes(doc.status)) {
				if (this.frm.has_perm("submit")) {
					this.frm.add_custom_button(__('Re-open'), () => this.unclose_purchase_order(), __("Status"));
				}
			}
			if(doc.status != "Closed") {
				if (doc.status != "On Hold") {
					if(flt(doc.per_received) < 100 && allow_receipt) {
						cur_frm.add_custom_button(__('Purchase Receipt'), this.make_purchase_receipt, __('Create'));
						if (doc.is_subcontracted) {
							if (doc.is_old_subcontracting_flow) {
								if (me.has_unsupplied_items()) {
									cur_frm.add_custom_button(__('Material to Supplier'), function() { me.make_stock_entry(); }, __("Transfer"));
								}
							}
							else {
								cur_frm.add_custom_button(__('Subcontracting Order'), this.make_subcontracting_order, __('Create'));
							}
						}
					}
					if(flt(doc.per_billed) < 100)
						cur_frm.add_custom_button(__('Purchase Invoice'),
							this.make_purchase_invoice, __('Create'));

					if(flt(doc.per_billed) < 100 && doc.status != "Delivered") {
						this.frm.add_custom_button(
							__('Payment'),
							() => this.make_payment_entry(),
							__('Create')
						);
					}

					if(flt(doc.per_billed) < 100) {
						this.frm.add_custom_button(__('Payment Request'),
							function() { me.make_payment_request() }, __('Create'));
					}

					if(!doc.auto_repeat) {
						cur_frm.add_custom_button(__('Subscription'), function() {
							erpnext.utils.make_subscription(doc.doctype, doc.name)
						}, __('Create'))
=======
					if (flt(doc.per_billed) < 100 || flt(doc.per_received) < 100) {
						if (doc.status != "On Hold") {
							this.frm.add_custom_button(
								__("Hold"),
								() => this.hold_purchase_order(),
								__("Status")
							);
						} else {
							this.frm.add_custom_button(
								__("Resume"),
								() => this.unhold_purchase_order(),
								__("Status")
							);
						}
						this.frm.add_custom_button(
							__("Close"),
							() => this.close_purchase_order(),
							__("Status")
						);
					}
				}

				if (is_drop_ship && doc.status != "Delivered") {
					this.frm.add_custom_button(__("Delivered"), this.delivered_by_supplier, __("Status"));

					this.frm.page.set_inner_btn_group_as_primary(__("Status"));
				}
			} else if (["Closed", "Delivered"].includes(doc.status)) {
				if (this.frm.has_perm("submit")) {
					this.frm.add_custom_button(
						__("Re-open"),
						() => this.unclose_purchase_order(),
						__("Status")
					);
				}
			}
			if (doc.status != "Closed") {
				if (doc.status != "On Hold") {
					if (flt(doc.per_received) < 100 && allow_receipt) {
						this.frm.add_custom_button(
							__("Purchase Receipt"),
							() => {
								me.make_purchase_receipt();
							},
							__("Create")
						);
						if (doc.is_subcontracted) {
							if (doc.is_old_subcontracting_flow) {
								if (me.has_unsupplied_items()) {
									this.frm.add_custom_button(
										__("Material to Supplier"),
										function () {
											me.make_stock_entry();
										},
										__("Transfer")
									);
								}
							} else {
								this.frm.add_custom_button(
									__("Subcontracting Order"),
									() => {
										me.make_subcontracting_order();
									},
									__("Create")
								);
							}
						}
					}
					// Please do not add precision in the below flt function
					if (flt(doc.per_billed) < 100)
						this.frm.add_custom_button(
							__("Purchase Invoice"),
							() => {
								me.make_purchase_invoice();
							},
							__("Create")
						);

					if (flt(doc.per_billed) < 100 && doc.status != "Delivered") {
						this.frm.add_custom_button(
							__("Payment"),
							() => this.make_payment_entry(),
							__("Create")
						);
					}

					if (flt(doc.per_billed) < 100) {
						this.frm.add_custom_button(
							__("Payment Request"),
							function () {
								me.make_payment_request();
							},
							__("Create")
						);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
					}

					if (doc.docstatus === 1 && !doc.inter_company_order_reference) {
						let me = this;
						let internal = me.frm.doc.is_internal_supplier;
						if (internal) {
<<<<<<< HEAD
							let button_label = (me.frm.doc.company === me.frm.doc.represents_company) ? "Internal Sales Order" :
								"Inter Company Sales Order";

							me.frm.add_custom_button(button_label, function() {
								me.make_inter_company_order(me.frm);
							}, __('Create'));
						}

					}
				}

				cur_frm.page.set_inner_btn_group_as_primary(__('Create'));
			}
		} else if(doc.docstatus===0) {
			cur_frm.cscript.add_from_mappers();
=======
							let button_label =
								me.frm.doc.company === me.frm.doc.represents_company
									? "Internal Sales Order"
									: "Inter Company Sales Order";

							me.frm.add_custom_button(
								button_label,
								function () {
									me.make_inter_company_order(me.frm);
								},
								__("Create")
							);
						}
					}
				}

				this.frm.page.set_inner_btn_group_as_primary(__("Create"));
			}
		} else if (doc.docstatus === 0) {
			this.frm.cscript.add_from_mappers();
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		}
	}

	get_items_from_open_material_requests() {
		erpnext.utils.map_current_doc({
			method: "erpnext.stock.doctype.material_request.material_request.make_purchase_order_based_on_supplier",
			args: {
<<<<<<< HEAD
				supplier: this.frm.doc.supplier
=======
				supplier: this.frm.doc.supplier,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			},
			source_doctype: "Material Request",
			source_name: this.frm.doc.supplier,
			target: this.frm,
			setters: {
<<<<<<< HEAD
				company: this.frm.doc.company
			},
			get_query_filters: {
				docstatus: ["!=", 2],
				supplier: this.frm.doc.supplier
			},
			get_query_method: "erpnext.stock.doctype.material_request.material_request.get_material_requests_based_on_supplier"
=======
				company: this.frm.doc.company,
			},
			get_query_filters: {
				docstatus: ["!=", 2],
				supplier: this.frm.doc.supplier,
			},
			get_query_method:
				"erpnext.stock.doctype.material_request.material_request.get_material_requests_based_on_supplier",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		});
	}

	validate() {
		set_schedule_date(this.frm);
	}

	has_unsupplied_items() {
<<<<<<< HEAD
		return this.frm.doc['supplied_items'].some(item => item.required_qty > item.supplied_qty);
=======
		return this.frm.doc["supplied_items"].some((item) => item.required_qty > item.supplied_qty);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}

	make_stock_entry() {
		frappe.call({
<<<<<<< HEAD
			method:"erpnext.controllers.subcontracting_controller.make_rm_stock_entry",
			args: {
				subcontract_order: cur_frm.doc.name,
				order_doctype: cur_frm.doc.doctype
			},
			callback: function(r) {
				var doclist = frappe.model.sync(r.message);
				frappe.set_route("Form", doclist[0].doctype, doclist[0].name);
			}
=======
			method: "erpnext.controllers.subcontracting_controller.make_rm_stock_entry",
			args: {
				subcontract_order: this.frm.doc.name,
				order_doctype: this.frm.doc.doctype,
			},
			callback: function (r) {
				var doclist = frappe.model.sync(r.message);
				frappe.set_route("Form", doclist[0].doctype, doclist[0].name);
			},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		});
	}

	make_inter_company_order(frm) {
		frappe.model.open_mapped_doc({
			method: "erpnext.buying.doctype.purchase_order.purchase_order.make_inter_company_sales_order",
<<<<<<< HEAD
			frm: frm
=======
			frm: frm,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		});
	}

	make_purchase_receipt() {
		frappe.model.open_mapped_doc({
			method: "erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_receipt",
<<<<<<< HEAD
			frm: cur_frm,
			freeze_message: __("Creating Purchase Receipt ...")
		})
=======
			frm: this.frm,
			freeze_message: __("Creating Purchase Receipt ..."),
		});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}

	make_purchase_invoice() {
		frappe.model.open_mapped_doc({
			method: "erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_invoice",
<<<<<<< HEAD
			frm: cur_frm
		})
=======
			frm: this.frm,
		});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}

	make_subcontracting_order() {
		frappe.model.open_mapped_doc({
			method: "erpnext.buying.doctype.purchase_order.purchase_order.make_subcontracting_order",
<<<<<<< HEAD
			frm: cur_frm,
			freeze_message: __("Creating Subcontracting Order ...")
		})
=======
			frm: this.frm,
			freeze_message: __("Creating Subcontracting Order ..."),
		});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}

	add_from_mappers() {
		var me = this;
<<<<<<< HEAD
		this.frm.add_custom_button(__('Material Request'),
			function() {
=======
		this.frm.add_custom_button(
			__("Material Request"),
			function () {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				erpnext.utils.map_current_doc({
					method: "erpnext.stock.doctype.material_request.material_request.make_purchase_order",
					source_doctype: "Material Request",
					target: me.frm,
					setters: {
						schedule_date: undefined,
<<<<<<< HEAD
						status: undefined
=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
					},
					get_query_filters: {
						material_request_type: "Purchase",
						docstatus: 1,
						status: ["!=", "Stopped"],
						per_ordered: ["<", 100],
<<<<<<< HEAD
						company: me.frm.doc.company
					},
					allow_child_item_selection: true,
					child_fieldname: "items",
					child_columns: ["item_code", "qty", "ordered_qty"]
				})
			}, __("Get Items From"));

		this.frm.add_custom_button(__('Supplier Quotation'),
			function() {
=======
						company: me.frm.doc.company,
					},
					allow_child_item_selection: true,
					child_fieldname: "items",
					child_columns: ["item_code", "qty", "ordered_qty"],
				});
			},
			__("Get Items From")
		);

		this.frm.add_custom_button(
			__("Supplier Quotation"),
			function () {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				erpnext.utils.map_current_doc({
					method: "erpnext.buying.doctype.supplier_quotation.supplier_quotation.make_purchase_order",
					source_doctype: "Supplier Quotation",
					target: me.frm,
					setters: {
						supplier: me.frm.doc.supplier,
<<<<<<< HEAD
						valid_till: undefined
=======
						valid_till: undefined,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
					},
					get_query_filters: {
						docstatus: 1,
						status: ["not in", ["Stopped", "Expired"]],
<<<<<<< HEAD
					}
				})
			}, __("Get Items From"));

		this.frm.add_custom_button(__('Update Rate as per Last Purchase'),
			function() {
				frappe.call({
					"method": "get_last_purchase_rate",
					"doc": me.frm.doc,
					callback: function(r, rt) {
						me.frm.dirty();
						me.frm.cscript.calculate_taxes_and_totals();
					}
				})
			}, __("Tools"));

		this.frm.add_custom_button(__('Link to Material Request'),
		function() {
			var my_items = [];
			for (var i in me.frm.doc.items) {
				if(!me.frm.doc.items[i].material_request){
					my_items.push(me.frm.doc.items[i].item_code);
				}
			}
			frappe.call({
				method: "erpnext.buying.utils.get_linked_material_requests",
				args:{
					items: my_items
				},
				callback: function(r) {
					if(r.exc) return;

					var i = 0;
					var item_length = me.frm.doc.items.length;
					while (i < item_length) {
						var qty = me.frm.doc.items[i].qty;
						(r.message[0] || []).forEach(function(d) {
							if (d.qty > 0 && qty > 0 && me.frm.doc.items[i].item_code == d.item_code && !me.frm.doc.items[i].material_request_item)
							{
								me.frm.doc.items[i].material_request = d.mr_name;
								me.frm.doc.items[i].material_request_item = d.mr_item;
								var my_qty = Math.min(qty, d.qty);
								qty = qty - my_qty;
								d.qty = d.qty  - my_qty;
								me.frm.doc.items[i].stock_qty = my_qty * me.frm.doc.items[i].conversion_factor;
								me.frm.doc.items[i].qty = my_qty;

								frappe.msgprint("Assigning " + d.mr_name + " to " + d.item_code + " (row " + me.frm.doc.items[i].idx + ")");
								if (qty > 0) {
									frappe.msgprint("Splitting " + qty + " units of " + d.item_code);
									var new_row = frappe.model.add_child(me.frm.doc, me.frm.doc.items[i].doctype, "items");
									item_length++;

									for (var key in me.frm.doc.items[i]) {
										new_row[key] = me.frm.doc.items[i][key];
									}

									new_row.idx = item_length;
									new_row["stock_qty"] = new_row.conversion_factor * qty;
									new_row["qty"] = qty;
									new_row["material_request"] = "";
									new_row["material_request_item"] = "";
								}
							}
						});
						i++;
					}
					refresh_field("items");
				}
			});
		}, __("Tools"));
=======
					},
				});
			},
			__("Get Items From")
		);

		this.frm.add_custom_button(
			__("Update Rate as per Last Purchase"),
			function () {
				frappe.call({
					method: "get_last_purchase_rate",
					doc: me.frm.doc,
					callback: function (r, rt) {
						me.frm.dirty();
						me.frm.cscript.calculate_taxes_and_totals();
					},
				});
			},
			__("Tools")
		);

		this.frm.add_custom_button(
			__("Link to Material Request"),
			function () {
				var my_items = [];
				for (var i in me.frm.doc.items) {
					if (!me.frm.doc.items[i].material_request) {
						my_items.push(me.frm.doc.items[i].item_code);
					}
				}
				frappe.call({
					method: "erpnext.buying.utils.get_linked_material_requests",
					args: {
						items: my_items,
					},
					callback: function (r) {
						if (r.exc) return;

						var i = 0;
						var item_length = me.frm.doc.items.length;
						while (i < item_length) {
							var qty = me.frm.doc.items[i].qty;
							(r.message[0] || []).forEach(function (d) {
								if (
									d.qty > 0 &&
									qty > 0 &&
									me.frm.doc.items[i].item_code == d.item_code &&
									!me.frm.doc.items[i].material_request_item
								) {
									me.frm.doc.items[i].material_request = d.mr_name;
									me.frm.doc.items[i].material_request_item = d.mr_item;
									var my_qty = Math.min(qty, d.qty);
									qty = qty - my_qty;
									d.qty = d.qty - my_qty;
									me.frm.doc.items[i].stock_qty =
										my_qty * me.frm.doc.items[i].conversion_factor;
									me.frm.doc.items[i].qty = my_qty;

									frappe.msgprint(
										"Assigning " +
											d.mr_name +
											" to " +
											d.item_code +
											" (row " +
											me.frm.doc.items[i].idx +
											")"
									);
									if (qty > 0) {
										frappe.msgprint("Splitting " + qty + " units of " + d.item_code);
										var new_row = frappe.model.add_child(
											me.frm.doc,
											me.frm.doc.items[i].doctype,
											"items"
										);
										item_length++;

										for (var key in me.frm.doc.items[i]) {
											new_row[key] = me.frm.doc.items[i][key];
										}

										new_row.idx = item_length;
										new_row["stock_qty"] = new_row.conversion_factor * qty;
										new_row["qty"] = qty;
										new_row["material_request"] = "";
										new_row["material_request_item"] = "";
									}
								}
							});
							i++;
						}
						refresh_field("items");
					},
				});
			},
			__("Tools")
		);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}

	tc_name() {
		this.get_terms();
	}

	items_add(doc, cdt, cdn) {
		var row = frappe.get_doc(cdt, cdn);
<<<<<<< HEAD
		if(doc.schedule_date) {
=======
		if (doc.schedule_date) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			row.schedule_date = doc.schedule_date;
			refresh_field("schedule_date", cdn, "items");
		} else {
			this.frm.script_manager.copy_from_first_row("items", row, ["schedule_date"]);
		}
	}

<<<<<<< HEAD
	unhold_purchase_order(){
		cur_frm.cscript.update_status("Resume", "Draft")
	}

	hold_purchase_order(){
		var me = this;
		var d = new frappe.ui.Dialog({
			title: __('Reason for Hold'),
			fields: [
				{
					"fieldname": "reason_for_hold",
					"fieldtype": "Text",
					"reqd": 1,
				}
			],
			primary_action: function() {
				var data = d.get_values();
				let reason_for_hold = 'Reason for hold: ' + data.reason_for_hold;
=======
	unhold_purchase_order() {
		this.frm.cscript.update_status("Resume", "Draft");
	}

	hold_purchase_order() {
		var me = this;
		var d = new frappe.ui.Dialog({
			title: __("Reason for Hold"),
			fields: [
				{
					fieldname: "reason_for_hold",
					fieldtype: "Text",
					reqd: 1,
				},
			],
			primary_action: function () {
				var data = d.get_values();
				let reason_for_hold = "Reason for hold: " + data.reason_for_hold;
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

				frappe.call({
					method: "frappe.desk.form.utils.add_comment",
					args: {
						reference_doctype: me.frm.doctype,
						reference_name: me.frm.docname,
						content: __(reason_for_hold),
						comment_email: frappe.session.user,
<<<<<<< HEAD
						comment_by: frappe.session.user_fullname
					},
					callback: function(r) {
						if(!r.exc) {
							me.update_status('Hold', 'On Hold')
							d.hide();
						}
					}
				});
			}
=======
						comment_by: frappe.session.user_fullname,
					},
					callback: function (r) {
						if (!r.exc) {
							me.update_status("Hold", "On Hold");
							d.hide();
						}
					},
				});
			},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		});
		d.show();
	}

<<<<<<< HEAD
	unclose_purchase_order(){
		cur_frm.cscript.update_status('Re-open', 'Submitted')
	}

	close_purchase_order(){
		cur_frm.cscript.update_status('Close', 'Closed')
	}

	delivered_by_supplier(){
		cur_frm.cscript.update_status('Deliver', 'Delivered')
=======
	unclose_purchase_order() {
		this.frm.cscript.update_status("Re-open", "Submitted");
	}

	close_purchase_order() {
		this.frm.cscript.update_status("Close", "Closed");
	}

	delivered_by_supplier() {
		this.frm.cscript.update_status("Deliver", "Delivered");
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}

	items_on_form_rendered() {
		set_schedule_date(this.frm);
	}

	schedule_date() {
		set_schedule_date(this.frm);
	}
};

// for backward compatibility: combine new and previous states
<<<<<<< HEAD
extend_cscript(cur_frm.cscript, new erpnext.buying.PurchaseOrderController({frm: cur_frm}));

cur_frm.cscript.update_status= function(label, status){
	frappe.call({
		method: "erpnext.buying.doctype.purchase_order.purchase_order.update_status",
		args: {status: status, name: cur_frm.doc.name},
		callback: function(r) {
			cur_frm.set_value("status", status);
			cur_frm.reload_doc();
		}
	})
}

cur_frm.fields_dict['items'].grid.get_field('project').get_query = function(doc, cdt, cdn) {
	return {
		filters:[
			['Project', 'status', 'not in', 'Completed, Cancelled']
		]
	}
}

if (cur_frm.doc.is_old_subcontracting_flow) {
	cur_frm.fields_dict['items'].grid.get_field('bom').get_query = function(doc, cdt, cdn) {
		var d = locals[cdt][cdn]
		return {
			filters: [
				['BOM', 'item', '=', d.item_code],
				['BOM', 'is_active', '=', '1'],
				['BOM', 'docstatus', '=', '1'],
				['BOM', 'company', '=', doc.company]
			]
		}
	}
}

function set_schedule_date(frm) {
	if(frm.doc.schedule_date){
		erpnext.utils.copy_value_in_all_rows(frm.doc, frm.doc.doctype, frm.doc.name, "items", "schedule_date");
=======
extend_cscript(cur_frm.cscript, new erpnext.buying.PurchaseOrderController({ frm: cur_frm }));

cur_frm.cscript.update_status = function (label, status) {
	frappe.call({
		method: "erpnext.buying.doctype.purchase_order.purchase_order.update_status",
		args: { status: status, name: cur_frm.doc.name },
		callback: function (r) {
			cur_frm.set_value("status", status);
			cur_frm.reload_doc();
		},
	});
};

cur_frm.fields_dict["items"].grid.get_field("project").get_query = function (doc, cdt, cdn) {
	return {
		filters: [["Project", "status", "not in", "Completed, Cancelled"]],
	};
};

if (cur_frm.doc.is_old_subcontracting_flow) {
	cur_frm.fields_dict["items"].grid.get_field("bom").get_query = function (doc, cdt, cdn) {
		var d = locals[cdt][cdn];
		return {
			filters: [
				["BOM", "item", "=", d.item_code],
				["BOM", "is_active", "=", "1"],
				["BOM", "docstatus", "=", "1"],
				["BOM", "company", "=", doc.company],
			],
		};
	};
}

function set_schedule_date(frm) {
	if (frm.doc.schedule_date) {
		erpnext.utils.copy_value_in_all_rows(
			frm.doc,
			frm.doc.doctype,
			frm.doc.name,
			"items",
			"schedule_date"
		);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}
}

frappe.provide("erpnext.buying");

<<<<<<< HEAD
frappe.ui.form.on("Purchase Order", "is_subcontracted", function(frm) {
	if (frm.doc.is_old_subcontracting_flow) {
		erpnext.buying.get_default_bom(frm);
	}
});
=======
frappe.ui.form.on("Purchase Order", "is_subcontracted", function (frm) {
	if (frm.doc.is_old_subcontracting_flow) {
		erpnext.buying.get_default_bom(frm);
	}
});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
