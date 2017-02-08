## Flow Activity Utility Tool (FAUT)

#### Setup

1. Install Node js if not present.
2. Enter `npm install` command in terminal inside the current directory.
3. Retrive your Authtoken and place it in the config.js file. 



#### Prerequisite

1. Node modules installed.
2. Valid Authtoken is set in the config.js.



#### Commands List

`npm run validate:onlyschema`  
Use when you have to validate schema's of all triggers or actions.

`npm run validate:full`  
Use when you have to validate a single action or a trigger. This will validate all schema's and also display the actual output values corresponding to its displayTitle.

`npm run triggerinfo`  
Use when you have to get trigger name and event name corresponding to its label.

`npm run actioninfo`  
Use when you have to get action name corresponding to its label.



#### How to test a single action or trigger using `npm run validate:full` command ?
1. In the flow/flowexpress page setup your trigger/action you want to test.
2. Select **http activity** and select method **POST** and also set **Content-Type** as **application/json** in headers field.
3. In your computer run `npm run validate:full` in terminal inside the current directory.
4. You will get an **ngrok https url** copy it.
5. Back in the http activity paste the ngrok url in the url field of the activity.
6. In body send the data as shown below

    ```
    {
        "name":"box",
        "type":"trigger"/"action",
        "event":"new_folder",
        "output":{{$a1}}
    }
    ```

    `name` Trigger/Action name.  
    `type` trigger/action.  
    `event` Event name of the trigger (should be specified for trigger only).  
    `output` The whole output of the trigger/action



#### How to get 'event name' and 'name' of trigger/action?
To get **event name** and **name** of a trigger, run `npm run triggerinfo` command in terminal.  
To get **name** of action, run `npm run actioninfo` command in terminal.

#### Where are my results?
The results of the following commands are stored in different folders which are as follows:-
* `npm run validate:onlyschema` **result** folder
* `npm run validate:full` **singleRunResult** folder
* `npm run triggerinfo` and `npm run actioninfo` **infoResult** folder

#### Note
* The ngrok url changes for every run of `npm run validate:full` command.Thus you have to change it in **http activity** too.
