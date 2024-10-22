
define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'jquerymobile'
  
    ], function($, _, Backbone){

		
        summaryView = Backbone.View.extend({
   
            render: function(historycollection){
				try{
					this.$el.attr('data-role', 'page');
					this.$el.attr('data-theme', 'a');
					this.$el.attr('class', 'page');
					
					summary = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno summaryheader' data-role='header'>        <h2>         <%= dic_summary_header %>        </h2>       </div>    <div data-role='content'>       <div class='quotes sombrafrase' data-role='content'>    <p class='frasediaria'> <%= quote %></p>    <p class='frasediariaAuthor'> <%= quoteAuthor %></p>    </div>       <a id='suggestionbutton' class='summary toolbutton' data-role='button' data-controltype='panelbutton' href='#panelhoffman' data-transition='none' data-inset='false'>          <%= dic_summary_text2 %>     </a>    <ul id='summarylist' style='-webkit-box-shadow: none;' data-role='listview' data-divider-theme='b' data-inset='true' data-icon='none'>      	</ul> 	<ul id='listasummarytools' style='-webkit-box-shadow: none;' data-role='listview' data-divider-theme='b' data-icon='none' data-inset='true'> 						 	</ul>    </div>   </div> </div> ";
					headerandpanel = "<div id='menuheader' data-theme='a' class='menuheader' data-role='header' data-position='fixed' data-tap-toggle='false'>     <a id='menubutton' class='panelbutton dic_menu' data-controltype='panelbutton' data-role='button' href='#panelhoffman' data-icon='menuicon'> 	 <%= dic_menu %>     </a>     <div style=' text-align:center' data-controltype='image'>      <img class='logohoffman' src='img/logo_hoffman.png' />     </div>     <a class='panelbutton dic_help' data-controltype='panelbutton' data-role='button' data-theme='a' href='#panelayuda' data-icon='helpicon' data-iconpos='right'>      <%= dic_help %>     </a>    </div>    <div data-role='panel' id='panelhoffman' data-position='left' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='hoffmanseparator midgray'>                <div class='pruebaheight' style=' text-align:center' data-controltype='image'> 				 <img id='panelhoffmanlogo' class='logohoffman' src='img/logo_hoffman.png' /> 				</div>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#summary' class='summary toolbutton firstbutton'> 					<%= dic_summary_header %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray primermyaccountandsettingsseparator toolbutton'> 					<%= dic_panel_tools %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#quadSelection' class='quad toolbutton'> 					<%= dic_quad_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#feeling0' class='feeling toolbutton'>                     <%= dic_feeling_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#bashDisc' class='bashacker toolbutton'>                     <%= dic_bash_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro' style='display:none'>                 <a href='#pattern0' class='patternr toolbutton'>                     <%= dic_pattern_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#beatyourdark0' class='beatyour toolbutton'>                     <%= dic_beatyour_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#vicious0' class='vicious toolbutton'>                     <%= dic_vicious_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#transSelection' class='transfer toolbutton'>                     <%= dic_transf_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#visionboard0' class='visionboard toolbutton'>                     <%= dic_vision_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='journal' href='#journal0' class='history toolbutton'>                 <%= dic_journal_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton multi'>                 <%= dic_panel_multimedia  %>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#recycling0' class='recycling toolbutton'>                 <%= dic_recycling_header  %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#meditations0' class='meditations toolbutton'>                  <%= dic_meditations_header  %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#profile0' class='configuration toolbutton'>                 <%= dic_hoffman_connect %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton acc'>                 <%= dic_panel_account  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#historyload' class='history toolbutton'>                 <%= dic_history_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton sett'>                 <%= dic_panel_settings  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a id='support' href='#support' class='support toolbutton'>                 <%= dic_support_header %>                 </a>             </li> 			             <li data-theme='c' class='grisclaro'>                 <a href='#configuration' class='configuration toolbutton'>                 <%= dic_config_header %>                 </a>             </li>         </ul>     </div> 	<div data-role='panel' id='panelayuda' data-position='right' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray helpheader'>                 <%= dic_rightpanel_header  %>             </li> 			<div class='helpblock' data-role='content' data-controltype='textblock' style='color:white'> 			<%= helppanel %> 			</div>         </ul>     </div>";


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
					console.log("colección");
					console.log(this.collection);
					console.log(this.$el);
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
				}
				catch(e){
						console.log("Error en summary.render:");
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

					try{
						console.log('Date feed:');
						console.log(elemento.get("date"));
					}
					catch(e){console.log('Fecha date error: ')+e}
					
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