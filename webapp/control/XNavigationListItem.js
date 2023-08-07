/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery", "sap/ui/core/Core", "sap/ui/core/Item", "sap/ui/core/Icon", "sap/tnt/NavigationList", "sap/ui/core/InvisibleText", "sap/ui/core/Renderer", "sap/ui/core/IconPool", "sap/ui/events/KeyCodes", "sap/ui/core/library", "sap/ui/util/openWindow", "sap/ui/util/defaultLinkTypes", "sap/ui/dom/jquery/Aria"], function (t, i, s, a, n, r, o, p, l, d, c, g) {
    "use strict";
    var u = d.TextAlign;
    var h = d.TextDirection;
    var XNavigationListItem = new sap.tnt.NavigationListItem.extend("sap.ui.elev8rerp.componentcontainer.control.XNavigationListItem", {
        metadata: {
            library: "sap.tnt",
            properties: {
                icon: {
                    type: "sap.ui.core.URI",
                    group: "Misc", defaultValue: ""
                },
                expanded: {
                    type: "boolean",
                    group: "Misc",
                    defaultValue: true
                },
                hasExpander: {
                    type: "boolean",
                    group: "Misc",
                    defaultValue: true
                },
                visible: {
                    type: "boolean",
                    group: "Appearance",
                    defaultValue: true
                },
                href: {
                    type: "sap.ui.core.URI",
                    group: "Data",
                    defaultValue: null
                },
                target: {
                    type: "string",
                    group: "Behavior",
                    defaultValue: null
                }
            },
            defaultAggregation: "xitems",
            aggregations: {
                xitems: {
                    type: "sap.ui.elev8rerp.componentcontainer.control.XNavigationListItem",
                    multiple: true,
                    singularName: "item"
                },
                _expandIconControl: {
                    type: "sap.ui.core.Icon",
                    multiple: false,
                    visibility: "hidden"
                }
            },
            events: {
                select: {
                    parameters: {
                        item: {
                            type: "sap.ui.core.Item"
                        }
                    }
                }
            },
            designtime: "sap/tnt/designtime/NavigationListItem.designtime"
        }
    });

    XNavigationListItem.expandIcon = "sap-icon://navigation-right-arrow";

    XNavigationListItem.collapseIcon = "sap-icon://navigation-down-arrow";

    XNavigationListItem._getInvisibleText = function () {
        if (!this._invisibleText) {
            this._invisibleText = (new r).toStatic()
        }
        return this._invisibleText
    };

    XNavigationListItem.prototype.init = function () {
        this._resourceBundle = i.getLibraryResourceBundle("sap.ui.core");
        this._resourceBundleMLib = i.getLibraryResourceBundle("sap.m");
        this._resourceBundleTNTLib = i.getLibraryResourceBundle("sap.tnt")
    };

    XNavigationListItem.prototype._getUniqueKey = function () {
        var t = this.getKey();
        if (t) {
            return t
        }
        return this.getId();
    };

    XNavigationListItem.prototype._getExpandIconControl = function () {
        var t = this.getAggregation("_expandIconControl");
        if (!t) {
            var e = this.getExpanded();
            t = new a({
                src: e ? XNavigationListItem.collapseIcon : XNavigationListItem.expandIcon,
                visible: this.getItems().length > 0 && this.getHasExpander(),
                useIconTooltip: false,
                tooltip: this._getExpandIconTooltip(!e)
            }).addStyleClass("sapTntNavLIExpandIcon");
            this.setAggregation("_expandIconControl", t, true)
        }
        return t
    };

    XNavigationListItem.prototype._getExpandIconTooltip = function (t) {
        if (!this.getEnabled()) {
            return ""
        }
        var e = t ? "Icon.expand" : "Icon.collapse";
        return this._resourceBundle.getText(e)
    };

    XNavigationListItem.prototype.getLevel = function () {
        var t = 0;
        var e = this.getParent();
        if (e.getMetadata().getName() == "sap.tnt.NavigationListItem") {
            return e.getLevel() + 1
        }
        return t
    };

    XNavigationListItem.prototype.getNavigationList = function () {
        var t = this.getParent();
        while (t && t.getMetadata().getName() != "sap.tnt.NavigationList") {
            t = t.getParent()
        }
        return t
    };

    XNavigationListItem.prototype._isListExpanded = function () {
        var t = this.getNavigationList();
        return t.getExpanded() || t.hasStyleClass("sapTntNavLIPopup")
    };

    XNavigationListItem.prototype.createPopupList = function () {
        var t = [],
            e = this.getNavigationList(),
            i = e.getSelectedItem(),
            s, a, r, o = this.getItems();
        for (var p = 0; p < o.length; p++) {
            a = o[p];
            if (a.getVisible()) {
                r = new XNavigationListItem({
                    key: a.getId(),
                    text: a.getText(),
                    textDirection: a.getTextDirection(),
                    enabled: a.getEnabled(),
                    href: a.getHref(),
                    target: a.getTarget(),
                    tooltip: a.getTooltip()
                });
                t.push(r);
                if (i === a) {
                    s = r
                }
            }
        }
        var l = new XNavigationListItem({
            expanded: true,
            hasExpander: false,
            key: this.getId(),
            text: this.getText(),
            enabled: this.getEnabled(),
            textDirection: this.getTextDirection(),
            href: this.getHref(),
            target: this.getTarget(),
            tooltip: this.getTooltip(),
            items: t
        });
        var d = new n({
            itemSelect: this.onPopupItemSelect.bind(this),
            items: [l]
        }).addStyleClass("sapTntNavLIPopup");
        if (i == this) {
            s = l;
            d.isGroupSelected = true
        }
        d.setSelectedItem(s);
        return d
    };

    XNavigationListItem.prototype.onPopupItemSelect = function (t) {
        var e = t.getParameter("item");
        e = i.byId(e.getKey());
        e._selectItem(t)
    };

    XNavigationListItem.prototype._selectItem = function (t) {
        var e = {
            item: this
        },
            i = this.getNavigationList();
        this.fireSelect(e);
        i._selectItem(e);
        this._openUrl()
    };

    XNavigationListItem.prototype._openUrl = function () {
        var t = this.getHref();
        if (t) {
            c(t, this.getTarget() || "_self")
        }
    };

    XNavigationListItem.prototype.onkeydown = function (t) {
        if (t.isMarked("subItem")) {
            return
        }
        t.setMarked("subItem");
        if (this.getLevel() > 0) {
            return
        }
        var e = i.getConfiguration().getRTL();
        if (t.shiftKey && t.which == 189 || t.which == l.NUMPAD_MINUS || t.which == l.ARROW_RIGHT && e || t.which == l.ARROW_LEFT && !e) {
            if (this.collapse()) {
                t.preventDefault();
                t.stopPropagation()
            }
        } else if (t.which == l.NUMPAD_PLUS || t.shiftKey && t.which == l.PLUS || t.which == l.ARROW_LEFT && e || t.which == l.ARROW_RIGHT && !e) {
            if (this.expand()) {
                t.preventDefault();
                t.stopPropagation()
            }
        }
    };

    XNavigationListItem.prototype.expand = function (duration) {
        if (this.getExpanded() || !this.getHasExpander() || this.getItems().length == 0) {
            return;
        }
        this.setProperty('expanded', true, true);
        this.$().attr('aria-expanded', true);
        var expandIconControl = this._getExpandIconControl();
        expandIconControl.setSrc(XNavigationListItem.collapseIcon);
        expandIconControl.setTooltip(this._getExpandIconTooltip(false));
        var $firstULContainer = this.$().children('ul').first();
        $firstULContainer.toggleClass("sapTntNavLIHiddenGroupItems");
        this.getNavigationList()._updateNavItems();
        return true;
    };

    XNavigationListItem.prototype.collapse = function (duration) {
        if (!this.getExpanded() || !this.getHasExpander() || this.getItems().length == 0) {
            return;
        }
        this.setProperty('expanded', false, true);
        this.$().attr('aria-expanded', false);
        var expandIconControl = this._getExpandIconControl();
        expandIconControl.setSrc(XNavigationListItem.expandIcon);
        expandIconControl.setTooltip(this._getExpandIconTooltip(true));
        var $firstULContainer = this.$().children('ul').first();
        $firstULContainer.toggleClass("sapTntNavLIHiddenGroupItems");
        this.getNavigationList()._updateNavItems();
        return true;
    };

    XNavigationListItem.prototype.expand1 = function (t) {
        if (this.getExpanded() || !this.getHasExpander() || this.getItems().length == 0 || this.getLevel() > 0) {
            return
        }
        this.setProperty("expanded", true, true);
        this.$().find(".sapTntNavLIGroup").attr("aria-expanded", true);
        var e = this._getExpandIconControl();
        e.setSrc(XNavigationListItem.collapseIcon);
        e.setTooltip(this._getExpandIconTooltip(false));
        var i = this.$().find(".sapTntNavLIGroupItems");
        var s = this.getDomRef();
        i.stop(true, true).slideDown(t || "fast", function () {
            s.querySelector(".sapTntNavLIGroupItems").classList.toggle("sapTntNavLIHiddenGroupItems")
        });
        this.getNavigationList()._updateNavItems();
        return true
    };

    XNavigationListItem.prototype.collapse1 = function (t) {
        if (!this.getExpanded() || !this.getHasExpander() || this.getItems().length == 0 || this.getLevel() > 0) {
            return
        }
        this.setProperty("expanded", false, true);
        this.$().children('ul').first().find(".sapTntNavLIGroup").attr("aria-expanded", false);
        var e = this._getExpandIconControl();
        e.setSrc(XNavigationListItem.expandIcon);
        e.setTooltip(this._getExpandIconTooltip(true));
        var i = this.$().find(".sapTntNavLIGroupItems");
        var s = this.getDomRef();
        i.stop(true, true).slideUp(t || "fast", function () {
            s.querySelector(".sapTntNavLIGroupItems").classList.toggle("sapTntNavLIHiddenGroupItems")
        });
        this.getNavigationList()._updateNavItems();
        return true
    };

    XNavigationListItem.prototype.ontap = function (e) {
        var i = this.getNavigationList(),
            s = t(e.target).closest(".sapUiIcon"),
            a = this.getLevel(),
            n, r;
        if (e.isMarked("subItem")) {
            return
        }
        e.setMarked("subItem");
        if (!this.getEnabled()) {
            return
        }
        if (a === 1) {
            n = this.getParent();
            if (this.getEnabled() && n.getEnabled()) {
                this._selectItem(e)
            }
            return
        }
        if (i.getExpanded() || !this.getItems().length) {
            if (!s.length || !s.hasClass("sapTntNavLIExpandIcon")) {
                this._selectItem(e);
                return
            }
            e.preventDefault();
            if (this.getExpanded()) {
                this.collapse()
            } else {
                this.expand()
            }
        } else {
            r = this.createPopupList();
            i._openPopover(this, r)
        }
    };

    XNavigationListItem.prototype.onsapenter = XNavigationListItem.prototype.ontap;

    XNavigationListItem.prototype.onsapspace = XNavigationListItem.prototype.ontap;

    XNavigationListItem.prototype.render = function (t, e, l, a) {
        if (!this.getVisible()) {
            return
        }
        this.renderFirstLevelNavItem(t, e, l, a)
    };

    XNavigationListItem.prototype.renderGroupItem = function (t, e) {
        var i = this._isListExpanded(),
            s = this.getExpanded(),
            a = this._getVisibleItems(this),
            n = a.length,
            r = this.getText(),
            o = this.getHref(),
            p = this.getTarget(),
            l, d = {
                level: "1",
                role: "treeitem",
                selected: false,
                roledescription: this._resourceBundleTNTLib.getText("NAVIGATION_LIST_ITEM_ROLE_DESCRIPTION_TREE_ITEM")
            };
        t.openStart("div");
        t.class("sapTntNavLIItem");
        t.class("sapTntNavLIGroup");
        if (e._selectedItem === this) {
            d.selected = true;
            t.class("sapTntNavLIItemSelected")
        }
        if (!this.getEnabled()) {
            t.class("sapTntNavLIItemDisabled")
        }
        if (!i && this._hasSelectedChild(e._selectedItem)) {
            t.class("sapTntNavLIItemSelected")
        }
        if (i) {
            l = this.getTooltip_AsString() || r;
            if (l) {
                t.attr("title", l)
            }
            if (this.getEnabled()) {
                t.attr("tabindex", "-1")
            }
            if (n > 0) {
                d.expanded = s
            }
            t.accessibilityState(d)
        }
        t.openEnd();
        t.openStart("a", this.getId() + "-a");
        t.attr("tabindex", "-1");
        t.accessibilityState({
            role: "link"
        });
        if (!i) {
            t.accessibilityState({
                hidden: true
            })
        }
        if (o) {
            t.attr("href", o)
        }
        if (p) {
            t.attr("target", p);
            t.attr("rel", g("", p))
        }
        t.openEnd();
        this._renderIcon(t);
        if (e.getExpanded()) {
            var c = this._getExpandIconControl();
            c.setVisible(this.getItems().length > 0 && this.getHasExpander());
            c.setSrc(this.getExpanded() ? XNavigationListItem.collapseIcon : XNavigationListItem.expandIcon);
            c.setTooltip(this._getExpandIconTooltip(!this.getExpanded()));
            this._renderText(t);
            t.renderControl(c)
        }
        t.close("a");
        t.close("div")
    };

    XNavigationListItem.prototype.renderFirstLevelNavItem = function (t, e) {
        var i, s = this._getVisibleItems(this),
            a = s.length,
            n = this.getExpanded(),
            r = this._isListExpanded(),
            o, p = {
                role: "menuitemradio",
                checked: false,
                roledescription: this._resourceBundleTNTLib.getText("NAVIGATION_LIST_ITEM_ROLE_DESCRIPTION_MENUITEM")
            };
        t.openStart("li", this);
        if (!r) {
            if (this.getEnabled()) {
                t.attr("tabindex", "-1")
            }
            o = this.getTooltip_AsString() || this.getText();
            if (o) {
                t.attr("title", o)
            }
            if (a > 0) {
                if (this.getEnabled()) {
                    t.class("sapTnTNavLINotExpandedTriangle")
                }
                p.haspopup = "tree"
            }
            if (e._selectedItem === this) {
                p.checked = true
            }
            t.accessibilityState(p)
        } else {
            t.attr("aria-hidden", "true")
        }
        t.openEnd();
        this.renderGroupItem(t, e);
        if (r) {
            t.openStart("ul");
            t.attr("aria-hidden", "true");
            t.attr("role", "group");
            t.class("sapTntNavLIGroupItems");
            if (!n) {
                t.class("sapTntNavLIHiddenGroupItems")
            }
            t.openEnd();
            for (var l = 0; l < a; l++) {
                i = s[l];
                i.render(t, e, l, a)
            }
            t.close("ul")
        }
        t.close("li")
    };

    XNavigationListItem.prototype.renderSecondLevelNavItem = function (t, e) {
        var i = this.getParent(),
            s = this.getHref(),
            a = this.getTarget(),
            n = {
                role: "treeitem",
                level: "2",
                selected: false,
                roledescription: this._resourceBundleTNTLib.getText("NAVIGATION_LIST_ITEM_ROLE_DESCRIPTION_TREE_ITEM")
            };
        t.openStart("li", this);
        t.class("sapTntNavLIItem");
        t.class("sapTntNavLIGroupItem");
        if (e._selectedItem === this) {
            n.selected = true;
            t.class("sapTntNavLIItemSelected")
        }
        if (!this.getEnabled() || !i.getEnabled()) {
            t.class("sapTntNavLIItemDisabled")
        } else {
            t.attr("tabindex", "-1")
        }
        var r = this.getText();
        var o = this.getTooltip_AsString() || r;
        if (o) {
            t.attr("title", o)
        }
        t.accessibilityState(n);
        t.openEnd();
        t.openStart("a", this.getId() + "-a");
        t.attr("tabindex", "-1");
        t.accessibilityState({
            role: "link"
        });
        if (s) {
            t.attr("href", s)
        }
        if (a) {
            t.attr("target", a);
            t.attr("rel", g("", a))
        }
        t.openEnd();
        this._renderText(t);
        t.close("a");
        t.close("li")
    };

    XNavigationListItem.prototype._renderIcon = function (t) {
        var e = this.getIcon(),
            i = p.getIconInfo(e);
        if (e) {
            t.openStart("span");
            t.class("sapUiIcon");
            t.class("sapTntNavLIGroupIcon");
            t.attr("aria-hidden", true);
            if (i && !i.suppressMirroring) {
                t.class("sapUiIconMirrorInRTL")
            }
            if (i) {
                t.attr("data-sap-ui-icon-content", i.content);
                t.style("font-family", "'" + i.fontFamily + "'")
            }
            t.openEnd();
            t.close("span")
        } else {
            t.openStart("span");
            t.class("sapUiIcon");
            t.class("sapTntNavLIGroupIcon");
            t.attr("aria-hidden", true);
            t.openEnd();
            t.close("span")
        }
    };

    XNavigationListItem.prototype._renderText = function (t) {
        t.openStart("span");
        t.class("sapMText");
        t.class("sapTntNavLIText");
        t.class("sapMTextNoWrap");
        var e = this.getTextDirection();
        if (e !== h.Inherit) {
            t.attr("dir", e.toLowerCase())
        }
        var i = o.getTextAlign(u.Begin, e);
        if (i) {
            t.style("text-align", i)
        }
        t.openEnd();
        t.text(this.getText());
        t.close("span")
    };

    XNavigationListItem.prototype._unselect = function () {
        var t = this.$(),
            e = this.getNavigationList();
        if (!e) {
            return
        }
        if (this._isListExpanded()) {
            if (this.getLevel() === 0) {
                t = t.find(".sapTntNavLIGroup")
            }
            t.attr("aria-selected", false)
        } else {
            t.attr("aria-checked", false);
            t = t.find(".sapTntNavLIGroup");
            if (this.getParent().isA("sap.tnt.NavigationListItem")) {
                this.getParent().$().find(".sapTntNavLIGroup").removeClass("sapTntNavLIItemSelected")
            }
        }
        t.removeClass("sapTntNavLIItemSelected")
    };

    XNavigationListItem.prototype._select = function () {
        var t = this.$(),
            e = this.getNavigationList();
        if (!e) {
            return
        }
        if (this._isListExpanded()) {
            if (this.getLevel() === 0) {
                t = t.find(".sapTntNavLIGroup")
            }
            t.attr("aria-selected", true)
        } else {
            t.attr("aria-checked", true);
            t = t.find(".sapTntNavLIGroup");
            if (this.getParent().isA("sap.tnt.NavigationListItem")) {
                this.getParent().$().find(".sapTntNavLIGroup").addClass("sapTntNavLIItemSelected")
            }
            e._closePopover()
        }
        t.addClass("sapTntNavLIItemSelected")
    };

    XNavigationListItem.prototype._getDomRefs = function () {
        var t = [];
        if (!this.getEnabled()) {
            return t
        }
        var e = this.$();
        t.push(e.find(".sapTntNavLIGroup")[0]);
        if (this.getExpanded()) {
            var i = e.find(".sapTntNavLIGroupItem");
            for (var s = 0; s < i.length; s++) {
                t.push(i[s])
            }
        }
        return t
    };

    XNavigationListItem.prototype._getVisibleItems = function (t) {
        var e = [];
        var i = t.getItems();
        var s;
        for (var a = 0; a < i.length; a++) {
            s = i[a];
            if (s.getVisible()) {
                e.push(s)
            }
        }
        return e
    };

    XNavigationListItem.prototype.onclick = function (t) {
        if (this.getHref()) {
            t.preventDefault()
        }
    };

    XNavigationListItem.prototype.onmousedown = function (t) {
        if (this.getHref()) {
            t.preventDefault()
        }
    };

    XNavigationListItem.prototype.onfocusin = function (t) {
        if (t.srcControl !== this) {
            return
        }
        this._updateAccessibilityText()
    };

    XNavigationListItem.prototype._updateAccessibilityText = function () {
        var t = this.getNavigationList(),
            e = XNavigationListItem._getInvisibleText();
        if (!t.getExpanded()) {
            e.setText("");
            return
        }
        var i = this._resourceBundleMLib,
            s = this._getAccessibilityItem(),
            a = t._selectedItem === this ? i.getText("LIST_ITEM_SELECTED") : "",
            n = i.getText("ACC_CTR_TYPE_TREEITEM"),
            r = this._getAccessibilityPosition(),
            o = i.getText("LIST_ITEM_POSITION", [r.index, r.size]),
            p = this.getText(),
            l = n + " " + a + " " + p + " " + o;
        e.setText(l);
        s.addAriaLabelledBy(e.getId())
    };

    XNavigationListItem.prototype._getAccessibilityPosition = function () {
        var t = this.getParent(),
            e = this._getVisibleItems(t),
            i = e.length,
            s = e.indexOf(this) + 1;
        return {
            index: s,
            size: i
        }
    };

    XNavigationListItem.prototype._getAccessibilityItem = function () {
        var t = this.$(),
            e = this.getNavigationList(),
            i = e.getExpanded();
        if (i && this.getLevel() === 0) {
            t = t.find(".sapTntNavLIGroup")
        }
        return t
    };

    XNavigationListItem.prototype._hasSelectedChild = function (t) {
        let e = this.getItems(),
            i;
        for (i = 0; i < e.length; i++) {
            if (e[i] === t) {
                return true
            }
        }
        return false
    };

    return XNavigationListItem

});