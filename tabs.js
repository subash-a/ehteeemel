/**
 * @classdesc This class is used for creating tab component, the classic
 * tab which can be used by setting the configuration
 * @class Tabs
 */

/**
 * @constructs Tabs
 * @param {Object} config - Is a configuration object which defines tabs
 * @param {Object} config.attributes - Is an object which is required and
 * must define the attributes for the tab contents
 * @param {String} config.attributes.id - is the id that would be used for
 * representing the tab in the component
 * @param {String} config.attributes.class - classnames that need to be
 * given to the tab, the class 'tab' is mandatory
 * @param {(Array|Object|String)} config.content - This holds the content
 * for the tab which will be rendered
 * @returns {Object} which is capable of rendering the tab in any given
 * DOM Element
 */
var Tabs = function(config) {
    var _baseComponents_ = new BaseComponents();
    var _self_ = this;
    /* Sub function to create Links for the Tab Bar */
    var createLinks = function(config) {
        /* Formatting link data so that it can suit the processing func */
        var linkFormatter = function(k) {
            return {
                label: k,
                href: '#' + config[k].attributes.id,
                class: 'tab-link'
            };
        };
        var linkConfig = Object.keys(config).map(linkFormatter);
        var links = _baseComponents_.createActionBar(linkConfig);
        /* Click Handling code for detecting tab changes using click */
        var clickHandler = function(event) {
            if (event.target.nodeName === 'A') {
                var tab = event.target.getAttribute('label');
                _self_.setTab(tab);
            }
            event.preventDefault();
        };
        /* Adding event listener to listen to tab header clicks */
        links.addEventListener('click', clickHandler);
        return links;
    };

    /* Sub function to create content divs and add attributes for the content */
    var createContent = function(config) {
        var childArray = Object.keys(config).map(function(c) {
            return config[c];
        });
        var children = _baseComponents_.createElements('div', childArray);
        var contentBox = _baseComponents_.createElement('div', children, {
            'class': 'tab-content'
        });
        return contentBox;
    };

    /* This section assigns the context variable with properties for use in proto
     * type functions */
    _self_._config = config;
    _self_._baseComponents_ = _baseComponents_;
    _self_.links = createLinks(config);
    _self_.content = createContent(config);
    _self_.currentTab = Object.keys(config)[0];
    _self_.container = _baseComponents_.createElement('div', [_self_.links, _self_.content], {
        'class': 'tab-component'
    });

};

/**
 * This method renders the given tab in any given DOM Element where a child
 * element can be added
 * @method render
 * @param {DOMElement} srcNode - is a DOMElement into which the element
 * needs to be appended
 * @memberof Tabs.prototype
 */
Tabs.prototype.render = function(srcNode) {
    var _self_ = this;
    srcNode.appendChild(_self_.container);
    var tabKey = _self_.currentTab;
    var selectedTabObject = _self_._config[tabKey];
    // if (selectedTabObject && selectedTabObject.attributes && selectedTabObject.attributes.id) {
    //     var tab = document.getElementById(selectedTabObject.attributes.id);
    //     tab.classList.add('show-tab');
    // }
    _self_.setTab(tabKey);

};

/**
 * This method sets the currentTab the user is viewing programatically so that
 * the content which is hidden from view may be displayed
 * @method setTab
 * @param {String} tabKey - is the string representing the tabkey which
 * was passed during creating the tab as its object key
 */
