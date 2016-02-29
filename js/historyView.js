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
                    this.$("#listasummarytools").prepend(historyElementview.$el);
                }
	
            }
	


        });

        return historyView;
    });