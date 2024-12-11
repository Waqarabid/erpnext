# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt


import frappe
<<<<<<< HEAD
from frappe.tests.utils import FrappeTestCase


class TestPurchaseOrder(FrappeTestCase):
	def test_make_purchase_order(self):
		from erpnext.buying.doctype.supplier_quotation.supplier_quotation import make_purchase_order

		sq = frappe.copy_doc(test_records[0]).insert()
=======
from frappe.tests import IntegrationTestCase, UnitTestCase

from erpnext.controllers.accounts_controller import InvalidQtyError


class UnitTestSupplierQuotation(UnitTestCase):
	"""
	Unit tests for SupplierQuotation.
	Use this class for testing individual functions and methods.
	"""

	pass


class TestPurchaseOrder(IntegrationTestCase):
	def test_supplier_quotation_qty(self):
		sq = frappe.copy_doc(self.globalTestRecords["Supplier Quotation"][0])
		sq.items[0].qty = 0
		with self.assertRaises(InvalidQtyError):
			sq.save()

		# No error with qty=1
		sq.items[0].qty = 1
		sq.save()
		self.assertEqual(sq.items[0].qty, 1)

	def test_make_purchase_order(self):
		from erpnext.buying.doctype.supplier_quotation.supplier_quotation import make_purchase_order

		sq = frappe.copy_doc(self.globalTestRecords["Supplier Quotation"][0]).insert()
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)

		self.assertRaises(frappe.ValidationError, make_purchase_order, sq.name)

		sq = frappe.get_doc("Supplier Quotation", sq.name)
		sq.submit()
		po = make_purchase_order(sq.name)

		self.assertEqual(po.doctype, "Purchase Order")
		self.assertEqual(len(po.get("items")), len(sq.get("items")))

		po.naming_series = "_T-Purchase Order-"

		for doc in po.get("items"):
			if doc.get("item_code"):
				doc.set("schedule_date", "2013-04-12")

		po.insert()
<<<<<<< HEAD


test_records = frappe.get_test_records("Supplier Quotation")
=======
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
