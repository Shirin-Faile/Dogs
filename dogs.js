$(() => {
    const DOGS_URL = "https://dog.ceo/api/breeds/list/all";

    const dogBreeds = async () => {
        try {
            let response = await fetch(DOGS_URL);
            let data = await response.json();
            let breeds = Object.keys(data.message);

            updateBreedSelect(breeds);
        } catch (error) {
            $('.Dogs').empty().append(`<p>Error fetching dog breed.</p>`);
        }
    };

    const updateBreedSelect = (breeds) => {
        const dogSearchInput = $('#dog-search');
        breeds.forEach(breed => {
            dogSearchInput.append($('<option>').val(breed).text(breed))
        });
    };

    const fetchDogImages = async (selectedBreed) => {
        const requestURL = `https://dog.ceo/api/breed/${selectedBreed}/images/random/8`;

        try {
            let response = await fetch(requestURL);
            let data = await response.json();
            displayDogImages(data.message);
        } catch (error) {
            $('.Dogs').empty().append(`<p>Error fetching dog images.</p>`);
        }
    };

    const displayDogImages = (images) => {
        const dogsContainer = $('.Dogs');
        dogsContainer.empty();

        images.forEach(imageUrl => {
            dogsContainer.append($('<img>').attr('src', imageUrl).attr('alt', 'Dog Image'));
        });
    };

    $('.dog-search').on('click', () => {
        const selectedBreed = $('#dog-search').val();

        if (selectedBreed) {
            fetchDogImages(selectedBreed);
            
            $('#dog-search-label').hide();
        }
    });

    dogBreeds();
});