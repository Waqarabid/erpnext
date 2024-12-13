# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

import json

import frappe
from frappe.exceptions import ValidationError
<<<<<<< HEAD
from frappe.tests.utils import FrappeTestCase
=======
from frappe.tests import IntegrationTestCase, UnitTestCase
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
from frappe.utils import cint, flt
from frappe.utils.data import add_to_date, getdate

from erpnext.accounts.doctype.purchase_invoice.test_purchase_invoice import make_purchase_invoice
<<<<<<< HEAD
from erpnext.stock.doctype.batch.batch import UnableToSelectBatchError, get_batch_no, get_batch_qty
from erpnext.stock.doctype.item.test_item import make_item
from erpnext.stock.doctype.purchase_receipt.test_purchase_receipt import make_purchase_receipt
from erpnext.stock.doctype.stock_entry.stock_entry_utils import make_stock_entry
from erpnext.stock.doctype.stock_reconciliation.test_stock_reconciliation import (
	create_stock_reconciliation,
)
from erpnext.stock.get_item_details import get_item_details
from erpnext.stock.stock_ledger import get_valuation_rate


class TestBatch(FrappeTestCase):
=======
from erpnext.stock.doctype.batch.batch import get_batch_qty
from erpnext.stock.doctype.item.test_item import make_item
from erpnext.stock.doctype.purchase_receipt.test_purchase_receipt import make_purchase_receipt
from erpnext.stock.doctype.serial_and_batch_bundle.serial_and_batch_bundle import (
	BatchNegativeStockError,
)
from erpnext.stock.doctype.serial_and_batch_bundle.test_serial_and_batch_bundle import (
	get_batch_from_bundle,
)
from erpnext.stock.doctype.stock_entry.stock_entry_utils import make_stock_entry
from erpnext.stock.get_item_details import ItemDetailsCtx, get_item_details
from erpnext.stock.serial_batch_bundle import SerialBatchCreation


class UnitTestBatch(UnitTestCase):
	"""
	Unit tests for Batch.
	Use this class for testing individual functions and methods.
	"""

	pass


class TestBatch(IntegrationTestCase):
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	def test_item_has_batch_enabled(self):
		self.assertRaises(
			ValidationError,
			frappe.get_doc({"doctype": "Batch", "name": "_test Batch", "item": "_Test Item"}).save,
		)

	@classmethod
	def make_batch_item(cls, item_name=None):
		from erpnext.stock.doctype.item.test_item import make_item

		if not frappe.db.exists(item_name):
			return make_item(item_name, dict(has_batch_no=1, create_new_batch=1, is_stock_item=1))

	def test_purchase_receipt(self, batch_qty=100):
		"""Test automated batch creation from Purchase Receipt"""
		self.make_batch_item("ITEM-BATCH-1")

		receipt = frappe.get_doc(
			dict(
				doctype="Purchase Receipt",
				supplier="_Test Supplier",
				company="_Test Company",
				items=[dict(item_code="ITEM-BATCH-1", qty=batch_qty, rate=10, warehouse="Stores - _TC")],
			)
		).insert()
		receipt.submit()

<<<<<<< HEAD
		self.assertTrue(receipt.items[0].batch_no)
		self.assertEqual(get_batch_qty(receipt.items[0].batch_no, receipt.items[0].warehouse), batch_qty)

		return receipt

