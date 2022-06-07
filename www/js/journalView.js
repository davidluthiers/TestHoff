

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'jquerymobile'
  
    ], function($, _, Backbone){


        journalView = Backbone.View.extend({
  
            events:{
                "click #shareb":"share",
				"click .deleteEntry":"deleteEntry"
            },
   
            render: function(id, historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');
				
				journal = "<div data-role='content'>        <div class='hojacuaderno' data-controltype='htmlblock'>    <div class='headerhojacuaderno history' data-role='header'>        <h3>         <%= dic_journal_header %>        </h3>       </div> 	  <div data-role='content'>     <a id='addvisionbutton' data-role='button' class='visionboard' href='#journal1' data-icon='plus' data-iconpos='right'>        <%= dic_journal_addnote %>       </a> 	<div data-role='content' class='recyclinglistpadding'> 	  <ul id='summarylist' class='visionlist journallist' data-role='listview' data-divider-theme='b' data-inset='true'>       	</ul> 	</div> 	 </div>    </div>    </div>    <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' data-transition='none' href='#summary'>     <%= dic_back %>    </a>     </div>";
				journaladd = "<div data-role='content'>        <div class='hojacuaderno' data-controltype='htmlblock'>    <div class='headerhojacuaderno history' data-role='header'>        <h3>         <%= dic_journal_header %>        </h3>       </div> 	  <div data-role='content'>    <div data-role='fieldcontain' data-controltype='textarea' class='primerLcuaderno'>      <textarea name='' id='journalInput' ></textarea>    </div> 	 </div>    </div>    </div>    <div id='transferbar1' data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#journal0' data-icon='arrow-l'>    <%= dic_prev %>    </a>    <a id='commitbutton' class='botonnext finishtool' data-role='button' data-transition='none' rel='external' href='#journal2' data-icon='check' data-iconpos='right'>    <%= dic_commit %>    </a>     </div>";
				journalshow = "<div data-role='content'>        <div class='hojacuaderno' data-controltype='htmlblock'>    <div class='headerhojacuaderno history' data-role='header'>        <h3>         <%= dic_journal_header %>        </h3>       </div> 	  <div data-role='content'>       <label id='journaltext'>      </label> 	<a id='shareb' class='colorverde' data-role='button' data-transition='none'> 		 <img src='img/shareandroid.png' width='40' height='40'> <br/>       <%= dic_share %>        </a>  	 </div>    </div>    </div>    <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' data-transition='none' href='#journal0'>     <%= dic_back %>    </a>     </div>";
				headerandpanel = "<div id='menuheader' data-theme='a' class='menuheader' data-role='header' data-position='fixed' data-tap-toggle='false'>     <a id='menubutton' class='panelbutton dic_menu' data-controltype='panelbutton' data-role='button' href='#panelhoffman' data-icon='menuicon'> 	 <%= dic_menu %>     </a>     <div style=' text-align:center' data-controltype='image'>      <img class='logohoffman' src='img/logo_hoffman.png' />     </div>     <a class='panelbutton dic_help' data-controltype='panelbutton' data-role='button' data-theme='a' href='#panelayuda' data-icon='helpicon' data-iconpos='right'>      <%= dic_help %>     </a>    </div>    <div data-role='panel' id='panelhoffman' data-position='left' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='hoffmanseparator midgray'>                <div class='pruebaheight' style=' text-align:center' data-controltype='image'> 				 <img id='panelhoffmanlogo' class='logohoffman' src='img/logo_hoffman.png' /> 				</div>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#summary' class='summary toolbutton firstbutton'> 					<%= dic_summary_header %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray primermyaccountandsettingsseparator toolbutton'> 					<%= dic_panel_tools %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#quadSelection' class='quad toolbutton'> 					<%= dic_quad_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#feeling0' class='feeling toolbutton'>                     <%= dic_feeling_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#bashDisc' class='bashacker toolbutton'>                     <%= dic_bash_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro' style='display:none'>                 <a href='#pattern0' class='patternr toolbutton'>                     <%= dic_pattern_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#beatyourdark0' class='beatyour toolbutton'>                     <%= dic_beatyour_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#vicious0' class='vicious toolbutton'>                     <%= dic_vicious_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#transSelection' class='transfer toolbutton'>                     <%= dic_transf_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#visionboard0' class='visionboard toolbutton'>                     <%= dic_vision_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='journal' href='#journal0' class='history toolbutton'>                 <%= dic_journal_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton multi'>                 <%= dic_panel_multimedia  %>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#recycling0' class='recycling toolbutton'>                 <%= dic_recycling_header  %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#meditations0' class='meditations toolbutton'>                  <%= dic_meditations_header  %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#profile0' class='configuration toolbutton'>                 <%= dic_hoffman_connect %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton acc'>                 <%= dic_panel_account  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#historyload' class='history toolbutton'>                 <%= dic_history_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton sett'>                 <%= dic_panel_settings  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a id='support' href='#support' class='support toolbutton'>                 <%= dic_support_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='share_link' href='#share_link' class='transfer toolbutton'>                 <%= dic_share_link %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#configuration' class='configuration toolbutton'>                 <%= dic_config_header %>                 </a>             </li>         </ul>     </div> 	<div data-role='panel' id='panelayuda' data-position='right' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray helpheader'>                 <%= dic_rightpanel_header  %>             </li> 			<div class='helpblock' data-role='content' data-controltype='textblock' style='color:white'> 			<%= helppanel %> 			</div>         </ul>     </div>";

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