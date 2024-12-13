<<<<<<< HEAD
# Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt

import unittest

import frappe
from frappe.utils import add_days, nowdate, today

from erpnext.accounts.doctype.dunning.dunning import calculate_interest_and_amount
=======
# Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt
import frappe
from frappe.tests import IntegrationTestCase, UnitTestCase
from frappe.utils import add_days, nowdate, today

from erpnext import get_default_cost_center
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
from erpnext.accounts.doctype.payment_entry.test_payment_entry import get_payment_entry
from erpnext.accounts.doctype.purchase_invoice.test_purchase_invoice import (
	unlink_payment_on_cancel_of_invoice,
)
<<<<<<< HEAD
=======
from erpnext.accounts.doctype.sales_invoice.sales_invoice import (
	create_dunning as create_dunning_from_sales_invoice,
)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
from erpnext.accounts.doctype.sales_invoice.test_sales_invoice import (
	create_sales_invoice_against_cost_center,
)

<<<<<<< HEAD

class TestDunning(unittest.TestCase):
	@classmethod
	def setUpClass(self):
		create_dunning_type()
		create_dunning_type_with_zero_interest_rate()
		unlink_payment_on_cancel_of_invoice()

	@classmethod
	def tearDownClass(self):
		unlink_payment_on_cancel_of_invoice(0)

	def test_dunning(self):
		dunning = create_dunning()
		amounts = calculate_interest_and_amount(
			dunning.outstanding_amount, dunning.rate_of_interest, dunning.dunning_fee, dunning.overdue_days
		)
		self.assertEqual(round(amounts.get("interest_amount"), 2), 0.44)
		self.assertEqual(round(amounts.get("dunning_amount"), 2), 20.44)
		self.assertEqual(round(amounts.get("grand_total"), 2), 120.44)

	def test_dunning_with_zero_interest_rate(self):
		dunning = create_dunning_with_zero_interest_rate()
		amounts = calculate_interest_and_amount(
			dunning.outstanding_amount, dunning.rate_of_interest, dunning.dunning_fee, dunning.overdue_days
		)
		self.assertEqual(round(amounts.get("interest_amount"), 2), 0)
		self.assertEqual(round(amounts.get("dunning_amount"), 2), 20)
		self.assertEqual(round(amounts.get("grand_total"), 2), 120)

	def test_gl_entries(self):
		dunning = create_dunning()
		dunning.submit()
		gl_entries = frappe.db.sql(
			"""select account, debit, credit
			from `tabGL Entry` where voucher_type='Dunning' and voucher_no=%s
			order by account asc""",
			dunning.name,
			as_dict=1,
		)
		self.assertTrue(gl_entries)
		expected_values = dict(
			(d[0], d) for d in [["Debtors - _TC", 20.44, 0.0], ["Sales - _TC", 0.0, 20.44]]
		)
		for gle in gl_entries:
			self.assertEqual(expected_values[gle.account][0], gle.account)
			self.assertEqual(expected_values[gle.account][1], gle.debit)
			self.assertEqual(expected_values[gle.account][2], gle.credit)

	def test_payment_entry(self):
		dunning = create_dunning()
=======
EXTRA_TEST_RECORD_DEPENDENCIES = ["Company", "Cost Center"]


class UnitTestDunning(UnitTestCase):
	"""
	Unit tests for Dunning.
	Use this class for testing individual functions and methods.
	"""

	pass


class TestDunning(IntegrationTestCase):
	@classmethod
	def setUpClass(cls):
		super().setUpClass()
		create_dunning_type("First Notice", fee=0.0, interest=0.0, is_default=1)
		create_dunning_type("Second Notice", fee=10.0, interest=10.0, is_default=0)
		unlink_payment_on_cancel_of_invoice()

	@classmethod
	def tearDownClass(cls):
		unlink_payment_on_cancel_of_invoice(0)
		super().tearDownClass()

	def test_dunning_without_fees(self):
		dunning = create_dunning(overdue_days=20)

		self.assertEqual(round(dunning.total_outstanding, 2), 100.00)
		self.assertEqual(round(dunning.total_interest, 2), 0.00)
		self.assertEqual(round(dunning.dunning_fee, 2), 0.00)
		self.assertEqual(round(dunning.dunning_amount, 2), 0.00)
		self.assertEqual(round(dunning.grand_total, 2), 100.00)

	def test_dunning_with_fees_and_interest(self):
		dunning = create_dunning(overdue_days=15, dunning_type_name="Second Notice - _TC")

		self.assertEqual(round(dunning.total_outstanding, 2), 100.00)
		self.assertEqual(round(dunning.total_interest, 2), 0.41)
		self.assertEqual(round(dunning.dunning_fee, 2), 10.00)
		self.assertEqual(round(dunning.dunning_amount, 2), 10.41)
		self.assertEqual(round(dunning.grand_total, 2), 110.41)

	def test_dunning_with_payment_entry(self):
		dunning = create_dunning(overdue_days=15, dunning_type_name="Second Notice - _TC")
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		dunning.submit()
		pe = get_payment_entry("Dunning", dunning.name)
		pe.reference_no = "1"
		pe.reference_date = nowdate()
