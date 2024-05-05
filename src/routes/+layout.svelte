<div class="container">
	<header class="headers">
			<h1>
				<a href="/">Banca</a>
			</h1>
			<h2>Account della classe</h2>
	</header>
	<slot />
</div>

<style>
	.headers {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4% 3%;
		margin: 0 !important;
		background-color: #1b1b1b;
	}

	.container {
		margin: 0 !important;
	}

	.headers h1 {
		font-size: 3rem;
		transition: all 200ms ease-in-out;
	}

	.headers h1:hover {
		font-size: 3.3rem;
	}

	.headers a {
		text-decoration: none;
	}
</style>
