const INDICATORS = {
	"Partially Paid": "orange",
	Cancelled: "red",
<<<<<<< HEAD
	Draft: "red",
=======
	Draft: "gray",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	Failed: "red",
	Initiated: "green",
	Paid: "blue",
	Requested: "green",
};

frappe.listview_settings["Payment Request"] = {
	add_fields: ["status"],
	get_indicator: function (doc) {
		if (!doc.status || !INDICATORS[doc.status]) return;

		return [__(doc.status), INDICATORS[doc.status], `status,=,${doc.status}`];
	},
};
