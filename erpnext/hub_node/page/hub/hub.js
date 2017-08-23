frappe.provide("erpnext.hub");

frappe.pages['hub'].on_page_load = function(wrapper) {
	let page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'ERPNext Hub',
		single_column: true
	});

	frappe.hub = new erpnext.hub.Hub({page:page});

}

// frappe.pages['hub'].on_page_load = function() {
// 	frappe.hub.go_to_home_page();
// }

// frappe.pages['hub'].on_page_show = function() {
// 	frappe.hub.go_to_home_page();
// }

erpnext.hub.Hub = class {
	constructor({
		page = null
	}) {
		this.page = page;
		this.setup();
	}

	setup() {
		this.setup_header();
		this.$hub_main_section = $(`<div class="hub-main-section">`).appendTo(this.page.body);
		this.refresh();
	}

	refresh() {
		this.$hub_main_section.empty();
		this.page.page_form.hide();
		// if(this.hub && this.hub.publish && !this.$hub_list) {
		// 	this.setup_live_state();
		// } else {
		// 	this.setup_empty_state();
		// }

		frappe.model.with_doc("Hub Settings", "Hub Settings", () => {
			this.hub = locals["Hub Settings"]["Hub Settings"];
			if(!this.hub.enabled) {
				this.setup_empty_state();
			} else {
				this.setup_live_state();
			}
		});
	}

	setup_header() {
		this.page.page_title = this.page.wrapper.find(".page-title");
		this.tag_line = $(`<div class="tag-line-container"><span class="tag-line text-muted">Product listing and discovery for
			ERPNext users</span></div>`).appendTo(this.page.page_title);
		this.account_details = $(`<div class="account-details">
			<i class="fa fa-user"></i> <a class="user_name small"></a>
			<i class="octicon octicon-globe" style="margin-left: 20px;"></i> <a class="company_name small"></a>
		</div>`).appendTo(this.page.page_actions);
		this.account_details.hide();
		this.bind_title();
	}

	setup_empty_state() {
		this.remove_account_from_header();
		let $empty_state = $(frappe.render_template("register_in_hub", {}));
		this.$hub_main_section.append($empty_state);
		this.$hub_main_section.find(".hub-settings-btn").on('click', () => {
			frappe.set_route("Form", "Hub Settings", {});
		});
	}

	setup_live_state() {
		this.add_account_to_header();
		if(!this.$search) {
			this.setup_filters();
		}
		this.page.page_form.show();
		this.render_body();
		this.setup_lists();
	}

	setup_filters() {
		let categories = this.get_hub_categories().map(d => {
			return {label: __(d), value: d}
		});
		let countries = this.get_hub_countries().map(d => {
			return {label: d, value: d}
		});

		this.category_select = this.page.add_select(__("Category"),
			[{"label": __("Select Category..."), value: "" }].concat(categories)
		);
		this.country_select = this.page.add_select(__("Country"),
			[{"label": __("Select Country..."), value: "" }].concat(countries)
		);

		this.get_hub_companies((companies) => {
			let company_names = companies.map(d => {
				return {label: d.company, value: d.company}
			});

			this.company_select = this.page.add_select(__("Company"),
				[{"label": __("Select Company..."), value: "" }].concat(company_names)
			);

			this.company_select.on("change", () => {
				this.$search.val("");
				let val = $(this.company_select).val() || "";
				this.go_to_items_only_page(
					["hub", "Company", val, "Products"],
					'Products by '  + val,
					"company-product-list",
					{text: "", company: val}
				);
			});
		});

		this.$search = this.page.add_data(__("Search"));
		this.bind_filters();
		this.setup_search();
	}

	bind_filters() {
		// TODO: categories
		// bind dynamically
	}

	reset_filters() {
		$(this.company_select).val("");
	}

	bind_title() {
		this.page.page_title.find('.title-text').on('click', () => {
			this.go_to_home_page();
		});
	}

	render_body() {
		this.$home_page = $(frappe.render_template("hub_home_page", {}))
			.appendTo(this.$hub_main_section);

		this.$banner = this.$hub_main_section.find(".banner");
		this.$listing_body = this.$hub_main_section.find(".listing-body");
		this.$main_list_section = this.$hub_main_section.find(".main-list-section");
		this.$side_list_section = this.$hub_main_section.find(".side-list-section");
	}

	setup_lists() {
		this.home_item_list = new erpnext.hub.HubList({
			parent: this.$main_list_section,
			title: "New",
			page_length: 20,
			list_css_class: "home-product-list",
			method: "erpnext.hub_node.get_items",
			filters: {text: ""} // filters at the time of creation
		});
		this.home_item_list.item_on_click = (item) => {
			this.go_to_item_page(item);
		}
		this.home_item_list.setup();

		this.setup_company_list();
	}

	setup_company_list() {
		this.get_hub_companies((companies) => {
			companies.map(company => {
				let company_card = $(`<div class="company_card">
				</div>`).appendTo(this.$side_list_section);
			});
		})
	}

	setup_search() {
		this.$search.on("keypress", (e) => {
			if(e.which === 13) {
				var search_term = ($(this.$search).val() || "").toLowerCase();
				this.go_to_items_only_page(
					["hub", "search", search_term],
					'Search results for "'  + search_term + '"',
					"search-product-list",
					{text: search_term}
				);
			}
		});
	}

	go_to_items_only_page(route, title, class_name, filters) {
		frappe.set_route(route);
		this.$hub_main_section.empty();
		this.filtered_item_list = new erpnext.hub.HubList({
			parent: this.$hub_main_section,
			title: title,
			page_length: 20,
			list_css_class: class_name,
			method: "erpnext.hub_node.get_items",
			filters: filters
		});
		this.filtered_item_list.item_on_click = (item) => {
			this.go_to_item_page(item);
		}
		this.filtered_item_list.setup();
	}

	go_to_item_page(item) {
		// TODO: Check if item quote already requested
		frappe.set_route("hub", "Item", item.item_name);
		this.$hub_main_section.empty();
		item.standard_rate = (item.standard_rate).toFixed(2);
		let $item_page = $(frappe.render_template("hub_item_page", {item:item}))
			.appendTo(this.$hub_main_section);

		let $company_items = $item_page.find('.company-items');

		let company_item_list = new erpnext.hub.HubList({
			parent: $company_items,
			title: "More by " + item.company,
			page_length: 20,
			list_css_class: "company-item-list",
			method: "erpnext.hub_node.get_items",
			filters: {text: "", company: item.company}
		});
		company_item_list.item_on_click = (item) => {
			this.go_to_item_page(item);
		}
		company_item_list.setup();

		let $rfq_btn = $item_page.find('.rfq-btn');
		$rfq_btn.on('click', () => {
			$rfq_btn.addClass("disabled");
			this.make_rfq(item, (success) => {
				if(success) {
					$rfq_btn.html('<span><i class="fa fa-check"></i> Quote Requested</span>');
				} else {
					frappe.msgprint(__("Sorry, we cannot process your request at this time."));
				}
			});
		});

		// let $breadcrumbs = $();
		// $item_page.prepend($breadcrumbs);
		// this.bind_breadcrumbs();
	}

	go_to_company_page(company) {
		frappe.set_route("hub", "Company", company.name);
	}

	// bind_breadcrumbs() {}

	go_to_home_page() {
		frappe.set_route("hub");
		this.reset_filters();
		this.refresh();
	}

	add_account_to_header() {
		this.account_details.find('.user_name').empty().append(this.hub.hub_user_name);
		this.account_details.find('.company_name').empty().append(this.hub.company);
		this.account_details.show();
	}

	remove_account_from_header() {
		this.account_details.hide();
	}

	get_hub_categories(callback) {
		// TODO
		return [];
	}
	get_hub_countries(callback) {
		return [];
	}
	get_hub_companies(callback) {
		frappe.call({
			method: "erpnext.hub_node.get_all_companies",
			args: {},
			callback: function(r) {
				if(!r.message) {
					r.message = [];
				}
				callback(r.message);
			}
		});
	}

	get_search_term() {
		return this.$search.val();
	}

	make_rfq(item, callback) {
		// should be through hub?
		frappe.call({
			method: "erpnext.hub_node.make_rfq_and_send_opportunity",
			args: {
				item_code: item.item_code,
				item_group: "Products",
				supplier_name: item.hub_user_name,
				supplier_email: item.hub_user_email,
				company: item.company,
				country: item.country
			},
			callback: function(r) {
				callback(r.message);
			}
		});
	}
}

