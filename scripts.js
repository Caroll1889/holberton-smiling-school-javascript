function displayQuote(name, pic_url, text, title) {
    $('#quote').append(
        `<div class="carousel-item">
            <div class="row text-white ml-2">
                <div class="d-flex justify-content-center flex-wrap ">
                    <div class="mt-4 col-sm-7 col-md-2 d-flex justify-content-center">
                        <img src="${pic_url}" alt="" class="image" width="120" height="120">
                    </div>
                    <div class="mt-4 col-sm-8 col-md-7">
                        <p class="paragraph-carousel">${text}</p>
                        <p class="name mt-4 mb-1">${name}</p>
                        <p class="italic">${title}</p>
                    </div>
                </div>
            </div>
        </div>`
    )
}

function quotes() {
    $('.loader').show()
    $.ajax({
        type: 'GET',
        url: 'https://smileschool-api.hbtn.info/quotes',
        error: function (error) {
            alert(error)
        },
        success: function (response) {
            response.forEach(({ name, pic_url, text, title }) => {
                displayQuote(name, pic_url, text, title)
            });
            $('.carousel .carousel-item:first').addClass('active')
            $('.loader').hide()
        }
    })
}
quotes()

function cards(q = '', topic = 'all', sort = 'most_popular') {
    $('.loader').show()
    $.ajax({
        type: 'GET',
        url: 'https://smileschool-api.hbtn.info/courses',
        data: {
            q: q,
            topic: topic,
            sort: sort,
        },
        error: function (error) {
            alert(error)
        },
        success: function (response) {
            if (response.courses.length === 1) {
                let videos = document.querySelector('#videos')
                videos.innerHTML = `1 video`
            } else {
                let videos = document.querySelector('#videos')
                videos.innerHTML = `${response.courses.length} videos`
            }
            $('#cards').empty()
            response.courses.forEach(function (element) {
                $('#cards').append(
                    `<div class="col-sm-12 col-md-4 col-lg-3">
                        <div class="card mb-4">
                            <img src="${element.thumb_url}" alt="" class="card-img-top">
                            <div class="card-img-overlay d-flex justify-content-center mt-5">
                                <img src="images/play.png" width="60" height="60">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text paragraph-card">${element['sub-title']}</p>
                                <div class="row">
                                    <div class="col-3">
                                        <img src="${element.author_pic_url}" alt="" class="image" width="60" height="60">
                                    </div>
                                    <div class="col-6">
                                        <h3 class="ml-4 mt-3 text-center">${element.author}</h3>
                                    </div>
                                </div>
                                <div class="row d-flex justify-content-around">
                                    <div class="ml-3 mt-1 col-6" id=''></div>
                                    <div class="col-6">
                                        <h3 class="mx-2 mt-2 text-end">${element.duration}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`)

                for (let i = 1; i <= 5; i++) {
                    if (i <= element.star) {
                        $('#stars').append('<img src="images/star_on.png" alt="" width="15" height="15">')
                    } else {
                        $('#stars').append('<img src="images/star_off.png" alt="" width="15" height="15">')
                    }
                }
            })
            $('.loader').hide()
        }
    })
}
cards()

$('.form-input input .select button').change(function () {
    let q = $('#search').val()
    let topic = $('#dropdownMenu2').val()
    let sort = $('dropdownMenu3').val()
    console.log(q, topic, sort)
    cards(q, topic, sort)
})

function mostPopular() {
    $('.loader').show()
    $.ajax({
        type: 'GET',
        url: 'https://smileschool-api.hbtn.info/popular-tutorials',
        error: function (error) {
            alert(error)
        },
        success: function (response) {
            response.forEach(function (item) {
                if (item.id >= 5) {
                    return;
                }
                $('#popular').append(
                    `<div class="col-sm-12 col-md-6 col-lg-3" >
                    <div class="card mb-4">
                    <img src="${item.thumb_url}" alt="" class="card-img-top">
                    <div class="card-img-overlay d-flex justify-content-center mt-5">
                        <img src="images/play.png" alt="" width="50" height="50">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text paragraph-card">${item['sub-title']}</p>
                        <div class="row ml-1">
                            <img src="${item.author_pic_url}" alt="" class="image" width="60" height="60">
                            <h3 class="ml-3 mt-3">${item.author}</h3>
                        </div>
                        <div class="row d-flex justify-content-between">
                            <div class="ml-3 mt-1">
                                <img src="images/star_on.png" alt="" width="15" height="15">
                                <img src="images/star_on.png" alt="" width="15" height="15">
                                <img src="images/star_on.png" alt="" width="15" height="15">
                                <img src="images/star_on.png" alt="" width="15" height="15">
                                <img src="images/star_off.png" alt="" width="15" height="15">
                            </div>
                            <div>
                                <h3 class="mx-2 mt-2">${item.duration}</h3>
                            </div>
                        </div>
                    </div>
                `)
            })
            $('.loader').hide()
        }
    })
}
mostPopular()

function latestVideos() {
    $('.loader').show()
    $.ajax({
        type: 'GET',
        url: 'https://smileschool-api.hbtn.info/latest-videos',
        error: function (error) {
            alert(error)
        },
        success: function (response) {
            response.forEach(function (item) {
                if (item.id >= 5) {
                    return;
                }
                $('#latest').append(
                    `<div class="col-sm-12 col-md-6 col-lg-3" >
                    <div class="card mb-4">
                    <img src="${item.thumb_url}" alt="" class="card-img-top">
                    <div class="card-img-overlay d-flex justify-content-center mt-5">
                        <img src="images/play.png" alt="" width="50" height="50">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text paragraph-card">${item['sub-title']}</p>
                        <div class="row ml-1">
                            <img src="${item.author_pic_url}" alt="" class="image" width="60" height="60">
                            <h3 class="ml-3 mt-3">${item.author}</h3>
                        </div>
                        <div class="row d-flex justify-content-between">
                            <div class="ml-3 mt-1">
                                <img src="images/star_on.png" alt="" width="15" height="15">
                                <img src="images/star_on.png" alt="" width="15" height="15">
                                <img src="images/star_on.png" alt="" width="15" height="15">
                                <img src="images/star_on.png" alt="" width="15" height="15">
                                <img src="images/star_off.png" alt="" width="15" height="15">
                            </div>
                            <div>
                                <h3 class="mx-2 mt-2">${item.duration}</h3>
                            </div>
                        </div>
                    </div>
                `)
            })
            $('.loader').hide()
        }
    })
}
latestVideos()