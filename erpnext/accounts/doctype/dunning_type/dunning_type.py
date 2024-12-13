# Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt


<<<<<<< HEAD
# import frappe
=======
import frappe
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
from frappe.model.document import Document


class DunningType(Document):
<<<<<<< HEAD
	pass
=======
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		from erpnext.accounts.doctype.dunning_letter_text.dunning_letter_text import DunningLetterText

		company: DF.Link
		cost_center: DF.Link | None
		dunning_fee: DF.Currency
		dunning_letter_text: DF.Table[DunningLetterText]
		dunning_type: DF.Data
		income_account: DF.Link | None
		is_default: DF.Check
		rate_of_interest: DF.Float
	# end: auto-generated types

	def autoname(self):
		company_abbr = frappe.get_value("Company", self.company, "abbr")
		self.name = f"{self.dunning_type} - {company_abbr}"
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
