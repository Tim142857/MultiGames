'use strict';

/**
 * Déclaration du module todoList
 */
var pendu = angular.module('pendu', []);


/**
 * Contrôleur de l'application "Todo List" décrite dans le chapitre "La logique d'AngularJS".
 */
pendu.controller('penduCtrl', ['$scope',
  function ($scope) {

    $scope.image = "1.png";
    $scope.win = false;
    $scope.lose = false;
    $scope.replay = false;
    $scope.errors = 0;
    $scope.letters = [];
    $scope.lettersTested = [];
    $scope.errorsLeft = 7;
    $scope.answer = "";


    $scope.submit = function () {
      $scope.letterToTest = $scope.letterToTest.toUpperCase();
      if ($scope.word.indexOf($scope.letterToTest) != -1) {
        $scope.letters.forEach(function (element, index) {
          if (element.letter == $scope.letterToTest) {
            element.hidden = false;
          }
        })
        $scope.lettersTested.push({letter: $scope.letterToTest, error: false});
        $scope.checkWin();
      } else {
        $scope.lettersTested.push({letter: $scope.letterToTest, error: true});
        $scope.addOneError();
        $scope.checkLose();
      }
      $scope.letterToTest = "";
    }

    $scope.reset = function () {
      $scope.errors = 0;
    }

    $scope.updateWord = function (word) {
      word.split("").forEach(function (element, index) {
        $scope.letters.push({letter: element, hidden: true});
      });
    };

    $scope.checkWin = function () {
      var newLetters = $scope.letters.filter(function (elm) {
        return elm.hidden;
      })
      //sil ny a aucune lettre caché, c'est gagné
      if (newLetters.length == 0) {
        $scope.win = true;
        $scope.replay = true;
      }
    }

    $scope.showAnswer = function () {
      $scope.answer = $scope.word;
    }

    $scope.checkLose = function () {
      if ($scope.errorsLeft == 0) {
        $scope.lose = true;
        $scope.replay = true;
        $scope.showAnswer();
      }
    }

    $scope.reset = function (word) {
      $scope.win = false;
      $scope.replay = false;
      $scope.lose = false;
      $scope.word = $scope.getRandomWord();
      $scope.letters = [];
      $scope.lettersTested = [];
      $scope.updateWord($scope.word);
      $scope.errors = 0;
      $scope.errorsLeft = 7;
      $scope.image = "1.png";
    }

    $scope.toto = function () {
      alert('toto');
    }

    $scope.limitKeyPress = function (e) {
      if (e.keyCode != 13) {
        if (typeof ($scope.letterToTest) != 'undefined' && $scope.letterToTest.length > 0) {
          e.preventDefault();
          $scope.letterToTest = String.fromCharCode(e.keyCode);
        }
      }
    }


    $scope.getRandomWord = function () {
      var words = ["ANGLE", "ARMOIRE", "BANC", "BUREAU", "CABINET", "CARREAU", "CHAISE", "CLASSE", "CLEF", "COIN", "COULOIR", "DOSSIER", "EAU", "ECOLE", "ENTRER", "ESCALIER", "ETAGERE", "EXTERIEUR", "FENETRE", "INTERIEUR", "LAVABO", "LIT", "MARCHE", "MATELAS", "MATERNELLE", "MEUBLE", "MOUSSE", "MUR", "PELUCHE", "PLACARD", "PLAFOND", "PORTE", "POUBELLE", "RADIATEUR", "RAMPE", "RIDEAU", "ROBINET", "SALLE", "SALON", "SERRURE", "SERVIETTE", "SIEGE", "SIESTE", "SILENCE", "SOL", "SOMMEIL", "SONNETTE", "SORTIE", "TABLE", "TABLEAU", "TABOURET", "TAPIS", "TIROIR", "TOILETTE", "VITRE", "ALLER", "AMENER", "APPORTER", "APPUYER", "ATTENDRE", "BAILLER", "COUCHER", "DORMIR", "ECLAIRER", "EMMENER", "EMPORTER", "ENTRER", "FERMER", "FRAPPER", "INSTALLER", "LEVER", "OUVRIR", "PRESSER", "RECHAUFFER", "RESTER", "SONNER", "SORTIR", "VENIR", "ABSENT", "ASSIS", "BAS", "HAUT", "PRESENT", "GAUCHE", "DROITE", "DEBOUT", "DEDANS", "DEHORS", "FACE", "LOIN", "PRES", "TARD", "TOT", "APRES", "AVANT", "CONTRE", "DANS", "DE", "DERRIERE", "DEVANT", "DU", "SOUS", "SUR", "CRAYON", "STYLO", "FEUTRE", "MINE", "GOMME", "DESSIN", "COLORIAGE", "RAYURE", "PEINTURE", "PINCEAU", "COULEUR", "CRAIE", "PAPIER", "FEUILLE", "CAHIER", "CARNET", "CARTON", "CISEAUX", "DECOUPAGE", "PLIAGE", "PLI", "COLLE", "AFFAIRE", "BOITE", "CASIER", "CAISSE", "TROUSSE", "CARTABLE", "JEU", "JOUET", "PION", "DOMINO", "PUZZLE", "CUBE", "PERLE", "CHOSE", "FORME", "CARRE", "ROND", "PATE", "MODELER", "TAMPON", "LIVRE", "HISTOIRE", "BIBLIOTHEQUE", "IMAGE", "ALBUM", "TITRE", "CONTE", "DICTIONNAIRE", "MAGAZINE", "CATALOGUE", "PAGE", "LIGNE", "MOT", "ENVELOPPE", "ETIQUETTE", "CARTE", "APPEL", "AFFICHE", "ALPHABET", "APPAREIL", "CAMESCOPE", "CASSETTE", "CHAINE", "CHANSON", "CHIFFRE", "CONTRAIRE", "DIFFERENCE", "DOIGT", "ECRAN", "ECRITURE", "FILM", "FOIS", "FOI", "IDEE", "INSTRUMENT", "INTRUS", "LETTRE", "LISTE", "MAGNETOSCOPE", "MAIN", "MICRO", "MODELE", "MUSIQUE", "NOM", "NOMBRE", "ORCHESTRE", "ORDINATEUR", "PHOTO", "POINT", "POSTER", "POUCE", "PRENOM", "QUESTION", "RADIO", "SENS", "TAMBOUR", "TELECOMMANDE", "TELEPHONE", "TELEVISION", "TRAIT", "TROMPETTE", "VOIX", "XYLOPHONE", "ZERO", "CHANTER", "CHERCHER", "CHOISIR", "CHUCHOTER", "COLLER", "COLORIER", "COMMENCER", "COMPARER", "COMPTER", "CONSTRUIRE", "CONTINUER", "COPIER", "COUPER", "DECHIRER", "DECOLLER", "DECORER", "DECOUPER", "DEMOLIR", "DESSINER", "DIRE", "DISCUTER", "ECOUTER", "ECRIRE", "EFFACER", "ENTENDRE", "ENTOURER", "ENVOYER", "FAIRE", "FINIR", "FOUILLER", "GOUTER", "IMITER", "LAISSER", "LIRE", "METTRE", "MONTRER", "OUVRIR", "PARLER", "PEINDRE", "PLIER", "POSER", "PRENDRE", "PREPARER", "RANGER", "RECITER", "RECOMMENCER", "REGARDER", "REMETTRE", "REPETER", "REPONDRE", "SENTIR", "SOULIGNER", "TAILLER", "TENIR", "TERMINER", "TOUCHER", "TRAVAILLER", "TRIER", "AMI", "ATTENTION", "CAMARADE", "COLERE", "COPAIN", "COQUIN", "DAME", "DIRECTEUR", "DIRECTRICE", "DROIT", "EFFORT", "ELEVE", "ENFANT", "FATIGUE", "FAUTE", "FILLE", "GARCON", "GARDIEN", "MADAME", "MAITRE", "MAITRESSE", "MENSONGE", "ORDRE", "PERSONNE", "RETARD", "JOUEUR", "SOURIRE", "TRAVAIL", "AIDER", "DEFENDRE", "DESOBEIR", "DISTRIBUER", "ECHANGER", "EXPLIQUER", "GRONDER", "OBEIR", "OBLIGER", "PARTAGER", "PRETER", "PRIVER", "PROMETTRE", "PROGRES", "PROGRESSER", "PUNIR", "QUITTER", "RACONTER", "EXPLIQUER", "REFUSER", "SEPARER", "BLOND", "BRUN", "CALME", "CURIEUX", "DIFFERENT", "DOUX", "ENERVER", "GENTIL", "GRAND", "HANDICAPE", "INSEPARABLE", "JALOUX", "MOYEN", "MUET", "NOIR", "NOUVEAU", "PETIT", "POLI", "PROPRE", "ROUX", "SAGE", "SALE", "SERIEUX", "SOURD", "TRANQUILLE", "ARROSOIR", "ASSIETTE", "BALLE", "BATEAU", "BOITE", "BOUCHON", "BOUTEILLE", "BULLES", "CANARD", "CASSEROLE", "CUILLERE", "CUVETTE", "DOUCHE", "ENTONNOIR", "GOUTTES", "LITRE", "MOULIN", "PLUIE", "POISSON", "PONT", "POT", "ROUE", "SAC", "PLASTIQUE", "SALADIER", "SEAU", "TABLIER", "TASSE", "TROUS", "VERRE", "AGITER", "AMUSER", "ARROSER", "ATTRAPER", "AVANCER", "BAIGNER", "BARBOTER", "BOUCHER", "BOUGER", "DEBORDER", "DOUCHER", "ECLABOUSSER", "ESSUYER", "ENVOYER", "COULER", "PARTIR", "FLOTTER", "GONFLER", "INONDER", "JOUER", "LAVER", "MELANGER", "MOUILLER", "NAGER", "PLEUVOIR", "PLONGER", "POUSSER", "POUVOIR", "PRESSER", "RECEVOIR", "REMPLIR", "RENVERSER", "SECHER", "SERRER", "SOUFFLER", "TIRER", "TOURNER", "TREMPER", "VERSER", "VIDER", "VOULOIR", "AMUSANT", "CHAUD", "FROID", "HUMIDE", "INTERESSANT", "MOUILLE", "SEC", "TRANSPARENT", "MOITIE", "AUTANT", "BEAUCOUP", "ENCORE", "MOINS", "PEU", "PLUS", "TROP", "ANORAK", "ARC", "BAGAGE", "BAGUETTE", "BARBE", "BONNET", "BOTTE", "BOUTON", "BRETELLE", "CAGOULE", "CASQUE", "CASQUETTE", "CEINTURE", "CHAPEAU", "CHAUSSETTE", "CHAUSSON", "CHAUSSURE", "CHEMISE", "CIGARETTE", "COL", "COLLANT", "COURONNE", "CRAVATE", "CULOTTE", "ECHARPE", "EPEE", "FEE", "FLECHE", "FUSIL", "GANT", "HABIT", "JEAN", "JUPE", "LACET", "LAINE", "LINGE", "LUNETTES", "MAGICIEN", "MAGIE", "MAILLOT", "MANCHE", "MANTEAU", "MOUCHOIR", "MOUFLE", "NOEUD", "PAIRE", "PANTALON", "PIED", "POCHE", "PRINCE", "PYJAMA", "REINE", "ROBE", "ROI", "RUBAN", "SEMELLE", "SOLDAT", "SOCIERE", "TACHE", "TAILLE", "TALON", "TISSU", "TRICOT", "UNIFORME", "VALISE", "VESTE", "VETEMENT", "CHANGER", "CHAUSSER", "COUVRIR", "DEGUISER", "DESHABILLER", "ENLEVER", "HABILLER", "LACER", "PORTER", "RESSEMBLER", "CLAIR", "COURT", "ETROIT", "FONCE", "JOLI", "LARGE", "LONG", "MULTICOLORE", "NU", "USE", "BIEN", "MAL", "MIEUX", "PRESQUE", "AIGUILLE", "AMPOULE", "AVION", "BOIS", "BOUT", "BRICOLAGE", "BRUIT", "CABANE", "CARTON", "CLOU", "COLLE", "CROCHET", "ELASTIQUE", "FICELLE", "FIL", "MARIONNETTE", "MARTEAU", "METAL", "METRE", "MORCEAU", "MOTEUR", "OBJET", "OUTIL", "PEINTURE", "PINCEAU", "PLANCHE", "PLATRE", "SCIE", "TOURNEVIS", "VIS", "VOITURE", "ARRACHER", "ATTACHER", "CASSER", "COUDRE", "DETRUIRE", "ECORCHER", "ENFILER", "ENFONCER", "FABRIQUER", "MESURER", "PERCER", "PINCER", "REPARER", "REUSSIR", "SERVIR", "TAPER", "TROUER", "TROUVER", "ADROIT", "DIFFICILE", "DUR", "FACILE", "LISSE", "MALADROIT", "POINTU", "TORDU", "ACCIDENT", "AEROPORT", "CAMION", "ENGIN", "FEU", "FREIN", "FUSEE", "GARAGE", "GARE", "GRUE", "HELICOPTERE", "MOTO", "PANNE", "PARKING", "PILOTE", "PNEU", "QUAI", "TRAIN", "VIRAGE", "VITESSE", "VOYAGE", "WAGON", "ZIGZAG", "ARRETER", "ATTERRIR", "BOUDER", "CHARGER", "CONDUIRE", "DEMARRER", "DISPARAITRE", "DONNER", "ECRASER", "ENVOLER", "GARDER", "GARER", "MANQUER", "PARTIR", "POSER", "RECULER", "ROULER", "TENDRE", "TRANSPORTER", "VOLER", "ABIME", "ANCIEN", "BLANC", "BLEU", "CASSE", "CINQ", "DERNIER", "DEUX", "DEUXIEME", "DIX", "GRIS", "GROS", "HUIT", "JAUNE", "MEME", "NEUF", "PAREIL", "PREMIER", "QUATRE", "ROUGE", "SEPT", "SEUL", "SIX", "SOLIDE", "TROIS", "TROISIEME", "UN", "VERT", "DESSUS", "AUTOUR", "VITE", "VERS", "ACROBATE", "ARRET", "ARRIERE", "BARRE", "BARREAU", "BORD", "BRAS", "CERCEAU", "CHAISE", "CHEVILLE", "CHUTE", "COEUR", "CORDE", "CORPS", "COTE", "COU", "COUDE", "CUISSE", "DANGER", "DOIGTS", "DOS", "ECHASSES", "ECHELLE", "EPAULE", "EQUIPE", "ESCABEAU", "FESSE", "FILET", "FOND", "GENOU", "GYMNASTIQUE", "HANCHE", "JAMBE", "JEU", "MAINS", "MILIEU", "MONTAGNE", "MUR", "ESCALADE", "MUSCLE", "NUMERO", "ONGLE", "PARCOURS", "PAS", "PASSERELLE", "PENTE", "PEUR", "PIED", "PLONGEOIR", "POIGNET", "POING", "PONT", "SIGNE", "SINGE", "POUTRE", "EQUILIBRE", "PRISE", "RIVIERE", "CROCODILE", "ROULADE", "PIROUETTE", "SAUT", "SERPENT", "SPORT", "SUIVANT", "TETE", "TOBOGGAN", "TOUR", "TRAMPOLINE", "TUNNEL", "VENTRE", "ACCROCHER", "APPUYER", "ARRIVER", "BAISSER", "BALANCER", "BONDIR", "BOUSCULER", "COGNER", "COURIR", "DANSER", "DEPASSER", "DESCENDRE", "ECARTER", "ESCALADER", "GAGNER", "GENER", "GLISSER", "GRIMPER", "MARCHER", "PATTES", "DEBOUT", "MONTER", "MONTRER", "PENCHER", "PERCHER", "PERDRE", "RAMPER", "RATER", "REMPLACER", "RESPIRER", "RETOURNER", "REVENIR", "SAUTER", "SOULEVER", "SUIVRE", "TOMBER", "TRANSPIRER", "TRAVERSER", "DANGEUREUX", "EPAIS", "FORT", "GROUPE", "IMMOBILE", "ROND", "SERRE", "SOUPLE", "ENSEMBLE", "ICI", "JAMAIS", "TOUJOURS", "SOUVENT", "BAGARRE", "BALANCOIRE", "BALLON", "BANDE", "BICYCLETTE", "BILLE", "CAGE", "ECUREUIL", "CERF", "VOLANT", "CHATEAU", "COUP", "COUR", "COURSE", "ECHASSE", "FLAQUE", "EAU", "PAIX", "PARDON", "PARTIE", "PEDALE", "PELLE", "POMPE", "PREAU", "RAQUETTE", "RAYON", "RECREATION", "SABLE", "SIFFLET", "SIGNE", "TAS", "TRICYCLE", "TUYAU", "VELO", "FILE", "RANG", "BAGARRER", "BATTRE", "CACHER", "CRACHER", "CREUSER", "CRIER", "DEGONFLER", "DISPUTE", "EMPECHER", "GALOPER", "HURLER", "JONGLER", "LANCER", "PEDALER", "PLAINDRE", "PLEURER", "POURSUIVRE", "PROTEGER", "SAIGNER", "SALIR", "SIFFLER", "SURVEILLER", "TRAINER", "TROUVER", "FOU", "MECHANT"]
      var index = Math.floor((Math.random() * words.length) + 0);
      return words[index];
    }

    $scope.addOneError = function () {
      $scope.errors++;
      $scope.image = ($scope.errors + 1) + ".png";
      $scope.errorsLeft--;
    }

    $scope.word = $scope.getRandomWord();
    $scope.updateWord($scope.word);

  }


]);