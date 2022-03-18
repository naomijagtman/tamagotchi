var scoreBlijdschap = 5;
var hoeVaakGespeeld = 0;
var bakjeStatus = "leeg";
var kanSpelen = false;
var aanHetSlapen = false;

var blijdschapsMeter = document.querySelector("#blijdschapsbar");
var fotoKat = document.querySelector("#kat");
var bakjeEten = document.querySelector("#bakje")
var muis = document.querySelector("#muis");
var deur = document.querySelector("#deur");
var omgeving = document.querySelector("#omgeving");

var pElement = document.querySelector("#praten")

var h1Element = document.querySelector("#naam");
var namen = ["Luna", "Simba", "Tijger", "Angie", "Minoes", "Mickey", "Tommy", "Gizmo", "Max", "Indy", "Sammy", "Bobbert", "Ricky"];
var randomGetal = Math.random() * namen.length;

var spinnen = document.querySelector("#spin");
var blaas = document.querySelector("#blaas");
var eetGeluid = document.querySelector("#eetgeluid")

var buttonSnoepjes = document.querySelector("#buttonsnoepjes");
var buttonSpelen = document.querySelector("#buttonspelen");
var buttonSlapen = document.querySelector("#buttonslapen");

var verblijdingInterval;

//Naam kat veranderen
h1Element.textContent = namen[12];

randomGetal = Math.floor(randomGetal);

h1Element.textContent = namen[randomGetal];

// intervalchecker. Als het bakje met eten leeg is, gaat er 1 blijdschap per 2 seconde af
setInterval(() => {
    if (bakjeStatus == "leeg") {
        blijdschapEraf()
    }
}, 2000)

// blijdschapsmeter
function fotoBlijdschapsmeterVeranderen() {

    //Dit veranderd het plaatje in de blijdschapsmeter
    var plaatje = "images/blijdschapsbar" + scoreBlijdschap + ".png";
    blijdschapsMeter.src = plaatje;
}

function blijdschapErbij() {

    //Hiermee gaat de blijdschap erbij iedere keer als de functie wordt gebruikt en stopt het met regenen
    scoreBlijdschap = scoreBlijdschap + 1;
    omgeving.classList.remove("regenachtergrond");

    //Dit zorgt ervoor dat de blijdschap niet hoger kan zijn dan 10
    if (scoreBlijdschap > 10) {
        scoreBlijdschap = 10;
    } else { }

    fotoBlijdschapsmeterVeranderen();

    //Als de blijdschapscore 10 is, komt er confetti en tekst
    if (scoreBlijdschap == 10) {
        omgeving.classList.add("confettiachtergrond");
        pElement.textContent = "'Jaaa ik ben zo blij!!!!!'";
    } else { }
}

function blijdschapEraf() {

    //Hiermee gaat de blijdschap eraf iedere keer als de functie wordt gebruikt en stopt de confetti
    scoreBlijdschap = scoreBlijdschap - 1;
    omgeving.classList.remove("confettiachtergrond");

    //Dit zorgt ervoor dat de blijdschap niet lager kan zijn dan 0
    if (scoreBlijdschap < 0) {
        scoreBlijdschap = 0;
    } else { }

    fotoBlijdschapsmeterVeranderen();

    //Als de blijdschapscore 0 is, komt er regen en tekst
    if (scoreBlijdschap == 0) {
        omgeving.classList.add("regenachtergrond")
        pElement.textContent = "'WAT EEN HONDENWEER, MAAK ME BLIJ!!!'";
    } else { }
}

//Vul het bakje met eten met 1 click
function bakjeEtenVol() {

    bakjeStatus = "vol";
    kanSpelen = true;

    //Dit verandert de foto van het bakje, speelt een eetgeluid af en verandert te tekst
    bakjeEten.src = "images/bakjeetenvol.png";
    eetGeluid.play();
    pElement.textContent = "'Mmmm eten!!'";

    blijdschapErbij();

    //Zit in bijna iedere function, dan wordt hoeVaakgespeeld weer 0
    hoeVaakGespeeld = 0;

    //Dit zorgt ervoor dat het eetbakje na 10 sec weer leeg is
    setTimeout(function () {
        bakjeEtenLeeg();
    }, 10000);
}

bakjeEten.addEventListener("click", bakjeEtenVol);

//Leeg het bakje met eten met dblclick
function bakjeEtenLeeg() {

    bakjeStatus = "leeg";
    kanSpelen = false;

    //Dit veranderd de foto naar een leeg bakje en de tekst
    bakjeEten.src = "images/bakjeeten.png";
    pElement.textContent = "'IK HEB HONGER!!!'";

    hoeVaakGespeeld = 0;
}

bakjeEten.addEventListener("dblclick", bakjeEtenLeeg);

// kat aaien
function aaiKat() {

    //Als de kat wordt geaaid, gaat het geluid 'spinnen' afspelen, gaat de kat staan en komt er 1 blijdschap bij.
    fotoKat.src = "images/katstaan.png";
    spinnen.play();
    blijdschapErbij();
    pElement.textContent = "'Ja hier wordt ik blij van!'";

    //Hiermee wordt de blijdschapsinterval in de slaapfunctie gecleard
    clearInterval(verblijdingInterval);

    hoeVaakGespeeld = 0;

    aanHetSlapen = false;
}

