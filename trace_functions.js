        var show1Orbit = true;
        //plot current ISS position
        var plotCircle = function(){
            $(".curCircle").remove();
            $("#iss").remove();
            svg.append("circle") //test circle for selecting point
               .attr("cx", projection(current.coords)[0]) //x-longitude
               .attr("cy", projection(current.coords)[1]) //y-latitude
               .attr("r", 2) 
               .attr("class", "curCircle")
               .attr("style", "stroke: blue; stroke-width: 8; fill: #000000");
            svg.append("svg:image")
                .attr("x", projection(current.coords)[0])
                .attr("y", projection(current.coords)[1])
                .attr('width', 65)
                .attr('height', 35)
                .attr("id", "iss")
                .attr('xlink:href', "images/iss.gif");
            $("#iss").on("click", function() {console.log("A tweet was clicked.")});
            
            };
        function moveCircle() {
            svg.select('.curCircle')
                .attr("cx", projection(current.coords)[0])
                .attr("cy", projection(current.coords)[1]);
            svg.select('#iss')
                .attr("x", projection(current.coords)[0])
                .attr("y", projection(current.coords)[1]);

        }
        //plot current ISS orbit trace for current day
        var plotDayTrace = function(){
            $(".dayCircle").remove();
            svg.selectAll('circle')
                .data(orbitArr[$('#days').val()])
                .enter()
                .append("circle")
                .attr("r", 2)
                .attr("class", "dayCircle")
                .attr("transform", function(d) { 
                    return "translate(" + projection(d.coords) + ")";
                })
                .attr("data-coords", function(d){
                    return d.coords;
                })
                .style("fill", 'red');
            plotCircle();
        };
        //plot current ISS orbit trace for current orbit
        var plotCurOrbit = function(){
            $(".curOrbitCircle").remove();
            svg.selectAll('circle')
                .data(orbitData[current.id].orbit.coordinates)
                .enter()
                .append("circle")
                .attr("r", 2)
                .attr("class", "curOrbitCircle")
                .attr("transform", function(d) { 
                    return "translate(" + projection(d) + ")";
                })
                .attr("data-coords", function(d){
                    return d;
                })
                .style("fill", 'red');
            plotCircle();
        };
        function showDay() {
            show1Orbit = false;
            $('#showDay').hide();
            $('#showOrbits').show();
            $(".curOrbitCircle").remove();
            plotDayTrace();
        }
        function showOrbit() {
            show1Orbit = true;
            $('#showOrbits').hide();
            $('#showDay').show();
            $(".dayCircle").remove();
            plotCurOrbit();
        }