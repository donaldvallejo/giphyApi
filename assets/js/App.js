$('form').on('submit', function(event){
  event.preventDefault();
  $.ajax({
    method: 'GET',
    url: endpoint,
    success: onSubmitReqSuccess
  });
});

function onSubmitReqSuccess(responseData){
  console.log(responseData);
}
