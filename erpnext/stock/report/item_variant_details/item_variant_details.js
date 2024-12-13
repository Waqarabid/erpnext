// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt
<<<<<<< HEAD
/* eslint-disable */
=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

frappe.query_reports["Item Variant Details"] = {
	filters: [
		{
			reqd: 1,
			default: "",
			options: "Item",
			label: __("Item"),
			fieldname: "item",
			fieldtype: "Link",
			get_query: () => {
				return {
					filters: { has_variants: 1 },
				};
			},
		},
	],
};
