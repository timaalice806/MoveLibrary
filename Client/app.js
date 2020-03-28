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
          "<a href='' type='button' id='updateBtn'><i value='edit' id='updateBtn' class='btn btn-primary btn-sm ml-2 mr-2'>edit</i></a>" +
          "<a href='' type='button' id='removeBtn'><i class='btn btn-success btn-sm m1-2'>delete</i></a>" +
          "</td>";
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
function putForm(e) {
  var dict = {
    Title: this["title"].value,
    Director: this["director"].value,
    Genre: this["genre"].value,
    MovieId: this["MovieId"].value
  };

  $.ajax({
    url: "https://localhost:44352/api/movie",
    dataType: "json",
    type: "put",
    contentType: "application/json",
    data: JSON.stringify(dict),
    success: function(data, textStatus, jQxhr) {
      console.log("success?");
      $("#updatePop").hide();
      $("#title-input").val("");
      $("#director-input").val("");
      $("#genre-input").val("");
      $("#image-input").val("");
      GetAllMovies();
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
  e.preventDefault();
}

$("#updateBtn").click(removeFromList());

function removeFromList(id) {
  $.ajax({
    url: "https://localhost:5001/api/movie" + id,
    type: "DELETE",
    success: function(result) {
      alert("it has been deleted");
      fetchAllMovies();
    }
  });
  fetchAllMovies();
}

//////////////////////////////////////////////////////////////END UPDATE////////////////////////////////////
///////////////////////////////////////////////////////////////START DELETE/////////////////////////////////
