/************************************
Développer par Bertolucci Romain - romain.bertolucci@orange.fr
Plugin validator: V 0.6 - 10/09/2013
Dependency jQuery, Apprise

Utilisation:
	$("#form_id").validator();
	$("#form_id").validator({params}[, function(){
		Votre fonction JS
	}]);
	Params:
		apprise: true/false (defaut false). Utilise les alertes javascript pour afficher les erreurs si le paramètre est à false.

Règles:
- required - no option
	desc:	Le champs doit être rempli pour valider le formulaire
	ex: 	data-rules="required"

- date - 1 option
	format:	jj/mm/aaaa | jj-mm-aaaa
	desc:	Le champs doit être au format
	ex:		data-rules="date:jj/mm/aaaa"

- email - no option
	desc:	La valeur du champs doit être une adresse email valide
	ex:		data-rules="email"

- url - no option
	desc:	La valeur du champs doit être une adresse url valide
	ex:		data-rules="url"

- integer - no option
	desc:	La valeur du champs doit être uniquement composé de chiffre et de 1 "."
	ex:		data-rules="integer"

- alphanumeric - no option
	desc:	La valeur du champs doit être uniquement composé de caractères alphanumériques (a-z, 0-9)
	ex:		data-rules="alphanumeric"

- not - 1 option
	value	valeur
	desc:	La valeur du champs doit être différente de value
	ex:		data-rules="not:0"

- inferior - 1 option
	value	Limite inférieure
	desc:	La valeur du champs doit être inférieure à value
	ex:		data-rules="inferior:10"

- superior - 1 option
	value	Limite supérieure
	desc:	La valeur du champs doit être supérieure à value
	ex:		data-rules="superior:10"

- range - 2 option
	min		Limite inférieur
	max		Limite supérieure
	desc:	La valeur du champs doit être comprise entre min et max
	ex:		data-rules="range:10-15"


Combinaison de règles:
Si on veut qu'un champs soit remplis, composé uniquement de chiffre entre 5 et 10 la règle sera:
data-rules="required|integer|range:5-10"

************************************/
(function($){
	$.fn.validator = function(params, callback) {
		
		params = $.extend({apprise: false}, params);
		
		/*****************************
		Variables
		*****************************/
		var erreur = false;
		var formID = $(this).attr('id');
		var required = false;
		var field_name = '';
		var rules = '';
		var rule = '';
		var rule_options = '';
		var message = '';
		var string = '';
		
		/*****************************
		Fonction principale qui s'execute lors de l'envoi du formulaire
		*****************************/
		$(this).submit(function(){
			erreur = false;
			$("#"+formID+" :input[data-rules]").each(function(i, v) {
				if($(v).attr('data-name') !== undefined) {
					field_name = $(v).attr('data-name');
				} else {
					field_name = $(v).attr('name');
				}
				if(params.apprise) {
					field_name = '<strong>'+field_name+'</strong>';
				}
				string = $.trim($(v).val());
				rules = $(v).attr('data-rules').split('|');
				
				$.each(rules, function(index, value){
					if(value.indexOf(':') != -1) {
						var d = value.split(':');
						rule = d[0];
						rule_options = d[1];
					} else {
						rule = value;
						rule_options = '';
					}
					
					//Liste des règles
					switch(rule) {
						case 'required':
							f_required(string);
						break;
						case 'date':
							f_date(string);
						break;
						case 'email':
							f_email(string);
						break;
						case 'url':
							f_url(string);
						break;
						case 'integer':
							f_integer(string);
						break;
						case 'alphanumeric':
							f_alphanumeric(string);
						break;
						case 'not':
							f_not(string);
						break;
						case 'inferior':
							f_inferior(string);
						break;
						case 'superior':
							f_superior(string);
						break;
						case 'range':
							f_range(string);
						break;
					}
					
					//Affichage du message d'erreur et on sort de la boucle
					if(erreur) {
						f_output();
						return false;
					}
				});
				//Si erreur on sort de la boucle
				if(erreur) {
					return false;
				}
			});
			
			//Envoi du formulaire
			if(erreur) {
				return false;
			} else {
				
				if(typeof callback == 'function') {
					return callback.call(this);
				}
				
				return true;
			}
		});
		
		/*****************************
		Fonctions de vérification et de sortie
		*****************************/
		function f_output() {
			if(params.apprise) {
				apprise(message, {animate: 400});
			} else {
				alert(message);
			}
			return false;
		}
		
		function f_required(str) {
			required = true;
			if(str.length == 0 || str == '') {
				erreur = true;
				message = 'Le champs '+field_name+' ne doit pas être vide';
			} else {
				erreur = false;
			}
		}
		
		function f_date(str) {
			switch(rule_options) {
				case 'jj/mm/aaaa':
					var filter = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
					var date = str.split('/');
					var d = parseInt(date[0]);
					var m = parseInt(date[1]);
					var y = parseInt(date[2]);
				break;
				case 'dd/mm/yyyy':
					var filter = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
					var date = str.split('/');
					var d = parseInt(date[0]);
					var m = parseInt(date[1]);
					var y = parseInt(date[2]);
				break;
				case 'jj-mm-aaaa':
					var filter = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/;
					var date = str.split('-');
					var d = parseInt(date[0]);
					var m = parseInt(date[1]);
					var y = parseInt(date[2]);
				break;
				case 'dd-mm-yyyy':
					var filter = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/;
					var date = str.split('-');
					var d = parseInt(date[0]);
					var m = parseInt(date[1]);
					var y = parseInt(date[2]);
				break;
			}
			var cDate = new Date(y, m-1, d);
			if(str.length > 0) {
				if(!filter.test(str)) {
					erreur = true;
					message = 'Le champs '+field_name+' doit être au format: '+rule_options;
				} else {
					if(cDate.getFullYear() != y || (cDate.getMonth()+1) != m || cDate.getDate() != d) {
						erreur = true;
						message = 'La date du champs '+field_name+' doit être valide';
					}
				}
			}
		}
		
		function f_email(str) {
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(str.length > 0) {
				if(!filter.test(str)) {
					erreur = true;
					message = 'Le champs '+field_name+' doit être un email valide';
				}
			}
		}
		
		function f_url(str) {
			var filter = /^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)/;
			if(str.length > 0) {
				if(!filter.test(str)) {
					erreur = true;
					message = 'Le champs '+field_name+' doit être une url valide';
				}
			}
		}
		
		function f_integer(str) {
			var filter = /^[0-9]+[.]{0,1}[0-9]{0,}$/;
			if(str.length > 0) {
				if(!filter.test(str)) {
					erreur = true;
					message = 'Le champs '+field_name+' doit être uniquement composé de chiffres';
				}
			}
		}
		
		function f_alphanumeric(str) {
			var filter = /^[a-z0-9éèàùîïüôöêëäâ]+$/i;
			if(str.length > 0) {
				if(!filter.test(str)) {
					erreur = true;
					message = 'Le champs '+field_name+' doit être uniquement composé de caractères alphanumérique (a-z, 0-9)';
				}
			}
		}
		
		function f_not(str) {
			if(str.length > 0) {
				if(str === rule_options || str === parseInt(rule_options)) {
					erreur = true;
					message = 'La valeur du champs '+field_name+' doit être différent de: '+rule_options;
				}
			}
		}
		
		function f_inferior(str) {
			if(str.length > 0) {
				if(str < parseInt(rule_options)) {
					erreur = true;
					message = 'Le champs '+field_name+' ne doit pas être inférieur à: '+rule_options;
				}
			}
		}
		
		function f_superior(str) {
			if(str.length > 0) {
				if(str > parseInt(rule_options)) {
					erreur = true;
					message = 'Le champs '+field_name+' ne doit pas être supérieur à: '+rule_options;
				}
			}
		}
		
		function f_range(str) {
			var range = rule_options.split('-');
			if(str.length > 0) {
				if(str < parseInt(range[0]) || str > parseInt(range[1])) {
					erreur = true;
					message = 'Le champs '+field_name+' doit être comprit entre '+range[0]+' et '+range[1];
				}
			}
		}
		
	}
})(jQuery);
