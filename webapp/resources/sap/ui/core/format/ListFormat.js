/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Locale","sap/ui/core/LocaleData","sap/base/Log","sap/base/util/extend","sap/base/util/isEmptyObject","sap/ui/core/Configuration"],function(t,e,r,a,o,i){"use strict";var n=function(){throw new Error};n.oDefaultListFormat={type:"standard",style:"wide"};n.getInstance=function(t,e){return this.createInstance(t,e)};n.createInstance=function(r,o){var n=Object.create(this.prototype);if(r instanceof t){o=r;r=undefined}if(!o){o=i.getFormatSettings().getFormatLocale()}n.oLocale=o;n.oLocaleData=e.getInstance(o);n.oOriginalFormatOptions=a({},this.oDefaultListFormat,r);return n};n.prototype.format=function(t){if(!Array.isArray(t)){r.error("ListFormat can only format with an array given.");return""}var e=this.oOriginalFormatOptions,a,i,n,s,l,p,c=[].concat(t),f,u;a=this.oLocaleData.getListFormat(e.type,e.style);if(o(a)){r.error("No list pattern exists for the provided format options (type, style).");return""}function g(t,e){var r=t[0];for(var a=1;a<t.length;a++){r=e.replace("{0}",r);r=r.replace("{1}",t[a])}return r}if(a[c.length]){i=a[c.length];for(var h=0;h<c.length;h++){i=i.replace("{"+h+"}",c[h])}n=i}else if(c.length<2){n=c.toString()}else{f=c.shift();p=c.pop();u=c;s=a.start.replace("{0}",f);p=a.end.replace("{1}",p);l=g(u,a.middle);n=s.replace("{1}",p.replace("{0}",l))}return n};n.prototype.parse=function(t){if(typeof t!=="string"){r.error("ListFormat can only parse a String.");return[]}var e=[],a=[],i=[],s=[],l=[],p=this.oOriginalFormatOptions,c,f=/\{[01]\}/g,u,g,h,y,m;if(!p){p=n.oDefaultListFormat}c=this.oLocaleData.getListFormat(p.type,p.style);if(o(c)){r.error("No list pattern exists for the provided format options (type, style).");return[]}h=c.start.replace(f,"");y=c.middle.replace(f,"");m=c.end.replace(f,"");a=t.split(h);e=e.concat(a.shift());s=a.join(h).split(m);u=s.pop();i=s.join(m).split(y);e=e.concat(i);e.push(u);if(a.length<1||i.length<1||s.length<1){g=c["2"].replace(f,"");l=t.split(g);if(l.length===2){return l}if(t){return[t]}else{return[]}}return e};return n});