# Copyright (c) 2019, Frappe Technologies Pvt. Ltd. and Contributors
# See license.txt
<<<<<<< HEAD

=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
import datetime
import unittest

import frappe
<<<<<<< HEAD
=======
from frappe.tests import IntegrationTestCase
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

LEAD_EMAIL = "test_appointment_lead@example.com"


def create_test_appointment():
	test_appointment = frappe.get_doc(
		{
			"doctype": "Appointment",
			"status": "Open",
			"customer_name": "Test Lead",
			"customer_phone_number": "666",
			"customer_skype": "test",
			"customer_email": LEAD_EMAIL,
			"scheduled_time": datetime.datetime.now(),
			"customer_details": "Hello, Friend!",
		}
	)
	test_appointment.insert()
	return test_appointment


<<<<<<< HEAD
class TestAppointment(unittest.TestCase):
	def setUpClass():
=======
class TestAppointment(IntegrationTestCase):
	@classmethod
	def setUpClass(cls):
		super().setUpClass()
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		frappe.db.delete("Lead", {"email_id": LEAD_EMAIL})

	def setUp(self):
		self.test_appointment = create_test_appointment()
		self.test_appointment.set_verified(self.test_appointment.customer_email)

	def test_calendar_event_created(self):
		cal_event = frappe.get_doc("Event", self.test_appointment.calendar_event)
		self.assertEqual(cal_event.starts_on, self.test_appointment.scheduled_time)

	def test_lead_linked(self):
		self.assertTrue(self.test_appointment.party)
