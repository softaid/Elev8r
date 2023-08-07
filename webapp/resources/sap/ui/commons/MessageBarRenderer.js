/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Popup"],function(s){"use strict";var i={};i.render=function(s,i){var a=i.getId();s.write('<div draggable="true"');s.writeControlData(i);s.addClass("sapUiMsgBar");if(this.oDropPosition){s.addClass("sapUiMsgBarMoved")}s.writeClasses();s.write(">");s.write('<div id="'+a+'__sums" class="sapUiMsgBarSums">');s.write('<div id="'+a+'__arrowImg" class="sapUiMsgBarToggle"></div>');s.write('<div id="'+a+'__ErrorImg" class="sapUiMsgIcon sapUiMsgIconError sapUiMsgBarZeroCount"></div>');s.write('<span id="'+a+'__ErrorCount" class="sapUiMsgTxt sapUiMsgBarZeroCount">(0)</span>');s.write('<div id="'+a+'__WarningImg" class="sapUiMsgIcon sapUiMsgIconWarning sapUiMsgBarZeroCount"></div>');s.write('<span id="'+a+'__WarningCount" class="sapUiMsgTxt sapUiMsgBarZeroCount">(0)</span>');s.write('<div id="'+a+'__SuccessImg" class="sapUiMsgIcon sapUiMsgIconSuccess sapUiMsgBarZeroCount"></div>');s.write('<span id="'+a+'__SuccessCount" class="sapUiMsgTxt sapUiMsgBarZeroCount">(0)</span>');s.write("</div>");s.write('<div class="sapUiMsgBarHome"></div>');s.write("</div>")};return i},true);