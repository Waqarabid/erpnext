// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

<<<<<<< HEAD
// attach required files
{% include 'erpnext/public/js/controllers/buying.js' %};

erpnext.buying.SupplierQuotationController = class SupplierQuotationController extends erpnext.buying.BuyingController {
	setup() {
		this.frm.custom_make_buttons = {
			'Purchase Order': 'Purchase Order',
			'Quotation': 'Quotation'
		}
=======
erpnext.buying.setup_buying_controller();
erpnext.buying.SupplierQuotationController = class SupplierQuotationController extends (
	erpnext.buying.BuyingController
) {
	setup() {
		this.frm.custom_make_buttons = {
			"Purchase Order": "Purchase Order",
			Quotation: "Quotation",
		};
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

		super.setup();
	}

	refresh() {
		var me = this;
		super.refresh();

		if (this.frm.doc.__islocal && !this.frm.doc.valid_till) {
<<<<<<< HEAD
			this.frm.set_value('valid_till', frappe.datetime.add_months(this.frm.doc.transaction_date, 1));
		}
		if (this.frm.doc.docstatus === 1) {
			cur_frm.add_custom_button(__("Purchase Order"), this.make_purchase_order,
				__('Create'));
			cur_frm.page.set_inner_btn_group_as_primary(__('Create'));
			cur_frm.add_custom_button(__("Quotation"), this.make_quotation,
				__('Create'));
		}
		else if (this.frm.doc.docstatus===0) {

			this.frm.add_custom_button(__('Material Request'),
				function() {
=======
			this.frm.set_value("valid_till", frappe.datetime.add_months(this.frm.doc.transaction_date, 1));
		}
		if (this.frm.doc.docstatus === 1) {
			this.frm.add_custom_button(
				__("Purchase Order"),
				this.make_purchase_order.bind(this),
				__("Create")
			);
			this.frm.page.set_inner_btn_group_as_primary(__("Create"));
			this.frm.add_custom_button(__("Quotation"), this.make_quotation.bind(this), __("Create"));
		} else if (this.frm.doc.docstatus === 0) {
			this.frm.add_custom_button(
				__("Material Request"),
				function () {
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
					erpnext.utils.map_current_doc({
						method: "erpnext.stock.doctype.material_request.material_request.make_supplier_quotation",
						source_doctype: "Material Request",
						target: me.frm,
						setters: {
							schedule_date: undefined,
<<<<<<< HEAD
							status: undefined
=======
							status: undefined,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
						},
						get_query_filters: {
							material_request_type: "Purchase",
							docstatus: 1,
							status: ["!=", "Stopped"],
							per_ordered: ["<", 100],
<<<<<<< HEAD
							company: me.frm.doc.company
						}
					})
				}, __("Get Items From"));

			// Link Material Requests
			this.frm.add_custom_button(__('Link to Material Requests'),
				function() {
					erpnext.buying.link_to_mrs(me.frm);
				}, __("Tools"));

			this.frm.add_custom_button(__("Request for Quotation"),
			function() {
				if (!me.frm.doc.supplier) {
					frappe.throw({message:__("Please select a Supplier"), title:__("Mandatory")})
				}
				erpnext.utils.map_current_doc({
					method: "erpnext.buying.doctype.request_for_quotation.request_for_quotation.make_supplier_quotation_from_rfq",
					source_doctype: "Request for Quotation",
					target: me.frm,
					setters: {
						transaction_date: null
					},
					get_query_filters: {
						supplier: me.frm.doc.supplier,
						company: me.frm.doc.company
					},
					get_query_method: "erpnext.buying.doctype.request_for_quotation.request_for_quotation.get_rfq_containing_supplier"

				})
			}, __("Get Items From"));
=======
							company: me.frm.doc.company,
						},
					});
				},
				__("Get Items From")
			);

			// Link Material Requests
			this.frm.add_custom_button(
				__("Link to Material Requests"),
				function () {
					erpnext.buying.link_to_mrs(me.frm);
				},
				__("Tools")
			);

			this.frm.add_custom_button(
				__("Request for Quotation"),
				function () {
					if (!me.frm.doc.supplier) {
						frappe.throw({ message: __("Please select a Supplier"), title: __("Mandatory") });
					}
					erpnext.utils.map_current_doc({
						method: "erpnext.buying.doctype.request_for_quotation.request_for_quotation.make_supplier_quotation_from_rfq",
						source_doctype: "Request for Quotation",
						target: me.frm,
						setters: {
							transaction_date: null,
						},
						get_query_filters: {
							supplier: me.frm.doc.supplier,
							company: me.frm.doc.company,
						},
						get_query_method:
							"erpnext.buying.doctype.request_for_quotation.request_for_quotation.get_rfq_containing_supplier",
					});
				},
				__("Get Items From")
			);
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		}
	}

	make_purchase_order() {
		frappe.model.open_mapped_doc({
			method: "erpnext.buying.doctype.supplier_quotation.supplier_quotation.make_purchase_order",
<<<<<<< HEAD
			frm: cur_frm
		})
=======
			frm: this.frm,
		});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}
	make_quotation() {
		frappe.model.open_mapped_doc({
			method: "erpnext.buying.doctype.supplier_quotation.supplier_quotation.make_quotation",
<<<<<<< HEAD
			frm: cur_frm
		})

=======
			frm: this.frm,
		});
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	}
};

// for backward compatibility: combine new and previous states
<<<<<<< HEAD
extend_cscript(cur_frm.cscript, new erpnext.buying.SupplierQuotationController({frm: cur_frm}));

cur_frm.fields_dict['items'].grid.get_field('project').get_query =
	function(doc, cdt, cdn) {
		return{
			filters:[
				['Project', 'status', 'not in', 'Completed, Cancelled']
			]
		}
	}
=======
extend_cscript(cur_frm.cscript, new erpnext.buying.SupplierQuotationController({ frm: cur_frm }));

cur_frm.fields_dict["items"].grid.get_field("project").get_query = function (doc, cdt, cdn) {
	return {
		filters: [["Project", "status", "not in", "Completed, Cancelled"]],
	};
};
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
