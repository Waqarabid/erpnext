# Copyright (c) 2018, Frappe and Contributors
# See license.txt
<<<<<<< HEAD

import unittest


class TestQualityAction(unittest.TestCase):
=======
import unittest

from frappe.tests import IntegrationTestCase


class TestQualityAction(IntegrationTestCase):
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
	# quality action has no code
	pass
