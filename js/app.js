// GLOBAL VARIABLES

var searchButton = document.querySelector('.search button');
var searchField = document.querySelector('.search input');
var videoPreview = document.querySelector('.video-preview');
var videoList = document.querySelector('.video-list');
var key = 'AIzaSyBaSUfZbpOp_a9z_IOrtt2qjtyBzJ4wPm8';


function onSearch() {
	
	searchField.value.trim() && getRandomVideos(searchField.value);
	searchField.value = '';
}

// FUNCTIONS FOR GETTING AND CREATING VIDEOS

function getRandomVideos(searchValue) {

	var request = new XMLHttpRequest();

	request.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchValue + '&key=' + key);

	request.onload = function() {
		listVideos(JSON.parse(request.responseText).items);		
	}

	request.send();
}

function listVideos(videos) {

	videoList.innerHTML = '';

	videos.forEach(function(vid) {
		addVideo(vid);
	})	
}

function addVideo(data) {

	var vidElement = document.createElement('div');
	var img = '<img src="' + data.snippet.thumbnails.medium.url + '">';
	
	var title = '<h3>' + data.snippet.title + '</h3>';
	var desc = '<div class="description">' + data.snippet.description + '</div>';

	vidElement.innerHTML = img + '<section>' + title + desc + '</section>';

	videoList.appendChild(vidElement);

	vidElement.querySelectorAll('h3, img').forEach(function(element) {
		element.addEventListener('click', function() {
			openVideo(data.id.videoId);
			
		});
		element.addEventListener('click', function() {
			getRelatedVideos(data.id.videoId);
		});	
	});
};

// FUNCTIONS FOR OPENING AND GETTING RELATED VIDEOS

function openVideo(id) {

	videoPreview.innerHTML = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/'+ id + '"frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
};

function getRelatedVideos(id) {
	
	var relatedVideosRequest = new XMLHttpRequest();

	relatedVideosRequest.open('GET', ' https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=' + id + '&type=video&key=' + key);

	relatedVideosRequest.onload = function() {
		listVideos(JSON.parse(relatedVideosRequest.responseText).items);		
	}

	relatedVideosRequest.send();
}



// INITIALIZE

searchButton.addEventListener('click', onSearch);
searchField.addEventListener('keyup', function(event) {
   
    event.keyCode === 13 && onSearch();
});
