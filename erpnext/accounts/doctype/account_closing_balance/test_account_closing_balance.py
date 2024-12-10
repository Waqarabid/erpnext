# Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt

# import frappe
<<<<<<< HEAD
from frappe.tests.utils import FrappeTestCase


class TestAccountClosingBalance(FrappeTestCase):
=======
from frappe.tests import IntegrationTestCase, UnitTestCase


class UnitTestAccountClosingBalance(UnitTestCase):
	"""
	Unit tests for AccountClosingBalance.
	Use this class for testing individual functions and methods.
	"""

	pass


class TestAccountClosingBalance(IntegrationTestCase):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	pass
