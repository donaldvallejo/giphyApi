var giphy_api = "http://api.giphy.com/v1/gifs/search";

$(document).on("ready", function(){

  $("form").on("submit", function(e) {
    e.preventDefault();

    $("form [name='offset']").val(0);
    showgif();

    function button() {
      $(".gif-buttons").show().prepend("<button class='gifButton'>works</button>");
      
    }
    button();

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
  json.data.forEach(function(v, i){
    $(".gif-gallery").append($("<img class='img-responsive img-thumbnail gif-img' src="+v.images.fixed_height.url+">"));
  });
}

function onError(xhr, status, errorThrown) {
  alert("I dont know, what happened!");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
}
