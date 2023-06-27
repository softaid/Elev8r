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
            getAllProjectsStagePerDetail : function(callback){
                commonService.runJQueryX("GET", "elevproject/projectsdetailstageper/" + commonService.session("companyId"), null, callback, null);
            },    
            getAllProjectsProjWeightageDetail : function(callback){
                commonService.runJQueryX("GET", "elevproject/projectsdetailproweightage/" + commonService.session("companyId"), null, callback, null);
            },   
            getAllProjectDepartmentDetail : function(callback){
                commonService.runJQueryX("GET", "elevproject/projectsdetaildepartments/" + commonService.session("companyId"), null, callback, null);
            },   
            getAllProjectEndDateDetail : function(callback){
                commonService.runJQueryX("GET", "elevproject/projectsdetailenddate/" + commonService.session("companyId"), null, callback, null);
            },    
            
            saveProject : function(params,callback){
                commonService.runJQueryX("POST", "elevproject/saveproject/", params,callback, null);
            },

            saveProjectActivityDetail: function(params,callback){
                commonService.runJQueryX("POST", "elevproject/saveprojectdetail/",params, callback, null);
            },

            deleteProjectActivityDetail : function(params,callback){
                commonService.runJQueryX("DELETE", "elevproject/deleteprojectdetail/"+params.id, null, callback, null);
            },

            getProjectList : function(params, callback){
                commonService.runJQueryX("GET", "project/projectlist/" + params.leadid, null, callback, null);
            },
    
            
            getAllDepartment : function(callback){
                commonService.runJQueryX("GET", "department/search/" + commonService.session("companyId"), null, callback, null);
            },
        }
    })