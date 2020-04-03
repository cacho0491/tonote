{
    //var notes = [];
    var currentID = "";
    //var startNewNote = false;
    document.getElementById("note__title").focus();

    function add__btn() {
        
        const title = document.getElementById("note__title").value;
        const txtarea = document.getElementById("note__txtarea").value;
        const newNote = {
            [title]: txtarea
        }

        // Only to test -- remove later
        //currentID = "";
        if(title){
            saveNote(newNote);
        }
        
        document.getElementById("note__title").value = "";
        document.getElementById("note__txtarea").value = "";
    }

    function saveNote(note) {
        window.localStorage.setItem(Object.keys(note), Object.values(note));
       
        document.getElementById("message").innerHTML = "Successfully added!";
        
        const modal = document.getElementById("popUpMessage");
        document.querySelector(".deletion-btns").style.display = "none";
        modal.style.display = "block";
        setTimeout(function(){
            modal.style.display = "none";
    
        },1500);
        displayNotes();
    }
    
    if(localStorage.length > 0) {
        displayNotes();
    } else {
        document.getElementById("saved__notes").innerHTML = "Add a note :) ----->"
    }

    function displayNotes() {
        
        document.getElementById("saved__notes").innerHTML = "";

        for(let i=0; i<localStorage.length; i++){
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);

            const li = document.createElement("LI");
            const btn = document.createElement("BUTTON")
            const btnDiv = document.createElement("DIV");

            btnDiv.setAttribute("class", "show-del-btn");
            btn.innerHTML = "X";
            btn.setAttribute("class", "delete--btn")
            
            btnDiv.appendChild(btn)
            li.setAttribute("onclick", "noteSelected(this)");
       
            li.innerHTML = key;
            li.setAttribute("id", key);
            btn.setAttribute("id", key);
            btn.setAttribute("onclick", "deleteItem(this.id)");
            li.appendChild(btnDiv);
            
            document.getElementById("saved__notes").appendChild(li);
           
        }

        } 
       
    

    function noteSelected(e){
    
        if(currentID){
         
            document.getElementById(currentID).classList.remove("noteSelected");
        }
        currentID = e.id;
        //document.getElementById(currentID).classList.remove("noteSelected");
        document.getElementById(e.id).classList.add("noteSelected");
        
        for(let i=0; i<localStorage.length; i++){
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            if(key == e.id) {
                
                document.getElementById("save__btn").style.display = "block";
                document.getElementById("newNote").style.display = "block";
                document.getElementById("add__btn").style.display = "none";
                document.getElementById("note__title").value = key;
                document.getElementById("note__txtarea").value = value;
            } 
        }
        
        
    }

    function showDelBtn(e) {
        // const delBtn = document.createElement("BUTTON");
       
        // delBtn.setAttribute("class", "show-del-btn");
        // delBtn.setAttribute("onclick", "deleteItem()")
        // delBtn.innerHTML = "X";
        // document.getElementById(e.id).appendChild(delBtn);
        //document.getElementById(e.id).classList.add("show-del-btn");
    };

    // function hideDelBtn(e) {
    //     document.getElementById(e.id).firstChild.removeChild();
    //     document.querySelector(".show-del-btn").style.display = "none";
    //     //document.getElementById(e.id).firstElementChild.remove();
    // };

    
    function deleteItem(e) {
        
        const modal = document.getElementById("popUpMessage");
        document.getElementById("message").innerHTML = "Are you sure?";
        document.querySelector(".deletion-btns").style.display = "inline-block";
        modal.style.display = "block";
        
        const delBtn = document.getElementById("confirmDeletion");
        const cancelBtn = document.getElementById("cancelDeletion");
        
        window.onclick = function(e){
            if(e.target == delBtn){
                confirmDel(this.currentID);
                modal.style.display = "none";
                this.newNote();
            } else if (e.target == cancelBtn || e.target == modal) {
                modal.style.display = "none";
            }
        }
    


        //const confirm = document.getElementById("confirmDeletion").addEventListener("click", confirmDel(e));
        
        //document.getElementById(e).classList.add("delete-item");
        
    };

    function confirmDel(id) {
        const item = id;
        for(let i=0; i<localStorage.length; i++){
            const key = localStorage.key(i);
            //const value = localStorage.getItem(key);
            if(key == item){
              
                localStorage.removeItem(key);
                
                document.getElementById("saved__notes").innerHTML = "";
                displayNotes();
                
            };
        };
        
        currentID = "";
    }

    function save__btn() {
        
        // TO BE CONTINUE...
        const data = getNoteData();
        const newId = String(Object.keys(data))
        deleteItem(currentID);
        saveNote(data);
        currentID = newId;
    }

    function newNote() {
        //startNewNote = true;
        if(currentID){
            document.getElementById(currentID).classList.remove("noteSelected");
        }
        else{
        currentID = "";
        
        document.getElementById("note__title").value = "";
        document.getElementById("note__txtarea").value = "";
        document.getElementById("save__btn").style.display = "none";
        document.getElementById("newNote").style.display = "none";
        document.getElementById("add__btn").style.display = "block";
        document.getElementById("note__title").focus();
        }
    };

    // Get Note Data
    function getNoteData() {
        const title = document.getElementById("note__title").value;
        const txtarea = document.getElementById("note__txtarea").value;
        const newNote = {
            [title]: txtarea
        }
        return newNote;
    }

    function mobileNav(){
        const navBar = document.querySelector(".nav-bar");
        if(navBar.style.display == "none"){
            navBar.style.display = "block";
        } else {
            navBar.style.display = "none";
        };
    };
    
    
}