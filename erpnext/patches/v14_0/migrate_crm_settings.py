import frappe


def execute():
<<<<<<< HEAD
	settings = frappe.db.get_value(
		"Selling Settings",
		"Selling Settings",
		["campaign_naming_by", "close_opportunity_after_days", "default_valid_till"],
		as_dict=True,
	)
=======
	settings = frappe.db.get_singles_dict("Selling Settings", cast=True)
>>>>>>> ee9a2952d6 (fix: switched asset terminology from cost to value)

	frappe.reload_doc("crm", "doctype", "crm_settings")
	if settings:
		frappe.db.set_single_value(
			"CRM Settings",
			{
				"campaign_naming_by": settings.campaign_naming_by,
				"close_opportunity_after_days": settings.close_opportunity_after_days,
				"default_valid_till": settings.default_valid_till,
			},
		)
