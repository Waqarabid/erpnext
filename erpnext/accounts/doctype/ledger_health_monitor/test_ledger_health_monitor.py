# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt

# import frappe
<<<<<<< HEAD
from frappe.tests.utils import FrappeTestCase


class TestLedgerHealthMonitor(FrappeTestCase):
=======
from frappe.tests import IntegrationTestCase, UnitTestCase


class UnitTestLedgerHealthMonitor(UnitTestCase):
	"""
	Unit tests for LedgerHealthMonitor.
	Use this class for testing individual functions and methods.
	"""

	pass


class TestLedgerHealthMonitor(IntegrationTestCase):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	pass
