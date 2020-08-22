//this function try to parse a string as a number
//round to two decimal
//if fail, return the original string
function numberParser(value){
    return (+value) ? parseFloat(value).toFixed(2) : value;
}


//this function parse a d3 file (data) and creates an html table
//anchored at the table_id <table id="table_id"> 
//using the specified columns.
var tabulate = function makeTable(data, columns, table_id) {

    var table = d3.select(table_id)
    var thead = table.append('thead')
    var tbody = table.append('tbody')

    thead.append('tr')
    .selectAll('th')
    .data(columns)
    .enter()
    .append('th')
    .html(function (d) { return d });
        
    var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr').attr('id',function (d){'t_'+'aa'+d.value+'aa'});
        
    var cells = rows.selectAll('td')
    .data(function(row) {return columns.map(function (column) {
        return { column: column, value: row[column] }}
        )})
    .enter()
    .append('td')
    .html(function (d) { 
        //console.log(d);
        if (d['column']=="Gene_acc"){
        return 'aa'+d.value+'aa'
        }
        else {return d.value}
        });
        
    return table;
}


//function to make a scatterplot

//inspirations
//example of volcano plots in d3
//https://bl.ocks.org/mbhall88/3eb7f295657d9fb81f039de6642727e0 (1)
//https://bl.ocks.org/timchu90/3da35bad73b69e1736fdb609ac6316e0 (2)

//example of functionality extension - grab nodes in brush
//http://bl.ocks.org/musically-ut/4747894 (3)
//brush in scatter plot 
//https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7 (4)

//brush + tooltip
//https://stackoverflow.com/questions/45826644/cannot-add-tooltip-to-zoomable-scatterplot-in-d3-v4 (5)
//copy paste this fiddle
//https://jsfiddle.net/gerardofurtado/5ja2ssa1/ (6)

//the starting point of this function is the fiddle (6) that comes from the stackoverflow
//question (5) that asked to fix the tooltip of (4)
//the main difficulties were:
//isolate multiple plots on the same page
//add crossfiltering functionlities between the plots and the table

