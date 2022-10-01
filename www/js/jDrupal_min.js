function drupal_init(){try{Drupal||(Drupal={}),Drupal.csrf_token=!1,Drupal.sessid=null,Drupal.user=drupal_user_defaults(),Drupal.settings={app_directory:"app",base_path:"/",cache:{entity:{enabled:!1,expiration:3600},views:{enabled:!1,expiration:3600}},debug:!1,endpoint:"hoffapp",file_public_path:"sites/default/files",language_default:"und",site_path:"http://appv2.hoffman-international.com"},Drupal.includes={},Drupal.includes.module={},Drupal.modules={core:{},contrib:{},custom:{}},Drupal.services_queue={comment:{retrieve:{}},file:{retrieve:{}},node:{retrieve:{}},taxonomy_term:{retrieve:{}},taxonomy_vocabulary:{retrieve:{}},user:{retrieve:{}}},Drupal.cache_expiration=window.localStorage.getItem("cache_expiration"),Drupal.cache_expiration?Drupal.cache_expiration=JSON.parse(Drupal.cache_expiration):Drupal.cache_expiration={entities:{}}}catch(a){console.log("drupal_init - "+a)}}function date(a){try{var b=null,c=null;arguments[1]?(c=arguments[1],"string"==typeof c&&(c=parseInt(c)),b=new Date(c)):(b=new Date,c=b.getTime());for(var d="",e=0;e<a.length;e++){var f=a.charAt(e);switch(f){case"d":var g=""+b.getDate();1==g.length&&(g="0"+g),d+=g;break;case"D":var g=b.getDay();switch(g){case 0:d+="Sun";break;case 1:d+="Mon";break;case 2:d+="Tue";break;case 3:d+="Wed";break;case 4:d+="Thu";break;case 5:d+="Fri";break;case 6:d+="Sat"}break;case"j":d+=b.getDate();break;case"l":var g=b.getDay();switch(g){case 0:d+="Sunday";break;case 1:d+="Monday";break;case 2:d+="Tuesday";break;case 3:d+="Wednesday";break;case 4:d+="Thursday";break;case 5:d+="Friday";break;case 6:d+="Saturday"}break;case"N":d+=b.getDay()+1;break;case"w":d+=b.getDay();break;case"F":switch(b.getMonth()){case 0:d+="January";break;case 1:d+="February";break;case 2:d+="March";break;case 3:d+="April";break;case 4:d+="May";break;case 5:d+="June";break;case 6:d+="July";break;case 7:d+="August";break;case 8:d+="September";break;case 9:d+="October";break;case 10:d+="November";break;case 11:d+="December"}break;case"m":var h=""+(b.getMonth()+1);1==h.length&&(h="0"+h),d+=h;break;case"Y":d+=b.getFullYear();break;case"a":case"A":var i=b.getHours();d+=12>i?"am":"pm","A"==f&&(d=d.toUpperCase());break;case"g":var i=b.getHours();0==i||23==i?i=12:i%=12,d+=""+i;break;case"G":var i=""+b.getHours();d+=i;break;case"H":var i=""+b.getHours();1==i.length&&(i="0"+i),d+=i;break;case"i":var j=""+b.getMinutes();1==j.length&&(j="0"+j),d+=j;break;default:d+=f}}return d}catch(k){console.log("date - "+k)}}function dpm(a){try{"undefined"!=typeof a?("function"==typeof parent.window.ripple?"undefined"!=typeof arguments[1]&&0==arguments[1]?console.log(JSON.stringify(a)):console.log(a):"object"==typeof a&&console.log(JSON.stringify(a)),""==a?console.log("<empty-string>"):console.log(a)):console.log("<undefined>")}catch(b){console.log("dpm - "+b)}}function drupal_user_defaults(){try{return{uid:"0",roles:{1:"anonymous user"},permissions:[]}}catch(a){console.log("drupal_user_defaults - "+a)}}function empty(a){try{return null===a?!0:"object"==typeof a?0===Object.keys(a).length:"undefined"==typeof a||""==a}catch(b){console.log("empty - "+b)}}function function_exists(name){try{return"function"==eval("typeof "+name)}catch(error){alert("function_exists - "+error)}}function http_status_code_title(a){try{var b="";switch(a){case 200:b="OK";break;case 401:b="Unauthorized";break;case 404:b="Not Found";break;case 406:b="Not Acceptable";break;case 500:b="Internal Server Error"}return b}catch(c){console.log("http_status_code_title - "+c)}}function in_array(a,b){try{if("undefined"==typeof b)return!1;if("string"==typeof a)return b.indexOf(a)>-1;for(var c=!1,d=0;d<b.length;d++)if(b[d]==a){c=!0;break}return c}catch(e){console.log("in_array - "+e)}}function is_int(a){return"string"==typeof a&&(a=parseInt(a)),"number"==typeof a&&a%1==0}function language_default(){try{return Drupal.settings.language_default&&""!=Drupal.settings.language_default?Drupal.settings.language_default:"und"}catch(a){console.log("language_default - "+a)}}function module_exists(a){try{var b=!1;return"undefined"!=typeof Drupal.modules.core[a]?b=!0:"undefined"!=typeof Drupal.modules.contrib[a]?b=!0:"undefined"!=typeof Drupal.modules.custom[a]&&(b=!0),b}catch(c){console.log("module_exists - "+c)}}function shuffle(a){try{for(var b=a.length-1;b>0;b--){var c=Math.floor(Math.random()*(b+1)),d=a[b];a[b]=a[c],a[c]=d}return a}catch(e){console.log("shuffle - "+e)}}function time(){var a=new Date;return Math.floor(a/1e3)}function ucfirst(a){a+="";var b=a.charAt(0).toUpperCase();return b+a.substr(1)}function module_implements(a){try{var b=[];if(a)for(var c=module_types(),d=0;d<c.length;d++){var e=c[d];for(var f in Drupal.modules[e])Drupal.modules[e].hasOwnProperty(f)&&function_exists(f+"_"+a)&&b.push(f)}return 0==b.length?!1:b}catch(g){console.log("module_implements - "+g)}}function module_invoke(a,b){try{var c=null;if(drupalgap_module_load(a)){var d=Array.prototype.slice.call(arguments),e=a+"_"+b;if(function_exists(e)){var f=window[e];d.splice(0,2),c=0==Object.getOwnPropertyNames(d).length?f():f.apply(null,d)}}else console.log("WARNING: module_invoke() - Failed to load module: "+a);return c}catch(g){console.log("module_invoke - "+g)}}function module_invoke_all(a){try{module_invoke_results=new Array;var b=Array.prototype.slice.call(arguments);b.splice(0,1),module_invoke_continue=!0;for(var c=module_types(),d=0;d<c.length;d++){var e=c[d];for(var f in Drupal.modules[e])if(Drupal.modules[e].hasOwnProperty(f)){var g=f+"_"+a;if(function_exists(g)){var h=null;if(0==b.length)h=module_invoke(f,a);else{b.unshift(f,a);var i=window.module_invoke;h=i.apply(null,b),b.splice(0,2)}"undefined"!=typeof h&&module_invoke_results.push(h)}}}return module_invoke_results}catch(j){console.log("module_invoke_all - "+j)}}function module_load(a){try{for(var b=module_types(),c=0;c<b.length;c++){var d=b[c];if(Drupal.modules[d][a])return Drupal.modules[d][a]}return!1}catch(e){console.log("module_load - "+e)}}function module_object_template(a){try{return{name:a}}catch(b){console.log("module_object_template - "+b)}}function module_types(){try{return["core","contrib","custom"]}catch(a){console.log("module_types - "+a)}}function comment_load(a,b){try{entity_load("comment",a,b)}catch(c){console.log("comment_load - "+c)}}function comment_save(a,b){try{entity_save("comment",null,a,b)}catch(c){console.log("comment_save - "+c)}}function entity_delete(a,b,c){try{var d=a+"_delete";if(function_exists(d)){var e=window[d];e(b,c)}else console.log("WARNING: entity_delete - unsupported type: "+a)}catch(f){console.log("entity_delete - "+f)}}function entity_get_bundle(a,b){try{var c=null;switch(a){case"node":c=b.type;break;case"taxonomy_term":c=b.vid;break;case"comment":case"file":case"user":case"taxonomy_vocabulary":break;default:var d="WARNING: entity_get_bundle - unsupported entity type ("+a+")";console.log(d)}return c}catch(e){console.log("entity_get_bundle - "+e)}}function entity_get_bundle_name(a){try{switch(a){case"node":return"type";case"taxonomy_term":return"vid";case"comment":case"file":case"user":case"taxonomy_vocabulary":default:return null}}catch(b){console.log("entity_get_bundle - "+b)}}function entity_id_parse(a){try{var b=a;return"string"==typeof b&&(b=parseInt(a)),b}catch(c){console.log("entity_id_parse - "+c)}}function entity_local_storage_key(a,b){try{return a+"_"+b}catch(c){console.log("entity_local_storage_key - "+c)}}function entity_index_local_storage_key(a){return a}function entity_load(a,b,c){try{if($.isArray(b)){var d={parameters:{},options:{entity_load:!0}};return d.parameters[entity_primary_key(a)]=b.join(","),void window[a+"_index"](d,c)}var e=b;e=entity_id_parse(e);var f=entity_caching_enabled(a);if(_services_queue_already_queued(a,"retrieve",e,"success"))return f&&(g=_entity_local_storage_load(a,e,c))?void(c.success&&c.success(g)):("undefined"!=typeof c.success&&_services_queue_callback_add(a,"retrieve",e,"success",c.success),void("undefined"!=typeof c.error&&_services_queue_callback_add(a,"retrieve",e,"error",c.error)));_services_queue_add_to_queue(a,"retrieve",e),_services_queue_callback_add(a,"retrieve",e,"success",c.success);var g=!1;if(f&&(g=_entity_local_storage_load(a,e,c)))return void _entity_callback_bubble(a,e,g);if(!in_array(a,entity_types())){var h="WARNING: entity_load - unsupported type: "+a;return console.log(h),void(c.error&&c.error(null,null,h))}var i=entity_primary_key(a),j={success:function(b){try{g=b,entity_caching_enabled(a,entity_get_bundle(a,g))&&(_entity_set_expiration_time(a,g),_entity_local_storage_save(a,e,g)),_entity_callback_bubble(a,e,g)}catch(c){console.log("entity_load - success - "+c)}},error:function(b,d,f){try{_services_queue_clear(a,"retrieve",e,"success"),c.error&&c.error(b,d,f)}catch(g){console.log("entity_load - error - "+g)}}},k=a+"_retrieve";if(function_exists(k)){j[i]=e;var l=window[k];l(b,j)}else console.log("WARNING: "+k+"() does not exist!")}catch(m){console.log("entity_load - "+m)}}function _entity_callback_bubble(a,b,c){for(var d=Drupal.services_queue[a].retrieve[b].success,e=0;e<d.length;e++)d[e](c);_services_queue_clear(a,"retrieve",b,"success")}function _entity_local_storage_load(a,b,c){try{var d=!1;c&&c.reset&&_entity_local_storage_delete(a,b);var e=entity_local_storage_key(a,b);if(d=window.localStorage.getItem(e))if(d=JSON.parse(d),entity_has_expired(a,d))_entity_local_storage_delete(a,b),d=!1;else if(drupalgap&&drupalgap.page.options&&drupalgap.page.options.reloadingPage){if("undefined"!=typeof drupalgap.page.options.reset&&drupalgap.page.options.reset===!1)return d;_entity_local_storage_delete(a,b),d=!1}return d}catch(f){console.log("_entity_local_storage_load - "+f)}}function _entity_local_storage_save(a,b,c){try{var d=entity_local_storage_key(a,b);window.localStorage.setItem(d,JSON.stringify(c)),"undefined"==typeof Drupal.cache_expiration.entities&&(Drupal.cache_expiration.entities={}),Drupal.cache_expiration.entities[d]=c.expiration,window.localStorage.setItem("cache_expiration",JSON.stringify(Drupal.cache_expiration))}catch(e){console.log("_entity_local_storage_save - "+e)}}function _entity_local_storage_delete(a,b){try{var c=entity_local_storage_key(a,b);window.localStorage.removeItem(c)}catch(d){console.log("_entity_local_storage_delete - "+d)}}function entity_primary_key(a){try{var b;switch(a){case"comment":b="cid";break;case"file":b="fid";break;case"node":b="nid";break;case"taxonomy_term":b="tid";break;case"taxonomy_vocabulary":b="vid";break;case"user":b="uid";break;default:var c=a+"_primary_key";if(drupalgap_function_exists(c)){var d=window[c];b=d(a)}else{var e="entity_primary_key - unsupported entity type ("+a+") - to add support, declare "+c+"() and have it return the primary key column name as a string";console.log(e)}}return b}catch(f){console.log("entity_primary_key - "+f)}}function entity_save(a,b,c,d){try{var e;switch(a){case"comment":e=c.cid?"comment_update":"comment_create";break;case"file":e="file_create";break;case"node":c.language||(c.language=language_default()),e=c.nid?"node_update":"node_create";break;case"user":e=c.uid?"user_update":"user_create";break;case"taxonomy_term":e=c.tid?"taxonomy_term_update":"taxonomy_term_create";break;case"taxonomy_vocabulary":e=c.vid?"taxonomy_vocabulary_update":"taxonomy_vocabulary_create"}if(e&&function_exists(e)){var f=window[e];f(c,d)}else console.log("WARNING: entity_save - unsupported type: "+a)}catch(g){console.log("entity_save - "+g)}}function entity_caching_enabled(){try{if("undefined"==typeof Drupal.settings.cache||"undefined"==typeof Drupal.settings.cache.entity||!Drupal.settings.cache.entity.enabled)return!1;var a=arguments[0];if(!a)return!0;if(!Drupal.settings.cache.entity.entity_types||!Drupal.settings.cache.entity.entity_types[a])return!0;var b=Drupal.settings.cache.entity.entity_types[a],c="undefined"!=typeof b.enabled&&b.enabled===!1;if(c)return!1;var d=arguments[1];return d&&"undefined"!=typeof b.bundles&&"undefined"!=typeof b.bundles[d]?"undefined"!=typeof b.bundles[d].enabled?b.bundles[d].enabled:b.enabled:!0}catch(e){console.log("entity_caching_enabled - "+e)}}function entity_has_expired(a,b){return"undefined"!=typeof b.expiration&&0!=b.expiration&&time()>b.expiration}function entity_clean_local_storage(){if(Drupal.cache_expiration.entities)for(var a in Drupal.cache_expiration.entities)if(Drupal.cache_expiration.entities.hasOwnProperty(a)){var b=Drupal.cache_expiration.entities[a];if(!(b>time())){delete Drupal.cache_expiration.entities[a];var c=a.split("_"),d=c[0],e=c[1];_entity_local_storage_delete(d,e),window.localStorage.setItem("cache_expiration",JSON.stringify(Drupal.cache_expiration))}}}function _entity_get_expiration_time(a,b){try{var c=null,d=entity_get_bundle(a,b);if(entity_caching_enabled(a,d)){var c=0,e=Drupal.settings.cache;"undefined"!==e.entity.expiration&&(c=e.entity.expiration),"undefined"!==e.entity.entity_types&&(e.entity.entity_types[a]&&"undefined"!=typeof e.entity.entity_types[a].expiration&&(c=e.entity.entity_types[a].expiration),d&&e.entity.entity_types[a]&&e.entity.entity_types[a].bundles&&e.entity.entity_types[a].bundles[d]&&"undefined"!=typeof e.entity.entity_types[a].bundles[d].expiration&&(c=e.entity.entity_types[a].bundles[d].expiration))}return c&&(c+=time()),c}catch(f){console.log("_entity_get_expiration_time - "+f)}}function _entity_set_expiration_time(a,b){try{b.expiration=_entity_get_expiration_time(a,b)}catch(c){console.log("_entity_set_expiration_time - "+c)}}function entity_types(){try{return["comment","file","node","taxonomy_term","taxonomy_vocabulary","user"]}catch(a){console.log("entity_types - "+a)}}function _entity_index_local_storage_load(a,b,c){try{var d=!1;c&&c.reset&&_entity_index_local_storage_delete(b);var e=entity_index_local_storage_key(b);if(d=window.localStorage.getItem(e))if(d=JSON.parse(d),"undefined"!=typeof d.expiration&&0!=d.expiration&&time()>d.expiration)_entity_index_local_storage_delete(b),d=!1;else{for(var f=[],g=0;g<d.entity_ids.length;g++)f.push(_entity_local_storage_load(a,d.entity_ids[g],c));d=f}return d}catch(h){console.log("_entity_index_local_storage_load - "+h)}}function _entity_index_local_storage_save(a,b,c){try{for(var d={entity_type:a,expiration:_entity_get_expiration_time(),entity_ids:[]},e=0;e<c.length;e++)d.entity_ids.push(c[e][entity_primary_key(a)]);window.localStorage.setItem(entity_index_local_storage_key(b),JSON.stringify(d))}catch(f){console.log("_entity_index_local_storage_save - "+f)}}function _entity_index_local_storage_delete(a){try{var b=entity_index_local_storage_key(a);window.localStorage.removeItem(b)}catch(c){console.log("_entity_index_local_storage_delete - "+c)}}function file_load(a,b){try{entity_load("file",a,b)}catch(c){console.log("file_load - "+c)}}function file_save(a,b){try{entity_save("file",null,a,b)}catch(c){console.log("file_save - "+c)}}function node_load(a,b){try{entity_load("node",a,b)}catch(c){console.log("node_load - "+c)}}function node_save(a,b){try{entity_save("node",a.type,a,b)}catch(c){console.log("node_save - "+c)}}function taxonomy_term_load(a,b){try{entity_load("taxonomy_term",a,b)}catch(c){console.log("taxonomy_term_load - "+c)}}function taxonomy_term_save(a,b){try{entity_save("taxonomy_term",null,a,b)}catch(c){console.log("taxonomy_term_save - "+c)}}function taxonomy_vocabulary_load(a,b){try{entity_load("taxonomy_vocabulary",a,b)}catch(c){console.log("taxonomy_vocabulary_load - "+c)}}function taxonomy_vocabulary_save(a,b){try{entity_save("taxonomy_vocabulary",null,a,b)}catch(c){console.log("taxonomy_vocabulary_save - "+c)}}function user_load(a,b){try{entity_load("user",a,b)}catch(c){console.log("user_load - "+c)}}function user_save(a,b){try{entity_save("user",null,a,b)}catch(c){console.log("user_save - "+c)}}function user_password(){try{var a=10;arguments[0]&&(a=arguments[0]);for(var b="",c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789",d=0;a>d;d++)b+=c.charAt(Math.floor(Math.random()*c.length));return b}catch(e){console.log("user_password - "+e)}}function services_get_csrf_token(a){try{var b;if(a.reset&&(Drupal.sessid=null),Drupal.sessid&&(b=Drupal.sessid),b)return void(a.success&&a.success(b));var c=new XMLHttpRequest;a.token_url=Drupal.settings.site_path+Drupal.settings.base_path+"?q=services/session/token",module_invoke_all("csrf_token_preprocess",a),c.onload=function(d){try{if(4==c.readyState){c.status+" - "+http_status_code_title(c.status);200!=c.status?a.error&&a.error(c,c.status,c.responseText):(b=c.responseText,Drupal.sessid=b,a.success&&a.success(b))}else console.log("services_get_csrf_token - readyState - "+c.readyState)}catch(e){console.log("services_get_csrf_token - token_request. onload - "+e)}},c.open("GET",a.token_url,!0),c.send(null)}catch(d){console.log("services_get_csrf_token - "+d)}}function services_ready(){try{var a=!0;return""==Drupal.settings.site_path&&(a=!1,console.log("jDrupal's Drupal.settings.site_path is not set!")),""==Drupal.settings.endpoint&&(a=!1,console.log("jDrupal's Drupal.settings.endpoint is not set!")),a}catch(b){console.log("services_ready - "+b)}}function services_resource_defaults(a,b,c){try{a.service||(a.service=b),a.resource||(a.resource=c)}catch(d){console.log("services_resource_defaults - "+d)}}function _services_queue_already_queued(a,b,c,d){try{var e=!1;if("undefined"!=typeof Drupal.services_queue[a][b][c]){var f=Drupal.services_queue[a][b][c];0!=f[d].length&&(e=!0)}return e}catch(g){console.log("_services_queue_already_queued - "+g)}}function _services_queue_add_to_queue(a,b,c){try{Drupal.services_queue[a][b][c]={entity_id:c,success:[],error:[]}}catch(d){console.log("_services_queue_add_to_queue - "+d)}}function _services_queue_clear(a,b,c,d){try{Drupal.services_queue[a].retrieve[c][d]=[]}catch(e){console.log("_services_queue_clear - "+e)}}function _services_queue_remove_from_queue(a,b,c){try{console.log("WARNING: services_queue_remove_from_queue() not done yet!")}catch(d){console.log("_services_queue_remove_from_queue - "+d)}}function _services_queue_callback_add(a,b,c,d,e){try{Drupal.services_queue[a][b][c][d].push(e)}catch(f){console.log("_services_queue_callback_add - "+f)}}function _services_queue_callback_count(a,b,c,d){try{var e=Drupal.services_queue[a][b][c][d].length;return e}catch(f){console.log("_services_queue_callback_count - "+f)}}function comment_create(a,b){try{services_resource_defaults(b,"comment","create"),entity_create("comment",null,a,b)}catch(c){console.log("comment_create - "+c)}}function comment_retrieve(a,b){try{services_resource_defaults(b,"comment","retrieve"),entity_retrieve("comment",a,b)}catch(c){console.log("comment_retrieve - "+c)}}function comment_update(a,b){try{services_resource_defaults(b,"comment","update"),entity_update("comment",null,a,b)}catch(c){console.log("comment_update - "+c)}}function comment_delete(a,b){try{services_resource_defaults(b,"comment","delete"),entity_delete("comment",a,b)}catch(c){console.log("comment_delete - "+c)}}function comment_index(a,b){try{services_resource_defaults(b,"comment","index"),entity_index("comment",a,b)}catch(c){console.log("comment_index - "+c)}}function entity_create(a,b,c,d){try{Drupal.services.call({method:"POST",async:d.async,path:a+".json",service:d.service,resource:d.resource,entity_type:a,bundle:b,data:JSON.stringify(c),success:function(a){try{d.success&&d.success(a)}catch(b){console.log("entity_create - success - "+b)}},error:function(a,b,c){try{d.error&&d.error(a,b,c)}catch(e){console.log("entity_create - error - "+e)}}})}catch(e){console.log("entity_create - "+e)}}function entity_retrieve(a,b,c){try{Drupal.services.call({method:"GET",path:a+"/"+b+".json",service:c.service,resource:c.resource,entity_type:a,entity_id:b,success:function(a){try{c.success&&c.success(a)}catch(b){console.log("entity_retrieve - success - "+b)}},error:function(a,b,d){try{c.error&&c.error(a,b,d)}catch(e){console.log("entity_retrieve - error - "+e)}}})}catch(d){console.log("entity_retrieve - "+d)}}function entity_update(a,b,c,d){try{var e=_entity_wrap(a,c),f=entity_primary_key(a),g=JSON.stringify(e);Drupal.services.call({method:"PUT",path:a+"/"+c[f]+".json",service:d.service,resource:d.resource,entity_type:a,entity_id:c[entity_primary_key(a)],bundle:b,data:g,success:function(b){try{_entity_local_storage_delete(a,c[f]),d.success&&d.success(b)}catch(e){console.log("entity_update - success - "+e)}},error:function(a,b,c){try{d.error&&d.error(a,b,c)}catch(e){console.log("entity_update - error - "+e)}}})}catch(h){console.log("entity_update - "+h)}}function entity_delete(a,b,c){try{Drupal.services.call({method:"DELETE",path:a+"/"+b+".json",service:c.service,resource:c.resource,entity_type:a,entity_id:b,success:function(d){try{_entity_local_storage_delete(a,b),c.success&&c.success(d)}catch(e){console.log("entity_delete - success - "+e)}},error:function(a,b,d){try{c.error&&c.error(a,b,d)}catch(e){console.log("entity_delete - error - "+e)}}})}catch(d){console.log("entity_delete - "+d)}}function entity_index(a,b,c){try{var d;"object"==typeof b?d=entity_index_build_query_string(b):"string"==typeof b&&(d=b),d=d?"&"+d:"";var e=a+".json"+d,f=entity_caching_enabled(a);if(f){var g=_entity_index_local_storage_load(a,e,{});if(g&&c.success)return void c.success(g)}Drupal.services.call({method:"GET",path:e,service:c.service,resource:c.resource,entity_type:a,query:b,success:function(d){try{if(c.success){if(f&&b.options&&b.options.entity_load){for(var g=0;g<d.length;g++){var h=d[g];_entity_set_expiration_time(h),_entity_local_storage_save(a,d[g][entity_primary_key(a)],h)}_entity_index_local_storage_save(a,e,d)}c.success(d)}}catch(i){console.log("entity_index - success - "+i)}},error:function(a,b,d){try{c.error&&c.error(a,b,d)}catch(e){console.log("entity_index - error - "+e)}}})}catch(h){console.log("entity_index - "+h)}}function entity_index_build_query_string(a){try{var b="";if(!a)return b;if(a.fields){for(var c="",d=0;d<a.fields.length;d++)c+=encodeURIComponent(a.fields[d])+",";""!=c&&(c="fields="+c.substring(0,c.length-1),b+=c+"&")}if(a.parameters){var e="";for(var f in a.parameters)if(a.parameters.hasOwnProperty(f)){var g=encodeURIComponent(f),h=encodeURIComponent(a.parameters[f]);e+="parameters["+g+"]="+h+"&"}""!=e&&(e=e.substring(0,e.length-1),b+=e+"&")}if(a.parameters_op){var i="";for(var j in a.parameters_op)if(a.parameters_op.hasOwnProperty(j)){var g=encodeURIComponent(j),h=encodeURIComponent(a.parameters_op[j]);i+="parameters_op["+g+"]="+h+"&",i+="options[parameters_op]["+g+"]="+h+"&"}""!=i&&(i=i.substring(0,i.length-1),b+=i+"&")}if(a.orderby){var k="";for(var l in a.orderby)if(a.orderby.hasOwnProperty(l)){var g=encodeURIComponent(l),h=encodeURIComponent(a.orderby[l]);k+="orderby["+g+"]="+h+"&",k+="options[orderby]["+g+"]="+h+"&"}""!=k&&(k=k.substring(0,k.length-1),b+=k+"&")}if(a.options){var m="";for(var n in a.options)if(a.options.hasOwnProperty(n)){var o=a.options[n];if("object"==typeof o){for(var l in o)if(o.hasOwnProperty(l)){var g=encodeURIComponent(l),h=encodeURIComponent(o[l]);m+="options["+n+"]["+g+"]="+h+"&"}}else{var h=encodeURIComponent(o);m+="options["+n+"]="+h+"&"}}""!=m&&(m=m.substring(0,m.length-1),b+=m+"&")}if("undefined"!=typeof a.page&&(b+="page="+encodeURIComponent(a.page)+"&"),"undefined"!=typeof a.page_size){var p="WARNING query.page_size is deprecated, use query.pagesize instead!";console.log(p),b+="pagesize="+encodeURIComponent(a.page_size)+"&"}else"undefined"!=typeof a.pagesize&&(b+="pagesize="+encodeURIComponent(a.pagesize)+"&");return b.substring(0,b.length-1)}catch(q){console.log("entity_index_build_query_string - "+q)}}function _entity_wrap(a,b){try{var c={};return"comment"==a||"taxonomy_term"==a||"taxonomy_vocabulary"==a||"user"==a||-1!=a.indexOf("commerce")?c=b:c[a]=b,c}catch(d){console.log("_entity_wrap - "+d)}}function file_create(a,b){try{services_resource_defaults(b,"file","create"),entity_create("file",null,a,b)}catch(c){console.log("file_create - "+c)}}function file_retrieve(a,b){try{services_resource_defaults(b,"file","retrieve"),entity_retrieve("file",a,b)}catch(c){console.log("file_retrieve - "+c)}}function file_delete(a,b){try{services_resource_defaults(b,"file","delete"),entity_delete("file",a,b)}catch(c){console.log("file_delete - "+c)}}function node_create(a,b){try{services_resource_defaults(b,"node","create"),entity_create("node",a.type,a,b)}catch(c){console.log("node_create - "+c)}}function node_retrieve(a,b){try{services_resource_defaults(b,"node","retrieve"),entity_retrieve("node",a,b)}catch(c){console.log("node_retrieve - "+c)}}function node_update(a,b){try{services_resource_defaults(b,"node","update"),entity_update("node",a.type,a,b)}catch(c){console.log("node_update - "+c)}}function node_delete(a,b){try{services_resource_defaults(b,"node","delete"),entity_delete("node",a,b)}catch(c){console.log("node_delete - "+c)}}function node_index(a,b){try{services_resource_defaults(b,"node","index"),entity_index("node",a,b)}catch(c){console.log("node_index - "+c)}}function system_connect(a){try{var b={service:"system",resource:"connect",method:"POST",path:"system/connect.json",success:function(b){try{Drupal.user=b.user,a.success&&a.success(b)}catch(c){console.log("system_connect - success - "+c)}},error:function(b,c,d){try{a.error&&a.error(b,c,d)}catch(e){console.log("system_connect - error - "+e)}}};Drupal.csrf_token?(a.debug&&console.log("Token already available."),Drupal.services.call(b)):services_get_csrf_token({success:function(c){try{a.debug&&console.log("Grabbed new token."),Drupal.csrf_token=!0,Drupal.services.call(b)}catch(d){console.log("system_connect - services_csrf_token - success - "+message)}},error:function(b,c,d){try{a.error&&a.error(b,c,d)}catch(e){console.log("system_connect - services_csrf_token - error - "+d)}}})}catch(c){console.log("system_connect - "+c)}}function taxonomy_term_create(a,b){try{services_resource_defaults(b,"taxonomy_term","create"),entity_create("taxonomy_term",null,a,b)}catch(c){console.log("taxonomy_term_create - "+c)}}function taxonomy_term_retrieve(a,b){try{services_resource_defaults(b,"taxonomy_term","retrieve"),entity_retrieve("taxonomy_term",a,b)}catch(c){console.log("taxonomy_term_retrieve - "+c)}}function taxonomy_term_update(a,b){try{services_resource_defaults(b,"taxonomy_term","update"),entity_update("taxonomy_term",null,a,b)}catch(c){console.log("taxonomy_term_update - "+c)}}function taxonomy_term_delete(a,b){try{services_resource_defaults(b,"taxonomy_term","delete"),entity_delete("taxonomy_term",a,b)}catch(c){console.log("taxonomy_term_delete - "+c)}}function taxonomy_term_index(a,b){try{services_resource_defaults(b,"taxonomy_term","index"),entity_index("taxonomy_term",a,b)}catch(c){console.log("taxonomy_term_index - "+c)}}function taxonomy_vocabulary_create(a,b){try{!a.machine_name&&a.name&&(a.machine_name=a.name.toLowerCase().replace(" ","_")),services_resource_defaults(b,"taxonomy_vocabulary","create"),entity_create("taxonomy_vocabulary",null,a,b)}catch(c){console.log("taxonomy_vocabulary_create - "+c)}}function taxonomy_vocabulary_retrieve(a,b){try{services_resource_defaults(b,"taxonomy_vocabulary","retrieve"),entity_retrieve("taxonomy_vocabulary",a,b)}catch(c){console.log("taxonomy_vocabulary_retrieve - "+c)}}function taxonomy_vocabulary_update(a,b){try{if(!a.machine_name||""==a.machine_name){var c="taxonomy_vocabulary_update - missing machine_name";return console.log(c),void(b.error&&b.error(null,406,c))}services_resource_defaults(b,"taxonomy_vocabulary","update"),entity_update("taxonomy_vocabulary",null,a,b)}catch(d){console.log("taxonomy_vocabulary_update - "+d)}}function taxonomy_vocabulary_delete(a,b){try{services_resource_defaults(b,"taxonomy_vocabulary","delete"),entity_delete("taxonomy_vocabulary",a,b)}catch(c){console.log("taxonomy_vocabulary_delete - "+c)}}function taxonomy_vocabulary_index(a,b){try{services_resource_defaults(b,"taxonomy_vocabulary","index"),entity_index("taxonomy_vocabulary",a,b)}catch(c){console.log("taxonomy_vocabulary_index - "+c)}}function taxonomy_get_tree(a,b,c,d,e){try{var b=arguments[1]?arguments[1]:0,c=arguments[2]?arguments[2]:null,d=arguments[3]?arguments[3]:!1;e.method="POST",e.path="taxonomy_vocabulary/getTree.json",e.service="taxonomy_vocabulary",e.resource="get_tree",e.data=JSON.stringify({vid:a,parent:b,max_depth:c,load_entities:d}),Drupal.services.call(e)}catch(f){console.log("taxonomy_get_tree - "+f)}}function user_create(a,b){try{services_resource_defaults(b,"user","create"),entity_create("user",null,a,b)}catch(c){console.log("user_create - "+c)}}function user_retrieve(a,b){try{services_resource_defaults(b,"user","retrieve"),entity_retrieve("user",a,b)}catch(c){console.log("user_retrieve - "+c)}}function user_update(a,b){try{var c="create";a.uid&&(c="update"),services_resource_defaults(b,"user",c),entity_update("user",null,a,b)}catch(d){console.log("user_update - "+d)}}function user_delete(a,b){try{services_resource_defaults(b,"user","create"),entity_delete("user",a,b)}catch(c){console.log("user_delete - "+c)}}function user_index(a,b){try{services_resource_defaults(b,"user","create"),entity_index("user",a,b)}catch(c){console.log("user_index - "+c)}}function user_register(a,b){try{Drupal.services.call({service:"user",resource:"register",method:"POST",path:"user/register.json",data:JSON.stringify(a),success:function(a){try{b.success&&b.success(a)}catch(c){console.log("user_register - success - "+c)}},error:function(a,c,d){try{b.error&&b.error(a,c,d)}catch(e){console.log("user_register - error - "+e)}}})}catch(c){console.log("user_retrieve - "+c)}}function user_login(a,b,c){try{var d=!0;if(a&&"string"==typeof a||(d=!1,console.log("user_login - invalid name")),b&&"string"==typeof b||(d=!1,console.log("user_login - invalid pass")),!d)return void(c.error&&c.error(null,406,"user_login - bad input"));Drupal.services.call({service:"user",resource:"login",method:"POST",path:"user/login.json",data:"username="+encodeURIComponent(a)+"&password="+encodeURIComponent(b),success:function(a){try{Drupal.user=a.user,Drupal.sessid=null,services_get_csrf_token({success:function(b){try{c.success&&system_connect({success:function(b){try{c.success&&c.success(a)}catch(d){console.log("user_login - system_connect - success - "+d)}},error:function(a,b,d){try{c.error&&c.error(a,b,d)}catch(e){console.log("user_login - system_connect - error - "+e)}}})}catch(d){console.log("user_login - services_get_csrf_token - success - "+d)}},error:function(a,b,d){console.log("user_login - services_get_csrf_token - error - "+d),c.error&&c.error(a,b,d)}})}catch(b){console.log("user_login - success - "+b)}},error:function(a,b,d){try{c.error&&c.error(a,b,d)}catch(e){console.log("user_login - error - "+e)}}})}catch(e){console.log("user_login - "+e)}}function user_logout(a){try{Drupal.services.call({service:"user",resource:"logout",method:"POST",path:"user/logout.json",success:function(b){try{Drupal.user=drupal_user_defaults(),Drupal.sessid=null,system_connect({success:function(c){try{a.success&&a.success(b)}catch(d){console.log("user_logout - system_connect - success - "+d)}},error:function(b,c,d){try{a.error&&a.error(b,c,d)}catch(e){console.log("user_logout - system_connect - error - "+e)}}})}catch(c){console.log("user_logout - success - "+c)}},error:function(b,c,d){try{a.error&&a.error(b,c,d)}catch(e){console.log("user_logout - error - "+e)}}})}catch(b){console.log("user_login - "+b)}}function user_request_new_password(a,b){try{"undefined"==typeof b.data&&(b.data={}),b.data.name=a,b.data=JSON.stringify(b.data),b.method="POST",b.path="user/request_new_password.json",b.service="user",b.resource="request_new_password",Drupal.services.call(b)}catch(c){console.log("user_request_new_password - "+c)}}var Drupal={};drupal_init();var module_invoke_results=null,module_invoke_continue=null;Drupal.services={},Drupal.services.call=function(a){try{if(a.debug=!1,!services_ready()){var b="Set the site_path and endpoint on Drupal.settings!";return void a.error(null,null,b)}module_invoke_all("services_preprocess",a);var c=new XMLHttpRequest,d=Drupal.settings.site_path+Drupal.settings.base_path+"?q=";"undefined"==typeof a.endpoint?d+=Drupal.settings.endpoint+"/":""!=a.endpoint&&(d+=a.endpoint+"/"),
d+=a.path;var e=a.method.toUpperCase();Drupal.settings.debug&&console.log(e+": "+d),c.onload=function(b){try{if(4==c.readyState){var f=c.status+" - "+c.statusText;if(200==c.status){Drupal.settings.debug&&console.log("200 - OK");var g=null,h=c.getResponseHeader("Content-Type");g=-1!=h.indexOf("application/json")?JSON.parse(c.responseText):c.responseText,module_invoke_all("services_request_pre_postprocess_alter",a,g),a.success(g),module_invoke_all("services_request_postprocess_alter",a,g),module_invoke_all("services_postprocess",a,g)}else{if(console.log(e+": "+d+" - "+f),Drupal.settings.debug&&(in_array(c.status,[403,503])||console.log(c.responseText),console.log(c.getAllResponseHeaders())),"undefined"!=typeof a.error){var i=c.responseText||"";i&&""!=i||(i=f),a.error(c,c.status,i)}module_invoke_all("services_postprocess",a,c)}}else console.log("Drupal.services.call - request.readyState = "+c.readyState)}catch(j){Drupal.settings.debug&&(console.log(e+": "+d+" - "+c.statusText),console.log(c.responseText),console.log(c.getAllResponseHeaders())),console.log("Drupal.services.call - onload - "+j)}},services_get_csrf_token({debug:a.debug,success:function(b){try{var f=!0;"undefined"!=typeof a.async&&a.async===!1&&(f=!1),c.open(e,d,f);var g=null;if("POST"==e?(g="application/json","user"==a.service&&"login"==a.resource&&(g="application/x-www-form-urlencoded")):"PUT"==e&&(g="application/json"),a.contentType&&(g=a.contentType),g&&c.setRequestHeader("Content-type",g),b&&c.setRequestHeader("X-CSRF-Token",b),"undefined"!=typeof a.data){if(Drupal.settings.debug){var h=!0;("user"==a.service&&in_array(a.resource,["login","create","update"])||"file"==a.service&&"create"==a.resource)&&(h=!1),h&&("object"==typeof a.data?console.log(JSON.stringify(a.data)):console.log(a.data))}c.send(a.data)}else c.send(null)}catch(i){console.log("Drupal.services.call - services_get_csrf_token - success - "+i)}},error:function(b,c,d){try{a.error&&a.error(b,c,d)}catch(e){console.log("Drupal.services.call - services_get_csrf_token - error - "+e)}}})}catch(b){console.log("Drupal.services.call - error - "+b)}};