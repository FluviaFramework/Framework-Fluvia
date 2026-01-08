(function(global){
    const UI = global.ui || (global.ui = { modules:{}, active:{} });

    function injectBaseStyles() {
        if (document.getElementById("ui-discord-style")) return;

        const style = document.createElement("style");
        style.id = "ui-discord-style";
        style.textContent = `
#ui-discord-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  min-width: 220px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  color: #fff;
  background: #333;
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
  transition: opacity .3s ease, transform .3s ease;
}
#ui-discord-popup.is-visible {
  opacity: 1;
  transform: translateY(0);
}
#ui-discord-popup[data-type="success"] {
  background: #4caf50;
}
#ui-discord-popup[data-type="error"] {
  background: #f44336;
}
        `;
        document.head.appendChild(style);
    }

    UI.modules.discord = function(config = {}) {
        if(!config.webhook){
            console.warn("[ui.discord] webhook missing");
            return;
        }

        injectBaseStyles();

        const messages = {
            success: config.messages?.success || "Success",
            error: config.messages?.error || "Error",
            confirm: config.messages?.confirm || "Confirm?"
        };

        function createPopup() {
            let popup = document.getElementById("ui-discord-popup");
            if(!popup){
                popup = document.createElement("div");
                popup.id = "ui-discord-popup";
                document.body.appendChild(popup);
            }
            return popup;
        }

        function showPopup(text, success = true) {
            if(!config.showPopup) return;
            const popup = createPopup();
            popup.textContent = text;
            popup.dataset.type = success ? "success" : "error";
            popup.classList.add("is-visible");

            setTimeout(() => popup.classList.remove("is-visible"), 3000);
        }

        function collect(form){
            const data = {};
            new FormData(form).forEach((v,k)=>data[k]=v);
            return data;
        }

        function send(form){
            if(config.confirm && !window.confirm(messages.confirm)) return;

            const data = collect(form);
            const fields = Object.entries(config.fields||{}).map(([k,l])=>({
                name: l,
                value: data[k] || "—",
                inline: false
            }));

            fetch(config.webhook,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    embeds:[{ title:config.title||"Form", fields }]
                })
            })
                .then(()=>{
                    form.reset();
                    showPopup(messages.success, true);
                    config.onSuccess?.();
                })
                .catch(err=>{
                    showPopup(messages.error, false);
                    config.onError?.(err);
                    console.error(err);
                });
        }

        return { send };
    };

    global.ui = UI;
})(window);
