<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		background-color: white;
		box-sizing: border-box;
		width: 100%;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>