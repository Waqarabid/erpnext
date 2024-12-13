// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.ui.form.on("Fiscal Year", {
	onload: function (frm) {
		if (frm.doc.__islocal) {
<<<<<<< HEAD
			frm.set_value(
				"year_start_date",
				frappe.datetime.add_days(frappe.defaults.get_default("year_end_date"), 1)
			);
=======
			frm.set_value("year_start_date", frappe.datetime.year_start());
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		}
	},
	year_start_date: function (frm) {
		if (!frm.doc.is_short_year) {
			let year_end_date = frappe.datetime.add_days(
				frappe.datetime.add_months(frm.doc.year_start_date, 12),
				-1
			);
			frm.set_value("year_end_date", year_end_date);
		}
	},
});
