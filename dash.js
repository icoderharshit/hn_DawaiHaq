const url =
  "https://api.covid19india.org/data.json";
fetch(url)
.then((resp) => resp.json()) // Transform the data into json
.then(function(data) {
    
    console.log(data.statewise[0])
    document.getElementById("deaths").innerHTML = data.statewise[0].deaths;
    document.getElementById("deathsnew").innerHTML = data.statewise[0].deltadeaths;
    document.getElementById("total").innerHTML = data.statewise[0].confirmed;
    document.getElementById("newcases").innerHTML = data.statewise[0].deltaconfirmed;
    document.getElementById("activecases").innerHTML = data.statewise[0].active;
    document.getElementById("recovered").innerHTML = data.statewise[0].recovered;

})
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  });