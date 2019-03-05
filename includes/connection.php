<?php 
    // option pour la gestion de l'encodage
    $options=array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES ".$encodage); 
 
    // Gestion des erreurs avec try catch 
    try 
    { 
        $connection = new PDO('mysql:host='.$hote.';port='.$port.';dbname='.$nom_bd,$identifiant, $mot_de_passe,$options); 
        if($debug) 
        { 
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        }    
    } catch (PDOException $erreur) 
    {
        if($debug) 
        { 
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        } 
        else
        {
                echo "Serveur actuellement innaccessible, veuillez nous excuser.";
        }
        exit(); 
    } 
?>