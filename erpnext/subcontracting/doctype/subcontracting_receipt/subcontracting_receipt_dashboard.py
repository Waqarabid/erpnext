from frappe import _


def get_data():
	return {
<<<<<<< HEAD
		"fieldname": "subcontracting_receipt_no",
=======
		"fieldname": "subcontracting_receipt",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		"non_standard_fieldnames": {
			"Subcontracting Receipt": "return_against",
		},
		"internal_links": {
			"Subcontracting Order": ["items", "subcontracting_order"],
<<<<<<< HEAD
=======
			"Purchase Order": ["items", "purchase_order"],
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			"Project": ["items", "project"],
			"Quality Inspection": ["items", "quality_inspection"],
		},
		"transactions": [
<<<<<<< HEAD
			{"label": _("Reference"), "items": ["Subcontracting Order", "Quality Inspection", "Project"]},
=======
			{
				"label": _("Reference"),
				"items": [
					"Purchase Order",
					"Purchase Receipt",
					"Subcontracting Order",
					"Quality Inspection",
					"Project",
				],
			},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			{"label": _("Returns"), "items": ["Subcontracting Receipt"]},
		],
	}
