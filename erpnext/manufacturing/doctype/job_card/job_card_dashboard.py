from frappe import _


def get_data():
	return {
		"fieldname": "job_card",
		"non_standard_fieldnames": {"Quality Inspection": "reference_name"},
		"transactions": [
			{"label": _("Transactions"), "items": ["Material Request", "Stock Entry"]},
<<<<<<< HEAD
=======
			{"label": _("Subcontracting"), "items": ["Purchase Order", "Subcontracting Order"]},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			{"label": _("Reference"), "items": ["Quality Inspection"]},
		],
	}
