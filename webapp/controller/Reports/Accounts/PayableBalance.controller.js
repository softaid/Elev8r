sap.ui.define([
    "sap/ui/model/json/JSONModel",
    'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    'sap/m/MessageBox',
    'sap/ui/core/util/Export',
    'sap/ui/core/util/ExportTypeCSV',
    'sap/ui/elev8rerp/componentcontainer/services/CBF/CbfDashboard.service',
    'sap/ui/elev8rerp/componentcontainer/services/Common.service',
    'sap/ui/elev8rerp/componentcontainer/services/Reports/AccountsReports.service',
    'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',


], function (JSONModel, BaseController, Filter, FilterOperator, Sorter, MessageBox, Export, ExportTypeCSV, cbfDashboardService, commonService, accountsReportsService, commonFunction) {
    "use strict";

    return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.Reports.Accounts.PayableBalance", {
        onInit: function () {
            this.companyname = commonFunction.session("companyname");
            this.companycontact = commonFunction.session("companycontact");
            this.companyemail = commonFunction.session("companyemail");
            this.address = commonFunction.session("address");
            this.pincode = commonFunction.session("pincode");

            var model = new JSONModel();
            var emptyModel = this.getModelDefault();
            model.setData(emptyModel);
            this.getView().setModel(model, "payableModel");
            commonFunction.getReference("PrtRole", "roleForPaymentModel", this);

            var model = new JSONModel();
            model.setData(emptyModel);
            this.getView().setModel(model, "payableModel");

            // set empty model to view		
            var model = new JSONModel();
            model.setData({ modelData: [] });
            this.getView().setModel(model, "tblpayableModel");
            this.getView().byId("txtdownload").setVisible(false);

            this.getSupplier();

        },

        getModelDefault: function () {
            return {
                fromdate: commonFunction.getDateFromDB(new Date()),
                todate: commonFunction.getDateFromDB(new Date()),
            }
        },

        getSupplier: function () {
            var currentContext = this;
                commonService.getRolewiseParties({ roleid: 31 }, function (data) {
                    var rolewisePartyListModel = new sap.ui.model.json.JSONModel();
                    var partyModel = [];
                    for (var i = 0; i < data[0].length; i++) {
                        partyModel.push({
                            supplierledgerid: data[0][i].supplierledgerid,
                            id: data[0][i].id,
                            partyname: data[0][i].partyname
                        })
                        if (i == data[0].length - 1) {
                           partyModel.unshift({ "id": "All", "partyname": "Select All" });
                            rolewisePartyListModel.setData({ modelData: partyModel });
                            currentContext.getView().setModel(rolewisePartyListModel, "partyModel");
                        }
                    }

                });
        },

        

        partySelectionFinish: function (oEvt) {
            var selectedItems = oEvt.getParameter("selectedItems");
            var selectedparties = [];
            for (var i = 0; i < selectedItems.length; i++) {
                selectedparties.push({ key: selectedItems[i].getProperty("key"), "text": selectedItems[i].getProperty("text") });
            }
            this.selectedPartyname = [];
            for (var i = 0; selectedparties.length > i; i++) {
                this.selectedPartyname.push(selectedparties[i].text);
            }

            console.log("this.selectedPartyname",this.selectedPartyname);
        },


        bindTbl: function () {
            var isValid = this.validateForm();
             if (isValid) {
            var pModel = this.getView().getModel("payableModel").oData;
            jQuery('.sapMTokenizerScrollContainer').find('div').each(function () {
                if (jQuery(this).find('.sapMTokenText').html() == "Select All") {
                    jQuery(this).remove();
                }
            });
            
            var partyString = this.getView().byId("partyList").getSelectedKeys();
            var partystr= "";

            for (var i = 0; i < partyString.length; i++) {
                if (i == 0)
                partystr = parseInt(partyString[i]);
                else
                partystr = partystr + "," + parseInt(partyString[i]);
            }

          
            pModel["fromdate"] = commonFunction.getDate(pModel.fromdate);
            pModel["todate"] = commonFunction.getDate(pModel.todate);


            pModel["fromdate"] = commonFunction.getDate(pModel.fromdate);
            pModel["todate"] = commonFunction.getDate(pModel.todate);
            var tbleModel = this.getView().getModel("tblpayableModel");

            accountsReportsService.getPayableBalanceReport({partyid: partystr, fromdate: pModel["fromdate"], todate: pModel["todate"] }, function (data) {
                console.log("data", data);
                var closingbal = 0;
                var openingbal = 0;

               if (data[0].length > 0) {
                for (var i = 0; i < data[0].length; i++) {
                   openingbal = parseFloat(data[0][i].op_dr) - parseFloat(data[0][i].op_cr);
                   closingbal = (openingbal + parseFloat(data[0][i].dramount)) - parseFloat(data[0][i].cramount);

                    if (openingbal > 0) {
                        data[0][i].op_dr = openingbal;
                        data[0][i].op_cr = 0;
                    } else {
                        data[0][i].op_cr = Math.abs(openingbal);
                        data[0][i].op_dr = 0;
                    }
                    if (closingbal <= 0) {
                        data[0][i].cl_cr = Math.abs(closingbal);
                        data[0][i].cl_dr = 0;
                    } else {
                        data[0][i].cl_cr = 0;
                        data[0][i].cl_dr = closingbal;
                    }

                    data[0][i].openingbal = parseFloat(data[0][i].op_dr) - parseFloat(data[0][i].op_cr);
                    if(data[0][i].openingbal<0)
                    {
                        data[0][i].openingbal = Math.abs(data[0][i].openingbal) + ' ' + 'Cr'
                    }else
                    {
                        data[0][i].openingbal = Math.abs(data[0][i].openingbal) + ' ' +'Dr'
                    }

                    data[0][i].closingbal = (openingbal + parseFloat(data[0][i].dramount)) - parseFloat(data[0][i].cramount);

                    if(data[0][i].closingbal<0)
                    {
                        data[0][i].closingbal = Math.abs(data[0][i].closingbal) + ' ' + 'Cr'
                    }else
                    {
                        data[0][i].closingbal = Math.abs(data[0][i].closingbal) + ' ' +'Dr'
                    }
                }
            }
                tbleModel.setData({ modelData: data[0] });
                console.log("tbleModel",tbleModel);
                tbleModel.refresh();
            })
            
             }
            this.getView().byId("txtdownload").setVisible(true);
        },


        partySelectionChange: function (oEvent) {
            var changedItem = oEvent.getParameter("changedItem");
            var isSelected = oEvent.getParameter("selected");
            var state = "Selected";

            if (!isSelected) {
                state = "Deselected"
            }

            //Check if "Selected All is selected
            if (changedItem.mProperties.key == "All") {
                var oName, res;

                //If it is Selected
                if (state == "Selected") {

                    var oItems = oEvent.oSource.mAggregations.items;
                    for (var i = 0; i < oItems.length; i++) {
                        if (i == 0) {
                            oName = oItems[i].mProperties.key;
                        } else {
                            oName = oName + ',' + oItems[i].mProperties.key;
                        } //If i == 0									
                    } //End of For Loop

                    res = oName.split(",");
                    oEvent.oSource.setSelectedKeys(res);

                } else {
                    res = null;
                    oEvent.oSource.setSelectedKeys(res);
                }
            }

            // var partystring = this.getView().byId("partyList").getSelectedItem();
            
        },


        validateForm: function () {
            var isValid = true;
            if (!commonFunction.ismultiComRequired(this, "partyList", "Party is required"))
            isValid = false;
            if (!commonFunction.isRequired(this, "txtFromDate", "From date is required."))
            isValid = false;
            if (!commonFunction.isRequired(this, "txtToDate", "To date is required."))
            isValid = false;

            return isValid;
        },

         // Change Done By Pooja For PDF Functionality
        onPdfExport: function () {
            var fullHtml = "";
            var headertable1 = "";
            headertable1 += "<!DOCTYPE html> <html> <head> <title>" + "Payable Balance Report" + "</title>" +
                "<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'></script>" +
                "<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js'></script>" +
                "<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js'></script>" +
                "<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js'></script>" +
                "<style type='text/css'>" +
                "table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%; } td, th {border: 1px solid #000;text-align: left;padding: 5px; } th, td {width: 100px;overflow: hidden; } img { width: 180px; height: 120px; text-align: center; } </style> </head>";

            headertable1 += "<body id='tblCustomers' class='amin-logo'>";
            headertable1 += "</body>";
            headertable1 += "<script>";



            var fromdate = this.getView().byId("txtFromDate").getValue();
            var todate = this.getView().byId("txtToDate").getValue();
            var party = this.selectedPartyname;
          
          
            var companyname = this.companyname;
            var phone = this.companycontact;
            var email = this.companyemail;
            var address = this.address;
            var pincode = this.pincode;

            var phone = (this.companycontact === null || this.companycontact == undefined) ? "-" : this.companycontact;
            var email = (this.companyemail === null || this.companyemail == undefined) ? "-" : this.companyemail;
            var address = (this.address === null || this.address == undefined) ? "-" : this.address;
            var pincode = (this.pincode === null || this.pincode == undefined) ? "-" : this.pincode;
            // console.log("pincode", pincode);
            var tbleModel = this.getView().getModel("tblpayableModel").oData.modelData;
            headertable1 += "html2canvas($('#tblCustomers')[0], {" +
                "onrendered: function (canvas) {" +
                "var data = canvas.toDataURL();" +
                "var width = canvas.width;" +
                "var height = canvas.height;" +
                "var docDefinition = {" +
                "pageMargins: [ 40, 60, 40, 60 ]," +
                "content: [";
            headertable1 += "{text: 'Company:-" + companyname + "', style: 'header'},";
            headertable1 += "{text: 'Email:-" + email + "', style: 'header'},";
            headertable1 += "{text: 'Phone:-" + phone + "', style: 'header'},";
            headertable1 += "{text: 'Address:-" + address + "', style: 'header'},";
            headertable1 += "{text: 'Payable Balance Report', style: 'title'},";
            headertable1 += "{columns: [{text:'From Date:-" + fromdate + "', style: 'subheader'},{text:'To Date:-" + todate + "', style: 'todatecss'}]},";
            headertable1 += "{columns: [{text: 'Party :-" + party + "', style: 'subheader'}]},";
            headertable1 += "{ style: 'tableExample',";
            headertable1 += " table: {";
            headertable1 += " body: [";
            headertable1 += "[ {text: 'Party Code', style: 'tableHeader'}, {text: 'Party Name', style: 'tableHeader'},{text: 'Opening Amount', style: 'tableHeader'},{text: 'Debit Amount', style: 'tableHeader'}, {text: 'Credit Amount', style: 'tableHeader'},{text: 'Closing Balance', style: 'tableHeader'}],";

            for (var i = 0; i < tbleModel.length; i++) {
                if (tbleModel[i].partycode == null) {
                    tbleModel[i].partycode = "-";
                }
                if (tbleModel[i].partyname == null) {
                    tbleModel[i].partyname = "-";
                }
                if (tbleModel[i].openingbal == null) {
                    tbleModel[i].openingbal = "-";
                }
                if (tbleModel[i].dramount == null) {
                    tbleModel[i].dramount = "-";
                }
                if (tbleModel[i].cramount == null) {
                    tbleModel[i].cramount = "-";
                }
                if (tbleModel[i].closingbal == null) {
                    tbleModel[i].closingbal = "-";
                }
                headertable1 += "['" + tbleModel[i].partycode + "','" + tbleModel[i].partyname + "','" + tbleModel[i].openingbal + "','" + tbleModel[i].dramount + "','" + tbleModel[i].cramount + "','" +  tbleModel[i].closingbal + "'],"
            }
            headertable1 += "]";
            headertable1 += "}";
            headertable1 += "}";
            headertable1 += "]," +
                "footer: function (currentPage, pageCount) {" +
                "return {" +
                "style: 'Footer'," +
                "table: {" +
                "widths: ['*', 100]," +
                "body: [" +
                "[" +
                "{ text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'normalText' }" +
                "]," +
                "]" +
                "}," +
                "layout: 'noBorders'" +
                "};" +
                "}," +
                "styles: {" +
                "header: {" +
                "fontSize:10," +
                "bold: true," +
                "margin: [0, 0, 0, 8]" +
                "}," +
                "title: {" +
                "fontSize:12," +
                "bold: true," +
                "alignment: 'center'" +
                "}," +
                "Footer: {" +
                "fontSize: 7," +
                "margin: [5, 5, 5, 5]," +
                "}," +
                "subheader: {" +
                "fontSize:9," +
                "bold: true," +
                "margin: [0, 10, 0, 4]" +
                "}," +
                "todatecss: {" +
                "fontSize:9," +
                "bold: true," +
                "alignment:'right'" +
                "}," +
                "tableExample: {" +
                "margin: [0, 15, 0, 0]," +
                "fontSize: 8" +
                "}," +
                "tableHeader: {" +
                "bold: true," +
                "fontSize: 8," +
                "color: 'black'" +
                "}" +
                "}," +
                "defaultStyle: {" +
                "fontSize: 8" +
                "}" +
                "};" +
                "pdfMake.createPdf(docDefinition).download('Payable_Balance_Report.pdf');" +
                "} });";
            headertable1 += "</script></html>";
            fullHtml += headertable1;
            var wind = window.open();
            wind.document.write(fullHtml);

            setTimeout(function () {
                wind.close();
            }, 3000);
        },

        onDataExport: sap.m.Table.prototype.exportData || function (oEvent) {
            var fromdate = this.getView().byId("txtFromDate").getValue();
            var todate = this.getView().byId("txtToDate").getValue();
            var party = this.selectedPartyname;
            
            var filename = fromdate+'_'+todate+'_'+party;

            //https://openui5.hana.ondemand.com/1.36.5/docs/guide/f1ee7a8b2102415bb0d34268046cd3ea.html
            //http://www.saplearners.com/download-data-in-excel-in-sapui5-application/


            var oExport = new Export({
                

                // Type that will be used to generate the content. Own ExportType's can be created to support other formats
                exportType: new ExportTypeCSV({
                    separatorChar: ","
                }),

                // Pass in the model created above
                models: this.getView().getModel("tblpayableModel"),

                

                // binding information for the rows aggregation
                rows: {
                    path: "/modelData"
                },

                // column definitions with column name and binding info for the content

                columns: [
                    {
                        name: "Party Code",
                        template: { content: "{partycode}" }
                    },
                    {
                        name: "Party Name",
                        template: { content: "{partyname}" }
                    },
                    {
                        name: "Opening Amount",
                        template: { content: "{openingbal}" }
                    },
                    {
                        name: "Debit Amount",
                        template: { content: "{dramount}" }
                    },
                    {
                        name: "Credit Amount",
                        template: { content: "{cramount}" }
                    },
                    {
                        name: "Closing Balance",
                        template: { content: "{closingbal}" }
                    }
                   
                ]


            });

            // download exported file
            oExport.saveFile(filename)
                .catch(function (oError) {
                    MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
                })
                .then(function () {

                    oExport.destroy();
                });
        },

           });
}, true);
