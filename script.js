function controllaDisponibilita() {
    let giorno = document.getElementById("giorno").value;
    let ora = document.getElementById("ora").value;
    let comunita = document.getElementById("comunita").value;
    let funzionario = document.getElementById("funzionario").value;
    let note = document.getElementById("note").value;

    if (!giorno || !ora || !comunita || !funzionario) {
        alert("Compila tutti i campi obbligatori!");
        return;
    }

    let data = {
        giorno: giorno,
        ora: ora
    };

    fetch("https://script.google.com/macros/s/AKfycbzhcFgb-sigh0budfNUhtWWFAcuQmXKhAzRlWWLLVAbBcXs8JCJonLTKfoZSCy7n1dv/exec
", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(result => {
        if (result.libero) {
            alert("✅ Stanza disponibile! La prenotazione verrà registrata.");
            salvaPrenotazione(giorno, ora, comunita, funzionario, note);
        } else {
            alert("❌ La stanza è già occupata in quell'orario!");
        }
    })
    .catch(error => console.error("Errore:", error));
}

function salvaPrenotazione(giorno, ora, comunita, funzionario, note) {
    let data = {
        giorno: giorno,
        ora: ora,
        comunita: comunita,
        funzionario: funzionario,
        note: note
    };

    fetch("https://script.google.com/macros/s/ID_DEL_TUO_SCRIPT/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(result => alert("📌 Prenotazione registrata con successo!"))
    .catch(error => console.error("Errore:", error));
}
