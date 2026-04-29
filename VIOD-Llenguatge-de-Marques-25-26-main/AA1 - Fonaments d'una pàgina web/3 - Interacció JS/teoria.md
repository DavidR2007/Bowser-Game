JS (_JavaScript_) és el llenguatge que descriu l'interacció d'una pàgina web. JS és el llenguatge que permet que la web reaccioni, canvïi i repongui a les accions de l'usuari: clics, moviments, validacions, animacions, canvis de contingut, etc.

_Documentació Mozilla Foundation:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)_

# 1. Implementació de codi JavaScript

Hi ha 3 maneres d’afegir JavaScript a un document HTML.

| Intern | En línia | Extern |
|--------|----------|---------|
| Dins de `<body>` o `<head>`, s'afegeix l'element `<script>` | S'escriu directament a l'atribut d'un element HTML, com `onclick=""` | Es crea un fitxer `.js` separat i s'enllaça amb l'atribut `src=""`. Mitjançant l'element `<script>` dins de `<body>` o `<head>`. |
| `<script> console.log("JS intern"); </script>` | `<button onclick="alert('Hola!')">Fes clic</button>` | `<script src="script.js"></script>` |


> [!NOTE]
> Utilitzar un **fitxer .js extern** és sempre el recomanable:
>  - Control centralitzat de la presentació del lloc web.
>  - Possibilitat de reutilitzar el mateix script en diferents arxius html.
>  - Document HTML més curt i fàcil de llegir.
>  - Millora el rendiment ja que alguns navegadors guarden memòria cau per optimitzar la càrrega de pàgines.
>  - Soluciona vulnerabilitats de JavaScript.

# 2. Llenguatge interpretat i tipat dinàmic
JS és un llenguatge interpretat, és a dir, a diferència dels llenguatges compilats, JS no es compila abans d'executar-se. El navegador llegeix i executa el codi JS línia per línia. 

Això ens permet provar intruccions a la pròpia consola del avegador (habitualment configurat amb F12).

Per altra banda, el tipus de es variables a JS es basa en el valor i no en la variable. Això significa que podem canviar el tipus de variable al llarg del programa. Durant el temps d'execució, JS comprova el valor de la variable i li assigna el tipus de variable corresponent.

```js
let foo = 42; // foo és un enter
foo = "bar"; // foo ara és un string
foo = true; // foo ara és un booleà
```

_Més informació: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures_

# 3. Operadors
## Aritmètics
+, -, *, /,
## De comparació
==, ===, !=, !==, >,<, >=, <=

Similar a la resta de llenguatges, `==` observa si les dues variables contenen el mateix valor. `!=` és la seva negació.

A JS s'afegeix un operador d'igualació més estricte. L'estricte igual, `===`, observa si les dues variables contenen el mateix valor i si, a la vegada, són del mateix tipus. `!==` és la seva negació.

