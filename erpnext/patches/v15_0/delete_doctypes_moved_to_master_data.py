import frappe


def execute():
	doctypes = [
		"Supplier",
		"Activity Type",
		"Bank Transaction Mapping",
		"Bank",
		"Branch",
		"Brand",
		"Designation",
		"Driving License Category",
		"Employee Education",
		"Employee External Work History",
		"Holiday",
		"Holiday List",
		"Item Website Specification",
		"Print Heading",
	]
	for doctype in doctypes:
		frappe.delete_doc("DocType", doctype, ignore_missing=True)
