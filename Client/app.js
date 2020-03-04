(function($) {
  function processForm(e) {
    var dict = {
      Title: this["title"].value,
      Director: this["director"].value,
      Genre: this["genre"].value,

    };

    $.ajax({
      url: "https://localhost:44325/api/movie",
      dataType: "json",
      type: "post",
      contentType: "application/json",
      data: JSON.stringify(dict),
      success: function(data, textStatus, jQxhr) {
        $("#response pre").html(data);
        
                    console.log("success?");
                    $('#response pre').html(data);
                    $('#formOneInput1').val('');
                    $('#formOneInput2').val('');
                    $('#formOneInput3').val('');
                    $('#formOneInput4').val('');
                    GetAllMovies();
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });

    e.preventDefault();
  }

  $("#my-form").submit(processForm);
})(jQuery);

$(document).ready(function() {
  $(".btn").click(function() {
    .post(something, fuction(){

    })
  });
});
