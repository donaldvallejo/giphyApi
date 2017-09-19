var giphy_api = "http://api.giphy.com/v1/gifs/search";

$(document).on("ready", function(){

  $("form").on("submit", function(e) {
    e.preventDefault();


    var buttonText = $("#buttonText").val();

    $("form [name='offset']").val(0);
    showgif();

    function makeButton() {
      $(".gif-buttons").show().prepend("<button id='gifButton'>" + buttonText + "</button>");
    }
    makeButton();
  });


});

function showgif() {
  $.ajax({
    method: "GET",
    url: giphy_api,
    data: $("form").serialize(),
    success: onSuccess,
    error: onError
  });
}

function onSuccess(json) {
  if (json.pagination.offset === 0) {
    $(".gif-img").remove();
  }
  json.data.forEach(function(v){
    $(".gif-gallery").append($("<img class='img-responsive img-thumbnail gif-img' src="+v.images.fixed_height.url+">"));
  });
}

function onError(xhr, status, errorThrown) {
  alert("I dont know, what happened!");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
}
