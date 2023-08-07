/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for controlsap.m.Avatar
sap.ui.define(["sap/m/library", "sap/base/security/encodeCSS"],
	function (library, encodeCSS) {
		"use strict";

		// shortcut for sap.m.AvatarSize
		var AvatarSize = library.AvatarSize;

		// shortcut for sap.m.AvatarType
		var AvatarType = library.AvatarType;

		/**
		 * <code>Avatar</code> renderer.
		 * @author SAP SE
		 * @namespace
		 */
		var AvatarRenderer = {
			apiVersion: 2
		};

		/**
		 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
		 *
		 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the Render-Output-Buffer
		 * @param {sap.m.Avatar} oAvatar an object representation of the control that should be rendered
		 */
		AvatarRenderer.render = function (oRm, oAvatar) {
			var sInitials = oAvatar.getInitials(),
				sActualDisplayType = oAvatar._getActualDisplayType(),
				sImageFallbackType = oAvatar._getImageFallbackType(),
				sDisplaySize = oAvatar.getDisplaySize(),
				sDisplayShape = oAvatar.getDisplayShape(),
				sImageFitType = oAvatar.getImageFitType(),
				sCustomDisplaySize = oAvatar.getCustomDisplaySize(),
				sCustomFontSize = oAvatar.getCustomFontSize(),
				sSrc = oAvatar.getSrc(),
				sAvatarClass = "sapFAvatar",
				sTooltip = oAvatar.getTooltip_AsString(),
				aLabelledBy = oAvatar.getAriaLabelledBy(),
				aDescribedBy = oAvatar.getAriaDescribedBy(),
				aHasPopup = oAvatar.getAriaHasPopup(),
				oBadge = oAvatar.hasListeners("press") ?  oAvatar._getBadge() : null,
				sDefaultTooltip = oAvatar._getDefaultTooltip(),
				sInitialsLength = sInitials.length;

			oRm.openStart("span", oAvatar);
			oRm.class(sAvatarClass);
			oRm.class("sapFAvatarColor" + oAvatar._getActualBackgroundColor());
			oRm.class(sAvatarClass + sDisplaySize);
			oRm.class(sAvatarClass + sActualDisplayType);
			oRm.class(sAvatarClass + sDisplayShape);
			if (oAvatar.hasListeners("press")) {
				oRm.class("sapMPointer");
				oRm.class(sAvatarClass + "Focusable");
				oRm.attr("role", "button");
				oRm.attr("tabindex", 0);
			} else if (oAvatar.getDecorative()) {
				oRm.attr("role", "presentation");
				oRm.attr("aria-hidden", "true");
			} else {
				oRm.attr("role", "img");
			}
			if (oAvatar.getShowBorder()) {
				oRm.class("sapFAvatarBorder");
			}
			if (sDisplaySize === AvatarSize.Custom) {
				oRm.style("width", sCustomDisplaySize);
				oRm.style("height", sCustomDisplaySize);
				oRm.style("font-size", sCustomFontSize);
			}
			if (sTooltip) {
				// if tooltip property is set the initials should be overwritten
				oRm.attr("title", sTooltip);
				oRm.attr("aria-label", sTooltip);
			} else if (sInitials) {
				// default "Avatar" text + initials
				oRm.attr("aria-label", sDefaultTooltip + " " + sInitials);
			} else {
				// no tooltip set nor initials - set only the default "Avatar" text
				oRm.attr("aria-label", sDefaultTooltip);
			}
			// aria-labelledby references
			if (aLabelledBy && aLabelledBy.length > 0) {
				oRm.attr("aria-labelledby", aLabelledBy.join(" "));
			}
			// aria-describedby references
			if (aDescribedBy && aDescribedBy.length > 0) {
				oRm.attr("aria-describedby", aDescribedBy.join(" "));
			}
			// aria-haspopup references
			if (aHasPopup && aHasPopup !== "None") {
				oRm.attr("aria-haspopup", aHasPopup.toLowerCase());
			}
			oRm.openEnd();
			if (sActualDisplayType === AvatarType.Icon || sImageFallbackType === AvatarType.Icon) {
				oRm.renderControl(oAvatar._getIcon().addStyleClass(sAvatarClass + "TypeIcon"));
			} else if ((sActualDisplayType === AvatarType.Initials || sImageFallbackType === AvatarType.Initials) ){
				if (sInitialsLength === 3) {
				//we render both icon and avatar, for the case where we have 3 initials set to the avatar and they are overflowing,
				//in this case we want to show icon instead of the initials after the rendering of the control
					oRm.renderControl(oAvatar._getIcon().addStyleClass(sAvatarClass + "TypeIcon").addStyleClass(sAvatarClass + "HiddenIcon"));
				}

				oRm.openStart("span");
				oRm.class(sAvatarClass + "InitialsHolder");
				oRm.openEnd();
				oRm.text(sInitials);
				oRm.close("span");

			}
			if (sActualDisplayType === AvatarType.Image) {
				oRm.openStart("span");
				oRm.class(sAvatarClass + "ImageHolder");
				oRm.class(sAvatarClass + sActualDisplayType + sImageFitType);
				oRm.style("background-image", "url('" + encodeCSS(sSrc) + "')");
				oRm.openEnd();
				oRm.close("span");
			}
			// HTML element for the badge icon
			if (oBadge) {
				oRm.openStart("div");
				oRm.class(sAvatarClass + "BadgeIconActiveArea");
				// we want to make sure icon, used for badge, scales proportionally with the custom size
				if (sCustomDisplaySize) {
					oRm.style("font-size", sCustomDisplaySize);
				}
				oRm.openEnd();
					oRm.openStart("span");
					oRm.class(sAvatarClass + "BadgeIcon");
					oRm.openEnd();
					oRm.renderControl(oBadge);
					oRm.close("span");
				oRm.close("div");
			}

			oRm.close("span");
		};

		return AvatarRenderer;
	}, /* bExport= */ true);
