var exports = {
	script: function (){
		var entity = {source: location.href, timestamp: Date.now(), entityType: seed.entityType},
			info = safe.qSA('.outage');
		
		for(var i=0; i<info.length; i++) { 
		// This is commented out because the name given on this page are regions, not the actual plant name, 
		//	which is given on the detail page, along with the rest of the data on this page	
		//	therefore, we can just seed to the detail page and we'll get the same info
		/*
			var website = safe.qS('.outage-link>a', info[i]).href,
				name = safe.qS('.outage-link', info[i]).innerText,
				outage_dates = safe.qS('.outage-dates', info[i]).innerText;
			
			if(website) entity.link = website;
			if(name) entity.name = name;
			if(outage_dates) entity['outage dates'] = outage_dates;
			
			out.result(entity);
		*/
			var website = safe.qS('.outage-link>a', info[i]).href;
			if(website) out.seed({value: website, type:'url', parser:'unionworkInfoCalendar', entityType: seed.entityType, reqId: seed.reqId});
		}
	},
	useSeed: 'url'
};