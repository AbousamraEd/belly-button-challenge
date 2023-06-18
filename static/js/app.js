const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let Data = [];


d3.json(url).then(function(data) {
      console.log(data);
      for (n in data.names){
        d3.select ("#selDataset").append ('option').text(data.names[n]);
      }
      //d3.select ("#sample-metadata").append('id').text(data.metadata[0].id);
      Data = data;
      barPlot(data.names[0]);
      bubbleChart(data.names[0])
      demInfo(data.names[0])
  });
  
 // d3.selectAll("#selDataset").on("change", updatePlotly);
  
function barPlot (Subject){
    console.log(Data);
    let sub_data = Data.samples.find(sample => sample.id == Subject)

    values = sub_data.sample_values;
    ids = sub_data.otu_ids
    labels = sub_data.otu_labels

    svalues = values.slice(0,10).reverse()
    sids = ids.slice(0,10).map(otu =>  `OTU ` + otu).reverse(),
    slabels =labels.slice(0,10).reverse()

    var data1 = [
      {
        x: svalues,
        y: sids,
        type: 'bar',
        text: slabels,
        orientation: 'h'
      }]
    console.log(data1)

    Plotly.newPlot('bar', data1);
}

function optionChanged (value) {
  barPlot(value);
  bubbleChart(value);
  demInfo(value)
}

function bubbleChart (Subject){
  var trace1 = {
    x: ids,
    y: values,
    text: labels,
    mode: 'markers',
    marker: {
      size: values,
      color: ids
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Marker Size',
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot('bubble', data, layout);
  
}

function demInfo(Subject1){

  let sub_data1 = Data.metadata.find(metadata => metadata.id == Subject1)
  // console.log(sub_data1)
//   let info = `id: ${sub_data1.id}
//               Ethnicity: ${sub_data1.ethnicity}
//               Gender :${sub_data1.gender}
//               age: ${sub_data1.age}
//               location:${sub_data1.location}
//               bbtype:${sub_data1.bbtype}
//               wfreq: ${sub_data1.wfreq}`
// d3.select ("#sample-metadata").text(info);
  
let demInfo = d3.select("#sample-metadata").html("")

        let newInfo = demInfo.append("text")
        for (const [x,y] of Object.entries(sub_data1))
        {
            newInfo.append("small")
                   .text(`${x}: ${y}`, "br")
                   .append("br")
        }






}




