
    <a href='#header' class="retourhaut"><img src="img/FlecheHaut.svg" alt=""></a>

<div class="headerBcgrd"></div>
<header id="header">
    <div class="grpTitre">
    <h1>
        Intégrateur Web
    </h1>
    <h2>
        Jérémy Monatte
    </h2>
    </div>
    <a href='#about' class="gobot">↓</a>
</header>
<nav class="nav-home">
    <a href="#about">A propos</a>
    <a href="#skills">Outils</a>
    <a href="#works">Travaux</a>
    <a href="#contact">Contact</a>
</nav>
<div class="menuToggle detectCursor">
    <div class="bar1"></div>
    <div class="bar2"></div>
</div>
<section class="about" id="about">
    <article id="artmoi">
        <h2 id="abouth2">Qui suis-je ?</h2>
        <p>Je suis un Développeur web junior. Je suis en 2ème année de DUT MMI. Je m'oriente vers une licence Pro pour devenir Intégrateur Web, même si je ne suis pas complètement fermé à du développement Back-end ou Front-end. Motivé et curieux, je cherche à toujours découvrir de nouveaux outils. J'ai jamais su faire parler les textes, ce serait plus simple de se rencontrer. <a href="#contact">Qu'en dites vous?</a></p>
    </article>
</section>
<section class="competence" id="skills">
    <h2>Mes outils</h2>
    <div class="competence-selector">
        <button data-selector="inte" class="button-competence opened">L'intégration</button>
        <button data-selector="other" class="button-competence">Mes suppléments</button>
    </div>
    <div class="competence-selected competence-selected-inte">
        <div class="competence-item" id="item_html5">
            <canvas class="canvas_Graph" id="canvas_html5" data-score="80" data-couleur="orange">
            </canvas>
            <img src="img/icone/html.svg" alt="" class="icone">
            <br>
            HTML 5
        </div>
        
        <div class="competence-item" id="item_css3">
            <canvas class="canvas_Graph" id="canvas_css3" data-score="85" data-couleur="bleu">
            </canvas>
            <img src="img/icone/css.svg" alt="" class="icone">
            <br>
            CSS 3
        </div>
        
        <div class="competence-item" id="item_js">
            <canvas class="canvas_Graph" id="canvas_js" data-score="70" data-couleur="jaune">
            </canvas>
            <img src="img/icone/js.svg" alt="" class="icone">
            <br>
            JS
        </div>
        
        <div class="competence-item" id="item_jquery">
            <canvas class="canvas_Graph" id="canvas_jquery" data-score="75" data-couleur="bleu">
            </canvas>
            <img src="img/icone/jquery.svg" alt="" class="icone">
            <br>
            jQuery
        </div>
        
        <div class="competence-item" id="item_scss">
            <canvas class="canvas_Graph" id="canvas_scss" data-score="72" data-couleur="rose">
            </canvas>
            <img src="img/icone/scss.svg" alt="" class="icone">
            <br>
            SCSS
        </div>
        
        <div class="competence-item" id="item_wordpress">
            <canvas class="canvas_Graph" id="canvas_wordpress" data-score="69" data-couleur="autre">
            </canvas>
            <img src="img/icone/wordpress.svg" alt="" class="icone">
            <br>
            Wordpress
        </div>
    </div>
    <div class="competence-selected competence-selected-other">
        <div class="competence-item" id="item_php">
            <canvas class="canvas_Graph" id="canvas_php" data-score="65" data-couleur="violet">
            </canvas>
            <img src="img/icone/php.svg" alt="" class="icone">
            <br>
            PHP
        </div>

        <div class="competence-item" id="item_sql">
            <canvas class="canvas_Graph" id="canvas_sql" data-score="55" data-couleur="bleu">
            </canvas>
            <img src="img/icone/sql.svg" alt="" class="icone">
            <br>
            SQL
        </div>
        
        <div class="competence-item" id="item_adobe">
            <canvas class="canvas_Graph" id="canvas_adobe" data-score="60" data-couleur="rouge">
            </canvas>
            <img src="img/icone/adobe.svg" alt="" class="icone">
            <br>
            Suite Adobe
        </div>
        
        <div class="competence-item" id="item_camera">
            <canvas class="canvas_Graph" id="canvas_camera" data-score="55" data-couleur="autre">
            </canvas>
            <img src="img/icone/camera.svg" alt="" class="icone">
            <br>
            Audiovisuel
        </div>
        
        <div class="competence-item" id="item_team">
            <canvas class="canvas_Graph" id="canvas_team" data-score="70" data-couleur="bleu">
            </canvas>
            <img src="img/icone/team.svg" alt="" class="icone">
            <br>
            Travail en équipe
        </div>
        
        <div class="competence-item" id="item_git">
            <canvas class="canvas_Graph" id="canvas_git" data-score="55" data-couleur="orange">
            </canvas>
            <img src="img/icone/git.svg" alt="" class="icone">
            <br>
            Git
        </div>
    </div>
</section>
<section class="travaux" id="works">
    <h2 id="workh2">Un tour dans mon expo ?</h2>
    <?php
        for ($i=0; $i <$nombre; $i++) { 
            
            $detailProj="SELECT Id_Projet,Nom_Projet,Technologies_Projet,Durée_Projet,vignette_Projet FROM `projet` WHERE Id_Projet=".($nombre-$i)."";
            $resultats= $connection->query($detailProj);
            $detailProjet=$resultats->fetch(PDO::FETCH_OBJ);
            $resultats->closeCursor();?>

            <figure  class="travail detectCursor">
                <a href="projet.php?proj=<?=$detailProjet->Id_Projet?>">
                    <img src="<?=$detailProjet->vignette_Projet?>" alt="" class="color">
                    <img src="<?=$detailProjet->vignette_Projet?>" alt=""class="nb">

                    <figcaption>
                        <?=$detailProjet->Nom_Projet?>
                    </figcaption>                        
                </a>

            </figure>
        <?php
        }
    ?>
</section>
<section class="contact" id="contact">
    <h2 id="contacth2">Et si on discutait ?</h2>
    <div class="network">
    <a href="mailto:jeremy.monatte@gmail.com">Par Mail : <br><img src="img/gmail.svg"><br><p class="petit">jeremy.monatte@gmail.com</p></a>
    </div>
    <div class="network">   
    <a href="tel:0698692057">Par Téléphone : <br><img src="img/tel.svg"><br><p class="petit">06.98.69.20.57</p></a>
    </div>
    <div class="network">
    <a href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-monatte-a704b0158" target="_blank">
    Sur LinkedIn : <br><img src="img/Linkedin.svg"></a>
    </div>
    <div class="network">
    <a href="other/CVjermyMonatte.pdf" target="_blank">
    Un coup d'œil sur mon CV ?<br><img src="img/CV.svg"></a>
    </div>
</section>