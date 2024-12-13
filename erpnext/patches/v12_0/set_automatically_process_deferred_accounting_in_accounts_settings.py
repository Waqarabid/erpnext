import frappe


def execute():
	frappe.reload_doc("accounts", "doctype", "accounts_settings")

<<<<<<< HEAD
	frappe.db.set_value("Accounts Settings", None, "automatically_process_deferred_accounting_entry", 1)
=======
	frappe.db.set_single_value("Accounts Settings", "automatically_process_deferred_accounting_entry", 1)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
