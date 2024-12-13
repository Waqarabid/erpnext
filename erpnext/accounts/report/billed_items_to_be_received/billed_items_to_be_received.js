// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt
<<<<<<< HEAD
/* eslint-disable */
=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

frappe.query_reports["Billed Items To Be Received"] = {
	filters: [
		{
			label: __("Company"),
			fieldname: "company",
			fieldtype: "Link",
			options: "Company",
			reqd: 1,
			default: frappe.defaults.get_default("Company"),
		},
		{
			label: __("As on Date"),
			fieldname: "posting_date",
			fieldtype: "Date",
			reqd: 1,
<<<<<<< HEAD
			default: get_today(),
=======
			default: frappe.datetime.get_today(),
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		},
		{
			label: __("Purchase Invoice"),
			fieldname: "purchase_invoice",
			fieldtype: "Link",
			options: "Purchase Invoice",
		},
	],
};
