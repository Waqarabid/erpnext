# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

<<<<<<< HEAD
test_dependencies = ["Employee"]

import frappe

test_records = frappe.get_test_records("Sales Person")

test_ignore = ["Item Group"]
=======
EXTRA_TEST_RECORD_DEPENDENCIES = ["Employee"]

import frappe

IGNORE_TEST_RECORD_DEPENDENCIES = ["Item Group"]
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