erpnext.hub.HubList = class {
	constructor({
		parent = null,
		title = "Items",
		page_length = 10,
		list_css_class = "",
		method = "",
		filters = {text: ""},

	}) {
		this.parent = parent;
		this.title = title;
		this.page_length = page_length;
		this.list_css_class = list_css_class;
		this.method = method;
		this.filters = filters;
		// this.setup();
	}

	setup() {
		this.container = $(`<div class="item-list-container
			${this.list_css_class}" data-page-length="${this.page_length}">
			<div class="item-list-header"><h3>${this.title}</h3></div>
			<div class="item-list"></div>
			<div class="list-state">
				<div class="loading">
					<p class="text-muted text-center">${__("Loading...")}</p>
				</div>
				<div class="done hide">
					<p class="text-muted text-center">${__("No more results.")}</p>
				</div>
				<div class="more text-center">
					<button class="btn btn-default btn-sm">${__("More")}</div>
				</div>
			</div>
		</div>`).appendTo(this.parent);

		this.$item_list_title = this.container.find('.item-list-header h3');
		this.$list = this.container.find('.item-list');
		this.$loading = this.container.find('.loading').hide();
		this.$more = this.container.find('.more').hide();
		this.$done = this.container.find('.done');

		// dynamic for next_page function
		this.start = this.container.find('.item-card').length;

		this.$more.on('click', () => {
			this.next_page();
		});

		this.next_page();
	}

	refresh(filters = this.filters) {
		this.reset();
		this.set_filters(filters);
		this.next_page();
	}

	reset() {
		this.$list.empty();
	}

	set_filters(filters) {
		this.filters = filters;
	}

	next_page() {
		this.$item_list_title.html(this.title);
		let me = this;
		let start = this.$list.find('.item-card').length;
		this.$loading.show();
		let args = {
			start: start,
			limit: this.page_length + 1
		}
		$.extend(args, this.filters);
		console.log("next page called with args", args, this.filters, me.page_length, start);
		frappe.call({
			method: me.method,
			args: args,
			callback: function(r) {
				console.log("items: ", r.message);
				me.$loading.hide();
				if(r.message) {
					if(r.message.length && r.message.length > me.page_length) {
						r.message.pop();
						me.$more.show();
						me.$done.addClass("hide");
					} else {
						me.$done.removeClass("hide");
						me.$more.hide();
					}
					r.message.forEach(function(item) {
						let $item = me.make_item_card(item).appendTo(me.$list);
					});
				} else {
					me.$item_list_title.html("No results found");
				}
			}
		});
	}

	make_item_card(item) {
		let $item =  $(`<div class="item-card">
			<div class="image">
				<a class="item-link"><img src="${item.image}"></a>
			</div>
			<div class="content">
				<div class="title"><a class="item-link">${item.item_name}</a></div>
				<div class="company">${item.company}</div>
				${item.standard_rate ? '<div class="price">' +
					item.standard_rate.toFixed(2) +  '</div>': ""}
			</div>
		</div>`);

		$item.find('.item-link').on('click', () => {
			this.item_on_click(item);
		});
		return $item;
	}

	item_on_click(item) {}
}
