sap.ui.define([
    'sap/ui/elev8rerp/componentcontainer/services/Common.service',
],
    function (commonService) {
        "use strict";

        return {

            getAllProjects : function(callback){
                commonService.runJQueryX("GET", "elevproject/searchprojects/" + commonService.session("companyId"), null, callback, null);
            },
            getProjectdetail : function(param,callback){
                commonService.runJQueryX("GET", "elevproject/selectprojectdetail/" + param.id, null, callback, null);
            },

            getProject : function(param,callback){
                commonService.runJQueryX("GET", "elevproject/selectproject/" + param.id, null, callback, null);
            },

            getAllProjectsDetail : function(callback){
                commonService.runJQueryX("GET", "elevproject/projectsdetail/" + commonService.session("companyId"), null, callback, null);
            },
        }
    })