=======
		receipt.load_from_db()
		self.assertTrue(receipt.items[0].serial_and_batch_bundle)
		batch_no = get_batch_from_bundle(receipt.items[0].serial_and_batch_bundle)
		self.assertEqual(get_batch_qty(batch_no, receipt.items[0].warehouse), batch_qty)

		return receipt

	def test_batch_stock_levels(self, batch_qty=100):
		"""Test automated batch creation from Purchase Receipt"""
		self.make_batch_item("ITEM-BATCH-1")

		receipt = frappe.get_doc(
			dict(
				doctype="Purchase Receipt",
				supplier="_Test Supplier",
				company="_Test Company",
				items=[dict(item_code="ITEM-BATCH-1", qty=10, rate=10, warehouse="Stores - _TC")],
			)
		).insert()
		receipt.submit()

		receipt.load_from_db()
		batch_no = get_batch_from_bundle(receipt.items[0].serial_and_batch_bundle)

		bundle_id = (
			SerialBatchCreation(
				{
					"item_code": "ITEM-BATCH-1",
					"warehouse": "_Test Warehouse - _TC",
					"actual_qty": 20,
					"voucher_type": "Purchase Receipt",
					"batches": frappe._dict({batch_no: 20}),
					"type_of_transaction": "Inward",
					"company": receipt.company,
					"do_not_submit": 1,
				}
			)
			.make_serial_and_batch_bundle()
			.name
		)

		receipt2 = frappe.get_doc(
			dict(
				doctype="Purchase Receipt",
				supplier="_Test Supplier",
				company="_Test Company",
				items=[
					dict(
						item_code="ITEM-BATCH-1",
						qty=20,
						rate=10,
						warehouse="_Test Warehouse - _TC",
						serial_and_batch_bundle=bundle_id,
					)
				],
			)
		).insert()
		receipt2.submit()

		receipt.load_from_db()
		receipt2.load_from_db()

		self.assertTrue(receipt.items[0].serial_and_batch_bundle)
		self.assertTrue(receipt2.items[0].serial_and_batch_bundle)

		batchwise_qty = frappe._dict({})
		for r in [receipt, receipt2]:
			batch_no = get_batch_from_bundle(r.items[0].serial_and_batch_bundle)
			key = (batch_no, r.items[0].warehouse)
			batchwise_qty[key] = r.items[0].qty

		batches = get_batch_qty(batch_no)
		for d in batches:
			self.assertEqual(d.qty, batchwise_qty[(d.batch_no, d.warehouse)])

>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	def test_stock_entry_incoming(self):
		"""Test batch creation via Stock Entry (Work Order)"""

		self.make_batch_item("ITEM-BATCH-1")

		stock_entry = frappe.get_doc(
			dict(
				doctype="Stock Entry",
				purpose="Material Receipt",
				company="_Test Company",
				items=[
					dict(
						item_code="ITEM-BATCH-1",
						qty=90,
						t_warehouse="_Test Warehouse - _TC",
						cost_center="Main - _TC",
						rate=10,
					)
				],
			)
		)

		stock_entry.set_stock_entry_type()
		stock_entry.insert()
		stock_entry.submit()

<<<<<<< HEAD
		self.assertTrue(stock_entry.items[0].batch_no)
		self.assertEqual(get_batch_qty(stock_entry.items[0].batch_no, stock_entry.items[0].t_warehouse), 90)
=======
		stock_entry.load_from_db()

		bundle = stock_entry.items[0].serial_and_batch_bundle
		self.assertTrue(bundle)
		self.assertEqual(get_batch_qty(get_batch_from_bundle(bundle), stock_entry.items[0].t_warehouse), 90)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

	def test_delivery_note(self):
		"""Test automatic batch selection for outgoing items"""
		batch_qty = 15
		receipt = self.test_purchase_receipt(batch_qty)
		item_code = "ITEM-BATCH-1"

<<<<<<< HEAD
=======
		batch_no = get_batch_from_bundle(receipt.items[0].serial_and_batch_bundle)

		bundle_id = (
			SerialBatchCreation(
				{
					"item_code": item_code,
					"warehouse": receipt.items[0].warehouse,
					"actual_qty": batch_qty,
					"voucher_type": "Stock Entry",
					"batches": frappe._dict({batch_no: batch_qty}),
					"type_of_transaction": "Outward",
					"company": receipt.company,
					"do_not_submit": 1,
				}
			)
			.make_serial_and_batch_bundle()
			.name
		)

>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		delivery_note = frappe.get_doc(
			dict(
				doctype="Delivery Note",
				customer="_Test Customer",
				company=receipt.company,
				items=[
<<<<<<< HEAD
					dict(item_code=item_code, qty=batch_qty, rate=10, warehouse=receipt.items[0].warehouse)
=======
					dict(
						item_code=item_code,
						qty=batch_qty,
						rate=10,
						warehouse=receipt.items[0].warehouse,
						serial_and_batch_bundle=bundle_id,
					)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
				],
			)
		).insert()
		delivery_note.submit()

<<<<<<< HEAD
		# shipped from FEFO batch
		self.assertEqual(
			delivery_note.items[0].batch_no, get_batch_no(item_code, receipt.items[0].warehouse, batch_qty)
		)

	def test_delivery_note_fail(self):
		"""Test automatic batch selection for outgoing items"""
		receipt = self.test_purchase_receipt(100)
		delivery_note = frappe.get_doc(
			dict(
				doctype="Delivery Note",
				customer="_Test Customer",
				company=receipt.company,
				items=[
					dict(item_code="ITEM-BATCH-1", qty=5000, rate=10, warehouse=receipt.items[0].warehouse)
				],
			)
		)
		self.assertRaises(UnableToSelectBatchError, delivery_note.insert)
