const url = 'http://mutably.herokuapp.com/albums'
const getAlbums = document.querySelector('.get-albums-btn')
const listGroup = document.querySelector('.list-group')

$(document).ready(function(){

  // Get All Albums On Load
  getAllAlbums();

  $(document).on('click', '.get-albums-btn', function() {

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
      console.log(album)
      $(".list-group")
        .append(`<li class="list-group-item" data-id="${album._id}">${JSON.stringify(album.name)}
                 <i class="fa fa-trash-o" aria-hidden="true"></i>
                 <i class="fa fa-pencil-square-o" aria-hidden="true"></i>`);

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
