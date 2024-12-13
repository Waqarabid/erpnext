// Copyright (c) 2017, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

<<<<<<< HEAD
/* global frappe, __ */

=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
frappe.listview_settings["Supplier Scorecard"] = {
	add_fields: ["indicator_color", "status"],
	get_indicator: function (doc) {
		if (doc.indicator_color) {
			return [__(doc.status), doc.indicator_color.toLowerCase(), "status,=," + doc.status];
		} else {
			return [__("Unknown"), "gray", "status,=,''"];
		}
	},
};
