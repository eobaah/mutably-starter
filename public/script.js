const url = 'http://mutably.herokuapp.com/albums/'
const getAlbums = document.querySelector('.get-albums-btn')
const listGroup = document.querySelector('.list-group')

$(document).ready(function(){

  // Get All Albums On Load
  getAllAlbums();

  $('.get-albums-btn').click( function (event)  {
    getAllAlbums();
  })

  var ELEMENTS = {
    modalContent: function () { return $('.modal-content')},
    editButtons: function() { return $('.edit-btn')},
    albumEditForm: function() { return $('.')}
  }

  function extractAlbumFromEditForm() {

  }

  var CONTROLLER = {
    updateAlbum: function(event) {
      // call the function to extract the form data
      // delegate that to the DATA function
      // delegate to the UI function
      var updatedAlbum = extractAlbumFromEditForm()
      DATA.updatedAlbum(updatedAlbum)
      .then(function(response) {
        UI.updateAlbum()
      })
    },
    addAlbum: function() {},
    deleteAlbum: function() {}
  }

  var UI = {
    updateAlbum: function(album) { /* DOM manipulation */},
    addAlbum: function(album) {},
    deleteAlbum: function() {}
  }

  var DATA = {
    fetchAlbums: function() {},
    updateAlbum: function(album) {
      return fetch('/albums', {method: 'PUT', body: JSON.stringify(album)})
      .then()
    }
  }

/*
  0. add a click handler to the update button
  1. Extract data from the form
  2. Pass the data to my DATA function, and make an API call to update the data
  3. On success, update the UI
*/

$(document).on('click', '.save-changes-btn', CONTROLLER.updateAlbum)


  $(document).on('click', '.edit-btn', function()  {
    let id = $(this.parentElement).data("id")
    let artist = $(this.parentElement).data("artist")
    let name = $(this.parentElement).data("name")
    let releaseDate = $(this.parentElement).data("release")
    let version = $(this.parentElement).data("version")
    let genres = $(this.parentElement).data("genres")

    $(".modal-title").html(`<h2>${id}</h2>`)
    $("input[name=artist]").val(artist)
    $("input[name=name]").val(name)
    $("input[name=date]").val(releaseDate)
    $("input[name=version]").val(version)
    $("input[name=genre]").val(genres)

    ELEMENTS.modalContent.addClass( 'modal-show');
  })

  $(document).on('click', '.close-btn', function() {
  })

  $(document).on('click', '.save-changes-btn', function() {
    let id = $(this).data("id")
    updateAlbum(id);
    $('.modal-content').removeClass('modal-show');
    getAllAlbums();
  })

  $(document).on('click', '.delete-btn', function() {
    alert("Pressed Delete Button")
  })
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
         <a class="edit-btn" data-toggle="modal" data-target="#musicModal"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
        </li>
         `);
    })
  })
  .catch(err => console.log(err) )
}

const clearAlbums = () => {
  let modalItems = document.querySelector('.modal-body')
  while (modalItems.firstChild) {
    modalItems.removeChild(modalItems.firstChild);
  }
}

const updateAlbum = (id) => {
  // let albumId = document.querySelector('.modal-title').childNodes[0].childNodes[0].nodeValue
  // albumId = albumId.substring(1, albumId.length-1)
  let albumId = id
  let nodePath = document.querySelector('.modal-body').childNodes
  let artist = nodePath[0].childNodes[1].value
  let name = nodePath[1].childNodes[1].value
  let releaseDate = nodePath[2].childNodes[1].value
  let version = nodePath[3].childNodes[1].value
  let genres = nodePath[4].childNodes[1].value

  console.log('url + albumId ----> ', url + id)

  fetch(url + id, {
    method: 'PUT',
    mode: 'cors',
    headers: new Headers({
      'Accept': 'application/json',
  		'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      _id: albumId,
      artistName: artist,
      name: name,
      releaseDate: releaseDate,
      __v: version,
      genres: genres
    })
  }).then(checkStatus)
    .catch(err => console.log(err) )
}
