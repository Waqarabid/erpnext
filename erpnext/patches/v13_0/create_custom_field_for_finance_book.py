import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields


def execute():
	company = frappe.get_all("Company", filters={"country": "India"})
	if not company:
		return

	custom_field = {
		"Finance Book": [
			{
				"fieldname": "for_income_tax",
				"label": "For Income Tax",
				"fieldtype": "Check",
				"insert_after": "finance_book_name",
<<<<<<< HEAD
				"description": "If the asset is put to use for less than 180 days in the first year, the first year's depreciation rate will be reduced by 50%.",
=======
				"description": "If the asset is put to use for less than 180 days, the first Depreciation Rate will be reduced by 50%.",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			}
		]
	}
	create_custom_fields(custom_field, update=1)
