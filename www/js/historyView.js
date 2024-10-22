define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'historyElementView',
    'jquerymobile'
  
    ], function($, _, Backbone, historyElementView){


        historyView = Backbone.View.extend({
   
		events:{
                "click .deleteEntry":"deleteEntry",
            },
			
            render: function(){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');
				
				historyt = "<div data-role='content'>    <div class='hojacuaderno' data-controltype='htmlblock'>    <div class='headerhojacuaderno history' data-role='header'>        <h3>         <%= dic_history_header %>        </h3>       </div>     <div data-role='content'>      	 <ul data-role='listview' class='historylist' id='listasummarytools' data-divider-theme='h' data-icon='none' data-inset='true'> 			 			</ul> 	     </div>    </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' data-transition='none' href='#summary'>     <%= dic_back %>    </a>     </div>";
				headerandpanel = "<div id='menuheader' data-theme='a' class='menuheader' data-role='header' data-position='fixed' data-tap-toggle='false'>     <a id='menubutton' class='panelbutton dic_menu' data-controltype='panelbutton' data-role='button' href='#panelhoffman' data-icon='menuicon'> 	 <%= dic_menu %>     </a>     <div style=' text-align:center' data-controltype='image'>      <img class='logohoffman' src='img/logo_hoffman.png' />     </div>     <a class='panelbutton dic_help' data-controltype='panelbutton' data-role='button' data-theme='a' href='#panelayuda' data-icon='helpicon' data-iconpos='right'>      <%= dic_help %>     </a>    </div>    <div data-role='panel' id='panelhoffman' data-position='left' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='hoffmanseparator midgray'>                <div class='pruebaheight' style=' text-align:center' data-controltype='image'> 				 <img id='panelhoffmanlogo' class='logohoffman' src='img/logo_hoffman.png' /> 				</div>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#summary' class='summary toolbutton firstbutton'> 					<%= dic_summary_header %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray primermyaccountandsettingsseparator toolbutton'> 					<%= dic_panel_tools %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#quadSelection' class='quad toolbutton'> 					<%= dic_quad_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#feeling0' class='feeling toolbutton'>                     <%= dic_feeling_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#bashDisc' class='bashacker toolbutton'>                     <%= dic_bash_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro' style='display:none'>                 <a href='#pattern0' class='patternr toolbutton'>                     <%= dic_pattern_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#beatyourdark0' class='beatyour toolbutton'>                     <%= dic_beatyour_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#vicious0' class='vicious toolbutton'>                     <%= dic_vicious_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#transSelection' class='transfer toolbutton'>                     <%= dic_transf_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#visionboard0' class='visionboard toolbutton'>                     <%= dic_vision_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='journal' href='#journal0' class='history toolbutton'>                 <%= dic_journal_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton multi'>                 <%= dic_panel_multimedia  %>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#recycling0' class='recycling toolbutton'>                 <%= dic_recycling_header  %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#meditations0' class='meditations toolbutton'>                  <%= dic_meditations_header  %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#profile0' class='configuration toolbutton'>                 <%= dic_hoffman_connect %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton acc'>                 <%= dic_panel_account  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#historyload' class='history toolbutton'>                 <%= dic_history_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton sett'>                 <%= dic_panel_settings  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a id='support' href='#support' class='support toolbutton'>                 <%= dic_support_header %>                 </a>             </li> 			             <li data-theme='c' class='grisclaro'>                 <a href='#configuration' class='configuration toolbutton'>                 <%= dic_config_header %>                 </a>             </li>         </ul>     </div> 	<div data-role='panel' id='panelayuda' data-position='right' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray helpheader'>                 <%= dic_rightpanel_header  %>             </li> 			<div class='helpblock' data-role='content' data-controltype='textblock' style='color:white'> 			<%= helppanel %> 			</div>         </ul>     </div>";

                compiledTemplate = _.template( historyt );
		
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