function fetchAllMovies(e) {
  $.ajax({
    type: "GET",
    url: "https://localhost:5001/api/movie",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(response) {
      $("#MemberList").empty();
      console.log(response);
      var ListValue = "";
      var i;
      for (i = 0; i < response.length; ++i) {
        ListValue +=
          "<tr>" +
          "<td>" +
          response[i].title +
          "</td>" +
          "<td>" +
          response[i].genre +
          "</td>" +
          "<td>" +
          response[i].director +
          "<button class='btn btn-sm btn-primary mr-2 ml-2' type='button' id='updateBtn' onclick='updateMovie(" +
          response[i].movieId +
          ")'>edit</button>" +
          "<button type='button' class='btn btn-sm btn-danger mr-2 ml-2' onclick='deleteMovie(" +
          response[i].movieId +
          ")'>delete</button>" +
          "</td>" +
          "</tr>";
      }
      $("#table-data").append(ListValue);
    },
    failure: function(response) {
      alert(response.responseText);
      alert("Failure");
    },
    error: function(response) {
      alert(response);
      alert("Error");
    }
  });
}

$(document).ready(fetchAllMovies);

///////////////////////////////////END GET///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////POST//////////////////////////////////////////////////////////////////////////////////////

function processForm(e) {
  var dict = {
    Title: this["title"].value,
    Genre: this["genre"].value,
    Director: this["director"].value
  };
  $.ajax({
    url: "https://localhost:5001/api/movie",
    dataType: "json",
    type: "POST",
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

$("#my-form").submit(processForm);

//////////////////////////////////////////////////////END POST REQUEST////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////START PUT REQUEST//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateForm(e) {
  var dict = {
    Title: this["title"].value,
    Director: this["director"].value,
    Genre: this["genre"].value,
    MovieId: this["MovieId"].value
  };

  $.ajax({
    url: `https://localhost:5001/api/movie/${movieId}`,,
    dataType: "json",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(dict),
    success: function(data, textStatus, jQxhr) {
      console.log("success?");
      $("#updateMovie").hide();
      $("#title").val("");
      $("#director").val("");
      $("#genre").val("");
      GetAllMovies();
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
  e.preventDefault();
}

//////////////////////////////////////////////////////////////END UPDATE////////////////////////////////////
///////////////////////////////////////////////////////////////START DELETE/////////////////////////////////

function deleteMovie(movieId) {
  $.ajax({
    url: `https://localhost:5001/api/movie/${movieId}`,
    method: "DELETE",
    success: function() {
      alert("the movie has been deleted");
      fetchAllMovies();
    },
    error: function(error) {
      alert(`error: ${error}`);
    }
  });
}

///////////////////////////////////////////////////////////////END DELETE/////////////////////////////////

