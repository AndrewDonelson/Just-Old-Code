$(document).ready(function () {
/*
	// // Initialize the plugin with no custom options
	$("#readMoreReadLess1").readMoreReadLess();

	// Use the plugin with items in summary set to 1
	$("#readMoreReadLess2").readMoreReadLess({
		itemInSummary: 1
	});
*/
	// Use the plugin with custome text for Read more and Read less.
	//Added custom class to Read More and Read less links
	$("#expander").readMoreReadLess({
		readMoreText: 'Show more items ...',
		readLessText: 'Show fewer items ...',
		readMoreClass:'expand',
		readLessClass:'collapse'
	});
});
