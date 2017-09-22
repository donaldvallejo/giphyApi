var giphy_api = "http://api.giphy.com/v1/gifs/search";

$(document).on("ready", function(){
  // logic function for previous search buttons to populate element with gifs


  $("#go").on("click", function(e) {
    e.preventDefault();
    var searchString = $("#buttonText").val();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchString + "&api_key=dc6zaTOxFJmzC&limit=5";

    function makeButton() {
      $(".gif-buttons").append("<button class='gifButton' id=" + searchString + ">" + searchString + "</button>");
      $("#" + searchString).click(function(){
        console.log("im clicked");
        fetchAndDisplayGifs();
      });
    }
    makeButton();

    // make last elements empty() when a new search is clicked

    //  connect #buttonText value to the gif loop to print them on the page.
    function fetchAndDisplayGifs() {
      console.log("queryURL", queryURL);
      console.log("searchString", searchString );
      $.ajax({
        url: queryURL,
        method: "GET",
      })
      // After data comes back from the request
      .done(function(response) {

        // if there are gifs on the page
        if ($(".newGifs").length > 0) {
          // remove gifs from page
          console.log("removing");
          $(".newGifs").remove();
        }

        // storing the data from the AJAX request in the results variable
        var results = response.data;
        console.log("results", results);
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          console.log("looping");
          // Creating and storing a div tag
          var inputDiv = $("<div>").addClass("newGifs");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var inputImage = $("<img>");
          var gifURL = results[i].images.fixed_height.url
          // Setting the src attribute of the image to a property pulled off the result item
          inputImage.attr("src", gifURL);

          // Appending the paragraph and image tag to the inputDiv
          inputDiv.append(p);
          inputDiv.append(inputImage);

          // Prependng the inputDiv to the HTML page in the "#gifs-appear-here" div
          $(".gif-gallery").prepend(inputDiv);
        }
      });
    }
    fetchAndDisplayGifs();
  });
});
