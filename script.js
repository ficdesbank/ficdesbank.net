let csrfToken = "";

async function fetchCsrf() {
  const res = await fetch("https://TON_BACKEND.netlify.app/.netlify/functions/csrf");
  const data = await res.json();
  csrfToken = data.csrfToken;
}

fetchCsrf();

document.getElementById("formInscription").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const body = {
    civilite: form.civilite.value,
	Raison sociale: form.Raison sociale.value,
    nom: form.nom.value,
	Prénom: form.Prénom.value,
    email: form.email.value,
	Pays: form.Pays.value,
	Numéro de téléphone: form.Numéro de téléphone.value,
    csrfToken
  };

  const res = await fetch("https://TON_BACKEND.netlify.app/.netlify/functions/inscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const result = await res.json();
  alert(result.message || result.error);

  fetchCsrf(); // nouveau token après soumission
});