<<<<<<< HEAD
		pe.paid_from_account_currency = dunning.currency
		pe.paid_to_account_currency = dunning.currency
		pe.source_exchange_rate = 1
		pe.target_exchange_rate = 1
		pe.insert()
		pe.submit()
		si_doc = frappe.get_doc("Sales Invoice", dunning.sales_invoice)
		self.assertEqual(si_doc.outstanding_amount, 0)


def create_dunning():
	posting_date = add_days(today(), -20)
	due_date = add_days(today(), -15)
	sales_invoice = create_sales_invoice_against_cost_center(
		posting_date=posting_date, due_date=due_date, status="Overdue"
	)
	dunning_type = frappe.get_doc("Dunning Type", "First Notice")
	dunning = frappe.new_doc("Dunning")
	dunning.sales_invoice = sales_invoice.name
	dunning.customer_name = sales_invoice.customer_name
	dunning.outstanding_amount = sales_invoice.outstanding_amount
	dunning.debit_to = sales_invoice.debit_to
	dunning.currency = sales_invoice.currency
	dunning.company = sales_invoice.company
	dunning.posting_date = nowdate()
	dunning.due_date = sales_invoice.due_date
	dunning.dunning_type = "First Notice"
	dunning.rate_of_interest = dunning_type.rate_of_interest
	dunning.dunning_fee = dunning_type.dunning_fee
	dunning.save()
	return dunning


def create_dunning_with_zero_interest_rate():
	posting_date = add_days(today(), -20)
	due_date = add_days(today(), -15)
	sales_invoice = create_sales_invoice_against_cost_center(
		posting_date=posting_date, due_date=due_date, status="Overdue"
	)
	dunning_type = frappe.get_doc("Dunning Type", "First Notice with 0% Rate of Interest")
	dunning = frappe.new_doc("Dunning")
	dunning.sales_invoice = sales_invoice.name
	dunning.customer_name = sales_invoice.customer_name
	dunning.outstanding_amount = sales_invoice.outstanding_amount
	dunning.debit_to = sales_invoice.debit_to
	dunning.currency = sales_invoice.currency
	dunning.company = sales_invoice.company
	dunning.posting_date = nowdate()
	dunning.due_date = sales_invoice.due_date
	dunning.dunning_type = "First Notice with 0% Rate of Interest"
	dunning.rate_of_interest = dunning_type.rate_of_interest
	dunning.dunning_fee = dunning_type.dunning_fee
	dunning.save()
	return dunning


def create_dunning_type():
	dunning_type = frappe.new_doc("Dunning Type")
	dunning_type.dunning_type = "First Notice"
	dunning_type.start_day = 10
	dunning_type.end_day = 20
	dunning_type.dunning_fee = 20
	dunning_type.rate_of_interest = 8
=======
		pe.insert()
		pe.submit()

		for overdue_payment in dunning.overdue_payments:
			outstanding_amount = frappe.get_value(
				"Sales Invoice", overdue_payment.sales_invoice, "outstanding_amount"
			)
			self.assertEqual(outstanding_amount, 0)

		dunning.reload()
		self.assertEqual(dunning.status, "Resolved")

	def test_dunning_and_payment_against_partially_due_invoice(self):
		"""
		Create SI with first installment overdue. Check impact of Dunning and Payment Entry.
		"""
		create_payment_terms_template_for_dunning()
		sales_invoice = create_sales_invoice_against_cost_center(
			posting_date=add_days(today(), -1 * 6),
			qty=1,
			rate=100,
			do_not_submit=True,
		)
		sales_invoice.payment_terms_template = "_Test 50-50 for Dunning"
		sales_invoice.submit()
		dunning = create_dunning_from_sales_invoice(sales_invoice.name)

		self.assertEqual(len(dunning.overdue_payments), 1)
		self.assertEqual(dunning.overdue_payments[0].payment_term, "_Test Payment Term 1 for Dunning")

		dunning.submit()
		pe = get_payment_entry("Dunning", dunning.name)
		pe.reference_no, pe.reference_date = "2", nowdate()
		pe.insert()
		pe.submit()
		sales_invoice.load_from_db()
		dunning.load_from_db()

		self.assertEqual(sales_invoice.status, "Partly Paid")
		self.assertEqual(sales_invoice.payment_schedule[0].outstanding, 0)
		self.assertEqual(dunning.status, "Resolved")

		# Test impact on cancellation of PE
		pe.cancel()
		sales_invoice.reload()
		dunning.reload()

		self.assertEqual(sales_invoice.status, "Overdue")
		self.assertEqual(dunning.status, "Unresolved")


