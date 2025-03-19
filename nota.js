var pistoletazo;
var so={
    ctx: undefined,
    maxNotas:20,
    notas: [],//array notas
    mainGain: undefined,
    ombak: 1, //batimiento
    duracion:7,
    freqBase:216,
    metronomo:undefined
}

repite=function(){
    console.log("repite")
}

tocaNota=function(){

}

creaNota=function(freq,vol,att,rel,dur,omb) {
   
    freq=freq||so.freqBase;//Hercios
    vol=vol||.05;// 0 a 1
    att=att||2;//segs ataque
    rel=rel||3;//segs release
    dur=dur||so.duracion;//segs la duración incluye attaque y release
    omb=omb||so.ombak;//segs 

    console.log("creoNota freq:",freq,"vol:",vol,"att",att,"rel",rel,"dur",dur,"omb",omb);
    let osc1=so.ctx.createOscillator();
    osc1.type="sine";
    let osc2=so.ctx.createOscillator();
    osc2.type="sine";
    let gain=so.ctx.createGain();
    let nota={};

    osc1.frequency.setValueAtTime(freq, so.ctx.currentTime); //frecuencia del osc1
    osc1.connect(gain);
    osc2.frequency.setValueAtTime(freq+omb, so.ctx.currentTime); //frecuencia del osc2
    osc2.connect(gain);
    
    gain.gain.value=0;//volumen de la nota
    gain.connect(so.mainGain);
    
    nota.osc1=osc1;
    nota.osc2=osc2;
    nota.gain=gain;
    nota.vol=vol;
    nota.att=att;
    nota.dur=dur;
    nota.rel=rel;
    nota.omb=omb;

    gain.gain.linearRampToValueAtTime(vol,so.ctx.currentTime+att);//ataque
    pistoletazo=setInterval(()=>{gain.gain.value=vol;
            gain.gain.linearRampToValueAtTime(0,getTime()+rel);//release
            repite(nota)},//repite nota!!!!
        so.ctx.currentTime*1000+dur*1000-rel*1000)//cuando tira release en ms 
    
    osc1.start();//play
    osc2.start();
   
    so.notas.push(nota);
    return nota
}//devuelve nota y la guarda en so.notas

creaVibra=function(){
    so.ctx=new AudioContext();//creo el canvas del audio
    so.mainGain=so.ctx.createGain();//volumen principal
    so.mainGain.gain.value=1;//maximum volume
    so.mainGain.connect(so.ctx.destination);//conecto a la tarjeta de sonido

    for (let i = 0; i < so.maxNotas; i++) {
        creaNota(so.freqBase*i,.05*Math.random(),so.duracion*Math.random()/2,so.duracion*Math.random()/2,so.duracion,i)
    }
 
}

dale=function(){
    console.log("dale, inicia sistema");
    boton.remove(); 
    creaVibra();
}

onload=function(){
    console.log("cargado")
}

//// helpers
getTime=function(){
    return so.ctx.currentTime
}