//d3 read everithing as text, parseFloat is used to make sure to 
//pass numbers to the plot
function scaterPlot(data, selection, in_width, in_height, unique_id, x_col, y_col, intable){

    let margin = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 30};
      
    var width = in_width - margin.left - margin.right;
    var height = in_height - margin.top - margin.bottom;

    let x = d3.scaleLinear().range([0, width]).nice();
    let y = d3.scaleLinear().range([height, 0]);

    let xAxis = d3.axisBottom(x).ticks(10);
    let yAxis = d3.axisLeft(y).ticks(10);

    let brush = d3.brush().extent([
      [0, 0],
      [width, height]])
    .on("start", brushstarted)
    .on("end", brushended);


    var idleTimeout;
    let idleDelay = 350;
    
    //add unique identifier for svg
    let svg = d3.select('#'+selection)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //add unique identifier for clip
    var clip = svg.append("defs").append("svg:clipPath")
    .attr("id", unique_id+"clip")
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

    
    var xExtent = d3.extent(data, function(d) {
      return parseFloat(d[x_col]);
    });
    
    var yExtent = d3.extent(data, function(d) {
        return parseFloat(d[y_col]);
    });

    //tring to add more space to fit the circles 
    //at the boders -- needs rethinking -- 
    console.log('before: xExtent',xExtent,'yExtent',yExtent);
    //var XextentMax = Math.max.apply(null, xExtent.map(Math.abs));
    //var YextentMax = Math.max.apply(null, yExtent.map(Math.abs));
    
    if (xExtent[0] < 0){
        xExtent[0] = xExtent[0] - (xExtent[0]*0.05*-1)
    }
    else {
        xExtent[0] = xExtent[0] + xExtent[0]*0.05
    }

    if (xExtent[1] < 0){
        xExtent[1] = xExtent[1] - (xExtent[1]*0.05*-1)
    }
    else {
        xExtent[1] = xExtent[1] + xExtent[1]*0.05
    }


    if (yExtent[0] < 0){
        yExtent[0] = yExtent[0] - (yExtent[0]*0.05*-1)
    }
    else {
        yExtent[0] = yExtent[0] + yExtent[0]*0.05
    }

    if (yExtent[1] < 0){
        yExtent[1] = yExtent[1] - (yExtent[1]*0.05*-1)
    }
    else {
        yExtent[1] = yExtent[1] + yExtent[1]*0.05
    }


    console.log('after: xExtent',xExtent,'yExtent',yExtent);

    x.domain(xExtent).nice();
    y.domain(yExtent).nice();

    //add unique identifier for scatter plot
    let scatter = svg.append("g").attr("id", unique_id+"scatterplot")
    .attr("clip-path", "url(#"+unique_id+"clip"+")");

    scatter.append("g")
    .attr("class", "brush")
    .call(brush);

    
    scatter.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("id", function(d) {
        //hacky, i'm adding an id to each circle
        //but the id will be shared (and it should not) between 
        //different plots. this make easier the d3 selection
        //of the same gene between several plots
        //also i'm addding text (aa) in front and back of the Gene_acc
        //to make the datatable regex search to work better, ie
        //when i search 1 it would find any gene ids containing 1 (1,11,101)
        //by making the id aa1aa, the datatable search
        //will find the right one
        return 'aa'+d['Gene_acc']+'aa'
    })
    .attr("class", "dot")
    .attr("r", 4)
    .attr("cx", function(d) {
        return x(parseFloat(d[x_col]));
    })
    .attr("cy", function(d) {
        return y(parseFloat(d[y_col]));
    })
    .attr("opacity", 0.5)
    .style("fill", "#4292c6")
    .on('mouseover', d => {

        //this is too resource intensive for thousends of dots
        //consider to uncomments for small plots
        
        //d3.selectAll("circle")
        //.attr('stroke-width',0)
        //.transition()
        //.duration(200)
        //.style("opacity", 0.2);
        //intable.row("your selector here")
        //select the gene and show tooltip
        var selector = 'aa'+d['Gene_acc']+'aa';
        d3.selectAll("circle[id*='"+selector+"']")
        .style("stroke",'red')
        .style("opacity", 1)
        .attr("stroke-width",'5')
        .raise();

        tooltip.transition().duration(100).style('opacity', .9);
        tooltip.html(
            '<strong>' + 'Desc' + '</strong>: ' + d['Desc'] + '<br/>' +
            '<strong>' + 'Gene id' + '</strong>: ' + d['Gene_id'] + '<br/>' +
            '<strong>' + x_col + '</strong>: ' + d3.format('.2f')(d[x_col])+ '<br/>' +
            '<strong>' + y_col + '</strong>: ' + d3.format('.2f')(d[y_col])
        )
        .style('left', `${d3.event.pageX + 10}px`)
        .style('top', `${d3.event.pageY - -20}px`);
    })
    .on('mouseout', d => {

        //this is too resource intensive for thousends of dots
        //consider to uncomments for small plots
        //d3.selectAll("circle")
        //        .transition()
        //        .duration(1)
        //        .style("opacity", 1);

        var selector = 'aa'+d['Gene_acc']+'aa';
        d3.selectAll("circle[id*='"+selector+"']")
        .style("stroke",'')
        .style("opacity", 0.5)
        .attr("stroke-width",'');

        tooltip.transition()
        .duration(400)
        .style('opacity', 0);
    });

    // x axis
    svg.append("g")
    //.attr("class", "x axis")
    .attr('class', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
    
    svg.append("text")
    .style("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 8)
    .text(x_col);
    
    svg.append("g")
    //.attr("class", "y axis")
    .attr('class', "axis--y")
    .call(yAxis);
    
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text(y_col);



    //not used at the moment
    function brushstarted() {

    }
    
    function brushended() {
        var s = d3.event.selection;
        //if the brush is empty / resetted
        if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            x.domain(xExtent).nice();
            y.domain(yExtent).nice();
            //reset the datatable view
            intable.search( '' ).columns().search( '' ).draw();
        } else {
            
            let targetX1 = s[0][0];
            let targetY1 = s[0][1];
            let targetX2 = s[1][0];
            let targetY2 = s[1][1];
            const circles = d3.select('#'+selection).selectAll("circle").nodes();
            let selected = []
            
            //find the ids of the circles in the brush
            circles.forEach(element => {  
                curr_x = element.cx.baseVal.value; 
                curr_y = element.cy.baseVal.value; 

                // see if node is in the brush rectangle
                if (curr_x >= targetX1 && curr_x <= targetX2 && 
                    curr_y >= targetY1 && curr_y <= targetY2) {
                    //console.log(element.id);
                    selected.push(element.id);
                }
            });

            //use a regex to find all the nodes in the datatable
            intable.columns( 0 ).search(selected.join('|'),true,false).draw();
            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            scatter.select(".brush").call(brush.move, null);
        }
        zoom();
    }
    
    function idled() {
        idleTimeout = null;
    }
    
    function zoom() {
        var t = scatter.transition().duration(750);
        svg.select(".axis--x").transition(t).call(xAxis);
        svg.select(".axis--y").transition(t).call(yAxis);
        scatter.selectAll("circle").transition(t)
        .attr("cx", function(d) {
            return x(parseFloat(d[x_col]));
        })
        .attr("cy", function(d) {
            return y(parseFloat(d[y_col]));
        });
    }
}