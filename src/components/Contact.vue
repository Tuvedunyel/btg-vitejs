<template>
  <div id="overlay-contact">
    <div class="content">
      <div class="socials">
        <a :href="data.url_facebook_rs"
          ><span class="screen-reader-text">Facebook</span
          ><img
            src="./../static/icons/facebook-degrade.svg"
            alt="Logo Facebook"
        /></a>
        <a :href="data.url_linkedin_rs"
          ><span class="screen-reader-text">linkedin</span
          ><img
            src="./../static/icons/linkedin-degrade.svg"
            alt="Logo linkedin"
        /></a>
      </div>
      <div class="formulaire">
        <div class="entree">
          <p class="exo-bold-21">
            Vous avez un projet, une question, envie de rejoindre l’équipe ?
          </p>
          <div class="vague">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 32">
              <path
                d="M156.7 32c-9.5 0-14.2-7.7-18.2-14.5-4.4-7.1-7.4-11.5-13.2-11.5-5.7 0-8.8 4.4-13.1 11.5C108.1 24.3 103.5 32 94 32s-14.2-7.7-18.2-14.5C71.4 10.4 68.4 6 62.7 6c-5.7 0-8.8 4.4-13.1 11.5C45.5 24.3 40.9 32 31.3 32s-14.2-7.7-18.2-14.5C8.8 10.4 5.7 6 0 6V0c9.5 0 14.2 7.7 18.2 14.5C22.6 21.6 25.6 26 31.3 26c5.7 0 8.8-4.4 13.1-11.5C48.5 7.7 53.1 0 62.7 0c9.5 0 14.2 7.7 18.2 14.5C85.2 21.6 88.3 26 94 26s8.8-4.4 13.1-11.5C111.2 7.7 115.8 0 125.3 0s14.2 7.7 18.2 14.5c4.3 7.2 7.4 11.5 13.1 11.5s8.8-4.4 13.1-11.5C173.8 7.7 178.5 0 188 0v6c-5.7 0-8.8 4.4-13.1 11.5-4.1 6.8-8.7 14.5-18.2 14.5z"
              />
            </svg>
          </div>
          <div v-if="errors.length" class="erreur-container">
            <b
              >Veuillez corriger
              <span v-if="errors.length > 1">les erreurs suivantes </span
              ><span v-else>l'erreur suivante</span></b
            >
            <ul>
              <li v-for="(error, index) in errors" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <form class="wpcf7-form init" @submit="checkForm">
            <div>
              <label class="screen-reader-text" for="name"
                >Votre nom et prénom</label
              >
              <input
                id="name"
                v-model="nameForm"
                type="text"
                name="name"
                placeholder="Votre nom et prénom (*)"
                required
              />
              <label class="screen-reader-text" for="societe"
                >Nom de votre société</label
              >
              <input
                id="societe"
                v-model="compagny"
                type="text"
                name="societe"
                placeholder="Nom de votre société"
              />
            </div>
            <div>
              <label class="screen-reader-text" for="email"
                >Votre adresse email</label
              >
              <input
                id="email"
                v-model="mailForm"
                type="email"
                name="email"
                placeholder="Votre adresse mail (*)"
                required
              />
              <label class="screen-reader-text" for="telephone"
                >Votre numéro de téléhpone</label
              >
              <input
                id="telephone"
                v-model="tel"
                type="tel"
                name="telephone"
                placeholder="Votre numéro de téléphone (*)"
                required
              />
            </div>
            <p>
              <label class="screen-reader-text" for="message"
                >Votre message</label
              >
              <textarea
                id="message"
                v-model="message"
                name="message"
                cols="30"
                rows="10"
                placeholder="Votre message ..."
              ></textarea>
            </p>
            <div class="envoi">
              <input type="submit" aria-label="envoyer" value="Envoyer" />
            </div>
          </form>
        </div>
        <div v-if="sent" class="validation">
          <p class="exo-bold-21">
            Votre message nous a bien été transmis. <br />
            Nous vous recontacterons dans les meilleurs délais.
          </p>
          <div class="vague">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 32">
              <path
                d="M156.7 32c-9.5 0-14.2-7.7-18.2-14.5-4.4-7.1-7.4-11.5-13.2-11.5-5.7 0-8.8 4.4-13.1 11.5C108.1 24.3 103.5 32 94 32s-14.2-7.7-18.2-14.5C71.4 10.4 68.4 6 62.7 6c-5.7 0-8.8 4.4-13.1 11.5C45.5 24.3 40.9 32 31.3 32s-14.2-7.7-18.2-14.5C8.8 10.4 5.7 6 0 6V0c9.5 0 14.2 7.7 18.2 14.5C22.6 21.6 25.6 26 31.3 26c5.7 0 8.8-4.4 13.1-11.5C48.5 7.7 53.1 0 62.7 0c9.5 0 14.2 7.7 18.2 14.5C85.2 21.6 88.3 26 94 26s8.8-4.4 13.1-11.5C111.2 7.7 115.8 0 125.3 0s14.2 7.7 18.2 14.5c4.3 7.2 7.4 11.5 13.1 11.5s8.8-4.4 13.1-11.5C173.8 7.7 178.5 0 188 0v6c-5.7 0-8.8 4.4-13.1 11.5-4.1 6.8-8.7 14.5-18.2 14.5z"
              />
            </svg>
          </div>
          <button
            @click="
              toggleContact();
              fakeresetform();
              sent = !sent;
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 519.6 600">
              <path
                d="M259.7-.1L0 149.9v300l259.8 150 259.8-150v-300L259.7-.1zm246.6 442.3L259.7 584.5 13.3 442.2V157.5L259.7 15.3l246.5 142.3v284.6z"
              />
              <path
                d="M262 287.1l-2.2 1.2-2.2-1.2L74.8 181.6c-4.8-2.7-10.9-1.1-13.6 3.7-2.7 4.8-1.1 10.9 3.7 13.6l172.8 99.8-172.9 99.6c-4.8 2.7-6.4 8.8-3.7 13.6 1.9 3.2 5.2 5 8.7 5 1.7 0 3.4-.5 5-1.3l185-106.8 185 106.8c4.8 2.7 10.9 1.1 13.6-3.7 2.7-4.8 1.1-10.9-3.7-13.6l-172.8-99.8 172.8-99.8c4.8-2.7 6.4-8.8 3.7-13.6-2.7-4.8-8.8-6.4-13.6-3.7L262 287.1z"
              />
            </svg>
          </button>
        </div>
        <div class="socials-resp">
          <a :href="data.url_facebook_rs" target="_blank">
            <span class="screen-reader-text">Facebook</span>
            <img
              src="./../static/icons/facebook-degrade.svg"
              alt="Logo Facebook"
            />
          </a>
          <a :href="data.url_twitter_rs" target="_blank"
            ><span class="screen-reader-text">Twitter</span
            ><img
              src="./../static/icons/twitter-degrade.svg"
              alt="Logo Twitter"
          /></a>
        </div>
        <div class="infos exo-light-16">
          <p><strong>Btg Communication</strong></p>
          <p>
            {{ data.adresse_coordonnees }} /
            {{ data.code_postal_coodonnees }}
            {{ data.ville_coordonnees }} /
            {{ data.numero_telephone_coordonnees }}
          </p>
          <p>contact@btg-communication.fr</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Contact",
    props: ["data"],
    data() {
      return {
        errors: [],
        nameForm: null,
        mailForm: null,
        tel: null,
        compagny: null,
        message: null,
        sent: false,
      };
    },
    methods: {
      validEmail(email) {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      checkForm(e) {
        e.preventDefault();
        this.errors = [];

        if (!this.nameForm) {
          this.errors.push("Nom et prénom requis.");
        }
        if (!this.mailForm) {
          this.errors.push("Email requis.");
        } else if (!this.validEmail(this.mailForm)) {
          this.errors.push("Un email valide est requis.");
        }
        if (!this.tel) {
          this.errors.push("Un numéro de téléphone est requis.");
        }

        if (!this.errors.length) {
          const bodyFormData = new FormData();
          bodyFormData.set("name-form", this.nameForm);
          bodyFormData.set("compagny", this.compagny);
          bodyFormData.set("mail-form", this.mailForm);
          bodyFormData.set("tel", this.tel);
          bodyFormData.set("message", this.message);

          axios({
            method: "post",
            url: "https://www.btg-communication.fr/wp-json/contact-form-7/v1/contact-forms/270/feedback",
            data: bodyFormData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
          })
            .then(response => {
              console.log(response);
              this.sent = true;
              return true;
            })
            .catch(error => console.log(error));
        }
      },
    },
  };
</script>
