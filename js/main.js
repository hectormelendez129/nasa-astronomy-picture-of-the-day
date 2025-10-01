//The user will enter a date. 
// Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

// api key for nasa:   u6GNasxyDF98i7Lsfld9MVtlVsXorWBasAUkvwjr
/*

create const for button doc.qs
activate button with .addevli(click, func)

grab text value, convert to yyyy-mm-dd

create function called getNasaDailyPic
* Create the following inside of the function
** create the const url with backtick, set interpolation for date
** create the fetch call
***write data.title inside of the h2 and img-alt
***set img-src to data.url
***set h3 to data.explanation
*** grab date value, convert to yyyy-mm-dd
*/


const getPicbtn = document.querySelector('button')
getPicbtn.addEventListener('click', getNasaDailyPic)

function getNasaDailyPic() {
    //grab date input
    const userDate = document.querySelector('input').value
    //insert date into url
    const url = `https://api.nasa.gov/planetary/apod?api_key=u6GNasxyDF98i7Lsfld9MVtlVsXorWBasAUkvwjr&date=${userDate}`

    fetch(url)
        .then(res => res.json()) //parse response into aa json
        .then(data => {
            //logs json, title, url, explanations is description
            console.log(data)
            console.log(data.title)
            console.log(data.url)
            console.log(data.explanation)

            //set h2 to data.title            
            document.querySelector('h2').innerText = data.title

            //replace h3 with data.explanation
            document.querySelector('h3').innerText = data.explanation

            //pull image
            if (data.url.includes("image")) {
                document.querySelector('#displayImage').innerHTML =
                    `<img width="560" height="315" 
                        src="${data.url}" 
                        title="${data.title}"
                    </img>`
                //clear other media
                document.querySelector('#youtubePlayer').innerHTML = "";
                document.querySelector('#mp4Player').innerHTML = "";

                //display youtube Video
            } else if (data.url.includes('youtube')) {
                document.querySelector('#youtubePlayer').innerHTML =
                    `<iframe width="560" height="315" 
                        src="${data.url}" 
                        title="${data.title}" 
                        frameborder="0" 
                        allowfullscreen>
                    </iframe>`
                //clear other media
                document.querySelector('#displayImage').innerHTML = "";
                document.querySelector('#mp4Player').innerHTML = "";

                //display mp4 player
            } else if (data.media_type.includes("other")) {

                document.querySelector('#mp4Player').innerHTML =
                   `<img width="560" height="315" 
                        src="${data.url}" 
                        title="${data.title}"
                    </img>`
                //clear other media
                document.querySelector('#youtubePlayer').innerHTML = "";
                document.querySelector('#displayImage').innerHTML = "";

            } else {
                console.log('Not A Supported Media')
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}