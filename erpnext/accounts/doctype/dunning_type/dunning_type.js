// Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Dunning Type", {
<<<<<<< HEAD
	// refresh: function(frm) {
	// }
=======
	setup: function (frm) {
		frm.set_query("income_account", () => {
			return {
				filters: {
					root_type: "Income",
					is_group: 0,
					company: frm.doc.company,
				},
			};
		});
		frm.set_query("cost_center", () => {
			return {
				filters: {
					is_group: 0,
					company: frm.doc.company,
				},
			};
		});
	},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
});
