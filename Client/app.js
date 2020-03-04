(function($) {
  function processForm(e) {
    var dict = {
      Title: this["title"].value,
      Genre: this["genre"].value,
      Director: this["director"].value,
      
    };
    $.ajax({
      url: "https://localhost:44325/api/movie",
      dataType: "json",
      type: "post",
      contentType: "application/json",
      data: JSON.stringify(dict),
      success: function(data, textStatus, jQxhr) {
        console.log("success?");
        $("#response pre").html(data);
        $("#title").val("");
        $("#genre").val("");
        $("#director").val("");
        // GetAllMovies();
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
      $.each(data, function(key, value) {
        updateForm(value);
        movie_data += "<tr>";
        movie_data += "<td>" + value.title + "</td>";
        movie_data += "<td>" + value.genre + "</td>";
        movie_data +="<td>" +
          value.director +
          "<a href='' ></a><i class='material-icons edit-icon' onclick='updateForm()'>edit</i></a>" +
          "<a href=''><i class='material-icons edit-icon'>delete</i></a>" +
          "</td>";
        movie_data += "</tr>";
        console.log(value);
      });
      $("#table-data").append(movie_data);
    });
  });
  $("#my-form").submit(processForm);
})(jQuery);

function updateForm(e){
  var dict = {
    Title: this["title"].value,
    Genre: this["genre"].value,
    Director: this["director"].value,
  };
  $.ajax({
    url: "https://localhost:44325/api/movie",
    dataType: "json",
    type: "put",
    contentType: "application/json",
    data: JSON.stringify(dict),
    success: function(data, textStatus, jQxhr) {
      console.log("success?");
      $("#response pre").html(data);
      $("#title").val();
      $("#genre").val();
      $("#director").val();
      // GetAllMovies();
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
  e.preventDefault();
}
