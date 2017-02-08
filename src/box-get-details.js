// var request = require("request");

module.exports = function(){
    this.id = "box-file-details";
    this.label = "File Details";

    this.input = {
        "title": "File Details",
        "type": "object",
        "properties": {
            "token":{
                "title":"Box Access Token",
                "type":"string",
                "oauth" : "box",
                "minLength" : 1,
                "format":"token"
            },
            "file_id":{
                "title":"File ID",
                "type" :"string",
                "minLength":1,
                "description":"Enter file ID"
            }
        }
    };
    this.help = "Service to get file details"

    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "type":{
                "title":"type",
                "type" :"string"
            },
            "id":{
                "title":"id",
                "type" :"string"
            },
            "file_version":{
                "title":"file_version",
                "type" :"object"
            },
            "name":{
                "title":"name",
                "type" :"string"
            },
            "size":{
                "title":"size",
                "type" :"integer"
            },
            "path_collection":{
                "title":"path_collection",
                "type" :"object"
            },
            "created_at":{
                "title":"created_at",
                "type" :"string"
            },
            "modified_at":{
                "title":"modified_at",
                "type" :"string"
            },
            "content_created_at":{
                "title":"content_created_at",
                "type" :"string"
            },
            "content_modified_at":{
                "title":"content_modified_at",
                "type" :"string"
            },
            "created_by":{
                "title":"created_by",
                "type" :"object",
                "properties":{
                    "type":{
                        "title":"type",
                        "type" :"string"
                    },
                    "id":{
                        "title":"id",
                        "type" :"string"
                    },
                    "name":{
                        "title":"name",
                        "type" :"string"
                    },
                    "login":{
                        "title":"login",
                        "type" :"string"
                    }
                }
            },
            "modified_by":{
                "title":"modified_by",
                "type" :"object",
                "properties":{
                    "type":{
                        "title":"type",
                        "type" :"string"
                    },
                    "id":{
                        "title":"id",
                        "type" :"string"
                    },
                    "name":{
                        "title":"name",
                        "type" :"string"
                    },
                    "login":{
                        "title":"login",
                        "type" :"string"
                    }
                }
            },
            "owned_by":{
                "title":"owned_by",
                "type" :"object",
                "properties":{
                    "type":{
                        "title":"type",
                        "type" :"string"
                    },
                    "id":{
                        "title":"id",
                        "type" :"string"
                    },
                    "name":{
                        "title":"name",
                        "type" :"string"
                    },
                    "login":{
                        "title":"login",
                        "type" :"string"
                    }
                }
            },
            "shared_link":{
                "title":"shared_link",
                "type" :"any"
            },
            "parent":{
                "title":"parent",
                "type" :"object",
                "properties":{
                    "type":{
                        "title":"type",
                        "type" :"string"
                    },
                    "id":{
                        "title":"id",
                        "type" :"string"
                    },
                    "sequence_id":{
                        "title":"id",
                        "type" :"any"
                    },
                    "etag":{
                        "title":"etag",
                        "type" :"any"
                    },
                    "name":{
                        "title":"name",
                        "type" :"string"
                    }
                }
            }
        }
    };
    this.execute = function(input,output){
        input.file_id = String(input.file_id).trim();
        var expId = input.file_id.substring(0,2);
        if(expId =="f_"){
            input.file_id = input.file_id.substring(2, input.file_id.length);
        }

        request({
            headers:{
                "Authorization": "Bearer "+input.token,
                "Accept":"application/json"
            },
            url:"https://api.box.com/2.0/files/"+input.file_id
        },function(err,response,body){
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode==405){
                    return output("The file ID entered is not valid");
                }
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    return output(null,body);
                }
                return output(body);
            }
        })
    };
}

