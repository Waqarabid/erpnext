import frappe
<<<<<<< HEAD
from frappe.tests.utils import FrappeTestCase

INDEXED_FIELDS = {
	"Bin": ["item_code"],
	"GL Entry": ["voucher_type", "against_voucher_type"],
=======
from frappe.tests import IntegrationTestCase

INDEXED_FIELDS = {
	"Bin": ["item_code"],
	"GL Entry": ["voucher_no", "posting_date", "company", "party"],
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	"Purchase Order Item": ["item_code"],
	"Stock Ledger Entry": ["warehouse"],
}


<<<<<<< HEAD
class TestPerformance(FrappeTestCase):
=======
class TestPerformance(IntegrationTestCase):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	def test_ensure_indexes(self):
		# These fields are not explicitly indexed BUT they are prefix in some
		# other composite index. If those are removed this test should be
		# updated accordingly.
		for doctype, fields in INDEXED_FIELDS.items():
			for field in fields:
				self.assertTrue(
					frappe.db.sql(
						f"""SHOW INDEX FROM `tab{doctype}`
						WHERE Column_name = "{field}" AND Seq_in_index = 1"""
					)
				)
