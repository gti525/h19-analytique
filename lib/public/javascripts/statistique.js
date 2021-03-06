osLabels = []
osValues = []
Object.values(this.data).map((data) => {
    osLabels.push(data.os)
})
osLabels.sort()
var counts = {}
osLabels.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
Object.values(this.counts).map((counts) => {
    osValues.push(counts)
})
osLabels = Array.from(new Set(osLabels))

var ctx = document.getElementById("OSChart");
var OSChart = new Chart(ctx,{
    type: 'pie',
    data: {
        labels: osLabels,
        datasets: [{
            label: '# of Votes',
            data: osValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
})

resolutionLabels = []
resolutionValues = []
Object.values(this.data).map((data) => {
    resolutionLabels.push(data.resolution)
})
resolutionLabels.sort()
var counts = {}
resolutionLabels.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
Object.values(this.counts).map((counts) => {
    resolutionValues.push(counts)
})
resolutionLabels = Array.from(new Set(resolutionLabels))

var ctx = document.getElementById("ResolutionChart");
var CountryChart = new Chart(ctx,{
    type: 'polarArea',
    data: {
        labels: resolutionLabels,
        datasets: [{
            label: '# of Votes',
            data: resolutionValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
})

paysLabels = []
paysValues = []
Object.values(this.data).map((data) => {
    paysLabels.push(data.country)
})
paysLabels.sort()
var counts = {}
paysLabels.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
Object.values(this.counts).map((counts) => {
    paysValues.push(counts)
})
paysLabels = Array.from(new Set(paysLabels))

var ctx = document.getElementById("CountryChart");
var ResolutionChart = new Chart(ctx,{
    type: 'doughnut',
    data: {
        labels: paysLabels,
        datasets: [{
            label: '# of Votes',
            data: paysValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
})

browserLabels = []
browserValues = []
Object.values(this.data).map((data) => {
    browserLabels.push(data.browser)
})
browserLabels.sort()
var counts = {}
browserLabels.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
Object.values(this.counts).map((counts) => {
    browserValues.push(counts)
})
browserLabels = Array.from(new Set(browserLabels))

var ctx = document.getElementById("BrowserChart");
var ResolutionChart = new Chart(ctx,{
    type: 'doughnut',
    data: {
        labels: browserLabels,
        datasets: [{
            label: '# of Votes',
            data: browserValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
})