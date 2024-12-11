# Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt


# import frappe
from frappe.model.document import Document


class AdvanceTaxesandCharges(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		account_head: DF.Link
		add_deduct_tax: DF.Literal["Add", "Deduct"]
		allocated_amount: DF.Currency
<<<<<<< HEAD
=======
		base_net_amount: DF.Currency
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
		base_tax_amount: DF.Currency
		base_total: DF.Currency
		charge_type: DF.Literal[
			"", "Actual", "On Paid Amount", "On Previous Row Amount", "On Previous Row Total"
		]
		cost_center: DF.Link | None
		currency: DF.Link | None
		description: DF.SmallText
		included_in_paid_amount: DF.Check
<<<<<<< HEAD
=======
		net_amount: DF.Currency
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		rate: DF.Float
		row_id: DF.Data | None
<<<<<<< HEAD
=======
		set_by_item_tax_template: DF.Check
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
		tax_amount: DF.Currency
		total: DF.Currency
	# end: auto-generated types

	pass
