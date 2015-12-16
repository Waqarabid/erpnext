// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Stock Projected Qty"] = {
	"filters": [
		{
			"fieldname":"organization",
			"label": __("Organization"),
			"fieldtype": "Link",
			"options": "organization"
		},
		{
			"fieldname":"warehouse",
			"label": __("Warehouse"),
			"fieldtype": "Link",
			"options": "Warehouse"
		},
		{
			"fieldname":"item_code",
			"label": __("Item"),
			"fieldtype": "Link",
			"options": "Item"
		},
		{
			"fieldname":"brand",
			"label": __("Brand"),
			"fieldtype": "Link",
			"options": "Brand"
		}
	]
}