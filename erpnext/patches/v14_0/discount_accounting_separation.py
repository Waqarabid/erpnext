import frappe


def execute():
	data = frappe.db.sql(
		'select value from tabSingles where doctype="Accounts Settings" and field="enable_discount_accounting"'
	)
	discount_account = data and int(data[0][0]) or 0
	if discount_account:
		for doctype in ["Buying Settings", "Selling Settings"]:
<<<<<<< HEAD
			frappe.db.set_value(doctype, doctype, "enable_discount_accounting", 1, update_modified=False)
=======
			frappe.db.set_single_value(doctype, "enable_discount_accounting", 1, update_modified=False)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
