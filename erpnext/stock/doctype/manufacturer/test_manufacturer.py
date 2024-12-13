# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt
<<<<<<< HEAD

import unittest

# test_records = frappe.get_test_records('Manufacturer')


class TestManufacturer(unittest.TestCase):
=======
import unittest

from frappe.tests import IntegrationTestCase


class TestManufacturer(IntegrationTestCase):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	pass
