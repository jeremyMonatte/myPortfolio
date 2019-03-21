<?php
	include("configuration/config.php");
    include("includes/connection.php");
    $idproj=($_GET["proj"]);
    $idprojSuiv=$idproj-1;
    $idprojPrec=$idproj+1;
    //http://localhost/analytics/projet.php?proj=1

    $nbProj="SELECT COUNT(Id_Projet)AS combien FROM `projet` ";
    $resultats= $connection->query($nbProj);
    $nbProjet=$resultats->fetch(PDO::FETCH_OBJ);
    $resultats->closeCursor();
    $nombre=$nbProjet->combien;

    $detailProj="SELECT * FROM `projet` WHERE Id_Projet=".$idproj."";
    $resultats= $connection->query($detailProj);
    $detailProjet=$resultats->fetch(PDO::FETCH_OBJ);
    $resultats->closeCursor();
    session_start();
    if(empty($_SESSION["version"])){
        $url="index.html";
    }else{
        $url=$_SESSION["version"].'#works';
    }
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
    <link href="https://fonts.googleapis.com/css?family=Arvo|Thasadith" rel="stylesheet"> 
</head> 
<body class="body-proj">
<link rel="shortcut icon" type="image/x-icon" href="img/favicon.svg">

    <div id="load">
        <div id="çatouuuuurne"></div>
        <h5>Chargement ...</h5>
    </div>
    <nav class="navbar-proj">
        <?php
            if($detailProjet->Id_Projet<$nombre){
                echo('<a href="projet.php?proj='.$idprojPrec.'">⟨</a>');
            }
        ?>
        <a href="<?=$url?>" class="main-a">Accueil</a>
        <?php
            if($detailProjet->Id_Projet>1){
                echo('<a href="projet.php?proj='.$idprojSuiv.'">⟩</a>');
            }
        ?>
    </nav>

    <div class="projet-pres">
        <div class="projet-pres-visuel">
            <?php
                if($detailProjet->img_ou_pas_Projet==1){
                    echo('<img src="'.$detailProjet->Visuel_Projet.'" alt="">');
                }else{
                    echo($detailProjet->Visuel_Projet);
                }
            ?>
            
        </div>
        <div class="projet-pres-desc">
            <h2><?php echo('"'.$detailProjet->Nom_Projet.'"') ?></h2>
            <p><b>Technologies : <?php echo($detailProjet->Technologies_Projet) ?></b></p>
            <p><b>Durée : <?php echo($detailProjet->Durée_Projet) ?></b></p>
            <aside><?php echo($detailProjet->desc_Projet) ?></aside>
            <?php
                if(!empty($detailProjet->Lien_Projet)){
                    echo('<a href="'.$detailProjet->Lien_Projet.'" target="_blank">Voir le Projet</a>');
                }

                $nbCol="SELECT COUNT(Id_Projet)AS Colab FROM `collabore` WHERE Id_Projet=".$idproj."";
                $resultats= $connection->query($nbCol);
                $nbColab=$resultats->fetch(PDO::FETCH_OBJ);
                $resultats->closeCursor();
                if ($nbColab->Colab>0) {
                    $idCol="SELECT * FROM `collabore` WHERE Id_Projet=".$idproj."";
                    $resultats= $connection->query($idCol);
                    $idColab=$resultats->fetchAll(PDO::FETCH_OBJ);
                    $resultats->closeCursor();

                    
                    echo("<h4>Je n'ai pas travaillé seul : </h4>");
                    for ($j=0; $j < $nbColab->Colab; $j++) { 

                        $Col="SELECT * FROM `colab` WHERE Id_Colab=".$idColab[$j]->Id_Colab."";
                        $resultats= $connection->query($Col);
                        $Colab=$resultats->fetch(PDO::FETCH_OBJ);
                        $resultats->closeCursor();

                        echo('<a href="'.$Colab->lien_Colab.'">'.$Colab->Nom_Colab.'</a>');
                    }
                }
            ?>
        </div>
    </div>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="src/js/script.js"></script>


</body>
</html>