var createTable = function(data, columns) {
    var _LABEL_KEY_ = 'label';
    var table = document.createElement(_TABLE_);
    var head = document.createElement(_THEAD_);
    var body = document.createElement(_TBODY_);
    var trhead = document.createElement(_TR_);
    var createCellFromObject = function(cell, data) {
        var td = document.createElement(_TD_);
        if (cell.link) {
            td.appendChild(createLink(data[cell.key], cell.linkFn, cell.linkData));
        } else {
            td.innerText = data[cell.key];
        }
        return td;
    };

    var createCellFromData = function(cell, data) {
        var td = document.createElement(_TD_);
        if (cell.link) {
            td.appendChild(createLink(data, cell.linkFn, cell.linkData));
        } else {
            td.innerText = data;
        }
        return td;
    };

    var createRow = function(row) {
        var tr = document.createElement(_TR_);
        columns.forEach(function(col) {
            if (typeof row === _OBJECT_DATA_TYPE_) {
                tr.appendChild(createCellFromObject(col, row));
            } else {
                tr.appendChild(createCellFromData(col, row));
            }

        });
        return tr;
    };

    /* Adding new Rows to the table */
    var addRow = function(rowdata) {
        var rowView = createRow(rowdata);
        body.appendChild(createRow(rowdata));
    };

    columns.forEach(function(col) {
        var th = document.createElement(_TH_);
        th.innerText = col[_LABEL_KEY_];
        trhead.appendChild(th);
    });

    head.appendChild(trhead);

    data.forEach(function(row) {
        body.appendChild(createRow(row));
    });

    table.appendChild(head);
    table.appendChild(body);
    return table;
};
