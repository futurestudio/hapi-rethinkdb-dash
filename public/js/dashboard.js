new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: [
    { day: '2008', value: 20, test: 50 },
    { day: '2009', value: 10, test: 50 },
    { day: '2010', value: 5, test: 50 },
    { day: '2011', value: 5, test: 50 },
    { day: '2012', value: 5, test: 50 },
    { day: '2013', value: 5, test: 50 },
    { day: '2014', value: 5, test: 50 },
    { day: '2015', value: 5, test: 50 },
    { day: '2016', value: 5, test: 50 },
    { day: '2017', value: 5, test: 50 },
    { day: '2018', value: 15, test: 50 },
    { day: '2019', value: 21, test: 50 },
    { day: '2020', value: 45, test: 50 },
    { day: '2021', value: 5, test: 50 },
    { day: '2022', value: 5, test: 50 },
    { day: '2023', value: 5, test: 50 },
    { day: '2024', value: 5, test: 50 },
    { day: '2025', value: 5, test: 50 },
    { day: '2026', value: 5, test: 50 },
    { day: '2027', value: 5, test: 50 },
    ],
    // The name of the data record attribute that contains x-values.
    xkey: 'day',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value', 'test'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Value', 'test']
});
