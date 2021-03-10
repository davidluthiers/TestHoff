

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/journal.html',
    'text!../Templates/journaladd.html',
    'text!../Templates/journalshow.html',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, journal, journaladd, journalshow, headerandpanel){



        journalView = Backbone.View.extend({
  
            events:{
                "click #shareb":"share",
				"click .deleteEntry":"deleteEntry"
            },
   
            render: function(id, historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                this.history=historycollection;
	
                if(id=='0'){
                    compiledTemplate = _.template( journal );
			 
			
                }
		
                if(id=='1'){ //new journal
		
                    compiledTemplate = _.template( journaladd );
		
                }
                if(id=='2'){ //save journal
                    compiledTemplate = _.template( journal );
                    this.model.set("tool", "journal");
                    this.model.set("description",$('#journalInput').val());
                    historycollection.create(this.model);
		
                }
		
		
                if(id>19){
		
                    compiledTemplate = _.template( journalshow );
                }

                var self=this;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_journal_helppanel"));
                result= historycollection.get("languages").toJSON();
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));

	
                if(id=='0' || id=='2'){
	
                    historycollection.forEach(this.getjournals, this);
	
                }
	
                if(id>19){
		
                    index=id-20;
                    this.model=this.history.at(index);
                    this.$('#journaltext').text(this.model.get("description"));
		
                }
	
	
            },
	
            share: function(){
                try{
                    window.plugins.socialsharing.share(this.model.get("description"));
                }
                catch(e){
                    alert(e);
                }
            },
	
            getjournals: function(elemento){
	
                if(elemento.get("tool")=="journal"){
                    var index = this.history.indexOf(elemento);
                    neoindex=index+20;
                    this.$("#summarylist").append("<li class='feed' data-icon='false'><p class='fechasummary'>" + elemento.get("date") + "</p><a href='#journal" + neoindex +"' data-transition='none'><h3>"+ elemento.get("description") +"</h3></a><a data-icon='delete' class='deleteEntry elementosfinos' colIndex='"+index+"' data-rel='dialog'' data-transition='none'>Delete</a></li>");
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
                        navigator.notification.confirm(self.history.get("languages").get("dic_sure_delete_record"), function(indexans){
                            self.onDelEntryConfirm(indexans);
                        }, " ", [self.history.get("languages").get("dic_transf_p9_text2"),self.history.get("languages").get("dic_transf_p9_text3")]);
				}
				catch(e){
					self.onDelEntryConfirm(2);
					console.log("L 702" + e);
				}
			},
			
			onDelEntryConfirm:function (indexans){
				self=this;
                if(indexans==1){//Yes
                    self.history.at(self.index).destroy();
					$("#summarylist li").remove();
					self.history.forEach(this.getjournals, this);
					$("#summarylist").listview("refresh");
                }
            }
	


        });

        return journalView;
    });