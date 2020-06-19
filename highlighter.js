var current_playing_ayah;

// get the audio element from index.html
var audio = $('#player')[0];

// when clicking the play button
$('.play').on("click", function () {

  // set the current playing ayah
  current_playing_ayah = $(this).parent().attr("id");

  // attach the audio file to the audio element 
  audio.src = current_playing_ayah + ".mp3"; // => "1.mp3", "2.mp3" etc...
  
  // load the audio file
  audio.load();
  
  // play it
  audio.play(); 

  // attach the word highlighter function
  audio.addEventListener('timeupdate', word_highlighter);

  // remove the highlights once the audio is over
  audio.onended = function () {
    $(".word").removeClass("word-highlight");
  };

});


function word_highlighter() {

  // get the total number of words in the ayah
  var number_of_words = $("#" + current_playing_ayah + " .arabic .word").length;

  // loop through all the words
  for (var word_no = 0; word_no <= number_of_words - 1; word_no++) {

    // just for unhighlighting the previous word
    var previous_word_no = word_no - 1;

    // get the current word's timestamp
    var word_timestamp = $("#" + current_playing_ayah + " .arabic").children().eq(word_no).attr("data-ts");

    // as long as the word timestamp is lower than the current audio time
    if (word_timestamp < audio.currentTime) {

      // unhighlight the previous word
      if (word_no > 0) {
        $("#" + current_playing_ayah + " .arabic").children().eq(previous_word_no).removeClass("word-highlight");
        $("#" + current_playing_ayah + " .transliteration").children().eq(previous_word_no).removeClass("word-highlight");
      }
      
      // highlight the current arabic word
      $("#" + current_playing_ayah + " .arabic").children().eq(word_no).addClass("word-highlight");

      // highlight the current word transliteration (optional)
      $("#" + current_playing_ayah + " .transliteration").children().eq(word_no).addClass("word-highlight");

    }

  }

}