document.addEventListener('DOMContentLoaded', () => {

  //get id of input element
  const id = document.getElementById("input-data");
  //boolean value to check if filled
  let isFilled = false;
  //create data to be displayed
  const data = [
    "Margai", "Keith", "Abdul", "Ali", "Sadam", "Masoud", "Sally", "Salma", "Yusuf", "Hawa", "Rina", "Faiza", "Hudah", "Mavita",
    "Halima", "Fatma", "Hadya", "Omar", "Adnan", "Alhaj", "Rumana"
  ];
  //api data
  apiData = {
    'title':[],
    'releaseDate':[]
  };

  //sort data
  data.sort();

  const initDialog = () => {
    data.forEach((value, key) => {
      $('.dropdown').addClass('show').append("".concat("<div class='dropdown-content'>", value, "</div>"));
    });
  }

  const closeDialog = () => {
    $('.dropdown').removeClass('show');
  }

  const openDialog = () => {
    if(!isFilled){
      document.getElementsByClassName('dropdown')[0].addClass('show');
    }
  }

  const clearDialog = () => {
    $(".dropdown").empty();
  }

  //id.addEventListener('focus', initDialog);
  id.addEventListener('blur', closeDialog);

  const dataCollector = (input) => {

    if(input !== ""){

      input = input.toLowerCase();
      clearDialog();

      //get data from api
      $.ajax({
        url:"https://api.themoviedb.org/3/search/movie?api_key=7538a1ba766c36605ab0e8e10bab23da&query=".concat(input),
        method:"GET",
        dataType:"json",
        success:function(data){

          //reset api data to empty array
          apiData.title = [];
          apiData.releaseDate = [];

          data.results.forEach((value, key) => {
            apiData.title.push(value['title']);
            apiData.releaseDate.push(value['release_date'].substring(0, value['release_date'].indexOf("-")));

          });

          for(var z = 0; z < apiData.title.length;z++){
            if(apiData.title[z].toLowerCase().startsWith(input)){
              $('.dropdown').append("".concat("<div class='dropdown-content'>", apiData.title[z], "(", apiData.releaseDate[z], ")","</div>"));
            }
          }
        },
        error:function(x){
          console.log(x.status);
        }
      });
    }

    // for(var z = 0;z < data.length;z++){
    //   if(data[z].toLowerCase().startsWith(input)){
    //     $('.dropdown').append("".concat("<div class='dropdown-content'>", data[z], "</div>"));
    //   }
    // }
  }

  id.addEventListener('input', (e) => {
    $('.dropdown').addClass('show');
    isFilled = false;
    dataCollector(e.target.value)

    });

    var myData = "2015-12-25";

    console.log(myData.substring(0, myData.indexOf("-")));


});
