dynamicUrl = "";
dynamicMethod = "";

function fetchAllMovies(e) {
  $.ajax({
    method: "GET",
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
          "<button class='btn btn-sm pull-right1 mr-2 ml-2' type='button' id='updateBtn' onclick='updateMovie(" +
          response[i].movieId +
          ")'>edit</button>" +
          "<button type='button' class='pull-right1 btn btn-sm mr-2 ml-2' onclick='deleteMovie(" +
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

  let movieToUpdate = this["movieId"].value;
  if (movieToUpdate) {
    dynamicUrl = `https://localhost:5001/api/movie/${movieToUpdate}`;
    dynamicMethod = "PUT";
  } else {
    dynamicUrl = `https://localhost:5001/api/movie/`;
    dynamicMethod = "POST";
  }

  $.ajax({
    url: dynamicUrl,
    dataType: "json",
    method: dynamicMethod,
    contentType: "application/json",
    data: JSON.stringify(dict),
    success: function(response, textStatus, jQxhr) {
      console.log("success?");
      $("#response pre").html(response);
      $("#title").val("");
      $("#genre").val("");
      $("#director").val("");
      fetchAllMovies();
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
  e.preventDefault();
}

$("#new-form").submit(processForm);

//////////////////////////////////////////////////////END POST REQUEST////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////START PUT REQUEST//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMovie(movieId) {
  $.ajax({
    url: `https://localhost:5001/api/movie/${movieId}`,
    method: "GET",
    dataType: "json",
    success: function(response) {
      $("#title").val(response.title);
      $("#genre").val(response.genre);
      $("#director").val(response.director);
      $("#movieId").val(response.movieId);
      fetchAllMovies();
    },
    error: function(error) {
      console.log(error);
    }
  });
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

///////////////////////////////////////////////////////////////END DELETE///////////////////////////////////
///////////////////////////////////////////////////////////////START SEARCH/////////////////////////////////
