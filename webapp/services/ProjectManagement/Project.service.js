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
<<<<<<< HEAD
            },
=======
            },    
>>>>>>> 9ffc4ac69624a9453540ce3eaed633dbb348a179
            saveProject : function(params,callback){
                commonService.runJQueryX("POST", "elevproject/saveproject/", params,callback, null);
            },

            saveProjectActivityDetail: function(params,callback){
                commonService.runJQueryX("POST", "elevproject/saveprojectdetail/",params, callback, null);
            },

            deleteProjectActivityDetail : function(params,callback){
                commonService.runJQueryX("DELETE", "elevproject/deleteprojectdetail/"+params.id, null, callback, null);
            },

<<<<<<< HEAD
            getProjectList : function(params, callback){
                commonService.runJQueryX("GET", "project/projectlist/" + params.leadid, null, callback, null);
            }
=======
            getAllDepartment : function(callback){
                commonService.runJQueryX("GET", "department/search/" + commonService.session("companyId"), null, callback, null);
            },
>>>>>>> 9ffc4ac69624a9453540ce3eaed633dbb348a179
        }
    })