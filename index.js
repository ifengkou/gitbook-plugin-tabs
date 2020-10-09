var _ = require('lodash');
var markdown = require('gitbook-markdown');

module.exports = {
    // Extend website resources and html
    website: {
        website: {
            assets: "./assets",
            js: [
                "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js",
                "tabs.js"
            ],
            css: [
                "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css",
                "tabs.css"
            ]
        }
    },

    // Extend templating blocks
    blocks: {
        // Author will be able to write "{% myTag %}World{% endMyTag %}"
        // myTag: {
        //     process: function(blk) {
        //         return "Hello "+blk.body;
        //     }
        // }

        
        // {% tabs first="First Tab", second="Second Tab", third="Third Tab" %}

        // {% content "first" %}
        // Content for first tab ...

        // {% content "second" %}
        // Content for second tab ...

        // {% content "third" %}
        // Content for third tab ...

        // {% endtabs %}

        //```
        // {% tabs %}

        // {% tab title="tab1_title" %}
        // Content for first tab ...
        // {% endtab %}

        // {% tab title="tab2_title" %}
        // Content for second tab ...
        // {% endtab %}

        // {% endtabs %}
        // ```
        tabs: {
            tab: {
                process: function (block) {
                    var book = this.book;
                    // <ul class="nav nav-tabs">
                    //     <li role="presentation" class="active"><a href="#">Home</a></li>
                    //     <li role="presentation"><a href="#">Profile</a></li>
                    //     <li role="presentation"><a href="#">Messages</a></li>
                    // </ul>
                    var tabList = "<ul class='nav nav-tabs' role='tablist'>";
                    var classData = "active";

                    var tabContent="<div class='tab-content'>";
                    var activeState = 'active';

                    var tabIndex = 1 + _.random(1000);
                    _.forEach(block.blocks, function(b){
                        title = "tab-"+tabIndex;
                        var tabId = "tab-"+tabIndex;
                        if(b.kwargs && b.kwargs.title){
                            title = b.kwargs.title
                        }
                        tabList += `<li role="presentation" class="${classData}"><a href="#${tabId}" aria-controls="${tabId}" role="tab" data-toggle="tab">${title}</a></li>`;
                        classData = "";

                        var markup = markdown.page(b.body).content;
                        tabContent += `<div role="tabpanel" class="tab-pane ${activeState}" id="${tabId}">${markup}</div>`;
                        activeState = "";

                        tabIndex++;
                    })
                    tabList += "</ul>";
                    tabContent += "</div>";
                    return tabList + tabContent;
                }
            }
        }
    },

    // Extend templating filters
    filters: {
        // Author will be able to write "{{ 'test'|myFilter }}"
        // myFilter: function(s) {
        //     return "Hello "+s;
        // }
    },

    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function() {
            console.log("gitbook plugin tabs init!");
        },

        // This is called after the book generation
        "finish": function() {
            console.log("gitbook plugin tabs finish!");
        }
    }
};
