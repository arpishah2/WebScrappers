var exports = {
	script: function (){
		var entity = {source: location.href, timestamp: Date.now(), entityType: seed.entityType},
			table_all = safe.qSA('.InfoTable'),
			tab1 = table_all[0],
			tab2 = table_all[1],
			plant_name = safe.qS('#PlantHeading').textContent;

		if(plant_name) entity['plant name'] = safe.tC(plant_name);
		
		if(tab1){
			var tab_val = safe.qSA('tbody>tr', tab1),
				key_tab1 = safe.qSA('td', tab_val[1]).length && safe.toArr(safe.qSA('td', tab_val[1])),
				val_tab1 = safe.qSA('td', tab_val[2]).length && safe.toArr(safe.qSA('td', tab_val[2]));

			if(tab_val[4]) key_tab1.push(tab_val[4]);
			if(tab_val[5]) val_tab1.push(tab_val[5]);
			
			for(var o=0; o<key_tab1.length; o++) {
				if(val_tab1[o] && key_tab1[o]){
					var z, key_tab1_new = key_tab1[o].innerText && key_tab1[o].innerText.trim().indexOf(':') === key_tab1[o].innerText.trim().length-1 ? !!(z=key_tab1[o].innerText.trim().split(':')) && safe.tC(z.splice(0,z.length-1).join(':')) : safe.tC(key_tab1[o].innerText);
					entity[key_tab1_new] = safe.tC(val_tab1[o].innerText);
				}
			}
		}

		if(tab2){
			var info_tab2 = safe.qSA('tbody>tr', tab2),
				key_tab2 = info_tab2[0].innerText, //header of big table
				val_tab2 = info_tab2[3], //inner table to fetch rows
				tab_rows = safe.qSA('td>table>tbody>tr', val_tab2), //all rows of inner table
				obj_imp = [];
			
			function str_to_html (str) {
				var el = document.createElement('div');
				el.innerHTML = str;
				return el;
			}
			
			for(var r=0; r<tab_rows.length; r++) { // all rows 
				var val_col_tab2 = safe.qSA('td', tab_rows[r]); //columns of 1 row
				for(var c=0; c<val_col_tab2.length; c++)  { //loop through cols
					var name =  safe.qS('a', val_col_tab2[c]).innerText,
						val = val_col_tab2[c].querySelector('#TradeBody2>div'),
						ob = {}, vals = [], values = undefined;
					
					if(name) ob.name = name;
					if(val) {
						values = val.innerHTML.split('<b>');
					
						for(var v=0; v<values.length; v++) vals.push(str_to_html('<b>'+ values[v]));
					
						for(var i=0; i<vals.length; i++) {
							var z, k = vals[i].querySelector('b'),
								v = vals[i].querySelector('div');

							var nk = k && k.innerText && k.innerText.trim().indexOf(':') === k.innerText.trim().length - 1 ? !!(z=k.innerText.trim().split(':')) && safe.tC(z.splice(0,z.length-1).join(':')) : safe.tC(k.innerText);

							if(nk && v && v.innerText) ob[nk] = v.innerText;
						}
						obj_imp.push(ob);
					}
				}
			}
			if(obj_imp.length) entity[key_tab2] = obj_imp;
		}

		out.result(entity);
	},
	useSeed: 'url'
};