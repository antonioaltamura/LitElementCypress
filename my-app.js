import {LitElement, html} from "/web_modules/lit-element.js";

class MyApp extends LitElement {

    constructor() {
        super();
        this._init();
    }

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            Session: {
                type: Object
            },
            config: {
                type: Object
            }
        };
    }

    _init() {

        const _config = {};
        _config.enabledComponents = {};
        const components = [
            "home",
            "login",
            "browser",
        ];

        for (const component of components) {
            _config.enabledComponents[component] = false;
        }
        // We set the global Polymer variable, this produces one single event
        this.config = _config;

        // We need to listen to hash fragment changes to update the page
        window.onhashchange = e => {
            this.hashFragmentListener(this);
        };

        // Remember the tool that was previously set
        this.tool = window.location.hash.split("/")[0];
        if (!this.tool) {
            this.tool = "#home";
        }

        // Go to the page that tool has
        if (window.location.hash !== this.tool) {
            window.location.hash = this.tool;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.Session = null;
    }

    updated(changedProperties) {
        if (changedProperties.has("Session")) {
            this.SessionObserver();
        }
    }

    SessionObserver() {
        this.renderHashFragments();
        this.queries = {};
        this.requestUpdate();
    }

    changeTool(e) {
        const target = e.currentTarget;
        if (target?.attributes?.href) {
            this.tool = target.attributes.href.value;
        } else {
            this.tool = "#home";
        }
        this.renderHashFragments();
    }

    renderHashFragments() {
        let hashFrag = this.tool;
        if (window.location.hash === hashFrag) {
            this.hashFragmentListener();
        } else {
            window.location.hash = hashFrag;
        }
    }

    hashFragmentListener() {
        for (const element in this.config.enabledComponents) {
            this.config.enabledComponents[element] = false;
        }
        this.config.enabledComponents[this.tool.replace("#", "")] = true;

        // NOTE the following line actually triggers the update of the render
        this.config = {...this.config};
        console.warn("the following list should reflect the one stringified in the page, BUT it's not")
        console.warn(this.config.enabledComponents)
    }


    render() {
        return html`
            <nav class="navbar navbar-inverse main-navbar">
                <div>
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li>
                                <a href="#home" id="home-nav" role="button" @click="${this.changeTool}">home</a>
                            </li>
                            <li>
                                <a href="#browser"  id="browser-nav" role="button" @click="${this.changeTool}">browser</a>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a href="#login" id="loginButton" role="button" @click="${this.changeTool}">
                                    <i href="#login" class="fa fa-sign-in-alt fa-lg icon-padding" aria-hidden="true"></i>Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            enabledComponents: <pre>${JSON.stringify(this.config.enabledComponents)}</pre>
            <!-- This is where main IVA application is rendered -->
            <div class="container-fluid">
                ${this.config.enabledComponents.home ? html`
                    <div class="content" id="home">
                    <h1 id="page-title">home</h1>
                    </div>
                ` : null}
                
                ${this.config.enabledComponents.login ? html`
                    <div class="content" id="login">
                    <h1 id="page-title">login</h1>
                    </div>
                ` : null}
                ${this.config.enabledComponents.browser ? html`
                    <div class="content" id="browser">
                    <h1 id="page-title">browser</h1>
                    </div>                
                ` : null}
            </div>
        `;
    }

}

customElements.define("my-app", MyApp);
