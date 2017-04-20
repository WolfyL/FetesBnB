angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("anon/home.html",
    "<section class=\"section section-quaternary mt-none mb-sm \" style=\"background-color: {{backColor}}; color:{{color}};\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <h1>Trouver une salle à louer proche de chez vous</h1>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <form action=\"/trouver-une-salle\" method=\"get\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-5 \">\n" +
    "                            <div class=\"formBlock select typeahead-container\">\n" +
    "                                <label>Ville ou code postal  :</label>\n" +
    "                                <input type=\"search\" name=\"\" autocomplete=\"off\" placeholder=\"Où ?\" class=\"formDropdown form-control\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-md-3 \">\n" +
    "                            <div class=\"formBlock select typeahead-container\">\n" +
    "                                <label>Rayon de recherche</label>\n" +
    "                                <input type=\"search\" name=\"\" autocomplete=\"off\" placeholder=\"Rayon ?\" class=\"formDropdown form-control\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-md-2\">\n" +
    "                            <div class=\"formBlock select\">\n" +
    "                                <label>Nbr de personnes : </label>\n" +
    "                                <input type=\"text\" name=\"\" size=\"5\" placeholder=\"Nombre de personnes ?\" class=\" form-control\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-12 pt-lg\">\n" +
    "                            <button type=\"submit\" class=\"btn btn-primary btn-lg pull-right\"><i class=\"fa fa-search fa-lg\"></i> Lancer la recherche</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <input type=\"hidden\" name=\"\" value=\"\" class=\" form-control\" />\n" +
    "                    <input type=\"hidden\" name=\"\" value=\"\" class=\" form-control\" />\n" +
    "                    <input type=\"hidden\" name=\"\" class=\" form-control\" />\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "\n" +
    "<div class=\"col-lg-offset-3 col-lg-6\">\n" +
    "    <img src=\"https://i.stack.imgur.com/D167A.png\" alt=\"\">\n" +
    "</div>\n"
  );

  $templateCache.put("anon/login.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-6 col-xs-offset-3\">\n" +
    "        <form class=\"form\" name=\"loginForm\" novalidate ng-submit=\"login()\">\n" +
    "            <div ng-repeat=\"error in errors\">{{error.error}}</div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" required placeholder=\"Email Address\">\n" +
    "            </div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"user.password\" required placeholder=\"Password\">\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary btn-block\">Login</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("anon/navbar.html",
    "<header>\n" +
    "    <div id=\"head_top\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-2 col-md-2 col-sm-6 col-xs-6\">\n" +
    "                    <a href=\"/\"> <img class=\"logo img-responsive\" id=\"monLogo\" src=\"http://www.entrebeauceetperche.fr/public/images/logo.svg\" /> </a>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-8 col-md-8 col-sm-6 col-xs-6\">\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>\n" +
    "<nav class=\"navbar styleNavbar\" role=\"navigation\" ng-controller=\"NavbarController\">\n" +
    "    <!-- <div class=\"container-fluid\"> -->\n" +
    "    <!-- <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navbar\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span> -->\n" +
    "    <!-- <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span> -->\n" +
    "    <!-- </button> -->\n" +
    "    <!-- <a class=\"navbar-brand\" href=\"#\"></a>\n" +
    "        </div> -->\n" +
    "    <!-- <div class=\"collapse navbar-collapse\" id=\"navbar\"> -->\n" +
    "    <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li>\n" +
    "            <li ui-sref-active=\"active\"><a ui-sref=\"anon.home\">Home</a></li>\n" +
    "            <li ui-sref-active=\"active\"><a ui-sref=\"anon.login\" ng-hide=\"auth.isAuthenticated()\">Login</a></li>\n" +
    "            <li ui-sref-active=\"active\"><a ui-sref=\"anon.register\" ng-hide=\"auth.isAuthenticated()\">Register</a></li>\n" +
    "            <!-- <li ui-sref-active=\"active\"><a ui-sref=\"user.dashboard\" ng-show=\"auth.isAuthenticated()\">Dashboard</a></li> -->\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "</nav>\n"
  );

  $templateCache.put("anon/register.html",
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-6 col-xs-offset-3\">\n" +
    "        <form class=\"form\" name=\"loginForm\" novalidate ng-submit=\"register()\">\n" +
    "            <div ng-repeat=\"error in errors\">{{error.error}}</div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "                <input id=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" required placeholder=\"Email Address\">\n" +
    "            </div>\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "                <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"user.password\" required placeholder=\"Password\">\n" +
    "            </div>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary btn-block\">Register</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("user/dashboard.html",
    "Dashboard de {{user.email}}\n"
  );

  $templateCache.put("user/home.html",
    "<section class=\"section section-quaternary mt-none mb-sm \" style=\"background-color: {{section.backColor}}; color:{{section.color}};\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <h1>Trouver une salle à louer proche de chez vous</h1>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-12\">\n" +
    "                <form action=\"/trouver-une-salle\" method=\"get\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-4 \">\n" +
    "                            <div class=\"formBlock select typeahead-container\">\n" +
    "                                <label>Ville ou code postal  :</label>\n" +
    "                                <input type=\"search\" name=\"\" autocomplete=\"off\" placeholder=\"Où ?\" class=\"formDropdown form-control\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-md-2 \">\n" +
    "                            <div class=\"formBlock select typeahead-container\">\n" +
    "                                <label>Rayon de recherche</label>\n" +
    "                                <input type=\"search\" name=\"\" autocomplete=\"off\" placeholder=\"Rayon ?\" class=\"formDropdown form-control\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-md-3\">\n" +
    "                            <div class=\"formBlock select\">\n" +
    "                                <label>Nbr de personnes : </label>\n" +
    "                                <input type=\"text\" name=\"\" size=\"5\" placeholder=\"Nombre de personnes ?\" class=\" form-control\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-12 pt-lg\">\n" +
    "                            <button type=\"submit\" class=\"btn btn-primary btn-lg pull-right\"><i class=\"fa fa-search fa-lg\"></i> Lancer la recherche</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <input type=\"hidden\" name=\"trouver_salle_type[lieu_id]\" value=\"\" class=\" form-control\" />\n" +
    "                    <input type=\"hidden\" name=\"trouver_salle_type[type]\" value=\"\" class=\" form-control\" />\n" +
    "                    <input type=\"hidden\" name=\"trouver_salle_type[rayon]\" class=\" form-control\" />\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "\n" +
    "<div class=\"row\" ng-if=\"user.isAdmin\">\n" +
    "    <label class=\"control-label\">Color</label>\n" +
    "    <color-picker class='col-sm-1' ng-model=\"section.color\" options=\"{'format':'hex', 'placeholder': '', 'round': false}\"></color-picker>\n" +
    "    <color-picker class='col-sm-1' ng-model=\"section.backColor\" options=\"{'format':'hex', 'placeholder': '', 'round': false}\"></color-picker>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-offset-3 col-lg-6\">\n" +
    "            <img src=\"https://i.stack.imgur.com/D167A.png\" alt=\"\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("user/navbar.html",
    "<header>\n" +
    "    <div id=\"head_top\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-2 col-md-2 col-sm-6 col-xs-6\">\n" +
    "                    <a href=\"/\"> <img class=\"logo img-responsive\" id=\"monLogo\" src=\"http://www.entrebeauceetperche.fr/public/images/logo.svg\" /> </a>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-8 col-md-8 col-sm-6 col-xs-6\">\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>\n" +
    "<nav class=\"navbar styleNavbar\" role=\"navigation\" ng-controller=\"NavbarController\">\n" +
    "    <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li>\n" +
    "            <li ui-sref-active=\"active\"><a ui-sref=\"user.home\">Home</a></li>\n" +
    "            <li ui-sref-active=\"active\"><a ui-sref=\"user.dashboard\" ng-show=\"auth.isAuthenticated()\">Favoris</a></li>\n" +
    "            <li ui-sref-active=\"active\"><a ui-sref=\"user.profile\" ng-show=\"auth.isAuthenticated()\">Profile</a></li>\n" +
    "            <li ui-sref-active=\"active\"><a ui-sref=\"user.salleDesFetes\" ng-if=\"user.isAdmin\">Mes salles des fêtes</a></li>\n" +
    "            <li><a ng-click=\"logout()\" ng-show=\"auth.isAuthenticated()\" href='#'>Logout</a></li>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    </div>\n" +
    "</nav>\n"
  );

  $templateCache.put("user/profile.html",
    "<div id=\"profileTop\">\n" +
    "    <h3 style=\"text-decoration : underline\">Profile de {{user.email}}</h3>\n" +
    "    <div class=\"container-fluid\" style=\"border : 1px black solid; border-radius: 5px;\">\n" +
    "        <label style=\"color: black;\">Nom : </label><br/>\n" +
    "        <label style=\"color: black;\">Prénom : </label><br/>\n" +
    "        <label style=\"color: black;\">Email : {{user.email}}</label> <br/>\n" +
    "        <button type=\"button\" ng-click=\"changePassword()\">Change password</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );

  $templateCache.put("user/salleDesFetes.html",
    "<div container-fluid class=\"marginTop\">\n" +
    "    <form>\n" +
    "        <div class=\"input-field col s4\">\n" +
    "            <label>Nom de la salle :</label>\n" +
    "            <input type=\"text\" ng-model=\"nomSDF\">\n" +
    "        </div>\n" +
    "        <!-- <button type=\"button\">Ajouter une ou plusieurs photos</button> -->\n" +
    "        <div class=\"input-field col s4\">\n" +
    "            <label>Description de la salle :</label>\n" +
    "            <input type=\"text\" ng-model=\"descriptionSDF\">\n" +
    "        </div>\n" +
    "        <div class=\"input-field col s4\">\n" +
    "            <label>Capacité maximale de la salle :</label>\n" +
    "            <input type=\"text\" ng-model=\"capaciteSDF\">\n" +
    "        </div>\n" +
    "        <div class=\"input-field col s4\">\n" +
    "            <label>Surface de la salle :</label>\n" +
    "            <input type=\"text\" ng-model=\"surfaceSDF\">\n" +
    "        </div>\n" +
    "        <button type=\"submit\" name=\"button\" ng-click=\"addSDF()\">Ajouter une salle des fêtes</button></div>\n" +
    "<ul ng-repeat=\"salleDesFetes in sallesDesFetes track by $index\">\n" +
    "    <li>\n" +
    "        <div class=\"input-field col s4\">\n" +
    "            <h5>Nom de la salle :</h5> {{salleDesFetes.nom}}\n" +
    "        </div>\n" +
    "        <div class=\"input-field col s4\">\n" +
    "            <h5>Description de la salle :</h5> {{salleDesFetes.description}}\n" +
    "        </div>\n" +
    "        <div class=\"input-field col s4\">\n" +
    "            <h5>Capacité maximale de la salle :</h5> {{salleDesFetes.capacite}}\n" +
    "        </div>\n" +
    "        <div class=\"input-field col s4\">\n" +
    "            <h5>Surface de la salle :</h5> {{salleDesFetes.surface}}\n" +
    "        </div>\n" +
    "        <button type=\"button\" ng-click=\"editSDF($index)\">Modifier des informations</button>\n" +
    "        <ng-show ng-show=\"editSDF[$index]\">\n" +
    "            <input type=\"text\" ng-model=\"newNomSDF\">\n" +
    "            <input type=\"text\" ng-model=\"newDescriptionSDF\">\n" +
    "            <input type=\"text\" ng-model=\"newCapaciteSDF\">\n" +
    "            <input type=\"text\" ng-model=\"newSurfaceSDF\">\n" +
    "            <button type=\"button\" ng-click=\"editSDFDone($index, {nom : newNomSDF, description: newDescriptionSDF, capacite: newCapaciteSDF, surface: newSurfaceSDF})\">Valider vos modifications</button>\n" +
    "        </ng-show>\n" +
    "        <button type=\"button\" name=\"button\" ng-click=\"deleteSDF($index)\">Supprimer une salle des fêtes</button>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "</form>\n" +
    "</div>\n" +
    "</div>\n"
  );

}]);
