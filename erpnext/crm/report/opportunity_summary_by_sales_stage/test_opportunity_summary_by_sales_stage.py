import unittest

import frappe
<<<<<<< HEAD
=======
from frappe.tests import IntegrationTestCase
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

from erpnext.crm.report.opportunity_summary_by_sales_stage.opportunity_summary_by_sales_stage import (
	execute,
)
from erpnext.crm.report.sales_pipeline_analytics.test_sales_pipeline_analytics import (
	create_company,
	create_customer,
	create_opportunity,
)


<<<<<<< HEAD
class TestOpportunitySummaryBySalesStage(unittest.TestCase):
	@classmethod
	def setUpClass(self):
		frappe.db.delete("Opportunity")
=======
class TestOpportunitySummaryBySalesStage(IntegrationTestCase):
	@classmethod
	def setUpClass(cls):
		super().setUpClass()
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		create_company()
		create_customer()
		create_opportunity()

	def test_opportunity_summary_by_sales_stage(self):
		self.check_for_opportunity_owner()
		self.check_for_source()
		self.check_for_opportunity_type()
		self.check_all_filters()

	def check_for_opportunity_owner(self):
		filters = {"based_on": "Opportunity Owner", "data_based_on": "Number", "company": "Best Test"}

		report = execute(filters)

		expected_data = [{"opportunity_owner": "Not Assigned", "Prospecting": 1}]

		self.assertEqual(expected_data, report[1])

	def check_for_source(self):
		filters = {"based_on": "Source", "data_based_on": "Number", "company": "Best Test"}

		report = execute(filters)

<<<<<<< HEAD
		expected_data = [{"source": "Cold Calling", "Prospecting": 1}]
=======
		expected_data = [{"utm_source": "Cold Calling", "Prospecting": 1}]
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

		self.assertEqual(expected_data, report[1])

	def check_for_opportunity_type(self):
		filters = {"based_on": "Opportunity Type", "data_based_on": "Number", "company": "Best Test"}

		report = execute(filters)

		expected_data = [{"opportunity_type": "Sales", "Prospecting": 1}]

		self.assertEqual(expected_data, report[1])

	def check_all_filters(self):
		filters = {
			"based_on": "Opportunity Type",
			"data_based_on": "Number",
			"company": "Best Test",
			"opportunity_source": "Cold Calling",
			"opportunity_type": "Sales",
			"status": ["Open"],
		}

		report = execute(filters)

		expected_data = [{"opportunity_type": "Sales", "Prospecting": 1}]

		self.assertEqual(expected_data, report[1])
