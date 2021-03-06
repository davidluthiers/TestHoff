define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/history.html',
    'historyElementView',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, history, historyElementView, headerandpanel){



        historyView = Backbone.View.extend({
   
		events:{
                "click .deleteEntry":"deleteEntry",
            },
			
            render: function(){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');


                compiledTemplate = _.template( history );
		
                this.collection.get("languages").set("helppanel",this.collection.get("languages").get("dic_history_helppanel"));
                result= this.collection.get("languages").toJSON();
	
                compiledheaderandpanel=_.template( headerandpanel );
	
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));

                this.$(".dic_help").hide();
						
						
                this.collection.forEach(this.addHistoryElement, this);
	
	
	
            },
	
            addHistoryElement: function(elemento){
	
                self=this;
                var index = this.collection.indexOf(elemento);
                var historyElementview = new historyElementView({
                    model: elemento
                });
                console.log("Renderizando: ");
                console.log(self.collection.at(index));
                if(typeof self.collection.at(index).get("tool")==='undefined' || self.collection.at(index).get("finished")==false){
		
                }

                else {
                    historyElementview.render(index, self.collection);
					if(typeof this.index != "undefined"){
						$("#listasummarytools").prepend(historyElementview.$el);
						console.log("typeof this.index != 'undefined'");
					}
					else
						this.$("#listasummarytools").prepend(historyElementview.$el);
                }
	
            },
			
			deleteEntry: function(ev){
				
				
				self = this;
				
                var index = $(ev.target).parent().attr("colIndex");
				console.log($(ev.target)[0]);
				console.log($(ev.target).parent());
				console.log($(ev.target).parent().parent());
                console.log(index);
				
				this.index = index;
				this.eve = $(ev.target).parent().parent();
				
				try{
                        navigator.notification.confirm(self.collection.get("languages").get("dic_sure_delete_record"), function(indexans){
                            self.onDelEntryConfirm(indexans);
                        }, " ", [self.collection.get("languages").get("dic_transf_p9_text2"),self.collection.get("languages").get("dic_transf_p9_text3")]);
				}
				catch(e){
					self.onDelEntryConfirm(2);
					console.log("L 702" + e);
				}
				
				//this.collection.remove(self.collection.at(index));
				
				
            //$("#listfeeders").listview("refresh");
	 
            },
			
			onDelEntryConfirm:function (indexans){
				self=this;
                if(indexans==1){//Yes
                    self.collection.at(self.index).destroy();
					$(".historylist li").remove();
					self.collection.forEach(self.addHistoryElement, this);
					$(".historylist").listview("refresh");
                }
            }
	


        });

        return historyView;
    });