/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/date/UniversalDate",
	"sap/ui/integration/util/Utils"
], function (
	DateFormat,
	UniversalDate,
	Utils
) {
	"use strict";

	/**
	 * Contains functions that can format date and time
	 *
	 * @namespace
	 * @private
	 */
	var oDateTimeFormatters = {

		/**
		 * Formats date and time.
		 * @param {string|integer|Date|Array<string|integer|Date>} vDate The date or dates to be formatted. Accepts date string, timestamp, Date instance, or array of the same.
		 * @param {object} [oFormatOptions] All format options which sap.ui.core.format.DateFormat.getDateTimeInstance accepts.
		 * @param {string} [sLocale] A string representing the desired locale. If skipped the current locale of the user is taken
		 * @returns {string} The formatted date time.
		 */
		dateTime: function (vDate, oFormatOptions, sLocale) {
			var oArguments = Utils.processFormatArguments(oFormatOptions, sLocale),
				oDateFormat = DateFormat.getDateTimeInstance(oArguments.formatOptions, oArguments.locale),
				vUniversalDate;

			if (Array.isArray(vDate)) {
				vUniversalDate = vDate.map(function (date) {
					return new UniversalDate(Utils.parseJsonDateTime(date));
				});
			} else {
				vUniversalDate = new UniversalDate(Utils.parseJsonDateTime(vDate));
			}

			var sFormattedDate = oDateFormat.format(vUniversalDate);

			return sFormattedDate;
		},

		/**
		 * Formats date and time.
		 * @param {string|number|object} vDate Any string and number from which Date object can be created, or a Date object.
		 * @param {object} [oFormatOptions] All format options which sap.ui.core.format.DateFormat.getDateTimeInstance accepts.
		 * @param {string} [sLocale] A string representing the desired locale. If skipped the current locale of the user is taken
		 * @returns {string} The formatted date time.
		 * @deprecated Since version 1.74
		 * Use dateTime instead
		 */
		date: function (vDate, oFormatOptions, sLocale) {
			return oDateTimeFormatters.dateTime.apply(this, arguments);
		}
	};

	return oDateTimeFormatters;
});