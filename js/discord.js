(function(global){
    const UI = global.ui || (global.ui = { modules:{}, active:{} });

    UI.modules.discord = function(config = {}) {
        if(!config.webhook){
            console.warn("[ui.discord] webhook manquant");
            return;
        }

        // Création d'un container popup global si nécessaire
        function createPopupContainer() {
            let popup = document.getElementById("ui-discord-popup");
            if(!popup){
                popup = document.createElement("div");
                popup.id = "ui-discord-popup";
                document.body.appendChild(popup);
                popup.style.position = "fixed";
                popup.style.top = "20px";
                popup.style.right = "20px";
                popup.style.zIndex = "9999";
                popup.style.minWidth = "200px";
                popup.style.padding = "1rem 1.5rem";
                popup.style.borderRadius = "8px";
                popup.style.color = "#fff";
                popup.style.fontWeight = "bold";
                popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
                popup.style.opacity = "0";
                popup.style.transition = "opacity 0.3s, transform 0.3s";
                popup.style.transform = "translateY(-20px)";
            }
            return popup;
        }

        function showPopup(message, success = true, duration = 3000) {
            if(!config.showPopup) return; // désactivé côté projet

            const popup = createPopupContainer();
            popup.textContent = message;
            popup.style.backgroundColor = success ? "#4caf50" : "#f44336";
            popup.style.opacity = "1";
            popup.style.transform = "translateY(0)";

            setTimeout(() => {
                popup.style.opacity = "0";
                popup.style.transform = "translateY(-20px)";
            }, duration);
        }

        function collect(form){
            const data = {};
            new FormData(form).forEach((v,k)=>data[k]=v);
            return data;
        }

        function send(form){
            if(config.confirm && !window.confirm(config.confirmText || "Voulez-vous envoyer le message ?")){
                return; // annulé par l'utilisateur
            }

            const data = collect(form);
            const fields = Object.entries(config.fields||{}).map(([k,l])=>({
                name:l,
                value:data[k]||"—",
                inline:false
            }));

            const payload = { embeds:[{ title:config.title||"Formulaire", fields }] };

            if(config.log) console.log("[ui.discord] payload:", payload);

            form.classList.add("is-loading");

            fetch(config.webhook,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(payload)
            })
                .then(()=>{
                    form.classList.remove("is-loading");
                    form.classList.add("is-success");
                    form.reset();
                    showPopup("Message envoyé !", true);
                    if(config.onSuccess) config.onSuccess();
                })
                .catch(err=>{
                    form.classList.remove("is-loading");
                    form.classList.add("is-error");
                    showPopup("Erreur lors de l'envoi !", false);
                    if(config.onError) config.onError(err);
                    console.error("[ui.discord] error:", err);
                });
        }

        return { send };
    }

    global.ui = UI;
})(window);
