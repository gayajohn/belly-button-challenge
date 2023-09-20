# Module 14: Belly Button Challenge

## App Access

https://gayajohn.github.io/belly-button-challenge/

<img width="489" alt="image" src="https://github.com/gayajohn/belly-button-challenge/assets/135036996/512b26d4-4443-402c-b349-038af2611a89">


## Table of Contents

- static folder which contains app.js, the javascript file for the dashboard
- index.html file which contains the html script for the dashboard
- samples.json which contains the data read in from the given url

## Challenge Objective

The objective of this challenge was to extract data from the url provided and build an interactive dashbard on data about microbes that colonize human navels. The dashboard allows the user to select a test subject from a given dropdown menu and observe the following:

- horizontal bar chart which shows the top 10 microbial species present in the subject
- bubble chart which shows all the microbial species present in the subject
- gauge chart which shows the subject's washing frequency
- demographic information on the subject

## References

- Dataset Reference

    Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/

    URL used to pull in data:

    https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

- Code References

    https://plotly.com/javascript/gauge-charts/

    https://plotly.com/python/builtin-colorscales/

    https://plotly.com/javascript/indicator/#a-single-angular-gauge-chart

    https://stackoverflow.com/questions/72496150/user-friendly-names-for-plotly-css-colors

    referenced code:

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


        let gaugeLayout = {
        title: { text: "Belly Button Washing Frequency", font: { size: 25, bold: true } },
        margin: {
            l: 50,
            r: 50,
            b: 120,
            t: 50,
            pad: 0
        },
    

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

        data.metadata.find(item => item.id === Number(selectedID))

        data.samples.find(item => item.id === selectedID)
