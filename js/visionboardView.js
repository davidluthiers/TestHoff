

define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!../Templates/visionboard0.html',
    'text!../Templates/visionboard1.html',
    'text!../Templates/visionboard2.html',
    'visionModel',
    'text!../Templates/summary.html',
    'text!../Templates/headerandpanel.html',
    'jquerymobile'
  
    ], function($, _, Backbone, visionboard0, visionboard1, visionboard2, visionModel, summary, headerandpanel){



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
	
            //alert('Failed because: ' + message);
	
            }

        });

        return visionboardView;
    });