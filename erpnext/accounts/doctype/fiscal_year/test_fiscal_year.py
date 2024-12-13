# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt
<<<<<<< HEAD


import unittest

import frappe
from frappe.utils import now_datetime

from erpnext.accounts.doctype.fiscal_year.fiscal_year import FiscalYearIncorrectDate

test_ignore = ["Company"]


class TestFiscalYear(unittest.TestCase):
=======
import unittest

import frappe
from frappe.tests import IntegrationTestCase
from frappe.utils import now_datetime

IGNORE_TEST_RECORD_DEPENDENCIES = ["Company"]


class TestFiscalYear(IntegrationTestCase):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	def test_extra_year(self):
		if frappe.db.exists("Fiscal Year", "_Test Fiscal Year 2000"):
			frappe.delete_doc("Fiscal Year", "_Test Fiscal Year 2000")

		fy = frappe.get_doc(
			{
				"doctype": "Fiscal Year",
				"year": "_Test Fiscal Year 2000",
				"year_end_date": "2002-12-31",
				"year_start_date": "2000-04-01",
			}
		)

<<<<<<< HEAD
		self.assertRaises(FiscalYearIncorrectDate, fy.insert)
=======
		self.assertRaises(frappe.exceptions.InvalidDates, fy.insert)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)


def test_record_generator():
	test_records = [
		{
			"doctype": "Fiscal Year",
			"year": "_Test Short Fiscal Year 2011",
			"is_short_year": 1,
<<<<<<< HEAD
			"year_end_date": "2011-04-01",
			"year_start_date": "2011-12-31",
=======
			"year_start_date": "2011-04-01",
			"year_end_date": "2011-12-31",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		}
	]

	start = 2012
<<<<<<< HEAD
	end = now_datetime().year + 25
	for year in range(start, end):
=======
	this_year = now_datetime().year
	end = now_datetime().year + 25
	# The current year fails to load with the following error:
	# Year start date or end date is overlapping with 2024. To avoid please set company
	# This is a quick-fix: if current FY is needed, please refactor test data properly
	for year in range(start, this_year):
		test_records.append(
			{
				"doctype": "Fiscal Year",
				"year": f"_Test Fiscal Year {year}",
				"year_start_date": f"{year}-01-01",
				"year_end_date": f"{year}-12-31",
			}
		)
	for year in range(this_year + 1, end):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		test_records.append(
			{
				"doctype": "Fiscal Year",
				"year": f"_Test Fiscal Year {year}",
				"year_start_date": f"{year}-01-01",
				"year_end_date": f"{year}-12-31",
			}
		)

	return test_records


test_records = test_record_generator()
