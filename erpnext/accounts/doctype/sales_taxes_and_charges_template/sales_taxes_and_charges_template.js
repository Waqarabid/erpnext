// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

cur_frm.cscript.tax_table = "Sales Taxes and Charges";
<<<<<<< HEAD

{% include "erpnext/public/js/controllers/accounts.js" %}
=======
erpnext.accounts.taxes.setup_tax_validations("Sales Taxes and Charges Template");
erpnext.accounts.taxes.setup_tax_filters("Sales Taxes and Charges");
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
