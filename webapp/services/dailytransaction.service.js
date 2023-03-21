sap.ui.define([
], 
function () 
{
    "use strict";

    return {
        /**
         * @public
         * @param {boolean} bIsPhone the value to be checked
         * @returns {string} path to image
         */
        getControllerCallback: function(controllerName, callbackFn){
            return 'sap.ui.controller("sap.ui.elev8rerp.componentcontainer.controller.'+ controllerName +'").'+ callbackFn;
        },
        runJQueryX : function(type, methodName, params, callback, errorCallback, objArray){

            var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog('busy0'+ Math.floor(Math.random() * 1000),{text:'Loading ...'});

            busyDialog.open();

            var aData = jQuery.ajax({
                type: type,
                contentType: 'application/json; charset=utf-8',
                url: "https://172.16.10.5:50000/b1s/v1/" + methodName,
                data: params != null ? JSON.stringify(params) : null,
                // xhrFields: {
                //     withCredentials: true
                // },
                // beforeSend: function (request) { request.setRequestHeader("Authorization", "Basic dG9tY2F0OnRvbWNhdA=="); },
                success: function (data, textStatus, jqXHR) {
                    console.log('callback:', callback);
                    var fn = eval(callback);

                    fn(data, objArray);
                    busyDialog.close()
                },
                error: function (err) {

                    if(errorCallback){
                        var fn = eval(errorCallback);
                        fn(err);
                    }

                    console.log('Service Error :', err);
                    busyDialog.close()
                }
            });
        },

        apiLogin : function(params, callback, errorCallback, objArray){
            console.log('objArray ==', objArray);
            this.runJQueryX("POST", "Login", params, callback, errorCallback, objArray);
        },

        getOrders : function(params, callback){
            this.runJQueryX("GET", "Orders", params, callback, null);
        },

        getFarmerList: function(filters, callback){

            var methodName = filters ? "BusinessPartners?" + filters : "BusinessPartners";
            this.runJQueryX("GET", methodName, null, callback, null);
        },

        getBusinessPartners: function(filters, callback){

            var methodName = filters ? "BusinessPartners?" + filters : "BusinessPartners";
            this.runJQueryX("GET", methodName, null, callback, null);
        },

        getEmployeeIDType: function(filters, callback){

            //this.runJQueryX("GET", "EmployeePosition", null, callback);
            this.runJQueryX("GET", "EmployeesInfo?$filter=Position eq 5", null, callback, null);
        },

        
    };
}
);