// var request = require('request');
// var _ = require('underscore');
// var customFilters = require('../../../../lib/custom_filters');
var baseUrl = "https://api.box.com/2.0/events";

var Trigger = {
  id: "box",
  title: "Box"
};

module.exports = Trigger;

Trigger.input = {
  "type": "object",
  "title": "Select Trigger",
  "properties": {
    "auth": {
      "type": "string",
      "title": "Box Access Token",
      "minLength": 1,
      "oauth": "box",
      "propertyOrder": 1
    },
    "dir_name": {
      "type": "string",
      "title": "Directory Name",
      "minLength": 1,
      "default": "All Files",
      "propertyOrder": 2,
      "description": "Enter directory name"
    },
    "customFilters": {
      "type": "array",
      "title": "Custom Filters",
      "items": {
        "type": "object",
        "title": "filter",
        "properties": {
          "input": {
            "type": "string",
            "title": "Input",
            "minLength": 1
          },
          "operator": {
            "type": "string",
            "title": "Condition",
            "enum": [
              "Equals",
              "Equals(Number)",
              "GreaterThan",
              "LessThan",
              "Contains",
              "DoesNotContains",
              "ObjectHasKey",
              "matches",
              "isNull",
              "isEmpty",
              "isNumber",
              "isObject",
              "isArray",
              "isBoolean",
              "isDate",
              "isUndefined"
            ]
          },
          "expected": {
            "type": "string",
            "title": "Expected",
            "minLength": 1
          }
        }
      }
    }
  },
  "oneOf": [
    {
      "type": "object",
      "title": "New/Update File",
      "description": "Triggers when a new file is added or an existing file is updated",
      "properties": {
        "event": {
          "type": "string",
          "enum": [
            "new_file"
          ],
          "options": {
            "hidden": true
          }
        }
      }
    },
    {
      "type": "object",
      "title": "New Folder",
      "description": "Triggers when a new folder is created",
      "properties": {
        "event": {
          "type": "string",
          "enum": [
            "new_folder"
          ],
          "options": {
            "hidden": true
          }
        }
      }
    }
  ]
};

Trigger.output = {
  "new_file": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "title": "type",
        "displayTitle": "Type"
      },
      "event_id": {
        "type": "string",
        "title": "event_id",
        "displayTitle": "Event ID"
      },
      "created_by": {
        "type": "object",
        "title": "created_by",
        "displayTitle": "Created By",
        "properties": {
          "type": {
            "type": "string",
            "title": "type",
            "displayTitle": "Creater Type"
          },
          "id": {
            "type": "string",
            "title": "id",
            "displayTitle": "Creater ID"
          },
          "name": {
            "type": "string",
            "title": "name",
            "displayTitle": "Creater Name"
          },
          "login": {
            "type": "string",
            "title": "login",
            "displayTitle": "Creater EmailId"
          }
        }
      },
      "created_at": {
        "type": "boolean",
        "title": "created_at",
        "displayTitle": "Created Time"
      },
      "recorded_at": {
        "type": "string",
        "title": "recorded_at",
        "displayTitle": "Recorded Time"
      },
      "event_type": {
        "type": "string",
        "title": "event_type",
        "displayTitle": "Event Type"
      },
      "source": {
        "type": "object",
        "title": "source",
        "displayTitle": "Source",
        "properties": {
          "type": {
            "type": "string",
            "title": "type",
            "displayTitle": "Source File Type"
          },
          "id": {
            "type": "string",
            "title": "id",
            "displayTitle": "Source File ID"
          },
          "name": {
            "type": "string",
            "title": "name",
            "displayTitle": "Source File Name"
          },
          "description": {
            "type": "string",
            "title": "description",
            "displayTitle": "Source File Description"
          },
          "size": {
            "type": "string",
            "title": "size",
            "displayTitle": "Source File Size"
          },
          "created_at": {
            "type": "string",
            "title": "created_at",
            "displayTitle": "Source File Created Time"
          },
          "modified_at": {
            "type": "string",
            "title": "modified_at",
            "displayTitle": "Source File Modified At"
          },
          "created_by": {
            "type": "object",
            "title": "created_by",
            "displayTitle": "Source Created By",
            "properties": {}
          },
          "modified_by": {
            "type": "object",
            "title": "modified_by",
            "displayTitle": "Source Modified By",
            "properties": {}
          },
          "owned_by": {
            "type": "object",
            "title": "owned_by",
            "displayTitle": "Source Owned By",
            "properties": {}
          },
          "parent": {
            "type": "object",
            "title": "parent",
            "displayTitle": "Source Parent",
            "properties": {}
          },
          "item_status": {
            "type": "string",
            "title": "item_status",
            "displayTitle": "Source File Item Status"
          },
          "synced": {
            "type": "boolean",
            "title": "synced",
            "displayTitle": "Source File Synced"
          }
        }
      }
    }
  },
  "new_folder": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "title": "type",
        "displayTitle": "Type"
      },
      "event_id": {
        "type": "string",
        "title": "event_id",
        "displayTitle": "Event ID"
      },
      "created_by": {
        "type": "object",
        "title": "created_by",
        "displayTitle": "Created By",
        "properties": {
          "type": {
            "type": "string",
            "title": "type",
            "displayTitle": "Creater Type"
          },
          "id": {
            "type": "string",
            "title": "id",
            "displayTitle": "Creater ID"
          },
          "name": {
            "type": "string",
            "title": "name",
            "displayTitle": "Creater Name"
          },
          "login": {
            "type": "string",
            "title": "login",
            "displayTitle": "Creater EmailId"
          }
        }
      },
      "created_at": {
        "type": "boolean",
        "title": "created_at",
        "displayTitle": "Created Time"
      },
      "recorded_at": {
        "type": "string",
        "title": "recorded_at",
        "displayTitle": "Recorded Time"
      },
      "event_type": {
        "type": "string",
        "title": "event_type",
        "displayTitle": "Event Type"
      },
      "source": {
        "type": "object",
        "title": "source",
        "displayTitle": "Source",
        "properties": {
          "type": {
            "type": "string",
            "title": "type",
            "displayTitle": "Source File Type"
          },
          "id": {
            "type": "string",
            "title": "id",
            "displayTitle": "Source File ID"
          },
          "name": {
            "type": "string",
            "title": "name",
            "displayTitle": "Source File Name"
          },
          "description": {
            "type": "string",
            "title": "description",
            "displayTitle": "Source File Description"
          },
          "size": {
            "type": "string",
            "title": "size",
            "displayTitle": "Source File Size"
          },
          "created_at": {
            "type": "string",
            "title": "created_at",
            "displayTitle": "Source File Created Time"
          },
          "modified_at": {
            "type": "string",
            "title": "modified_at",
            "displayTitle": "Source File Modified At"
          },
          "created_by": {
            "type": "object",
            "title": "created_by",
            "displayTitle": "Source Created By",
            "properties": {}
          },
          "modified_by": {
            "type": "object",
            "title": "modified_by",
            "displayTitle": "Source Modified By",
            "properties": {}
          },
          "owned_by": {
            "type": "object",
            "title": "owned_by",
            "displayTitle": "Source Owned By",
            "properties": {}
          },
          "parent": {
            "type": "object",
            "title": "parent",
            "displayTitle": "Source Parent",
            "properties": {}
          },
          "item_status": {
            "type": "string",
            "title": "item_status",
            "displayTitle": "Source File Item Status"
          },
          "synced": {
            "type": "boolean",
            "title": "synced",
            "displayTitle": "Source File Synced"
          }
        }
      }
    }
  }
};

