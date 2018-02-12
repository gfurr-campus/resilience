var w = 500,
	h = 500;

function equate(value,max){
	console.log(value,max);
	return value * max;
}

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = [];

var financial_data0 = null;
//findat().then(result => financial_data0 = result);
//console.log(findat());

//Data // read from fin_data_fb
//var financial_data0 = findat();
//console.log(financial_data0);
/*var financial_data0 = [
		  [{axis:"Axis 1",value:1000*Math.random(),school:"School A"},
		  {axis:"Primary Reserves Ratio",value:equate(Math.random(),Math.max(1000*Math.random(),1000*Math.random())),school:"School B"},
		  {axis:"Viability Ratio",value:equate(Math.random(),Math.max(1000*Math.random(),1000*Math.random())),school:"School C"}]
		];*/

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s

function drawWithData(target,index){ // chart = #chartA
	//var financial_data0 = findat();
	findat().then(result => financial_data0 = result);
	setTimeout(function(){
		//console.log(financial_data0);
		//console.log("It has been 10 seconds");
		//console.log(target,index);

	document.getElementById(target).style.opacity = 1;
	var all_div = document.createElement('DIV'); all_div.id = "all";
	var hr1 = document.createElement('hr'); all_div.appendChild(hr1);
	var all_button = document.createElement('button'); all_button.style.margin = "10px";
	var all_node = document.createTextNode('SHOW ALL'); all_button.appendChild(all_node); 
	all_button.className = "btn btn-primary"; all_div.appendChild(all_button);

	all_button.onclick = function(){;
		var x = document.getElementById("all");
		x.remove();
		drawWithData(target);
	}

	if(index != undefined){
		financial_data0.splice(index, 1);
	}

	for(var i = 0; i < financial_data0.length; i++){

		var data = financial_data0[i][0].school;
		var button = document.createElement('button'); button.style.margin = "10px";
		var node = document.createTextNode(data); button.appendChild(node);
		button.className = "btn btn-default "+data+" radar-chart-serie"+i;
		all_div.appendChild(button);
		//plot.id = "???";
		button.ondblclick = function(){
			var fid = this.classList[this.classList.length - 1];
            console.log(fid);
			var e = document.getElementById(fid);
			e.remove();

			var paras = document.getElementsByClassName(fid);

			while(paras[0]){
				paras[0].parentNode.removeChild(paras[0]);
			}

			buttons = document.getElementsByTagName('button');
			if(buttons.length < 5){
				(document.getElementById(target)).style.opacity = (document.getElementById(target)).style.opacity-0.50;
			}
		}

		button.onclick = function(){
			var fid = this.classList[this.classList.length - 1];
			var e = document.getElementById(fid);
			if(e.style.opacity.length == 0 || e.style.opacity == 1){
				this.style.opacity = 0.25;
				e.style.opacity = 0.10;
			}else{
				this.style.opacity = 1;
				e.style.opacity = 1;
			}
		}

		
		var all_elem = document.getElementById(target);
		all_elem.appendChild(all_div);

	}

	var hr2 = document.createElement('hr');
	all_div.appendChild(hr2);


	RadarChart.draw("#"+target, financial_data0, mycfg);

	for(var i = 0; i < document.getElementsByTagName('svg').length; i++){
		if(document.getElementsByTagName('svg')[i].id.length == 0){
			document.getElementsByTagName('svg')[i].id = "svg4"+target;
			break;
		}
	}


	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////

	var svg_f = d3.select('#chartA')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

	//Create the title for the legend
	var text_f = svg_f.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("How univerisities spend their money");

	//Initiate Legend	
	var legend_f = svg_f.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend_f.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend_f.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	
},1000)}
