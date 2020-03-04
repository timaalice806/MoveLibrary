(function($) {
  function processForm(e) {
    var dict = {
      Title: this["title"].value,
      Director: this["director"].value,
      Genre: this["genre"].value
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
        $("#response pre").html(data);
        $("#formOneInput1").val("");
        $("#formOneInput2").val("");
        $("#formOneInput3").val("");
        $("#formOneInput4").val("");
        GetAllMovies();

        //$("#response pre").html(data);
        console.log(data);
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
    e.preventDefault();
  }

  $(document).ready(function() {
    movie_data = "";
    $.getJSON("https://localhost:44325/api/movie", function(data) {
      console.log(data);
      $.each(data, function(key, value) {
        movie_data += "<tr>";
        movie_data += "<td>" + value.title + "</td>";
        movie_data += "<td>" + value.genre + "</td>";
        movie_data += "<td>" + value.director  + "<a href=''><i class='material-icons edit-icon'>edit</i></a>" + "<a href=''><i class='material-icons edit-icon'>delete</i></a>" + "</td>" ;
        movie_data += "</tr>";
      });
      $("#table-data").append(movie_data);
    });
  });
  $("#my-form").submit(processForm);
})(jQuery);
