import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import React from 'react';
import './style.css';

function BackToTop() {

    let myButton = document.getElementById('myBtn');

    //when the user scrolls down 20px from the top of the document, show the button 
    window.onscroll = function () {
        scrollFunction();
    }
    function scrollFunction(){
        if(
            document.documentElement.scrollTop > 300 ||
            document.body.scrollTop > 300
        ) {
            myButton.style.display = "flex";
        } else{
            myButton.style.display = "none";
        }
    }

    function topFunction () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

  return (
    <div className='back-to-top-btn' id="myBtn" onClick={()=> topFunction ()}>
      <ArrowUpwardRoundedIcon style={{color: "var(--blue)"}} />
    </div>
  )
}

export default BackToTop
