<script>
    // packages 
    import { millions } from './scripts/helpers.js';
    import * as d3 from 'd3';
    import _ from 'lodash';

    // components
    import CompanyRank from './components/CompanyRank.svelte';
    import CompanyMeta from './components/CompanyMeta.svelte';

    // props 
    export let company; 
    export let publishYear;

    // assign variables for the initial list construction

    let financials_year = company.finances.find(d => d.publishyear === publishYear);
    let financials_previous = company.finances.find(d => d.publishyear === publishYear - 1);
    let employees_current = company.employees.find(d => d.publishyear === publishYear);
    let employees_previous = company.employees.find(d => d.publishyear === publishYear - 1);

    // allow for reactive reassignment so that the filtering buttons work properly
    $: {
        financials_year = company.finances.find(d => d.publishyear === publishYear);
        financials_previous = company.finances.find(d => d.publishyear === publishYear - 1);
        employees_current = company.employees.find(d => d.publishyear === publishYear);
        employees_previous = company.employees.find(d => d.publishyear === publishYear - 1);
    }

    const formatPercent = d3.format(".1%")

    $: getPercentChange = metricType => {
            let prev_year = 'prevyear' + metricType
            let percent_change; 

            if (financials_year[prev_year] == null) {
                return 'N/A'
            }
            else {
                percent_change = (financials_year[metricType] - financials_year[prev_year]) / financials_year[prev_year]

                if (financials_year[metricType] < 0 && financials_year[prev_year] < 0) {
                    return 'N/A'
                }
                else {
                    if (percent_change > 0) {
                        return '+' + formatPercent(percent_change);
                    }
                    else if (percent_change < 0) {
                        return formatPercent(percent_change);
                    }
                    else {
                        return formatPercent(percent_change);
                    }
                }
            }
            
        // }
    } 

    export let mobileTrue = true; 
    export let mobileFalse = false;

</script>

<div class="company">

    <CompanyMeta {company} {financials_year} {financials_previous} {employees_current} {publishYear} mobile={mobileTrue} />

    <div class="desktopContainer">
        <CompanyRank rank={financials_year.customrank} />

        <div class="infoContainer">

            <CompanyMeta {company} {financials_year} {financials_previous} {employees_current} {publishYear} mobile={mobileFalse} />

            <h3>{company.name}</h3>
            <div class="desc">
                {company.shortdesc}
            </div>

            <div class="financials">
                <div class="revenue infoBlock">
                    <span class="bold cash">
                        {#if financials_year.revenue}
                            ${millions(financials_year.revenue)}
                        {:else}
                            -
                        {/if}                    
                    </span>
                    <span class="infoCapt">
                        in revenue
                        {#if financials_year.revenue}
                            {#if getPercentChange('revenue') < 0}
                                (<span class="negative">{getPercentChange('revenue')}</span> from {publishYear - 1})
                            {:else if getPercentChange('revenue') > 0}
                                (<span class="positive">+{getPercentChange('revenue')}</span> from {publishYear - 1})
                            {:else}
                                (<span class="zero">{getPercentChange('revenue')}</span> from {publishYear - 1})
                            {/if}    
                        {:else}
                            -
                        {/if}
                           
                    </span>
                </div>

                <div class="profit infoBlock">
                    <span class="bold cash">
                        {#if financials_year.netincomebeforeextra}
                            ${millions(financials_year.netincomebeforeextra)}
                        {:else}
                            -
                        {/if}  
                    </span>
                    <span class="infoCapt">
                        in profit   
                        {#if financials_year.netincomebeforeextra}
                            {#if getPercentChange('netincomebeforeextra') < 0}
                                (<span class="negative">{getPercentChange('netincomebeforeextra')}</span>)
                            {:else if getPercentChange('netincomebeforeextra') > 0}
                                (<span class="positive">+{getPercentChange('netincomebeforeextra')}</span>)
                            {:else}
                                (<span class="zero">{getPercentChange('netincomebeforeextra')}</span>)  
                            {/if}  
                        {:else}
                            -
                        {/if}
                    </span>
                </div>

                <div class="assets infoBlock">
                    <span class="bold cash">
                        {#if financials_year.totalassets}
                            ${millions(financials_year.totalassets)}
                        {:else}
                            -
                        {/if}              
                    </span>
                    <span class="infoCapt">
                        in total assets   
                        {#if financials_year.totalassets}
                            {#if getPercentChange('totalassets') < 0}
                                (<span class="negative">{getPercentChange('totalassets')}</span>)
                            {:else if getPercentChange('totalassets') > 0}
                                (<span class="positive">+{getPercentChange('totalassets')}</span>)
                            {:else}
                                (<span class="zero">{getPercentChange('totalassets')}</span>)
                            {/if} 
                        {:else}
                            -
                        {/if}
                    </span>
                </div>

                <div class="capitalization infoBlock">
                    <span class="bold cash">
                        {#if financials_year.marketcap}
                            ${millions(financials_year.marketcap)}
                        {:else}
                            -
                        {/if}
                    </span>
                    <span class="infoCapt">
                        in market capitalization
                        {#if financials_year.marketcap}
                            {#if getPercentChange('marketcap') < 0}
                                (<span class="negative">{getPercentChange('marketcap')}</span>)
                            {:else if getPercentChange('marketcap') > 0}
                                (<span class="positive">+{getPercentChange('marketcap')}</span>)
                            {:else}
                            (<span class="zero">{getPercentChange('marketcap')}</span>)
                            {/if}
                        {:else}
                            -
                        {/if}
                    </span>
                </div>
            </div>
        </div>
    </div>

    
</div>