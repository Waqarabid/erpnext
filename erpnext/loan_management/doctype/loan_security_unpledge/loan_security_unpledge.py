# -*- coding: utf-8 -*-
# Copyright (c) 2019, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import get_datetime
import json

class LoanSecurityUnpledge(Document):
	def validate(self):
		pledge_details = frappe.db.sql("""
			SELECT p.parent, p.loan_security, p.qty as qty , ls.loan_security_price FROM
				`tabLoan Security Pledge` lsp,
				`tabPledge` p,
				`tabLoan Security` ls
			WHERE
				p.parent = lsp.name
				AND p.loan_security = ls.name
				AND lsp.loan = %s
				AND lsp.docstatus = 1
				AND lsp.status = "Pledged"
		""",(self.loan), as_dict=1)

		loan = frappe.get_doc("Loan", self.loan)

		pledge_qty_map = {}
		security_price_map = {}
		remaining_qty = 0
		unpledge_value = 0

		for pledge in pledge_details:
			pledge_qty_map.setdefault((pledge.parent, pledge.loan_security), pledge.qty)
			security_price_map.setdefault(pledge.loan_security, pledge.loan_security_price)

		for security in self.securities:
			pledged_qty = pledge_qty_map.get((security.against_pledge, security.loan_security), 0)
			if not pledged_qty:
				frappe.throw(_("Zero qty of {0} pledged against loan {0}").format(frappe.bold(security.loan_security),
					frappe.bold(self.loan)))

			unpledge_qty = pledged_qty - security.qty
			security_price = security.qty * security_price_map.get(security.loan_security)

			if unpledge_qty < 0:
				frappe.throw("Cannot unpledge more than {0} qty of {0}".format(frappe.bold(pledged_qty),
					frappe.bold(security.loan_security)))

			remaining_qty += unpledge_qty
			unpledge_value += security_price - (security_price * security.haircut/100)

		if unpledge_value > loan.total_principal_paid:
			frappe.throw(_("Cannot Unpledge, loan security value is greater than the repaid amount"))

		if not remaining_qty:
			self.db_set('unpledge_type', 'Unpledged')
		else:
			self.db_set('unpledge_type', 'Partially Pledged')

@frappe.whitelist()
def approve_unpledge_request(loan, unpledge_request, unpledge_type):

	frappe.db.sql("""
		UPDATE
			`tabPledge` p, `tabUnpledge` u, `tabLoan Security Pledge` lsp,
			`tabLoan Security Unpledge` lsu SET p.qty = (p.qty - u.qty)
		WHERE
			lsp.loan = %s
			AND lsu.status = 'Requested'
			AND u.parent = %s
			AND p.parent = u.against_pledge
			AND p.loan_security = u.loan_security""",(loan, unpledge_request), debug=1)

	frappe.db.sql("""UPDATE `tabLoan Security Unpledge`
		SET status = "Approved", unpledge_time = %s
		WHERE name = %s""", (get_datetime(), unpledge_request))

	frappe.db.sql("""UPDATE `tabLoan Security Pledge`
		SET status = %s WHERE loan = %s""", (unpledge_type, loan))

	if unpledge_type == 'Unpledged':
		frappe.db.set_value("Loan", loan, 'status', 'Closed')