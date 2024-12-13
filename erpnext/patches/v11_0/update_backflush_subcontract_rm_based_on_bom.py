# Copyright (c) 2017, Frappe and Contributors
# License: GNU General Public License v3. See license.txt


import frappe


def execute():
	frappe.reload_doc("buying", "doctype", "buying_settings")
<<<<<<< HEAD
	frappe.db.set_value("Buying Settings", None, "backflush_raw_materials_of_subcontract_based_on", "BOM")
=======
	frappe.db.set_single_value("Buying Settings", "backflush_raw_materials_of_subcontract_based_on", "BOM")
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

	frappe.reload_doc("stock", "doctype", "stock_entry_detail")
	frappe.db.sql(
		""" update `tabStock Entry Detail` as sed,
		`tabStock Entry` as se, `tabPurchase Order Item Supplied` as pois
		set
			sed.subcontracted_item = pois.main_item_code
		where
			se.purpose = 'Send to Subcontractor' and sed.parent = se.name
			and pois.rm_item_code = sed.item_code and se.docstatus = 1
			and pois.parenttype = 'Purchase Order'"""
	)
