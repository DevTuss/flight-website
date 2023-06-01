# Laboration 3
## Utvecklingsmiljö & Verktyg

- Windows 10
- WebStorm
- git version 2.23.0
- https://validator.w3.org/nu/
- https://jigsaw.w3.org/css-validator/#validate_by_upload
- incscape 0.92.4

## Purpose / Syfte
Till laboration 4 skapas en bokningssida med inmatningsfält till vänster och en platskarta 
till höger.
Sidan info ska bevaras med hjälp av sessionStorage. 
När man klickar på en plats i platskartan ska labels på vänstra sidan uppdateras med vilkent
platsnummer och klass den platsen representerar. Planet ska ej kunna överbokas och bokade platser 
ska inte kunna bokas igen.
En bokningsknapp och en reset knapp ska finnas.
Vid bokning ska en ny sida med för och efternamn, personnummer, plats nummer och klass i ett nytt
utskrift fönster som öppnas. Bokningssidan förbereds för nästa kund.
Vid reset ska tillfällig inmatning raderas.


## Procedures / Genomförande
Inmatningsformuläret består av labels med inputtype text samt två knappar. Platskartan är skapad med 
canvas och en platsarray med information om platsnummer och vilken färg platsen ska ha vid uppritning.
Både Arrayen och inmatningfältet sparas i sessionstorage.
En funktion som ritar upp platskartan (draw), en funktion hanterar reservation av plats (reserve),
bokning, reset, boarding card, spara och ladda sessionstorage.

validerat html-filerna inklusive den script genererade med https://validator.w3.org/nu/ och css-filen med
 ttps://jigsaw.w3.org/css-validator/#validate_by_upload.
 
## Discussion / Diskussion
Koden är validerad utan anmärkningar och funktionerna fungerar.
Sidan sparar angiven information om man byter sida med hjälp av sessionStorage som kopplas till eventet
show- och hidepage. Det sparas och laddas inne i vissa funktioner där det är relevant för funktionalliteten.
Inmatningfärtet och plats labels finns på vänster sida och platskartan på höger sida som enligt krav.
Platskartan är skapad med canvas, inget specifikt krav på metod som skulle användas men av modulens kursmaterial
att dömma verkade det som ett rimligt tillvägagångssätt. Ledig plats markeras med grön, upptagen plats med röd 
och reserverad plats med blå. Man kan "avreservera" en plats genom att klicka på den igen så den blir grön
eller klicka på "clear". Platserna sparas i en 2d array (6x3). Det är inte möjligt att reservera en 
rödmarkerad (bokad) plats och på så sätt kan planet inte överbokas, samt att man vid bokning måste ha valt 
en ledig plats så att inga "platslösa" resenärer förekommer. 
Bokningen genomförs enadast om för- och efternamn, personnummer och plats är angivet. 
Boarding pass skapas dynamiskt i javascript där namn, personnummer, plats och klass framgår, sidan valideras
utan anmärkningar i https://validator.w3.org/nu/ och är anpassad för media print.
Efter bokning nollställs vänstra delen genom att nollställa sessionstorage och ladda om sessionStorage.
Platskartan uppdateras med röd färg på den bokade platsen och bokningssidan är redo för nästa resenär.