var mock_data = {
  "new_file": {
    "type": "event",
    "event_id": "099e980927d9fa450b236985540964",
    "created_by": {
      "type": "user",
      "id": "245466",
      "name": "Mike",
      "login": "mike@example.com"
    },
    "created_at": "2014-08-28T03:17:07-07:00",
    "recorded_at": "2014-08-28T03:17:07-07:00",
    "event_type": "ITEM_UPLOAD",
    "session_id": null,
    "source": {
      "type": "file",
      "id": "35607886",
      "name": "test.txt",
      "description": "Test doc",
      "size": 21333,
      "created_at": "2015-08-28T03:17:07-07:00",
      "modified_at": "2015-08-28T03:17:07-07:00",
      "created_by": {
        "type": "user",
        "id": "24566",
        "name": "Mike",
        "login": "mike@example.com"
      },
      "modified_by": {
        "type": "user",
        "id": "24566",
        "name": "Mike",
        "login": "mike@example.com"
      },
      "owned_by": {
        "type": "user",
        "id": "24566",
        "name": "Mike",
        "login": "mike@example.com"
      },
      "parent": {
        "type": "folder",
        "id": "0",
        "sequence_id": null,
        "etag": null,
        "name": "All Files"
      },
      "item_status": "active",
      "synced": true
    }
  },
  "new_folder": {
    "type": "event",
    "event_id": "572603a5ada74d5aa31a66e3b57f60",
    "created_by": {
      "type": "user",
      "id": "245882466",
      "name": "Mike",
      "login": "mike@example.com"
    },
    "created_at": "2014-08-28T03:25:17-07:00",
    "recorded_at": "2014-08-28T03:25:18-07:00",
    "event_type": "ITEM_CREATE",
    "source": {
      "type": "folder",
      "id": "4335998",
      "name": "Data",
      "description": "<Test></Test>",
      "size": 21333,
      "created_at": "2014-08-28T03:25:17-07:00",
      "modified_at": "2014-08-28T03:25:17-07:00",
      "created_by": {
        "type": "user",
        "id": "24566",
        "name": "Mike",
        "login": "mike@example.com"
      },
      "modified_by": {
        "type": "user",
        "id": "24566",
        "name": "Mike",
        "login": "mike@example.com"
      },
      "owned_by": {
        "type": "user",
        "id": "24566",
        "name": "Mike",
        "login": "mike@example.com"
      },
      "parent": {
        "type": "folder",
        "id": "0",
        "sequence_id": null,
        "etag": null,
        "name": "All Files"
      },
      "item_status": "active",
      "synced": false
    }
  }
};

