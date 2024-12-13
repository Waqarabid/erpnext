// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

cur_frm.cscript.tax_table = "Purchase Taxes and Charges";
<<<<<<< HEAD

{% include "erpnext/public/js/controllers/accounts.js" %}

frappe.ui.form.on("Purchase Taxes and Charges", "add_deduct_tax", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];

	if(!d.category && d.add_deduct_tax) {
		frappe.msgprint(__("Please select Category first"));
		d.add_deduct_tax = '';
	}
	else if(d.category != 'Total' && d.add_deduct_tax == 'Deduct') {
		frappe.msgprint(__("Cannot deduct when category is for 'Valuation' or 'Valuation and Total'"));
		d.add_deduct_tax = '';
	}
	refresh_field('add_deduct_tax', d.name, 'taxes');
});

frappe.ui.form.on("Purchase Taxes and Charges", "category", function(doc, cdt, cdn) {
	var d = locals[cdt][cdn];

	if (d.category != 'Total' && d.add_deduct_tax == 'Deduct') {
		frappe.msgprint(__("Cannot deduct when category is for 'Valuation' or 'Vaulation and Total'"));
		d.add_deduct_tax = '';
	}
	refresh_field('add_deduct_tax', d.name, 'taxes');
=======
erpnext.accounts.taxes.setup_tax_validations("Purchase Taxes and Charges Template");
erpnext.accounts.taxes.setup_tax_filters("Purchase Taxes and Charges");

frappe.ui.form.on("Purchase Taxes and Charges", {
	add_deduct_tax(doc, cdt, cdn) {
		let d = locals[cdt][cdn];

		if (!d.category && d.add_deduct_tax) {
			frappe.msgprint(__("Please select Category first"));
			d.add_deduct_tax = "";
		} else if (d.category != "Total" && d.add_deduct_tax == "Deduct") {
			frappe.msgprint(__("Cannot deduct when category is for 'Valuation' or 'Valuation and Total'"));
			d.add_deduct_tax = "";
		}
		refresh_field("add_deduct_tax", d.name, "taxes");
	},

	category(doc, cdt, cdn) {
		let d = locals[cdt][cdn];

		if (d.category != "Total" && d.add_deduct_tax == "Deduct") {
			frappe.msgprint(__("Cannot deduct when category is for 'Valuation' or 'Valuation and Total'"));
			d.add_deduct_tax = "";
		}
		refresh_field("add_deduct_tax", d.name, "taxes");
	},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
});
