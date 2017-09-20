var giphy_api = "http://api.giphy.com/v1/gifs/search";

$(document).on("ready", function(){

  var input = $(this).attr("data-input");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
  input + "&api_key=dc6zaTOxFJmzC&limit=20";

  $.ajax({
    url: queryURL,
    method: "GET",
  })
  // After data comes back from the request
  .done(function(response) {
    console.log(queryURL);

    console.log(response);
    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {
      console.log("looping");
      // Creating and storing a div tag
      var inputDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var inputImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      inputImage.attr("src", results[i].images.fixed_height.url);

      // Appending the paragraph and image tag to the inputDiv
      inputDiv.append(p);
      inputDiv.append(inputImage);

      // Prependng the inputDiv to the HTML page in the "#gifs-appear-here" div
      $(".gif-gallery").prepend(inputDiv);

    }

    $("form").on("submit", function(e) {
      e.preventDefault();

      $("form [name='offset']").val(0);
      // showgif();

      var buttonText = $("#buttonText").val();

      function makeButton() {
        $(".gif-buttons").show().prepend("<button id='gifButton'>" + buttonText + "</button>");
      }
      makeButton();

      // logic function for previous serch buttons to populate element with gifs

      $("#gifButton").click(function(event){
        var url = $(this).attr('src');
        console.log("im clicked");

      })
  });






    // function showgif() {
    //   $.ajax({
    //     method: "GET",
    //     url: giphy_api,
    //     data: $("form").serialize(),
    //     success: onSuccess,
    //     error: onError
    //   });
    // }
    //
    // function onSuccess(json) {
    //   if (json.pagination.offset === 0) {
    //     $(".gif-img").remove();
    //   }
    //   json.data.forEach(function(k, v){
    //     $(".gif-gallery").append($("<img class='img-responsive img-thumbnail gif-img' src="+v.images.fixed_height.url+">"));
    //   });
    // }
    //
    // function onError(xhr, status, errorThrown) {
    //   alert("I dont know, what happened!");
    //   console.log("Error: " + errorThrown);
    //   console.log("Status: " + status);
    //   console.dir(xhr);
    // }

  });
});
