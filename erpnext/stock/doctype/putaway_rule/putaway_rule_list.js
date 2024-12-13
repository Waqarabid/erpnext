frappe.listview_settings["Putaway Rule"] = {
	add_fields: ["disable"],
	get_indicator: (doc) => {
		if (doc.disable) {
			return [__("Disabled"), "darkgrey", "disable,=,1"];
		} else {
			return [__("Active"), "blue", "disable,=,0"];
		}
	},

	reports: [
		{
			name: "Warehouse Capacity Summary",
<<<<<<< HEAD
			report_type: "Page",
			route: "warehouse-capacity-summary",
=======
			route: "/app/warehouse-capacity-summary",
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		},
	],
};