=======
		receipt.load_from_db()
		delivery_note.load_from_db()

		# shipped from FEFO batch
		self.assertEqual(
			get_batch_from_bundle(delivery_note.items[0].serial_and_batch_bundle),
			batch_no,
		)

	def test_batch_negative_stock_error(self):
		"""Test automatic batch selection for outgoing items"""
		receipt = self.test_purchase_receipt(100)

		receipt.load_from_db()
		batch_no = get_batch_from_bundle(receipt.items[0].serial_and_batch_bundle)
		sn_doc = SerialBatchCreation(
			{
				"item_code": "ITEM-BATCH-1",
				"warehouse": receipt.items[0].warehouse,
				"voucher_type": "Delivery Note",
				"qty": 5000,
				"avg_rate": 10,
				"batches": frappe._dict({batch_no: 5000}),
				"type_of_transaction": "Outward",
				"company": receipt.company,
			}
		)

		self.assertRaises(BatchNegativeStockError, sn_doc.make_serial_and_batch_bundle)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

	def test_stock_entry_outgoing(self):
		"""Test automatic batch selection for outgoing stock entry"""

		batch_qty = 16
		receipt = self.test_purchase_receipt(batch_qty)
		item_code = "ITEM-BATCH-1"

<<<<<<< HEAD
=======
		batch_no = get_batch_from_bundle(receipt.items[0].serial_and_batch_bundle)

		bundle_id = (
			SerialBatchCreation(
				{
					"item_code": item_code,
					"warehouse": receipt.items[0].warehouse,
					"actual_qty": batch_qty,
					"voucher_type": "Stock Entry",
					"batches": frappe._dict({batch_no: batch_qty}),
					"type_of_transaction": "Outward",
					"company": receipt.company,
					"do_not_submit": 1,
				}
			)
			.make_serial_and_batch_bundle()
			.name
		)

>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		stock_entry = frappe.get_doc(
			dict(
				doctype="Stock Entry",
				purpose="Material Issue",
				company=receipt.company,
				items=[
					dict(
						item_code=item_code,
						qty=batch_qty,
						s_warehouse=receipt.items[0].warehouse,
<<<<<<< HEAD
=======
						serial_and_batch_bundle=bundle_id,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
					)
				],
			)
		)

		stock_entry.set_stock_entry_type()
		stock_entry.insert()
		stock_entry.submit()
