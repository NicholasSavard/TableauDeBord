function archiver(baseLien, companyId, baseLienArchive, baseLienDeleteArchive){
    var pos = baseLien.lastIndexOf('/'); // position du dernier "/"
    baseLien = baseLien.substr(0, pos+1);
    var pos = baseLienArchive.lastIndexOf('/'); // position du dernier "/"
    baseLienArchive = baseLienArchive.substr(0, pos+1);
    var pos = baseLienDeleteArchive.lastIndexOf('/'); // position du dernier "/"
    baseLienDeleteArchive = baseLienDeleteArchive.substr(0, pos+1);
    var lien = baseLien+companyId;
    $.ajax({
        type: 'GET',
        url: lien,

        success: function(data, status) {
            //Create the new archive
            div = document.getElementById("divArchive");

            newArchive = document.createElement('div');
            newArchive.id = "archive" + data.id;
            newArchive.style.borderBottom = "1px dashed black";
            newArchive.style.paddingLeft = "10px";

            newLink = document.createElement('a');
            newLink.href = baseLienArchive + data.id;
            newLink.innerHTML = data.date;

            spanDelete = document.createElement('span');
            spanDelete.innerHTML = "<i class=\"fa fa-trash\"></i>";
            spanDelete.className = "archive"+ data.id;
            spanDelete.style.float = "right";
            spanDelete.style.color = "#428bca";

            newLinkSpanDelete = document.createElement('a');
            newLinkSpanDelete.href = baseLienDeleteArchive+data.id

            newLinkSpanDelete.appendChild(spanDelete);

            newArchive.appendChild(newLink);
            newArchive.appendChild(newLinkSpanDelete);

            div.appendChild(newArchive);

            //Update color of all element in the page
            listSpanColor = document.getElementsByClassName("colorElement");
            for(var elem in listSpanColor)
            {
                listSpanColor[elem].style.color = "#428bca"
            }
        },

        error: function(resultat, status, erreur) {
            alert(erreur);
        }
    });
}