// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/View","sap/m/GenericTile","sap/m/TileContent","sap/m/library","sap/m/NumericContent","sap/ushell/components/tiles/applauncherdynamic/DynamicTile.controller"],function(t,e,a,n,i){"use strict";var r=n.ValueColor;return t.extend("sap.ushell.components.tiles.applauncherdynamic.DynamicTile",{getControllerName:function(){return"sap.ushell.components.tiles.applauncherdynamic.DynamicTile"},createContent:function(){this.setHeight("100%");this.setWidth("100%");return this.getTileControl()},getTileControl:function(){var t=this.getController();if(this.getContent().length===1){return this.getContent()[0]}return new e({mode:"{/mode}",header:"{/data/display_title_text}",subheader:"{/data/display_subtitle_text}",size:"Auto",sizeBehavior:"{/sizeBehavior}",wrappingType:"{/wrappingType}",url:{parts:["/targetURL","/nav/navigation_target_url"],formatter:t.formatters.leanURL},tileContent:[new a({size:"Auto",footer:"{/data/display_info_text}",footerColor:{path:"/data/display_info_state",formatter:function(t){if(t==="Positive"){t=r.Good}if(t==="Negative"){t=r.Error}if(!r[t]){t=r.Neutral}return t}},unit:"{/data/display_number_unit}",content:[new i({scale:"{/data/display_number_factor}",value:"{/data/display_number_value}",truncateValueTo:5,indicator:"{/data/display_state_arrow}",valueColor:{path:"/data/display_number_state",formatter:function(t){if(!t||t==="Neutral"||!r[t]){return r.None}return t}},icon:"{/data/display_icon_url}",width:"100%",withMargin:false})]})],press:[t.onPress,t]})},getMode:function(){return this.getModel().getProperty("/mode")}})});