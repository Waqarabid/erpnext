# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors and Contributors
# See license.txt
<<<<<<< HEAD

import unittest

import frappe

test_records = frappe.get_test_records("Warranty Claim")


class TestWarrantyClaim(unittest.TestCase):
=======
import unittest

import frappe
from frappe.tests import IntegrationTestCase


class TestWarrantyClaim(IntegrationTestCase):
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
	pass
