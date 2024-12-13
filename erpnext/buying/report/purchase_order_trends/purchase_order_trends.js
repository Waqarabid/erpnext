// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

<<<<<<< HEAD
frappe.require("assets/erpnext/js/purchase_trends_filters.js", function () {
	frappe.query_reports["Purchase Order Trends"] = {
		filters: erpnext.get_purchase_trends_filters(),
	};
=======
frappe.query_reports["Purchase Order Trends"] = $.extend({}, erpnext.purchase_trends_filters);

frappe.query_reports["Purchase Order Trends"]["filters"].push({
	fieldname: "include_closed_orders",
	label: __("Include Closed Orders"),
	fieldtype: "Check",
	default: 0,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
});
