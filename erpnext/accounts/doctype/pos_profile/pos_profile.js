// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt
<<<<<<< HEAD

{% include "erpnext/public/js/controllers/accounts.js" %}

frappe.ui.form.on('POS Profile', {
	setup: function(frm) {
		frm.set_query("selling_price_list", function() {
			return { filters: { selling: 1 } };
		});

		frm.set_query("tc_name", function() {
			return { filters: { selling: 1 } };
		});

		erpnext.queries.setup_queries(frm, "Warehouse", function() {
			return erpnext.queries.warehouse(frm.doc);
		});

		frm.set_query("print_format", function() {
			return {
				filters: [
					['Print Format', 'doc_type', '=', 'POS Invoice']
				]
			};
		});

		frm.set_query("account_for_change_amount", function(doc) {
			if (!doc.company) {
				frappe.throw(__('Please set Company'));
=======
frappe.ui.form.on("POS Profile", {
	setup: function (frm) {
		frm.set_query("selling_price_list", function () {
			return { filters: { selling: 1 } };
		});

		frm.set_query("tc_name", function () {
			return { filters: { selling: 1 } };
		});

		erpnext.queries.setup_queries(frm, "Warehouse", function () {
			return erpnext.queries.warehouse(frm.doc);
		});

		frm.set_query("print_format", function () {
			return {
				filters: [["Print Format", "doc_type", "=", "POS Invoice"]],
			};
		});

		frm.set_query("account_for_change_amount", function (doc) {
			if (!doc.company) {
				frappe.throw(__("Please set Company"));
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			}

			return {
				filters: {
<<<<<<< HEAD
					account_type: ['in', ["Cash", "Bank"]],
					is_group: 0,
					company: doc.company
				}
			};
		});

		frm.set_query("taxes_and_charges", function() {
			return {
				filters: [
					['Sales Taxes and Charges Template', 'company', '=', frm.doc.company],
					['Sales Taxes and Charges Template', 'docstatus', '!=', 2]
				]
			};
		});

		frm.set_query('company_address', function(doc) {
			if (!doc.company) {
				frappe.throw(__('Please set Company'));
			}

			return {
				query: 'frappe.contacts.doctype.address.address.address_query',
				filters: {
					link_doctype: 'Company',
					link_name: doc.company
				}
			};
		});

		frm.set_query('income_account', function(doc) {
			if (!doc.company) {
				frappe.throw(__('Please set Company'));
=======
					account_type: ["in", ["Cash", "Bank"]],
					is_group: 0,
					company: doc.company,
				},
			};
		});

		frm.set_query("taxes_and_charges", function () {
			return {
				filters: [
					["Sales Taxes and Charges Template", "company", "=", frm.doc.company],
					["Sales Taxes and Charges Template", "docstatus", "!=", 2],
				],
			};
		});

		frm.set_query("company_address", function (doc) {
			if (!doc.company) {
				frappe.throw(__("Please set Company"));
			}

			return {
				query: "frappe.contacts.doctype.address.address.address_query",
				filters: {
					link_doctype: "Company",
					link_name: doc.company,
				},
			};
		});

		frm.set_query("income_account", function (doc) {
			if (!doc.company) {
				frappe.throw(__("Please set Company"));
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			}

			return {
				filters: {
<<<<<<< HEAD
					'is_group': 0,
					'company': doc.company,
					'account_type': "Income Account"
				}
			};
		});

		frm.set_query('cost_center', function(doc) {
			if (!doc.company) {
				frappe.throw(__('Please set Company'));
=======
					is_group: 0,
					company: doc.company,
					account_type: "Income Account",
				},
			};
		});

		frm.set_query("cost_center", function (doc) {
			if (!doc.company) {
				frappe.throw(__("Please set Company"));
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			}

			return {
				filters: {
<<<<<<< HEAD
					'company': doc.company,
					'is_group': 0
				}
			};
		});

		frm.set_query('expense_account', function(doc) {
			if (!doc.company) {
				frappe.throw(__('Please set Company'));
=======
					company: doc.company,
					is_group: 0,
				},
			};
		});

		frm.set_query("expense_account", function (doc) {
			if (!doc.company) {
				frappe.throw(__("Please set Company"));
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			}

			return {
				filters: {
<<<<<<< HEAD
					"report_type": "Profit and Loss",
					"company": doc.company,
					"is_group": 0
				}
			};
		});

		frm.set_query("select_print_heading", function() {
			return {
				filters: [
					['Print Heading', 'docstatus', '!=', 2]
				]
			};
		});

		frm.set_query("write_off_account", function(doc) {
			return {
				filters: {
					'report_type': 'Profit and Loss',
					'is_group': 0,
					'company': doc.company
				}
			};
		});

		frm.set_query("write_off_cost_center", function(doc) {
			return {
				filters: {
					'is_group': 0,
					'company': doc.company
				}
=======
					report_type: "Profit and Loss",
					company: doc.company,
					is_group: 0,
				},
			};
		});

		frm.set_query("select_print_heading", function () {
			return {
				filters: [["Print Heading", "docstatus", "!=", 2]],
			};
		});

		frm.set_query("write_off_account", function (doc) {
			return {
				filters: {
					report_type: "Profit and Loss",
					is_group: 0,
					company: doc.company,
				},
			};
		});

		frm.set_query("write_off_cost_center", function (doc) {
			return {
				filters: {
					is_group: 0,
					company: doc.company,
				},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			};
		});

		erpnext.accounts.dimensions.setup_dimension_filters(frm, frm.doctype);
	},

<<<<<<< HEAD
	refresh: function(frm) {
=======
	refresh: function (frm) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		if (frm.doc.company) {
			frm.trigger("toggle_display_account_head");
		}
	},

<<<<<<< HEAD
	company: function(frm) {
=======
	company: function (frm) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		frm.trigger("toggle_display_account_head");
		erpnext.accounts.dimensions.update_dimension(frm, frm.doctype);
	},

<<<<<<< HEAD
	toggle_display_account_head: function(frm) {
		frm.toggle_display('expense_account',
			erpnext.is_perpetual_inventory_enabled(frm.doc.company));
	}
=======
	toggle_display_account_head: function (frm) {
		frm.toggle_display("expense_account", erpnext.is_perpetual_inventory_enabled(frm.doc.company));
	},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
});
