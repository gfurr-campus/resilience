var radius = 150,
    padding = 10;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 30);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

/*  structural_data0 =  [
    {"Info":"Weighted Average","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()},
    {"Info":"LEED Certifications","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()},
    {"Info":"Gross Square Footage","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()},
    {"Info":"Facilities Condition Index","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()},
    {"Info":"Average Building Age","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()}
  ]; */

  structural_data0 =  [
    {"Info":"School A","Weighted Average":Math.random(),"LEED Certifications":Math.random(),"Gross Square Footage":Math.random(),"Facilities Condition Index":Math.random(),"Average Building Age":Math.random()},
    {"Info":"School B","Weighted Average":Math.random(),"LEED Certifications":Math.random(),"Gross Square Footage":Math.random(),"Facilities Condition Index":Math.random(),"Average Building Age":Math.random()},
    {"Info":"School C","Weighted Average":Math.random(),"LEED Certifications":Math.random(),"Gross Square Footage":Math.random(),"Facilities Condition Index":Math.random(),"Average Building Age":Math.random()},
    {"Info":"School D","Weighted Average":Math.random(),"LEED Certifications":Math.random(),"Gross Square Footage":Math.random(),"Facilities Condition Index":Math.random(),"Average Building Age":Math.random()},
    {"Info":"School E","Weighted Average":Math.random(),"LEED Certifications":Math.random(),"Gross Square Footage":Math.random(),"Facilities Condition Index":Math.random(),"Average Building Age":Math.random()},
    {"Info":"School F","Weighted Average":Math.random(),"LEED Certifications":Math.random(),"Gross Square Footage":Math.random(),"Facilities Condition Index":Math.random(),"Average Building Age":Math.random()}
  ];

  var structural_data = JSON.parse(JSON.stringify( structural_data0 ));

  function createWithData(target, index){

    for(var i = 0; i < structural_data.length; i++){
        if(structural_data[i].ages){
          delete structural_data[i].ages;
        }
    }

    document.getElementById(target).style.opacity = 1;
    var alldiv = document.createElement('DIV'); alldiv.id = "all_cir";
    var hr3 = document.createElement('hr'); alldiv.appendChild(hr3);
    var allbutton = document.createElement('button'); allbutton.style.margin = "10px";
    var allnode = document.createTextNode('SHOW ALL'); allbutton.appendChild(allnode); 
    allbutton.className = "btn btn-primary"; alldiv.appendChild(allbutton);

    allbutton.onclick = function(){;
      structural_data = JSON.parse(JSON.stringify( structural_data0 ));
      d3.select("#chartB").selectAll("*").remove();
      createWithData(target);
    }

    if(index != undefined){
      for(var i = 0; i < structural_data.length; i++){
        for(var j in structural_data[i]){
          if(j == index){
            delete structural_data[i][j];
          }
        }
      }
    }

    for(var i = 0; i < structural_data.length; i++){
      for(var j in structural_data[i]){
        var data = j;
        data = data.replace(" ","_");
        if(j != "Info"){
          var dataX = j;
          var buttX = document.createElement('button');
          buttX.style.margin = "10px";
          var nodeX = document.createTextNode(dataX);
          buttX.appendChild(nodeX);
          buttX.className = "btn btn-default "+data;
          buttX.ondblclick = function(){
            var fid = this.classList[this.classList.length - 1];
            var e = document.getElementById(fid);

            var paras = document.getElementsByClassName(fid);

            d3.select("#chartB").selectAll("*").remove();
            createWithData(target,fid.replace("_"," "));

            buttons = document.getElementsByTagName('button');
            if(buttons.length < 5){
              (document.getElementById(target)).style.opacity = (document.getElementById(target)).style.opacity-0.50;
            }
          }
          buttX.onclick = function(){
            var fid = this.classList[this.classList.length - 1];
            var e = document.getElementsByClassName(fid);
            for(var i = 0; i < e.length; i++){
              if(e[i].style.opacity.length == 0 || e[i].style.opacity == 1){
                this.style.opacity = 0.25;
                e[i].style.opacity = 0.10;
              }else{
                this.style.opacity = 1;
                e[i].style.opacity = 1;
              }
            }
          }
          alldiv.appendChild(buttX);
        }
      }
      break;
    }
    var hr4 = document.createElement('hr'); alldiv.appendChild(hr4);
    var allelem = document.getElementById(target);
    allelem.appendChild(alldiv);

  color.domain(d3.keys(structural_data[0]).filter(function(key) { return key !== "Info"; }));

  structural_data0.forEach(function(d) {
    d.ages = color.domain().map(function(name) {
      return {name: name, population: +d[name]};
    });
  });

  var legend_s = d3.select("#chartB").append("svg")
      .attr("class", "legend")
      .attr("width", radius * 2)
      .attr("height", radius * 2)
    .selectAll("g")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend_s.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend_s.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  var svg_s = d3.select("#chartB").selectAll(".pie")
      .data(structural_data0)
    .enter().append("svg")
      .attr("class", "pie")
      .attr("width", radius * 2)
      .attr("height", radius * 2)
    .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

  svg_s.selectAll(".arc")
      .data(function(d) { return pie(d.ages); })
    .enter().append("path")
      .attr("class",function(d){
        //console.log(d);
        var name = (d.data.name).replace(" ","_");
        return "arc "+name;
      })
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

  svg_s.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.Info; });
    }
//});