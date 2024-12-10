# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt
<<<<<<< HEAD

import unittest

import frappe

test_ignore = ["Leave Block List"]


class TestDepartment(unittest.TestCase):
=======
import unittest

import frappe
from frappe.tests import IntegrationTestCase

IGNORE_TEST_RECORD_DEPENDENCIES = ["Leave Block List"]


class TestDepartment(IntegrationTestCase):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	def test_remove_department_data(self):
		doc = create_department("Test Department")
		frappe.delete_doc("Department", doc.name)


def create_department(department_name, parent_department=None):
	doc = frappe.get_doc(
		{
			"doctype": "Department",
			"is_group": 0,
			"parent_department": parent_department,
			"department_name": department_name,
			"company": frappe.defaults.get_defaults().company,
		}
	).insert()

	return doc
<<<<<<< HEAD


test_records = frappe.get_test_records("Department")
=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
