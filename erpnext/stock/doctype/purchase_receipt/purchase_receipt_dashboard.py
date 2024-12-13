from frappe import _


def get_data():
	return {
		"fieldname": "purchase_receipt_no",
		"non_standard_fieldnames": {
			"Purchase Invoice": "purchase_receipt",
			"Asset": "purchase_receipt",
			"Landed Cost Voucher": "receipt_document",
			"Auto Repeat": "reference_document",
			"Purchase Receipt": "return_against",
<<<<<<< HEAD
=======
			"Stock Reservation Entry": "from_voucher_no",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		},
		"internal_links": {
			"Material Request": ["items", "material_request"],
			"Purchase Order": ["items", "purchase_order"],
			"Project": ["items", "project"],
			"Quality Inspection": ["items", "quality_inspection"],
		},
		"transactions": [
<<<<<<< HEAD
			{"label": _("Related"), "items": ["Purchase Invoice", "Landed Cost Voucher", "Asset"]},
=======
			{
				"label": _("Related"),
				"items": ["Purchase Invoice", "Landed Cost Voucher", "Asset", "Stock Reservation Entry"],
			},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			{
				"label": _("Reference"),
				"items": ["Material Request", "Purchase Order", "Quality Inspection", "Project"],
			},
			{"label": _("Returns"), "items": ["Purchase Receipt"]},
			{"label": _("Subscription"), "items": ["Auto Repeat"]},
		],
	}
