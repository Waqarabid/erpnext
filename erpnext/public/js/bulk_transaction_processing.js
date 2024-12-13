frappe.provide("erpnext.bulk_transaction_processing");

$.extend(erpnext.bulk_transaction_processing, {
<<<<<<< HEAD
	create: function (listview, from_doctype, to_doctype) {
=======
	create: function (listview, from_doctype, to_doctype, args) {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		let checked_items = listview.get_checked_items();
		const doc_name = [];
		checked_items.forEach((Item) => {
			if (Item.docstatus == 0) {
				doc_name.push(Item.name);
			}
		});

		let count_of_rows = checked_items.length;
<<<<<<< HEAD
		frappe.confirm(__("Create {0} {1} ?", [count_of_rows, to_doctype]), () => {
=======
		frappe.confirm(__("Create {0} {1} ?", [count_of_rows, __(to_doctype)]), () => {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			if (doc_name.length == 0) {
				frappe
					.call({
						method: "erpnext.utilities.bulk_transaction.transaction_processing",
<<<<<<< HEAD
						args: { data: checked_items, from_doctype: from_doctype, to_doctype: to_doctype },
=======
						args: {
							data: checked_items,
							from_doctype: from_doctype,
							to_doctype: to_doctype,
							args: args,
						},
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
					})
					.then(() => {});
				if (count_of_rows > 10) {
					frappe.show_alert("Starting a background job to create {0} {1}", [
						count_of_rows,
<<<<<<< HEAD
						to_doctype,
=======
						__(to_doctype),
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
					]);
				}
			} else {
				frappe.msgprint(__("Selected document must be in submitted state"));
			}
		});
	},
});
