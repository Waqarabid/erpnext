import frappe
from frappe.utils.nestedset import rebuild_tree


def execute():
	frappe.reload_doc("setup", "doctype", "company")
<<<<<<< HEAD
	rebuild_tree("Company", "parent_company")
=======
	rebuild_tree("Company")
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
