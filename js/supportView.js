

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/support.html',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, support, headerandpanel){



        supportView = Backbone.View.extend({
   
            events:{
                "click .supportlink":"supportlink"
            },
	
            render: function(historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');


                compiledTemplate = _.template( support );
	
                var self=this;
                historycollection.get("languages").set("helppanel","");
                result= historycollection.get("languages").toJSON();
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
			
                this.$(".dic_help").hide();
	
                // Get Hoffman centers addresses
                var params_centers = {
                    type: 'GET',
                    dataType: 'jsonp',
                    url: "http://app.hoffman-international.com/hoffapp/" + "institutes.jsonp",
                    processData: true,
                    success: function(data) {
                        console.log("centers: ", data);
                        for(i=0; i<data.length; i++){
                            self.$("#instituteslist").append("<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='a' class='ui-btn ui-btn-up-a ui-btn-icon-right ui-li ui-li-has-arrow ui-last-child'><div class='ui-btn-inner ui-li ui-li-has-alt'><div class='ui-btn-text'><a urldata='" + data[i].url + "' alt='" + historycollection.get('languages').get('dic_support_text1') + "' target='_blank' class='ui-link-inherit supportlink'>" + data[i].node_title + "</a></div></div></li>");
                        }
						try{
                                window.plugins.spinnerDialog.hide();
                            }
						catch(e){
							console.log(e);
						}
                    },
                    error: function(code) {
                        console.log("petada", code);
                    }
                };
                //console.log("params ", params);
                var downloaded_centers = $.ajax(params_centers);
            //console.log("a: ", a);
	
	
	
            },
	
            supportlink: function(e){
	
                var ref = window.open($(e.target).attr("urldata"), '_system',"location=yes");
	
            }
	


        });

        return supportView;
    });