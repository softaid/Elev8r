/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/base/ManagedObject"
], function (ManagedObject) {
	"use strict";

	/**
	 * Class for storing information about reverting variants.
	 *
	 * @class
	 * @extends sap.ui.base.ManagedObject
	 * @alias sap.ui.fl.apply._internal.flexObjects.RevertData
	 * @private
	 * @ui5-restricted
	 * @since 1.90.0
	 */
	return ManagedObject.extend("sap.ui.fl.apply._internal.flexObjects.RevertData", {
		metadata: {
			properties: {
				type: {type: "string"},
				content: {type: "object"}
			}
		}
	});
});