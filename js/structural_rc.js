var k = []

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

  data =  [
    {"Info":"Weighted Average","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()},
    {"Info":"LEED Certifications","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()},
    {"Info":"Gross Square Footage","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()},
    {"Info":"Facilities Condition Index","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()},
    {"Info":"Average Building Age","School A": Math.random(),"School B": Math.random(),"School C": Math.random(),"School D": Math.random()}
  ];

  function createWithData(target, index){
    /*document.getElementById(target).style.opacity = 1;
    var alldiv = document.createElement('DIV'); alldiv.id = "all_cir";
    var hr3 = document.createElement('hr'); alldiv.appendChild(hr3);
    var allbutton = document.createElement('button'); allbutton.style.margin = "10px";
    var allnode = document.createTextNode('SHOW ALL'); allbutton.appendChild(allnode); allbutton.className = "btn btn-primary"; alldiv.appendChild(allbutton);

    allbutton.onclick = function(){;
    var y = document.getElementById("all");
    y.remove();
    createWithData(target);
    }

    if(index != undefined){
    data.splice(index, 1);
    }

    for(var i = 0; i < data.length; i++){
      console.log(data[i]);
      for(var j in data[i]){
        if(j != "Info"){
          var dataX = j;
          var buttX = document.createElement('button');
          buttX.style.margin = "10px";
          var nodeX = document.createTextNode(dataX);
          buttX.appendChild(nodeX);
        }
      }
      break;
    }*/

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Info"; }));

  data.forEach(function(d) {
    d.ages = color.domain().map(function(name) {
      return {name: name, population: +d[name]};
    });
  });

  var legend = d3.select("#chartB").append("svg")
      .attr("class", "legend")
      .attr("width", radius * 2)
      .attr("height", radius * 2)
    .selectAll("g")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  var svg = d3.select("#chartB").selectAll(".pie")
      .data(data)
    .enter().append("svg")
      .attr("class", "pie")
      .attr("width", radius * 2)
      .attr("height", radius * 2)
    .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

  svg.selectAll(".arc")
      .data(function(d) { return pie(d.ages); })
    .enter().append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

  svg.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.Info; });
    }
//});