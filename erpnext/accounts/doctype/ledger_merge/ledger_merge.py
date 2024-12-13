# Copyright (c) 2021, Wahni Green Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
<<<<<<< HEAD
=======
from frappe.utils.background_jobs import is_job_enqueued
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

from erpnext.accounts.doctype.account.account import merge_account


class LedgerMerge(Document):
<<<<<<< HEAD
	def start_merge(self):
		from frappe.core.page.background_jobs.background_jobs import get_info
=======
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		from erpnext.accounts.doctype.ledger_merge_accounts.ledger_merge_accounts import (
			LedgerMergeAccounts,
		)

		account: DF.Link
		account_name: DF.Data
		company: DF.Link
		is_group: DF.Check
		merge_accounts: DF.Table[LedgerMergeAccounts]
		root_type: DF.Literal["", "Asset", "Liability", "Income", "Expense", "Equity"]
		status: DF.Literal["Pending", "Success", "Partial Success", "Error"]
	# end: auto-generated types

	def start_merge(self):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		from frappe.utils.background_jobs import enqueue
		from frappe.utils.scheduler import is_scheduler_inactive

		if is_scheduler_inactive() and not frappe.flags.in_test:
			frappe.throw(_("Scheduler is inactive. Cannot merge accounts."), title=_("Scheduler Inactive"))

<<<<<<< HEAD
		enqueued_jobs = [d.get("job_name") for d in get_info()]

		if self.name not in enqueued_jobs:
=======
		job_id = f"ledger_merge::{self.name}"
		if not is_job_enqueued(job_id):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			enqueue(
				start_merge,
				queue="default",
				timeout=6000,
				event="ledger_merge",
<<<<<<< HEAD
				job_name=self.name,
=======
				job_id=job_id,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				docname=self.name,
				now=frappe.conf.developer_mode or frappe.flags.in_test,
			)
			return True

		return False


@frappe.whitelist()
def form_start_merge(docname):
	return frappe.get_doc("Ledger Merge", docname).start_merge()


def start_merge(docname):
	ledger_merge = frappe.get_doc("Ledger Merge", docname)
	successful_merges = 0
	total = len(ledger_merge.merge_accounts)
	for row in ledger_merge.merge_accounts:
		if not row.merged:
			try:
				merge_account(
					row.account,
					ledger_merge.account,
				)
				row.db_set("merged", 1)
				frappe.db.commit()
				successful_merges += 1
				frappe.publish_realtime(
					"ledger_merge_progress",
					{"ledger_merge": ledger_merge.name, "current": successful_merges, "total": total},
				)
			except Exception:
				frappe.db.rollback()
				ledger_merge.log_error("Ledger merge failed")
			finally:
				if successful_merges == total:
					ledger_merge.db_set("status", "Success")
				elif successful_merges > 0:
					ledger_merge.db_set("status", "Partial Success")
				else:
					ledger_merge.db_set("status", "Error")

	frappe.publish_realtime("ledger_merge_refresh", {"ledger_merge": ledger_merge.name})
