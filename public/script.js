const url = 'http://mutably.herokuapp.com/albums'
const getAlbums = document.querySelector('.get-albums-btn')
const listGroup = document.querySelector('.list-group')

$(document).ready(function(){

  // Get All Albums On Load
  getAllAlbums();

  $('.get-albums-btn').click( function (event)  {
    getAllAlbums();
  })

  $(document).on('click', '.edit-btn', function()  {
    let id = $(this.parentElement).data("id")
    let artist = $(this.parentElement).data("artist")
    let name = $(this.parentElement).data("name")
    let releaseDate = $(this.parentElement).data("release")
    let version = $(this.parentElement).data("version")
    let genres = $(this.parentElement).data("genres")

    $(".modal-title").html(`<h1>${id}</h1>`)
    $("input[name=artist]").val(artist)
    $("input[name=name]").val(name)
    $("input[name=date]").val(releaseDate)
    $("input[name=version]").val(version)
    $("input[name=genre]").val(genres)
  })

  $(document).on('click', '.delete-btn', function() {
    alert("Pressed Delete Button")
  })




  // $(document).on('click', '.save-btn', function() {
  //
  //   })
  //
  // $(document).on('click', '.edit-btn', function() {
  //
  //   })
  //
  // $(document).on('click', '.delete-btn', function() {
  //     $.ajax({
  //       method: 'DELETE',
  //       url: url + id,
  //       success: deleteAlbum
  //     })
  //   })

});

const checkStatus = response =>  {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const getJSON = response => response.json()

const getAllAlbums = () => {
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
		'Content-Type': 'application/json'
    })
  })
  .then(checkStatus)
  .then(getJSON)
  .then( albums => {
    albums = albums.albums
    albums.forEach( album => {
      $(".list-group")
        .append(`
        <li class="list-group-item"
          data-id="${album._id}"
          data-artist="${album.artistName}"
          data-name="${album.name}"
          data-release="${album.releaseDate}"
          data-version="${album.__v}"
          data-genres="${album.genres}"
          >
        ${JSON.stringify(album.name)}
         <i class="fa fa-trash-o" aria-hidden="true"></i>
         <a class="edit-btn" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
        </li>
         `);
    })
  } )
  .catch(err => console.log(err) )
}

// const addAlbum = (id, artist, name, date, version, genres) => {
//   $.ajax({
//     url: url,
//     method: 'POST',
//     data: {
//       _id: id,
//       artistName: artist,
//       name: name,
//       releaseDate: date,
//       __v: version,
//       genres: genres
//     }
//   }).done( data => {
//     $(".class-name").append(data);
//   })
//
// }
//
// const updateAlbum = id => {
//
// }
//
// const deleteAlbum = id => {
//
// }