Trigger.execute = execute;
Trigger.validate = validate;
Trigger.activate = activate;

function activate(input, options, output) {
  var next = 0;
  if (options.meta !== undefined &&
    options.meta.next_stream_position !== undefined) {
    next = options.meta.next_stream_position;
  }
  request({
    url: baseUrl + "?stream_position=" + next + "&stream_type=changes",
    headers: {
      Authorization: "Bearer " + input.auth
    }
  }, function(err, res, body) {
    if (err || res.statusCode !== 200) {
      return output("Enter valid Authentication details!!");
    }
    if (body && typeof body == "string") {
      body = JSON.parse(body);
    }
    if (body.next_stream_position) {
      options.setMeta({
        next_stream_position: body.next_stream_position
      });
    }
    output(null, true);
  })
}

function validate(input, options, output) {
  request({
    url: baseUrl + "?stream_position=0&stream_type=changes",
    headers: {
      Authorization: "Bearer " + input.auth
    }
  }, function(err, res, body) {
    if (err || res.statusCode !== 200) {
      return output("Enter valid Authentication details!!");
    }
    if (body && typeof body === "string") {
      body = JSON.parse(body);
    }
    if (body.next_stream_position &&
      (options.meta == undefined || options.meta.next_stream_position == undefined)) {
      options.setMeta({
        next_stream_position: body.next_stream_position
      });
    }
    output(null, true);
  })
}

function execute(input, options, output) {
  run(input, options, function(err, data) {
    if (err || !data) {
      return output(err || "empty");
    }
    customFilters.filter(input.customFilters, data, output);
  });
}

function run(input, options, output) {
  //console.log('next_stream_position',  options.meta.next_stream_position);
  var url = baseUrl + "?stream_position=" + options.meta.next_stream_position + "&stream_type=changes&limit=799";

  var opt = {
    input: input,
    opsn: options,
    url: url
  };
  doRequest(opt, output);
}

function doRequest(options, callback) {
  request({
    url: options.url,
    headers: {
      Authorization: "Bearer " + options.input.auth
    }
  }, function(err, res, body) {
    if (err) {
      return callback(err);
    }
    if (!res || !res.statusCode || res.statusCode !== 200) {
      return callback(body);
    }
    if (typeof(body) === "string") {
      body = JSON.parse(body);
    }
    if (body && body !== null) {
      switch (options.input.event) {
        case "new_file":
          return findNewFile(body, options, callback);
        case "new_folder":
          return findNewFolder(body, options, callback);

      }
    }
    callback(null, []);
  });
}

function findNewFile(body, options, callback) {
  var lastTime = (options.opsn.meta.last_time || 0);
  //console.log('lastTime', lastTime);

  if (!body.entries.length) {
    options.opsn.setMeta({
      next_stream_position: body.next_stream_position,
      last_time: lastTime
    });
    return callback(null, []);
  }

  var filteredData = body.entries.filter(function(entry) {
    if (entry.event_type === "ITEM_UPLOAD" &&
      options.input.dir_name.trim() === entry.source.parent.name &&
      (new Date(entry.created_at)).getTime() > lastTime &&
      entry.source.type === "file") {
      return true;
    }
  });

  filteredData = filteredData.sort(function(a, b) {
    return a < b;
  });

  lastTime = filteredData.length ? (new Date(filteredData[0].created_at)).getTime() : (options.opsn.meta.last_time || 0);

  options.opsn.setMeta({
    next_stream_position: body.next_stream_position,
    last_time: lastTime
  });

  //console.log('files found', JSON.stringify(body.entries, null, 2));
  callback(null, filteredData);
  filteredData = null;
}

function findNewFolder(body, options, callback) {

  var lastTime = (options.opsn.meta.last_time || 0);

  //console.log('lastTime', lastTime);

  if (!body.entries.length) {
    options.opsn.setMeta({
      next_stream_position: body.next_stream_position,
      last_time: lastTime
    });
    return callback(null, []);
  }

  var filteredData = body.entries.filter(function(entry) {
    if (entry.event_type === "ITEM_CREATE" &&
      options.input.dir_name.trim() === entry.source.parent.name &&
      (new Date(entry.created_at)).getTime() > lastTime &&
      entry.source.type === "folder") {
      return true;
    }
  });


  filteredData = filteredData.sort(function(a, b) {
    return a < b;
  });

  lastTime = filteredData.length ? (new Date(filteredData[0].created_at)).getTime() : (options.opsn.meta.last_time || 0);

  options.opsn.setMeta({
    next_stream_position: body.next_stream_position,
    last_time: lastTime
  });

  callback(null, filteredData);
  filteredData = null;
}