Tabs.prototype.setTab = function(tabKey) {
    var _self_ = this;
    var deselectedTabObject = _self_._config[_self_.currentTab];
    if (deselectedTabObject && deselectedTabObject.attributes && deselectedTabObject.attributes.id) {
        var detabLink = document.querySelector('a.tab-link.current[href="#' + deselectedTabObject.attributes.id + '"');
        if (detabLink) {
            detabLink.classList.remove('current');
        }
        var detab = document.getElementById(deselectedTabObject.attributes.id);
        detab.classList.remove('show-tab');
    }
    _self_.currentTab = tabKey;
    var selectedTabObject = _self_._config[tabKey];
    if (selectedTabObject && selectedTabObject.attributes && selectedTabObject.attributes.id) {
        var tabLink = document.querySelector('a.tab-link[href="#' + selectedTabObject.attributes.id + '"]');
        if (tabLink) {
            tabLink.classList.add('current');
        }
        var tab = document.getElementById(selectedTabObject.attributes.id);
        tab.classList.add('show-tab');
    }
};

/**
 * This method sets the contents of a given tab using the tabKey parameter and
 * the content parameter, this appends the content with old one being still
 * present
 * @method setTabContent
 * @param {String} tabKey - is the key from the tab configuration when it was
 * created
 * @param {(Array|Object|String)} content - is the content that needs to be
 * appended to the existing content in the tab
 */
Tabs.prototype.setTabContent = function(tabKey, content) {
    var _self_ = this;
    var selectedTabObject = _self_._config[tabKey];
    if (selectedTabObject && selectedTabObject.attributes && selectedTabObject.attributes.id) {
        var tab = document.getElementById(selectedTabObject.attributes.id);
        _self_._baseComponents_.setElementContent(tab, content);
    }
};

/**
 * This method is responsible for adding a tab to the existing tab component
 * which already has tabs, you need to pass the new tab's config object to
 * create the new tab and it cannot override the old tab configuration
 * @method addTabs
 * @param {Array} tabConfig - This argument is an array of objects which
 * define the tabkey, the attributes of the tab and the content of the tab just
 * like the initial configuration for creating the Tab component.
 */
Tabs.prototype.addTabs = function(tabConfig) {
    var keys = Object.keys(tabConfig);
    var linkConfig = [];
    var contentConfig = [];
    var _self_ = this;
    keys.forEach(function(k) {
        _self_._config[k] = tabConfig[k];
        linkConfig.push({
            'label': k,
            'href': '#' + tabConfig[k].attributes.id,
            'class': 'tab-link'
        });
        tabConfig[k].attributes['class'] = 'tab';
        contentConfig.push(tabConfig[k]);
    });
    _self_._baseComponents_.setElementContent(this.content, _self_._baseComponents_.createElements('div', contentConfig));
    var createLinks = function(attribute) {
        return _self_._baseComponents_.createElement('li', [_self_._baseComponents_.createActionLink(attribute.label, attribute)]);
    };
    var links = linkConfig.map(createLinks);
    var ul = _self_.links.getElementsByClassName('action-bar')[0];
    _self_._baseComponents_.setElementContent(ul, links);
};

/**
 * This method is responsible for removing a given tab using the tabKey defined
 * in the initial configuration object
 * @method removeTab
 * @param {String} tabKey - is the string denoting the key value of this tab
 * which was defined in the initial configuration it was created with
 */
Tabs.prototype.removeTab = function(tabKey) {
    var _self_ = this;
    if (_self_.currentTab === tabKey) {
        var newTab;
        var keys = Object.keys(_self_._config);
        var index = keys.indexOf(tabKey);
        if (index === (keys.length - 1)) {
            newTab = keys[index - 1];
        } else {
            newTab = keys[index + 1];
        }
        _self_.setTab(newTab);
    }
    if (tabKey && _self_._config[tabKey] && _self_._config[tabKey].attributes && _self_._config[tabKey].attributes.id) {
        var id = _self_._config[tabKey].attributes.id;
        linkParent = _self_.links.querySelector('.action-bar li > a[label=' + id + ']').parentElement;
        actionBar = _self_.links.getElementsByClassName('action-bar')[0];
        contentBox = _self_.content;
        contentParent = document.getElementById(id);
        actionBar.removeChild(linkParent);
        contentBox.removeChild(contentParent);
        delete _self_._config.tabKey;
    }
};



