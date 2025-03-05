

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'jquerymobile'
  
    ], function($, _, Backbone){


        transferenceView = Backbone.View.extend({
  
            events:{
                "click .addsusnegas":"addnegas",
                "click .deletenega":"deletenega",
                "click .addmisreac":"addreactions",
                "click .deletereaction":"deletereaction",
                //"mousedown .markperceptionorigen":"perceptionorigen",
                "touchstart .markperceptionorigen":"perceptionorigen",
                //"mousedown .markreactionorigen":"reactionorigen",
                "touchstart .markreactionorigen":"reactionorigen",
                "click .eleccionfinal":"eleccionfinal",
                "click .ui-input-text":"footerfix",
                "click .addsuscual":"addQuality",
                "click .deletequal":"deleteQuality",
                "click #textareadesctransfer":"footerfix"
            },
	 
            render: function(id, historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page');
				
				transference0 = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div>    <div data-role='content'>     <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>      <label for='textinput6'>       <%= dic_transf_p0_text1 %>      </label>      <input name='' id='textinput6' placeholder='<%= dic_transf_p0_placeholder1 %>' value='<%= transferencewith %>' type='text' /> 	 </div>     <div data-controltype='htmlblock'> 	<div data-role='fieldcontain' class='noborder' data-controltype='textinput'> 	<label for='textareadesctransfer'>       <%= dic_transf_p0_text2 %>      </label>      <div id='nooverflow'> 		<textarea rows='10' name='' id='textareadesctransfer' placeholder='<%= dic_transf_p0_placeholder2 %>'><%= situations %></textarea> 	 </div> 	 </div>     </div>    </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#summary' data-icon='arrow-l'>     <%= dic_back %>    </a>    <a class='botonnext' data-role='button' data-transition='none' href='#transference1' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>";
				transference1 = "<div data-role='content'>  <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div>    <div data-role='content'>     <div data-controltype='textblock'>      <p class='primerPcuaderno'>        <span>        <%= dic_transf_p1_text1 %>        </span>        <br />      </p>     </div>     <div data-controltype='htmlblock'>      <ul id='listsusnegas' data-role='listview' data-split-icon='delete' data-split-theme='d' data-inset='true'>      </ul>     </div>     <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>      <input name='' id='actualsusnegas' placeholder=' <%= dic_transf_p1_placeholder1 %> ' value='' type='text' /></div>     <a id='addsusnegas' class='addsusnegas colorverde' data-role='button' data-transition='none' data-icon='plus' data-iconpos='right'>      <%= dic_transf_p1_text2 %>     </a>    </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='addsusnegas botonprev' data-role='button' data-transition='none' href='#transference0' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='addsusnegas botonnext' data-role='button' data-transition='none' href='#transference2' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>";
				transference2 = "<div data-role='content'>   <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div>    <div data-role='content'>     <div data-controltype='textblock'>      <p class='primerPcuaderno'>        <span>          <%= dic_transf_p2_text1 %>        </span>        <br />      </p>     </div>     <div data-controltype='htmlblock'>      <ul id='listmisreac' data-role='listview' data-split-icon='delete' data-split-theme='d' data-inset='true'>      </ul>     </div>     <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>      <input name='' id='actualmisreac' placeholder='<%= dic_transf_p2_placeholder1 %>' value='' type='text' /></div>     <a id='addmisreac' class='addmisreac colorverde' data-role='button' data-transition='none' data-icon='plus' data-iconpos='right'>      <%= dic_transf_p2_text2 %>     </a>    </div>    </div> </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='addmisreac botonprev' data-role='button' data-transition='none' href='#transference1' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='addmisreac botonnext' data-role='button' data-transition='none' href='#transference3' data-icon='arrow-r' data-iconpos='right'>    <%= dic_next %>    </a>     </div>";
				transference3 = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div> 	<div data-role='content'>         <div data-controltype='textblock'>      <p class='primerPcuaderno'>        <span>         <%= dic_transf_p3_text1 %>        </span>        <br />      </p>     </div>       <ul id='listadjorig' data-role='listview' data-split-icon='none' data-inset='true'>      </ul>       </div>     </div>    </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#transference2' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='botonnext' data-role='button' data-transition='none' href='#transference4' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>";
				transference4 = " <div data-role='content'>  <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div> <div data-role='content'>     <div data-controltype='textblock'>      <p class='primerPcuaderno'>        <span>         <%= dic_transf_p4_text1 %>        </span>        <br />      </p>     </div>     <div data-controltype='htmlblock'>      <ul id='listreacorig' data-role='listview' data-split-icon='none' data-inset='true'>      </ul>     </div>    </div>    </div> </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#transference3' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='botonnext' data-role='button' data-transition='none' href='#<%= transVersion %>' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>";
				transference5 = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div> <div data-role='content'>     <div data-controltype='textblock'>      <p class='primerPcuaderno'>       <%= dic_transf_p5_text1 %>      </p>     </div>     <div data-role='fieldcontain' data-controltype='textarea'>      <textarea name='' id='textareaotrasareas' placeholder='<%= dic_transf_p5_placeholder1 %>'><%= otherAreas %></textarea>     </div>    </div>    </div> </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#transference4' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='botonnext' data-role='button' data-transition='none' href='#transference6' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>";
				transference6 = " <div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div>  <div data-role='content'>     <div data-controltype='textblock'>      <p class='primerPcuaderno'>       <%= dic_transf_p6_text1 %>      </p>     </div>     <div data-role='fieldcontain' class='noborder' data-controltype='textarea'>      <textarea name='' id='textareadarkside'><%= darkSideWin %></textarea>     </div>     <div data-controltype='textblock'>      <p class='primerPcuaderno'>       <%= dic_transf_p6_text2 %>      <br/>       <%= dic_transf_p6_text3 %>      </p>     </div>    </div>     </div> </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#transference5' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='botonnext' data-role='button' data-transition='none' href='#transference7' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>";
				transference7 = " <div data-role='content'>  <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div>   <div data-role='content'>     <div data-controltype='textblock'>      <p class='primerPcuaderno'>       <%= dic_transf_p7_text1 %>      </p>     </div>     <div data-controltype='htmlblock'>      <ul id='listsusnegas' data-role='listview' data-divider-theme='b' data-inset='true'>      </ul>     </div>    </div>    </div> </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#transference6' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='botonnext' data-role='button' data-transition='none' href='#transference8' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>";
				transference8 = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div> <div data-role='content'>     <div data-controltype='textblock'>      <p class='primerPcuaderno'>       <%= dic_transf_p8_text1 %>      </p>     </div>      <ul id='listsuscual' data-role='listview' data-split-icon='delete' data-split-theme='d' data-inset='true'>      </ul>     <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>      <input name='' id='actualsuscual' placeholder='<%= dic_transf_p8_placeholder1 %>' value='' type='text' /></div>     <a id='addsuscual' class='addsuscual colorverde' data-role='button' data-transition='none' data-icon='plus' data-iconpos='right'>      <%= dic_transf_p8_text2 %>     </a>    </div>    </div>    </div>    <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='addsuscual botonprev' data-role='button' data-transition='none' href='#transference7' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='addsuscual botonnext' data-role='button' data-transition='none' href='#transference9' data-icon='arrow-r' data-iconpos='right'>     <%= dic_next %>    </a>     </div>";
				transference9 = "<div data-role='content'>   <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div>    <div data-role='content'>     <div style=' text-align:center' data-controltype='image'>      <img style='width: 80%;height: 55%;position: relative;top: -14px;' src='img/06.png' />     </div>     <div data-controltype='textblock'>      <p style='margin-top: -65px;margin-bottom: 5px; font-size: 33px;'> 	 <%= dic_transf_p9_text1 %>      </p>     </div>       <!--<div id='radioBtnDiv' class='eleccionfinal' data-role='fieldcontain' data-controltype='radiobuttons'>       <fieldset id='lolo' class='eleccionfinal' data-role='controlgroup' data-type='vertical'>        <input id='radio8' class='eleccionfinal' name='myButtonho' value='1' type='radio' />        <label for='radio8' id='mierdon'>         I am free of transference        </label>        <input id='radio9' class='eleccionfinal' name='myButtonho' value='2' type='radio' />        <label for='radio9'>         I am still in transference        </label>       </fieldset>      </div>--> 	 <div id='slidercontainer' class='miscontroles' data-role='fieldcontain' data-controltype='toggleswitch'>         <select name='freeswitch' id='freeswitch' data-theme='' data-role='slider' data-mini='false'>          <option value='yes'>           <%= dic_transf_p9_text2 %>          </option>          <option value='no'>           <%= dic_transf_p9_text3 %>          </option>         </select>        </div>         </div> 	</div>   </div> 	<div id='transferbar1' data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#<%= transVersion2 %>' data-icon='arrow-l'>     <%= dic_prev %>    </a>    <a class='botonnext finishtool' data-role='button' data-transition='none' rel='external' href='#transference10' data-icon='check' data-iconpos='right'>    <%= dic_transf_p9_text4 %>    </a>     </div>   <div id='transferbar2' style='display: none;' data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>     <a class='botonprev' data-role='button' data-transition='none' href='#<%= transVersion2 %>' data-icon='arrow-l'>       <%= dic_prev %>    </a>    <a class='botonnext' data-role='button' data-transition='none' href='#transference0' data-icon='refresh' data-iconpos='right'>    <%= dic_transf_p9_text5 %>    </a>     </div>";
				transferencehistory = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div>    <div data-role='content'>     <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>      <div id='reactionto'>       <%= dic_trans_reactionto %>      </div>    </div>     <div data-controltype='htmlblock'>   <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>   <div id='situations'>     <%= dic_transf_situations %>      </div>    </div>     </div>     <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>   <div id='myexperience'>     <%= dic_transf_p3_text1 %>      </div>    </div>    <ul id='listadjorig' data-role='listview' data-split-icon='none' data-inset='true'>      </ul>      <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>   <div id='myexperience'>     <%= dic_transf_p4_text1 %>      </div>    </div>	 <ul id='listreacorig' data-role='listview' data-split-icon='none' data-inset='true'>      </ul> 	</div>    </div>   </div>   <div id='transresumeFooter' data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' data-transition='none' href='#historyload' data-icon='arrow-l'>     <%= dic_back %>    </a>     </div>";
				transferencehistorylong = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno transfer' data-role='header'>        <h2>         <%= dic_transf_header %>        </h2>       </div>    <div data-role='content'>     <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>      <div id='reactionto'>       <%= dic_trans_reactionto %>      </div> 	 </div>     <div data-controltype='htmlblock'> 	<div data-role='fieldcontain' class='noborder' data-controltype='textinput'> 	<div id='situations'> 	  <%= dic_transf_situations %>      </div> 	 </div>     </div> 	   <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>   <div id='myexperience'>     <%= dic_transf_p3_text1 %>      </div>    </div>  	<ul id='listadjorig' data-role='listview' data-split-icon='none' data-inset='true'>      </ul> 	   <div data-role='fieldcontain' class='noborder' data-controltype='textinput'>   <div id='myexperience'>     <%= dic_transf_p4_text1 %>      </div>    </div> <ul id='listreacorig' data-role='listview' data-split-icon='none' data-icon='false' data-inset='true'>      </ul>    <div id='historyotherareas'>      <%= dic_transf_p5_text1 %> </div>  	 <div class='datoshistorytransference'><%= otherAreas %></div>     <div id='historydarksidewin'> <%= dic_transf_p6_text1 %></div> 	 <div class='datoshistorytransference'><%= darkSideWin %></div>     <div id='historysuscual'><%= dic_transf_p8_text1 %></div> 	 <ul id='listsuscual' data-role='listview' data-split-icon='delete' data-split-theme='d' data-inset='true'>      </ul>  	</div>    </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' data-transition='none' href='#historyload'>     <%= dic_back %>    </a>     </div>";
				summary = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno summaryheader' data-role='header'>        <h2>         <%= dic_summary_header %>        </h2>       </div>    <div data-role='content'>       <div class='quotes sombrafrase' data-role='content'>    <p class='frasediaria'> <%= quote %></p>    <p class='frasediariaAuthor'> <%= quoteAuthor %></p>    </div>       <a id='suggestionbutton' class='summary toolbutton' data-role='button' data-controltype='panelbutton' href='#panelhoffman' data-transition='none' data-inset='false'>          <%= dic_summary_text2 %>     </a>    <ul id='summarylist' style='-webkit-box-shadow: none;' data-role='listview' data-divider-theme='b' data-inset='true' data-icon='none'>      	</ul> 	<ul id='listasummarytools' style='-webkit-box-shadow: none;' data-role='listview' data-divider-theme='b' data-icon='none' data-inset='true'> 						 	</ul>    </div>   </div> </div> ";
				headerandpanel = "<div id='menuheader' data-theme='a' class='menuheader' data-role='header' data-position='fixed' data-tap-toggle='false'>     <a id='menubutton' class='panelbutton dic_menu' data-controltype='panelbutton' data-role='button' href='#panelhoffman' data-icon='menuicon'> 	 <%= dic_menu %>     </a>     <div style=' text-align:center' data-controltype='image'>      <img class='logohoffman' src='img/logo_hoffman.png' />     </div>     <a class='panelbutton dic_help' data-controltype='panelbutton' data-role='button' data-theme='a' href='#panelayuda' data-icon='helpicon' data-iconpos='right'>      <%= dic_help %>     </a>    </div>    <div data-role='panel' id='panelhoffman' data-position='left' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='hoffmanseparator midgray'>                <div class='pruebaheight' style=' text-align:center' data-controltype='image'> 				 <img id='panelhoffmanlogo' class='logohoffman' src='img/logo_hoffman.png' /> 				</div>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#summary' class='summary toolbutton firstbutton'> 					<%= dic_summary_header %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray primermyaccountandsettingsseparator toolbutton'> 					<%= dic_panel_tools %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#quadSelection' class='quad toolbutton'> 					<%= dic_quad_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#feeling0' class='feeling toolbutton'>                     <%= dic_feeling_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#bashDisc' class='bashacker toolbutton'>                     <%= dic_bash_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro' style='display:none'>                 <a href='#pattern0' class='patternr toolbutton'>                     <%= dic_pattern_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#beatyourdark0' class='beatyour toolbutton'>                     <%= dic_beatyour_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#vicious0' class='vicious toolbutton'>                     <%= dic_vicious_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#transSelection' class='transfer toolbutton'>                     <%= dic_transf_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#visionboard0' class='visionboard toolbutton'>                     <%= dic_vision_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='journal' href='#journal0' class='history toolbutton'>                 <%= dic_journal_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton multi'>                 <%= dic_panel_multimedia  %>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#recycling0' class='recycling toolbutton'>                 <%= dic_recycling_header  %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#meditations0' class='meditations toolbutton'>                  <%= dic_meditations_header  %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton acc'>                 <%= dic_panel_account  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#historyload' class='history toolbutton'>                 <%= dic_history_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton sett'>                 <%= dic_panel_settings  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a id='support' href='#support' class='support toolbutton'>                 <%= dic_support_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='share_link' href='#share_link' class='transfer toolbutton'>                 <%= dic_share_link %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#configuration' class='configuration toolbutton'>                 <%= dic_config_header %>                 </a>             </li>         </ul>     </div> 	<div data-role='panel' id='panelayuda' data-position='right' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray helpheader'>                 <%= dic_rightpanel_header  %>             </li> 			<div class='helpblock' data-role='content' data-controltype='textblock' style='color:white'> 			<%= helppanel %> 			</div>         </ul>     </div>";

                this.history=historycollection;
                languagevar=this.history.get("languages");
                this.M = languagevar.get("dic_transf_M");
                this.F = languagevar.get("dic_transf_F");
                this.MS = languagevar.get("dic_transf_MS");
                this.FS = languagevar.get("dic_transf_FS");

                switch(id)
                {
                    case '0':
                        compiledTemplate = _.template( transference0 );
                        this.model.set("tool", "transference");
		
                        break;
                    case '1':
                        compiledTemplate = _.template( transference1 );
						if(typeof $('#textinput6').val() != "undefined"){
							this.model.set({
								transferencewith:$('#textinput6').val(),
								situations:$('#textareadesctransfer').val(),
								finished: false
							});
						}
			  
                        break;
                    case '2':
                        compiledTemplate = _.template( transference2);
			 
                        break;
                    case '3':
                        compiledTemplate = _.template( transference3 );
			  
                        break;
                    case '4':
                        compiledTemplate = _.template( transference4 );
			  
                        break;
                    case '5':
                        compiledTemplate = _.template( transference5 );//LONG
			  
                        break;
                    case '6':
                        compiledTemplate = _.template( transference6 );//LONG
			  
                        break;
                    case '7':
                        compiledTemplate = _.template( transference7 );//LONG
			  
                        break;
                    case '8':
                        compiledTemplate = _.template( transference8 );//LONG
			  
                        break;
                    case '9':
                        compiledTemplate = _.template( transference9 );
			  
                        break;
                    case '10':
                        compiledTemplate = _.template( summary );
			  
                        break;
                    case '11':
                        compiledTemplate = _.template( transferencehistory ); //transference resume
			  
                        break;
                }
	
	
				console.log("transference model: ");
				console.log(this.model);
                if(id>19){
                    historyindex=id-20;
                    var self=this;
                    this.model= historycollection.at(historyindex);
                    if(historycollection.at(historyindex).get("version")=="Long") //long
                        compiledTemplate = _.template( transferencehistorylong );
                    else
                        compiledTemplate = _.template( transferencehistory ); //short
                    result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                    compiledheaderandpanel=_.template( headerandpanel );
                    this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
		
                }
                else{
	
                    this.model.set("notify",true);
                    var self=this;
                    historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_transf_helppanel"));
                    result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                    compiledheaderandpanel=_.template( headerandpanel );
                    this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
                }
			

                if(id=='1'){
	
                    var perceptions=  _.clone(this.model.get("perceptions"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listsusnegas").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+perceptions[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletenega elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
	
                }
	
                if(id=='2'){
	
                    var reactions=  _.clone(this.model.get("reactions"));
                    for(i=0; i< reactions.length; i++)
                        this.$("#listmisreac").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+reactions[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletereaction elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
	
                }
	
                if(id=='3'){
	
                    var perceptions=  _.clone(this.model.get("perceptions"));
                    var perceptionslike=  _.clone(this.model.get("perceptionslike"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listadjorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+perceptions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' name='' type='checkbox'"+ perceptionslike[i][0] +"> <label for='checkbox14' class='markperceptionorigen'>" + this.M + "</label> <input id='checkbox15' name='' type='checkbox'"+ perceptionslike[i][1] +"> <label for='checkbox15' class='markperceptionorigen'>" + this.F + "</label> <input id='checkbox16' name='' type='checkbox'"+ perceptionslike[i][2] +"> <label for='checkbox16' class='markperceptionorigen'>" + this.MS + "</label> <input id='checkbox17' name='' type='checkbox'"+ perceptionslike[i][3] +"> <label for='checkbox17' class='markperceptionorigen'>" + this.FS + "</label> </fieldset> </div></li>");
	
                }
	
                if(id=='4'){
	
                    var reactions=  _.clone(this.model.get("reactions"));
                    var reactionslike=  _.clone(this.model.get("reactionslike"));
                    for(i=0; i< reactions.length; i++)
                        this.$("#listreacorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+reactions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' name='' type='checkbox'"+ reactionslike[i][0] +"> <label for='checkbox14' class='markreactionorigen'>" + this.M + "</label> <input id='checkbox15' name='' type='checkbox'"+ reactionslike[i][1] +"> <label for='checkbox15' class='markreactionorigen'>" + this.F + "</label> <input id='checkbox16' name='' type='checkbox'"+ reactionslike[i][2] +"> <label for='checkbox16' class='markreactionorigen'>" + this.MS + "</label> <input id='checkbox17' name='' type='checkbox'"+ reactionslike[i][3] +"> <label for='checkbox17' class='markreactionorigen'>" + this.FS + "</label> </fieldset> </div></li>");

                }
	
                if(id=='6'){
                    if($('#textareaotrasareas').val()!=undefined){
                        this.model.set("otherAreas", $('#textareaotrasareas').val());
                    }
                }
	
                if(id=='7'){
		
                    var perceptions=  _.clone(this.model.get("perceptions"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listsusnegas").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+perceptions[i]+"</h1></a><a data-icon='delete' style='display:none' class='ui-icon-alt deletenega elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
		
                    if($('#textareadarkside').val()!=undefined){
                        this.model.set("darkSideWin", $('#textareadarkside').val());
                    }
                }
	
                if(id=='8'){
	
                    var qualities=  _.clone(this.model.get("qualities"));
                    for(i=0; i< qualities.length; i++)
                        this.$("#listsuscual").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+qualities[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletequal elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
                }
	
	
                if(id=='9'){
                    var self=this;
                    this.switchlistener = setInterval(function () {
                        if($("#freeswitch").val()!=this.lastoption){
                            console.log($("#freeswitch").val());
                            this.lastoption=$("#freeswitch").val();
                            if(this.lastoption=='yes'){
                                $('#transferbar1').show();
                                $('#transferbar2').hide();
                                $('#transferbar3').hide();
                            }
                            else {
                                $('#transferbar2').show();
                                $('#transferbar3').hide();
                                $('#transferbar1').hide();
                                if(typeof self.model==='undefined'){}
                                else self.model.set("notify",false);
				
                            }
                        }
                        $('.ui-slider-inneroffset > a').attr('href','');
                    }, 1000);
	
                }
	
	
                if (id=='10'){ // fin del transference, guardar
                    this.model.set("finished",true);
                    clearInterval(this.switchlistener);
                    historycollection.create(this.model);
				
                }
		
                if(id=='11'){
		
                    this.$(".botonstart").attr("href","#transference4"); //botón back
                    this.$(".botonstart").attr("class","botonprev");
                    this.$("#transresumeFooter").append("<a class='botonnext' data-role='button' data-transition='none' href='#transference9' data-icon='arrow-r' data-iconpos='right'>" + historycollection.get("languages").get("dic_next") + "</a>"); //botón next (a la silueta)
                    if(this.model.get("version")=="Long"){
                        var qualities=  _.clone(this.model.get("qualities"));
                        for(i=0; i< qualities.length; i++)
                            this.$("#listsuscual").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+qualities[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletequal elementosfinos' style='display:none' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
			
                    }
	
                    this.$('#reactionto').append("<span class='datoshistorytransference'>" + this.model.get("transferencewith") + "</span>");
                    this.$('#situations').append("<span class='datoshistorytransference'>" + this.model.get("situations") + "</span>");
                    var perceptions=  _.clone(this.model.get("perceptions"));
                    var perceptionslike=  _.clone(this.model.get("perceptionslike"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listadjorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+
                            perceptions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][0] +"> <label for='checkbox14'>" + this.M + "</label> <input id='checkbox15' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][1] +"> <label for='checkbox15'>" + this.F + "</label> <input id='checkbox16' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][2] +"> <label for='checkbox16'>" + this.MS + "</label> <input id='checkbox17' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][3] +"> <label for='checkbox17'>" + this.FS + "</label> </fieldset> </div></li>");
                    var reactions=  _.clone(this.model.get("reactions"));
                    var reactionslike=  _.clone(this.model.get("reactionslike"));
                    for(i=0; i< reactions.length; i++)
                        this.$("#listreacorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+reactions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][0] +"> <label for='checkbox14'>" + this.M + "</label> <input id='checkbox15' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][1] +"> <label for='checkbox15'>" + this.F + "</label> <input id='checkbox16' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][2] +"> <label for='checkbox16'>" + this.MS + "</label> <input id='checkbox17' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][3] +"> <label for='checkbox17'>" + this.FS + "</label> </fieldset> </div></li>");
	
			
		
                }
		
                if(id>19){ //this.model=historycollection...
		
                    if(historycollection.at(historyindex).get("version")=="Long"){
                        var qualities=  _.clone(this.model.get("qualities"));
                        for(i=0; i< qualities.length; i++)
                            this.$("#listsuscual").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+qualities[i]+"</h1></a><a data-icon='delete' class='ui-icon-alt deletequal elementosfinos' style='display:none' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
			
                    }
	
                    this.$('#reactionto').append("<span class='datoshistorytransference'>" + historycollection.at(historyindex).get("transferencewith") + "</span>");
                    this.$('#situations').append("<span class='datoshistorytransference'>" + historycollection.at(historyindex).get("situations") + "</span>");
                    var perceptions=  _.clone(historycollection.at(historyindex).get("perceptions"));
                    var perceptionslike=  _.clone(historycollection.at(historyindex).get("perceptionslike"));
                    for(i=0; i< perceptions.length; i++)
                        this.$("#listadjorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+
                            perceptions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][0] +"> <label for='checkbox14'>" + this.M + "</label> <input id='checkbox15' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][1] +"> <label for='checkbox15'>" + this.F + "</label> <input id='checkbox16' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][2] +"> <label for='checkbox16'>" + this.MS + "</label> <input id='checkbox17' disabled='disabled' name='' type='checkbox'"+
                            perceptionslike[i][3] +"> <label for='checkbox17'>" + this.FS + "</label> </fieldset> </div></li>");
                    var reactions=  _.clone(historycollection.at(historyindex).get("reactions"));
                    var reactionslike=  _.clone(historycollection.at(historyindex).get("reactionslike"));
                    for(i=0; i< reactions.length; i++)
                        this.$("#listreacorig").append("<li class='paddinglistasconorigen' data-theme='d'><div data-controltype='textblock'> <h1> "+reactions[i]+" <br> </h1> </div> <div data-role='fieldcontain' data-controltype='checkboxes'> <fieldset data-role='controlgroup' data-type='horizontal'> <input id='checkbox14' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][0] +"> <label for='checkbox14'>" + this.M + "</label> <input id='checkbox15' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][1] +"> <label for='checkbox15'>" + this.F + "</label> <input id='checkbox16' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][2] +"> <label for='checkbox16'>" + this.MS + "</label> <input id='checkbox17' disabled='disabled' name='' type='checkbox'"+ reactionslike[i][3] +"> <label for='checkbox17'>" + this.FS + "</label> </fieldset> </div></li>");
	
	
                }
	
            },
	
            addQuality: function(){
	
                try{
                    if(device.platform=='Android'){
                        $('#keyspace').attr('style','visibility: hidden;');
                    }
                }
                catch(e){
                    console.log(e);
                }
                if($('#actualsuscual').val()!=""){
                    var quali=  _.clone(this.model.get("qualities"));
                    quali.push($('#actualsuscual').val());

                    this.model.set("qualities", quali);

                    $("#listsuscual").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+$('#actualsuscual').val()+"</h1></a><a data-icon='delete' class='ui-icon-alt deletequal elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
					
                    $("#listsuscual").listview("refresh");
                    $('#actualsuscual').val('');
                    setTimeout(function(){
                        $('#actualsuscual').focus();
                    },0);
                    this.footerfix();
                }
            },
	
		
            perceptionorigen: function(ev){
	
                var index = $( "#listadjorig li" ).index($(ev.target).parents('li'));
                var clave;
                console.log(index);
                console.log($(ev.target).text());
                var perceptionslike=  _.clone(this.model.get("perceptionslike"));

                if($(ev.target).text()==this.M || $(ev.target).text()==this.F|| $(ev.target).text()==this.MS|| $(ev.target).text()==this.FS)
                    clave=$(ev.target).text();
                else if($(ev.target).html()==this.M || $(ev.target).html()==this.F|| $(ev.target).html()==this.MS|| $(ev.target).html()==this.FS)
                    clave=$(ev.target).html();
                else clave= $(ev.target).find(".ui-btn-text").text();
	
                console.log("justo ->"+clave+"<-");
	
                switch(clave)
                {
                    case this.M:
                        if(perceptionslike[index][0]==="checked='checked'")
                            perceptionslike[index][0]='';
                        else perceptionslike[index][0]="checked='checked'";
			
                        break;
                    case this.F:
                        if(perceptionslike[index][1]==="checked='checked'")
                            perceptionslike[index][1]='';
                        else perceptionslike[index][1]="checked='checked'";
		
                        break;
                    case this.MS:
                        if(perceptionslike[index][2]==="checked='checked'")
                            perceptionslike[index][2]='';
                        else perceptionslike[index][2]="checked='checked'";
		
                        break;
                    case this.FS:
                        if(perceptionslike[index][3]==="checked='checked'")
                            perceptionslike[index][3]='';
                        else perceptionslike[index][3]="checked='checked'";
		
                        break;
			  
                }
                console.log($(ev.target));

                this.model.set("perceptionslike", perceptionslike);
	
            },
	
            footerfix: function (){
	
                if(device.platform=='Android'){
                    setTimeout(function(){
                        $("div[data-role='footer']").attr('class', 'ui-footer ui-bar-a ui-footer-fixed slideup ui-panel-content-fixed-toolbar ui-panel-content-fixed-toolbar-closed');
                    },1500);
                }
            },
	
            reactionorigen: function(ev){
	
                var index = $( "#listreacorig li" ).index($(ev.target).parents('li'));
                var clave;
                var reactionslike=  _.clone(this.model.get("reactionslike"));
                console.log("TEXTO:");
                console.log($(ev.target).find(".ui-btn-text").text());
                console.log("HTML:");
                console.log($(ev.target).html());
                console.log("Event element:");
                console.log($(ev.target));
                if($(ev.target).text()==this.M || $(ev.target).text()==this.F|| $(ev.target).text()==this.MS|| $(ev.target).text()==this.FS)
                    clave=$(ev.target).text();
                else if($(ev.target).html()==this.M || $(ev.target).html()==this.F|| $(ev.target).html()==this.MS|| $(ev.target).html()==this.FS)
                    clave=$(ev.target).html();
                else clave= $(ev.target).find(".ui-btn-text").text();
	
                console.log("index: " + index);
                switch(clave)
                {
                    case this.M:
                        if(reactionslike[index][0]==="checked='checked'")
                            reactionslike[index][0]='';
                        else reactionslike[index][0]="checked='checked'";
			
                        break;
                    case this.F:
                        if(reactionslike[index][1]==="checked='checked'")
                            reactionslike[index][1]='';
                        else reactionslike[index][1]="checked='checked'";
		
                        break;
                    case this.MS:
                        if(reactionslike[index][2]==="checked='checked'")
                            reactionslike[index][2]='';
                        else reactionslike[index][2]="checked='checked'";
		
                        break;
                    case this.FS:
                        if(reactionslike[index][3]==="checked='checked'")
                            reactionslike[index][3]='';
                        else reactionslike[index][3]="checked='checked'";
		
                        break;
			  
                }
			 
                this.model.set("reactionslike", reactionslike);
                console.log(reactionslike);
            },
	
            addnegas: function(){
                if($('#actualsusnegas').val()!=''){
                    var altura=470 + ($("#listsusnegas").length*50);
                    $('.hojacuaderno').attr("style","min-height:" + altura + "px");
                    var addnegas=  _.clone(this.model.get("perceptions"));
                    var perceptionslike=  _.clone(this.model.get("perceptionslike"));
                    addnegas.push($('#actualsusnegas').val());
                    this.model.set("perceptions", addnegas);
                    perceptionslike[addnegas.length-1]= ['','','',''];
                    this.model.set("perceptionslike", perceptionslike);
                    if($('#actualsusnegas').val()!="")
                        $("#listsusnegas").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+$('#actualsusnegas').val()+"</h1></a><a data-icon='delete' class='ui-icon-alt deletenega elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
			
                    $("#listsusnegas").listview("refresh");
                    $('#actualsusnegas').val('');
                }
                setTimeout(function(){
                    $('#actualsusnegas').focus();
                },0);
	
	
            },
	
            deletenega: function(ev){
	
                var index = $( "#listsusnegas li" ).index($(ev.target).parent().parent());
                var negas=  _.clone(this.model.get("perceptions"));
                var perceptionslike=  _.clone(this.model.get("perceptionslike"));
                negas.splice(index, 1);
                perceptionslike.splice(index, 1);
                this.model.set("perceptions", negas);
                this.model.set("perceptionslike", perceptionslike);
                $(ev.target).parents('li').remove();
            //$("#listfeeders").listview("refresh");
	 
            },
	
            deleteQuality: function(ev){
		
                var index = $( "#listsuscual li" ).index($(ev.target).parent().parent());
                var quals=  _.clone(this.model.get("qualities"));
                quals.splice(index, 1);
                this.model.set("qualities", quals);
                $(ev.target).parents('li').remove();
	
            },
	
            addreactions: function(){
                if($('#actualmisreac').val()!=''){
                    var altura=470 + ($("#listmisreac").length*50);
                    $('.hojacuaderno').attr("style","min-height:" + altura + "px");
                    var addreactions=  _.clone(this.model.get("reactions"));
                    var reactionslike=  _.clone(this.model.get("reactionslike"));
                    addreactions.push($('#actualmisreac').val());
                    this.model.set("reactions", addreactions);
                    reactionslike[addreactions.length-1]= ['','','',''];
                    this.model.set("reactionslike", reactionslike);
                    if($('#actualmisreac').val()!="")
                        $("#listmisreac").append("<li class='elementosfinos' ><a><h1 class='letraselementosfinos'>"+$('#actualmisreac').val()+"</h1></a><a data-icon='delete' class='ui-icon-alt deletereaction elementosfinos' data-rel='dialog'' data-transition='none'>Delete</a> </li>");
			
                    $("#listmisreac").listview("refresh");
                    $('#actualmisreac').val('');
                }
                setTimeout(function(){
                    $('#actualmisreac').focus();
                },0);
	
	
            },
	
            deletereaction: function(ev){
	
                var index = $( "#listmisreac li" ).index($(ev.target).parent().parent());
                var reactions=  _.clone(this.model.get("reactions"));
                var reactionslike=  _.clone(this.model.get("reactionslike"));
                reactions.splice(index, 1);
                reactionslike.splice(index, 1);
                this.model.set("reactions", reactions);
                this.model.set("reactionslike", reactionslike);
                $(ev.target).parents('li').remove();
            //$("#listfeeders").listview("refresh");
	 
            },
	
            eleccionfinal: function(ev){
	
                var modelaux=this; //settimeout pierde el scope de this, necesito una variable auxiliar...
                setTimeout(function(){	//pongo delay puesto que el evento del click se lanza mucho antes de que cambie el HTML del radiobutton a checked, por lo que hay que esperar
	
                    if($("input[type='radio'][name='myButtonho']:checked").val()=='1'){		//free of transference
	
                        $('#transferbar1').show();
                        $('#transferbar2').hide();
                        $('#transferbar3').hide();

                    }
                    else{
	
                        $('#transferbar2').show();
                        $('#transferbar3').hide();
                        $('#transferbar1').hide();
                        modelaux.model.set("notify",false);
                    }
	
                },50);
	
	
	 
            }

        });

        return transferenceView;
    });