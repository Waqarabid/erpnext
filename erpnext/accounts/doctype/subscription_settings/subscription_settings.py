# Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt


from frappe.model.document import Document


class SubscriptionSettings(Document):
<<<<<<< HEAD
=======
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		cancel_after_grace: DF.Check
		grace_period: DF.Int
		prorate: DF.Check
	# end: auto-generated types

>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	pass
