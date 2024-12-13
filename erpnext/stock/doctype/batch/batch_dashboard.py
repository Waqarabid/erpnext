from frappe import _


def get_data():
	return {
		"fieldname": "batch_no",
		"transactions": [
			{"label": _("Buy"), "items": ["Purchase Invoice", "Purchase Receipt"]},
			{"label": _("Sell"), "items": ["Sales Invoice", "Delivery Note"]},
<<<<<<< HEAD
			{"label": _("Move"), "items": ["Stock Entry"]},
=======
			{"label": _("Move"), "items": ["Serial and Batch Bundle"]},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			{"label": _("Quality"), "items": ["Quality Inspection"]},
		],
	}
