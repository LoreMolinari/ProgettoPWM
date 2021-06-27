# ProgettoPWM
Progetto corso Programmazione Web e Mobile UNIMI


1. Introduzione 
Info Valtellina è un applicazione web che permette di consultare le ultime 
informazioni (News, Tweet, Meteo) riguardante la Valtellina, una regione 
geografica alpina, corrispondente al bacino idrico del fiume Adda a monte 
del lago di Como, nella regione Lombardia, o più in generale della provincia 
di Sondrio. Per realizzarla ho utilizzato cinque differenti API:
• https://openweathermap.org/api (Meteo)
• https://newsapi.org/ (News)
• https://developer.twitter.com/en/docs/twitter-api (Tweet)
• https://cloud.google.com/maps-platform/maps (Mappa)
• https://developers.google.com/fonts/ (Font)


2. Breve Analisi dei requisiti 

2.1 Destinatari
Il progetto è pensato per essere utilizzato da qualsiasi persona, in particolare quei 
soggetti poco pratici delle tecnologie informatiche, in quanto si tratta di un sito web di 
facciata attraverso il quale è possibile interagire con l’utilizzo di bottoni o attraverso lo
scorrimento.
La scelta dell’utilizzo di un’interfaccia semplice e non dispersiva e proprio data per la 
totale fruizione agli utenti (anche meno esperti) di tutte le funzionalità del sito web. Gli 
utenti non possono essere distinti in macro-campi in quanto si tratta di un’applicazione 
web adatta ad ogni persona che vuole aggiornarsi sugli avvenimenti riguardanti la 
provincia di Sondrio, anche per questo la lingua utilizzato è l’italiano in quanto si possa 
pensare che l’utenza sia limitata o maggiormente rappresentata da persone la cui lingua 
madre è l’italiano.
Il sito web è stato reso dinamico e responsivo in modo di potersi adattare a qualsiasi 
dispositivo su cui viene visualizzato come: smartphone, tablet, pc ma anche televisori o 
proiettori (in quanto potrebbe essere utilizzato da enti comunali per esporre le notizie 
locali in luoghi pubblici).

2.2 Modello di valore
Questa applicazione fa riferimento ad un servizio già ampiamente presente sul web, ma 
aggiunge la specifica locale per poter incentrare il focus a livello provinciale (e non 
regionale o nazionale come già presente su internet), il sito è quindi adattabile, qualora 
fosse richiesto, anche a macrogruppi locali al di fuori di quello specifico in essere 
(Provincia di Sondrio), per fare un’ esempio potrebbe essere utilizzato per raccogliere le 
informazioni della Provincia di Bergamo, oppure per zone più piccole come la Val 
Seriana (una valle di medie dimensioni presente nel comprensorio Bergamasco) fino 
addirittura fruire per un comune come ad esempio Lovere (Bergamo). Questo è possibile 
attraverso l’utilizzo delle API che ci permetto di cambiare intuitivamente i parametri in 
base alle nostre esigenze
La scelta di una tecnologia Client-Server, inoltre, ci permette di poter allargare il bacino 
di utenza in base alle esigenze e in futuro potrebbe anche essere possibile eseguire 
modifiche lato server senza dover influenzare il corretto funzionamento 
dell’applicazione lato client.
Per poter adottare però l’applicazione su una scala di utenti più ampia saranno necessarie 
costi di gestione, sia per il corretto funzionamento e mantenimento dell’applicazione, sia 
per l’utilizzo delle API che, superato un numero limitato di richieste, non permetto più di 
ottenere il file JSON contente le informazioni che poi saranno visualizzate sullo schermo 
del client.

2.3 Flusso di dati
Come già specificato nel paragrafo precedente, i dati visualizzati lato client sono presi e 
successivamente elaborati da delle API (Application Programming Interface) che 
attraverso l’inserimento di un URL specifico ci restituiscono un file JSON contente le 
informazioni da noi richieste.
Le API utilizzate in questa applicazione web sono: OpenWeatherAPI, newsAPI, 
googleMapsAPI e TwitterAPI:
• Le OpenWeather API sono utilizzate in diversi modi all’interno del sito web: 
nella lateral bar per poter visualizzare il meteo delle città più importanti della 
provincia di Sondrio, all’interno della mappa per poter avere una visione 
generale del meteo della provincia e dintorni e sempre nella lateral bar è possibile 
visualizzare il meteo in base alla propria geolocalizzazione del luogo.
• Le API di newsAPI sono utilizzate per poter estrapolare le notizie locali (in base 
ad una ricerca che passa come parametro “q=Valtellina”) su un largo bacino di 
agenzie di stampa che tra gli altri comprendono: Ansa, AdnKronos, Corriere, 
OASport e Mediaset.
• Attraverso GoogleMapsAPI abbiamo la possibilità di visualizzare una mappa 
centrata appositamente al centro delle Provincia di Sondrio.
• Infine, con le TwitterAPI e attraverso il modulo node twit è possibile estrapolare 
dal database di twitter tutti i tweet che presentano al loro interno la parola 
Valtellina (la scelta di utilizzare twitter rispetto ad altri social riguarda la ormai nota 
caratteristica di avere utenti più attivi a livello di avvenimenti anche locali)

2.4 Aspetti tecnologici
La gestione del codice avviene tramite il modello Model View Controller. La logica di 
presentazione del contenuto è affidata al modulo node ejs che si occupa di gestire ciò che 
l’utente deve visualizzare una volta caricata la pagina nel proprio browser. Le tecnologie 
richieste sono state inserite, con l’aggiunta dei moduli twit e fs per il corretto 
funzionamento di node. Queste scelte (in particolare quella di twit) sono state fatte per 
una maggiore comprensione ed elaborazione dei moduli scelti.