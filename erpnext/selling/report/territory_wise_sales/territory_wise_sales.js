// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt
<<<<<<< HEAD
/* eslint-disable */
=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

frappe.query_reports["Territory-wise Sales"] = {
	breadcrumb: "Selling",
	filters: [
		{
			fieldname: "transaction_date",
			label: __("Transaction Date"),
			fieldtype: "DateRange",
			default: [
				frappe.datetime.add_months(frappe.datetime.get_today(), -1),
				frappe.datetime.get_today(),
			],
		},
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "Link",
			options: "Company",
		},
	],
};
