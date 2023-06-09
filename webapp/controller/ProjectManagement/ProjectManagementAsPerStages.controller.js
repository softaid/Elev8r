sap.ui.define([
	"sap/ui/model/json/JSONModel",
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'sap/ui/model/Sorter',
	'sap/ui/elev8rerp/componentcontainer/services/LeadManagement/Lead.service',
	'sap/ui/elev8rerp/componentcontainer/services/ProjectManagement/ProjectTracking.service',
	'sap/ui/elev8rerp/componentcontainer/utility/xlsx',
	'sap/ui/elev8rerp/componentcontainer/services/projectManagement/Project.service',
	'sap/m/MessageToast',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	'sap/ui/elev8rerp/componentcontainer/controller/formatter/fragment.formatter',


], function (JSONModel, BaseController, Sorter, leadService, ProjectTracking, xlsx, projectService, MessageToast, ocommonfunction, formatter) {


	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.ProjectManagement.ProjectManagementAsPerStages", {

        formatter:formatter,

		
		setCheckboxEnable: function (sValue) 
        {	
			
			let a=true;
			let b=false;
			 if(sValue && sValue.trim() !== "")
			 {
				return b;
			 }
			 else{
				 return a;
			 }
		},

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

			var model = new JSONModel();
			model.setData([]);
			this.getView().setModel(model, "DepartmentModel");

			var stagestdPermodel = new JSONModel();
			stagestdPermodel.setData([]);
			this.getView().setModel(stagestdPermodel, "stagePerModel");

			var datemodel = new JSONModel();
			datemodel.setData({ projectArray: [], orderArray: [] });
			this.getView().setModel(datemodel, "dateModel");

			let jobmodel = new JSONModel();
			jobmodel.setData({ count:0});
			this.getView().setModel(jobmodel, "jobModel");

			this.count=0;


			var projectModel = new JSONModel();
			projectModel.setData({ modelData: [] });
			this.getView().setModel(projectModel, "projectModel");

			var model = new JSONModel();
			model.setData(emptyModel);
			this.fnShortCut();
			this.bindTable();
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
			let resultJobArray = []
			let startdataearray = [];
			let stageperarray = [];
			let proweightageperarray = [];
			let prodepartmentperarray = [];
			let proenddateperarray = [];
			oThis.Finalarray = [];

			await projectService.getAllProjectsDetail(function (data) {
				if (data.length) {
					console.log("---------------------------data*******------------------", data);
					let aRowsCount = [];
					aRowsCount.push({
						rowsCount: data[0].length
					});

					let oRowsCount = new JSONModel();
					oRowsCount.setData(aRowsCount[0]);
					console.log("oRowsCount", oRowsCount);
					oThis.getView().setModel(oRowsCount, "rowcount_model");

					//let startdataearray = [];
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
											orderdate: data[0][i].orderdate,
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
											GADApproved: data[0][i].GADApproved,
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
											ProductionDrawingReady: data[1][p].ProductionDrawingReady,
											ProductionStage1: data[1][p].ProductionStage1
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
										mergedObject.ProductionQCStage3 = data[2][q].ProductionQCStage3;
										mergedObject.ProductionStage2 = data[2][q].ProductionStage2;
										mergedObject.ProductionStage3 = data[2][q].ProductionStage3;



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
					//let stageperarray = [];
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
											projectcount: StagePerdata[0][b].projectcount,
											AdvanceCreditedComPer: StagePerdata[0][b].AdvanceCreditedComPer,
											CheckSiteComPer: StagePerdata[0][b].CheckSiteComPer,
											FileHandedOverCCDComPer: StagePerdata[0][b].FileHandedOverCCDComPer,
											GADReadyComPer: StagePerdata[0][b].GADReadyComPer,
											GADRequestComPer: StagePerdata[0][b].GADRequestComPer,
											GADApprovedComPer: StagePerdata[0][b].GADApprovedComPer,
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
										mergedObjectstageper.ProductionQCStage3ComPer = StagePerdata[2][d].ProductionQCStage3ComPer;
										mergedObjectstageper.ProductionStage2Per = StagePerdata[2][d].ProductionStage2ComPer;
										mergedObjectstageper.ProductionStage3Per = StagePerdata[2][d].ProductionStage3ComPer;


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
					//let proweightageperarray = [];
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
											GADApprovedProweightage: projectWeightagedata[0][x].GADApprovedProweightage,
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
										mergedObjectProWeightageper.ProductionStage3Proweightage = projectWeightagedata[2][z].ProductionStage3Proweightage;
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
					//let prodepartmentperarray = [];
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
											AdvanceCreditedDepartment: projectDepartmentdata[0][x].AdvanceCreditedDepartment,
											CheckSiteDepartment: projectDepartmentdata[0][x].CheckSiteDepartment,
											FileHandedOverCCDDepartment: projectDepartmentdata[0][x].FileHandedOverCCDDepartment,
											GADReadyDepartment: projectDepartmentdata[0][x].GADReadyDepartment,
											GADRequestDepartment: projectDepartmentdata[0][x].GADRequestDepartment,
											GADApprovedDepartment: projectDepartmentdata[0][x].GADApprovedDepartment,
											JSVDoneDepartment: projectDepartmentdata[0][x].JSVDoneDepartment,
											ShipmentScheduledDepartment: projectDepartmentdata[0][x].ShipmentScheduledDepartment,
											ApprovedGADDesignDepartment: projectDepartmentdata[1][y].ApprovedGADDesignDepartment,
											BOQReadyDepartment: projectDepartmentdata[1][y].BOQReadyDepartment,
											DeliveryStage1Department: projectDepartmentdata[1][y].DeliveryStage1Department,
											EnterinFocusDepartment: projectDepartmentdata[1][y].EnterinFocusDepartment,
											InstallationQCStage1Department: projectDepartmentdata[1][y].InstallationQCStage1Department,
											InstallationStage1Department: projectDepartmentdata[1][y].InstallationStage1Department,
											PaymentStage1Department: projectDepartmentdata[1][y].PaymentStage1Department,
											ProdQCStage1Department: projectDepartmentdata[1][y].ProdQCStage1Department,
											ProductionDrawingReadyDepartment: projectDepartmentdata[1][y].ProductionDrawingReadyDepartment
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
										mergedObjectdepartment.DeliveryStage2Department = projectDepartmentdata[2][z].DeliveryStage2Department;
										mergedObjectdepartment.DeliveryStage3Department = projectDepartmentdata[2][z].DeliveryStage3Department;
										mergedObjectdepartment.InstallationQCStage3Department = projectDepartmentdata[2][z].InstallationQCStage3Department;
										mergedObjectdepartment.InstallationStage2Department = projectDepartmentdata[2][z].InstallationStage2Department;
										mergedObjectdepartment.PaymentStage2Department = projectDepartmentdata[2][z].PaymentStage2Department;
										mergedObjectdepartment.ProductionQCStage2Department = projectDepartmentdata[2][z].ProductionQCStage2Department;
										mergedObjectdepartment.ProductionQCStage3Department = projectDepartmentdata[2][z].ProductionQCStage3Department;
										mergedObjectdepartment.ProductionStage2Department = projectDepartmentdata[2][z].ProductionStage2Department;
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
										mergedObjectdepartment.FinalInstallationQCDepartment = projectDepartmentdata[3][u].FinalInstallationQCDepartment;
										mergedObjectdepartment.FinalPaymentDepartment = projectDepartmentdata[3][u].FinalPaymentDepartment;
										mergedObjectdepartment.HandedOverCustomerDepartment = projectDepartmentdata[3][u].HandedOverCustomerDepartment;
										mergedObjectdepartment.InspectionByEIDepartment = projectDepartmentdata[3][u].InspectionByEIDepartment;
										mergedObjectdepartment.InstallationStage3Department = projectDepartmentdata[3][u].InstallationStage3Department;
										mergedObjectdepartment.JobAddedinWarrantyDepartment = projectDepartmentdata[3][u].JobAddedinWarrantyDepartment;
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

			await projectService.getAllProjectEndDateDetail(function (projectEndDateData) {
				if (projectEndDateData.length) {
					console.log("---------------------------projectEndDateData*******------------------", projectEndDateData);
					//let prodepartmentperarray = [];
					if (projectEndDateData.length) {
						if (projectEndDateData[0].length > 0 || projectEndDateData[1].length > 0 || projectEndDateData[2].length > 0 || projectEndDateData[3].length > 0) {
							for (let f = 0; f < projectEndDateData[0].length; f++) {
								let mergedObjectenddate = null; // Define mergedObjectenddate with initial value null
								for (g = 0; g < projectEndDateData[1].length; g++) {
									if (
										projectEndDateData[0][f] &&
										projectEndDateData[1][g] &&
										projectEndDateData[0][f].projectid &&
										projectEndDateData[1][g].projectid &&
										projectEndDateData[0][f].projectid === projectEndDateData[1][g].projectid
									) {
										mergedObjectenddate = {
											projectid: projectEndDateData[0][f].projectid,
											AdvanceCreditedenddate: projectEndDateData[0][f].AdvanceCreditedenddate,
											CheckSiteenddate: projectEndDateData[0][f].CheckSiteenddate,
											FileHandedOverCCDenddate: projectEndDateData[0][f].FileHandedOverCCDenddate,
											GADReadyenddate: projectEndDateData[0][f].GADReadyenddate,
											GADRequestenddate: projectEndDateData[0][f].GADRequestenddate,
											GADApprovedenddate: projectEndDateData[0][f].GADApprovedenddate,
											JSVDoneenddate: projectEndDateData[0][f].JSVDoneenddate,
											ShipmentScheduledenddate: projectEndDateData[0][f].ShipmentScheduledenddate,
											ApprovedGADDesignenddate: projectEndDateData[1][g].ApprovedGADDesignenddate,
											BOQReadyenddate: projectEndDateData[1][g].BOQReadyenddate,
											DeliveryStage1enddate: projectEndDateData[1][g].DeliveryStage1enddate,
											EnterinFocusenddate: projectEndDateData[1][g].EnterinFocusenddate,
											InstallationQCStage1enddate: projectEndDateData[1][g].InstallationQCStage1enddate,
											InstallationStage1enddate: projectEndDateData[1][g].InstallationStage1enddate,
											PaymentStage1enddate: projectEndDateData[1][g].PaymentStage1enddate,
											ProdQCStage1enddate: projectEndDateData[1][g].ProdQCStage1enddate,
											ProductionDrawingReadyenddate: projectEndDateData[1][g].ProductionDrawingReadyenddate
										};

										console.log("--------mergedObjectenddate---------", mergedObjectenddate);
									}
								}

								for (let h = 0; h < projectEndDateData[2].length; h++) {
									if (
										mergedObjectenddate &&
										projectEndDateData[2][h] &&
										mergedObjectenddate.projectid &&
										projectEndDateData[2][h].projectid &&
										mergedObjectenddate.projectid === projectEndDateData[2][h].projectid
									) {
										mergedObjectenddate.DeliveryStage2enddate = projectEndDateData[2][h].DeliveryStage2enddate;
										mergedObjectenddate.DeliveryStage3enddate = projectEndDateData[2][h].DeliveryStage3enddate;
										mergedObjectenddate.InstallationQCStage3enddate = projectEndDateData[2][h].InstallationQCStage3enddate;
										mergedObjectenddate.InstallationStage2enddate = projectEndDateData[2][h].InstallationStage2enddate;
										mergedObjectenddate.PaymentStage2enddate = projectEndDateData[2][h].PaymentStage2enddate;
										mergedObjectenddate.ProductionQCStage2enddate = projectEndDateData[2][h].ProductionQCStage2enddate;
										mergedObjectenddate.ProductionQCStage3enddate = projectEndDateData[2][h].ProductionQCStage3enddate;
										mergedObjectenddate.ProductionStage2enddate = projectEndDateData[2][h].ProductionStage2enddate;
									}
								}

								for (let s = 0; s < projectEndDateData[3].length; s++) {
									if (
										mergedObjectenddate &&
										projectEndDateData[3][s] &&
										mergedObjectenddate.projectid &&
										projectEndDateData[3][s].projectid &&
										mergedObjectenddate.projectid === projectEndDateData[3][s].projectid
									) {
										mergedObjectenddate.FinalInstallationQCenddate = projectEndDateData[3][s].FinalInstallationQCenddate;
										mergedObjectenddate.FinalPaymentenddate = projectEndDateData[3][s].FinalPaymentenddate;
										mergedObjectenddate.HandedOverCustomerenddate = projectEndDateData[3][s].HandedOverCustomerenddate;
										mergedObjectenddate.InspectionByEIenddate = projectEndDateData[3][s].InspectionByEIenddate;
										mergedObjectenddate.InstallationStage3enddate = projectEndDateData[3][s].InstallationStage3enddate;
										mergedObjectenddate.JobAddedinWarrantyenddate = projectEndDateData[3][s].JobAddedinWarrantyenddate;
									}
								}

								if (mergedObjectenddate) { // Check if mergedObjectdepartment is not null
									proenddateperarray.push(mergedObjectenddate);
									console.log("--------proenddateperarray---------", proenddateperarray);
								}
							}
						}
					}

				}

			})

			await projectService.getAllProjectsDetail(function (projectDepartmentdata) {
				if (projectDepartmentdata.length) {

					if (startdataearray.length) {
						if (startdataearray.length > 0 || stageperarray.length > 0) {
							for (let i = 0; i < startdataearray.length; i++) {
								let mergedObjectfinal = null; // Define mergedObject with initial value null
								for (let p = 0; p < stageperarray.length; p++) {
									if (
										startdataearray[i] &&
										stageperarray[p] &&
										startdataearray[i].projectid &&
										stageperarray[p].projectid &&
										startdataearray[i].projectid === stageperarray[p].projectid
									) {
										mergedObjectfinal = {
											projectid: startdataearray[i].projectid,
											Department: startdataearray[i].Department,
											Complete: startdataearray[i].Complete,
											// actualdays: startdataearray[i].actualdays,
											modelname: startdataearray[i].modelname,
											niengineer: startdataearray[i].niengineer,
											orderno: startdataearray[i].orderno,
											orderdate: startdataearray[i].orderdate,
											plandays: startdataearray[i].plandays,
											projectactdate: startdataearray[i].projectactdate,
											projectcomdate: startdataearray[i].projectcomdate,
											projectcount: startdataearray[i].projectcount,
											projectname: startdataearray[i].projectname,
											saleengineer: startdataearray[i].saleengineer,
											AdvanceCredited: startdataearray[i].AdvanceCredited,
											CheckSite: startdataearray[i].CheckSite,
											FileHandedOverCCD: startdataearray[i].FileHandedOverCCD,
											GADReady: startdataearray[i].GADReady,
											GADRequest: startdataearray[i].GADRequest,
											GADApproved: startdataearray[i].GADApproved,
											JSVDone: startdataearray[i].JSVDone,
											ShipmentScheduled: startdataearray[i].ShipmentScheduled,
											ApprovedGADDesign: startdataearray[i].ApprovedGADDesign,
											BOQReady: startdataearray[i].BOQReady,
											DeliveryStage1: startdataearray[i].DeliveryStage1,
											EnterinFocus: startdataearray[i].EnterinFocus,
											InstallationQCStage1: startdataearray[i].InstallationQCStage1,
											InstallationStage1: startdataearray[i].InstallationStage1,
											PaymentStage1: startdataearray[i].PaymentStage1,
											ProdQCStage1: startdataearray[i].ProdQCStage1,
											ProductionDrawingReady: startdataearray[i].ProductionDrawingReady,
											ProductionStage1: startdataearray[i].ProductionStage1,
											DeliveryStage2: startdataearray[i].DeliveryStage2,
											DeliveryStage3: startdataearray[i].DeliveryStage3,
											InstallationQCStage3: startdataearray[i].InstallationQCStage3,
											InstallationStage2: startdataearray[i].InstallationStage2,
											PaymentStage2: startdataearray[i].PaymentStage2,
											ProductionQCStage2: startdataearray[i].ProductionQCStage2,
											ProductionStage3: startdataearray[i].ProductionStage3,
											ProductionQCStage3: startdataearray[i].ProductionQCStage3,
											ProductionStage2: startdataearray[i].ProductionStage2,
											FinalInstallationQC: startdataearray[i].FinalInstallationQC,
											FinalPayment: startdataearray[i].FinalPayment,
											HandedOverCustomer: startdataearray[i].HandedOverCustomer,
											InspectionByEI: startdataearray[i].InspectionByEI,
											InstallationStage3: startdataearray[i].InstallationStage3,
											JobAddedinWarranty: startdataearray[i].JobAddedinWarranty,
											AdvanceCreditedComPer: stageperarray[p].AdvanceCreditedComPer,
											CheckSiteComPer: stageperarray[p].CheckSiteComPer,
											FileHandedOverCCDComPer: stageperarray[p].FileHandedOverCCDComPer,
											GADReadyComPer: stageperarray[p].GADReadyComPer,
											GADRequestComPer: stageperarray[p].GADRequestComPer,
											GADApprovedComPer: stageperarray[p].GADApprovedComPer,
											JSVDoneComPer: stageperarray[p].JSVDoneComPer,
											ShipmentScheduledComPer: stageperarray[p].ShipmentScheduledComPer,
											ApprovedGADDesignComPer: stageperarray[p].ApprovedGADDesignComPer,
											BOQReadyComPer: stageperarray[p].BOQReadyComPer,
											DeliveryStage1ComPer: stageperarray[p].DeliveryStage1ComPer,
											EnterinFocusComPer: stageperarray[p].EnterinFocusComPer,
											InstallationQCStage1ComPer: stageperarray[p].InstallationQCStage1ComPer,
											InstallationStage1ComPer: stageperarray[p].InstallationStage1ComPer,
											PaymentStage1ComPer: stageperarray[p].PaymentStage1ComPer,
											ProdQCStage1ComPer: stageperarray[p].ProdQCStage1ComPer,
											ProductionDrawingReadyComPer: stageperarray[p].ProductionDrawingReadyComPer,
											DeliveryStage2ComPer: stageperarray[p].DeliveryStage2ComPer,
											DeliveryStage3ComPer: stageperarray[p].DeliveryStage3ComPer,
											InstallationQCStage3ComPer: stageperarray[p].InstallationQCStage3ComPer,
											InstallationStage2ComPer: stageperarray[p].InstallationStage2ComPer,
											PaymentStage2ComPer: stageperarray[p].PaymentStage2ComPer,
											ProductionQCStage2ComPer: stageperarray[p].ProductionQCStage2ComPer,
											ProductionStage2Per: stageperarray[p].ProductionStage2Per,
											FinalInstallationQCComPer: stageperarray[p].FinalInstallationQCComPer,
											FinalPaymentComPer: stageperarray[p].FinalPaymentComPer,
											HandedOverCustomerComPer: stageperarray[p].HandedOverCustomerComPer,
											InspectionByEIComPer: stageperarray[p].InspectionByEIComPer,
											InstallationStage3ComPer: stageperarray[p].InstallationStage3ComPer,
											JobAddedinWarrantyComPer: stageperarray[p].JobAddedinWarrantyComPer,
											ProductionStage3ComPer: stageperarray[p].ProductionStage3ComPer,
											ProductionQCStage3ComPer: stageperarray[p].ProductionQCStage3ComPer,


										};

										console.log("--------mergedObjectfinal---------", mergedObjectfinal);
									}
								}

								for (let q = 0; q < proweightageperarray.length; q++) {
									if (
										mergedObjectfinal &&
										proweightageperarray[q] &&
										mergedObjectfinal.projectid &&
										proweightageperarray[q].projectid &&
										mergedObjectfinal.projectid === proweightageperarray[q].projectid
									) {
										mergedObjectfinal.AdvanceCreditedProweightage = proweightageperarray[q].AdvanceCreditedProweightage;
										mergedObjectfinal.ApprovedGADDesignProweightage = proweightageperarray[q].ApprovedGADDesignProweightage;
										mergedObjectfinal.BOQReadyProweightage = proweightageperarray[q].BOQReadyProweightage;
										mergedObjectfinal.DeliveryStage1Proweightage = proweightageperarray[q].DeliveryStage1Proweightage;
										mergedObjectfinal.DeliveryStage2Proweightage = proweightageperarray[q].DeliveryStage2Proweightage;
										mergedObjectfinal.DeliveryStage3Proweightage = proweightageperarray[q].DeliveryStage3Proweightage;
										mergedObjectfinal.EnterinFocusProweightage = proweightageperarray[q].EnterinFocusProweightage;
										mergedObjectfinal.FileHandedOverCCDProweightage = proweightageperarray[q].FileHandedOverCCDProweightage;
										mergedObjectfinal.FinalInstallationQCProweightage = proweightageperarray[q].FinalInstallationQCProweightage;
										mergedObjectfinal.FinalPaymentProweightage = proweightageperarray[q].FinalPaymentProweightage;
										mergedObjectfinal.GADReadyProweightage = proweightageperarray[q].GADReadyProweightage;
										mergedObjectfinal.GADRequestProweightage = proweightageperarray[q].GADRequestProweightage;
										mergedObjectfinal.GADApprovedProweightage = proweightageperarray[q].GADApprovedProweightage;
										mergedObjectfinal.HandedOverCustomerProweightage = proweightageperarray[q].HandedOverCustomerProweightage;
										mergedObjectfinal.InspectionByEIProweightage = proweightageperarray[q].InspectionByEIProweightage;
										mergedObjectfinal.InstallationQCStage1Proweightage = proweightageperarray[q].InstallationQCStage1Proweightage;
										mergedObjectfinal.InstallationQCStage3Proweightage = proweightageperarray[q].InstallationQCStage3Proweightage;
										mergedObjectfinal.InstallationStage1Proweightage = proweightageperarray[q].InstallationStage1Proweightage;
										mergedObjectfinal.InstallationStage2Proweightage = proweightageperarray[q].InstallationStage2Proweightage;
										mergedObjectfinal.InstallationStage3Proweightage = proweightageperarray[q].InstallationStage3Proweightage;
										mergedObjectfinal.JSVDoneProweightage = proweightageperarray[q].JSVDoneProweightage;
										mergedObjectfinal.JobAddedinWarrantyProweightage = proweightageperarray[q].JobAddedinWarrantyProweightage;
										mergedObjectfinal.PaymentStage1Proweightage = proweightageperarray[q].PaymentStage1Proweightage;
										mergedObjectfinal.PaymentStage2Proweightage = proweightageperarray[q].PaymentStage2Proweightage;
										mergedObjectfinal.ProdQCStage1Proweightage = proweightageperarray[q].ProdQCStage1Proweightage;
										mergedObjectfinal.ProductionDrawingReadyProweightage = proweightageperarray[q].ProductionDrawingReadyProweightage;
										mergedObjectfinal.ProductionQCStage2Proweightage = proweightageperarray[q].ProductionQCStage2Proweightage;
										mergedObjectfinal.ProductionStage2Proweightage = proweightageperarray[q].ProductionStage2Proweightage;
										mergedObjectfinal.ShipmentScheduledProweightage = proweightageperarray[q].ShipmentScheduledProweightage;



									}
								}

								for (let r = 0; r < prodepartmentperarray.length; r++) {
									if (
										mergedObjectfinal &&
										prodepartmentperarray[r] &&
										mergedObjectfinal.projectid &&
										prodepartmentperarray[r].projectid &&
										mergedObjectfinal.projectid === prodepartmentperarray[r].projectid
									) {
										mergedObjectfinal.AdvanceCreditedDepartment = prodepartmentperarray[r].AdvanceCreditedDepartment;
										mergedObjectfinal.ApprovedGADDesignDepartment = prodepartmentperarray[r].ApprovedGADDesignDepartment;
										mergedObjectfinal.BOQReadyDepartment = prodepartmentperarray[r].BOQReadyDepartment;
										mergedObjectfinal.CheckSiteDepartment = prodepartmentperarray[r].CheckSiteDepartment;
										mergedObjectfinal.DeliveryStage1Department = prodepartmentperarray[r].DeliveryStage1Department;
										mergedObjectfinal.DeliveryStage2Department = prodepartmentperarray[r].DeliveryStage2Department;
										mergedObjectfinal.EnterinFocusDepartment = prodepartmentperarray[r].EnterinFocusDepartment;
										mergedObjectfinal.FileHandedOverCCDDepartment = prodepartmentperarray[r].FileHandedOverCCDDepartment;
										mergedObjectfinal.FinalInstallationQCDepartment = prodepartmentperarray[r].FinalInstallationQCDepartment;
										mergedObjectfinal.FinalPaymentDepartment = prodepartmentperarray[r].FinalPaymentDepartment;
										mergedObjectfinal.GADReadyDepartment = prodepartmentperarray[r].GADReadyDepartment;
										mergedObjectfinal.GADRequestDepartment = prodepartmentperarray[r].GADRequestDepartment;
										mergedObjectfinal.GADApprovedDepartment = prodepartmentperarray[r].GADApprovedDepartment;
										mergedObjectfinal.HandedOverCustomerDepartment = prodepartmentperarray[r].HandedOverCustomerDepartment;
										mergedObjectfinal.InspectionByEIDepartment = prodepartmentperarray[r].InspectionByEIDepartment;
										mergedObjectfinal.InstallationQCStage1Department = prodepartmentperarray[r].InstallationQCStage1Department;
										mergedObjectfinal.InstallationQCStage3Department = prodepartmentperarray[r].InstallationQCStage3Department;
										mergedObjectfinal.InstallationStage1Department = prodepartmentperarray[r].InstallationStage1Department;
										mergedObjectfinal.InstallationStage2Department = prodepartmentperarray[r].InstallationStage2Department;
										mergedObjectfinal.InstallationStage3Department = prodepartmentperarray[r].InstallationStage3Department;
										mergedObjectfinal.JSVDoneDepartment = prodepartmentperarray[r].JSVDoneDepartment;
										mergedObjectfinal.JobAddedinWarrantyDepartment = prodepartmentperarray[r].JobAddedinWarrantyDepartment;
										mergedObjectfinal.PaymentStage1Department = prodepartmentperarray[r].PaymentStage1Department;
										mergedObjectfinal.PaymentStage2Department = prodepartmentperarray[r].PaymentStage2Department;
										mergedObjectfinal.ProdQCStage1Department = prodepartmentperarray[r].ProdQCStage1Department;
										mergedObjectfinal.ProductionDrawingReadyDepartment = prodepartmentperarray[r].ProductionDrawingReadyDepartment;
										mergedObjectfinal.ProductionQCStage2Department = prodepartmentperarray[r].ProductionQCStage2Department;
										mergedObjectfinal.ProductionStage2Department = prodepartmentperarray[r].ProductionStage2Department;
										mergedObjectfinal.ShipmentScheduledDepartment = prodepartmentperarray[r].ShipmentScheduledDepartment;
									}
								}

								for (let r = 0; r < proenddateperarray.length; r++) {
									if (
										mergedObjectfinal &&
										proenddateperarray[r] &&
										mergedObjectfinal.projectid &&
										proenddateperarray[r].projectid &&
										mergedObjectfinal.projectid === proenddateperarray[r].projectid
									) {
										mergedObjectfinal.AdvanceCreditedenddate = proenddateperarray[r].AdvanceCreditedenddate;
										mergedObjectfinal.ApprovedGADDesignenddate = proenddateperarray[r].ApprovedGADDesignenddate;
										mergedObjectfinal.BOQReadyenddate = proenddateperarray[r].BOQReadyenddate;
										mergedObjectfinal.CheckSiteenddate = proenddateperarray[r].CheckSiteenddate;
										mergedObjectfinal.DeliveryStage1enddate = proenddateperarray[r].DeliveryStage1enddate;
										mergedObjectfinal.DeliveryStage2enddate = proenddateperarray[r].DeliveryStage2enddate;
										mergedObjectfinal.EnterinFocusenddate = proenddateperarray[r].EnterinFocusenddate;
										mergedObjectfinal.FileHandedOverCCDenddate = proenddateperarray[r].FileHandedOverCCDenddate;
										mergedObjectfinal.FinalInstallationQCenddate = proenddateperarray[r].FinalInstallationQCenddate;
										mergedObjectfinal.FinalPaymentenddate = proenddateperarray[r].FinalPaymentenddate;
										mergedObjectfinal.GADReadyenddate = proenddateperarray[r].GADReadyenddate;
										mergedObjectfinal.GADRequestenddate = proenddateperarray[r].GADRequestenddate;
										mergedObjectfinal.GADApprovedenddate = proenddateperarray[r].GADApprovedenddate;
										mergedObjectfinal.HandedOverCustomerenddate = proenddateperarray[r].HandedOverCustomerenddate;
										mergedObjectfinal.InspectionByEIenddate = proenddateperarray[r].InspectionByEIenddate;
										mergedObjectfinal.InstallationQCStage1enddate = proenddateperarray[r].InstallationQCStage1enddate;
										mergedObjectfinal.InstallationQCStage3enddate = proenddateperarray[r].InstallationQCStage3enddate;
										mergedObjectfinal.InstallationStage1enddate = proenddateperarray[r].InstallationStage1enddate;
										mergedObjectfinal.InstallationStage2enddate = proenddateperarray[r].InstallationStage2enddate;
										mergedObjectfinal.InstallationStage3enddate = proenddateperarray[r].InstallationStage3enddate;
										mergedObjectfinal.JSVDoneenddate = proenddateperarray[r].JSVDoneenddate;
										mergedObjectfinal.JobAddedinWarrantyenddate = proenddateperarray[r].JobAddedinWarrantyenddate;
										mergedObjectfinal.PaymentStage1enddate = proenddateperarray[r].PaymentStage1enddate;
										mergedObjectfinal.PaymentStage2enddate = proenddateperarray[r].PaymentStage2enddate;
										mergedObjectfinal.ProdQCStage1enddate = proenddateperarray[r].ProdQCStage1enddate;
										mergedObjectfinal.ProductionDrawingReadyenddate = proenddateperarray[r].ProductionDrawingReadyenddate;
										mergedObjectfinal.ProductionQCStage2enddate = proenddateperarray[r].ProductionQCStage2enddate;
										mergedObjectfinal.ProductionStage2enddate = proenddateperarray[r].ProductionStage2enddate;
										mergedObjectfinal.ShipmentScheduledenddate = proenddateperarray[r].ShipmentScheduledenddate;
									}
								}


								if (mergedObjectfinal) { // Check if mergedObjectfinal is not null
									oThis.Finalarray.push(mergedObjectfinal);
									console.log("--------****************Finalarray--*************************-------", oThis.Finalarray);
								}
							}
						}
					}
				}

				let projectModelOne = oThis.getView().getModel("projectModel");
				projectModelOne.setData({ modelData: oThis.Finalarray });
				oThis.getView().setModel(projectModelOne, "projectModel")
				console.log("------------------projectModel------------------", projectModelOne);

				let dateModel = oThis.getView().getModel("dateModel");

				let projectDetailArr = []

				oThis.orderArray = [];// array of orderIds
				for (let projectdetail of oThis.Finalarray) {
					oThis.orderArray.push(projectdetail.orderno);
					projectDetailArr.push({});
				}
				oThis.noOfJobCalculation();
				dateModel.setData({ projectDetailArr: projectDetailArr })

				let departmentModel = oThis.getView().getModel("DepartmentModel");
				departmentModel.setData(prodepartmentperarray[0]);
				oThis.getView().setModel(departmentModel, "DepartmentModel");
				console.log("------------------DepartmentModel------------------", departmentModel);

				let stagestdModel = oThis.getView().getModel("stagePerModel");
				stagestdModel.setData(stageperarray[0]);
				oThis.getView().setModel(stagestdModel, "stagePerModel");
				console.log("------------------stagePerModel------------------", stagestdModel);

				dateModel.setData({projectDetailArr:projectDetailArr})
				
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

		onCheckBoxSelect: function (OEvent) {
			let checkbox = OEvent.getSource();
			let data = checkbox.data("mySuperExtraData");
			this.count=1;
			
			let dateModel = this.getView().getModel("dateModel");

			let dateModelDetails = this.getView().getModel("dateModel").oData;// it date model  for set field for reference

		    let jobModel= this.getView().getModel('jobModel').oData;
			let model = this.getView().getModel("projectModel").oData;

			// name of the stage start date in the project model  in sequence in array 
			let arrStart = ["AdvanceCredited", "FileHandedOverCCD", "CheckSite", "GADRequest", "GADReady", "JSVDone", "GADApproved", "ShipmentScheduled", "ApprovedGADDesign", "EnterinFocus", "BOQReady", "ProductionDrawingReady", "ProductionStage1", "ProdQCStage1", "PaymentStage1", "DeliveryStage1", "InstallationStage1", "InstallationQCStage1", "PaymentStage2", "ProductionStage2", "ProductionQCStage2", "DeliveryStage2", "InstallationStage2", "InstallationQCStage3", "ProductionStage3", "ProductionQCStage3", "DeliveryStage3", "InstallationStage3", "FinalInstallationQC", "InspectionByEI", "FinalPayment", "HandedOverCustomer", "JobAddedinWarranty"];//start

			// name of the stage end date in the project model  in sequence in array 
			let arrEnd = ["AdvanceCreditedenddate", "FileHandedOverCCDenddate", "CheckSiteenddate", "GADRequestenddate", "GADReadyenddate", "JSVDoneenddate", "GADApprovedenddate", "ShipmentScheduledenddate", "ApprovedGADDesignenddate", "EnterinFocusenddate", "BOQReadyenddate", "ProductionDrawingReadyenddate", "ProductionStage1enddate", "ProdQCStage1enddate", "PaymentStage1enddate", "DeliveryStage1enddate", "InstallationStage1enddate", "InstallationQCStage1enddate", "PaymentStage2enddate", "ProductionStage2enddate", "ProductionQCStage2enddate", "DeliveryStage2enddate", "InstallationStage2enddate", "InstallationQCStage3enddate", "ProductionStage3enddate", "ProductionQCStage3enddate", "DeliveryStage3enddate", "InstallationStage3enddate", "FinalInstallationQCenddate", "InspectionByEIenddate", "FinalPaymentenddate", "HandedOverCustomerenddate", "JobAddedinWarrantyenddate"];//end	

	
			// // row logic  start
			// let field = OEvent.mParameters.id
			// let rows = field.split("e");// rows
			// let row = (parseInt(rows[1]));
			// let resultrow = row > 39 ? parseInt(row / 39) : 0;//rows
			// //  row logic is complete 

			// // column logic start
			// let columning = field.split("");
			// let firstindex = columning.indexOf("x"); // column
			// let secondindex = columning.indexOf("-");

			// // get column in the form of  array
			// let columns = columning.splice(firstindex + 1, secondindex - (firstindex + 1))

			// let resultcolumn = parseInt(columns.join(""));// result column

			// // column logic ends




			let resultarr = data.split("_");

			let resultColumn = parseInt(resultarr[0]);  //  column

			let resultingRow = parseInt(resultarr[1]);

			let resultRow = parseInt(this.orderArray.indexOf(resultingRow)); // Row


			let result_column_field_End = arrEnd[resultColumn];//end date of current stage field name in view
			let result_column_field_Start = arrStart[(resultColumn + 1)]; // Start date of stage next to current  stage field name in view


			// current date logic start
			let currentDate = new Date();
			var resultDate = ocommonfunction.setTodaysDate(currentDate);
			// current date logic ends

			let stageweightname = `${arrStart[resultColumn]}Proweightage`;// name of current stage project weight 



			// if we select the checkbox 
			if (OEvent.mParameters.selected == true) {

				// bind  project completion date  
				if (result_column_field_End == "JobAddedinWarrantyenddate") {
					model.modelData[resultRow].projectactdate = resultDate;
					model.modelData[resultRow].actualdays = this.dayCalculation(model.modelData[resultRow].AdvanceCredited, resultDate);
				}

				let resultString=result_column_field_End.replace("enddate","jobs")

				jobModel[resultString]=jobModel[resultString]+1;

				// set value in dateModel for future reference
				dateModelDetails.projectDetailArr[resultRow][result_column_field_End] = model.modelData[resultRow][result_column_field_End];
				dateModelDetails.projectDetailArr[resultRow][result_column_field_Start] = model.modelData[resultRow][result_column_field_Start];
				// console.log("dateModelDetails : ",dateModelDetails);

				model.modelData[resultRow][result_column_field_End] = resultDate;// end date  of  current  stage
				model.modelData[resultRow][result_column_field_Start] = resultDate;// start date of next stage

				model.modelData[resultRow].Complete = parseFloat(model?.modelData[resultRow]?.Complete ?? 0) + parseFloat(model?.modelData[resultRow]?.[stageweightname] ?? 0);
				console.log(model);
			}

			// checkbox  selection remove 
			else {

				// remove project completion date  
				if (result_column_field_End == "JobAddedinWarrantyenddate") {
					model.modelData[resultRow].projectactdate = null;
					model.modelData[resultRow].actualdays = null;
				}

					let resultString=result_column_field_End.replace("enddate","jobs")

					jobModel[resultString]=jobModel[resultString]-1;

				   result_column_field_End=="JobAddedinWarrantyenddate"?model.modelData[resultRow].projectactdate=null:"1"; 
				model.modelData[resultRow][result_column_field_End] = dateModelDetails.projectDetailArr[resultRow]?.[result_column_field_End] ?? null; // set intial value as checkbox selection false
				model.modelData[resultRow][result_column_field_Start] = dateModelDetails.projectDetailArr[resultRow]?.[result_column_field_Start] ?? null;

				//  substract completion % of stage 
				model.modelData[resultRow].Complete = parseFloat(model?.modelData[resultRow]?.Complete ?? 0) - parseFloat(model?.modelData[resultRow]?.[stageweightname] ?? 0);
			}
			console.log(model);
			console.log(jobModel);

			OEvent.getSource().setEnabled(true);



			this.getView().getModel("jobModel").refresh();
			this.getView().getModel("projectModel").refresh();
		},


		noOfJobCalculation: function(){
            let oThis=this;
			let model = this.getView().getModel("projectModel").oData.modelData;
			let resultobj = {};
			let arrEnd = ["AdvanceCreditedenddate", "FileHandedOverCCDenddate", "CheckSiteenddate", "GADRequestenddate", "GADReadyenddate", "JSVDoneenddate", "GADApprovedenddate", "ShipmentScheduledenddate", "ApprovedGADDesignenddate", "EnterinFocusenddate", "BOQReadyenddate", "ProductionDrawingReadyenddate", "ProductionStage1enddate", "ProdQCStage1enddate", "PaymentStage1enddate", "DeliveryStage1enddate", "InstallationStage1enddate", "InstallationQCStage1enddate", "PaymentStage2enddate", "ProductionStage2enddate", "ProductionQCStage2enddate", "DeliveryStage2enddate", "InstallationStage2enddate", "InstallationQCStage3enddate", "ProductionStage3enddate", "ProductionQCStage3enddate", "DeliveryStage3enddate", "InstallationStage3enddate", "FinalInstallationQCenddate", "InspectionByEIenddate", "FinalPaymentenddate", "HandedOverCustomerenddate", "JobAddedinWarrantyenddate"];//end

			arrEnd.map((enddates)=>{
				let count=0;
				let enddate=enddates;
				model.map((projectdetail)=>{
					// console.log(projectdetail[enddate]);
					if(projectdetail[enddate] && projectdetail[enddate].trim() !== ""){
                         count++;
					}
				});
				let result_field=enddate.replace("enddate","jobs")
				resultobj[result_field]=count;
			});

			oThis.getView().getModel('jobModel').setData(resultobj);
			console.log(resultobj)
		},


		// calculate actual completion day
		dayCalculation: async function (intialDate, finalDate) {

			let oThis = this;
			if (intialDate != null && finalDate != null) {
				var parts = intialDate.split('/');
				let startdate = Date.parse(new Date(parts[2], parts[1], parts[0]));

				parts = finalDate.split('/');
				let enddate = Date.parse(new Date(parts[2], parts[1], parts[0]));// get  difference in start date and end date in millseconds

				let completiondays = parseInt((enddate - startdate) / (86400 * 1000));// Days

				return completiondays;
			}
		},


		onExit: function () {
			this.bus.unsubscribe("settermaster", "setDetailPage", this.setDetailPage, this);
		}
	});

}, true);
