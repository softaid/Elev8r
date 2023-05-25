sap.ui.define([
	'sap/ui/elev8rerp/componentcontainer/controller/BaseController',
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/ResponsivePopover',
	'sap/m/MessagePopover',
	'sap/m/ActionSheet',
	'sap/m/Button',
	'sap/m/Link',
	'sap/m/Bar',
	'sap/ui/layout/VerticalLayout',
	'sap/m/NotificationListItem',
	'sap/m/MessagePopoverItem',
	'sap/ui/core/CustomData',
	'sap/m/MessageToast',
	'sap/ui/Device',
	'sap/ui/elev8rerp/componentcontainer/control/XNavigationListItem',
	'sap/ui/model/Filter',
	'sap/ui/elev8rerp/componentcontainer/controller/Common/Common.function',
	'sap/ui/elev8rerp/componentcontainer/services/Common.service',
	'sap/ui/elev8rerp/componentcontainer/services/Company/ManageUser.service',
	'sap/ui/elev8rerp/componentcontainer/utility/SessionManager',
	'jquery.sap.storage'
], function (BaseController, jQuery, Fragment, Controller, JSONModel, ResponsivePopover,
	MessagePopover, ActionSheet, Button, Link, Bar, VerticalLayout, NotificationListItem,
	MessagePopoverItem, CustomData, MessageToast, Device, XNavigationListItem, Filter, commonFunction, commonService, manageruserService) {

	"use strict";

	let _navigationKeys = ["home", "dailyTransaction", "settings", "breederlocation"];

	return BaseController.extend("sap.ui.elev8rerp.componentcontainer.controller.Master", {

		_bExpanded: true,

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onInit: function () {
			var dateTimeModel = new JSONModel();
			dateTimeModel.setData({
				valueDTP3: new Date()
			});
			this.getView().setModel(dateTimeModel);
			console.log(this.getView().setModel(dateTimeModel));

			let currentContext = this;
			if (commonFunction.session("userId") != null)
				this.getUserPermissions();
			else {
				this.getRouter().getTargets().display("login", {});
				this.getRouter().navTo("login", true);
			}

			this.bus = sap.ui.getCore().getEventBus();
			this.bus.subscribe("masterpage", "getUserPermissions", this.getUserPermissions, this);
			this.bus.subscribe("masterpage", "notificationHistoryPopupList", this.notificationHistoryPopupList, this);
			this.bus.subscribe("masterpage", "redirectToTransaction", this.redirectToTransaction, this);

			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			// Transaction Notification cached in browser
			commonService.getTransactionNotificationAll(function (data) {
				let oModel = currentContext.getView().getModel("notificationsTemplateModel");
				oModel.oData.modelData = data[0];
				oModel.refresh();
			});

			// Notification Placeholders cached in browser
			commonService.getNotificationCreatedFor({ userid: commonFunction.session("userId") }, function (data) {
				let oModel = currentContext.getView().getModel("notificationCreatedForModel");
				oModel.oData.modelData = data[0];
				oModel.refresh();
			});

			// if the app starts on desktop devices with small or meduim screen size, collaps the sid navigation
			if (Device.resize.width <= 1024) {
				this.onSideNavButtonPress();
			}

			Device.media.attachHandler(function (oDevice) {
				if ((oDevice.name === "Tablet" && this._bExpanded) || oDevice.name === "Desktop") {
					this.onSideNavButtonPress();
					this._bExpanded = (oDevice.name === "Desktop");
				}
			}.bind(this));

			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.attachRouteMatched(this.routeMatched, this);

			this.sUserid = commonFunction.session("userId");

			this.oSF = this.getView().byId("searchField");

			let sKey = this.getRouter()._oRouter._prevMatchedRequest
			this.getRouter().getTargets().display(sKey, {});
			this.getRouter().navTo(sKey);
			// this.getUserKeyshortcut();

			let count = 0;
			setInterval(function () {
				$('body').mousemove(function (evt) {
					count = 0;
				});
				$('body').keypress(function (evt) {
					count = 0;
				});
				count++;
				if (count > 20) {
					if (MYSAP.SessionManager.getSession("currentSession") != null) {
						commonService.userLogout(function (data) {
							if (data.length > 0) {
								if (data[0][0].accesstoken == null) {
									// Clear currentSession Session
									MYSAP.SessionManager.clearSession('currentSession');
									localStorage.removeItem('currentSession');

									// Sent to login screen prior to session destroy
									oRouter.getTargets().display("login", {});
									oRouter.navTo("login", true);
								}
							}
						})
					}
				}
			}, 60000);

			window.setTimeout(this.defaultfunction(), 5000);

		},

		defaultfunction: function () {
			$(window).bind('beforeunload', function (eventObject) {
				if ($(window).load) {
					commonService.userLogout(function (data) {
						if (data.length > 0) {
							if (data[0][0].accesstoken != null) {
								MYSAP.SessionManager.clearSession('currentSession');
								localStorage.removeItem('currentSession');
							}
						}
					});

				}
				else {
					let returnValue = undefined;
					commonService.userLogout(function (data) {
						if (data.length > 0) {
							if (data[0][0].accesstoken == null) {
								MYSAP.SessionManager.clearSession('currentSession');
								localStorage.removeItem('currentSession');

							}
						}
					});
				}
				returnValue = "Do you really want to close?";
				eventObject.returnValue = returnValue;
				return returnValue;
			});
		},

		getUserKeyshortcut: function () {
			let currentContext = this;
			$('body').keydown(function (evt) {
				let keydata = evt.key;
				if (evt.key == 'F1' || evt.key == 'F2' || evt.key == 'F3' || evt.key == 'F4' || evt.key == 'F5' || evt.key == 'F7' || evt.key == 'F8' || evt.key == 'F9' || evt.key == 'F10' || evt.key == 'F11' || evt.key == 'F12') {
					jQuery('body').ready(function ($) {
						evt.preventDefault();
						commonService.getRolewisePageKey({ roleids: commonFunction.session("roleIds") }, function (data) {
							if (data) {
								for (let i = 0; i < data[0].length; i++) {
									if (keydata == data[0][i].key) {
										currentContext.getRouter().getTargets().display(data[0][i].pagekey, {});
										currentContext.getRouter().navTo(data[0][i].pagekey);
									}
								}
							}
						});
					});
				}
			});

		},


		routeMatched: function (oEvent) {
			// https://tutel.me/c/programming/questions/42325406/how+can+i+get+current+route

			let oParameters = oEvent.getParameters();
			let sRouteName = oParameters.name; // Yay! Our route name!
			let oApplicationModel = this.getView().getModel("applicationModel");
			oApplicationModel.setProperty("/routeName", sRouteName);

			// Session exists but page key removed, then go to home
			if (MYSAP.SessionManager.getSession("currentSession") != null && sRouteName == "login") {
				this.getRouter().getTargets().display("home", {});
				this.getRouter().navTo("home", true);
			}

			this.userName = commonFunction.session("userName");
			let oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				username: commonFunction.session("userName"),
				companyname: commonFunction.session("companyname"),
				countrycode: commonFunction.session("countrycode"),
				address: commonFunction.session("address"),
				companycontact: commonFunction.session("companycontact"),
				companyemail: commonFunction.session("companyemail"),
				city: commonFunction.session("city"),
				pincode: commonFunction.session("pincode"),
				contactno2: commonFunction.session("contactno2"),
				faxnumber: commonFunction.session("faxnumber"),
			});

			this.getView().setModel(oModel, "userDataModel");

			if (!commonFunction.ensureLoggedIn(this)) {
				return false;
			}

			// First time popup data call
			this.getNotificationHistoryPopupList(3); // limited list

			let currentContext = this;
			// Call notification data on every 20 seconds
			setInterval(function () {
				currentContext.getNotificationHistoryPopupList(3);
			}, 20000);
		},
		notificationHistoryPopupList: function (sChannel, sEvent, oData) {
			this.getNotificationHistoryPopupList(oData.data.limit);
		},

		getNotificationHistoryPopupList: function (limit) {
			let currentContext = this;
			commonService.getNotificationHistoryPopupList({ limit: limit }, function (data) {
				let oModel = currentContext.getView().getModel("notificationPopupModel");
				oModel.oData.modelData = data[0];
				oModel.refresh();

				// currentContext.getView().byId("notificationcount").setText(data[0].length > 0 ? data[0][0].unreadcount : 0);
			});
		},


		redirectToTransaction: function (sChannel, sEvent, oData) {
			sap.m.MessageToast.show("Redirecting to transaction page....");

			// Read Notification
			this.readNotifications(oData.id, this);

			// Redirect to transaction
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getTargets().display(oData.pagekey, { id: oData.transactionid });
			oRouter.navTo(oData.pagekey, true);
		},

		readNotifications: function (id, currentContext) {
			let model = { "userid": commonService.session("userId"), "notificationids": id.toString() }
			commonService.readNotifications(model, function (data) {
				if (data) {
					currentContext.bus = sap.ui.getCore().getEventBus();
					currentContext.bus.publish("loaddata", "loadData");
					currentContext.bus.publish("masterpage", "notificationHistoryPopupList", { data: { limit: 3 } });
				}
			});
		},

		getUserPermissions: function () {

			let currentContext = this;

			let oNavigationList = this.byId('oNavigationList');
			let oFixedNavigationList = this.byId('oFixedNavigationList');

			if (oNavigationList)
				oNavigationList.removeAllItems();
			if (oFixedNavigationList)
				oFixedNavigationList.removeAllItems();

			manageruserService.getUserPermissions({ id: commonFunction.session("userId") }, function (data) {

				let oModel = new sap.ui.model.json.JSONModel();
				let oeModel = new sap.ui.model.json.JSONModel();

				if (data.length > 0) {
					let filteredData = $.grep(data[0],
						function (elementOfArray, indexInArra) {
							return elementOfArray.pk != null
						});
					oModel.setData({ modelData: filteredData });

					// Entity Model
					oeModel.setData({ modelData: data[0] });
					currentContext.getView().setModel(oeModel, "userEntityModel");
					let pageData = data[0];

					setTimeout(function () {

						let oModel = currentContext.getView().getModel("applicationModel");
						if (oModel != null) {
							let found = false;
							let routeName = oModel.oData.routeName;
							if (["home", "dashboard"].indexOf(routeName) > -1) {
								found = true;
							} else {
								for (const element of data[0]) {
									if (element.pk == routeName) {
										found = true;
										break;
									}
								}
							}
						}

						currentContext.initSideNavigation(pageData);
					}, 800);
				}
				else {

					currentContext.initSideNavigation(null);

					oModel.setData({ modelData: [] });
				}

				// User Filtered Page Model
				currentContext.getView().setModel(oModel, "userPageModel");
			});
		},


		checkValidPage: function () {

		},

		createTreeJson: function (arr) {
			let tree = [],
				mappedArr = {},
				arrElem,
				mappedElem;

			for (let i = 0, len = arr.length; i < len; i++) {
				arrElem = arr[i];
				mappedArr[arrElem.e] = arrElem;
				mappedArr[arrElem.e]['entity'] = [];
			}
			for (let e in mappedArr) {
				if (mappedArr.hasOwnProperty(e)) {
					mappedElem = mappedArr[e];
					if (mappedElem.pr) {
						mappedArr[mappedElem['pr']]['entity'].push(mappedElem);
					}
					else {
						tree.push(mappedElem);
					}
				}
			}
			return tree;
		},


		onAfterRendering: function () {

		},

		checkIsExists: function (arrEle, arrParm) {
			if (arrEle.eid != undefined) {
				let found = false;

				if (arrEle.eid.length > 0 && arrEle.eid[0] == "0")
					return true;

				for (const element of arrEle.eid) {
					if (arrParm.indexOf(element) > -1) {
						found = true;
						break;
					}
				}

				return found;
			}
			return false;
		},

		ifEidCheckIsExists: function (arrEle, arrParm) {

			let islocal = true
			if (islocal) {
				return true;
			}

			if (arrEle.eid != undefined) {
				let found = false;
				for (const element of arrEle.eid) {
					if (arrParm.indexOf(element) > -1) {
						found = true;
						break;
					}
				}
				return found;
			}
			else
				return true;
		},

		initSideNavigation: function (menusData) {
			let oSideNavigation = this.byId('oSideNavigation');
			let oNavigationList = this.byId('oNavigationList');
			let oFixedNavigationList = this.byId('oFixedNavigationList');
			let oModelSideNav = new JSONModel("model/sideContent.json");
			let currentContext = this;

			oModelSideNav.attachRequestCompleted(function (oEvent) {

				let navigation = oModelSideNav.getData("/")["navigation"];
				let fixednavigation = oModelSideNav.getData("/")["fixedNavigation"];

				let arrParm = [];
				if (menusData) {
					for (const element of menusData) {
						arrParm.push(element.e);
					}
				}

				//destroy previous attached items ----


				if (navigation instanceof Array) {
					for (const element of navigation) {
						let itemI = element;

						if (currentContext.checkIsExists(itemI, arrParm)) {

							let oNavI = new XNavigationListItem("", {
								text: itemI["title"],
								icon: itemI["icon"],
								key: itemI["key"],
								expanded: itemI["expanded"],
							});

							console.log("oNavI", oNavI);

							if (itemI["items"].length > 0) {

								for (const element of itemI["items"]) {

									let itemJ = element;

									if (currentContext.checkIsExists(itemJ, arrParm)) {

										let oNavJ = new XNavigationListItem("", {
											text: itemJ["title"],
											icon: itemJ["icon"],
											key: itemJ["key"],
											expanded: itemJ["expanded"],
										});

										if (itemJ["items"].length > 0) {

											for (let k = 0; k < itemJ["items"].length; k++) {
												let itemK = itemJ["items"][k];

												if (currentContext.checkIsExists(itemK, arrParm)) {

													let oNavK = new XNavigationListItem("", {
														text: itemK["title"],
														icon: itemK["icon"],
														key: itemK["key"],
														expanded: itemK["expanded"]
													});

													if (itemK["items"].length > 0) {

														for (let l = 0; l < itemK["items"].length; l++) {

															let itemL = itemK["items"][l];

															if (currentContext.checkIsExists(itemL, arrParm)) {

																let oNavL = new XNavigationListItem("", {
																	text: itemL["title"],
																	icon: itemL["icon"],
																	key: itemL["key"],
																	expanded: itemL["expanded"]
																});

																oNavK.addItem(oNavL);

															}

														}

													}

													oNavJ.addItem(oNavK);

												}

											}

										}

										oNavI.addItem(oNavJ);
									}

								}

							}

							oNavigationList.addItem(oNavI);

						}


						oSideNavigation.setItem(oNavigationList);
					}
				}

				if (fixednavigation instanceof Array) {

					for (const oFixedNavItem of fixednavigation) {

						if (currentContext.ifEidCheckIsExists(oFixedNavItem, arrParm)) {

							let oNavI = new XNavigationListItem("", {
								text: oFixedNavItem["title"],
								icon: oFixedNavItem["icon"],
								key: oFixedNavItem["key"],
								expanded: oFixedNavItem["expanded"]
							});

							oFixedNavigationList.addItem(oNavI);
						}

						oSideNavigation.setFixedItem(oFixedNavigationList);

					}

				}

			});

		},

		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @param {sap.ui.base.Event} oEvent The item select event
		 */
		onItemSelect: function (oEvent) {

			let oThis = this;
			let oItem = oEvent.getParameter('item');
			let sKey = oItem.getKey();

			if (Device.system.phone) {
				oThis.onSideNavButtonPress();
			}

			if (sKey != "") {
				oThis.getRouter().getTargets().display(sKey, {});
				oThis.getRouter().navTo(sKey);
			}
			
		},

		clearAllonLogout: function () {

			let oModel = currentContext.getView().getModel("userEntityModel");
			oModel.oData.modelData = [];
			oModel.refresh();

			let oNavigationList = this.byId('oNavigationList');
			let oFixedNavigationList = this.byId('oFixedNavigationList');

			oNavigationList.removeAllItems();
			oFixedNavigationList.removeAllItems();

		},

		onUserNamePress: function (oEvent) {

			let oThis = this;
			let oBundle = oThis.getModel("i18n").getResourceBundle();
			let oToolPage = oThis.getView().byId("app");
			let gRoute = oThis.getRouter();
			let navBtn = oThis.getView().byId("sideNavigationToggleButton");

			// close message popover
			let oMessagePopover = oThis.byId("errorMessagePopover");
			
			if (oMessagePopover && oMessagePopover.isOpen()) {
				oMessagePopover.destroy();
			}

			let fnHandleUserMenuItemPress = function (oEvent) {
				MessageToast.show(oEvent.getSource().getText() + " was pressed");
			};

			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			let fnLogoutPress = function (oEvent) {
				MessageToast.show("Please Wait..", { duration: 1500, my: "center top", at: "center top" });
				commonService.userLogout(function (data) {
					if (data[0][0].accesstoken == null) {
						// Clear currentSession Session
						MYSAP.SessionManager.clearSession('currentSession');
						localStorage.removeItem('currentSession');

						// Sent to login screen prior to session destroy 
						//login page name property passesd instead of blank value for logout issue now navigation done successfully
						oRouter.getTargets().display("login", {});
						oRouter.navTo("login", true);
					}
				})	

			};

			let fnCompanySettingPress = function (oEvent) {
				oRouter.getTargets().display("chome", {});
				oRouter.navTo("chome", true);
			};

			let oActionSheet = new ActionSheet(this.getView().createId("userMessageActionSheet"), {
				title: oBundle.getText("userHeaderTitle"),
				showCancelButton: false,
				buttons: [
					new Button({
						text: 'User Settings',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Company Setting',
						type: sap.m.ButtonType.Transparent,
						press: fnCompanySettingPress
					}),
					new Button({
						text: 'Logout',
						type: sap.m.ButtonType.Transparent,
						press: fnLogoutPress
					})
				],
				afterClose: function () {
					oActionSheet.destroy();
				}
			});

			// forward compact/cozy style into dialog
			jQuery.sap.syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oActionSheet);
			
			oActionSheet.openBy(oEvent.getSource());

		},

		fnLogoutPress : function (oEvent) {
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			MessageToast.show("Please Wait..", { duration: 1500, my: "center top", at: "center top" });
			commonService.userLogout(function (data) {
				if (data[0][0].accesstoken == null) {
					// Clear currentSession Session
					MYSAP.SessionManager.clearSession('currentSession');
					localStorage.removeItem('currentSession');

					// Sent to login screen prior to session destroy 
					//login page name property passesd instead of blank value for logout issue now navigation done successfully
					oRouter.getTargets().display("login", {});
					oRouter.navTo("login", true);
				}
			})	

		},

		onAppPress: function () {

			let oThis = this;
			let oToolPage = oThis.getView().byId("app");
			let bSideExpanded = oToolPage.getSideExpanded();
			
			oThis._setToggleButtonTooltip(bSideExpanded);
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
			
			let oRouter = sap.ui.core.UIComponent.getRouterFor(oThis);
			oRouter.getTargets().display("home", {});
			oRouter.navTo("home", true);
			oThis.getView().byId("sideNavigationToggleButton").setVisible(true)

		},

		onSideNavButtonPress: function () {

			let oThis = this;
			let oToolPage = oThis.byId("app");
			let bSideExpanded = oToolPage.getSideExpanded();
			
			oThis._setToggleButtonTooltip(bSideExpanded);
			
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());

		},

		_setToggleButtonTooltip: function (bSideExpanded) {

			let oThis = this;
			let oToggleButton = oThis.byId('sideNavigationToggleButton');

			oToggleButton.setTooltip((bSideExpanded) ? 'Large Size Navigation' : 'Small Size Navigation');

		},

		// Errors Pressed
		onMessagePopoverPress: function (oEvent) {

			if (!this.byId("errorMessagePopover")) {

				let oMessagePopover = new MessagePopover(this.getView().createId("errorMessagePopover"), {
					placement: sap.m.VerticalPlacementType.Bottom,
					items: {
						path: 'alerts>/alerts/errors',
						factory: this._createError
					},
					afterClose: function () {
						oMessagePopover.destroy();
					}
				});

				this.byId("app").addDependent(oMessagePopover);

				// forward compact/cozy style into dialog
				jQuery.sap.syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oMessagePopover);
				oMessagePopover.openBy(oEvent.getSource());

			}

		},

		/**
		 * Event handler for the notification button
		 * @param {sap.ui.base.Event} oEvent the button press event
		 * @public
		 */
		onNotificationPress: function (oEvent) {
			let currentContext = this;
			let oBundle = this.getModel("i18n").getResourceBundle();
			// close message popover
			let oMessagePopover = this.byId("errorMessagePopover");
			if (oMessagePopover && oMessagePopover.isOpen()) {
				oMessagePopover.destroy();
			}
			let oButton = new Button({
				text: oBundle.getText("notificationButtonText"),
				press: function () {
					currentContext.getRouter().getTargets().display("notifications", {});
					currentContext.getRouter().navTo("notifications", true);

					//Remove prevously created Popup object
					oNotificationPopover.destroy();
				}
			});

			let oNotificationPopover = new ResponsivePopover(this.getView().createId("notificationMessagePopover"), {
				title: oBundle.getText("Notifications"),
				contentWidth: "300px",
				endButton: oButton,
				placement: sap.m.PlacementType.Bottom,

				content: {
					path: 'notificationPopupModel>/modelData',
					factory: this._createNotification
				},
				afterClose: function () {
					oNotificationPopover.destroy();
				}
			});
			this.byId("app").addDependent(oNotificationPopover);
			// forward compact/cozy style into dialog
			jQuery.sap.syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oNotificationPopover);
			oNotificationPopover.openBy(oEvent.getSource());
		},

		/**
		 * Factory function for the notification items
		 * @param {string} sId The id for the item
		 * @param {sap.ui.model.Context} oBindingContext The binding context for the item
		 * @returns {sap.m.NotificationListItem} The new notification list item
		 * @private
		 */
		_createNotification: function (sId, oBindingContext) {

			let oBindingObject = oBindingContext.getObject();
			let oNotificationItem = new NotificationListItem({
				title: oBindingObject.title,
				description: oBindingObject.description,
				priority: oBindingObject.priority,
				unread: true,
				close: function (oEvent) {
				},
				datetime: oBindingObject.date,
				authorPicture: oBindingObject.icon,
				press: function (oEvent) {
					this.bus = sap.ui.getCore().getEventBus();
					this.bus.publish("masterpage", "redirectToTransaction", { id: oBindingObject.id, transactionid: oBindingObject.transactionid, pagekey: oBindingObject.pagekey });
				},
				customData: [
					new CustomData({
						key: "path",
						value: oBindingContext.getPath()
					})
				]
			});
			return oNotificationItem;
		},

		_createError: function (sId, oBindingContext) {
			let oBindingObject = oBindingContext.getObject();
			let oLink = new Link("moreDetailsLink", {
				text: "Go to page >>",
				press: function () {
					MessageToast.show("More Details was pressed");
				}
			});

			let oMessageItem = new MessagePopoverItem({
				title: oBindingObject.title,
				subtitle: oBindingObject.subTitle,
				description: oBindingObject.description,
				counter: oBindingObject.counter,
				link: oLink
			});
			return oMessageItem;
		},

		onSearchButtonPress: function () {
			this.getView().byId('searchPanel').setVisible(true);
			this.getView().byId('toolPanel').setVisible(false);
		},

		onClosePress: function () {
			this.getView().byId('searchPanel').setVisible(false);
			this.getView().byId('toolPanel').setVisible(true);
		},

		onSearch: function (event) {

			let item = event.getParameter("suggestionItem");

			if (item) {

				let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getTargets().display(item.getKey(), {});
				oRouter.navTo(item.getKey(), true);

				sap.m.MessageToast.show("search for: " + item.getText());

			}

		},

		onSuggest: function (event) {

			let oThis = this;
			let value = event.getParameter("suggestValue");
			let filters = [];

			if (value) {
				filters = [
					new sap.ui.model.Filter([
						new sap.ui.model.Filter("dn", function (sText) {
							return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
						})
					], false)
				];
			}

			oThis.getView().byId("searchField").getBinding("suggestionItems").filter(filters);
			oThis.getView().byId("searchField").suggest();

		},

		onGlobalSearch: function (oEvent) {

			let oThis = this;
			let aFilters = [];
			let sQuery = oEvent.getSource().getValue();

			if (sQuery && sQuery.length > 0) {
				aFilters = [new Filter("text", sap.ui.model.FilterOperator.Contains, sQuery)];
			}

			let list = oThis.byId("oNavigationList");
			let binding = list.getBinding("items");
			binding.filter(aFilters, "Application");

		}

	});

});