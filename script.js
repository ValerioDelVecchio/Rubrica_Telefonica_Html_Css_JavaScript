//due campi di input: uno per il nome, uno per il numero
//un bottone per mostrare/nascondere i contatti
//un bottone per la ricerca di un contatto
//un bottone per rimuovere un contatto

let contactsWrapper = document.querySelector('#contactsWrapper');

//input
let contactName = document.querySelector('#contactName');
let contactNumber = document.querySelector('#contactNumber');
console.log(contactName.value);

//bottoni
let btnShowContacts = document.querySelector('#btnShowContacts');
let btnAddContact = document.querySelector('#btnAddContact');



let rubrica = {
    contacts: [
        {name: 'Valerio', number: '329-3132755'},
        {name: 'Elisabetta', number:'345-3456723'},
        
    ],

    showContacts: function(){
        this.contacts.forEach((contact) => {
            //sto creando il tag div per ogni contatto
            let div = document.createElement('div');
            //aggiungo classe col-12 per ogni div
            div.classList.add('col-12', 'my-3');
            //creo una card per ogni contatto
            div.innerHTML = `
            <div class="card-custom">
                <h4>${contact.name}</h4>
                <h4>${contact.number}</h4>
                <button class="btn btn-danger btn-delete" id="${contact.name}">Elimina contatto</button>
            </div>
            `
            //appendere tutto l'elemento html che ho creato al padre (alla row)
            contactsWrapper.appendChild(div)
                    
            })
            let btnDelete = document.querySelectorAll('.btn-delete');
            btnDelete.forEach((btn) => {
                let name = btn.id;
                console.log(name);
                btn.addEventListener('click', () => {
                    this.removeContact(name);
                    contactsWrapper.innerHTML = '';
                    this.showContacts()
                })
            })
            

    },

    addContact : function(newName, newNumber){
        this.contacts.push({name: newName, number: newNumber});

    },  

    removeContact : function(removedName){
        let names = this.contacts.map((contact) => contact.name)
        let index = names.indexOf(removedName)
        this.contacts.splice(index, 1)
        // this.showContacts(this.contacts)
    }
}

// console.log(rubrica.contacts);

let confirm = false;

//EVENTI
btnShowContacts.addEventListener('click', () => {
    if(confirm == false) {
        rubrica.showContacts()
        confirm = true
        btnShowContacts.innerHTML = 'Nascondi contatti'
        console.log('I contatti sono mostrati');
    } else {
        contactsWrapper.innerHTML = '';
        confirm = false;
        btnShowContacts.innerHTML = 'Mostra contatti'
        console.log('i contatti sono nascosti');
    }
})

btnAddContact.addEventListener('click', () => {
    //se l'utente inserisce sia il nome che il numero
    if(contactName.value != '' && contactNumber.value != ''){
        contactsWrapper.innerHTML = ''
        rubrica.addContact(contactName.value, contactNumber.value)
        rubrica.showContacts()
        alert('Contatto aggiunto')
        contactName.value = '';
        contactNumber.value = '';
        if(confirm == false){
            confirm = true;
            btnShowContacts.innerHTML = 'Nascondi contatti'
        } 
        //nel caso in cui l'utente inserisca un numero MA NON UN NOME
    } else if(contactName.value == '' && contactNumber.value != ''){
        alert('Errore! Devi inserire un nome')
        //nel caso in cui l'utente inserisca un nome MA NON UN NUMERO
    } else if(contactName.value != '' && contactNumber.value == ''){
        alert('Errore! Devi inserire un numero')
    } else {
        alert('Errore! Devi inserire un nome e un numero')
    }

})


