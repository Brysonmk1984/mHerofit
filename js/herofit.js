
jQuery(document).ready(function () {
  
  const featuredVideo = document.getElementById('herofitComingSoonVideo');
  const videoPlayerButton = document.getElementById("playVideoImg");
  const logoVideoOverlay = document.getElementById('videoPlayerButton');
  const hasSeenVideo = localStorage.getItem('hf-hasSeenVideo');
  const donateButton = document.getElementById('donateButton');
  const donationMethods = document.getElementsByClassName('donation-method');
  const countdownTimer = document.getElementById('countdownTimer');

  // Check LocalStorage to see if user has already seen the promo video. If so, set 'hf-hasSeenVideo' so they don't see it again 
  if(!hasSeenVideo){
    setTimeout(() =>{
      $('#videoModal').modal('show');
      localStorage.setItem('hf-hasSeenVideo', true);
    },3000)
  }


  donateButton.addEventListener("click", () => {
    $('#donateModal').modal('show');
  });

  // Clicking one of the donation options within the main donateModal will open a unique payment type modal
  Array.from(donationMethods).forEach((domElement)=>{
    const matchingModal = $(domElement).data("modal-name");
    domElement.addEventListener('click', () =>{
      $('#donateModal').modal('hide');
      $(`#${matchingModal}`).modal('show');
    });
  });
  
  // User clicks the play video button
  videoPlayerButton.addEventListener('click', () =>{
    $('#videoModal').modal('show');
    setTimeout(() =>{
      featuredVideo.play();
      localStorage.setItem('hf-hasSeenVideo', true);
    },1000);
  });

  // Listening for the video to start playing, if it does, hide the overlay modal
  featuredVideo.addEventListener("playing", () => {
    $('#modalLogo').hide();
  });

  // Listenting for video modal being closed, pause video when it happens
  $('#videoModal').on('hidden.bs.modal', function () {
    featuredVideo.pause();
  });


  const tl = (function(){
    let days = "00";
    let hours = "00";
    let minutes = "00";
    let seconds = "00";

    return {
      setDays: function(d){
        days = d;
      },
      setHours: function(h){
        hours = h;
      },
      setMinutes: function(m){
        minutes = m;
      },
      setSeconds: function(s) {
        seconds = s;
      },
      getDays: function(){
        return days;
      },
      getHours: function(){
        return hours;
      },
      getMinutes: function(){
        return minutes;
      },
      getSeconds: function(){
        return seconds;
      },
      getFullTime: function(){
        return `${days}:${hours}:${minutes}:${seconds}`;
      }
    }
  })();

  const { setDays, setHours, setMinutes, setSeconds, getHours, getMinutes, getSeconds, getFullTime } = tl;


  function runCountdownTimer(){
      const eventDate = moment.tz(`2021-12-21 00:00:00`, 'YYYY-MM-DD HH:mm:ss', true, "America/Denver").unix();

      let currentTime = moment.tz(Date.now(), "America/Denver").unix(),
      diffTime = eventDate - currentTime,
      interval = 1000,
      duration = moment.duration(diffTime * 1000, 'milliseconds');

    setInterval(() =>{

      duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
      let d = moment.duration(duration).days().toString(),
      h = moment.duration(duration).hours().toString(),
      m = moment.duration(duration).minutes().toString(),
      s = moment.duration(duration).seconds().toString();

      d = d.length === 1 ? '0' + d : d;
      h = h.length === 1 ? '0' + h : h;
      m = m.length === 1 ? '0' + m : m;
      s = s.length === 1 ? '0' + s : s;

      // show how many days, hours, minutes and seconds are left
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

    }, interval);
  }
  runCountdownTimer();

  setInterval(() =>{
    countdownTimer.innerHTML = getFullTime() || 12/21/21;
  },1000)

  // User is landing on the site attempting to go directly to a certain page
  const page = window.location.hash;
  if(page) {
    const pageWithoutHash = page.substring(1,page.length)
    const elementWithTabName = document.getElementsByClassName(`data-tab-${pageWithoutHash}`)[0];

    // Either open donate modal or go to correct page
    if(pageWithoutHash === "donate"){
      $("#donateButton").click();
    }else{
      // go to correct page
      setTimeout(() =>{
        elementWithTabName.click();
      },200)
    }

  }

});