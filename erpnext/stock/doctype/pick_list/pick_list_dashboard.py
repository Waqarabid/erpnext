def get_data():
	return {
		"fieldname": "pick_list",
<<<<<<< HEAD
=======
		"non_standard_fieldnames": {
			"Stock Reservation Entry": "from_voucher_no",
		},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		"internal_links": {
			"Sales Order": ["locations", "sales_order"],
		},
		"transactions": [
<<<<<<< HEAD
			{"items": ["Stock Entry", "Sales Order", "Delivery Note"]},
=======
			{"items": ["Stock Entry", "Sales Order", "Delivery Note", "Stock Reservation Entry"]},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		],
	}
