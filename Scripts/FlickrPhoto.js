(function (document, window) {
    var pageIndex = 1
       , pageSize = 0;

    var dsPhotos = [];

    function getPhotoElement(photo) {
        var photoNode = document.createElement("div");
        photoNode.classList = ["photo-item search-card"];
        photoNode.addEventListener("click", selectPhoto);
        photoNode.setAttribute("data-photo-id", photo.id);
        var photoImage = document.createElement("img");
        photoImage.src = Services.getPhotoThumpnail(photo);
        photoImage.alt = photo.title;
        photoImage.classList = ["photo-image"];
        photoNode.appendChild(photoImage);
        var photoTitle = document.createElement("p");
        photoTitle.classList = ["photo-title"];
        photoTitle.innerHTML = photo.title;
        //var photoTitleInnerText = document.createTextNode(photo.title);
        //photoTitle.appendChild(photoTitleInnerText);
        photoNode.appendChild(photoTitle);

        return photoNode;
    }

    function addPhotos(photos) {
        var searchResult = document.getElementsByClassName("search-result")[0];

        document.getElementsByClassName("search-loading")[0].style.display = "none";
        if (photos.total == 0) {
            dsPhotos = [];
            document.getElementsByClassName("empty-result-message")[0].style.display = "block";
            document.getElementById("loadMorePhotos").style.display = "none";
        }
        else {
            document.getElementsByClassName("empty-result-message")[0].style.display = "none";
            for (var i = 0 ; i < photos.photo.length; i++) {
                dsPhotos.push(photos.photo[i]);
                var newPhoto = getPhotoElement(photos.photo[i])
                searchResult.appendChild(newPhoto);
            }
            if ((pageIndex) * pageSize < photos.total)
                document.getElementById("loadMorePhotos").style.display = "block";
            else
                document.getElementById("loadMorePhotos").style.display = "none";
        }
    }

    function getPhotos(searchQuery) {
        document.getElementsByClassName("search-loading")[0].style.display = "block";
        Services.getPhotos(searchQuery, pageSize, pageIndex, addPhotos);
    }

    function loadPhotos(searchQuery) {
        pageIndex = 1;
        pageSize = Number.parseInt(document.getElementsByClassName("search-result")[0].offsetWidth / 320) * 2;
        var searchResult = document.getElementsByClassName("search-result")[0];
        searchResult.innerHTML = "";

        getPhotos(searchQuery);
    }

    function loadMorePhotos(searchQuery) {
        pageIndex++;
        getPhotos(searchQuery);
    }

    function selectPhoto(event) {
        var selectedElement = event.currentTarget;
        var selectedID = selectedElement.getAttribute("data-photo-id");
        let selectedPhoto = Photos.DataSource.find(function (photo) { return photo.id == selectedID });
        if (selectedPhoto.selected) {
            selectedPhoto.selected = false;
            selectedElement.classList.remove("selected-item")
        }
        else {
            selectedElement.classList.add("selected-item")
            selectedPhoto.selected = true;
        }
    }

    window.Photos = Utility.extend(window.Photos || {}, {
        getPhotoElement: getPhotoElement
        , loadPhotos: loadPhotos
        , loadMorePhotos: loadMorePhotos
        , DataSource: dsPhotos
    });
})(document, window);
