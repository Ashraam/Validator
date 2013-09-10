Validator
=========

Plugin jQuery validator

Fonctionne avec jQuery 1.8+
L'affichage fonctionne de base avec les Alerts javascript mais peut être améliorer avec Apprise 1 ou 2

Validator est un plugin jQuery pour valider rapidement un formulaire.

Tous les champs qui doivent être vérifiés doit au minimum avoir la balise data-rules="nom de la regle".
Pour améliorer l'affichage du nom du champs dans les alerts utiliser la balise data-name="votre appelation"


Quelques exemples:

1/ Utilisation simple
$("#formID").validator();

2/ Utilisation d'un callback
$("#formID").validator(function(){
  votre code
)};

3/ Utilisation avec apprise
$("#formID").validator({apprise: true});

$("#formID").validator({apprise: true}, function(){
  votre code
)};

Pour plus d'informations sur les règles, voir dans le fichier validator.js
