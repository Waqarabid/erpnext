frappe.listview_settings["Subscription"] = {
	get_indicator: function (doc) {
<<<<<<< HEAD
		if (doc.status === "Trialling") {
			return [__("Trialling"), "green"];
=======
		if (doc.status === "Trialing") {
			return [__("Trialing"), "green"];
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)
		} else if (doc.status === "Active") {
			return [__("Active"), "green"];
		} else if (doc.status === "Completed") {
			return [__("Completed"), "green"];
		} else if (doc.status === "Past Due Date") {
			return [__("Past Due Date"), "orange"];
		} else if (doc.status === "Unpaid") {
			return [__("Unpaid"), "red"];
		} else if (doc.status === "Cancelled") {
			return [__("Cancelled"), "gray"];
		}
	},
};
