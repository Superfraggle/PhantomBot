(function(){var e=$script,i=false,n=false,t=[],s=[];function r(e,i,n){this.scriptFile=e;this.script=i;this.enabled=n;if(e.indexOf("./core/")>-1){this.enabled=true}this.getModuleName=function(){return this.scriptFile.replace(/([a-z]+)\.js$/i,"$1")}}function o(e,i,n){this.scriptFile=e;this.hook=i;this.handler=n}function a(e){Packages.com.gmt2001.Console.out.println(java.util.Objects.toString(e))}function c(){var e,i=function(e){var i=["getClass","equals","notify","class","hashCode","toString","wait","notifyAll"],n;for(n in i){if(i[n]==e){return true}}return false},n=function(e,i){return function(){var n=[$script];for(var t=0;t<arguments.length;t++){n.push(arguments[t])}e[i].save(e,n)}};for(e in $api){if(i(e)){continue}if(typeof $api[e]=="function"){$[e]=n($api,e)}else{$[e]=$api[e]}}}function l(e,i,n){if(!d(e)||i){try{var s=$api.loadScriptR($script,e),o;if(!$.inidb.exists("modules",e)){o=true;$.setIniDbBoolean("modules",e,o)}else{o=$.getIniDbBoolean("modules",e)}t.push(new r(e,s,o));if(!n){a("Loaded module: "+e.replace(/\.\//g,"")+" ("+(o?"Enabled":"Disabled")+")")}}catch(c){a('Failed loading "'+e+'": '+c);if(d("./core/logging.js")){$.logError("init.js",70,"(loadScript, "+e+") "+c)}}}}function u(e,i){if(e.substring($.strlen(e)-1).equalsIgnoreCase("/")){e=e.substring(0,$.strlen(e)-1)}var n=$.findFiles("./scripts/"+e,""),t;for(t=0;t<n.length;t++){if(e.equalsIgnoreCase(".")){if(n[t].equalsIgnoreCase("util")||n[t].equalsIgnoreCase("lang")||n[t].equalsIgnoreCase("init.js")||n[t].equalsIgnoreCase("dev")){continue}}if($.isDirectory("./scripts/"+e+"/"+n[t])){u(e+"/"+n[t],i)}else{l(e+"/"+n[t],false,i)}}}function f(e){var i;for(i in t){if(t[i].scriptFile.equalsIgnoreCase(e)){return i}}return-1}function g(e){var i=f(e);if(i>-1){return t[i].enabled}return false}function d(e){return f(e)>-1}function p(e){var i=f(e);if(i>-1){return t[i]}return null}function m(e,i){var n;for(n in s){if(s[n].scriptFile.equalsIgnoreCase(e)&&s[n].hook.equalsIgnoreCase(i)){return n}}return-1}function h(e,i){var n=$script.getPath().replace("\\","/").replace("./scripts/",""),t=m(n,e);if(t>-1){s[t].handler=i}else{s.push(new o(n,e,i))}}function C(e){var i=$script.getPath().replace("\\","/").replace("./scripts/",""),n=m(i,e);if(n>-1){s.splice(n,1)}}function w(e,i,n){var t;for(t in s){if(s[t].hook.equalsIgnoreCase(e)&&(g(s[t].scriptFile)||n)){try{s[t].handler(i)}catch(r){$.logError("init.js",173,"(hook.call, "+e+", "+s[t].scriptFile+") "+r)}}}}function b(){c();l("./core/misc.js");l("./core/jsTimers.js");l("./core/fileSystem.js");l("./core/lang.js");l("./core/logging.js");l("./core/commandRegister.js");l("./core/whisper.js");l("./core/chatModerator.js");l("./core/commandCoolDown.js");l("./core/gameMessages.js");l("./core/patternDetector.js");l("./core/permissions.js");l("./core/streamInfo.js");l("./core/pointSystem.js");l("./core/ranks.js");l("./core/timeSystem.js");$.logEvent("init.js",285,"Core loaded, initializing bot...");u(".");$api.on($script,"ircChannelMessage",function(e){a($.username.resolve(e.getSender().toLowerCase(),e.getTags())+": "+e.getMessage());if(e.getSender().equalsIgnoreCase("jtv")||e.getSender().equalsIgnoreCase("twitchnotify")){w("ircPrivateMessage",e,false)}else{w("ircChannelMessage",e,false)}});$api.on($script,"ircJoinComplete",function(e){i=true;$.channel=e.getChannel()});$api.on($script,"ircChannelUserMode",function(e){if(!i){return}if(e.getChannel().getName().equalsIgnoreCase($.channelName)){if(e.getUser().equalsIgnoreCase($.botName)&&e.getMode().equalsIgnoreCase("o")){if(e.getAdd()){if(!n){a("Bot ready!")}n=true}}}});$api.on($script,"command",function(e){var i=e.getSender().toLowerCase(),n=e.getTags(),t=e.getCommand().toLowerCase(),s,r;if(!$.isModv3(i,n)&&$.commandPause.isPaused()){$.say($.whisperPrefix(i)+$.lang.get("commandpause.isactive"));return}if($.inidb.exists("aliases",t)){e.setCommand($.inidb.get("aliases",t))}r=e.getCommand().toLowerCase();if(r.indexOf("!!")>-1&&!$.commandExists(r)){$.say($.whisperPrefix(i)+$.lang.get("cmd.404",r));return}if(!$.permCom(i,r)){$.say($.whisperPrefix(i)+$.lang.get("cmd.noperm",$.getUserGroupName(i),r));return}if(!$.isAdmin(i)){s=$.coolDown.get(r,i);if(s>0){$.say($.whisperPrefix(i)+$.lang.get("cooldown.active",r,$.getTimeString(s/1e3)));return}}if(g("./core/pointsSystem.js")&&!$.isModv3(i,e.getTags())&&$.inidb.exists("pricecom",r)){if($.getUserPoints(i)<$.getCommandPrice(r)){$.say($.whisperPrefix(i)+$.lang.get("cmd.needpoints",$.getPointsString($.inidb.get("pricecom",r))));return}if(parseInt($.inidb.get("pricecom",r))>0){$.inidb.decr("points",i,$.inidb.get("pricecom",r))}}w("command",e,false)});$api.on($script,"consoleInput",function(e){w("consoleInput",e,true)});$api.on($script,"twitchFollow",function(e){w("twitchFollow",e,true)});$api.on($script,"twitchUnfollow",function(e){w("twitchUnfollow",e,true)});$api.on($script,"twitchFollowsInitialized",function(e){w("twitchFollowsInitialized",e,true)});$api.on($script,"twitchHosted",function(e){w("twitchHosted",e,true)});$api.on($script,"twitchUnhosted",function(e){w("twitchUnhosted",e,true)});$api.on($script,"twitchHostsInitialized",function(e){w("twitchHostsInitialized",e,true)});$api.on($script,"twitchSubscribe",function(e){w("twitchSubscribe",e,true)});$api.on($script,"twitchUnsubscribe",function(e){w("twitchUnsubscribe",e,true)});$api.on($script,"twitchSubscribesInitialized",function(e){w("twitchSubscribesInitialized",e,true)});$api.on($script,"ircChannelJoin",function(e){w("ircChannelJoin",e,true)});$api.on($script,"ircChannelLeave",function(e){w("ircChannelLeave",e,true)});$api.on($script,"ircChannelUserMode",function(e){w("ircChannelUserMode",e,true)});$api.on($script,"ircConnectComplete",function(e){w("ircConnectComplete",e,true)});$api.on($script,"ircJoinComplete",function(e){w("ircJoinComplete",e,true)});$api.on($script,"ircPrivateMessage",function(e){w("ircPrivateMessage",e,false)});$api.on($script,"musicPlayerConnect",function(e){w("musicPlayerConnect",e,false)});$api.on($script,"musicPlayerCurrentId",function(e){w("musicPlayerCurrentId",e,false)});$api.on($script,"musicPlayerCurrentVolume",function(e){w("musicPlayerCurrentVolume",e,false)});$api.on($script,"musicPlayerDisconnect",function(e){w("musicPlayerDisconnect",e,false)});$api.on($script,"musicPlayerState",function(e){w("musicPlayerState",e,false)});$.logEvent("init.js",534,"Bot locked & loaded!");$.consoleLn("Bot locked & loaded!");h("initReady",function(){$.registerChatCommand("./init.js","reconnect",2);$.registerChatCommand("./init.js","module",1)});w("initReady",null,true)}$api.on(e,"command",function(e){var i=e.getSender().toLowerCase(),n=$.username.resolve(i,e.getTags()),s=e.getCommand(),r=e.getArgs(),o=r[0],a,c;if(s.equalsIgnoreCase("reconnect")){if(!$.isModv3(i,e.getTags())){$.say($.whisperPrefix(i)+$.modMsg);return}$.logEvent("init.js",354,n+" requested a reconnect!");$.connmgr.reconnectSession($.hostname);$.say($.lang.get("init.reconnect"))}if(s.equalsIgnoreCase("module")){if(!$.isAdmin(i)){$.say($.whisperPrefix(i)+$.adminMsg);return}if(!o){$.say($.whisperPrefix(i)+$.lang.get("init.module.usage"));return}if(o.equalsIgnoreCase("list")){a=[];for(c in t){if(t[c].enabled){a.push(t[c].getModuleName())}}$.say($.whisperPrefix(i)+$.lang.get("init.module.list",a.length,a.join(", ")))}if(o.equalsIgnoreCase("enable")){a=r[1];if(!a){$.say($.whisperPrefix(i)+$.lang.get("init.module.usage"));return}if(a.indexOf("./core/")>-1||a.indexOf("./lang/")>-1){return}c=f(a);if(c>-1){$.logEvent("init.js",393,n+' enabled module "'+t[c].scriptFile+'"');t[c].enabled=true;$.setIniDbBoolean("modules",t[c].scriptFile,true);$.say($.whisperPrefix(i)+$.lang.get("init.module.enabled",t[c].getModuleName()))}else{$.say($.whisperPrefix(i)+$.lang.get("init.module.404"))}}if(o.equalsIgnoreCase("disable")){a=r[1];if(!a){$.say($.whisperPrefix(i)+$.lang.get("init.module.usage"));return}if(a.indexOf("./core/")>-1||a.indexOf("./lang/")>-1){return}c=f(a);if(c>-1){$.logEvent("init.js",393,n+' disabled module "'+t[c].scriptFile+'"');t[c].enabled=false;$.setIniDbBoolean("modules",t[c].scriptFile,false);$.say($.whisperPrefix(i)+$.lang.get("init.module.disabled",t[c].getModuleName()))}else{$.say($.whisperPrefix(i)+$.lang.get("init.module.404"))}}if(o.equalsIgnoreCase("status")){a=r[1];if(!a){$.say($.whisperPrefix(i)+$.lang.get("init.module.usage"));return}c=f(a);if(c>1){if(t[c].enabled){$.say($.whisperPrefix(i)+$.lang.get("init.module.check.enabled",t[c].getModuleName()))}else{$.say($.whisperPrefix(i)+$.lang.get("init.module.check.disabled",t[c].getModuleName()))}}else{$.say($.whisperPrefix(i)+$.lang.get("init.module.404"))}}}});$.consoleLn=a;$.bind=h;$.unbind=C;$.bot={loadScript:l,loadScriptRecursive:u,isModuleLoaded:d,isModuleEnabled:g,getModule:p};b()})();