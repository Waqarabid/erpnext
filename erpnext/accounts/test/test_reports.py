import unittest

<<<<<<< HEAD
=======
from frappe.tests import IntegrationTestCase

>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
from erpnext.tests.utils import ReportFilters, ReportName, execute_script_report

DEFAULT_FILTERS = {
	"company": "_Test Company",
	"from_date": "2010-01-01",
	"to_date": "2030-01-01",
	"period_start_date": "2010-01-01",
	"period_end_date": "2030-01-01",
}


REPORT_FILTER_TEST_CASES: list[tuple[ReportName, ReportFilters]] = [
	("General Ledger", {"group_by": "Group by Voucher (Consolidated)"}),
	("General Ledger", {"group_by": "Group by Voucher (Consolidated)", "include_dimensions": 1}),
<<<<<<< HEAD
	("Accounts Payable", {"range1": 30, "range2": 60, "range3": 90, "range4": 120}),
	("Accounts Receivable", {"range1": 30, "range2": 60, "range3": 90, "range4": 120}),
=======
	("Accounts Payable", {"range": "30, 60, 90, 120"}),
	("Accounts Receivable", {"range": "30, 60, 90, 120"}),
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	("Consolidated Financial Statement", {"report": "Balance Sheet"}),
	("Consolidated Financial Statement", {"report": "Profit and Loss Statement"}),
	("Consolidated Financial Statement", {"report": "Cash Flow"}),
	("Gross Profit", {"group_by": "Invoice"}),
	("Gross Profit", {"group_by": "Item Code"}),
	("Gross Profit", {"group_by": "Item Group"}),
	("Gross Profit", {"group_by": "Customer"}),
	("Gross Profit", {"group_by": "Customer Group"}),
	("Item-wise Sales Register", {}),
	("Item-wise Purchase Register", {}),
	("Sales Register", {}),
	("Sales Register", {"item_group": "All Item Groups"}),
	("Purchase Register", {}),
<<<<<<< HEAD
	(
		"Tax Detail",
		{"mode": "run", "report_name": "Tax Detail"},
	),
=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
]

OPTIONAL_FILTERS = {}


<<<<<<< HEAD
class TestReports(unittest.TestCase):
=======
class TestReports(IntegrationTestCase):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	def test_execute_all_accounts_reports(self):
		"""Test that all script report in stock modules are executable with supported filters"""
		for report, filter in REPORT_FILTER_TEST_CASES:
			with self.subTest(report=report):
				execute_script_report(
					report_name=report,
					module="Accounts",
					filters=filter,
					default_filters=DEFAULT_FILTERS,
					optional_filters=OPTIONAL_FILTERS if filter.get("_optional") else None,
				)