![Taula de la veritat JS](https://i.sstatic.net/yISob.png)
_Taula de la veritat a JavaScript: https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons_

## Lògics
&&, ||, !
## Assignació
+=, -=, *=, /=

```js
let quantitat = 100;

// Ambduesafegeixen 10 unitats a quantitat
quantitat = quantitat + 10;
quantitat += 10;

console.log(quantitat); 
// Prints: 120
```

# 4. Concatenació i interpol·lació d'strings
A JS existeix la interpol·lació d'strings. Aquesta consisteix en poder avaluar expressions dins d'un propi string. S'utilitza el format `text ${expressió} text`.

```js
let vehiclesReparats = 2;

// Concatenació d'strings
'Marta ha reparat ' + vehiclesReparats + ' vehicles.';

// Interpol·lació d'strings
'Marta ha reparat ${vehiclesReparats} vehicles.';
```

_Més informació: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals_

# 5. Creació i utilització de variables
Antigament s'utilitzava la sintaxi var. Actualment es recomana utilitzar `const` per a emmagatzemar valors que no es modificaran durant l'execució del programa (constants), i `let` per a emmagatzemar valors que s'actualitzaran durant l'execució del programa.

```js
const moneda = '¥';
let gastats = 40000;

console.log('Mon germà acaba de tornar de Japó i s\'ha gastat ${gastats}${monea}. Creus que és molt?');
// Printa: Mon germà acaba de tornar de Japó i s\'ha gastat 40000¥. Creus que és molt?
```

_Més informació: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const_

# 7. Undefined
`undefined` és el valor primitiu que s'utilitza a JS per a representar la falta d'un valor definit. Les variables sense valor i les funcions que no retornen res tenen valor undefined. Es pot comprovar amb console.log().

```js
let a;

function square(number) {
  return number * number;
}

console.log(a); // undefined
console.log(square); // undefined
```

# 8. console.log() i comentaris
`console.log()` és la funció utilitzada per enviar informació a la consola.
// i /* */ són els símbols per a definir comenntaris a JS.

# 9. Funcions
```js
function square(number) {
  return number * number;
}
```
_Més informació: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions_

# 10. Estructura if else
```js
if (condition1)
  statement1();
else if (condition2)
  statement2();
else if (condition3)
  statement3();
// …
else
  statementN();
```

# 11. Accés i edició del document HTML
La varaiable `document` ens permet accedir a tota la informació de l'arbre DOM.

![Arbre DOM](https://upload.wikimedia.org/wikipedia/commons/5/5a/DOM-model.svg)
<br>_Concepte Arbre DOM a la web (https://en.wikipedia.org/wiki/Document_Object_Model)_

L'arbre DOM és una estructura d'arbre on cada node representa un element HTML i el seu contingut. Quan el navegador llegeix un fitxer HTML, crea un arbre DOM que utilitza per a mostrar el seu contingut per pantalla.

```html
<html lang="ca">
  <head> </head>
  <body>
    <script>
      // Crea un element <h1> al DOM
      const heading = document.createElement("h1");

      // Assigna un contingut personalitzat a heading (<h1>)
      heading.textContent = "Bon inici de setmana!";

      // Assgina heading com a fill del body
      document.body.appendChild(heading);
    </script>
  </body>
</html>
```

_Més informació: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model_

# 12. Validació de formularis amb JavaScript
## Exemple HTML
```html
<form id="formulari">

  <!-- Camp obligatori -->
  <label for="nom">Nom:</label>
  <input type="text" id="nom" name="nom" required>

  <!-- Solament s'accepta edat=18 -->
  <label for="edat">Edat:</label>
  <input type="number" id="edat" name="edat" required>

  <!-- Es valida si s'ha escrit un correu comprovant si conté una @ -->
  <label for="email">Correu electrònic:</label>
  <input type="email" id="email" name="email" required>

  <button type="submit">Enviar</button>

</form>
```

## Pas 1. Capturar l'esdeveniment submit
```js
const formulari = document.getElementById("formulari");

formulari.addEventListener("submit", function(event) {
  // Evita que enllaços, botons de formularis, desplegables, etc.
  // executin el seu comportament per defecte.
  // En aquest cas ens interessa per definir-li 
  // les nostres pròpies instruccions
  event.preventDefault();

  // Definim el comportament del formularis
  validarFormulari();
});

```
## Pas 2. Definir el codi de validació
```js
function validarFormulari() {
  const nom = document.getElementById("nom").value;
  const edat = document.getElementById("edat").value;
  const email = document.getElementById("email").value;

  // Amb HTML podem fer validacions bàsiques amb l'atribut required
  // Amb JS podem fer validacions personalitzades i elaborades
  if (nom === "") {
    console.log("El nom és obligatori");
    return;
  }

  if (Number(edat) !== 18) {
    console.log('Es requereixen 18 anys per a rebre el bono cultural');
    return;
  }

  if (!email.includes("@")) {
    console.log("L'email no és vàlid");
    return;
  }

  console.log("Formulari correcte. En breus rebràs una resposta per correu.");

  // S'envia el contingut del formulari al servidor a través de l'enllaç definit.
}
```

_Més informació: https://www.freecodecamp.org/news/how-to-submit-a-form-with-javascript/_

## Extra. Assignació de codi per a tots els elements amb la mateixa classe
#### Exemple aplicat a un joc de cartes
```js
const cartes = document.querySelectorAll(".carta");

cartes.forEach(carta => {
  carta.addEventListener("click", () => { 
    
    // Es canvia la classe de la carta a "carta-clicada"
    carta.className = "carta-clicada";
     
  }); 
});

```

_Més informació: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll_

# 13. Afegir informació extra als elements HTML
## Pas 1. Guardar el nom i el preu del producte utilitzant data-*
```html
<button class="producte" data-nom="Cafè" data-preu="12.99">
  Afegir al carret
</button>
```

## Pas 2. Consultar el nom i el preu dels elements utilitzant la propietat dataset
```js
const boto = document.querySelector(".producte");

boto.addEventListener("click", () => {
  console.log("Nom del producte:", boto.dataset.nom);
  console.log("Preu:", boto.dataset.preu);
});
```
_Més informació: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset_

# FAQS
_Podeu enviar PR (Pull Requests) amb preguntes i les aniré afegint amb les seves respostes corresponents. :)_