fotoKat.addEventListener("mouseover", aaiKat);

function stopMetMuisOpKat() {

    //Als je de cursor niet meer op de kat hebt stopt het spinnen en het blazen
    spinnen.pause();
    blaas.pause();
    fotoKat.src = "images/katzitlach.png";
    pElement.textContent = "'miauw!'";

    clearInterval(verblijdingInterval);

    hoeVaakGespeeld = 0;

    aanHetSlapen = false;
}

fotoKat.addEventListener("mouseleave", stopMetMuisOpKat);

// kat slaan
function slaKat() {

    //Als de kat wordt geslagen gaat het geluid 'blaas' afspelen, verandert de afbeelding en gaat er 1 blijdschap af
    fotoKat.src = "images/katboos.png";
    spinnen.pause();
    blaas.play();
    pElement.textContent = "'AUW!!! Wat doe je nou :('";

    blijdschapEraf();

    clearInterval(verblijdingInterval);

    hoeVaakGespeeld = 0;

    aanHetSlapen = false;
}

fotoKat.addEventListener("click", slaKat);

// button snoepjes
function geefSnoepje() {

    //Als functie wordt aangeroepen gaat de kat op zijn rug liggen en gaat er blijdschap af
    fotoKat.src = "images/katligrug.png";
    pElement.textContent = "'Wat flik je me nou, waar is mijn snoepje???'";

    blijdschapEraf();

    //Dit zorgt ervoor dat de kat na 1 seconden weer de 'oude' positie aanneemt
    setTimeout(function () {
        fotoKat.src = "images/katzitlach.png";
    }, 1000);

    clearInterval(verblijdingInterval);

    hoeVaakGespeeld = 0;

    aanHetSlapen = false;
}

buttonSnoepjes.addEventListener("click", geefSnoepje);

//button spelen
function gaSpelen() {

    //Hiermee moet de kat alleen kunnen spelen als de voederbak vol is
    if (kanSpelen == true) {
        hoeVaakGespeeld = hoeVaakGespeeld + 1;

        //Hiermee komt de muis tevoorschijn, gaat deze bewegen en wordt de foto van de kat veranderd
        fotoKat.src = "images/katzit.png";
        muis.style.display = "block";
        muis.classList.add("spelen");

        clearInterval(verblijdingInterval);

        aanHetSlapen = false;

        // Dit stopt de animatie na 3 seconden
        setTimeout(function () {
            fotoKat.src = "images/katzitlach.png";
            muis.style.display = "none";
            muis.classList.remove("spelen");
        }, 3000);

        // Na 4 keer spelen wordt de kat niet meer blij
        if (hoeVaakGespeeld < 4) {
            blijdschapErbij();
            pElement.textContent = "'Leuk, een muis!!'";
        } else {
            blijdschapEraf();
            pElement.textContent = "'Ik heb al 3x gespeeld, nu ben ik te moe en wordt ik verdrietig!!'";
        }

    } else {
        pElement.textContent = "'Vul eerst mijn voerbak!!!'";
    };
}

buttonSpelen.addEventListener("click", gaSpelen);

//button slapen
function gaSlapen() {

    //Dit zorgt ervoor dat de functie niet 2x aangeroepen kan worden waardoor de blijdschapsmeter niet dubbel gaat lopen
    if (aanHetSlapen == true) {
        //niks doen want de kat slaapt dan al
    } else {
        aanHetSlapen = true;

        //Als de kat gaat slapen verandert de foto naar een kat die slaapt in zijn mandje en verandert de tekst
        fotoKat.src = "images/katlig.png";
        pElement.textContent = "'ZZZZZ Lekker slapen, niks maakt een kat blijer!!'";

        //Na 10 seconde is de blijdschapsbar weer vol
        verblijdingInterval = setInterval(function () {
            blijdschapErbij();
        }, 1000);
    }
}

buttonSlapen.addEventListener("click", gaSlapen);

//Als je op de deur klikt, krijg je een pop-up met bronnen
function zieBronnen() {

    alert("www.nl.dreamstime.com/cartoon-cat-houdset-met-verschillende-houdingen-en-emoties-kattengedrag-lichaamstaal-gezichtsuitdrukkingen-ginger-kitty-image158568400, www.shutterstock.com/nl/image-vector/cute-pet-bed-cartoon-vector-illustration-1379941046, www.vectorstock.com/royalty-free-vector/mouse-toy-for-pet-icon-cartoon-style-vector-12163541, icon-icons.com/nl/pictogram/blij/50377, natuurlijk-4pets.nl/product/6-mix-kattenbrokjes-10-kg/, www.vectorstock.com/royalty-free-vector/mans-hand-color-icon-vector-28494430, www.iconfinder.com/icons/6245809/sleep_icon, www.istockphoto.com/nl/vector/cat-toy-icon-gm482128802-70111313, nl.vecteezy.com/vector-kunst/3206508-lege-hond-of-kat-voerbak-blauw-plastic-huisdierbord-voor-brokjes-of-water, www.pngegg.com/en/png-zjjwt, www.vectorstock.com/royalty-free-vector/treats-icon-vector-22402664, nl.picmix.com/stamp/rain-regen-remuer-drops-water-1705073, www.mijndeurenwinkel.nl/lisse.html, www.acegif.com/confetti/");
}

deur.addEventListener("click", zieBronnen);