<<<<<<< HEAD

		# assert same batch is selected
		self.assertEqual(
			stock_entry.items[0].batch_no, get_batch_no(item_code, receipt.items[0].warehouse, batch_qty)
=======
		stock_entry.load_from_db()

		self.assertEqual(
			get_batch_from_bundle(stock_entry.items[0].serial_and_batch_bundle),
			get_batch_from_bundle(receipt.items[0].serial_and_batch_bundle),
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		)

	def test_batch_split(self):
		"""Test batch splitting"""
		receipt = self.test_purchase_receipt()
		from erpnext.stock.doctype.batch.batch import split_batch

<<<<<<< HEAD
		new_batch = split_batch(receipt.items[0].batch_no, "ITEM-BATCH-1", receipt.items[0].warehouse, 22)

		self.assertEqual(get_batch_qty(receipt.items[0].batch_no, receipt.items[0].warehouse), 78)
=======
		batch_no = get_batch_from_bundle(receipt.items[0].serial_and_batch_bundle)

		new_batch = split_batch(batch_no, "ITEM-BATCH-1", receipt.items[0].warehouse, 22)

		self.assertEqual(get_batch_qty(batch_no, receipt.items[0].warehouse), 78)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		self.assertEqual(get_batch_qty(new_batch, receipt.items[0].warehouse), 22)

	def test_get_batch_qty(self):
		"""Test getting batch quantities by batch_numbers, item_code or warehouse"""
		self.make_batch_item("ITEM-BATCH-2")
		self.make_new_batch_and_entry("ITEM-BATCH-2", "batch a", "_Test Warehouse - _TC")
		self.make_new_batch_and_entry("ITEM-BATCH-2", "batch b", "_Test Warehouse - _TC")

		self.assertEqual(
			get_batch_qty(item_code="ITEM-BATCH-2", warehouse="_Test Warehouse - _TC"),
<<<<<<< HEAD
			[{"batch_no": "batch a", "qty": 90.0}, {"batch_no": "batch b", "qty": 90.0}],
=======
			[
				{"batch_no": "batch a", "qty": 90.0, "warehouse": "_Test Warehouse - _TC"},
				{"batch_no": "batch b", "qty": 90.0, "warehouse": "_Test Warehouse - _TC"},
			],
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		)

		self.assertEqual(get_batch_qty("batch a", "_Test Warehouse - _TC"), 90)

	def test_total_batch_qty(self):
		self.make_batch_item("ITEM-BATCH-3")
		existing_batch_qty = flt(frappe.db.get_value("Batch", "B100", "batch_qty"))
		stock_entry = self.make_new_batch_and_entry("ITEM-BATCH-3", "B100", "_Test Warehouse - _TC")

		current_batch_qty = flt(frappe.db.get_value("Batch", "B100", "batch_qty"))
		self.assertEqual(current_batch_qty, existing_batch_qty + 90)

		stock_entry.cancel()
		current_batch_qty = flt(frappe.db.get_value("Batch", "B100", "batch_qty"))
		self.assertEqual(current_batch_qty, existing_batch_qty)

	@classmethod
	def make_new_batch_and_entry(cls, item_name, batch_name, warehouse):
		"""Make a new stock entry for given target warehouse and batch name of item"""

		if not frappe.db.exists("Batch", batch_name):
			batch = frappe.get_doc(dict(doctype="Batch", item=item_name, batch_id=batch_name)).insert(
				ignore_permissions=True
			)
			batch.save()

<<<<<<< HEAD
=======
		sn_doc = SerialBatchCreation(
			{
				"item_code": item_name,
				"warehouse": warehouse,
				"voucher_type": "Stock Entry",
				"qty": 90,
				"avg_rate": 10,
				"batches": frappe._dict({batch_name: 90}),
				"type_of_transaction": "Inward",
				"company": "_Test Company",
				"do_not_submit": 1,
			}
		).make_serial_and_batch_bundle()

>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		stock_entry = frappe.get_doc(
			dict(
				doctype="Stock Entry",
				purpose="Material Receipt",
				company="_Test Company",
				items=[
					dict(
						item_code=item_name,
						qty=90,
<<<<<<< HEAD
						t_warehouse=warehouse,
						cost_center="Main - _TC",
						rate=10,
						batch_no=batch_name,
=======
						serial_and_batch_bundle=sn_doc.name,
						t_warehouse=warehouse,
						cost_center="Main - _TC",
						rate=10,
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
						allow_zero_valuation_rate=1,
					)
				],
			)
		)

		stock_entry.set_stock_entry_type()
		stock_entry.insert()
		stock_entry.submit()

		return stock_entry

	def test_batch_name_with_naming_series(self):
		stock_settings = frappe.get_single("Stock Settings")
		use_naming_series = cint(stock_settings.use_naming_series)

		if not use_naming_series:
			frappe.set_value("Stock Settings", "Stock Settings", "use_naming_series", 1)

		batch = self.make_new_batch("_Test Stock Item For Batch Test1")
		batch_name = batch.name

		self.assertTrue(batch_name.startswith("BATCH-"))

		batch.delete()
		batch = self.make_new_batch("_Test Stock Item For Batch Test2")

		self.assertEqual(batch_name, batch.name)

		# reset Stock Settings
		if not use_naming_series:
			frappe.set_value("Stock Settings", "Stock Settings", "use_naming_series", 0)

	def make_new_batch(self, item_name=None, batch_id=None, do_not_insert=0):
		batch = frappe.new_doc("Batch")
		item = self.make_batch_item(item_name)
		batch.item = item.name

		if batch_id:
			batch.batch_id = batch_id

		if not do_not_insert:
			batch.insert()

		return batch

	def test_batch_wise_item_price(self):
		if not frappe.db.get_value("Item", "_Test Batch Price Item"):
			frappe.get_doc(
				{
					"doctype": "Item",
					"is_stock_item": 1,
					"item_code": "_Test Batch Price Item",
					"item_group": "Products",
					"has_batch_no": 1,
					"create_new_batch": 1,
				}
			).insert(ignore_permissions=True)

		batch1 = create_batch("_Test Batch Price Item", 200, 1)
		batch2 = create_batch("_Test Batch Price Item", 300, 1)
		batch3 = create_batch("_Test Batch Price Item", 400, 0)

		company = "_Test Company with perpetual inventory"
		currency = frappe.get_cached_value("Company", company, "default_currency")

<<<<<<< HEAD
		args = frappe._dict(
=======
		ctx = ItemDetailsCtx(
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			{
				"item_code": "_Test Batch Price Item",
				"company": company,
				"price_list": "_Test Price List",
				"currency": currency,
				"doctype": "Sales Invoice",
				"conversion_rate": 1,
				"price_list_currency": "_Test Currency",
				"plc_conversion_rate": 1,
				"customer": "_Test Customer",
				"name": None,
			}
		)

		# test price for batch1
<<<<<<< HEAD
		args.update({"batch_no": batch1})
		details = get_item_details(args)
		self.assertEqual(details.get("price_list_rate"), 200)

		# test price for batch2
		args.update({"batch_no": batch2})
		details = get_item_details(args)
		self.assertEqual(details.get("price_list_rate"), 300)

		# test price for batch3
		args.update({"batch_no": batch3})
		details = get_item_details(args)
=======
		ctx.update({"batch_no": batch1})
		details = get_item_details(ctx)
		self.assertEqual(details.get("price_list_rate"), 200)

		# test price for batch2
		ctx.update({"batch_no": batch2})
		details = get_item_details(ctx)
		self.assertEqual(details.get("price_list_rate"), 300)

		# test price for batch3
		ctx.update({"batch_no": batch3})
		details = get_item_details(ctx)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		self.assertEqual(details.get("price_list_rate"), 400)

	def test_basic_batch_wise_valuation(self, batch_qty=100):
		item_code = "_TestBatchWiseVal"
		warehouse = "_Test Warehouse - _TC"
		self.make_batch_item(item_code)

		rates = [42, 420]

		batches = {}
		for rate in rates:
			se = make_stock_entry(item_code=item_code, qty=10, rate=rate, target=warehouse)
<<<<<<< HEAD
			batches[se.items[0].batch_no] = rate
=======
			batch_no = get_batch_from_bundle(se.items[0].serial_and_batch_bundle)
			batches[batch_no] = rate
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)

		LOW, HIGH = list(batches.keys())

		# consume things out of order
		consumption_plan = [
			(HIGH, 1),
			(LOW, 2),
			(HIGH, 2),
			(HIGH, 4),
			(LOW, 6),
		]

		stock_value = sum(rates) * 10
		qty_after_transaction = 20
		for batch, qty in consumption_plan:
			# consume out of order
			se = make_stock_entry(item_code=item_code, source=warehouse, qty=qty, batch_no=batch)

			sle = frappe.get_last_doc("Stock Ledger Entry", {"is_cancelled": 0, "voucher_no": se.name})

<<<<<<< HEAD
			stock_value_difference = sle.actual_qty * batches[sle.batch_no]
=======
			stock_value_difference = (
				sle.actual_qty * batches[get_batch_from_bundle(sle.serial_and_batch_bundle)]
			)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
			self.assertAlmostEqual(sle.stock_value_difference, stock_value_difference)

			stock_value += stock_value_difference
			self.assertAlmostEqual(sle.stock_value, stock_value)

			qty_after_transaction += sle.actual_qty
			self.assertAlmostEqual(sle.qty_after_transaction, qty_after_transaction)
			self.assertAlmostEqual(sle.valuation_rate, stock_value / qty_after_transaction)

			self.assertEqual(json.loads(sle.stock_queue), [])  # queues don't apply on batched items

<<<<<<< HEAD
	def test_moving_batch_valuation_rates(self):
		item_code = "_TestBatchWiseVal"
		warehouse = "_Test Warehouse - _TC"
		self.make_batch_item(item_code)

		def assertValuation(expected):
			actual = get_valuation_rate(item_code, warehouse, "voucher_type", "voucher_no", batch_no=batch_no)
			self.assertAlmostEqual(actual, expected)

		se = make_stock_entry(item_code=item_code, qty=100, rate=10, target=warehouse)
		batch_no = se.items[0].batch_no
		assertValuation(10)

		# consumption should never affect current valuation rate
		make_stock_entry(item_code=item_code, qty=20, source=warehouse)
		assertValuation(10)

		make_stock_entry(item_code=item_code, qty=30, source=warehouse)
		assertValuation(10)

		# 50 * 10 = 500 current value, add more item with higher valuation
		make_stock_entry(item_code=item_code, qty=50, rate=20, target=warehouse, batch_no=batch_no)
		assertValuation(15)

		# consuming again shouldn't do anything
		make_stock_entry(item_code=item_code, qty=20, source=warehouse)
		assertValuation(15)

		# reset rate with stock reconiliation
		create_stock_reconciliation(
			item_code=item_code, warehouse=warehouse, qty=10, rate=25, batch_no=batch_no
		)
		assertValuation(25)

		make_stock_entry(item_code=item_code, qty=20, rate=20, target=warehouse, batch_no=batch_no)
		assertValuation((20 * 20 + 10 * 25) / (10 + 20))

=======
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
	def test_update_batch_properties(self):
		item_code = "_TestBatchWiseVal"
		self.make_batch_item(item_code)

		se = make_stock_entry(item_code=item_code, qty=100, rate=10, target="_Test Warehouse - _TC")
<<<<<<< HEAD
		batch_no = se.items[0].batch_no
=======
		batch_no = get_batch_from_bundle(se.items[0].serial_and_batch_bundle)
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)
		batch = frappe.get_doc("Batch", batch_no)

		expiry_date = add_to_date(batch.manufacturing_date, days=30)

		batch.expiry_date = expiry_date
		batch.save()

		batch.reload()

		self.assertEqual(getdate(batch.expiry_date), getdate(expiry_date))

	def test_autocreation_of_batches(self):
		"""
		Test if auto created Serial No excludes existing serial numbers
		"""
		item_code = make_item(
			properties={
				"has_batch_no": 1,
				"batch_number_series": "BATCHEXISTING.###",
				"create_new_batch": 1,
			}
		).name

		manually_created_batch = self.make_new_batch(item_code, batch_id="BATCHEXISTING001").name

		pr_1 = make_purchase_receipt(item_code=item_code, qty=1, batch_no=manually_created_batch)
		pr_2 = make_purchase_receipt(item_code=item_code, qty=1)

