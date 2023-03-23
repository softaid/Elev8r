sap.ui.define([
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device',
	'sap/m/MessageToast',
	'sap/ui/elev8rerp/componentcontainer/formatter/Breeder/BreederPlacementSchedule.formatter',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	'sap/ui/elev8rerp/componentcontainer/services/DashBoard/CommonDashBoard.service',
], function (BaseController, JSONModel, Device,MessageToast,formatter, commonService, commonFunction, commondashboardService) {
	"use strict";
	return BaseController.extend("sap.ui.demo.nav.controller.Home", {
		formatter: formatter,

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onInit: function (evt) {
			var router = this.getOwnerComponent().getRouter();
			var target = router.getTarget("home");
			var oViewModel = new JSONModel({
				isPhone: Device.system.phone
			});

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("commondashboard", "redirectToPage", this.redirectToPage, this);

			this.setModel(oViewModel, "view");
			Device.media.attachHandler(function (oDevice) {
				this.getModel("view").setProperty("/isPhone", oDevice.name === "Phone");
			}.bind(this));

			this.oFlexibleColumnLayout = this.byId("fclCommonDashboard");
			this.gePandL();
			this.getData();
		},

		onTabSelect: function (oControlEvent) {
			var key = oControlEvent.getParameters().key;
			var item = oControlEvent.getParameter("item");
			var isViewRendered = item.getContent().length > 0;
			//lazy loading of view
			if (!isViewRendered) {
				if (key === "Common_Setting") {
					var view = new sap.ui.view({
						viewName: "sap.ui.elev8rerp.componentcontainer.view.Common.DashboardCommonSetting",
						type: "XML",
					});
					item.addContent(view);
				}
				else if (key === "Processing_Setting") {
					var view = new sap.ui.view({
						viewName: "sap.ui.elev8rerp.componentcontainer.view.Common.DashboardProcessingSetting",
						type: "XML",
					});
					item.addContent(view);
				}
				else if (key === "CBF_Setting") {
					var view = new sap.ui.view({
						viewName: "sap.ui.elev8rerp.componentcontainer.view.Common.DashboardCBFSetting",
						type: "XML",
					});
					item.addContent(view);
				}
				else if (key === "Feedmill_Setting") {
					var view = new sap.ui.view({
						viewName: "sap.ui.elev8rerp.componentcontainer.view.Common.DashboardFeedMillSetting",
						type: "XML",
					});
					item.addContent(view);
				}
				else if (key === "CommericalLayer_Setting") {
					var view = new sap.ui.view({
						viewName: "sap.ui.elev8rerp.componentcontainer.view.Common.DashboardLayerSetting",
						type: "XML",
					});
					item.addContent(view);
				}
				else if (key === "Hatchery_Setting") {
					var view = new sap.ui.view({
						viewName: "sap.ui.elev8rerp.componentcontainer.view.Common.DashBoardHatcherySetting",
						type: "XML",
					});
					item.addContent(view);
				}
				else if (key === "Breeder_Setting") {
					var view = new sap.ui.view({
						viewName: "sap.ui.elev8rerp.componentcontainer.view.Common.DashboardBreederSetting",
						type: "XML",
					});
					item.addContent(view);
				}
			}
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.OneColumn);
		},


		onBeforeRendering: function () {
			this.gePandL();
		},

		gePandL: function () {
			var model = new JSONModel();
			model.setData([]);
			this.getView().setModel(model, "tblOvDueModel");
			google.charts.load('current', { 'packages': ['corechart'] });
			google.charts.setOnLoadCallback(this.drawBarColors);
		},

		drawBarColors: function () {
			var model = {
				to_date: commonFunction.getDate(commonFunction.getDateFromDB(new Date())),

			}

			var currentContext = this;
			commondashboardService.get_Profitandloss_data(model, function (data) {
				console.log("data", data);
				var mapData = [];
				var Header = ['Month', 'Income', 'Expenses'];
				mapData.push(Header);
				for (var i = 0; i < data[0].length; i++) {
					var temp = [];
					temp.push(data[0][i].Monthname, data[0][i].Income, data[0][i].Expenses);

					mapData.push(temp);
				}

				var data = google.visualization.arrayToDataTable(mapData);
				var options = {
					title: 'Income And Expenses',
					vAxis: { title: 'Amount' },
					hAxis: { title: 'Month' },
					seriesType: 'bars',
					series: { 5: { type: 'point' } }
				};
				var chart = new google.visualization.ComboChart(document.getElementById('liechart_3d_1'));
				chart.draw(data, options);

			});
		},

		getData: function () {
			var currentContext = this;
			let to_date = commonFunction.getDateFromDB(new Date());
			to_date = commonFunction.getDate(to_date);
			commonService.getCommonDashBoard({ to_date: to_date }, function (data) {
				var dashBoard_oModel = new sap.ui.model.json.JSONModel();
				// If data is not get from database  then handle Empty data condition
				if (data.length === 0 && data.trim().length === 0) {
					let msg = "Data for dashboard is not available";
					MessageToast.show(msg);
				}
				else{
					dashBoard_oModel.setData(data[0][0]);
				}
				currentContext.getView().setModel(dashBoard_oModel, "dashBoard_oModel");
			})
			google.charts.load('current', { 'packages': ['corechart'] });
			google.charts.setOnLoadCallback(this.drawBarColors);

			// All Models for dashboard setiing data
			var modulearray = [];
			commonService.getModuleDatabyUser(function (moduleData) {
				var id = 1;
				var moduleAccessoModel = new sap.ui.model.json.JSONModel();
				if (moduleData) {
					moduleAccessoModel.setData(moduleData[0]);
				}
				currentContext.getView().setModel(moduleAccessoModel, "moduleAccessoModel");
				
				// If data is not get from database  then handle Empty data condition
				if (moduleData.length === 0 && moduleData.trim().length === 0)
					{
						console.log("ModuleData is not available");
					}
				else
					{
						for (var i = 0; i < moduleData[0].length; i++) {
							modulearray.push({
								id: id++,
								entityname: moduleData[0][i].entityname
							});
						}
					}

				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: modulearray });
				currentContext.getView().setModel(oModel, "moduleModel");
			})

		},

		on_Over_Due_Detail: function () {
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("commondashboard", "redirectToPage", { pagekey: "salesinvoiceoverdue" });
			}, 1000);
			this.bus.publish("commondashboard", "redirectToPage", { pagekey: "salesinvoiceoverdue" });
		},

		get_Purchase_invoice: function () {
			this.bus = sap.ui.getCore().getEventBus();
			setTimeout(function () {
				this.bus = sap.ui.getCore().getEventBus();
				this.bus.publish("commondashboard", "redirectToPage", { pagekey: "purchaseinvoiceoverdue" });
			}, 1000);
			this.bus.publish("commondashboard", "redirectToPage", { pagekey: "purchaseinvoiceoverdue" });
		},

		redirectToPage: function (sChannel, sEvent, oData) {
			console.log("redirection kry", oData)
			sap.m.MessageToast.show("Redirecting to transaction page....");

			// Redirect to transaction
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getTargets().display(oData.pagekey);
			oRouter.navTo(oData.pagekey, true);
		},
	});
});