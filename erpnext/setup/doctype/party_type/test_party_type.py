# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt
<<<<<<< HEAD

import unittest

# test_records = frappe.get_test_records('Party Type')


class TestPartyType(unittest.TestCase):
=======
import unittest

from frappe.tests import IntegrationTestCase


class TestPartyType(IntegrationTestCase):
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
	pass
