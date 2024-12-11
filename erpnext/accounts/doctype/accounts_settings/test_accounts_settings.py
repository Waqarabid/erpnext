import unittest

import frappe
<<<<<<< HEAD


class TestAccountsSettings(unittest.TestCase):
=======
from frappe.tests import IntegrationTestCase


class TestAccountsSettings(IntegrationTestCase):
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
	def tearDown(self):
		# Just in case `save` method succeeds, we need to take things back to default so that other tests
		# don't break
		cur_settings = frappe.get_doc("Accounts Settings", "Accounts Settings")
		cur_settings.allow_stale = 1
		cur_settings.save()

	def test_stale_days(self):
		cur_settings = frappe.get_doc("Accounts Settings", "Accounts Settings")
		cur_settings.allow_stale = 0
		cur_settings.stale_days = 0

		self.assertRaises(frappe.ValidationError, cur_settings.save)

		cur_settings.stale_days = -1
		self.assertRaises(frappe.ValidationError, cur_settings.save)
