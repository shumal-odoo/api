
let loadedResolve, reportLoaded = new Promise((res, rej) => { loadedResolve = res; });
let renderedResolve, reportRendered = new Promise((res, rej) => { renderedResolve = res; });

// Get models. models contains enums that can be used.
models = window['powerbi-client'].models;

// Embed a Power BI report in the given HTML element with the given configurations
function embedPowerBIReport() {

    // Read embed application token
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const path = window.location.pathname;


    $.ajax({
        url: "/cred?id=" + myParam,
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
        res: JSON.stringify(res)

    let accessToken = res.token

    // Read embed URL
    let embedUrl = res.url

    // Read report Id
    let embedReportId = myParam;

    // Read embed type from radio
    let tokenType = 0;

    // We give All permissions to demonstrate switching between View and Edit mode and saving report.
    let permissions = models.Permissions.Read;

    // Create the embed configuration object for the report
    let config = {
        type: 'report',
        tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
        accessToken: accessToken,
        embedUrl: embedUrl,
        id: embedReportId,
        permissions: permissions,
        settings: {
            panes: {
                filters: {
                    visible: true
                },
                pageNavigation: {
                    visible: true
                }
            }
        }
    };

    // Get a reference to the embedded report HTML element
    let embedContainer = document.getElementById('root');

    // Embed the report and display it within the div container.
    report = powerbi.embed(embedContainer, config);
    loaderOff = document.getElementById("loader")
    contentoff = document.getElementById("content")
    loaderOff.style.display = 'none';
    contentoff.style.display = 'none';

    // report.off removes all event handlers for a specific event
    report.off("loaded");

    // report.on will add an event handler
    report.on("loaded", function () {
        loadedResolve();
        report.off("loaded");
    });

    // report.off removes all event handlers for a specific event
    report.off("error");

    report.on("error", function (event) {
        console.log(event.detail);
    });

    // report.off removes all event handlers for a specific event
    report.off("rendered");

    // report.on will add an event handler
    report.on("rendered", function () {
        renderedResolve();
        report.off("rendered");
            });
         }
    })}





embedPowerBIReport();
//await reportLoaded;

// Insert here the code you want to run after the report is loaded

//await reportRendered;

// Insert here the code you want to run after the report is rendered

