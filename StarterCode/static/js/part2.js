//-----------------------------------------------------------------------------------------------------
// GAUGE CHART
//-----------------------------------------------------------------------------------------------------
function updateGauge(valueGauge){
    // Calculate degree
    var level = 180*valueGauge/9;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';

    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        hoverinfo: 'skip'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(201, 79, 79, .9)', 'rgba(197, 68, 68, .8)',
                            'rgba(197, 68, 68, .7)', 'rgba(197, 68, 68, .6)',
                            'rgba(197, 68, 68, .5)', 'rgba(197, 68, 68, .4)',
                            'rgba(197, 68, 68, .3)', 'rgba(197, 68, 68, .2)',
                            'rgba(197, 68, 68, .1)', 'rgba(197, 68, 68, 0)']},
    hoverinfo: 'skip',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout3 = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    height: 540,
    width: 540,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout3);
}