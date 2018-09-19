// WebTrends SmartSource Data Collector Tag
// Version: 9.4.0     
// Tag Builder Version: 4.1
// Created: 10/19/2012 3:54:44 PM
// Modified to contain Educational page tracking.


function WebTrends(){
	var that=this;
	// begin: user modifiable
	this.dcsid="dcsol4gx8u63fnzhnsm13i00w_6l8w";
	this.dcsProdDomains = [
    "bcbstx.com",
    "retailweb.hcsc.net",
    "shopbyprice.hcsc.net",
    "pages02.net"
  ];
  // Default the tag's domain to development.  If the current page matches
  //   a Production domain, switch to the production tagging domain.
  this.domain = "wtwtc.hcsc.net";
	for( var i = 0; i < this.dcsProdDomains.length; i++ ){
    if( document.domain.toLowerCase().indexOf(this.dcsProdDomains[i]) > -1 ){
      this.domain = "wt.hcsc.net";
    }
  }
	this.timezone=-6;
	this.onsitedoms="";
	this.downloadtypes="xls,doc,pdf,txt,csv,zip,exe";
	this.navigationtag="div,table";
	this.trackevents=true;
	this.trimoffsiteparams=true;
	this.enabled=true;
	this.i18n=false;
	this.paidsearchparams="gclid";
	this.splitvalue="";
	this.preserve=true;
	this.cookieTypes = "all";
	this.FPCConfig = {
		enabled: (this.cookieTypes === "all" || this.cookieTypes == "firstPartyOnly"),
		name: "WT_FPC",
		domain: "",
		expires: 63113851500
	};
	this.TPCConfig = {
		enabled: (this.cookieTypes === "all"),
		cfgType: (this.cookieTypes === "all") ? "":"1"
	};
  this.informedvisitthreshold=5;
	// end: user modifiable
	this.DCS={};
	this.WT={};
	this.DCSext={};
	this.images=[];
	this.index=0;

	this.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
	this.re=(function(){return(window.RegExp?(that.i18n?{"%25":/\%/g,"%26":/\&/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();
}
WebTrends.prototype.dcsGetId=function(){
  var sdcIP = "id=2";// Actual SDC IP: "172.29.17.145";
	if (this.dcsGetCookie(this.FPCConfig.name) &&
		this.dcsGetCookie(this.FPCConfig.name).indexOf(sdcIP) > -1){
		var epoch = new Date(1);
		document.cookie = this.fpc+"=0; expires="+epoch.toGMTString()+"; path=/;";
	}
	if (this.enabled&&(document.cookie.indexOf(this.FPCConfig.name+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)&&this.TPCConfig.enabled){
		document.write("<scr"+"ipt type='text/javascript' src='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+"/"+this.dcsid+"/wtid.js"+"'><\/scr"+"ipt>");
	}
}
WebTrends.prototype.setCookieTypes = function (types) {
	this.FPCConfig.enabled = (types === "all" || types == "firstPartyOnly");	
	this.TPCConfig.enabled = (types === "all");
	this.TPCConfig.cfgType = (types === "all") ? "":"1"
}
WebTrends.prototype.dcsGetCookie=function(name){
	var cookies=document.cookie.split("; ");
	var cmatch=[];
	var idx=0;
	var i=0;
	var namelen=name.length;
	var clen=cookies.length;
	for (i=0;i<clen;i++){
		var c=cookies[i];
		if ((c.substring(0,namelen+1))==(name+"=")){
			cmatch[idx++]=c;
		}
	}
	var cmatchCount=cmatch.length;
	if (cmatchCount>0){
		idx=0;
		if ((cmatchCount>1)&&(name==this.FPCConfig.name)){
			var dLatest=new Date(0);
			for (i=0;i<cmatchCount;i++){
				var lv=parseInt(this.dcsGetCrumb(cmatch[i],"lv"));
				var dLst=new Date(lv);
				if (dLst>dLatest){
					dLatest.setTime(dLst.getTime());
					idx=i;
				}
			}
		}
		return unescape(cmatch[idx].substring(namelen+1));
	}
	else{
		return null;
	}
}
WebTrends.prototype.dcsGetCrumb=function(cval,crumb,sep){
	var aCookie=cval.split(sep||":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
WebTrends.prototype.dcsGetIdCrumb=function(cval,crumb){
	var id=cval.substring(0,cval.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
WebTrends.prototype.dcsIsFpcSet=function(name,id,lv,ss){
	var c=this.dcsGetCookie(name);
	if (c){
		return ((id==this.dcsGetIdCrumb(c,"id"))&&(lv==this.dcsGetCrumb(c,"lv"))&&(ss==this.dcsGetCrumb(c,"ss")))?0:3;
	}
	return 2;
}
WebTrends.prototype.dcsDeleteCookie=function(name, path, domain) {	
	var cDelete = name + "=";
	cDelete += "; expires=expires=Thu, 01 Jan 1970 00:00:01 GMT";
	cDelete += "; path=" + path;
	cDelete += (domain) ? ";domain="+domain : "";		
	document.cookie = cDelete;
}
WebTrends.prototype.dcsFPC=function(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}

	if (!this.FPCConfig.enabled && !this.TPCConfig.enabled)
		this.WT["ce"] = "0"
	else if (this.FPCConfig.enabled && !this.TPCConfig.enabled)
		this.WT["ce"] = "1";
	else
		this.WT["ce"] = "2";

	if (!this.FPCConfig.enabled) {
		this.dcsDeleteCookie(this.FPCConfig.name, "/", this.FPCConfig.domain);
		return;
	}

	var WT=this.WT;
	var name=this.FPCConfig.name;
	var dCur=new Date();
	var adj=(dCur.getTimezoneOffset()*60000)+(this.timezone*3600000);
	dCur.setTime(dCur.getTime()+adj);
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	WT.co_f=WT.vtid=WT.vtvs=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
	if (document.cookie.indexOf(name+"=")==-1){
		if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
			WT.co_f=gWtId;
		}
		else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
			WT.co_f=gTempWtId;
			WT.vt_f="1";
		}
		else{
			WT.co_f="2";
			var curt=dCur.getTime().toString();
			for (var i=2;i<=(32-curt.length);i++){
				WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
			}
			WT.co_f+=curt;
			WT.vt_f="1";
		}
		if (typeof(gWtAccountRollup)=="undefined"){
			WT.vt_f_a="1";
		}
		WT.vt_f_s=WT.vt_f_d="1";
		WT.vt_f_tlh=WT.vt_f_tlv="0";
	}
	else{
		var c=this.dcsGetCookie(name);
		var id=this.dcsGetIdCrumb(c,"id");
		var lv=parseInt(this.dcsGetCrumb(c,"lv"));
		var ss=parseInt(this.dcsGetCrumb(c,"ss"));
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}
		WT.co_f=id;
		var dLst=new Date(lv);
		WT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			WT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
		}
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		}
	}
	WT.co_f=escape(WT.co_f);
	WT.vtid=(typeof(this.vtid)=="undefined")?WT.co_f:(this.vtid||"");
	WT.vtvs=(dSes.getTime()-adj).toString();
	var expiry= (this.FPCConfig.expires) ? "; expires="+ new Date(new Date().getTime() + (this.FPCConfig.expires)).toGMTString():"";
	var cur=dCur.getTime().toString();
	var ses=dSes.getTime().toString();
	document.cookie=name+"="+"id="+WT.co_f+":lv="+cur+":ss="+ses+expiry+"; path=/"+(((this.FPCConfig.domain!=""))?("; domain="+this.FPCConfig.domain):(""));
	var rc=this.dcsIsFpcSet(name,WT.co_f,cur,ses);
	if (rc!=0){
		WT.co_f=WT.vtvs=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
		if (typeof(this.vtid)=="undefined"){
			WT.vtid="";
		}
		WT.vt_f=WT.vt_f_a=rc;
    }
}
WebTrends.prototype.dcsIsOnsite=function(host){
	if (host.length>0){
	    host=host.toLowerCase();
	    if (host==window.location.hostname.toLowerCase()){
		    return true;
	    }
	    if (typeof(this.onsitedoms.test)=="function"){
		    return this.onsitedoms.test(host);
	    }
	    else if (this.onsitedoms.length>0){
		    var doms=this.dcsSplit(this.onsitedoms);
		    var len=doms.length;
		    for (var i=0;i<len;i++){
			    if (host==doms[i]){
			        return true;
			    }
		    }
	    }
	}
	return false;
}
WebTrends.prototype.dcsTypeMatch=function(pth, typelist){
	var type=pth.toLowerCase().substring(pth.lastIndexOf(".")+1,pth.length);
	var types=this.dcsSplit(typelist);
	var tlen=types.length;	
	for (var i=0;i<tlen;i++){
		if (type==types[i]){
			return true;
		}
	}
	return false;
}
WebTrends.prototype.dcsEvt=function(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e&&e.tagName&&(e.tagName.toLowerCase()!=tag.toLowerCase())){
		e=e.parentElement||e.parentNode;
	}
	return e;
}
WebTrends.prototype.dcsNavigation=function(evt){
	var id="";
	var cname="";
	var elems=this.dcsSplit(this.navigationtag);
	var elen=elems.length;	
	var i,e,elem;
	for (i=0;i<elen;i++){
		elem=elems[i];
		if (elem.length){
			e=this.dcsEvt(evt,elem);
			id=(e.getAttribute&&e.getAttribute("id"))?e.getAttribute("id"):"";
			cname=e.className||"";
			if (id.length||cname.length){
				break;
			}
		}
	}
	return id.length?id:cname;
}
WebTrends.prototype.dcsBind=function(event,func){
	if ((typeof(func)=="function")&&document.body){
		if (document.body.addEventListener){
			document.body.addEventListener(event, func.wtbind(this), true);
		}
		else if(document.body.attachEvent){
			document.body.attachEvent("on"+event, func.wtbind(this));
		}
	}
}
WebTrends.prototype.dcsET=function(){
	var e=(navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";
	this.dcsBind(e,this.dcsDownload);
  this.dcsBind(e,this.dcsDynamic);
	//this.dcsBind(e,this.dcsJavaScript);
	//this.dcsBind(e,this.dcsMailTo);
	this.dcsBind(e,this.dcsFormButton);
	this.dcsBind(e,this.dcsOffsite);
	//this.dcsBind(e,this.dcsAnchor);
	//this.dcsBind("contextmenu",this.dcsRightClick);
	this.dcsBind(e,this.dcsImageMap);
  //this.dcsBind(e,this.dcsAppendToLink);
}
WebTrends.prototype.dcsMultiTrack=function(){
	var args=dcsMultiTrack.arguments?dcsMultiTrack.arguments:arguments,
      timeDelay = 250;
	if (args.length%2==0){
	    this.dcsSaveProps(args);
		this.dcsSetProps(args);
		var dCurrent=new Date();
		this.DCS.dcsdat=dCurrent.getTime();
		this.dcsFPC();
		this.dcsTag();
		this.dcsRestoreProps();
    this.dcsPauseBrowser(timeDelay);
	}
}

WebTrends.prototype.dcsCleanUp=function(){
	this.DCS={};
	this.WT={};
	this.DCSext={};
	if (arguments.length%2==0){
		this.dcsSetProps(arguments);
	}
}
WebTrends.prototype.dcsSetProps=function(args){
	for (var i=0;i<args.length;i+=2){
		if (args[i].indexOf('WT.')==0){
			this.WT[args[i].substring(3)]=args[i+1];
		}
		else if (args[i].indexOf('DCS.')==0){
			this.DCS[args[i].substring(4)]=args[i+1];
		}
		else if (args[i].indexOf('DCSext.')==0){
			this.DCSext[args[i].substring(7)]=args[i+1];
		}
	}
}
WebTrends.prototype.dcsSaveProps=function(args){
	var i,x,key,param;
	if (this.preserve){
		this.args=[];
		for (i=0,x=0;i<args.length;i+=2){
			param=args[i];
			if (param.indexOf('WT.')==0){
				key=param.substring(3);
				this.args[x]=param;
				this.args[x+1]=this.WT[key]||"";
				x+=2;
			}
			else if (param.indexOf('DCS.')==0){
				key=param.substring(4);
				this.args[x]=param;
				this.args[x+1]=this.DCS[key]||"";
				x+=2;
			}
			else if (param.indexOf('DCSext.')==0){
				key=param.substring(7);
				this.args[x]=param;
				this.args[x+1]=this.DCSext[key]||"";
				x+=2;
			}
		}
	}
}
WebTrends.prototype.dcsRestoreProps=function(){
	if (this.preserve){
		this.dcsSetProps(this.args);
		this.args=[];
	}
}
WebTrends.prototype.dcsSplit=function(list){
	var items=list.toLowerCase().split(",");
	var len=items.length;
	for (var i=0;i<len;i++){
		items[i]=items[i].replace(/^\s*/,"").replace(/\s*$/,"");
	}
	return items;
}
// Code section for appending cookie values to links.
// Currently unused.  Leaving code as a template for potential functionality
//    updates in the future.
WebTrends.prototype.dcsAppendToLink=function(evt){
    evt=evt||(window.event||"");
    var alreadyLinked = this.dcsGetCookie("Linked");
    if( alreadyLinked === null ){
        var vtbCookie = this.dcsGetCookie("VisitsSinceQuote");
        if ( vtbCookie!==null && evt && ((typeof(evt.which)!=="number")||((evt.which===1)||(evt.which===2))) ){
            var e = this.dcsEvt(evt,"A"); 
            if (e.href){
                var hn = e.hostname?(e.hostname.split(":")[0]):"";
                if ( hn.indexOf("osc.hscil.com") > -1 && document.domain.match(/bcbs\w\w(\.com|-uat|-stg)/) !== null ){
                    var qry = e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
                    qry += "&VisitsToBCBS="+vtbCookie;
                    e.search = (qry.indexOf('&')===0)?qry.substring(1):qry;
                    this.dcsSetSessionCookie("Linked", 1);
                }
            }
        }
    }
    var recentSource = this.dcsGetCookie("source");
    if( recentSource !== null ){
        var e = this.dcsEvt(evt,"A");
        if (e.href){
            var hn = e.hostname?(e.hostname.split(":")[0]):"";
            if ( hn.indexOf("osc.hscil.com") > -1 && document.domain.match(/bcbs\w\w(\.com|-uat|-stg)/) !== null ){
                var qry = e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
                qry += "&source="+recentSource;
                e.search = (qry.indexOf('&')===0)?qry.substring(1):qry;
            }
        }
    }
}
// Code section for Track clicks to download links.
WebTrends.prototype.dcsDownload=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    if (this.dcsIsOnsite(hn)&&this.dcsTypeMatch(e.pathname,this.downloadtypes)){
		        var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
		        var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
		        var ttl="";
		        var text=document.all?e.innerText:e.text;
		        var img=this.dcsEvt(evt,"IMG");
		        if (img.alt){
			        ttl=img.alt;
		        }
		        else if (text){
			        ttl=text;
		        }
		        else if (e.innerHTML){
			        ttl=e.innerHTML;
		        }
		        this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry",e.search||"","WT.ti","Download:"+ttl,"WT.dl","20","WT.nv",this.dcsNavigation(evt));
		        this.DCS.dcssip=this.DCS.dcsuri=this.DCS.dcsqry=this.WT.ti=this.WT.dl=this.WT.nv="";
        }
		}
	}
}
// Code section for Track right clicks to download links.
WebTrends.prototype.dcsRightClick=function(evt){
	evt=evt||(window.event||"");
	if (evt){
		var btn=evt.which||evt.button;
		if ((btn!=1)||(navigator.userAgent.indexOf("Safari")!=-1)){
			var e=this.dcsEvt(evt,"A");
			if ((typeof(e.href)!="undefined")&&e.href){
				if ((typeof(e.protocol)!="undefined")&&e.protocol&&(e.protocol.indexOf("http")!=-1)){
					if ((typeof(e.pathname)!="undefined")&&this.dcsTypeMatch(e.pathname,this.downloadtypes)){
						var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
						var hn=e.hostname?(e.hostname.split(":")[0]):"";
						this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry","","WT.ti","RightClick:"+pth,"WT.dl","25");
					}
				}
			}
		}
	}
}
// Code section for Track clicks to MailTo links.
WebTrends.prototype.dcsMailTo = function(evt) {
    evt = evt || (window.event || "");
    if (evt && ((typeof (evt.which) != "number") || (evt.which == 1))) {
        var e = this.dcsEvt(evt, "A");
        if (e.href && e.protocol) {
            var qry = e.search ? e.search.substring(e.search.indexOf("?") + 1, e.search.length) : "";
            if (e.protocol.toLowerCase() == "mailto:") {
                this.dcsMultiTrack("DCS.dcssip", window.location.hostname, "DCS.dcsuri", e.href, "WT.ti", "MailTo:" + e.innerHTML, "WT.dl", "23", "WT.nv", this.dcsNavigation(evt));
            }
        }
    }
}
// Code section for Track clicks to JavaScript links.
WebTrends.prototype.dcsJavaScript = function(evt) {
    evt = evt || (window.event || "");
    if (evt && ((typeof (evt.which) != "number") || (evt.which == 1))) {
        var e = this.dcsEvt(evt, "A");
        if (e.href && e.protocol) {
            var qry = e.search ? e.search.substring(e.search.indexOf("?") + 1, e.search.length) : "";
            if (e.protocol.toLowerCase() == "javascript:") {
                this.dcsMultiTrack("DCS.dcssip", window.location.hostname, "DCS.dcsuri", e.href, "WT.ti", "JavaScript:" + e.innerHTML, "WT.dl", "22", "WT.nv", this.dcsNavigation(evt));
            }
        }
    }
}
// Code section for Track clicks to dynamic links.
WebTrends.prototype.dcsDynamic=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href&&e.protocol){
			var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
			if (e.protocol=="javascript:"){
				this.dcsMultiTrack("DCS.dcssip","","DCS.dcsuri",e.href,"WT.ti","JavaScript:"+e.innerHTML,"WT.dl","22","WT.nv",this.dcsNavigation(evt));
				this.DCS.dcssip=this.DCS.dcsuri=this.WT.ti=this.WT.cl=this.WT.nv="";
			}
			else if (e.protocol=="mailto:"){
				this.dcsMultiTrack("DCS.dcssip","","DCS.dcsuri",e.href,"WT.ti","MailTo:"+e.innerHTML,"WT.dl","23","WT.nv",this.dcsNavigation(evt));
			}
		}
	}
}
// Code section for Track form button clicks.
WebTrends.prototype.dcsFormButton=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var tags=["INPUT","BUTTON"];
		for (var j=0;j<tags.length;j++){
			var e=this.dcsEvt(evt,tags[j]);
			var type=e.type||"";
			if (type&&((type=="submit")||(type=="image")||(type=="button")||(type=="reset"))||((type=="text")&&((evt.which||evt.keyCode)==13))){
				var uri="";
				var ttl="";
				var id=0;
				if (e.form){
					// begin: field capture
					// end: field capture
					uri=e.form.action||window.location.pathname;
					ttl=e.form.id||e.form.name||e.form.className||"Unknown";
					id=(e.form.method&&(e.form.method.toLowerCase()=="post"))?"27":"26";
				}
				else{
					uri=window.location.pathname;
					ttl=e.name||e.id||"Unknown";
					id=(tags[j].toLowerCase()=="input")?"28":"29";
				}
				if (uri&&ttl&&(evt.keyCode!=9)){
					this.dcsMultiTrack("DCS.dcsuri",uri,"WT.ti","FormButton:"+ttl,"WT.dl",id,"WT.nv",this.dcsNavigation(evt));
				}
				break;
			}
		}
	}
}
// Code section for Track clicks to links leading offsite.
WebTrends.prototype.dcsOffsite=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    var pr=e.protocol||"";
		    if ((hn.length>0)&&(pr.indexOf("http")==0)&&!this.dcsIsOnsite(hn)){
			    var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
			    var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
			    this.dcsMultiTrack("DCS.dcssip", hn, "DCS.dcsuri", pth, "DCS.dcsqry", this.trimoffsiteparams ? "" : qry, "DCS.dcsref", window.location, "WT.ti", "Offsite:" + hn + pth + (qry.length ? ("?" + qry) : ""), "WT.dl", "24", "WT.nv", this.dcsNavigation(evt));
		    }
		}
	}
}

