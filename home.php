<?php
	include("configuration/config.php");
    include("includes/connection.php");

    $nbProj="SELECT COUNT(Id_Projet)AS combien FROM `projet` ";
    $resultats= $connection->query($nbProj);
    $nbProjet=$resultats->fetch(PDO::FETCH_OBJ);
    $resultats->closeCursor();
    $nombre=$nbProjet->combien;
    
    session_start();
    $_SESSION["version"]='home.php';
?>

<!DOCTYPE html>
<html lang="fr">
<head> 

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131478056-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-131478056-1');
    </script>


    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Portfolio d'un Développeur Web">
    <meta name="keywords" content="Portfolio, Jérémy, Monatte, Front-End, MMI, Développement, Web, HTML, CSS, XML, JavaScript">
    <meta name="author" content="Jérémy Monatte">
    <title>Portfolio Jérémy Monatte</title>
    <link rel="stylesheet" href="src/scss/style.css">

    <meta property="og:url" content="http://jeremy-monatte.tk/" />
    <meta property="og:type" content="profile" />
    <meta property="og:title" content="Portfolio Jérémy Monatte" />
    <meta property="og:description" content="Portfolio d'un Développeur Web" />
    <meta property="og:image" content="img/moi.jpg" />
    <meta property="og:locale" content="fr_FR" />
    <link href="https://fonts.googleapis.com/css?family=Arvo|Thasadith|Playfair+Display" rel="stylesheet"> 
</head> 
<body>
<link rel="shortcut icon" type="image/x-icon" href="img/favicon.svg">

    <div id="load">
        <div id="çatouuuuurne"></div>
        <h5>Chargement ...</h5>
    </div>
    <canvas id="fond">
    </canvas>
    <?php 
        require 'contentHome.php'
    ?>
    <canvas id="mouse">
    </canvas>

<script type="text/javascript" src="src/js/jquery.js"></script>
<script type="text/javascript" src="src/js/script.js"></script>
<script type="text/javascript" src="src/js/canvasGraph.js"></script>
<script type="text/javascript" src="src/js/canvasHD.js"></script>


</body>
</html>