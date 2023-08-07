// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/JSView","sap/ui/model/analytics/odata4analytics","sap/ushell/components/tiles/indicatorTileUtils/smartBusinessUtil","sap/m/library","sap/m/NumericContent","sap/m/GenericTile","sap/ui/model/json/JSONModel"],function(e,i,t,o,a,s,n){"use strict";var l=o.DeviationIndicator;var r=o.ValueColor;var u=o.LoadState;sap.ui.getCore().loadLibrary("sap.suite.ui.commons");sap.ui.jsview("sap.ushell.components.tiles.indicatornumeric.NumericTile",{getControllerName:function(){return"sap.ushell.components.tiles.indicatornumeric.NumericTile"},createContent:function(){var e="Lorem ipsum";var i="Lorem ipsum";var t=sap.ushell.components.tiles.indicatorTileUtils.util.getTileTitleSubtitle(this.getViewData().chip);if(t.title&&t.subTitle){e=t.title;i=t.subTitle}var o={subheader:i,header:e,footerNum:"",footerComp:"",scale:"",unit:"",value:"",size:"Auto",frameType:"OneByOne",state:u.Loading,valueColor:r.Neutral,indicator:l.None,title:"",footer:"",description:""};this.oNVConfContS=new a({value:"{/value}",scale:"{/scale}",unit:"{/unit}",indicator:"{/indicator}",valueColor:"{/valueColor}",size:"{/size}",formatterValue:true,truncateValueTo:5,nullifyValue:false});this.oNVConfS=new sap.ushell.components.tiles.sbtilecontent({unit:"{/unit}",size:"{/size}",footer:"{/footerNum}",content:this.oNVConfContS});this.oGenericTile=new s({subheader:"{/subheader}",frameType:"{/frameType}",size:"{/size}",header:"{/header}",tileContent:[this.oNVConfS]});var c=new n;c.setData(o);this.oGenericTile.setModel(c);return this.oGenericTile}})},true);