# Open Oakland CA Water Safety Challenge Hack Project

## Data

Python data processing code is in /notebooks and /src directories

### Todo

The date fields in the original dataset linked below don't make sense, would be cool to represent the historical data, see trends if we could make sense of the date values.

## Frontend

Map that makes it easy to see the severity of contamination levels

<img src="https://aaronhans.github.io/water-challenge/html/map-screen.png">

The frontend source is in the /html directory and is browseable via github pages at <a href="https://aaronhans.github.io/water-challenge/html/index.html">https://aaronhans.github.io/water-challenge/html/index.html</a>

The original data source is the <a href="https://data.ca.gov/dataset/drinking-water-%E2%80%93-human-right-water-regulatory-including-enforcement-actions-information">Human Right to Water Regulatory (including Enforcement Actions) Information</a> which we processed into a deduplicated list of violations geotagged at their PWID location with a <a href="https://paper-discovery.glitch.me/">glitch node.js</a> script. Then we used the python code in this repo to further process that data adding a new field to represent the severity of the contamination over the allowed thresholds.

### Todo

- Rescale the bars as you zoom in and out so they are viewable at any zoom level
- Represent different contaminants with different colors or on/off buttons for each type of violation

