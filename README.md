# Plot.ly - Belly Button Biodiversity

Built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

1. Read `samples.json` using JavaScript's library D3.


2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in one individual.

    * Used `sample_values` as the values for the bar chart.

    * Used `otu_ids` as the labels for the bar chart.

    * Used `otu_labels` as the hovertext for the chart.


3. Created a bubble chart that displays each sample.

    * Used `otu_ids` for the x values.

    * Used `sample_values` for the y values.

    * Used `sample_values` for the marker size.

    * Used `otu_ids` for the marker colors.

    * Used `otu_labels` for the text values.


4. Displayed the sample metadata, i.e., an individual's demographic information.


5. Displayed each key-value pair from the metadata JSON object somewhere on the page.


6. Made all of the plots interactive to the point that they update any time that a new sample is selected.



Refered to the [Plotly.js documentation](https://plot.ly/javascript/) when built the plots.



## Step 2: Gauge Chart

* Adapted the Gauge Chart from <https://www.instructables.com/Showing-Charts-and-Gauges-of-IOT-Device-Data-Using/> to plot the weekly washing frequency of the individual.

* Modified the example gauge code to account for values ranging from 0 through 9.

* Made the chart interactive to the point that it updates whenever a new sample is selected.




## Here is how it looks like:

![Belly Button Biodiversity Dashboard](Images/app_screenshot.PNG)



- - -
## References

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)
