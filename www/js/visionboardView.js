

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'visionModel',
    'jquerymobile'
  
    ], function($, _, Backbone,visionModel){
		

        visionboardView = Backbone.View.extend({
  
            events:{
                "click #addphotovision":"addphotovision",
                "click #shareb":"share",
                "click .savevision":"checksave",
                "click #getgalleryphoto":"getfromgallery",
				"click .deleteEntry":"deleteEntry"
            },
	 
            render: function(id, historycollection){
                this.$el.attr('data-role', 'page');
                this.$el.attr('data-theme', 'a');
                this.$el.attr('class', 'page visionheight');
				
				/*Quitamos código de foto con cámara*/
				/*<a id='addphotovision' data-role='button' data-theme=''> 		<img src='img/photo.png' > <br/> 		<%= dic_vision_p1_text1 %> 	</a>*/
				
				visionboard0 = " <div data-role='content'>        <div class='hojacuaderno' data-controltype='htmlblock'>    <div class='headerhojacuaderno visionboard' data-role='header'>        <h3>         <%= dic_vision_header %>        </h3>       </div> 	  <div data-role='content'>     <a id='addvisionbutton' data-role='button' class='colorverde' href='#visionboard1' data-icon='plus' data-iconpos='right'>         <%= dic_vision_p0_text1 %>       </a> 	<div data-role='content' class='recyclinglistpadding'> 	  <ul id='summarylist' class='visionlist' data-role='listview' data-divider-theme='b' data-inset='true'> 	</ul> 	</div> 	 </div>    </div>    </div>    <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' data-transition='none' href='#summary'>     <%= dic_back %>    </a>     </div>";
				visionboard1 = "<div data-role='content'>    <div class='hojacuaderno' data-controltype='htmlblock'>    <div class='headerhojacuaderno recycling' data-role='header'>        <h3>         <%= dic_vision_header %>        </h3>       </div>     <div data-role='content'> 	<textarea name='' id='visiontitle' class='mandatory' placeholder='<%= dic_vision_p1_placeholder1 %>'></textarea> 	<textarea rows='6' name='' id='textareadesctransfer' placeholder='<%= dic_vision_p1_placeholder2 %>'></textarea> 	<img id='visionphoto' style='width:50%;' src='img/noimage.png' /> <p id='loadingt' style='display: none;'>Loading.</p>	<a id='getgalleryphoto' style='top: -10px;' data-role='button' data-theme=''><%= dic_gallery %></a>  	</div>    </div>    </div>    <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonprev' data-role='button' data-transition='none' href='#visionboard0' data-icon='arrow-l'>     <%= dic_vision_p1_text2 %>    </a>    <a class='botonnext savevision' data-role='button' data-transition='none' data-icon='arrow-r' data-iconpos='right'>     <%= dic_vision_p1_text3 %>    </a> </div>";
				visionboard2 = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno visionboard' data-role='header'>        <h2 class='textocentrado'>         <%= title %>        </h2>       </div>    <div data-role='content'> 	<span class='fechavision'><%= date %></span>      <img id='sunsetbig' src='<%= uri %>' />    <span id='visiontext' class='visiondescription'>         <%= description %>         </span> 		<a id='shareb' data-role='button' data-theme=''> 		 <img src='img/shareandroid.png' width='40' height='40'><br/>       <%= dic_share %>        </a> 		<ul id='sharelist'></ul> 		<canvas id='myVCanvas' width='1200' height='920' style='display:none;'  />    </div>   </div>   </div>   <div data-theme='a' data-role='footer' data-position='fixed' data-tap-toggle='false'>         <a class='botonstart' data-role='button' data-transition='none' href='#visionboard0'>     <%= dic_back %>    </a>     </div>";
				summary = "<div data-role='content'>    <div class='hojacuaderno'>       <div class='headerhojacuaderno summaryheader' data-role='header'>        <h2>         <%= dic_summary_header %>        </h2>       </div>    <div data-role='content'>       <div class='quotes sombrafrase' data-role='content'>    <p class='frasediaria'> <%= quote %></p>    <p class='frasediariaAuthor'> <%= quoteAuthor %></p>    </div>       <a id='suggestionbutton' class='summary toolbutton' data-role='button' data-controltype='panelbutton' href='#panelhoffman' data-transition='none' data-inset='false'>          <%= dic_summary_text2 %>     </a>    <ul id='summarylist' style='-webkit-box-shadow: none;' data-role='listview' data-divider-theme='b' data-inset='true' data-icon='none'>      	</ul> 	<ul id='listasummarytools' style='-webkit-box-shadow: none;' data-role='listview' data-divider-theme='b' data-icon='none' data-inset='true'> 						 	</ul>    </div>   </div> </div> ";
				headerandpanel = "<div id='menuheader' data-theme='a' class='menuheader' data-role='header' data-position='fixed' data-tap-toggle='false'>     <a id='menubutton' class='panelbutton dic_menu' data-controltype='panelbutton' data-role='button' href='#panelhoffman' data-icon='menuicon'> 	 <%= dic_menu %>     </a>     <div style=' text-align:center' data-controltype='image'>      <img class='logohoffman' src='img/logo_hoffman.png' />     </div>     <a class='panelbutton dic_help' data-controltype='panelbutton' data-role='button' data-theme='a' href='#panelayuda' data-icon='helpicon' data-iconpos='right'>      <%= dic_help %>     </a>    </div>    <div data-role='panel' id='panelhoffman' data-position='left' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='hoffmanseparator midgray'>                <div class='pruebaheight' style=' text-align:center' data-controltype='image'> 				 <img id='panelhoffmanlogo' class='logohoffman' src='img/logo_hoffman.png' /> 				</div>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#summary' class='summary toolbutton firstbutton'> 					<%= dic_summary_header %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray primermyaccountandsettingsseparator toolbutton'> 					<%= dic_panel_tools %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#quadSelection' class='quad toolbutton'> 					<%= dic_quad_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#feeling0' class='feeling toolbutton'>                     <%= dic_feeling_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#bashDisc' class='bashacker toolbutton'>                     <%= dic_bash_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro' style='display:none'>                 <a href='#pattern0' class='patternr toolbutton'>                     <%= dic_pattern_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#beatyourdark0' class='beatyour toolbutton'>                     <%= dic_beatyour_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#vicious0' class='vicious toolbutton'>                     <%= dic_vicious_header %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#transSelection' class='transfer toolbutton'>                     <%= dic_transf_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#visionboard0' class='visionboard toolbutton'>                     <%= dic_vision_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='journal' href='#journal0' class='history toolbutton'>                 <%= dic_journal_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton multi'>                 <%= dic_panel_multimedia  %>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#recycling0' class='recycling toolbutton'>                 <%= dic_recycling_header  %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#meditations0' class='meditations toolbutton'>                  <%= dic_meditations_header  %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a href='#profile0' class='configuration toolbutton'>                 <%= dic_hoffman_connect %>                 </a>             </li> 			<li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton acc'>                 <%= dic_panel_account  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#historyload' class='history toolbutton'>                 <%= dic_history_header %>                 </a>             </li>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray myaccountandsettingsseparator toolbutton sett'>                 <%= dic_panel_settings  %>             </li>             <li data-theme='c' class='grisclaro'>                 <a id='support' href='#support' class='support toolbutton'>                 <%= dic_support_header %>                 </a>             </li> 			<li data-theme='c' class='grisclaro'>                 <a id='share_link' href='#share_link' class='transfer toolbutton'>                 <%= dic_share_link %>                 </a>             </li>             <li data-theme='c' class='grisclaro'>                 <a href='#configuration' class='configuration toolbutton'>                 <%= dic_config_header %>                 </a>             </li>         </ul>     </div> 	<div data-role='panel' id='panelayuda' data-position='right' data-display='overlay'     data-theme='a'>         <ul data-role='listview' id='listapanel' data-divider-theme='h' data-inset='false'>             <li data-theme='c' data-role='list-divider' role='heading' class='midgray helpheader'>                 <%= dic_rightpanel_header  %>             </li> 			<div class='helpblock' data-role='content' data-controltype='textblock' style='color:white'> 			<%= helppanel %> 			</div>         </ul>     </div>";

                this.collection=historycollection;
	
                switch(id)
                {
                    case '0':
                        compiledTemplate = _.template( visionboard0 );
		
                        break;
                    case '1':
                        compiledTemplate = _.template( visionboard1 );
			  
                        break;
                    case '2':
                        compiledTemplate = _.template( visionboard2 );
                        this.model.set("tool", "vision");
                        this.model.set("description",$('#textareadesctransfer').val());
                        this.model.set("title",$('#visiontitle').val());
                        historycollection.create(this.model);
                        console.log("Saved");
		
			 
                        break;
                }
			
                if(id>19){
                    compiledTemplate = _.template( visionboard2 );
                    index=id-20;
                    this.model=this.collection.at(index);
                }
			
                var self=this;
                historycollection.get("languages").set("helppanel",historycollection.get("languages").get("dic_vision_helppanel"));
                result= _.extend(historycollection.get("languages").toJSON(),self.model.toJSON());
                compiledheaderandpanel=_.template( headerandpanel );
                this.$el.empty().append(compiledTemplate(result)).append(compiledheaderandpanel(result));
	
                if(id=='0'){
	
                    historycollection.forEach(this.getvisions, this);
	
                }
		
            },
	
            voidfunc: function(){},
	
            checksave: function(){
                var self=this;
                if($('#visiontitle').val()=="" || this.model.get("uri")==""){
                    try{
                        navigator.notification.alert(self.collection.get("languages").get("dic_vision_alert"), function(){
                            self.voidfunc();
                        }, "", "Ok");
                    }
                    catch(e){
                        console.log(e);
                        Backbone.history.navigate("#visionboard2", {
                            trigger: true
                        });
                    }
                }
                else
                    Backbone.history.navigate("#visionboard2", {
                        trigger: true
                    });
	
            },
			
			getFileContentAsBase64: function (path,callback){
				window.resolveLocalFileSystemURL(path, gotFile, fail);
						
				function fail(e) {
					  alert('Cannot found requested file');
				}

				function gotFile(fileEntry) {
					   fileEntry.file(function(file) {
						  var reader = new FileReader();
						  reader.onloadend = function(e) {
							   var content = this.result;
							   callback(content);
						  };
						  // The most important point, use the readAsDatURL Method from the file plugin
						  try{
							reader.readAsDataURL(file);
						  }
						  catch(e){console.log(e);}
					   });
				}
			},
	
            share: function(){
                var self=this;
                if(true){
	
					if(true){
						/*
						  self.getFileContentAsBase64(this.model.get("uri"),function(base64Image){
						  //window.open(base64Image);
						  console.log("getFileContentAsBase64:"+base64Image); 
						  window.plugins.socialsharing.share("", null, base64Image, null);
						  // Then you'll be able to handle the myimage.png file as base64
						});
						*/
						console.log("transforming...");
						var c = document.getElementById("myVCanvas");
						var ctx = c.getContext("2d");
						var img = new Image();
						img.onload = function(){
							c.width=this.width;
							c.height=this.height;
							console.log("This size: " + this.width + ", " + this.height);
							ctx.drawImage(this,0,0,this.width,this.height);
							//self.model.set("uri",c.toDataURL("image/png"));
							var picture= c.toDataURL("image/png");
							console.log("Debug: " + picture);
							window.plugins.socialsharing.share(self.model.get("title"), null, picture, null);
						};
						img.src = this.model.get("uri");
					}
					else{
						var simage = self.model.get("uri");
						console.log("sharing from gallery: " + simage);
						window.plugins.socialsharing.share("", null, simage, null);
					}

                    
                }
				else{
					try{
						console.log("SHARE: " + self.model.get("uri"));
						window.plugins.socialsharing.share(self.model.get("title"), null, self.model.get("uri"), null);
					}
					catch(e){
						alert(e);
						console.log(e);
					}
				}
            },
	
            getfromgallery:function(){
                var self=this;
                try{
                    if (!navigator.camera) {
                        alert("Camera API not supported");
                        return;
                    }
                    else{
						var auxprofile = this.collection.get("profile");
						auxdate = new Date();
						auxTime = auxdate.getTime();
						console.log("auxTime: " + auxTime);
						auxprofile.set("info",auxTime);
						auxprofile.save();
						this.collection.get("profile").destroy();
						this.collection.create(auxprofile);
						$('#loadingt').show();
                        navigator.camera.getPicture(function(imageData){
                            self.onPhotoDataSuccess(imageData, true);
                        }, this.onFail, {
                            quality: 50,
							destinationType: 0, //Camera.DestinationType.DATA_URL,
                            correctOrientation: true,
                            sourceType: 0,
							allowEdit: true,
							encodingType: navigator.camera.EncodingType.PNG
                        });
					}
                }
                catch(e){
                    console.log(e);
                }
            },
	
            getvisions: function(elemento){
	
                if(elemento.get("tool")=="vision"){
                    var index = this.collection.indexOf(elemento);
                    neoindex=index+20;
                    this.$("#summarylist").prepend("<li class='feed' data-icon='false'><p class='fechasummary'>" + elemento.get("date") + "</p><a href='#visionboard" + neoindex +"' data-transition='none'><img class='imagenesminiaturasummary' src='"+ elemento.get("uri") +"' /><h3>"+ elemento.get("title") +"</h3></a><a data-icon='delete' class='deleteEntry elementosfinos' colIndex='"+index+"' data-rel='dialog'' data-transition='none'>Delete</a></li>");
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
			},
			
			onDelEntryConfirm:function (indexans){
				self=this;
                if(indexans==1){//Yes
                    self.collection.at(self.index).destroy();
					$("#summarylist li").remove();
					self.collection.forEach(this.getvisions, this);
					$("#summarylist").listview("refresh");
                }
            },
			
			
			moveFile:function (fileUri, fileName) {
				
				function errorCallback (error) {
					console.log("Error:" + error.code);
					console.log(error);
				//alert(error.code);
				}
				
				function successCallback (entry) {
					console.log("New Path: " + entry.fullPath);
					//alert("Success. New Path: " + entry.fullPath);
					imageData='cdvfile://localhost/persistent'+entry.fullPath;
					var visionphoto = document.getElementById('visionphoto');
					visionphoto.src = imageData;
				}
				
				//fileUri=fileUri.replace(/assets-library:\/\//,"cdvfile://localhost/assets-library/");
				console.log("fileName: " + fileName);
				console.log("fileUri: " + fileUri);
				window.resolveLocalFileSystemURL(
					  fileUri,
					  function(fileEntry){
							newFileUri  = 'cdvfile://localhost/persistent/';
							oldFileUri  = fileUri;
							console.log("resolveLocalFileSystemURL");
							try{
								window.resolveLocalFileSystemURL(newFileUri,
										function(dirEntry) {
											// move the file to a new directory and rename it
											console.log("before moveTo");
											fileEntry.copyTo(dirEntry, fileName+".png", successCallback, errorCallback);
										},
										errorCallback);
							}
							catch(e){
								console.log("Error try: " + e);
							}
					  },
					  errorCallback);
			},
	
            addphotovision: function(){
                self = this;
                if (!navigator.camera) {
                    alert("Camera API not supported");
                    return;
                }
                else{
					var auxprofile = this.collection.get("profile");
					auxdate = new Date();
					auxTime = auxdate.getTime();
					console.log("auxTime: " + auxTime);
					auxprofile.set("info",auxTime);
					auxprofile.save();
					this.collection.get("profile").destroy();
					this.collection.create(auxprofile);
					if(device.platform=='Android')
						navigator.camera.getPicture(function(imageData){
							self.onPhotoDataSuccess(imageData, false);
						}, this.onFail, {
							quality: 50,
							correctOrientation: true,
							allowEdit: true
						});
					else{
						console.log("Encoding: " + navigator.camera.EncodingType.PNG);
						navigator.camera.getPicture(function(imageData){
							self.onPhotoDataSuccess(imageData, false);
						}, this.onFail, {
							quality: 50,
							correctOrientation: true,
							allowEdit: true,
							destinationType: 2,
							encodingType: navigator.camera.EncodingType.PNG
						});
					}
				}
            },
	
            onPhotoDataSuccess: function(imageData, base64){
				console.log("onPhotoDataSuccess, imagedata: ");
				$('#loadingt').hide();
				console.log(imageData);
				console.log(base64);
                var visionphoto = document.getElementById('visionphoto');
                //visionphoto.style.display = 'block'; 
				if(base64)
					imageData = "data:image/png;base64," + imageData;
				if(device.platform=='Android' || base64){
					console.log("android");
					visionphoto.src = imageData;
				}
					//imageData.replace(/file:.*cache\//, "");
				else{
					if(!base64){
						var pseudoname= Math.round(Date.now() + Math.random());
						imageData=imageData.replace(/assets-library:\/\//,"cdvfile://localhost/assets-library/");
						this.moveFile(imageData, pseudoname);
						imageData='cdvfile://localhost/persistent/'+pseudoname+".png";
					}
				}
				console.log(imageData);
                this.model.set("uri",imageData);
		
            },
	
            onFail: function(message){
				$('#loadingt').hide();
            //alert('Failed because: ' + message);
	
            }

        });

        return visionboardView;
    });