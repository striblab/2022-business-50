<script>
	// packages
	import companies from '../data/companies.json';

	// Components
	import Company from './Company.svelte';

	// Change this variable to target financial date year if doing a data swap. 
	export let publishYear = 2022; 

	// set default view to top 50
	let category_sort = 'all'

	// filter unranked companies, sort the remaining ones by their rank and only take the top 50.
	let companies_filtered = companies.filter(d => {
		return d.finances[0].customrank !== null
	})

	let companies_sorted = companies_filtered.sort((a, b) => {
		return a.finances[0].customrank - b.finances[0].customrank
	})

	companies_sorted = companies_sorted.slice(0,50)

	// this is the array that is rendered
	let actual_companies;

	// static data for sorting buttons
	export let categories = ['all', 'health', 'retail', 'manufacturing', 'financial', 'utility', 'other']
	let category_switch = {
		'all': 'Show all',
		'health': 'Health/Medical', 
		'retail': 'Retail/Service', 
		'manufacturing': 'Manufacturing', 
		'financial': 'Financial Service', 
		'utility': 'Utility', 
		'other': 'Other'
	}

	let category_switch_reverse = {
		'Show all': 'all',
		'Health/Medical': 'health', 
		'Retail/Service': 'retail', 
		'Manufacturing': 'manufacturing', 
		'Financial Service': 'financial', 
		'Utility': 'utility', 
		'Other': 'other'
	}

	$: {
		actual_companies = companies_sorted.filter(d => {
			let match = true; 

			// first checks if other is clicked and if the category is in the category array
			// then checks if the category matches the category filter selection
			// then return all if the all button is selected 

			if (category_sort === 'other' && categories.includes(category_switch_reverse[d.category]) == true) {
				match = false
			}
			else if (category_sort !== 'all' && category_sort !== 'other' && d.category !== category_switch[category_sort]) {
				match = false;
			}
			else if (category_sort == 'all') {
				match = true;
			}
			
			return match;
		})

		// resort the companies based on rank	
		actual_companies = actual_companies.sort((a, b) => {
			return a.finances[0].customrank - b.finances[0].customrank
		})		
	}

	// functions to force svelte to rerender the list
	let redraw = false; 

	const forceRender = () => {
		redraw = true;
	}	

</script>

<div class="companyContainer">
	<div class="categorySelector">
		<h3>Filter:</h3>
		<div class="buttons">
			{#each categories as category}
				<div class="feature {category}">
				<input type=radio bind:group={category_sort} value={category} on:click={forceRender}>
				<label class="features {category}">
					{category_switch[category]}
				</label>
				</div>
		  	{/each}
		</div>
	</div>

	<div class="companies">
		{#if !redraw}
			{#each actual_companies as company, i}
				{#if i < 50}
					<Company {company} {publishYear} />
				{/if}
			{/each}
		{:else}
			{#each actual_companies as company, i}
				{#if i < 50}
					<Company {company} {publishYear} />
				{/if}
			{/each}
		{/if}	
	</div>
</div>

<!-- <div class="relateds">
	<h4>Star Tribune 50 stories</h4>

	<a href="" target="_blank">
		<span>Schaefer: For Minnesota's biggest companies, share buybacks signal recovery from downturn</span>
	</a>
	
	<a href="" target="_blank">
		<span>For the first time in years, Minnesota has more public companies this year than last</span>
	</a>

	<a href="" target="_blank">
		<span>Being a new CEO is a leadership challenge — try adding pandemic issues</span>
	</a>

	<a href="" target="_blank">
		<span>Number of IPOs in Minnesota ticks up, following national trend</span>
	</a>

	<a href="" target="_blank">
		<span>Target CEO says company taking steps to be 'true leader' in diversity, inclusion</span>
	</a>

	<a href="" target="_blank">
		<span>Mpls-based Jamf’s performance seems to be ahead of its stock price</span>
	</a>
</div>

<div class="footnotes">
	
	<p>
		The Star Tribune 50 is a measure of the largest publicly held companies in Minnesota ranked by 2020 revenue. Numbers for companies that don’t have a Dec. 31 year-end are from the four quarters ending November, December, January or February. Another 26 companies were considered but whose revenues were too small for the list.
Data for the 50 largest companies also includes each company’s net income before extraordinary items, assets and market capitalization as of April 30. Data for the list was taken from Refinitiv, Yahoo Finance, company news releases and Securities and Exchange Commission filings.
	</p>
	<p>
		The list excludes public companies that do not trade on major exchanges, closely held companies, which usually do not disclose financial data, cooperatives and fraternal benefits organizations. Companies that were delayed filing year-end results were also excluded. Companies who have management headquarters in Minnesota, including Medtronic, Pentair, nVent Electric, Investors Real Estate Trust, and Winnebago Industries are included.
	</p>
	<p>
		Star Tribune graphic: Patrick Kennedy, Thomas Oide
	</p>
</div> -->
