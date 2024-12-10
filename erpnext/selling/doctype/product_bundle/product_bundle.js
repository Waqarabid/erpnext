// Copyright (c) 2021, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.ui.form.on("Product Bundle", {
	refresh: function (frm) {
		frm.toggle_enable("new_item_code", frm.is_new());
		frm.set_query("new_item_code", () => {
			return {
				query: "erpnext.selling.doctype.product_bundle.product_bundle.get_new_item_code",
			};
		});
<<<<<<< HEAD

		frm.set_query("item_code", "items", () => {
			return {
				filters: {
					has_variants: 0,
				},
			};
		});
=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	},
});
