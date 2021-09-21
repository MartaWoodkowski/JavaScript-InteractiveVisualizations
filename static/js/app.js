///////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------
// CREATE INITIAL DISPLAY
//---------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function init () {
    // Read `samples.json`
    d3.json('samples.json').then(function(data){
        let firstSubject = data.samples[0];

        //-------------------------------------------------------------------------------------------------
        // BAR CHART
        //-------------------------------------------------------------------------------------------------
        
        // Create trace to display the top 10 OTUs found
        let trace1 = {
            x: firstSubject.sample_values.slice(0,10).reverse(), 
            y: firstSubject.otu_ids.map(item => `OTU ${item}`).slice(0,10).reverse(),
            text: firstSubject.otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

        // Apply a title to the layout
        let layout1 = {
            margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 50
            }
        };

    // Data trace array
    let traceData1 = [trace1];   
        
    // Render the plot to the div tag with id 'bar'
    Plotly.newPlot('bar', traceData1,layout1);  

    //-----------------------------------------------------------------------------------------------------
    // DEMOGRAPHIC INFO
    //-----------------------------------------------------------------------------------------------------

    //Put demographic data into <div id="sample-metadata" class="panel-body"></div>
    let subjectDemographInfo = data.metadata[0];
    let sampleData = document.getElementById('sample-metadata');
    sampleData.innerHTML = `id: ${subjectDemographInfo.id}<br>
                            ethnicity:  ${subjectDemographInfo.ethnicity}<br>
                            gender:  ${subjectDemographInfo.gemder}<br>
                            age:  ${subjectDemographInfo.age}<br>
                            location:  ${subjectDemographInfo.location}<br>
                            bbtype:  ${subjectDemographInfo.bbtype}<br>
                            wfreq:  ${subjectDemographInfo.wfreq}<br>`;
                    
    //-----------------------------------------------------------------------------------------------------
    // BUBBLE CHART
    //-----------------------------------------------------------------------------------------------------

    // Create new trace for bubble graph
    let trace2 = {
        y: firstSubject.sample_values, 
        x: firstSubject.otu_ids,
        text: firstSubject.otu_labels,
        mode: 'markers',
        marker: {
            size: firstSubject.sample_values,
            color: firstSubject.otu_ids
        }  
    }; 

    // Apply a title to the layout
    let layout2 = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100
        },
        xaxis:{
            title:'OTU ID'
        }
    };
    
    // Data trace array
    let traceData2 = [trace2];  

    // Render the plot to the div tag with id 'buble'
    Plotly.newPlot('bubble', traceData2, layout2); 

    //-----------------------------------------------------------------------------------------------------
    // DROPDOWN MENU
    //-----------------------------------------------------------------------------------------------------

    let testId = document.getElementById('selDataset');
    // create options for every subject
    var idList = ''
    data.metadata.forEach(element => idList += `<option value="${element.id}">${element.id}</option>`);
    // modify html wiht drop down value options
    testId.innerHTML = idList;
    

    //-----------------------------------------------------------------------------------------------------
    // GAUGE CHART
    //-----------------------------------------------------------------------------------------------------
    updateGauge(data.metadata[0].wfreq);

    });    
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------------------------------------
// UPDATE DATA WHEN DROPDOWN SELECTION CHANGES
//---------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// On change to the DOM, call getData()
d3.selectAll('#selDataset').on('change', getData);

// Function called by DOM changes
function getData() {
    var dropdownMenu = d3.select('#selDataset');
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property('value');

    // Read `samples.json`
    d3.json('samples.json').then(function(data){

    //----------------------------------------------------------------------------------------------------
    // UPDATE DEMOGRAPHIC INFO
    //----------------------------------------------------------------------------------------------------
    data.metadata.forEach(function(element) {
        if(element.id == dataset){
            let newSampleData = document.getElementById('sample-metadata');
            newSampleData.innerHTML = `id: ${element.id}<br>
                                    ethnicity:  ${element.ethnicity}<br>
                                    gender:  ${element.gemder}<br>
                                    age:  ${element.age}<br>
                                    location:  ${element.location}<br>
                                    bbtype:  ${element.bbtype}<br>
                                    wfreq:  ${element.wfreq}<br>`;

            //---------------------------------------------------------------------------------------------------
            // UPDATE GAUGE CHART
            //---------------------------------------------------------------------------------------------------
            updateGauge(element.wfreq);
        } 
    });

    
    
    //---------------------------------------------------------------------------------------------------
    // UPDATE 'bar' AND 'bubble' CHARTS
    //---------------------------------------------------------------------------------------------------
    data.samples.forEach(function(element) {
        if(element.id == dataset){
            Plotly.restyle('bar','x',[element.sample_values.slice(0,10).reverse()]);
            Plotly.restyle('bar','y',[element.otu_ids.map(item => `OTU ${item}`).slice(0,10).reverse()]);
            Plotly.restyle('bar','text',[element.otu_labels.slice(0,10).reverse()]);

            Plotly.restyle('bubble','x',[element.otu_ids]);
            Plotly.restyle('bubble','y',[element.sample_values]);
            Plotly.restyle('bubble','text',[element.otu_labels]);
            var data_update = {
                'marker':{
                    size: element.sample_values,
                    color: element.otu_ids
                }
            };
            Plotly.restyle("bubble", data_update, [0]);
        };
    });
});

}
    
init()