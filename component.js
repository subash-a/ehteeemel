const components = {};
/**
 * @const _DIV_
 * @type {String}
 * @default
 */
const _DIV_ = 'div';
/**
 * @const _A_
 * @type {String}
 * @default
 */
const _A_ = 'a';
/**
 * @const _UL_
 * @type {String}
 * @default
 */
const _UL_ = 'ul';
/**
 * @const _OL_
 * @type {String}
 * @default
 */
const _OL_ = 'ol';
/**
 * @const _LI_
 * @type {String}
 * @default
 */
const _LI_ = 'li';
/**
 * @const _LABEL_
 * @type {String}
 * @default
 */
const _LABEL_ = 'label';
/**
 * @const _FORM_
 * @type {String}
 * @default
 */
const _FORM_ = 'form';
/**
 * @const _SELECT_
 * @type {String}
 * @default
 */
const _SELECT_ = 'select';
/**
 * @const _OPTION_
 * @type {String}
 * @default
 */
const _OPTION_ = 'option';
/**
 * @const _TEXTAREA_
 * @type {String}
 * @default
 */
const _TEXTAREA_ = 'textarea';
/**
 * @const _BUTTON_
 * @type {String}
 * @default
 */
const _BUTTON_ = 'button';
/**
 * @const _INPUT_
 * @type {String}
 * @default
 */
const _INPUT_ = 'input';
/**
 * @const _TABLE_
 * @type {String}
 * @default
 */
const _TABLE_ = 'table';
/**
 * @const _THEAD_
 * @type {String}
 * @default
 */
const _THEAD_ = 'thead';
/**
 * @const _TBODY_
 * @type {String}
 * @default
 */
const _TBODY_ = 'tbody';
/**
 * @const _TR_
 * @type {String}
 * @default
 */
const _TR_ = 'tr';
/**
 * @const _TH_
 * @type {String}
 * @default
 */
const _TH_ = 'th';
/**
 * @const _TD_
 * @type {String}
 * @default
 */
const _TD_ = 'td';
/**
 * @const _SPAN_
 * @type {String}
 * @default
 */
const _SPAN_ = 'span';
/**
 * @const _NAV_
 * @type {String}
 * @default
 */
const _NAV_ = 'nav';
/**
 * @const _DATE_
 * @type {String}
 * @default
 */
const _DATE_ = 'date';
/**
 * @const _TEXT_
 * @type {String}
 * @default
 */
const _TEXT_ = 'text';
/**
 * @const _FILE_
 * @type {String}
 * @default
 */
const _FILE_ = 'file';
/**
 * @const _CHECKBOX_
 * @type {String}
 * @default
 */
const _CHECKBOX_ = 'checkbox';
/**
 * @const _PASSWORD_
 * @type {String}
 * @default
 */
const _PASSWORD_ = 'password';
/**
 * @const _FOR_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _FOR_ATTRIBUTE_ = 'for';
/**
 * @const _NAME_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _NAME_ATTRIBUTE_ = 'name';
/**
 * @const _ID_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _ID_ATTRIBUTE_ = 'id';
/**
 * @const _STYLE_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _STYLE_ATTRIBUTE_ = 'style';
/**
 * @const _TYPE_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _TYPE_ATTRIBUTE_ = 'type';
/**
 * @const _VALUE_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _VALUE_ATTRIBUTE_ = 'value';
/**
 * @const _PLACEHOLDER_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _PLACEHOLDER_ATTRIBUTE_ = 'placeholder';
/**
 * @const _HREF_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _HREF_ATTRIBUTE_ = 'href';
/**
 * @const _CLASS_ATTRIBUTE_
 * @type {String}
 * @default
 */
const _CLASS_ATTRIBUTE_ = 'class';
/**
 * @const _DATA_PREFIX_
 * @type {String}
 * @default
 */
const _DATA_PREFIX_ = 'data-';
/**
 * @const _FUNCTION_DATA_TYPE_
 * @type {String}
 * @default
 */
const _FUNCTION_DATA_TYPE_ = 'function';
/**
 * @const _OBJECT_DATA_TYPE_
 * @type {String}
 * @default
 */
const _OBJECT_DATA_TYPE_ = 'object';
/**
 * @const _NUMBER_DATA_TYPE_
 * @type {String}
 * @default
 */
