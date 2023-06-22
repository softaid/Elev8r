sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/services/ProjectManagement/ProjectTracking.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/ui/elev8rerp/componentcontainer/services/projectManagement/Project.service',
	'sap/m/MessageToast'
], function (JSONModel, BaseController, Sorter, leadService, ProjectTracking, xlsx, projectService, MessageToast) {


	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.ProjectManagement.ProjectManagementAsPerStages", {

		onInit: function () {

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("activitymaster", "setDetailPage", this.setDetailPage, this);
			this.bus.subscribe("loaddata", "loadData", this.loadData, this);
			this.oFlexibleColumnLayout = this.byId("fclProjecttracking");

			this.handleRouteMatched(null);

			var model = new JSONModel();
			var emptyModel = this.getModelDefault();
			model.setData(emptyModel);
			this.getView().setModel(model, "partyModel");

			var projectModel = new JSONModel();
			projectModel.setData({ modelData: [] });
			this.getView().setModel(projectModel, "projectModel");

			this.loadDataOne();

			var model = new JSONModel();
			model.setData(emptyModel);
			this.fnShortCut();

			this.bindTable();


			// leadService.getLeadDetails({ id: 51 }, function (data) {
			// 	if (data.length) {
			// 		if (data[4].length) {
			// 			let aRowsCount = [];
			// 			let quotationModelOne = this.getView().getModel("quotationModel");
			// 			quotationModelOne.setData({ modelData: data[4] });
			// 			this.getView().setModel(quotationModelOne, "quotationModel")
			// 			console.log("quotationModel",quotationModelOne);

			// 			aRowsCount.push({
			// 				rowsCount: data[4].length
			// 			});

			// 			let oRowsCount = new JSONModel();
			// 			oRowsCount.setData(aRowsCount[0]);
			// 			console.log("oRowsCount", oRowsCount);
			// 			oThis.getView().setModel(oRowsCount, "rowcount_model");
			// 		}

			// 		console.group(oThis.getView().getModel("liftModel"));
			// 	}
			// })
		},

		loadDataOne: function () {
			let oThis = this;
			// leadService.getLeadDetails({ id: 51 }, function (data) {
			// 	if (data.length) {
			// 		if (data[4].length) {
			// 			let aRowsCount = [];
			// 			let quotationModel = oThis.getView().getModel("quotationModel");
			// 			quotationModel.setData({ modelData: data[4] });
			// 			oThis.getView().setModel(quotationModel, "quotationModel")
			// 			console.log("quotationModel", quotationModel);

			// 			aRowsCount.push({
			// 				rowsCount: data[4].length
			// 			});

			// 			let oRowsCount = new JSONModel();
			// 			oRowsCount.setData(aRowsCount[0]);
			// 			console.log("oRowsCount", oRowsCount);
			// 			oThis.getView().setModel(oRowsCount, "rowcount_model");
			// 		}
			// 	}
			// })
		},


		getModelDefault: function () {
			return {

			}
		},

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

		bindTable: async function () {
			let oThis = this;
			await projectService.getAllProjectsDetail(function (data) {
				if (data.length) {
					console.log("---------------------------data*******------------------", data);
					let aRowsCount = [];
					let projectModelOne = oThis.getView().getModel("projectModel");
					projectModelOne.setData({ modelData: data[0] });
					oThis.getView().setModel(projectModelOne, "projectModel")
					console.log("------------------projectModel------------------",projectModelOne);

					aRowsCount.push({
						rowsCount: data[0].length
					});

					let oRowsCount = new JSONModel();
					oRowsCount.setData(aRowsCount[0]);
					console.log("oRowsCount", oRowsCount);
					oThis.getView().setModel(oRowsCount, "rowcount_model");

					let startdataearray = [];
					if (data.length) {
						if (data[0].length > 0 || data[1].length > 0 || data[2].length > 0 || data[3].length > 0) {
							for (let i = 0; i < data[0].length; i++) {
								let mergedObject = null; // Define mergedObject with initial value null
								for (p = 0; p < data[1].length; p++) {
									if (
										data[0][i] &&
										data[1][p] &&
										data[0][i].projectid &&
										data[1][p].projectid &&
										data[0][i].projectid === data[1][p].projectid
									) {
										mergedObject = {
											projectid: data[0][i].projectid,
											Department: data[0][i].Department,
											Complete: data[0][i].Complete,
											actualdays: data[0][i].actualdays,
											modelname: data[0][i].modelname,
											niengineer: data[0][i].niengineer,
											orderno: data[0][i].orderno,
											plandays: data[0][i].plandays,
											projectactdate: data[0][i].projectactdate,
											projectcomdate: data[0][i].projectcomdate,
											projectcount: data[0][i].projectcount,
											projectname: data[0][i].projectname,
											saleengineer: data[0][i].saleengineer,
											AdvanceCredited: data[0][i].AdvanceCredited,
											CheckSite: data[0][i].CheckSite,
											FileHandedOverCCD: data[0][i].FileHandedOverCCD,
											GADReady: data[0][i].GADReady,
											GADRequest: data[0][i].GADRequest,
											JSVDone: data[0][i].JSVDone,
											ShipmentScheduled: data[0][i].ShipmentScheduled,
											ApprovedGADDesign: data[1][p].ApprovedGADDesign,
											BOQReady: data[1][p].BOQReady,
											DeliveryStage1: data[1][p].DeliveryStage1,
											EnterinFocus: data[1][p].EnterinFocus,
											InstallationQCStage1: data[1][p].InstallationQCStage1,
											InstallationStage1: data[1][p].InstallationStage1,
											PaymentStage1: data[1][p].PaymentStage1,
											ProdQCStage1: data[1][p].ProdQCStage1,
											ProductionDrawingReady: data[1][p].ProductionDrawingReady
										};

										console.log("--------mergedObject---------", mergedObject);
									}
								}

								for (let q = 0; q < data[2].length; q++) {
									if (
										mergedObject &&
										data[2][q] &&
										mergedObject.projectid &&
										data[2][q].projectid &&
										mergedObject.projectid === data[2][q].projectid
									) {
										mergedObject.DeliveryStage2 = data[2][q].DeliveryStage2;
										mergedObject.DeliveryStage3 = data[2][q].DeliveryStage3;
										mergedObject.InstallationQCStage3 = data[2][q].InstallationQCStage3;
										mergedObject.InstallationStage2 = data[2][q].InstallationStage2;
										mergedObject.PaymentStage2 = data[2][q].PaymentStage2;
										mergedObject.ProductionQCStage2 = data[2][q].ProductionQCStage2;
										mergedObject.ProductionStage2 = data[2][q].ProductionStage2;
									}
								}

								for (let r = 0; r < data[3].length; r++) {
									if (
										mergedObject &&
										data[3][r] &&
										mergedObject.projectid &&
										data[3][r].projectid &&
										mergedObject.projectid === data[3][r].projectid
									) {
										mergedObject.FinalInstallationQC = data[3][r].FinalInstallationQC;
										mergedObject.FinalPayment = data[3][r].FinalPayment;
										mergedObject.HandedOverCustomer = data[3][r].HandedOverCustomer;
										mergedObject.InspectionByEI = data[3][r].InspectionByEI;
										mergedObject.InstallationStage3 = data[3][r].InstallationStage3;
										mergedObject.JobAddedinWarranty = data[3][r].JobAddedinWarranty;
									}
								}

								if (mergedObject) { // Check if mergedObject is not null
									startdataearray.push(mergedObject);
									console.log("--------startdataearray---------", startdataearray);
								}
							}
						}
					}
				}
			})

			await projectService.getAllProjectsStagePerDetail(function (StagePerdata) {
				if (StagePerdata.length) {
					console.log("---------------------------getAllProjectsStagePerDetail*******------------------", StagePerdata);
					let stageperarray = [];
					if (StagePerdata.length) {
						if (StagePerdata[0].length > 0 || StagePerdata[1].length > 0 || StagePerdata[2].length > 0 || StagePerdata[3].length > 0) {
							for (let b = 0; b < StagePerdata[0].length; b++) {
								let mergedObjectstageper = null; // Define mergedObjectstageper with initial value null
								for (c = 0; c < StagePerdata[1].length; c++) {
									if (
										StagePerdata[0][b] &&
										StagePerdata[1][c] &&
										StagePerdata[0][b].projectid &&
										StagePerdata[1][c].projectid &&
										StagePerdata[0][b].projectid === StagePerdata[1][c].projectid
									) {
										mergedObjectstageper = {
											projectid: StagePerdata[0][b].projectid,
											AdvanceCreditedComPer: StagePerdata[0][b].AdvanceCreditedComPer,
											CheckSiteComPer: StagePerdata[0][b].CheckSiteComPer,
											FileHandedOverCCDComPer: StagePerdata[0][b].FileHandedOverCCDComPer,
											GADReadyComPer: StagePerdata[0][b].GADReadyComPer,
											GADRequestComPer: StagePerdata[0][b].GADRequestComPer,
											JSVDoneComPer: StagePerdata[0][b].JSVDoneComPer,
											ShipmentScheduledComPer: StagePerdata[0][b].ShipmentScheduledComPer,
											ApprovedGADDesignComPer: StagePerdata[1][c].ApprovedGADDesignComPer,
											BOQReadyComPer: StagePerdata[1][c].BOQReadyComPer,
											DeliveryStage1ComPer: StagePerdata[1][c].DeliveryStage1ComPer,
											EnterinFocusComPer: StagePerdata[1][c].EnterinFocusComPer,
											InstallationQCStage1ComPer: StagePerdata[1][c].InstallationQCStage1ComPer,
											InstallationStage1ComPer: StagePerdata[1][c].InstallationStage1ComPer,
											PaymentStage1ComPer: StagePerdata[1][c].PaymentStage1ComPer,
											ProdQCStage1ComPer: StagePerdata[1][c].ProdQCStage1ComPer,
											ProductionDrawingReadyComPer: StagePerdata[1][c].ProductionDrawingReadyComPer
										};

										console.log("--------mergedObjectstageper---------", mergedObjectstageper);
									}
								}

								for (let d = 0; d < StagePerdata[2].length; d++) {
									if (
										mergedObjectstageper &&
										StagePerdata[2][d] &&
										mergedObjectstageper.projectid &&
										StagePerdata[2][d].projectid &&
										mergedObjectstageper.projectid === StagePerdata[2][d].projectid
									) {
										mergedObjectstageper.DeliveryStage2ComPer = StagePerdata[2][d].DeliveryStage2ComPer;
										mergedObjectstageper.DeliveryStage3ComPer = StagePerdata[2][d].DeliveryStage3ComPer;
										mergedObjectstageper.InstallationQCStage3ComPer = StagePerdata[2][d].InstallationQCStage3ComPer;
										mergedObjectstageper.InstallationStage2ComPer = StagePerdata[2][d].InstallationStage2ComPer;
										mergedObjectstageper.PaymentStage2ComPer = StagePerdata[2][d].PaymentStage2ComPer;
										mergedObjectstageper.ProductionQCStage2ComPer = StagePerdata[2][d].ProductionQCStage2ComPer;
										mergedObjectstageper.ProductionStage2Per = StagePerdata[2][d].ProductionStage2ComPer;
									}
								}

								for (let e = 0; e < StagePerdata[3].length; e++) {
									if (
										mergedObjectstageper &&
										StagePerdata[3][e] &&
										mergedObjectstageper.projectid &&
										StagePerdata[3][e].projectid &&
										mergedObjectstageper.projectid === StagePerdata[3][e].projectid
									) {
										mergedObjectstageper.FinalInstallationQCComPer = StagePerdata[3][e].FinalInstallationQCComPer;
										mergedObjectstageper.FinalPaymentComPer = StagePerdata[3][e].FinalPaymentComPer;
										mergedObjectstageper.HandedOverCustomerComPer = StagePerdata[3][e].HandedOverCustomerComPer;
										mergedObjectstageper.InspectionByEIComPer = StagePerdata[3][e].InspectionByEIComPer;
										mergedObjectstageper.InstallationStage3ComPer = StagePerdata[3][e].InstallationStage3ComPer;
										mergedObjectstageper.JobAddedinWarrantyComPer = StagePerdata[3][e].JobAddedinWarrantyComPer;
									}
								}

								if (mergedObjectstageper) { // Check if mergedObjectstageper is not null
									stageperarray.push(mergedObjectstageper);
									console.log("--------stageperarray---------", stageperarray);
								}
							}
						}
					}

				}
			})

			await projectService.getAllProjectsProjWeightageDetail(function (projectWeightagedata) {
				if (projectWeightagedata.length) {
					console.log("---------------------------projectWeightagedata*******------------------", projectWeightagedata);
					let proweightageperarray = [];
					if (projectWeightagedata.length) {
						if (projectWeightagedata[0].length > 0 || projectWeightagedata[1].length > 0 || projectWeightagedata[2].length > 0 || projectWeightagedata[3].length > 0) {
							for (let x = 0; x < projectWeightagedata[0].length; x++) {
								let mergedObjectProWeightageper = null; // Define mergedObjectProWeightageper with initial value null
								for (y = 0; y < projectWeightagedata[1].length; y++) {
									if (
										projectWeightagedata[0][x] &&
										projectWeightagedata[1][y] &&
										projectWeightagedata[0][x].projectid &&
										projectWeightagedata[1][y].projectid &&
										projectWeightagedata[0][x].projectid === projectWeightagedata[1][y].projectid
									) {
										mergedObjectProWeightageper = {
											projectid: projectWeightagedata[0][x].projectid,
											AdvanceCreditedProweightage: projectWeightagedata[0][x].AdvanceCreditedProweightage,
											CheckSiteProweightage: projectWeightagedata[0][x].CheckSiteProweightage,
											FileHandedOverCCDProweightage: projectWeightagedata[0][x].FileHandedOverCCDProweightage,
											GADReadyProweightage: projectWeightagedata[0][x].GADReadyProweightage,
											GADRequestProweightage: projectWeightagedata[0][x].GADRequestProweightage,
											JSVDoneProweightage: projectWeightagedata[0][x].JSVDoneProweightage,
											ShipmentScheduledProweightage: projectWeightagedata[0][x].ShipmentScheduledProweightage,
											ApprovedGADDesignProweightage: projectWeightagedata[1][y].ApprovedGADDesignProweightage,
											BOQReadyProweightage: projectWeightagedata[1][y].BOQReadyProweightage,
											DeliveryStage1Proweightage: projectWeightagedata[1][y].DeliveryStage1Proweightage,
											EnterinFocusProweightage: projectWeightagedata[1][y].EnterinFocusProweightage,
											InstallationQCStage1Proweightage: projectWeightagedata[1][y].InstallationQCStage1Proweightage,
											InstallationStage1Proweightage: projectWeightagedata[1][y].InstallationStage1Proweightage,
											PaymentStage1Proweightage: projectWeightagedata[1][y].PaymentStage1Proweightage,
											ProdQCStage1Proweightage: projectWeightagedata[1][y].ProdQCStage1Proweightage,
											ProductionDrawingReadyProweightage: projectWeightagedata[1][y].ProductionDrawingReadyProweightage
										};

										console.log("--------mergedObjectProWeightageper---------", mergedObjectProWeightageper);
									}
								}

								for (let z = 0; z < projectWeightagedata[2].length; z++) {
									if (
										mergedObjectProWeightageper &&
										projectWeightagedata[2][z] &&
										mergedObjectProWeightageper.projectid &&
										projectWeightagedata[2][z].projectid &&
										mergedObjectProWeightageper.projectid === projectWeightagedata[2][z].projectid
									) {
										mergedObjectProWeightageper.DeliveryStage2Proweightage = projectWeightagedata[2][z].DeliveryStage2Proweightage;
										mergedObjectProWeightageper.DeliveryStage3Proweightage = projectWeightagedata[2][z].DeliveryStage3Proweightage;
										mergedObjectProWeightageper.InstallationQCStage3Proweightage = projectWeightagedata[2][z].InstallationQCStage3Proweightage;
										mergedObjectProWeightageper.InstallationStage2Proweightage = projectWeightagedata[2][z].InstallationStage2Proweightage;
										mergedObjectProWeightageper.PaymentStage2Proweightage = projectWeightagedata[2][z].PaymentStage2Proweightage;
										mergedObjectProWeightageper.ProductionQCStage2Proweightage = projectWeightagedata[2][z].ProductionQCStage2Proweightage;
										mergedObjectProWeightageper.ProductionStage2Proweightage = projectWeightagedata[2][z].ProductionStage2Proweightage;
									}
								}

								for (let u = 0; u < projectWeightagedata[3].length; u++) {
									if (
										mergedObjectProWeightageper &&
										projectWeightagedata[3][u] &&
										mergedObjectProWeightageper.projectid &&
										projectWeightagedata[3][u].projectid &&
										mergedObjectProWeightageper.projectid === projectWeightagedata[3][u].projectid
									) {
										mergedObjectProWeightageper.FinalInstallationQCProweightage = projectWeightagedata[3][u].FinalInstallationQCProweightage;
										mergedObjectProWeightageper.FinalPaymentProweightage = projectWeightagedata[3][u].FinalPaymentProweightage;
										mergedObjectProWeightageper.HandedOverCustomerProweightage = projectWeightagedata[3][u].HandedOverCustomerProweightage;
										mergedObjectProWeightageper.InspectionByEIProweightage = projectWeightagedata[3][u].InspectionByEIProweightage;
										mergedObjectProWeightageper.InstallationStage3Proweightage = projectWeightagedata[3][u].InstallationStage3Proweightage;
										mergedObjectProWeightageper.JobAddedinWarrantyProweightage = projectWeightagedata[3][u].JobAddedinWarrantyProweightage;
									}
								}

								if (mergedObjectProWeightageper) { // Check if mergedObjectProWeightageper is not null
									proweightageperarray.push(mergedObjectProWeightageper);
									console.log("--------proweightageperarray---------", proweightageperarray);
								}
							}
						}
					}

				}
			})

			await projectService.getAllProjectDepartmentDetail(function (projectDepartmentdata) {
				if (projectDepartmentdata.length) {
					console.log("---------------------------projectDepartmentdata*******------------------", projectDepartmentdata);
					let prodepartmentperarray = [];
					if (projectDepartmentdata.length) {
						if (projectDepartmentdata[0].length > 0 || projectDepartmentdata[1].length > 0 || projectDepartmentdata[2].length > 0 || projectDepartmentdata[3].length > 0) {
							for (let x = 0; x < projectDepartmentdata[0].length; x++) {
								let mergedObjectdepartment = null; // Define mergedObjectdepartment with initial value null
								for (y = 0; y < projectDepartmentdata[1].length; y++) {
									if (
										projectDepartmentdata[0][x] &&
										projectDepartmentdata[1][y] &&
										projectDepartmentdata[0][x].projectid &&
										projectDepartmentdata[1][y].projectid &&
										projectDepartmentdata[0][x].projectid === projectDepartmentdata[1][y].projectid
									) {
										mergedObjectdepartment = {
											projectid: projectDepartmentdata[0][x].projectid,
											AdvanceCreditedProweightage: projectDepartmentdata[0][x].AdvanceCreditedProweightage,
											CheckSiteProweightage: projectDepartmentdata[0][x].CheckSiteProweightage,
											FileHandedOverCCDProweightage: projectDepartmentdata[0][x].FileHandedOverCCDProweightage,
											GADReadyProweightage: projectDepartmentdata[0][x].GADReadyProweightage,
											GADRequestProweightage: projectDepartmentdata[0][x].GADRequestProweightage,
											JSVDoneProweightage: projectDepartmentdata[0][x].JSVDoneProweightage,
											ShipmentScheduledProweightage: projectDepartmentdata[0][x].ShipmentScheduledProweightage,
											ApprovedGADDesignProweightage: projectDepartmentdata[1][y].ApprovedGADDesignProweightage,
											BOQReadyProweightage: projectDepartmentdata[1][y].BOQReadyProweightage,
											DeliveryStage1Proweightage: projectDepartmentdata[1][y].DeliveryStage1Proweightage,
											EnterinFocusProweightage: projectDepartmentdata[1][y].EnterinFocusProweightage,
											InstallationQCStage1Proweightage: projectDepartmentdata[1][y].InstallationQCStage1Proweightage,
											InstallationStage1Proweightage: projectDepartmentdata[1][y].InstallationStage1Proweightage,
											PaymentStage1Proweightage: projectDepartmentdata[1][y].PaymentStage1Proweightage,
											ProdQCStage1Proweightage: projectDepartmentdata[1][y].ProdQCStage1Proweightage,
											ProductionDrawingReadyProweightage: projectDepartmentdata[1][y].ProductionDrawingReadyProweightage
										};

										console.log("--------mergedObjectdepartment---------", mergedObjectdepartment);
									}
								}

								for (let z = 0; z < projectDepartmentdata[2].length; z++) {
									if (
										mergedObjectdepartment &&
										projectDepartmentdata[2][z] &&
										mergedObjectdepartment.projectid &&
										projectDepartmentdata[2][z].projectid &&
										mergedObjectdepartment.projectid === projectDepartmentdata[2][z].projectid
									) {
										mergedObjectdepartment.DeliveryStage2Proweightage = projectDepartmentdata[2][z].DeliveryStage2Proweightage;
										mergedObjectdepartment.DeliveryStage3Proweightage = projectDepartmentdata[2][z].DeliveryStage3Proweightage;
										mergedObjectdepartment.InstallationQCStage3Proweightage = projectDepartmentdata[2][z].InstallationQCStage3Proweightage;
										mergedObjectdepartment.InstallationStage2Proweightage = projectDepartmentdata[2][z].InstallationStage2Proweightage;
										mergedObjectdepartment.PaymentStage2Proweightage = projectDepartmentdata[2][z].PaymentStage2Proweightage;
										mergedObjectdepartment.ProductionQCStage2Proweightage = projectDepartmentdata[2][z].ProductionQCStage2Proweightage;
										mergedObjectdepartment.ProductionStage2Proweightage = projectDepartmentdata[2][z].ProductionStage2Proweightage;
									}
								}

								for (let u = 0; u < projectDepartmentdata[3].length; u++) {
									if (
										mergedObjectdepartment &&
										projectDepartmentdata[3][u] &&
										mergedObjectdepartment.projectid &&
										projectDepartmentdata[3][u].projectid &&
										mergedObjectdepartment.projectid === projectDepartmentdata[3][u].projectid
									) {
										mergedObjectdepartment.FinalInstallationQCProweightage = projectDepartmentdata[3][u].FinalInstallationQCProweightage;
										mergedObjectdepartment.FinalPaymentProweightage = projectDepartmentdata[3][u].FinalPaymentProweightage;
										mergedObjectdepartment.HandedOverCustomerProweightage = projectDepartmentdata[3][u].HandedOverCustomerProweightage;
										mergedObjectdepartment.InspectionByEIProweightage = projectDepartmentdata[3][u].InspectionByEIProweightage;
										mergedObjectdepartment.InstallationStage3Proweightage = projectDepartmentdata[3][u].InstallationStage3Proweightage;
										mergedObjectdepartment.JobAddedinWarrantyProweightage = projectDepartmentdata[3][u].JobAddedinWarrantyProweightage;
									}
								}

								if (mergedObjectdepartment) { // Check if mergedObjectdepartment is not null
									prodepartmentperarray.push(mergedObjectdepartment);
									console.log("--------prodepartmentperarray---------", prodepartmentperarray);
								}
							}
						}
					}

				}
			})
		},

		handleRouteMatched: function (evt) {
			this.loadData();
		},

		setDetailPage: function (channel, event, data) {
			this.detailView = sap.ui.view({
				viewName: "sap.ui.elev8rerp.componentcontainer.view.ProjectManagement." + data.viewName,
				type: "XML"
			});

			this.detailView.setModel(data.viewModel, "viewModel");
			this.oFlexibleColumnLayout.removeAllMidColumnPages();
			this.oFlexibleColumnLayout.addMidColumnPage(this.detailView);
			this.oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
		},

		onListItemPress: function (oEvent) {
			var viewModel = oEvent.getSource().getBindingContext("PActivityMasterModel");
			var model = { "id": viewModel.getProperty("id") }
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.publish("activitymaster", "setDetailPage", { viewName: "ProjectDetail", viewModel: model });
		},

		onAddNew: function (oEvent) {
			this.bus = sap.ui.getCore().getEventBus();
			this.bus.publish("activitymaster", "setDetailPage", { viewName: "ProjectDetail" });
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
			var contains = sap.ui.model.FilterOperator.Contains;
			var columns = ['projectname', 'milestone', 'status', 'startdate'];
			var filters = new sap.ui.model.Filter(columns.map(function (colName) {
				return new sap.ui.model.Filter(colName, contains, sQuery);
			}),
				false);

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [filters];
			}

			this.getView().byId("tblProjectMaster").getBinding("items").filter(oTableSearchState, "Application");
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("tblProjectMaster"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("partyname", this._bDescendingSort);
			oBinding.sort(oSorter);
		},

		loadData: function () {
			var currentContext = this;
			ProjectTracking.getAllProjectTracking(function (data) {
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ modelData: data[0] });
				currentContext.getView().setModel(oModel, "PActivityMasterModel");
				console.log("PActivityMasterModel", oModel);
			});
		},

		onExit: function () {
			this.bus.unsubscribe("settermaster", "setDetailPage", this.setDetailPage, this);
		}
	});

}, true);
