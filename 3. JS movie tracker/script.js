document.addEventListener('DOMContentLoaded', function () {
    var moviesContainer = document.getElementById('moviesContainer');
    var addMovieFieldButton = document.getElementById('addMovieFieldButton');

    var movies = [];

    var movieFieldCounter = 0;

    function createMovieField() {
        var movieField = document.createElement('form');
        movieField.classList.add('savedMovie');
        movieField.innerHTML = `
            <input type="text" id="movieName${movieFieldCounter}" placeholder="Movie Name" class="row">
            <select id="priority${movieFieldCounter}" class="row">
                <option value="very-low">Very Low</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very-high">Very High</option>
            </select>
            <button type="button" class="addMovieButton">Save Movie</button>
            <button type="button" class="removeMovieButton">Remove Movie</button>
        `;
        moviesContainer.appendChild(movieField);
        movieFieldCounter++;

        var movieNameInput = movieField.querySelector(`#movieName${movieFieldCounter - 1}`);
        var prioritySelect = movieField.querySelector(`#priority${movieFieldCounter - 1}`);
        var saveButton = movieField.querySelector('.addMovieButton');
        var removeButton = movieField.querySelector('.removeMovieButton');

        saveButton.addEventListener('click', function () {
            var movieName = movieNameInput.value;
            var priority = prioritySelect.value;

            saveMovie(movieName, priority);
            displayMovie(movieName, priority, movieField);

            movieNameInput.value = '';
            prioritySelect.value = 'very-low';
        });

        removeButton.addEventListener('click', function () {
            removeMovieField(movieField);
        });
    }
    function saveMovie(movieName, priority) {
        var movie = {
            name: movieName,
            priority: priority
        };
        movies.push(movie);
    }

    function displayMovie(newMovieName, newPriority, movieField) {
        var index = movies.length - 1;
        var movie = movies[index];

        var movieText = document.createElement('div');
        movieText.classList.add('savedMovie');
        movieText.innerHTML = `
            <p id="savedMovieText"><b>Movie Name: </b>${newMovieName} <b>Priority: </b>${newPriority}</p>
            <button type="button" class="editMovieButton">Edit Movie</button>
            <button type="button" class="removeMovieButton">Remove Movie</button>
        `;

        moviesContainer.replaceChild(movieText, movieField);

        var removeButton = movieText.querySelector('.removeMovieButton');
        var editButton = movieText.querySelector('.editMovieButton');

        removeButton.addEventListener('click', function () {
            removeMovieField(movieText);
        });

        editButton.addEventListener('click', function () {
            editMovieField(movieText, newMovieName, newPriority);
        });
    }

    function removeMovieField(movieField) {
        moviesContainer.removeChild(movieField);
    }

    function editMovieField(movieField, oldMovieName, oldPriority) {
        movieField.innerHTML = `
            <input type="text" id="movieName${movieFieldCounter}" placeholder="Movie Name" class="row">
            <select id="priority${movieFieldCounter}" class="row">
                <option value="very-low">Very Low</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very-high">Very High</option>
            </select>
            <button type="button" class="addMovieButton">Save Movie</button>
            <button type="button" class="removeMovieButton">Remove Movie</button>
        `;
    
        movieFieldCounter++;
    
        var movieNameInput = movieField.querySelector(`#movieName${movieFieldCounter - 1}`);
        var prioritySelect = movieField.querySelector(`#priority${movieFieldCounter - 1}`);
        var saveButton = movieField.querySelector('.addMovieButton');
        var removeButton = movieField.querySelector('.removeMovieButton');
    
        movieNameInput.value = oldMovieName;
        prioritySelect.value = oldPriority;
    
        saveButton.addEventListener('click', function () {
            var movieName = movieNameInput.value;
            var priority = prioritySelect.value;
            displayMovie(movieName, priority, movieField);
        });
    
        removeButton.addEventListener('click', function () {
            removeMovieField(movieField);
        });
    }

    addMovieFieldButton.addEventListener('click', function () {
        createMovieField();
    });
});