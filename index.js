//gán Khối div container vào biến container
const container = document.querySelector('.container');

//gán Nút search vào biến search
const search = document.querySelector('.search-box button');

//gán Khối div weather-box vào biến weatherBox
const weatherBox = document.querySelector('.weather-box');

//gán Khối div weather-details vào biến weatherDetails
const weatherDetails = document.querySelector('.weather-details');

//gán Khối div not-found vào biến error404
const error404 = document.querySelector('.not-found');


//Khai báo biến option để thực hiện chức năng scroll
let option = { 
    top: 180,
    behavior: "smooth" 
}
window.scrollTo(option);




//Khi click vào Nút search: 
search.addEventListener('click', () => {
    const APIkey = "e687d71545467c9ef7e7fcfba6427222";
    const city = document.querySelector('.search-box input').value; 
    
    if (city === '') {
        return;
    }


    //fetch() là một function dùng để call API mà Java Script cung cấp sẵn (khác với Axios: muốn sử dụng Axios phải import thư viện)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`) //url API này lên trên web Open Weather
    .then(response => {
        //(Về vấn đề sử dụng ngoặc nhọn khi dùng fetch, xem thêm link sau: https://stackoverflow.com/questions/69198727/why-curly-braces-while-handling-a-promise-object-provides-undefined-data)
        return response.json();
    }) //--> function then() này trả về kết quả là một Promise. Tạm gọi là Promise1.
    .then(json => { //--> sử dụng biến json để hứng kết quả Promise1 trả về.
        console.log(json);

        // Nếu kết quả trả về có cod = 404 (not found) thì...
        if (json.cod === "404") {
            //...container sẽ mở rộng height ra 400px...
            container.style.height = "500px";

            //...Khối weather-box, weather-details bị ẩn đi...
            weatherBox.style.display = 'none';
            weatherDetails.style.display = "none";

            //...Khối not-found sẽ hiện lên ở dạng block...
            error404.style.display = "block";

            //??? tìm hiểu cái fadeIn
            error404.classList.add("fadeIn");

            option.top = 130;
            window.scrollTo(option);

            return;
        }


        error404.style.display = "none";
        error404.classList.remove("fadeIn");


        //gán hình ảnh thời tiết vào biến image
        const image = document.querySelector(".weather-box img");
    
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");


        switch (json.weather[0].main) {
           case 'Clear':
               image.src = "./clear.png";
               break;
           case 'Rain':
               image.src = "./rain.png";
               break;
           case 'Snow':
               image.src = "./snow.png";
               break;
           case 'Clouds':
               image.src = "./clouds.png";
               break;
           case 'Haze':
               image.src = "./haze.png";
               break;
           default:
               image.src = './clear.png';
        }



        temperature.innerHTML = `${json.main.temp}
        <span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`
        wind.textContent = `${parseInt(json.wind.speed)} Km/h`
        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '600px'
    

        option.top = 130;
        window.scrollTo(option);

         


    })

})



