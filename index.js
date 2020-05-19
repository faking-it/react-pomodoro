import React from 'react'
import ReactDOM from 'react-dom'

const Parent = () => {

    function chronoRaise(){
        let timer = document.getElementById("time").innerHTML.split(':');
        let min = timer[0];
        min++;
        if (min<10){
            min = '0'+min;
        }
        document.getElementById("time").innerHTML = min + ':00'
    }

    function chronoDecrease(){
        let timer = document.getElementById("time").innerHTML.split(':');
        let min = timer[0];
        if (min > 0){
            min--;
            if (min<10){
                min = '0'+min;
            }
            document.getElementById("time").innerHTML = min + ':00'
        }   
    }

    function chrono(min, sec){
        if (sec == 0){
            if(min == 0){
                clearTimeout(chronoID)
            }
            else {
                min--;
                sec = 59;
                if (min<10){
                    min = '0'+min
                }
                document.getElementById("time").innerHTML = min + ':' + sec
            }
        }
        else {
            sec--;
            if (sec<10){
                sec = '0'+sec
            }
            document.getElementById("time").innerHTML = min + ':' + sec;
        }
        const chronoID = setTimeout(() => {
            chrono(min, sec)
          }, 1000);
        return () => clearTimeout(chronoID)
    }

    function chronoStart(){
        document.chrono.startstop.value = "Pause";     
        document.chrono.startstop.onClick = {chronoStop};
        let timer = document.getElementById("time").innerHTML.split(':');
        let min = timer[0];
        let sec = timer[1];
        chrono(min, sec)
        
    }

    function chronoStop(){
        document.chrono.startstop.value = "Démarrer";
        document.chrono.startstop.onclick = {chronoStart};
        clearTimeout();
    }

    function chronoRestart(){
        document.getElementById("time").innerHTML = '00:00';
    }

    return (
        <div>
            <div id="time">00:00</div>
            <form name="chrono">
                <input type="button" name="plus" value="+" onClick={chronoRaise} />
                <input type="button" name="minus" value="-" onClick={chronoDecrease} />
                <input type="button" name="startstop" value="Démarrer" onClick={chronoStart} />
                <input type="button" name="reset" value="Réinitialiser" onClick={chronoRestart} />
            </form>
        </div>
    );

}



ReactDOM.render(<Parent />, document.getElementById('app'))