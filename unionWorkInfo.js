var exports = {
	script: function (){
	// commented out so it just seeds to the next page
	/*
		// gives fuel_type name, table, fuel_type name, table and so on
		var initInfo = safe.qS('.style3').parentElement,
			info = safe.qSA('.style3, div>table', initInfo);
			
		for(var i=0; i<info.length; i+=2) {
			var fuel_type = info[i].innerText.replace(' Outage Schedule','').trim(),
				table_info =  safe.qS('table>tbody', info[i+1]),
				table_val = safe.qSA('tbody>tr:not(:first-child)', table_info),
				header1 = safe.qSA('tbody>tr>th', table_info),
				header = [];
			
			for(var h=0; h<header1.length; h++)	header.push(header1[h].innerText);
			
			for(var r=1; r<table_val.length; r++) {
				
				var item = safe.qSA('td',table_val[r]),
					entity = {source: location.href, timestamp: Date.now(), entityType: seed.entityType};
			
				for(var c=0; c<item.length; c++) {
					if(item[c].innerText) entity[header[c]] = item[c].innerText;
				}
				
				if(fuel_type) entity['fuel type'] = fuel_type;
				out.result(entity);
			}
		}
	*/
		var urls = safe.qSA('.link-text');
		for(var u=0; u<urls.length; u++) {
			if(urls[u].href) out.seed({value: urls[u].href, type:'url', parser:'unionworkInfo', entityType: seed.entityType, reqId: seed.reqId});
		}
	},
	useSeed: 'url'
};