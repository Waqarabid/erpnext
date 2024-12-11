# Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt
<<<<<<< HEAD

import unittest

import frappe


class TestProjectUpdate(unittest.TestCase):
	pass


test_records = frappe.get_test_records("Project Update")
test_ignore = ["Sales Order"]
=======
import unittest

import frappe
from frappe.tests import IntegrationTestCase


class TestProjectUpdate(IntegrationTestCase):
	pass


IGNORE_TEST_RECORD_DEPENDENCIES = ["Sales Order"]
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
