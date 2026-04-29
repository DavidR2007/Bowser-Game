CSS (_Cascading Style Sheets_) és el llenguatge que descriu l'aspecte d'una pàgina web.

_Documentació Mozilla Foundation:
[https://developer.mozilla.org/es/docs/Web/CSS](https://developer.mozilla.org/es/docs/Web/CSS)_

# 1. Implementació del CSS

Hi ha 3 maneres per aplicar estils a HTML.

| Intern | En línia | Extern |
|--------|----------|---------|
| Dins de &lt;head&gt;, s'afegeix l'element `<style>` que conté codi CSS | S'escriu directament a l'atribut `style=""` d'un element HTML | Es crea un fitxer `.css` separat i s'enllaça amb `<link>` |
| `<style> p { color: red; } </style>` | `<p style="color: red;">Text</p>` | `<link rel="stylesheet" href="estils.css">` |

> [!NOTE]
> Utilitzar un **full d'estils extern** és sempre el recomanable:
>  - Control centralitzat de la presentació del lloc web.
>  - Possibilitat de reutilitzar el mateix full d'estils en diferents arxius html.
>  - Document HTML més curt i fàcil de llegir.


# 2. Sintaxi bàsica
La sintaxi es basa en 3 conceptes:
```css
selector {
  propietat: valor;
}
```
- **selector**. A quin element s'aplica l'estil
- **propietat**. Què volem modificar
- **valor**. Com ho modifiquem

Exemple:
```css
p {
  color: blue;
}
```
*A **tots els elements &lt;p&gt;**, s'aplica el color blau*.

# 3. Selectors bàsics
Amb el selector podem escollir quins elements podem estilitzar

## 3.1 Selector de tipus
```css
p {
  font-size: 1.5rem;
}
```
*A **tots els elements &lt;p&gt;** se'ls aplica un tamany de lletra 1.5rem (tamany de lletra definit pel navegador * 1.5)*.

## 3.2 Selector descendent
```css
article p {
  color: gray;
}
```
*Dins d'un &lt;article&gt;, a **tots els elements &lt;p&gt;** se'ls aplica el color gris*.

## 3.3 Selector de fill directe
```css
article > p {
  font-weight: bold;
}
```
*A **tots els elements &lt;p&gt;** que siguin **fills directes d'un &lt;article&gt;** se'ls aplica l'estil en negreta*.

# 4. Fonts
Amb la propietat ***font-family*** Podem escollir quina font utilitzarà el navegador per mostrar la pàgina.

- **serif**. Amb adornaments. _Habitual en textos clàssics_.
- **sans-serif**. Sense adornaments. _Habitual en textos digitals i moderns -és la més utilitzada-._
- **monospace**. Totes les lletres ocupen el mateix espai. _Habitual per a mostrar codis de programació._
- **fantasy**. Està tematitzada. _Habitual per a fonts personalitzades._

_Altres ftipus de fonts: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font_

# 5. Colors
## 5.1 Representació de colors
Els colors es poden definir de diverses maneres:
- **Noms de color**. Hi ha 140 colors predefinits a CSS.
```css
red, blue, lightgray
```
- **Hexadecimal**. Cada 2 caràcters forma un número hexadecimal. Cada número hexadecimal representa un color rgb.
```css
#ff0000 /* es pot abreviar amb #f00 */
```
- **RGB**. Representa la intensitat de Red, Green i Blue. Calculadora de color RGB (mode RGB): https://www.hslpicker.com/#70ff33
```css
rgb(255 0 0) /* 255 unitats de red (màx. 255), 0 de green i 0 de blue */
rgb(255 0 0 / 0.1) /* unitats anteriors amb opacitat del 0.1 (10%) */
```
- **HSL**. Representa el to (Hue), saturació (Saturation) i lluminositat (Lightness). Calculadora de color HSL (mode HSL): https://www.hslpicker.com/#70ff33
```css
hsl(200 80% 50%) /* 200 unitats de to (de 0 a 360 seguint la roda cromàtica), 80% de saturació i 50% de lluminositat */
hsl(200 80% 50% / 0.6) /* unitats anteriors amb opacitat del 0.6 (60%) */
```

_Més info: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Color_values_

## 5.2 Com aplicar els colors

Les propietats més comuns són backgroundColor per canviar el color de fons d'un element i color per canviar el color del text d'un element.

**Exemple 1. Assignem lightblue com a color de fons.**
```css
div {
  background-color: lightblue;
}
```

_Més info: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-color_

**Exemple 2. Assignem darkslategray com a color del text.**
```css
p {
  color: darkslategray;
}
```

_Més info: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color_

Existeixen altres propietats que modifiquen el color. Per exemple, podem utilitzar border-color per a canviar el color del border dels elements.

_Més info (apartat Related concepts): https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors_

# 6. Box Model
A HTML, tot element es tracta com si fos una caixa de 4 parts:
- **Content:** contingut real (part interna)
- **Padding:** espai intern
- **Border:** vora
- **Margin:** espai extern (part externa)

Amb aquestes 4 parts, es poden crear separacions entre elements (utilitzant margin), es poden donar estils únics (per exemple: el border-radius per arrodonir les cantonades), es poden centrar elements horitzontalment (margin: 0 auto), etc.

![Hello World](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh84aRZn_1oaQWrwWqE-gO_x9EJJb4o_1KFA&s)

_Simulació d'un text "Hello World" a la web delimitant cada part del Box Model_


![caixes per tot arreu](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqfVBYHuB20RB8fgAJ81KTWkjjT49SGq6qKQ&s)

_Exemple on es visualitza el border de cada element_

> [!WARNING]
> Per defecte i per herència història, HTML utilitza el ***box-sizing: content-box*** que delimita el width i el height de la caixa a les dimensions del content.
> - Quan afegim un border, se'ns pot desplaçar el contingut.
> - Amb el border-box, el width i el heigth es calcula tenint el compte el content, padding i border.

![uff](https://miro.medium.com/1*08DnApeCVZ9QwaxgOrzGkA.jpeg)
_Exemple: content-box vs. border-box (lupitacode)_

```css
.box {
  width: 200px;
  padding: 20px;
  border: 10px solid black;
  margin-bottom: 1rem;
}

/* <div class="box content-box">(content-box) 500px = content </div> */
.content-box {
  box-sizing: content-box;
  background: lightcoral;
}

/* <div class="box border-box">(border-box) 500px = content + padding + border </div> */
.border-box {
  box-sizing: border-box;
  background: lightgreen;
}
```
_Exemple per provar a codi: Ambdues caixes tenen ***width: 200px***, però es visualment content-box > border-box._

# 7. Unitats
##  7.1 Absolutes
- **px** i **cm/mm** entre altres

Per a entorns web s'utilitza **px**. Altres com **cm** tenen sentit si utilitzem CSS per a imprimir (per exemple: Ctrl + P al navegador)

## 7.2 Relatives a la font
- **rem:** relativa al font-size de l'html (recomanable)
- **em:** relativa al font-size del pare
- **%:** percentatge de font-size respecte al pare

Exemple:
```css
html {
  font-size: 16px;
}
```
A partir d'aquest exemple podriem calcular: 1rem = 16px, 2rem = 32px, 0.5rem = 8px, etc.

**em** el podem utilitzar per a que les coses escalin juntament amb el seu pare.
**rem** el podem utilitzar per mentenir una consistència global.

_**Exemple:**
Imagina't que vols modificar el tipus de lletra de l'entrada a un blog. Voldries que tot el que depén del blog modifiqués la seva lletra?_

## 7.3 Relatives a la finestra
- **vw** és 1% (width) de la viewport
- **vh** és 1% (height) de la viewport

```css
aside {
  background-color: rgb(245, 215, 150);

  /* margin: {top} {right} {bottom} {left}; */
  margin: 0 0 2vh 0;
  
  
  /* padding: {top} {right} {bottom} {left}; */
  padding: 2rem 2rem 2rem 2rem;

  font-style: italic;
}
```
_**Exemple:** Marge inferior de 2% l'altura de la finestra (vh)_


_Enllaç on poder provar amb margin + diferents unitats: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin_

# 8. Pseudo-classes habituals

_Documentació: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes_

## 8.1 Botons
:hover
:active
:focus
:disabled

## 8.2 Enllaços
:visited

# _Altres: Propietats vistes al projecte rubiks_
```css
font-family: Arial, sans-serif; /* Cos general */
background-color: #f4f4f4;
color: #333;
```

# FAQS
_Podeu enviar PR (Pull Requests) amb preguntes i les aniré afegint amb les seves respostes :)_
