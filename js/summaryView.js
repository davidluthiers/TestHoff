
define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/summary.html',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, summary, headerandpanel){



        summaryView = Backbone.View.extend({
   
            render: function(historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');

                compiledTemplate = _.template( summary );
	
                this.collection=historycollection;
	
                var self=this;
                historycollection.get("languages").set("helppanel","");
                result= historycollection.get("languages").toJSON();
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
	
                this.$(".dic_help").hide();
                this.visioncount=0;
                this.feedcount=0;
                console.log(this.collection);
                //console.log(self.collection.reverse());
                if(self.collection.length>0)
                    for(iter=self.collection.length-1;iter>=0;iter--){
                        this.takefeed(self.collection.at(iter));
                    }
                //self.collection.forEach(this.takefeed, this);
                //arreglos por el orden invertido
                if(this.visioncount>0)//hay vision boards
                    this.$("#summarylist").prepend(" <li class='visionboard separadortool' data-role='list-divider' role='heading'>" + historycollection.get("languages").get("dic_vision_header") + "</li>");
                this.$("#listasummarytools").prepend("<li class='recycling separadortool' data-role='list-divider' role='heading'>" + historycollection.get("languages").get("dic_summary_text1") + "</li>");
	
                if(this.visioncount==0) this.$('#summarylist').hide();
                if(this.feedcount==0) this.$('#listasummarytools').hide();
				
				try{ //Seguro contra spinners colgados
					window.plugins.spinnerDialog.hide();
					setTimeout(function(){
						try{
							navigator.splashscreen.hide();
						}
						catch(e){
							console.log(e);
						}
					},2000);
				}
				catch(e){
					console.log(e);
				}

	
            },
	
            takefeed: function(elemento){
				
				
	
                if(elemento.get("tool")=="vision" && this.visioncount<2){ //maxvisions
                    this.visioncount+=1;
                    var index = this.collection.indexOf(elemento);
                    neoindex=index+20;
					if(device.platform=='Android')
						console.log("Android");
					else{
						if(elemento.get("uri").startsWith("file")){
							var filename = elemento.get("uri").replace(/file:\/\/\/.*Application\/.*\//, "");
							filename = cordova.file.tempDirectory + filename;
							elemento.set("uri",filename);
							elemento.save();
						}
					}
					
                    this.$("#summarylist").append("<li class='feed' data-icon='false'><p class='fechasummary'>" +
                        elemento.get("date") + "</p><a href='#visionboard" + neoindex +
                        "' data-transition='none'><img class='imagenesminiaturasummary' src='" + elemento.get("uri") +"' /><h3>"+ elemento.get("title") + " - " + elemento.get("description") +
                        "</h3></a></li>");
                }
	
                if(elemento.get("tool")!="vision" &&  this.feedcount<4 && typeof elemento.get("tool")!='undefined'){ //maxfeed
                    this.feedcount+=1;
                    var index2 = this.collection.indexOf(elemento);
                    neoindex2=index2+20;
                    switch(elemento.get("tool")) //switch toolstring
                    {
                        case 'quad':
                            this.toolstring="quadcheck";
                            this.title=this.collection.get("languages").get("dic_quad_header");
                            this.myclass="quad";
                            break;
				  
                        case 'transference':
                            this.toolstring="transference";
                            this.title=this.collection.get("languages").get("dic_transf_header");
                            this.myclass="transfer";
                            break;
				  
                        case 'vicious':
                            this.toolstring="vicious";
                            this.title=this.collection.get("languages").get("dic_vicious_header");
                            this.myclass="vicious";
                            break;
				  
                        case 'feeling':
                            this.toolstring="feeling";
                            this.title=this.collection.get("languages").get("dic_feeling_header");
                            this.myclass="feeling";
                            break;
				  
                        case 'bashaker':
                            this.toolstring="bashacker";
                            this.title=this.collection.get("languages").get("dic_bash_header");
                            this.myclass="bashacker";
                            break;
				  
                        case 'journal':
                            this.toolstring="journal";
                            this.title=this.collection.get("languages").get("dic_journal_header");
                            this.myclass="history";
                            break;
				  
                        case 'beatyour':
                            this.toolstring="beatyourdark";
                            this.title=this.collection.get("languages").get("dic_beatyour_header");
                            this.myclass="beatyour";
                            break;
					
                        case 'recycling':
                            this.toolstring="recycling";
                            this.title=this.collection.get("languages").get("dic_recycling_header");
                            this.myclass="recycling";
                            break;
		
                        case 'meditation':
                            this.toolstring="meditations";
                            this.title=this.collection.get("languages").get("dic_meditations_header");
                            this.myclass="vicious";
                            break;
                    }
				 
                    this.$("#listasummarytools").append("<li data-theme='c' style='background:none;' data-icon='false'><p class='fechasummarytools'>" + elemento.get("date") + "</p><a href='#" + this.toolstring + neoindex2 + "' data-transition='none' class='" + this.myclass + " toolbutton'>" + this.title + "</a></li>");
                }
	
	
            }

        });

        return summaryView;
    });