# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

<<<<<<< HEAD
test_ignore = ["Price List"]


import frappe

test_records = frappe.get_test_records("Customer Group")
=======
IGNORE_TEST_RECORD_DEPENDENCIES = ["Price List"]


import frappe
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
