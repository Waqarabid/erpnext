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
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
