<script>
    // packages
    import {intcomma} from 'journalize';

    // props
    export let company; 
    export let financials_year;
    export let financials_previous; 
    export let employees_current; 
    export let publishYear;
    export let mobile;

    let categories = ['all', 'health', 'retail', 'manufacturing', 'financial', 'utility', 'other']
    let class_string;
    let class_string_all; 

    if (mobile == true) {
        class_string_all = 'quickHitMobile'
    }
    else {
        class_string_all = 'quickHit'
    }

    // reverse switch to class the category button
    let category_switch = {
		'Show all': 'all',
		'Health/Medical': 'health', 
		'Retail/Service': 'retail', 
		'Manufacturing': 'manufacturing', 
		'Financial Service': 'financial', 
		'Utility': 'utility', 
		'Other': 'other'
	}

    $: {
        if (categories.includes(category_switch[company.category])) {
            class_string = 'category blockInfo ' + category_switch[company.category];
        }
        else {
            class_string = 'category other blockInfo';
        }
    }

    

</script>

<div class="{class_string_all}">
    <div class="{class_string}">
        {#if company.category == null}
            Other
        {:else}
            {company.category}
        {/if}
        
    </div>

    <span class="spacer"></span>

    <div class="symbol blockInfo">{company.stocksymbol}</div>
    
    <span class="spacer"></span>

    <div class="ranking blockInfo">
        <!-- checks for newly created company in the rankings -->
        {publishYear - 1} ranking: 
        {#if financials_previous}
            {#if financials_previous.customrank === undefined || financials_previous.customrank === null}
            NR
            {:else}
                <span class="bold">{financials_previous.customrank}</span>
            {/if}
        {:else} 
            NR
        {/if}               
    </div>

    <span class="spacer"></span>

    <div class="employees blockInfo">
        <!-- checks if employee data is available -->
        Employees: 
        {#if employees_current}
            <span class="bold">{intcomma(employees_current.total)}</span>
        {:else}
            N/A
        {/if} 
    </div>

    <span class="spacer"></span>

    <div class="city blockInfo">
        {company.city}
    </div>

    <span class="spacer"></span>

    <div class="website blockInfo">
        <a href="{company.www}">
            Website
        </a>
    </div>
</div>