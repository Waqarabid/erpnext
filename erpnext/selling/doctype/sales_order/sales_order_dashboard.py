from frappe import _


def get_data():
	return {
		"fieldname": "sales_order",
		"non_standard_fieldnames": {
			"Delivery Note": "against_sales_order",
			"Journal Entry": "reference_name",
			"Payment Entry": "reference_name",
			"Payment Request": "reference_name",
			"Auto Repeat": "reference_document",
			"Maintenance Visit": "prevdoc_docname",
<<<<<<< HEAD
=======
			"Stock Reservation Entry": "voucher_no",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		},
		"internal_links": {
			"Quotation": ["items", "prevdoc_docname"],
			"BOM": ["items", "bom_no"],
			"Blanket Order": ["items", "blanket_order"],
		},
		"transactions": [
			{
				"label": _("Fulfillment"),
				"items": ["Sales Invoice", "Pick List", "Delivery Note", "Maintenance Visit"],
			},
			{"label": _("Purchasing"), "items": ["Material Request", "Purchase Order"]},
			{"label": _("Projects"), "items": ["Project"]},
<<<<<<< HEAD
			{"label": _("Reference"), "items": ["Quotation", "Auto Repeat"]},
			{"label": _("Manufacturing"), "items": ["Work Order", "BOM", "Blanket Order"]},
=======
			{"label": _("Manufacturing"), "items": ["Work Order", "BOM", "Blanket Order"]},
			{"label": _("Reference"), "items": ["Quotation", "Auto Repeat", "Stock Reservation Entry"]},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			{"label": _("Payment"), "items": ["Payment Entry", "Payment Request", "Journal Entry"]},
		],
	}
