# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors and contributors
# For license information, please see license.txt


from frappe.model.document import Document


class ItemVariantAttribute(Document):
<<<<<<< HEAD
=======
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		attribute: DF.Link
		attribute_value: DF.Data | None
		disabled: DF.Check
		from_range: DF.Float
		increment: DF.Float
		numeric_values: DF.Check
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		to_range: DF.Float
		variant_of: DF.Link | None
	# end: auto-generated types

>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	pass
