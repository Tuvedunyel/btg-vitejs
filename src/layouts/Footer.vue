<template>
  <section id="acc-newsletter">
    <h2>Inscription à la newsletter</h2>
    <div class="flipped vague no-transition">
      <img src="../static/icons/wave-yellow.gif" alt="Vague jaune" />
    </div>
    <h3>
      Recevez tous les mois les actualités de notre agence de communication, des
      articles sur
      <strong
        >le marketing, la création de site internet, les bonnes pratiques, des
        guides etc.</strong
      >
    </h3>

    <div
      class="sib-form"
      style="text-align: center; background-color: transparent"
    >
      <div id="sib-form-container" class="sib-form-container">
        <div
          id="sib-container"
          class="sib-container--large sib-container--vertical"
          style="
            text-align: center;
            background-color: transparent;
            max-width: 540px;
            border-radius: 3px;
            border-width: 1px;
            border-color: transparent;
            border-style: solid;
          "
        >
          <form
            id="sib-form"
            method="POST"
            action="https://90599dd5.sibforms.com/serve/MUIEANTuJq1uqe365nD-b6-KFDTG-XC98JeyinAVblM_anm7WAAZUDr94XbOGOHLlKdcOj58kaYAvLt2_u89HWLsI_pTjbB4hB7wCo8dg5dKkvOtd8Q_pF7npKhWgzl9oTX_r_4XND-v3nohkEnBDZ2NB5WUOpOidXXDWzt-A12b3roRuK9dxdAEKvbX5U0ERMcmIszl__CPmaXw"
            data-type="subscription"
          >
            <div style="padding: 8px 0">
              <div class="sib-input sib-form-block">
                <div class="form__entry entry_block">
                  <div class="form__label-row">
                    <div class="entry__field">
                      <input
                        class="input"
                        type="text"
                        id="EMAIL"
                        name="EMAIL"
                        autocomplete="off"
                        placeholder="Votre adresse email (*)"
                        data-required="true"
                        required
                      />
                    </div>
                  </div>

                  <label
                    class="entry__error entry__error--primary"
                    style="
                      font-size: 16px;
                      text-align: left;
                      font-family: 'Helvetica', sans-serif;
                      color: #661d1d;
                      background-color: #ffeded;
                      border-radius: 3px;
                      border-color: #ff4949;
                    "
                  >
                  </label>
                </div>
              </div>
            </div>
            <div style="padding: 8px 0">
              <div class="sib-form-block" style="text-align: left">
                <button
                  id="sendinblue"
                  class="sib-form-block__button sib-form-block__button-with-loader"
                  style="
                    font-size: 16px;
                    text-align: left;
                    font-weight: 700;
                    font-family: 'Helvetica', sans-serif;
                    color: #ffffff;
                    background-color: transparent;
                    border-radius: 3px;
                    border-width: 0px;
                  "
                  form="sib-form"
                  type="submit"
                  disabled
                >
                  ENVOYER
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <section v-if="!loading" class="map">
    <img class="hexatop" src="../static/icons/hexa-white.svg" alt="" />
    <div class="coordonnees">
      <img src="../static/icons/hexa-white.svg" alt="" />
      <div class="adresses">
        <p class="exo-bold-21">Btg Communication</p>
        <img src="../static/icons/vague(1).svg" alt="" />
        <ul class="exo-light-21">
          <li>{{ optionsData.adresse_coordonnees }}</li>
          <li>
            {{ optionsData.code_postal_coordonnees }}
            {{ optionsData.ville_coordonnees }}
          </li>
          <li>{{ optionsData.numero_telephone_coordonnes }}</li>
          <li>contact@btg-communication.fr</li>
        </ul>
      </div>
    </div>
    <div id="map-fixe">
      <img
        src="../static/adresse-btg-communication.jpg"
        alt="Adresse BTG Communication"
      />
    </div>
  </section>
  <footer v-if="!loading">
    <div class="desc">
      <strong>
        <span class="btg">© BTG communication</span>
        <span class="dash">-</span>
        <span class="agence"
          >agence de communication visuelle à Tours (37)</span
        >
      </strong>
      <span class="dash">-</span>
      <a href="#" class="mentions">Mentions légales</a>
    </div>
    <div class="socials">
      <a href="#">
        <span class="screen-reader-text">Contact</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 519.6 600">
          <path
            d="M259.8 600L0 450V150L259.8 0l259.8 150v300L259.8 600zM13.3 442.3l246.5 142.3 246.5-142.3V157.7L259.8 15.4 13.3 157.7v284.6z"
          />
          <path
            d="M259.8 337.9l-195-112.6c-4.8-2.8-6.4-8.9-3.6-13.6 2.8-4.8 8.9-6.4 13.6-3.6l185 106.8 185-106.8c4.8-2.8 10.9-1.1 13.6 3.6 2.8 4.8 1.1 10.9-3.6 13.6l-195 112.6z"
          />
          <g>
            <path
              d="M460 420.2H59.6V179.8H460v240.4zM80.1 399.6h359.4V200.4H80.1v199.2z"
            />
          </g>
        </svg>
        <img src="./../static/icons/contact-degrade.svg" alt="Contact" />
      </a>
      <a :href="optionsData.url_facebook_rs">
        <span class="screen-reader-text">Facebook</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 519.6 600">
          <path
            d="M259.8 600L0 450V150L259.8 0l259.8 150v300L259.8 600zM15.4 441.1l244.4 141.1 244.4-141.1V158.9L259.8 17.7 15.4 158.9v282.2z"
          />
          <path
            d="M284.3 458.3V313.9h48.5l7.3-56.3h-55.7v-35.9c0-16.3 4.5-27.4 27.9-27.4h29.8V144c-5.2-.7-22.8-2.2-43.4-2.2-43 0-72.4 26.2-72.4 74.4v41.5h-48.6V314h48.6v144.4h58z"
          />
        </svg>
        <img src="./../static/icons/facebook-degrade.svg" alt="Logo Facebook" />
      </a>
      <a :href="optionsData.url_linkedin_rs">
        <span class="screen-reader-text">Linkedin</span>
        <svg
          version="1.1"
          id="Calque_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 519.6 600"
          style="enable-background: new 0 0 519.6 600"
          xml:space="preserve"
        >
          <g>
            <path
              class="st0"
              d="M259.2,600.4l-259.8-150v-300l259.8-150l259.8,150v300L259.2,600.4z M14.8,441.5l244.4,141.1l244.4-141.1
 V159.3L259.2,18.1L14.8,159.3V441.5z"
            ></path>
            <g>
              <path
                class="st1"
                d="M177,444.2V250.1h-64.5v194.1H177L177,444.2z M144.8,223.6c22.5,0,36.5-14.9,36.5-33.5
 c-0.4-19-14-33.5-36.1-33.5c-22.1,0-36.5,14.5-36.5,33.5c0,18.6,14,33.5,35.6,33.5H144.8L144.8,223.6z"
              ></path>
              <path
                class="st1"
                d="M212.7,444.2h64.5V335.8c0-5.8,0.4-11.6,2.1-15.7c4.7-11.6,15.3-23.6,33.1-23.6c23.3,0,32.7,17.8,32.7,43.9
 v103.8h64.5V332.9c0-59.6-31.8-87.3-74.3-87.3c-34.8,0-50.1,19.5-58.6,32.7h0.4v-28.2h-64.5C213.6,268.3,212.7,444.2,212.7,444.2
 L212.7,444.2z"
              ></path>
            </g>
          </g>
        </svg>
        <img src="./../static/icons/linkedin-degrade.svg" alt="Logo Linkedin" />
      </a>
    </div>
  </footer>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Footer",
    props: {
      apiUrl: {
        type: String,
        default: "https://btg-dev.com/btg-test",
        required: true,
      },
    },
    data() {
      return {
        optionsData: null,
        loading: true,
      };
    },
    async mounted() {
      if (localStorage.getItem("otpions")) {
        this.optionsData = JSON.parse(localStorage.getItem("otpions"));
      } else {
        await axios
          .get(`${this.apiUrl}/wp-json/better-rest-endpoints/v1/options/acf`)
          .then(response => (this.optionsData = response.data));
      }
      this.loading = false;
    },
  };
</script>
