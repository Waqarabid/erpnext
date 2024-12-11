from frappe import _


def get_data():
	return {
		"fieldname": "supplier",
		"non_standard_fieldnames": {"Payment Entry": "party", "Bank Account": "party"},
<<<<<<< HEAD
=======
		"dynamic_links": {"party": ["Supplier", "party_type"]},
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
		"transactions": [
			{"label": _("Procurement"), "items": ["Request for Quotation", "Supplier Quotation"]},
			{"label": _("Orders"), "items": ["Purchase Order", "Purchase Receipt", "Purchase Invoice"]},
			{"label": _("Payments"), "items": ["Payment Entry", "Bank Account"]},
			{"label": _("Pricing"), "items": ["Pricing Rule"]},
		],
	}
