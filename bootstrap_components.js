/* Creating Bootstrap Based Components */
var createListGroup = function(listItems) {
    var listItemComponents = listItems.map(function(listItem) {
        return createElement(_LI_, listItem, {
            'class': 'list-group-item'
        });
    });
    var list = createElement(_UL_, listItemComponents, {
        'class': 'list-group'
    });
    return list;
};

var createLinkListGroup = function(listItems) {
    var listItemComponents = listItems.map(function(listItem) {
        return createElement(_LI_, [createElement(_A_, listItem.label, {
            'href': listItem.link
        })], {
            'class': 'list-group-item'
        });
    });
    var list = createElement(_UL_, listItemComponents, {
        'class': 'list-group'
    });
    return list;
};

var createPanel = function(title, body, footer) {
    var panel, panelBody, panelFooter, panelHeading;
    var content = [];
    panelHeading = createElement(_DIV_, title, {
        'class': 'panel-heading'
    });
    content.push(panelHeading);

    if (body.nodeName === 'UL' || body.nodeName === 'TABLE' || body.nodeName === 'OL') {
        panelBody = body;
        content.push(panelBody);
    } else {
        panelBody = createElement(_DIV_, body, {
            'class': 'panel-body'
        });
        content.push(panelBody);
    }
    if (footer) {
        panelFooter = createElement(_DIV_, footer, {
            'class': 'panel-footer'
        });
        content.push(panelFooter);
    }
    panel = createElement(_DIV_, content, {
        'class': 'panel panel-default'
    });
    return panel;
};

var createBreadcrumbs = function(root) {
    var breadcrumb, list;
    list = [createElement(_LI_, [createElement(_A_, root, {
        'href': '#'
    })], {})];
    breadcrumb = createElement(_OL_, list, {
        'class': 'breadcrumb'
    });
    breadcrumb.addCrumb = function(item, index, array) {
        if (item) {
            this.appendChild(createElement(_LI_, [createElement(_A_, item, {
                'href': '/' + item
            })], {
                'data-item': item
            }));
        }
    };
    breadcrumb.removeCrumb = function(item) {
        if (item) {
            this.removeChild(this.querySelector('[data-item="' + item + '"]'));
        }
    };
    breadcrumb.setPath = function(path) {
        var path_array = path.split("/");
        //path_array.splice(0,1); // Removing the leading / from url path
        breadcrumb.innerText = "";
        var link = '';
        var addCrumb = function(item, index, array) {
            if (item) {
                link = array.slice(0, index + 1).join('/');
                this.appendChild(createElement(_LI_, [createElement(_A_, item, {
                    'href': link
                })], {
                    'data-item': item
                }));
            }
        }
        path_array.forEach(addCrumb, breadcrumb);
    };
    return breadcrumb;
};

var createModal = function(id, header, body, footer) {
    var closeButton = createElement(_SPAN_, '&times;', {
        'aria-hidden': 'true'
    });
    var modalDismiss = createElement(_BUTTON_, [closeButton], {
        'class': 'close',
        'data-dismiss': 'modal',
        'aria-label': 'close'
    });
    var modalHeader = createElement(_DIV_, [header], {
        'class': 'modal-header'
    });

    var modalBody = createElement(_DIV_, [body], {
        'class': 'modal-body'
    });
    var dismissButton = createElement(_BUTTON_, 'Close', {
        'class': 'btn btn-default',
        'data-dismiss': 'modal',
        'type': 'button'
    });
    var modalFooter = createElement(_DIV_, [dismissButton], {
        'class': 'modal-footer'
    });
    var modalContent = createElement(_DIV_, [modalHeader, modalBody, modalFooter], {
        'class': 'modal-content'
    });
    var modalDialog = createElement(_DIV_, [modalContent], {
        'class': 'modal-dialog'
    });
    var modal = createElement(_DIV_, [modalDialog], {
        'id': id,
        'class': 'modal fade'
    });
    return modal;
};

var createSplitButtonDropdown = function(body, links) {
    var linkElements = links.map(function(item) {
        var e = createElement(_LI_, [createElement(_A_, item.label, {
            'href': item.link
        })], {})
        return e;
    });
    var menu = createElement(_UL_, linkElements, {
        'class': 'dropdown-menu',
        'role': 'menu'
    });
    var text = createElement(_SPAN_, body, {});
    var arrow = createElement(_SPAN_, '', {
        'class': 'caret'
    });
    var button = createElement(_BUTTON_, [text], {
        'class': 'btn btn-default'
    });
    var arrowButton = createElement(_BUTTON_, [arrow], {
        'class': 'btn btn-default dropdown-toggle',
        'data-toggle': 'dropdown'
    });
    var splitButtonDropdown = createElement(_DIV_, [button, arrowButton, menu], {
        'class': 'btn-group'
    });
    return splitButtonDropdown;
};