<<<<<<< HEAD
		self.assertNotEqual(pr_1.items[0].batch_no, pr_2.items[0].batch_no)
		self.assertEqual("BATCHEXISTING002", pr_2.items[0].batch_no)
=======
		pr_1.load_from_db()
		pr_2.load_from_db()

		self.assertNotEqual(
			get_batch_from_bundle(pr_1.items[0].serial_and_batch_bundle),
			get_batch_from_bundle(pr_2.items[0].serial_and_batch_bundle),
		)

		self.assertEqual("BATCHEXISTING002", get_batch_from_bundle(pr_2.items[0].serial_and_batch_bundle))
>>>>>>> 125a352bc2 (fix: allow all dispatch address for drop ship invoice)


def create_batch(item_code, rate, create_item_price_for_batch):
	pi = make_purchase_invoice(
		company="_Test Company",
		warehouse="Stores - _TC",
		cost_center="Main - _TC",
		update_stock=1,
		expense_account="_Test Account Cost for Goods Sold - _TC",
		item_code=item_code,
	)

	batch = frappe.db.get_value("Batch", {"item": item_code, "reference_name": pi.name})

	if not create_item_price_for_batch:
		create_price_list_for_batch(item_code, None, rate)
	else:
		create_price_list_for_batch(item_code, batch, rate)

	return batch


def create_price_list_for_batch(item_code, batch, rate):
	frappe.get_doc(
		{
			"doctype": "Item Price",
			"item_code": "_Test Batch Price Item",
			"price_list": "_Test Price List",
			"batch_no": batch,
			"price_list_rate": rate,
		}
	).insert()


def make_new_batch(**args):
	args = frappe._dict(args)

	if frappe.db.exists("Batch", args.batch_id):
		batch = frappe.get_doc("Batch", args.batch_id)
	else:
		batch = frappe.get_doc(
			{
				"doctype": "Batch",
				"batch_id": args.batch_id,
				"item": args.item_code,
				"expiry_date": args.expiry_date,
			}
		)

		if args.expiry_date:
			batch.expiry_date = args.expiry_date

		batch.insert()

	return batch
