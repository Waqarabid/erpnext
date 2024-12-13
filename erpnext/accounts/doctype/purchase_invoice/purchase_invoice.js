// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.provide("erpnext.accounts");
<<<<<<< HEAD
{% include 'erpnext/public/js/controllers/buying.js' %};
=======

cur_frm.cscript.tax_table = "Purchase Taxes and Charges";

erpnext.accounts.payment_triggers.setup("Purchase Invoice");
erpnext.accounts.taxes.setup_tax_filters("Purchase Taxes and Charges");
erpnext.accounts.taxes.setup_tax_validations("Purchase Invoice");
erpnext.buying.setup_buying_controller();
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

erpnext.accounts.PurchaseInvoice = class PurchaseInvoice extends erpnext.buying.BuyingController {
	setup(doc) {
		this.setup_posting_date_time_check();
		super.setup(doc);

		// formatter for purchase invoice item
<<<<<<< HEAD
		if(this.frm.doc.update_stock) {
			this.frm.set_indicator_formatter('item_code', function(doc) {
				return (doc.qty<=doc.received_qty) ? "green" : "orange";
			});
		}

		this.frm.set_query("unrealized_profit_loss_account", function() {
=======
		if (this.frm.doc.update_stock) {
			this.frm.set_indicator_formatter("item_code", function (doc) {
				return doc.qty <= doc.received_qty ? "green" : "orange";
			});
		}

		this.frm.set_query("unrealized_profit_loss_account", function () {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			return {
				filters: {
					company: doc.company,
					is_group: 0,
					root_type: "Liability",
<<<<<<< HEAD
				}
=======
				},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			};
		});

		this.frm.set_query("expense_account", "items", function () {
			return {
				query: "erpnext.controllers.queries.get_expense_account",
				filters: { company: doc.company },
			};
		});
	}

	onload() {
		super.onload();

		// Ignore linked advances
<<<<<<< HEAD
		this.frm.ignore_doctypes_on_cancel_all = ['Journal Entry', 'Payment Entry', 'Purchase Invoice', "Repost Payment Ledger", "Repost Accounting Ledger", "Unreconcile Payment", "Unreconcile Payment Entries", "Bank Transaction"];

		if(!this.frm.doc.__islocal) {
			// show credit_to in print format
			if(!this.frm.doc.supplier && this.frm.doc.credit_to) {
=======
		this.frm.ignore_doctypes_on_cancel_all = [
			"Journal Entry",
			"Payment Entry",
			"Purchase Invoice",
			"Repost Payment Ledger",
			"Repost Accounting Ledger",
			"Unreconcile Payment",
			"Unreconcile Payment Entries",
			"Serial and Batch Bundle",
			"Bank Transaction",
		];

		if (!this.frm.doc.__islocal) {
			// show credit_to in print format
			if (!this.frm.doc.supplier && this.frm.doc.credit_to) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				this.frm.set_df_property("credit_to", "print_hide", 0);
			}
		}

		// Trigger supplier event on load if supplier is available
		// The reason for this is PI can be created from PR or PO and supplier is pre populated
		if (this.frm.doc.supplier && this.frm.doc.__islocal) {
<<<<<<< HEAD
			this.frm.trigger('supplier');
=======
			this.frm.trigger("supplier");
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		}
	}

	refresh(doc) {
		const me = this;
		super.refresh();

		hide_fields(this.frm.doc);
		// Show / Hide button
		this.show_general_ledger();
<<<<<<< HEAD

		if(doc.update_stock==1 && doc.docstatus==1) {
			this.show_stock_ledger();
		}

		if(!doc.is_return && doc.docstatus == 1 && doc.outstanding_amount != 0){
			if(doc.on_hold) {
				this.frm.add_custom_button(
					__('Change Release Date'),
					function() {me.change_release_date()},
					__('Hold Invoice')
				);
				this.frm.add_custom_button(
					__('Unblock Invoice'),
					function() {me.unblock_invoice()},
					__('Create')
				);
			} else if (!doc.on_hold) {
				this.frm.add_custom_button(
					__('Block Invoice'),
					function() {me.block_invoice()},
					__('Create')
=======
		erpnext.accounts.ledger_preview.show_accounting_ledger_preview(this.frm);

		if (doc.update_stock == 1) {
			this.show_stock_ledger();
			erpnext.accounts.ledger_preview.show_stock_ledger_preview(this.frm);
		}

		if (!doc.is_return && doc.docstatus == 1 && doc.outstanding_amount != 0) {
			if (doc.on_hold) {
				this.frm.add_custom_button(
					__("Change Release Date"),
					function () {
						me.change_release_date();
					},
					__("Hold Invoice")
				);
				this.frm.add_custom_button(
					__("Unblock Invoice"),
					function () {
						me.unblock_invoice();
					},
					__("Create")
				);
			} else if (!doc.on_hold) {
				this.frm.add_custom_button(
					__("Block Invoice"),
					function () {
						me.block_invoice();
					},
					__("Create")
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				);
			}
		}

<<<<<<< HEAD
		if(doc.docstatus == 1 && doc.outstanding_amount != 0 && !doc.on_hold) {
			this.frm.add_custom_button(
				__('Payment'),
				() => this.make_payment_entry(),
				__('Create')
			);
			cur_frm.page.set_inner_btn_group_as_primary(__('Create'));
		}

		if(!doc.is_return && doc.docstatus==1) {
			if(doc.outstanding_amount >= 0 || Math.abs(flt(doc.outstanding_amount)) < flt(doc.grand_total)) {
				cur_frm.add_custom_button(__('Return / Debit Note'),
					this.make_debit_note, __('Create'));
			}

			if(!doc.auto_repeat) {
				cur_frm.add_custom_button(__('Subscription'), function() {
					erpnext.utils.make_subscription(doc.doctype, doc.name)
				}, __('Create'))
=======
		if (doc.docstatus == 1 && doc.outstanding_amount != 0 && !doc.on_hold) {
			this.frm.add_custom_button(__("Payment"), () => this.make_payment_entry(), __("Create"));
			this.frm.page.set_inner_btn_group_as_primary(__("Create"));
		}

		if (!doc.is_return && doc.docstatus == 1) {
			if (doc.outstanding_amount >= 0 || Math.abs(flt(doc.outstanding_amount)) < flt(doc.grand_total)) {
				this.frm.add_custom_button(
					__("Return / Debit Note"),
					this.make_debit_note.bind(this),
					__("Create")
				);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			}
		}

		if (doc.outstanding_amount > 0 && !cint(doc.is_return) && !doc.on_hold) {
<<<<<<< HEAD
			cur_frm.add_custom_button(__('Payment Request'), function() {
				me.make_payment_request()
			}, __('Create'));
		}

		if(doc.docstatus===0) {
			this.frm.add_custom_button(__('Purchase Order'), function() {
				erpnext.utils.map_current_doc({
					method: "erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_invoice",
					source_doctype: "Purchase Order",
					target: me.frm,
					setters: {
						supplier: me.frm.doc.supplier || undefined,
						schedule_date: undefined
					},
					get_query_filters: {
						docstatus: 1,
						status: ["not in", ["Closed", "On Hold"]],
						per_billed: ["<", 99.99],
						company: me.frm.doc.company
					}
				})
			}, __("Get Items From"));

			this.frm.add_custom_button(__('Purchase Receipt'), function() {
				erpnext.utils.map_current_doc({
					method: "erpnext.stock.doctype.purchase_receipt.purchase_receipt.make_purchase_invoice",
					source_doctype: "Purchase Receipt",
					target: me.frm,
					setters: {
						supplier: me.frm.doc.supplier || undefined,
						posting_date: undefined
					},
					get_query_filters: {
						docstatus: 1,
						status: ["not in", ["Closed", "Completed", "Return Issued"]],
						company: me.frm.doc.company,
						is_return: 0
					}
				})
			}, __("Get Items From"));
=======
			this.frm.add_custom_button(
				__("Payment Request"),
				function () {
					me.make_payment_request();
				},
				__("Create")
			);
		}

		if (doc.docstatus === 0) {
			this.frm.add_custom_button(
				__("Purchase Order"),
				function () {
					erpnext.utils.map_current_doc({
						method: "erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_invoice",
						source_doctype: "Purchase Order",
						target: me.frm,
						setters: {
							supplier: me.frm.doc.supplier || undefined,
							schedule_date: undefined,
						},
						get_query_filters: {
							docstatus: 1,
							status: ["not in", ["Closed", "On Hold"]],
							per_billed: ["<", 99.99],
							company: me.frm.doc.company,
						},
					});
				},
				__("Get Items From")
			);

			this.frm.add_custom_button(
				__("Purchase Receipt"),
				function () {
					erpnext.utils.map_current_doc({
						method: "erpnext.stock.doctype.purchase_receipt.purchase_receipt.make_purchase_invoice",
						source_doctype: "Purchase Receipt",
						target: me.frm,
						setters: {
							supplier: me.frm.doc.supplier || undefined,
							posting_date: undefined,
						},
						get_query_filters: {
							docstatus: 1,
							status: ["not in", ["Closed", "Completed", "Return Issued"]],
							company: me.frm.doc.company,
							is_return: 0,
						},
					});
				},
				__("Get Items From")
			);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

			if (!this.frm.doc.is_return) {
				frappe.db.get_single_value("Buying Settings", "maintain_same_rate").then((value) => {
					if (value) {
						this.frm.doc.items.forEach((item) => {
							this.frm.fields_dict.items.grid.update_docfield_property(
<<<<<<< HEAD
								"rate", "read_only", (item.purchase_receipt && item.pr_detail)
=======
								"rate",
								"read_only",
								item.purchase_receipt && item.pr_detail
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
							);
						});
					}
				});
			}
		}
		this.frm.toggle_reqd("supplier_warehouse", this.frm.doc.is_subcontracted);

		if (doc.docstatus == 1 && !doc.inter_company_invoice_reference) {
<<<<<<< HEAD
			frappe.model.with_doc("Supplier", me.frm.doc.supplier, function() {
=======
			frappe.model.with_doc("Supplier", me.frm.doc.supplier, function () {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				var supplier = frappe.model.get_doc("Supplier", me.frm.doc.supplier);
				var internal = supplier.is_internal_supplier;
				var disabled = supplier.disabled;
				if (internal == 1 && disabled == 0) {
<<<<<<< HEAD
					me.frm.add_custom_button("Inter Company Invoice", function() {
						me.make_inter_company_invoice(me.frm);
					}, __('Create'));
=======
					me.frm.add_custom_button(
						"Inter Company Invoice",
						function () {
							me.make_inter_company_invoice(me.frm);
						},
						__("Create")
					);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				}
			});
		}

		this.frm.set_df_property("tax_withholding_category", "hidden", doc.apply_tds ? 0 : 1);
		erpnext.accounts.unreconcile_payment.add_unreconcile_btn(me.frm);
	}

	unblock_invoice() {
		const me = this;
		frappe.call({
<<<<<<< HEAD
			'method': 'erpnext.accounts.doctype.purchase_invoice.purchase_invoice.unblock_invoice',
			'args': {'name': me.frm.doc.name},
			'callback': (r) => me.frm.reload_doc()
=======
			method: "erpnext.accounts.doctype.purchase_invoice.purchase_invoice.unblock_invoice",
			args: { name: me.frm.doc.name },
			callback: (r) => me.frm.reload_doc(),
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		});
	}

	block_invoice() {
		this.make_comment_dialog_and_block_invoice();
	}

	change_release_date() {
		this.make_dialog_and_set_release_date();
	}

	can_change_release_date(date) {
		const diff = frappe.datetime.get_diff(date, frappe.datetime.nowdate());
		if (diff < 0) {
<<<<<<< HEAD
			frappe.throw(__('New release date should be in the future'));
=======
			frappe.throw(__("New release date should be in the future"));
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			return false;
		} else {
			return true;
		}
	}

<<<<<<< HEAD
	make_comment_dialog_and_block_invoice(){
		const me = this;

		const title = __('Block Invoice');
		const fields = [
			{
				fieldname: 'release_date',
				read_only: 0,
				fieldtype:'Date',
				label: __('Release Date'),
				default: me.frm.doc.release_date,
				reqd: 1
			},
			{
				fieldname: 'hold_comment',
				read_only: 0,
				fieldtype:'Small Text',
				label: __('Reason For Putting On Hold'),
				default: ""
=======
	make_comment_dialog_and_block_invoice() {
		const me = this;

		const title = __("Block Invoice");
		const fields = [
			{
				fieldname: "release_date",
				read_only: 0,
				fieldtype: "Date",
				label: __("Release Date"),
				default: me.frm.doc.release_date,
				reqd: 1,
			},
			{
				fieldname: "hold_comment",
				read_only: 0,
				fieldtype: "Small Text",
				label: __("Reason For Putting On Hold"),
				default: "",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			},
		];

		this.dialog = new frappe.ui.Dialog({
			title: title,
<<<<<<< HEAD
			fields: fields
		});

		this.dialog.set_primary_action(__('Save'), function() {
			const dialog_data = me.dialog.get_values();
			frappe.call({
				'method': 'erpnext.accounts.doctype.purchase_invoice.purchase_invoice.block_invoice',
				'args': {
					'name': me.frm.doc.name,
					'hold_comment': dialog_data.hold_comment,
					'release_date': dialog_data.release_date
				},
				'callback': (r) => me.frm.reload_doc()
=======
			fields: fields,
		});

		this.dialog.set_primary_action(__("Save"), function () {
			const dialog_data = me.dialog.get_values();
			frappe.call({
				method: "erpnext.accounts.doctype.purchase_invoice.purchase_invoice.block_invoice",
				args: {
					name: me.frm.doc.name,
					hold_comment: dialog_data.hold_comment,
					release_date: dialog_data.release_date,
				},
				callback: (r) => me.frm.reload_doc(),
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			});
			me.dialog.hide();
		});

		this.dialog.show();
	}

	make_dialog_and_set_release_date() {
		const me = this;

<<<<<<< HEAD
		const title = __('Set New Release Date');
		const fields = [
			{
				fieldname: 'release_date',
				read_only: 0,
				fieldtype:'Date',
				label: __('Release Date'),
				default: me.frm.doc.release_date
=======
		const title = __("Set New Release Date");
		const fields = [
			{
				fieldname: "release_date",
				read_only: 0,
				fieldtype: "Date",
				label: __("Release Date"),
				default: me.frm.doc.release_date,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			},
		];

		this.dialog = new frappe.ui.Dialog({
			title: title,
<<<<<<< HEAD
			fields: fields
		});

		this.dialog.set_primary_action(__('Save'), function() {
			me.dialog_data = me.dialog.get_values();
			if(me.can_change_release_date(me.dialog_data.release_date)) {
=======
			fields: fields,
		});

		this.dialog.set_primary_action(__("Save"), function () {
			me.dialog_data = me.dialog.get_values();
			if (me.can_change_release_date(me.dialog_data.release_date)) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				me.dialog_data.name = me.frm.doc.name;
				me.set_release_date(me.dialog_data);
				me.dialog.hide();
			}
		});

		this.dialog.show();
	}

	set_release_date(data) {
		return frappe.call({
<<<<<<< HEAD
			'method': 'erpnext.accounts.doctype.purchase_invoice.purchase_invoice.change_release_date',
			'args': data,
			'callback': (r) => this.frm.reload_doc()
=======
			method: "erpnext.accounts.doctype.purchase_invoice.purchase_invoice.change_release_date",
			args: data,
			callback: (r) => this.frm.reload_doc(),
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		});
	}

	supplier() {
		var me = this;

		// Do not update if inter company reference is there as the details will already be updated
<<<<<<< HEAD
		if(this.frm.updating_party_details || this.frm.doc.inter_company_invoice_reference)
			return;

		if (this.frm.doc.__onload && this.frm.doc.__onload.load_after_mapping) return;

		erpnext.utils.get_party_details(this.frm, "erpnext.accounts.party.get_party_details",
=======
		if (this.frm.updating_party_details || this.frm.doc.inter_company_invoice_reference) return;

		if (this.frm.doc.__onload && this.frm.doc.__onload.load_after_mapping) return;

		erpnext.utils.get_party_details(
			this.frm,
			"erpnext.accounts.party.get_party_details",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			{
				posting_date: this.frm.doc.posting_date,
				bill_date: this.frm.doc.bill_date,
				party: this.frm.doc.supplier,
				party_type: "Supplier",
				account: this.frm.doc.credit_to,
				price_list: this.frm.doc.buying_price_list,
				fetch_payment_terms_template: cint(
					(this.frm.doc.is_return == 0) & !this.frm.doc.ignore_default_payment_terms_template
				),
			},
			function () {
				me.apply_pricing_rule();
				me.frm.doc.apply_tds = me.frm.supplier_tds ? 1 : 0;
				me.frm.doc.tax_withholding_category = me.frm.supplier_tds;
				me.frm.set_df_property("apply_tds", "read_only", me.frm.supplier_tds ? 0 : 1);
				me.frm.set_df_property("tax_withholding_category", "hidden", me.frm.supplier_tds ? 0 : 1);
<<<<<<< HEAD
			})
=======
			}
		);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}

	apply_tds(frm) {
		var me = this;
		me.frm.set_value("tax_withheld_vouchers", []);
		if (!me.frm.doc.apply_tds) {
<<<<<<< HEAD
			me.frm.set_value("tax_withholding_category", '');
=======
			me.frm.set_value("tax_withholding_category", "");
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			me.frm.set_df_property("tax_withholding_category", "hidden", 1);
		} else {
			me.frm.set_value("tax_withholding_category", me.frm.supplier_tds);
			me.frm.set_df_property("tax_withholding_category", "hidden", 0);
		}
	}

	credit_to() {
		var me = this;
<<<<<<< HEAD
		if(this.frm.doc.credit_to) {
=======
		if (this.frm.doc.credit_to) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			me.frm.call({
				method: "frappe.client.get_value",
				args: {
					doctype: "Account",
					fieldname: "account_currency",
					filters: { name: me.frm.doc.credit_to },
				},
<<<<<<< HEAD
				callback: function(r, rt) {
					if(r.message) {
						me.frm.set_value("party_account_currency", r.message.account_currency);
						me.set_dynamic_labels();
					}
				}
=======
				callback: function (r, rt) {
					if (r.message) {
						me.frm.set_value("party_account_currency", r.message.account_currency);
						me.set_dynamic_labels();
					}
				},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			});
		}
	}

	make_inter_company_invoice(frm) {
		frappe.model.open_mapped_doc({
			method: "erpnext.accounts.doctype.purchase_invoice.purchase_invoice.make_inter_company_sales_invoice",
<<<<<<< HEAD
			frm: frm
=======
			frm: frm,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		});
	}

	is_paid() {
		hide_fields(this.frm.doc);
<<<<<<< HEAD
		if(cint(this.frm.doc.is_paid)) {
			this.frm.set_value("allocate_advances_automatically", 0);
			if(!this.frm.doc.company) {
				this.frm.set_value("is_paid", 0)
=======
		if (cint(this.frm.doc.is_paid)) {
			this.frm.set_value("allocate_advances_automatically", 0);
			if (!this.frm.doc.company) {
				this.frm.set_value("is_paid", 0);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				frappe.msgprint(__("Please specify Company to proceed"));
			}
		}
		this.calculate_outstanding_amount();
		this.frm.refresh_fields();
	}

	write_off_amount() {
		this.set_in_company_currency(this.frm.doc, ["write_off_amount"]);
		this.calculate_outstanding_amount();
		this.frm.refresh_fields();
	}

	paid_amount() {
		this.set_in_company_currency(this.frm.doc, ["paid_amount"]);
		this.write_off_amount();
		this.frm.refresh_fields();
	}

	allocated_amount() {
		this.calculate_total_advance();
		this.frm.refresh_fields();
	}

	items_add(doc, cdt, cdn) {
		var row = frappe.get_doc(cdt, cdn);
<<<<<<< HEAD
		this.frm.script_manager.copy_from_first_row("items", row,
			["expense_account", "discount_account", "cost_center", "project"]);
	}

	on_submit() {
		$.each(this.frm.doc["items"] || [], function(i, row) {
			if(row.purchase_receipt) frappe.model.clear_doc("Purchase Receipt", row.purchase_receipt)
		})
=======
		this.frm.script_manager.copy_from_first_row("items", row, [
			"expense_account",
			"discount_account",
			"cost_center",
			"project",
		]);
	}

	on_submit() {
		super.on_submit();

		$.each(this.frm.doc["items"] || [], function (i, row) {
			if (row.purchase_receipt) frappe.model.clear_doc("Purchase Receipt", row.purchase_receipt);
		});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}

	make_debit_note() {
		frappe.model.open_mapped_doc({
			method: "erpnext.accounts.doctype.purchase_invoice.purchase_invoice.make_debit_note",
<<<<<<< HEAD
			frm: cur_frm
		})
=======
			frm: this.frm,
		});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}
};

cur_frm.script_manager.make(erpnext.accounts.PurchaseInvoice);

// Hide Fields
// ------------
function hide_fields(doc) {
<<<<<<< HEAD
	var parent_fields = ['due_date', 'is_opening', 'advances_section', 'from_date', 'to_date'];

	if(cint(doc.is_paid) == 1) {
=======
	var parent_fields = ["due_date", "is_opening", "advances_section", "from_date", "to_date"];

	if (cint(doc.is_paid) == 1) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		hide_field(parent_fields);
	} else {
		for (var i in parent_fields) {
			var docfield = frappe.meta.docfield_map[doc.doctype][parent_fields[i]];
<<<<<<< HEAD
			if(!docfield.hidden) unhide_field(parent_fields[i]);
		}

	}

	var item_fields_stock = ['warehouse_section', 'received_qty', 'rejected_qty'];
=======
			if (!docfield.hidden) unhide_field(parent_fields[i]);
		}
	}

	var item_fields_stock = ["warehouse_section", "received_qty", "rejected_qty"];
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

	if (cur_frm.fields_dict["items"]) {
		cur_frm.fields_dict["items"].grid.set_column_disp(
			item_fields_stock,
			cint(doc.update_stock) == 1 || cint(doc.is_return) == 1 ? true : false
		);
	}

	cur_frm.refresh_fields();
}

<<<<<<< HEAD
cur_frm.fields_dict.cash_bank_account.get_query = function(doc) {
	return {
		filters: [
			["Account", "account_type", "in", ["Cash", "Bank"]],
			["Account", "is_group", "=",0],
			["Account", "company", "=", doc.company],
			["Account", "report_type", "=", "Balance Sheet"]
		]
	}
}

cur_frm.fields_dict['items'].grid.get_field("item_code").get_query = function(doc, cdt, cdn) {
	return {
		query: "erpnext.controllers.queries.item_query",
		filters: {'is_purchase_item': 1}
	}
}

cur_frm.fields_dict['credit_to'].get_query = function(doc) {
	// filter on Account
	return {
		filters: {
			'account_type': 'Payable',
			'is_group': 0,
			'company': doc.company
		}
	}
}

// Get Print Heading
cur_frm.fields_dict['select_print_heading'].get_query = function(doc, cdt, cdn) {
	return {
		filters:[
			['Print Heading', 'docstatus', '!=', 2]
		]
	}
}

cur_frm.set_query("wip_composite_asset", "items", function() {
	return {
		filters: {'is_composite_asset': 1, 'docstatus': 0 }
	}
});

cur_frm.cscript.expense_account = function(doc, cdt, cdn){
	var d = locals[cdt][cdn];
	if(d.idx == 1 && d.expense_account){
		var cl = doc.items || [];
		for(var i = 0; i < cl.length; i++){
			if(!cl[i].expense_account) cl[i].expense_account = d.expense_account;
		}
	}
	refresh_field('items');
}

cur_frm.fields_dict["items"].grid.get_field("cost_center").get_query = function(doc) {
	return {
		filters: {
			'company': doc.company,
			'is_group': 0
		}

	}
}

cur_frm.cscript.cost_center = function(doc, cdt, cdn){
	var d = locals[cdt][cdn];
	if(d.cost_center){
		var cl = doc.items || [];
		for(var i = 0; i < cl.length; i++){
			if(!cl[i].cost_center) cl[i].cost_center = d.cost_center;
		}
	}
	refresh_field('items');
}

cur_frm.fields_dict['items'].grid.get_field('project').get_query = function(doc, cdt, cdn) {
	return{
		filters:[
			['Project', 'status', 'not in', 'Completed, Cancelled']
		]
	}
}

frappe.ui.form.on("Purchase Invoice", {
	setup: function(frm) {
		frm.custom_make_buttons = {
			'Purchase Invoice': 'Return / Debit Note',
			'Payment Entry': 'Payment'
		}

		frm.set_query("additional_discount_account", function() {
=======
cur_frm.fields_dict.cash_bank_account.get_query = function (doc) {
	return {
		filters: [
			["Account", "account_type", "in", ["Cash", "Bank"]],
			["Account", "is_group", "=", 0],
			["Account", "company", "=", doc.company],
			["Account", "report_type", "=", "Balance Sheet"],
		],
	};
};

cur_frm.fields_dict["items"].grid.get_field("item_code").get_query = function (doc, cdt, cdn) {
	return {
		query: "erpnext.controllers.queries.item_query",
		filters: { is_purchase_item: 1 },
	};
};

cur_frm.fields_dict["credit_to"].get_query = function (doc) {
	// filter on Account
	return {
		filters: {
			account_type: "Payable",
			is_group: 0,
			company: doc.company,
		},
	};
};

// Get Print Heading
cur_frm.fields_dict["select_print_heading"].get_query = function (doc, cdt, cdn) {
	return {
		filters: [["Print Heading", "docstatus", "!=", 2]],
	};
};

cur_frm.set_query("wip_composite_asset", "items", function () {
	return {
		filters: { is_composite_asset: 1, docstatus: 0 },
	};
});

cur_frm.cscript.expense_account = function (doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	if (d.idx == 1 && d.expense_account) {
		var cl = doc.items || [];
		for (var i = 0; i < cl.length; i++) {
			if (!cl[i].expense_account) cl[i].expense_account = d.expense_account;
		}
	}
	refresh_field("items");
};

cur_frm.fields_dict["items"].grid.get_field("cost_center").get_query = function (doc) {
	return {
		filters: {
			company: doc.company,
			is_group: 0,
		},
	};
};

cur_frm.cscript.cost_center = function (doc, cdt, cdn) {
	var d = locals[cdt][cdn];
	if (d.cost_center) {
		var cl = doc.items || [];
		for (var i = 0; i < cl.length; i++) {
			if (!cl[i].cost_center) cl[i].cost_center = d.cost_center;
		}
	}
	refresh_field("items");
};

cur_frm.fields_dict["items"].grid.get_field("project").get_query = function (doc, cdt, cdn) {
	return {
		filters: [["Project", "status", "not in", "Completed, Cancelled"]],
	};
};

frappe.ui.form.on("Purchase Invoice", {
	setup: function (frm) {
		frm.custom_make_buttons = {
			"Purchase Invoice": "Return / Debit Note",
			"Payment Entry": "Payment",
		};

		if (frm.doc.update_stock) {
			frm.custom_make_buttons["Landed Cost Voucher"] = "Landed Cost Voucher";
		}

		frm.set_query("additional_discount_account", function () {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			return {
				filters: {
					company: frm.doc.company,
					is_group: 0,
					report_type: "Profit and Loss",
<<<<<<< HEAD
				}
			};
		});

		frm.fields_dict['items'].grid.get_field('deferred_expense_account').get_query = function(doc) {
			return {
				filters: {
					'root_type': 'Asset',
					'company': doc.company,
					"is_group": 0
				}
			}
		}

		frm.fields_dict['items'].grid.get_field('discount_account').get_query = function(doc) {
			return {
				filters: {
					'report_type': 'Profit and Loss',
					'company': doc.company,
					"is_group": 0
				}
			}
		}
	},

	refresh: function(frm) {
		frm.events.add_custom_buttons(frm);
	},

	add_custom_buttons: function(frm) {
		if (frm.doc.docstatus == 1 && frm.doc.per_received < 100) {
			frm.add_custom_button(__('Purchase Receipt'), () => {
				frm.events.make_purchase_receipt(frm);
			}, __('Create'));
		}

		if (frm.doc.docstatus == 1 && frm.doc.per_received > 0) {
			frm.add_custom_button(__('Purchase Receipt'), () => {
				frappe.route_options = {
					'purchase_invoice': frm.doc.name
				}

				frappe.set_route("List", "Purchase Receipt", "List")
			}, __('View'));
		}
	},

	onload: function(frm) {
		if(frm.doc.__onload && frm.is_new()) {
			if(frm.doc.supplier) {
				frm.doc.apply_tds = frm.doc.__onload.supplier_tds ? 1 : 0;
			}
			if(!frm.doc.__onload.supplier_tds) {
=======
				},
			};
		});

		frm.fields_dict["items"].grid.get_field("deferred_expense_account").get_query = function (doc) {
			return {
				filters: {
					root_type: "Asset",
					company: doc.company,
					is_group: 0,
				},
			};
		};

		frm.fields_dict["items"].grid.get_field("discount_account").get_query = function (doc) {
			return {
				filters: {
					report_type: "Profit and Loss",
					company: doc.company,
					is_group: 0,
				},
			};
		};
	},

	refresh: function (frm) {
		frm.events.add_custom_buttons(frm);
	},

	mode_of_payment: function (frm) {
		erpnext.accounts.pos.get_payment_mode_account(frm, frm.doc.mode_of_payment, function (account) {
			frm.set_value("cash_bank_account", account);
		});
	},

	add_custom_buttons: function (frm) {
		if (frm.doc.docstatus == 1 && frm.doc.per_received < 100) {
			frm.add_custom_button(
				__("Purchase Receipt"),
				() => {
					frm.events.make_purchase_receipt(frm);
				},
				__("Create")
			);
		}

		if (frm.doc.docstatus == 1 && frm.doc.per_received > 0) {
			frm.add_custom_button(
				__("Purchase Receipt"),
				() => {
					frappe.route_options = {
						purchase_invoice: frm.doc.name,
					};

					frappe.set_route("List", "Purchase Receipt", "List");
				},
				__("View")
			);
		}

		if (frm.doc.docstatus === 1 && frm.doc.update_stock) {
			frm.add_custom_button(
				__("Landed Cost Voucher"),
				() => {
					frm.events.make_lcv(frm);
				},
				__("Create")
			);
		}
	},

	make_lcv(frm) {
		frappe.call({
			method: "erpnext.stock.doctype.purchase_receipt.purchase_receipt.make_lcv",
			args: {
				doctype: frm.doc.doctype,
				docname: frm.doc.name,
			},
			callback: (r) => {
				if (r.message) {
					var doc = frappe.model.sync(r.message);
					frappe.set_route("Form", doc[0].doctype, doc[0].name);
				}
			},
		});
	},

	onload: function (frm) {
		if (frm.doc.__onload && frm.doc.supplier) {
			if (frm.is_new()) {
				frm.doc.apply_tds = frm.doc.__onload.supplier_tds ? 1 : 0;
			}
			if (!frm.doc.__onload.supplier_tds) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				frm.set_df_property("apply_tds", "read_only", 1);
			}
		}

<<<<<<< HEAD
		erpnext.queries.setup_queries(frm, "Warehouse", function() {
=======
		erpnext.queries.setup_queries(frm, "Warehouse", function () {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			return erpnext.queries.warehouse(frm.doc);
		});

		if (frm.is_new()) {
			frm.clear_table("tax_withheld_vouchers");
		}
	},

<<<<<<< HEAD
	is_subcontracted: function(frm) {
=======
	is_subcontracted: function (frm) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		if (frm.doc.is_old_subcontracting_flow) {
			erpnext.buying.get_default_bom(frm);
		}

		frm.toggle_reqd("supplier_warehouse", frm.doc.is_subcontracted);
	},

<<<<<<< HEAD
	update_stock: function(frm) {
		hide_fields(frm.doc);
		frm.fields_dict.items.grid.toggle_reqd("item_code", frm.doc.update_stock? true: false);
	},

	make_purchase_receipt: function(frm) {
		frappe.model.open_mapped_doc({
			method: "erpnext.accounts.doctype.purchase_invoice.purchase_invoice.make_purchase_receipt",
			frm: frm,
			freeze_message: __("Creating Purchase Receipt ...")
		})
	},

	company: function(frm) {
=======
	update_stock: function (frm) {
		hide_fields(frm.doc);
		frm.fields_dict.items.grid.toggle_reqd("item_code", frm.doc.update_stock ? true : false);
	},

	make_purchase_receipt: function (frm) {
		frappe.model.open_mapped_doc({
			method: "erpnext.accounts.doctype.purchase_invoice.purchase_invoice.make_purchase_receipt",
			frm: frm,
			freeze_message: __("Creating Purchase Receipt ..."),
		});
	},

	company: function (frm) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		erpnext.accounts.dimensions.update_dimension(frm, frm.doctype);

		if (frm.doc.company) {
			frappe.call({
<<<<<<< HEAD
				method:
					"erpnext.accounts.party.get_party_account",
				args: {
					party_type: 'Supplier',
					party: frm.doc.supplier,
					company: frm.doc.company
=======
				method: "erpnext.accounts.party.get_party_account",
				args: {
					party_type: "Supplier",
					party: frm.doc.supplier,
					company: frm.doc.company,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				},
				callback: (response) => {
					if (response) frm.set_value("credit_to", response.message);
				},
			});
		}
	},
<<<<<<< HEAD
})
=======
});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
