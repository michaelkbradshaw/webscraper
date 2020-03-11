

var empProm = d3.json("employee.json")

empProm.then(function(empList)
{
    console.log("empList",empList);

    var shortList = empList.slice(0,2);
    console.log("short",shortList);
},
function(err)
{
    console.log("error",err);
}
)


var displayData = function(emps)
{
    var divs = d3.select("body")
      .selectAll("div")
        .data(emps)
        .enter()
      .append("div");






}
