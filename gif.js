// Creat initial array of strings, each one related to a topic that interests me
var topics = ["pancakes", "pizza", "burger"];

// Take the topics in this array and create buttons in my HTML
// Use a loop that appends a button for each string in the array into 
// the dynamic buttons div

// Function for displaying buttons in the food-buttons div
function renderButtons () {

	// Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#food-buttons").empty();
    // Looping through my topics array
    for (var i = 0; i < topics.length; i++){
    	// Dynamically creating buttons into the food-buttons div
    	var a = $("<button>");
    	// Adding a class of "food" to the button just created
    	a.addClass("food");
    	// Adding a data attribute to my new button
    	a.attr("data-name", topics[i]);
    	// Button text
    	a.text(topics[i]);
    	// Adding button into the food-buttons div
    	$("#food-buttons").append(a);
    }
}


//When the user clicks on a button, the page should grab 10 static, 
// non-animated gif images from the GIPHY API and place them in the gifs div

// UNDER every gif, display its rating--- what if I only want G and PG rated gifs
// This data is provided by the GIPHY API

var apiKey = "dc6zaTOxFJmzC";
	

// $(".food").on("click", function(event) {
function displayFood() {
	
	// Creating a variable for each item in my topics array and grabbing their value
	// by searching for their data-name attribute
	var foodItem = $(this).attr("data-name");
	console.log(this);
	
	// Constructing a URL to get the giphy
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        foodItem + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Executing ajax request using the queryURL variable
    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    // After the data comes back from the API
    .done(function(response) {
    	// Setting results to the data received from the ajax call. This is the data key
    	var results = response.data;
    	// Looping through the JSON to locate and render rating
    	for (var i = 0; results.length; i++) {

    		// Creating new div so that each food has their own div
    		var gifDiv = $("<div class='gif'>");
    		// Variable grabbing the rating of the gif
    		var rating = results[i].rating;
    		// Adding text to display the rating on the page
    		var p = $("<p>").text("Rating: " + rating);
    		// Dynamically creating an image element to display the image that we will pull
    		var foodImage = $("<img>");

    		// Applying an attribute to foodImage so that an image will be assigned
    		foodImage.attr("src", results[i].images.fixed_height_still.url);
    		// Applying a data-still attribute equal to still gif
    		foodImage.attr("data-still", results[i].images.fixed_height_still.url);
    		// Applying a data-animate attribute equal to moving gif
    		foodImage.attr("data-animate", results[i].images.fixed_height.url);
    		// Applying data-state attribute equal to still
    		foodImage.attr("data-state", "still");
    		
    		// Prepends the rating text into gifDiv
    		gifDiv.prepend(p);
    		// Prepends image of foodImage into gifDiv, rating will appear under
 			gifDiv.prepend(foodImage);

 			// Prepends each gifDiv 
    		$("#gifs").prepend(gifDiv); 

    	}
    })
}

// ISSUE: The data-state is updating but the src is not
// Function to have the gif move/stop upon clicking
function move() {
// $(".item").on("click", function() {

	var state = $(this).attr("data-state");
	// console.log(this);

	if (state === "still"){
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
	console.log(this);
}

//===== Do the above before moving on =====

// Add a form to your page that takes the value from a user input box and adds it 
// to your topics array

$("#addButton").on("click", function(event) {
	event.preventDefault();
	// Creating variable to hold the value of what user inputs into text box
	var search = $("#food-input").val().trim();
	// Pushes the user search into the topics array
	topics.push(search);
	// Displays buttons on the screen
	renderButtons();
	// Empties the text box for better UI
	$("#food-input").val("");
})

// Lastly, make a function call that takes each topic in the array that remakes the
// buttons on the page

renderButtons();

// Adding click event listeners to all elements with a class of food
// Any click on the DOM propogates up and sees if there is a .food class attached
$(document).on("click", ".food", displayFood);
// Adding click event listeners to all elements with a class of item
$(document).on("click", ".gif", move);


