sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/Device',
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment'

], function (JSONModel, BaseController, Device, Filter, Sorter, Lead, xlsx, MessageToast, Fragment) {
	"use strict";

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.LeadManagement.Leads", {

		onInit: function () {

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("leadscreen", "handleLeadList", this.handleLeadList, this);
			this.bus.subscribe("leaddetail", "handleLeadDetails", this.handleLeadDetails, this);
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);
			this.handleRouteMatched(null);

			Fragment.load({
				id: this.getView().getId(),
				name: "sap.m.sample.TableViewSettingsDialog.ColumnMenu",
				controller: this
			}).then(function (oMenu) {
				oView.addDependent(oMenu);
				return oMenu;
			});

			// Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
			this._mViewSettingsDialogs = {};
			var model = new JSONModel();
			var emptyModel = this.getModelDefault();
			model.setData(emptyModel);
			this.getView().setModel(model, "partyModel");

			var model = new JSONModel();
			model.setData(emptyModel);
			this.getView().setModel(model, "subledgerModel");
			jQuery.sap.delayedCall(1000, this, function () {
				// this.getView().byId("onSearchId").focus();
			});
			this.fnShortCut();

			// grouping fields
			this.mGroupFunctions = {
				leadtype: function (oContext) {
					var name = oContext.getProperty("leadtype");
					return {
						key: name,
						text: name
					};
				},
				leadscategory: function (oContext) {
					var name = oContext.getProperty("leadscategory");
					return {
						key: name,
						text: name
					};
				},
				stagename: function (oContext) {
					var name = oContext.getProperty("stagename");
					return {
						key: name,
						text: name
					};
				},
			}
		},

		//Define function for Grouping load GroupDialog for grouping
		handleGroupButtonPressed: function () {
			this.getViewSettingsDialog("sap.ui.elev8rerp.componentcontainer.fragmentview.Common.GroupDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},

		//Group fragment close functionality
		handleGroupDialogConfirm: function (oEvent) {
			var oTable = this.byId("tblPartyMaster"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				vGroup,
				aGroups = [];

			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aGroups.push(new Sorter(sPath, bDescending, vGroup));
				// apply the selected group settings
				oBinding.sort(aGroups);
			} else if (this.groupReset) {
				oBinding.sort();
				this.groupReset = false;
			}
		},

		//reset group Dialog
		resetGroupDialog: function (oEvent) {
			this.groupReset = true;
		},

		//reset filer Dialog
		resetFilterDialog: function (oEvent) {
			this.filterReset = true;
		},

		// Default model
		getModelDefault: function () {
			return {

			}
		},

		// Sorting on Lead 
		handleSortDialogConfirm: function (oEvent) {
			var oTable = this.byId("tblPartyMaster"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];

			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));

			// apply the selected sort and group settings
			oBinding.sort(aSorters);
		},


		// sorting function
		handleSortButtonPressed: function () {
			this.getViewSettingsDialog("sap.ui.elev8rerp.componentcontainer.fragmentview.Common.SortDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},

		// Shortcut keys
		fnShortCut: function () {
			var currentContext = this;
			$(document).keydown(function (evt) {
				if (evt.keyCode == 79 && evt.ctrlKey) {
					jQuery(document).ready(function ($) {
						evt.preventDefault();
						currentContext.onAddNew()

					})
				}
			});
		},

		handleRouteMatched: function (evt) {
			this.getView().byId("btnUploadData").setVisible(false);
			this.loadData();
		},

		handleLeadDetails: function (sChannel, sEvent, oData) {
			console.log("oData", oData);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.bus = sap.ui.getCore().getEventBus();
			oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
			oRouter.navTo(oData.pagekey, true);
		},

		onListItemPress: function (oEvent) {
			var viewModel = oEvent.getSource().getBindingContext("LeadsMasterModel");
			var model = { "id": viewModel.getProperty("id") }
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("leaddetail", "handleLeadDetails", { pagekey: "leaddetail", viewModel: model });
			}, 1000);

			this.bus.publish("leaddetail", "handleLeadDetails", { pagekey: "leaddetail", viewModel: model });
		},

		// Add new lead
		onAddNew: function () {
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("leadscreen", "handleLeadList", { pagekey: "addlead", viewModel: null });
			}, 1000);
			this.bus.publish("leadscreen", "handleLeadList", { pagekey: "addlead", viewModel: null });
		},

		// Dispaly Demo leadlist need to remove code after demo
		onAddNewLeadList: function () {
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("leadscreen", "handleLeadList", { pagekey: "leadslist", viewModel: null });
			}, 1000);
			this.bus.publish("leadscreen", "handleLeadList", { pagekey: "leadslist", viewModel: null });
		},


		/**
		* Function to navigate to specified route.
		* @param {*} sChannel 
		* @param {*} sEvent 
		* @param {*} oData 
		*/

		handleLeadList: function (sChannel, sEvent, oData) {
			console.log("oData", oData);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.bus = sap.ui.getCore().getEventBus();
			oRouter.getTargets().display(oData.pagekey, { viewModel: oData.viewModel });
			oRouter.navTo(oData.pagekey, true);
		},

		//search lead 
		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
			var contains = sap.ui.model.FilterOperator.Contains;
			var columns = ['leadname', 'email', 'sourcename'];
			var filters = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, contains, sQuery);
			}),
				false);
			s
			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [filters];
			}

			this.getView().byId("tblLeadMaster").getBinding("items").filter(oTableSearchState, "Application");
		},



		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("tblLeadMaster"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("partyname", this._bDescendingSort);
			oBinding.sort(oSorter);
		},

		loadData: function () {
			var currentContext = this;
			Lead.getAllLeads(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "LeadsMasterModel");
				console.log("LeadsMasterModel", oModel);
			});
		},

		handleFilterButtonPressed: function () {
			this.getViewSettingsDialog("sap.ui.elev8rerp.componentcontainer.fragmentview.Common.FilterDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},

		getViewSettingsDialog: function (sDialogFragmentName) {
			var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

			if (!pDialog) {
				pDialog = Fragment.load({
					id: this.getView().getId(),
					name: sDialogFragmentName,
					controller: this
				}).then(function (oDialog) {
					if (Device.system.desktop) {
						oDialog.addStyleClass("sapUiSizeCompact");
					}
					return oDialog;
				});
				this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
			}
			return pDialog;
		},

		handleFilterDialogConfirm: function (oEvent) {
			var oTable = this.byId("tblPartyMaster"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aSplit = [],
				aFilters = [];
				var sPath = '';

			if (mParams.filterItems) {
				mParams.filterItems.forEach(function (oItem) {
					console.log("------oItem--------", oItem);
					console.log("------oItem2--------", oItem.getKey());

					 aSplit = oItem.getKey().split("___");
					 console.log("------aSplit--------", aSplit);
						// sPath = aSplit[0];
						// var sOperator = aSplit[1],
						// sValue1 = aSplit[2],
						// sValue2 = aSplit[3],
						// sPath = "stagename",
						// sOperator = "LT",
						// sValue1 = "Unqualified",
						// sValue2 = "Unqualified",

					var oFilter = new Filter(mParams.filterString);
					aFilters.push(oFilter);
				});

				// apply filter settings
				oBinding.filter(aFilters);

				// update filter bar
				this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
				this.byId("vsdFilterLabel").setText(mParams.filterString);
			}
			else if (this.filterReset) {
				oBinding.sort();
				this.filterReset = false;
			}
		},

		onExit: function () {
			this.bus.unsubscribe("settermaster", "setDetailPage", this.setDetailPage, this);
		}
	});

}, true);