def create_dunning(overdue_days, dunning_type_name=None):
	posting_date = add_days(today(), -1 * overdue_days)
	sales_invoice = create_sales_invoice_against_cost_center(posting_date=posting_date, qty=1, rate=100)
	dunning = create_dunning_from_sales_invoice(sales_invoice.name)

	if dunning_type_name:
		dunning_type = frappe.get_doc("Dunning Type", dunning_type_name)
		dunning.dunning_type = dunning_type.name
		dunning.rate_of_interest = dunning_type.rate_of_interest
		dunning.dunning_fee = dunning_type.dunning_fee
		dunning.income_account = dunning_type.income_account
		dunning.cost_center = dunning_type.cost_center

	return dunning.save()


def create_dunning_type(title, fee, interest, is_default):
	company = "_Test Company"
	if frappe.db.exists("Dunning Type", f"{title} - _TC"):
		return

	dunning_type = frappe.new_doc("Dunning Type")
	dunning_type.dunning_type = title
	dunning_type.company = company
	dunning_type.is_default = is_default
	dunning_type.dunning_fee = fee
	dunning_type.rate_of_interest = interest
	dunning_type.income_account = get_income_account(company)
	dunning_type.cost_center = get_default_cost_center(company)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	dunning_type.append(
		"dunning_letter_text",
		{
			"language": "en",
<<<<<<< HEAD
			"body_text": "We have still not received payment for our invoice ",
			"closing_text": "We kindly request that you pay the outstanding amount immediately, including interest and late fees.",
		},
	)
	dunning_type.save()


def create_dunning_type_with_zero_interest_rate():
	dunning_type = frappe.new_doc("Dunning Type")
	dunning_type.dunning_type = "First Notice with 0% Rate of Interest"
	dunning_type.start_day = 10
	dunning_type.end_day = 20
	dunning_type.dunning_fee = 20
	dunning_type.rate_of_interest = 0
	dunning_type.append(
		"dunning_letter_text",
		{
			"language": "en",
			"body_text": "We have still not received payment for our invoice ",
			"closing_text": "We kindly request that you pay the outstanding amount immediately, and late fees.",
		},
	)
	dunning_type.save()
=======
			"body_text": "We have still not received payment for our invoice",
			"closing_text": "We kindly request that you pay the outstanding amount immediately, including interest and late fees.",
		},
	)
	dunning_type.insert()


def get_income_account(company):
	return (
		frappe.get_value("Company", company, "default_income_account")
		or frappe.get_all(
			"Account",
			filters={"is_group": 0, "company": company},
			or_filters={
				"report_type": "Profit and Loss",
				"account_type": ("in", ("Income Account", "Temporary")),
			},
			limit=1,
			pluck="name",
		)[0]
	)


def create_payment_terms_template_for_dunning():
	from erpnext.accounts.doctype.payment_entry.test_payment_entry import create_payment_term

	create_payment_term("_Test Payment Term 1 for Dunning")
	create_payment_term("_Test Payment Term 2 for Dunning")

	if not frappe.db.exists("Payment Terms Template", "_Test 50-50 for Dunning"):
		frappe.get_doc(
			{
				"doctype": "Payment Terms Template",
				"template_name": "_Test 50-50 for Dunning",
				"allocate_payment_based_on_payment_terms": 1,
				"terms": [
					{
						"doctype": "Payment Terms Template Detail",
						"payment_term": "_Test Payment Term 1 for Dunning",
						"invoice_portion": 50.00,
						"credit_days_based_on": "Day(s) after invoice date",
						"credit_days": 5,
					},
					{
						"doctype": "Payment Terms Template Detail",
						"payment_term": "_Test Payment Term 2 for Dunning",
						"invoice_portion": 50.00,
						"credit_days_based_on": "Day(s) after invoice date",
						"credit_days": 10,
					},
				],
			}
		).insert()
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
