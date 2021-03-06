function refreshCard(id, baseLien, linkDeleteCard, linkFounder, username, linkCard){
    var linkGetDetail = baseLien;
    var myRegexp = /([0-9]+)/g;
    var match = myRegexp.exec(baseLien); //match[1] is the id of the archive
    if(match[1]){
        var pos = baseLien.lastIndexOf('/'); // position du dernier "/"
        baseLien = baseLien.substr(0, pos+1);
        var lien = baseLien+id;

        $.ajax({
            type: 'GET',
            url: lien,

            success: function(data, status) {
                //The card
                var li = document.getElementById("card-"+data.id);

                //If the card is not in the actual filter
                state = document.getElementById('State').value;
                if(state == 'true'){
                    state = true;
                }
                else if(state == 'false'){
                    state = false;
                }

                if(state != 'none' && data.state != state){
                    li.parentElement.removeChild(li);
                }
                else{
                    //Reset all the content of the card
                    li.innerHTML = "";

                    /*==================================================================
                    Coloration of the card

                    If the deadline is overdue, the card become red
                    If the task is completed, the card become green
                    Else the card is white
                    ==================================================================*/
                    li.style.backgroundColor = '#ffffff';
                    if(new Date() > new Date(data.deadline)){
                        li.style.backgroundColor = '#eedada';
                    }
                    if(data.state == true){
                        li.style.backgroundColor = '#daeddd';
                    }

                    /*==================================================================
                    Create HTML element for placement
                    ==================================================================*/
                    //Title
                    var titre = document.createElement('h3');
                    var lienTitre = document.createElement('a');

                    var pos = linkCard.lastIndexOf('/'); // position du dernier "/"
                    linkCard = linkCard.substr(0, pos-1);
                    linkCard = linkCard + data.id;
                    lienTitre.href = linkCard;
                    lienTitre.innerHTML = data.title;
                    titre.appendChild(lienTitre);

                    //Creator
                    var creator = document.createElement('span');
                    creator.innerHTML =  gettext('created by') + " : " + data.creator + "<br>";

                    //Deadline
                    var date = document.createElement('span');
                    if(data.deadline){
                        date.innerHTML = gettext('for') + " : " + data.deadline + "<br>";
                    }

                    //Link to delete this card
                    var spanDelete = document.createElement('span');
                    spanDelete.className = data.id;
                    spanDelete.setAttribute('onclick',"deleteCard(this.className,'"+linkDeleteCard+"');");
                    spanDelete.innerHTML = "<i class='fa fa-trash'></i>";
                    spanDelete.style.float = "right";
                    var linkDelete = document.createElement('a');

                    //Link to edit this card
                    var spanEdit = document.createElement('span');
                    spanEdit.className = data.id;
                    spanEdit.setAttribute('onclick',"editCard(this.className,'"+linkGetDetail+"');");
                    spanEdit.innerHTML = "<i class='fa fa-pencil-square-o'></i>";
                    spanEdit.style.float = "right";
                    var linkEdit = document.createElement('a');

                    //Description of the card
                    var p = document.createElement('p');
                    p.innerHTML = "<br>" + data.comment;

                    //Picture of assigned
                    if(data.picture){
                        var linkAssigned = document.createElement('a');

                        lien = linkFounder;
                        var pos = lien.lastIndexOf('/'); // position du dernier "/"
                        lien = lien.substr(0, pos+1);
                        var lien = lien+data.assigned;
                        linkAssigned.href = lien;
                        linkAssigned.className = "assigned";

                        var imgAssigned = document.createElement('img');
                        imgAssigned.className = "avatar";
                        imgAssigned.src = "/media/" + data.picture;
                        imgAssigned.style.width = "40px";

                        linkAssigned.appendChild(imgAssigned);
                    }

                    /*==================================================================
                    placement of HTML elements
                    ==================================================================*/

                    //We can edit and delete only if we are the creator of the task/card
                    if(data.creator == username){
                        linkDelete.appendChild(spanDelete);
                        linkEdit.appendChild(spanEdit);
                        titre.appendChild(linkDelete);
                        titre.appendChild(linkEdit);
                    }
                    li.appendChild(titre);
                    li.appendChild(creator);
                    if(data.deadline){
                        li.appendChild(date);
                    }
                    li.appendChild(p);
                    if(data.picture){
                        li.appendChild(linkAssigned);
                    }

                    /*==================================================================
                    Change column for go in the new phase
                    ==================================================================*/
                    var ul = li.parentElement;
                    var newUl = document.getElementById('phase-'+ data.phase);

                    if(ul != newUl){
                        ul.removeChild(li);
                        newUl.appendChild(li);
                    }
                }
            },

            error: function(resultat, status, erreur) {
                alert(erreur);
            }
        });
    }
}