// Code section for Track clicks to links that contain anchors.
WebTrends.prototype.dcsAnchor=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    if (this.dcsIsOnsite(hn)&&e.hash&&(e.hash!="")&&(e.hash!="#")){
		        var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
			    var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
			    this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",escape(pth+e.hash),"WT.ti","Anchor:"+e.hash,"WT.dl","21","WT.nv",this.dcsNavigation(evt));
		    }
		}
	}
}
// Code section for clicks to image maps.
WebTrends.prototype.dcsImageMap=function(evt){
	evt=evt||(window.event||"");
	if (evt){
		var e=this.dcsEvt(evt,"AREA");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    if ((hn!="")&&e.protocol&&(e.protocol.indexOf("http")!=-1)){
			    var ttl="";
			    var map=this.dcsEvt(evt,"MAP");
			    if (map){
			        if (map.name){
				        ttl=map.name;
			        }
			        else if (map.id){
				        ttl=map.id;
			        }
			    }
			    var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
			    this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry",e.search||"","WT.ti","ImageMap:"+ttl,"WT.dl","30","WT.nv",this.dcsNavigation(evt));
		    }			
		}			
	}
}
WebTrends.prototype.dcsAdv=function(){
	if (this.trackevents&&(typeof(this.dcsET)=="function")){
		if (window.addEventListener){
			window.addEventListener("load",this.dcsET.wtbind(this),false);
		}
		else if (window.attachEvent){
			window.attachEvent("onload",this.dcsET.wtbind(this));
		}
	}
	this.dcsFPC();
}
WebTrends.prototype.dcsVar=function(){
	var dCurrent=new Date();
	var WT=this.WT;
	var DCS=this.DCS;
	WT.tz=parseInt(dCurrent.getTimezoneOffset()/60*-1)||"0";
	WT.bh=dCurrent.getHours()||"0";
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		if (window.RegExp){
			var tire=new RegExp("^"+window.location.protocol+"//"+window.location.hostname+"\\s-\\s");
			WT.ti=document.title.replace(tire,"");
		}
		else{
			WT.ti=document.title;
		}
	}
	WT.js="Yes";
	WT.jv=(function(){
		var agt=navigator.userAgent.toLowerCase();
		var major=parseInt(navigator.appVersion);
		var mac=(agt.indexOf("mac")!=-1);
		var ff=(agt.indexOf("firefox")!=-1);
		var ff0=(agt.indexOf("firefox/0.")!=-1);
		var ff10=(agt.indexOf("firefox/1.0")!=-1);
		var ff15=(agt.indexOf("firefox/1.5")!=-1);
		var ff20=(agt.indexOf("firefox/2.0")!=-1);
		var ff3up=(ff&&!ff0&&!ff10&!ff15&!ff20);
		var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
		var nn4=(nn&&(major==4));
		var nn6up=(nn&&(major>=5));
		var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
		var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
		var ie5up=(ie&&!ie4);
		var op=(agt.indexOf("opera")!=-1);
		var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
		var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
		var op7up=(op&&!op5&&!op6);
		var jv="1.1";
		if (ff3up){
			jv="1.8";
		}
		else if (ff20){
			jv="1.7";
		}
		else if (ff15){
			jv="1.6";
		}
		else if (ff0||ff10||nn6up||op7up){
			jv="1.5";
		}
		else if ((mac&&ie5up)||op6){
			jv="1.4";
		}
		else if (ie5up||nn4||op5){
			jv="1.3";
		}
		else if (ie4){
			jv="1.2";
		}
		return jv;
	})();
	WT.ct="unknown";
	if (document.body&&document.body.addBehavior){
		try{
			document.body.addBehavior("#default#clientCaps");
			WT.ct=document.body.connectionType||"unknown";
			document.body.addBehavior("#default#homePage");
			WT.hp=document.body.isHomePage(location.href)?"1":"0";
		}
		catch(e){
		}
	}
	if (document.all){
		WT.bs=document.body?document.body.offsetWidth+"x"+document.body.offsetHeight:"unknown";
	}
	else{
		WT.bs=window.innerWidth+"x"+window.innerHeight;
	}
	WT.fv=(function(){
		var i,flash;
		if (window.ActiveXObject){
			for(i=15;i>0;i--){
				try{
					flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
					return i+".0";
				}
				catch(e){
				}
			}
		}
		else if (navigator.plugins&&navigator.plugins.length){
			for (i=0;i<navigator.plugins.length;i++){
				if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
					return navigator.plugins[i].description.split(" ")[2];
				}
			}
		}
		return "Not enabled";
	})();
	WT.slv=(function(){
		var slv="Not enabled";
		try{     
			if (navigator.userAgent.indexOf('MSIE')!=-1){
				var sli = new ActiveXObject('AgControl.AgControl');
				if (sli){
					slv="Unknown";
				}
			}
			else if (navigator.plugins["Silverlight Plug-In"]){
				slv="Unknown";
			}
		}
		catch(e){
		}
		if (slv!="Not enabled"){
			var i,m,M,F;
			if ((typeof(Silverlight)=="object")&&(typeof(Silverlight.isInstalled)=="function")){
				for(i=9;i>0;i--){
					M=i;
					if (Silverlight.isInstalled(M+".0")){
							break;
					}
					if (slv==M){
						break;
					}
				}
				for (m=9;m>=0;m--){
					F=M+"."+m;
					if (Silverlight.isInstalled(F)){
						slv=F;
						break;
					}
					if (slv==F){
						break;
					}
				}
			}
		}
		return slv;
	})();
	if (this.i18n){
		if (typeof(document.defaultCharset)=="string"){
			WT.le=document.defaultCharset;
		} 
		else if (typeof(document.characterSet)=="string"){
			WT.le=document.characterSet;
		}
		else{
			WT.le="unknown";
		}
	}
	WT.tv="9.4.0";
	//WT.sp=this.splitvalue;
	WT.dl="0";
	WT.ssl=(window.location.protocol.indexOf('https:')==0)?"1":"0";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	WT.es=DCS.dcssip+DCS.dcsuri;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
	}
	if (DCS.dcsqry){
		var dcsqry=DCS.dcsqry.toLowerCase();
		var params=this.paidsearchparams.length?this.paidsearchparams.toLowerCase().split(","):[];
		for (var i=0;i<params.length;i++){
			if (dcsqry.indexOf(params[i]+"=")!=-1){
				WT.srch="1";
				break;
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=window.document.referrer;
      // STRATIGENT - Logic to accommodate Google Organic search phrase tracking
      var refMatch = DCS.dcsref.match(/http(s|):\/\/([^\/]*)(\/[^\?]*)(\?[^\#]*|)(\#.*|)/);
      if( refMatch !== null &&
          (refMatch[2].indexOf("www.google.") === 0 ||
           refMatch[2].indexOf("www.googleadservices.com") === 0) ){
        if( DCS.dcsref.indexOf("&q=") === -1 ){
          DCS.dcsref += ((refMatch[4] === "") ? "?" : "&") + "q=Search%20phrase%20not%20provided"
        } else if( DCS.dcsref.indexOf("&q=&") > -1 ){
          DCS.dcsref = DCS.dcsref.replace(/\&q=&/,"&q=Search%20phrase%20not%20provided&");
        }
      }
		}
	}

	DCS["dcscfg"] = this.TPCConfig.cfgType;
	
}
WebTrends.prototype.dcsEscape=function(S, REL){
	if (REL!=""){
		S=S.toString();
		for (var R in REL){
 			if (REL[R] instanceof RegExp){
				S=S.replace(REL[R],R);
 			}
		}
		return S;
	}
	else{
		return escape(S);
	}
}
WebTrends.prototype.dcsA=function(N,V){
	if (this.i18n&&(this.exre!="")&&!this.exre.test(N)){
		if (N=="dcsqry"){
			var newV="";
			var params=V.substring(1).split("&");
			for (var i=0;i<params.length;i++){
				var pair=params[i];
				var pos=pair.indexOf("=");
				if (pos!=-1){
					var key=pair.substring(0,pos);
					var val=pair.substring(pos+1);
					if (i!=0){
						newV+="&";
					}
					newV+=key+"="+this.dcsEncode(val);
				}
			}
			V=V.substring(0,1)+newV;
		}
		else{
			V=this.dcsEncode(V);
		}
	}
	return "&"+N+"="+this.dcsEscape(V, this.re);
}
WebTrends.prototype.dcsEncode=function(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}
WebTrends.prototype.dcsCreateImage=function(dcsSrc){
	if (document.images){
		this.images[this.index]=new Image();
		this.images[this.index].src=dcsSrc;
		this.index++;
	}
  else{
		document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	}
}
WebTrends.prototype.dcsMeta=function(){
	var elems;
	if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	else if (document.all){
		elems=document.all.tags("meta");
	}
	if (typeof(elems)!="undefined"){
		var length=elems.length;
		for (var i=0;i<length;i++){
			var name=elems.item(i).name;
			var content=elems.item(i).content;
			var equiv=elems.item(i).httpEquiv;
			if (name.length>0){
				if (name.toUpperCase().indexOf("WT.")==0){
					this.WT[name.substring(3)]=content;
				}
				else if (name.toUpperCase().indexOf("DCSEXT.")==0){
					this.DCSext[name.substring(7)]=content;
				}
				else if (name.toUpperCase().indexOf("DCS.")==0){
					this.DCS[name.substring(4)]=content;
				}
			}
		}
	}
}
WebTrends.prototype.dcsTag=function(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var WT=this.WT;
	var DCS=this.DCS;
	var DCSext=this.DCSext;
	var i18n=this.i18n;
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+(this.dcsid==""?'':'/'+this.dcsid)+"/dcs.gif?";
	if (i18n){
		WT.dep="";
	}
	for (var N in DCS){
 		if (DCS[N]&&(typeof DCS[N]!="function")){
			P+=this.dcsA(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]&&(typeof WT[N]!="function")){
			P+=this.dcsA("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]&&(typeof DCSext[N]!="function")){
			if (i18n){
				WT.dep=(WT.dep.length==0)?N:(WT.dep+";"+N);
			}
			P+=this.dcsA(N,DCSext[N]);
		}
	}
	if (i18n&&(WT.dep.length>0)){
		P+=this.dcsA("WT.dep",WT.dep);
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	this.dcsCreateImage(P);
	this.WT.ad="";
}
WebTrends.prototype.dcsDebug=function(){
	var t=this;
	var i=t.images[0].src;
	var q=i.indexOf("?");
	var r=i.substring(0,q).split("/");
	var m="<b>Protocol</b><br><code>"+r[0]+"<br></code>";
	m+="<b>Domain</b><br><code>"+r[2]+"<br></code>";
	m+="<b>Path</b><br><code>/"+r[3]+"/"+r[4]+"<br></code>";
	m+="<b>Query Params</b><code>"+i.substring(q+1).replace(/\&/g,"<br>")+"</code>";
	m+="<br><b>Cookies</b><br><code>"+document.cookie.replace(/\;/g,"<br>")+"</code>";
	if (t.w&&!t.w.closed){
		t.w.close();
	}
	t.w=window.open("","dcsDebug","width=500,height=650,scrollbars=yes,resizable=yes");
	t.w.document.write(m);
	t.w.focus();
}
//
// BEGIN: Code section for Educational Pages tracking
//
WebTrends.prototype.dcsProviderParse=function(){ 
   if( /provider\//.test(document.location) && 
       !/provider\/index.htm/.test(document.location) ) 
   { 
      var WT = this.WT; 
      WT.seg_1 = "Provider"; 
   } 
} 

WebTrends.prototype.dcsEducationalParse=function(){ 
   var edu_meta = document.getElementsByName('WT.z_educational'); 
   if( edu_meta.length > 0) 
   { 
      var cookie_name = "EducationalPages"; 
      var cookie_start = document.cookie.indexOf(cookie_name + "="); 
      var tally = 1; 
 
      if( cookie_start != -1 ) 
      { 
         cookie_start += cookie_name.length + 1; 
         var cookie_end = document.cookie.indexOf(";",cookie_start); 
         if( cookie_end == -1){ 
            cookie_end = document.cookie.length;} 
         tally = parseInt(unescape(document.cookie.substring(cookie_start,cookie_end)))+1; 
      } 
 
      document.cookie = cookie_name + "=" + tally + "; path=/;";

      if( tally >= this.informedvisitthreshold )
      {
         this.WT.z_informedvisit = 1;
      }
      
      this.WT.z_informedvisitcount = tally;
   } 
}
//
// END: Code section for Educational Pages tracking
//
// BEGIN: Code section for quote retail cycle tracking
//
WebTrends.prototype.dcsRetailCookieManagement = function(){
    var scenarioName = this.WT.si_n,
        scenarioStep = this.WT.si_x;
    if( typeof scenarioName !== "undefined" && typeof scenarioStep !== "undefined" ){
        var vsqCookie = this.dcsGetCookie("VisitsSinceQuote"),
            fqdCookie = this.dcsGetCookie("FirstQuoteDate"),
            scenarioNames = scenarioName.split(';'),
            scenarioSteps = scenarioStep.split(';'),
            retailCookiesExist = vsqCookie !== null && fqdCookie !== null, i, shopIndex = -1;
        for( i = 0; i < scenarioNames.length && shopIndex === -1 ; i++ ){
            if( scenarioNames[i] === "Shop" ){
                shopIndex = i;
            }
        }
        if( shopIndex !== -1 ){
            if( scenarioSteps[shopIndex] === "10" ){
                // Shop converted, pass cookies if they exist
                if( retailCookiesExist ){
                    var vtbCookie = this.dcsGetCookie("VisitsToBCBS"), currentVTB = (vtbCookie !== null) ? parseInt(vtbCookie) : 0,
                        vfbCookie = this.dcsGetCookie("VisitsFromBCBS"), currentVFB = (vfbCookie !== null) ? parseInt(vfbCookie) : 0,
                        currentVSQ = parseInt(vsqCookie);
                    this.WT.z_firstquotedate = fqdCookie;
                    this.WT.z_visitstosubmit = (currentVSQ + currentVTB - currentVFB)+"";
                    var today = new Date();
                    this.WT.z_submitdate = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();
                    var fqdPieces = this.WT.z_firstquotedate.split('/');
                    this.WT.z_daystosubmit = parseInt((today - new Date(parseInt(fqdPieces[2]),parseInt(fqdPieces[0])-1,parseInt(fqdPieces[1])))/(1000*60*60*24))+"";
                    this.dcsClearRetailCookies(true);
                }
            } else if( scenarioSteps[shopIndex] === "2" ){
                // Quote converted, set cookies if a quote was not already stored
                if( !retailCookiesExist ){
                    this.dcsSetRetailCookies(false);
                }
            }
        }
    }
    // Identify whether this view is part of an IFRAME cookie
    // transaction or represents a real page view.  
    // If real, check whether it is a new visit and identify if cookie
    // updates should be made on the Hallmark side.
    // If an IFRAME view, parse the quote date information and create
    // the appropriate cookies.
    var iframeParam = this.dcsParseQueryParameter("IFRAME");
    if( iframeParam === null ){
        // Check whether or not this view is the start of a new visit
        this.dcsCheckNewVisit();
        var vtbParam = this.dcsParseQueryParameter("VisitsToBCBS");
        if( document.domain.indexOf("osc.hscil.com") > -1 &&
            vtbParam !== null ){
            this.dcsUpdateHallmarkCookies(vtbParam);
        }
    } else {// The view is from an IFRAME to initialize cookies
        var fqdParam = this.dcsParseQueryParameter("FirstQuoteDate");
        if( fqdParam !== null ){
            this.dcsSetRetailCookies(true);
        } else {// Must be a CLEAR request
            this.dcsClearRetailCookies(false);
        }
    }
    // If the view was from an IFRAME cookie transaction, this will be
    // used to restrict dcsTag from firing and counting the page.
    return (iframeParam === null);
};

// Helper function to check whether or not a page view is a new visit
WebTrends.prototype.dcsCheckNewVisit = function(){
    var cvCookie = this.dcsGetCookie("CurrentVisit"),
        vsqCookie = this.dcsGetCookie("VisitsSinceQuote");
    if( cvCookie === null && vsqCookie !== null ){
        this.dcsSetPersistentCookie("VisitsSinceQuote", parseInt(vsqCookie)+1);
    }
    this.dcsSetSessionCookie("CurrentVisit", "1");
};

// Helper function to remove all of the retail cookies when a submission occurs
WebTrends.prototype.dcsClearRetailCookies = function(clearOtherDomain){
    this.dcsClearCookie("FirstQuoteDate");
    this.dcsClearCookie("VisitsSinceQuote");
    this.dcsClearCookie("VisitsFromBCBS");
    this.dcsClearCookie("VisitsToBCBS");
    if( clearOtherDomain ){
        var IFrame = document.createElement("IFRAME"),
            url = "https://www.bcbs"+document.location.pathname.substring(1,3).toLowerCase()+".com/?CLEAR=1&IFRAME=1";
        IFrame.setAttribute('src', url);
        IFrame.style.width="0px";
        IFrame.style.height="0px";
        IFrame.style.visibility="hidden";

        document.body.appendChild(IFrame);
    }
};

// Helper function to manage cookies on the Hallmark site 
WebTrends.prototype.dcsUpdateHallmarkCookies = function(vtbParam){
    var vfbCookie = this.dcsGetCookie("VisitsFromBCBS"), currentVFB = ( vfbCookie === null ) ? 0 : parseInt(vfbCookie),
        currentVTB = ( vtbCookie === null ) ? 0 : parseInt(vtbCookie);
    this.dcsSetPersistentCookie("VisitsToBCBS", currentVTB);
    this.dcsSetPersistentCookie("VisitsFromBCBS", currentVFB+1);
};

// Helper function to set the Retail Cycle cookies
WebTrends.prototype.dcsSetRetailCookies = function(isIFrameVisit){
    this.dcsSetPersistentCookie("VisitsSinceQuote", 0);
    var today = new Date(),
        todayString = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();
    this.dcsSetPersistentCookie("FirstQuoteDate", todayString);
    if( document.domain.indexOf("osc.hscil.com") > -1 ){
        this.dcsSetPersistentCookie("VisitsFromBCBS", 0);
        this.dcsSetPersistentCookie("VisitsToBCBS", 0);
    }
    this.dcsSetSessionCookie("CurrentVisit", "1");
    if( !isIFrameVisit ){
        // !!!Add logic around selecting the appropriate page depending on current domain!!!
        var URL = "",
            bcbsDomainMatch = document.domain.match(/bcbs\w\w(\.com|-uat|-stg)/),
            hallmarkDomainMatch = document.domain.match(/(test-|)osc.hscil.com/);
        if( hallmarkDomainMatch !== null ){
            var stateCode = document.location.pathname.substring(1,3).toLowerCase()
            URL = (hallmarkDomainMatch[1] === "") ? "http://www.bcbs"+stateCode+".com/" : "http://bcbs"+stateCode+"-stg.fyiblue.com/index.html";
        } else if( bcbsDomainMatch !== null ){
            var bcbsIndex = document.domain.indexOf("bcbs"),
                stateCode = document.domain.substring(bcbsIndex+4, bcbsIndex+6);
            URL = ((bcbsDomainMatch[1] === ".com") ? "https://" : "https://test-") + "osc.hscil.com/"+stateCode+"/";
        }
        this.dcsManageCrossDomain(URL, todayString);
    }
};

// Instantiate and load an invisible IFrame on another domain to pass cookie information
// instantly.
WebTrends.prototype.dcsManageCrossDomain = function(url, firstQuoteDate){
    if( url !== "" ){
        var IFrame = document.createElement("IFRAME");
        url += ((url.indexOf('?') > 0) ? '&' : '?') + "FirstQuoteDate=" + firstQuoteDate + "&IFRAME=1";
        IFrame.setAttribute('src', url);
        IFrame.style.width="0px";
        IFrame.style.height="0px";
        IFrame.style.visibility="hidden";

        document.body.appendChild(IFrame);
    }
};

// Helper function to parse out a query parameter's value from the URL.
WebTrends.prototype.dcsParseQueryParameter = function(queryParam){
    var queryStringParameters = document.location.search.substring(1).split('&'),
        i, numParams = queryStringParameters.length;
    for( i=0; i<numParams; i++ ){
        currentPair = queryStringParameters[i];
        if( currentPair.indexOf('=') > -1 ){
            nameValueArray = currentPair.split('=');
            if( nameValueArray[0] === queryParam ){
                return nameValueArray[1];
            }
        }
    }
    return null
};

// Helper function to set a session cookie that expires more closely in accordance with WT sessionization
WebTrends.prototype.dcsSetSessionCookie = function(name, value) {
    var currentDate = new Date();
	var expirationDate = new Date(currentDate.getTime()+1800000);
    var newCookie = name+"="+value+"; expires="+expirationDate.toGMTString()+"; path=/;";
    document.cookie = newCookie;
};

// Helper function to set a persistent cookie that lasts 10 years
WebTrends.prototype.dcsSetPersistentCookie = function(name, value) {
    var currentDate = new Date();
	var expirationDate = new Date(currentDate.getTime()+315360000000);
    var newCookie = name+"="+value+"; expires="+expirationDate.toGMTString()+"; path=/;";
    document.cookie = newCookie;
};

// Helper function to clear a cookie from the browser
WebTrends.prototype.dcsClearCookie = function(name){
    document.cookie = name+"=0; path=/; expires=Thu, 01-Jan-1970 00:00:01 GMT";
};

// Function to append the appropriate cookie information to any Hallmark links on the page
WebTrends.prototype.dcsAppendToHallmarkLinks = function(){
    var vtbCookie = this.dcsGetCookie("VisitsSinceQuote");
    if ( vtbCookie!==null ){
        var links = document.links;
        if (links!==null){
            var numLinks = links.length, i, currentLink;
            for( i=0; i<numLinks; i++ ){
                currentLink = links[i],currentHREF = currentLink.href;
                if ( currentHREF.indexOf("osc.hscil.com") > -1 && document.domain.match(/bcbs\w\w(\.com|-uat|-stg)/) !== null ){
                    currentLink.href += ((currentHREF.indexOf('?') > -1) ? '&' : '?')+"VisitsToBCBS="+vtbCookie;
                }
            }
        }
    }
};
//
// END: Code section for quote retail cycle tracking
//
//
// BEGIN: Code section for 'source' parameter propagation
//
WebTrends.prototype.dcsSetCookie=function(name,value,duration,domain){
    var currentDate = new Date();
	  var expirationDate = new Date(currentDate.getTime()+duration);
    var newCookie = name+"="+value+"; expires="+expirationDate.toGMTString()+"; domain="+domain+"; path=/;";
    document.cookie = newCookie;
};
WebTrends.prototype.dcsRemoveCookie=function(name,domain){
    var currentDate = new Date();
	  var expirationDate = new Date(currentDate.getTime()-100000);
    var newCookie = name+"=; expires="+expirationDate.toGMTString()+"; domain="+domain;
    document.cookie = newCookie;
};
WebTrends.prototype.dcsStoreSource=function(){
    var recentSource = this.dcsParseQueryParameter("source");
    if( recentSource !== null ){
        var docDomain = document.domain,
            domainMatch = docDomain.match(/bcbs\w\w(\.com|-uat|-stg)/),
            domain = domainMatch !== null ? docDomain.substring(docDomain.indexOf(domainMatch[0])) : docDomain;
        if( domain !== docDomain ){
          this.dcsRemoveCookie("source","");
        }
        this.dcsRemoveCookie("source",domain);
        this.dcsSetCookie("source",recentSource,2592000000,domain);
    }
    recentSource = (recentSource === null) ? this.dcsGetCookie("source") : recentSource;
    if( recentSource !== null ){
        var links = document.links;
        if (links!==null){
            var numLinks = links.length, i, currentLink;
            for( i=0; i<numLinks; i++ ){
                currentLink = links[i],currentHREF = currentLink.href;
                if ( (currentHREF.indexOf("osc.hscil.com") > -1 || currentHREF.match(/shopbyprice(|-uat|-qa)\.hcsc\.net/) !== null || currentHREF.match(/retailweb(|-uat|-qa)\.hcsc\.net/) !== null) && document.domain.match(/bcbs\w\w(\.com|-uat|-stg)/) !== null ){
                    currentLink.href += ((currentHREF.indexOf('?') > -1) ? '&' : '?')+"source="+recentSource;
                }
            }
        }
    }
};
//
// END: Code section for 'source' parameter propagation
//
WebTrends.prototype.dcsPauseBrowser=function(delay){
    var date=new Date();
    var curDate=null;
    do {curDate=new Date();}
    while( curDate.getTime() - date.getTime() < delay );
};
WebTrends.prototype.dcsCollect=function(){
    if (this.enabled){
        this.dcsVar();
        this.dcsMeta();
        this.dcsAdv();
        if (typeof(this.dcsCustom)=="function"){
          this.dcsCustom();
        }
        this.dcsEducationalParse();
        this.dcsProviderParse();
        this.dcsStoreSource();
        if( this.dcsRetailCookieManagement() ){
            this.dcsTag();
            this.dcsAppendToHallmarkLinks();
        }
    }
}

function dcsMultiTrack(){
	if (typeof(_tag)!="undefined"){
		return(_tag.dcsMultiTrack());
	}
}

function dcsDebug(){
	if (typeof(_tag)!="undefined"){
		return(_tag.dcsDebug());
	}
}

Function.prototype.wtbind = function(obj){
	var method=this;
	var temp=function(){
		return method.apply(obj,arguments);
	};
	return temp;
}

function getAge(nodes, m, d, y) {
	var currentDate = new Date();
	var cur_month = currentDate.getMonth()+1;
	var cur_day = currentDate.getDate();
	var cur_year = currentDate.getFullYear();

	var dob_month = +(nodes[m].value);
	var dob_day = +(nodes[d].value);
	var dob_year = +(nodes[y].value);
	
	var age = cur_year - dob_year;
	
	if( (dob_month < cur_month) ||
	    ((dob_month === cur_month) && (dob_day < cur_day)) ) {
		age = age-1;
	}
	
	return age+"";
}

function getAges() {
	var ages = getAge(document.getElementById("primary").childNodes, 5, 7, 9);
	if( document.getElementById("has_spouse").checked ) {
		ages += ";"+getAge(document.getElementById("spouse").childNodes, 3, 5, 7);
	}
	if( document.getElementById("has_dependents").checked ) {
		var num_dependents = document.getElementById("dependentCount").value;
		for( var i=1; i <= num_dependents; i++) {
			ages += ";"+getAge(document.getElementById("child_"+i).childNodes[0].childNodes, 1, 2, 3);

		}
	}
	
	return ages;
}

function getFamilySize() {
	var family_size = 1;
	if( document.getElementById("has_spouse").checked ) {
		family_size++;
	}
	if( document.getElementById("has_dependents").checked ) {
		family_size += document.getElementById("dependentCount").value;
	}
	
	return family_size;
}

function getGender(nodes, g) {
	if( nodes[g].value === "M" ) {
		return "Male";
	} else if( nodes[g].value === "F" ) {
		return "Female";
	} else {
		return "";
	}
}

function getGenders() {
	var genders = getGender(document.getElementById("primary").childNodes, 3);
	if( document.getElementById("has_spouse").checked ) {
		genders += ";"+getGender(document.getElementById("spouse").childNodes, 1);
	}
	if( document.getElementById("has_dependents").checked ) {
		var num_dependents = document.getElementById("dependentCount").value;
		for( var i=1; i <= num_dependents; i++) {
			genders += ";"+getGender(document.getElementById("child_"+i).childNodes[0].childNodes, 0);

		}
	}
	
	return genders;
}

function dcsCollectUserInfo() {
	dcsMultiTrack('WT.z_familysize',getFamilySize(),'WT.z_sex',getGenders(),'WT.z_age',getAges(),'WT.z_userstatus','Customer');

	var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate.getTime() - date.getTime() < 500);
}