const _NUMBER_DATA_TYPE_ = 'number';
/**
 * @const _CLICK_EVENT_TYPE_
 * @type {String}
 * @default
 */
const _CLICK_EVENT_TYPE_ = 'click';
/**
 * @const _KEYDOWN_EVENT_TYPE_
 * @type {String}
 * @default
 */
const _KEYDOWN_EVENT_TYPE_ = 'keydown';

/**
 * This method recursively sets the child elements to a DOM Node, this
 * method now checks for a set of elements passed as an array,
 * a single element passed as a DOM Element Object or plain string.
 * @method setElementContent
 * @param {DOMElement} element - should be the element whose child
 * elements need to be set
 * @param {Array|Object|String} content - should be an array of
 * DOM Elements or a single DOM Element Object or just plain String
 * need to be set as the children of the parent element
 * @returns {DOMElement} returns a DOM Element with all the children
 * elements set
 */
var setElementContent = function(element, content) {
    if (content) {
        if (typeof content === _OBJECT_DATA_TYPE_) {
            if (typeof content.forEach === _FUNCTION_DATA_TYPE_) {
                /* Perform iteration if array is passed */
                content.forEach(function(item) {
                    element.appendChild(item);
                });
            }
            else {
                /* Insert single DOM Element Object */
                element.appendChild(content);
            }
        }
        else {
            /* Insert plain string */
            element.innerText = content;
        }
    }
    return element;
};

/**
 * @method setElementAttributes
 * @param {DOMElement} element - is an instance of DOM Element
 * @param {Object} attributes - is an object with keys for attribute
 * names and values for attribute values.
 * @returns {DOMElement} returns a DOM Element with attributes
 **/
var setElementAttributes = function(element, attributes) {
    if (attributes && typeof attributes === _OBJECT_DATA_TYPE_) {
        Object
            .keys(attributes)
            .forEach(function(attr) {
                element.setAttribute(attr, attributes[attr]);
            });
    }
    return element;
};

/**
 * This method creates a DOM Element with the content and attributes
 * passed in the arguments
 * @method createElement
 * @param {String} type - is a string type of the tag that needs to
 * be created
 * @param {Array} content - is an array of DOM Elements which need to
 * be set as its children
 * @param {Object} attributes - is an object containing the attributes
 * as keys and their values
 * @returns {DOMElement} returns a DOM Element with the attributes and
 * content
 */

var createElement = function(type, content, attributes) {
    var element = document.createElement(type);
    if (content) {
        element = setElementContent(element, content);
    }
    if (attributes) {
        element = setElementAttributes(element, attributes);
    }
    return element;
};

/**
 * This component is responsible for allowing a text edit in place
 * without having to go into a modal popup of any kind, this works for
 * text input based data, a click signals its editing state and hitting
 * enter on the input box signals end of change
 * @method createInplaceEdit
 * @param {Object} attributes - is a list of attributes to be used for
 * dom element creation
 * @param {String} attributes.label - is the label to be displayed to
 * be edited when user clicks
 * @return {DOMElement} - is the container element of the editable component
 */
var inplaceEdit = function(attributes) {
    var newVal; 
    var oldVal = attributes.label;
    var inputAttributes = {};
    var labelAttributes = {};
    var containerAttributes = {};
    inputAttributes[_VALUE_ATTRIBUTE_] = attributes.label;
    inputAttributes[_TYPE_ATTRIBUTE_] = _TEXT_;
    labelAttributes[_CLASS_ATTRIBUTE_] = 'label';
    labelAttributes[_HREF_ATTRIBUTE_] = '#';
    containerAttributes[_CLASS_ATTRIBUTE_] = 'editable';
    
    var input = createElement(_INPUT_, null, inputAttributes);
    var label = createElement(_A_, attributes.label, labelAttributes);
    var container = createElement(_DIV_, [label, input], containerAttributes);
    label.addEventListener(_CLICK_EVENT_TYPE_, function(event) {
	container.classList.add('editing');
	input.focus();
    });
    input.addEventListener(_KEYDOWN_EVENT_TYPE_, function(event) {
	if(event.keyCode === 13) {
	    label.innerText = event.target.value;
	    container.classList.remove('editing');
	    newVal = event.target.value;
	    var edited = new CustomEvent('edited', {'detail':{'oldVal': oldVal, 'newVal': newVal}});
	    container.dispatchEvent(edited);
	}
    });
    return container;
};
