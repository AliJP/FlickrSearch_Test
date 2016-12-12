(function (document, window) {
    var apiKey = '9c05546b384fb807d974eac4eeeb02f5';
    var apiURL = 'https://api.flickr.com/services/rest/';

    function getPhotos(searchQuery, pageSize, pageIndex, resultCallback) {
        var xhttp = new XMLHttpRequest();
        var parameters = {
            method: "flickr.photos.search"
            , api_key: apiKey
            , per_page: pageSize
            , format: "json"
            , nojsoncallback: 1
            , text: searchQuery
            , page: pageIndex
        };
        xhttp.open("GET", Utility.buildUrl(apiURL, parameters), true);
        xhttp.send(null);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var photos = JSON.parse(this.response).photos;
                resultCallback(photos);
            }
        };
    };

    function getPhotoThumpnail(photo) {
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
        '/' + photo.id + '_' + photo.secret + '_q.jpg';
    }

    window.Services = Utility.extend(window.Services || {}, {
        getPhotos: getPhotos
        , getPhotoThumpnail: getPhotoThumpnail
    });
})(document, window);
