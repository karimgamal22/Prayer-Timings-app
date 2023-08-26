let cities = [
  {
    arabicName: "الرياض",
    name: "Ar Riyāḑ",
  },
  {
    arabicName: "القسيم",
    name: "Al Qaşīm",
  },
  {
    arabicName: "مكة المكرمة",
    name: "Makkah al Mukarramah",
  },
  {
    arabicName: "المنيا",
    name: "Al Minyā",
  },
  {
    arabicName: "الجيزة",
    name: "Al Jīzah",
  },
];

for (let city of cities) {
  const content = `
    <option class="option_city">${city.arabicName}</option>
     `;
  document.getElementById("cities_select").innerHTML += content;
}
document
  .getElementById("cities_select")
  .addEventListener("change", function () {
    document.querySelector(".city_name").innerHTML = this.value;

    let cityName = "";
    for (let city of cities) {
      if (city.arabicName === this.value) {
        cityName = city.name;
      }
    }
    getprayerstimingsofcity(cityName);
  });

function getprayerstimingsofcity(cityName) {
  let params = {
    country: "SA",
    city: cityName, //"Makkah al Mukarramah",
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then((res) => {
      const timines = res.data.data.timings;
      filltimeforprayer("fajr_time", timines.Fajr);
      filltimeforprayer("Sunrise_time", timines.Sunrise);
      filltimeforprayer("Dhuhr_time", timines.Dhuhr);
      filltimeforprayer("Asr_time", timines.Asr);
      filltimeforprayer("Maghrib_time", timines.Maghrib);
      filltimeforprayer("Isha_time", timines.Isha);

      const readabledate = res.data.data.date.readable;
      const weekday = res.data.data.date.hijri.weekday.ar;
      document.getElementById(
        "data_day"
      ).innerHTML = `${weekday} ${readabledate} `;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getprayerstimingsofcity("Ar Riyāḑ");

function filltimeforprayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
