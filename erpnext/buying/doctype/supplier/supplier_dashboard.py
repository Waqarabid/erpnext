from frappe import _


def get_data():
	return {
<<<<<<< HEAD
		"heatmap": True,
		"heatmap_message": _(
			"This is based on transactions against this Supplier. See timeline below for details"
		),
=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		"fieldname": "supplier",
		"non_standard_fieldnames": {"Payment Entry": "party", "Bank Account": "party"},
		"dynamic_links": {"party": ["Supplier", "party_type"]},
		"transactions": [
			{"label": _("Procurement"), "items": ["Request for Quotation", "Supplier Quotation"]},
			{"label": _("Orders"), "items": ["Purchase Order", "Purchase Receipt", "Purchase Invoice"]},
			{"label": _("Payments"), "items": ["Payment Entry", "Bank Account"]},
			{"label": _("Pricing"), "items": ["Pricing Rule"]},
		],
	}
