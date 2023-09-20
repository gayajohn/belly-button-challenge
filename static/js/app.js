// setting the url variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// populate dropdown menu with subject IDs
d3.json(url).then(function(data){
    let subjectIDs = data.names;
    let dropdown = d3.select('#selDataset');
    subjectIDs.map(function(item){
        dropdown.append("option").attr("value", item).text(item);
    }) 
});


// function to initialize webpage with first subjectID's data
function init(data){
    // calling the chart functions with the first dataset
    updateMetadata(data.metadata[0]);
    updateGaugeChart(data.metadata[0]);
    updateBarChart(data.samples[0]);
    updateBubbleChart(data.samples[0]);
};

// function to populate demographic info
function updateMetadata(currentMetaData){
    // selecting the div to display data
    let metadataDiv = d3.select("#sample-metadata");
    // extracting information from the object
    let metadataArray = Object.entries(currentMetaData);
    // deleting any existing data if applicable
    metadataDiv.selectAll("p").remove();
    // updating the data
    metadataDiv.selectAll("p").data(metadataArray).enter().append('p').text(d => `${d[0]}: ${d[1]}`);
};

// function to update barchart
function updateBarChart(currentSample){

     // extracting the arrays from the object
     let sampleValues = currentSample.sample_values;
     let otuIDs = currentSample.otu_ids;
     let otuLabels = currentSample.otu_labels;
 
     // creating a new object from the arrays above
     let plottingData = sampleValues.map((value, index) => ({
         sample_value: value,
         otu_id: otuIDs[index],
         otu_label: otuLabels[index]
     }));
 
     // sorting the object by sample_value
     plottingData.sort((a, b) => b.sample_value - a.sample_value)
 
     // slicing the object to only show top 10
     let top10 = plottingData.slice(0, 10)
 
     // reversing top 10 to make it appropriate for horizontal charting
     top10.reverse();
    
     // setting up data for the bar chart
    let barData = [{
        y: top10.map(item => String("OTU " + item.otu_id)),
        x: top10.map(item => item.sample_value),
        hovertext: top10.map(item => item.otu_label),
        type: "bar",
        orientation: "h"
    }]
    // setting up layout of the barchart
    let barLayout = {
        margin: {
            l: 100,
            r: 0,
            b: 50,
            t: 0,
            pad: 5
        }
    };
    // plotting the bar chart
    Plotly.newPlot("bar", barData, barLayout);
}

// function to update bubble chart
function updateBubbleChart(currentSample){
    // extracting the arrays from the object
    let sampleValues = currentSample.sample_values;
    let otuIDs = currentSample.otu_ids;
    let otuLabels = currentSample.otu_labels;
    // setting up data for the bubble chart
    let bubbleData = [{
        x: otuIDs,
        y: sampleValues,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIDs,
            colorscale: 'Viridis',
            showscale: false
        },
        text: otuLabels
    }];
    // setting up layout for the bubble chart
    let bubbleLayout = {
        xaxis: {title: 'OTU ID'},
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 50,
            pad: 5
        }
        }
    // plotting the bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

};

function updateGaugeChart(currentMetaData){
    // setting up data for the gauge chart
    let gaugeData = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: currentMetaData.wfreq, // extracting washing frequency
            title: { text: "Scrubs per week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                
                axis: { range: [0, 9] }, 
                bar: { color: "steelblue" },
                steps: [
                    { range: [0, 9], color: "aliceblue" }
                   
                ],
            },
        },
    ];

 // setting the layout options
    let gaugeLayout = {
        title: { text: "Belly Button Washing Frequency", font: { size: 25, bold: true } },
        margin: {
            l: 50,
            r: 50,
            b: 120,
            t: 50,
            pad: 0
        },
    };

    // plotting the gauge chart
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}


// initialize default data
d3.json(url).then(init);

// handling the change event
d3.select("selDataset").on("change", optionChanged);

function optionChanged(){
    let selectedID = d3.select('#selDataset').property("value");
    
    d3.json(url).then(function(data){
        updateMetadata(data.metadata.find(item => item.id === Number(selectedID)));
        updateBubbleChart(data.samples.find(item => item.id === selectedID));
        updateBarChart(data.samples.find(item => item.id === selectedID));
        updateGaugeChart(data.metadata.find(item => item.id === Number(selectedID)));

    })
    };
