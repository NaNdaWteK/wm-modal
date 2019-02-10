class Modal extends HTMLElement{
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.isOpen = false
    this._addTemplate()
  }

  connectedCallback() {
    this._addEvents()
  }

  open() {
    this.setAttribute('opened', '')
    this.isOpen = true
  }

  hide() {
    if(this.hasAttribute('opened')){
      this.removeAttribute('opened')
      this.isOpen = false
    }
  }

  _addTemplate() {
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100vh;
          background-color: rgba(0,0,0,0.6);
          z-index:1;
          opacity: 0;
          pointer-events: none;
        }
        :host([opened]) #backdrop,
        :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }
        :host([opened]) #modal {
          top: 15vh;
        }
        #modal{
          position:fixed;
          top: 10vh;
          left: 25%;
          width: 50%;
          background-color: #fff;
          border-radius: 0 0 .5em .5em;
          z-index:10;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-out;
        }
        header{
          position: relative;
          padding: 0.5em 1em;
          background-color: var(--color-primary, #dfa8ff);
        }
        .close{
          cursor: pointer;
          position:absolute;
          top: 5px;
          right: 8px;
          color: var(--color-close, #616161);
          z-index: 100;
          font-weight: bolder;
          font-size: 1.1em;
          border-radius: 50%;
          padding: 0 5px;
        }
        #main{
          padding: 1em;
        }
        #actions{
          border-top: 1px solid #c4c4c4;
          padding: 1em;
          display: flex;
          justify-content: flex-end;
        }
        #actions button {
          cursor: pointer;
          margin: 0 .3em;
          padding: .4em 1em;
          font-size: 1.2em;
          border-radius: 5px;
          color: var(--color-buttons, #fff);
          border: none;
        }

        #cancel_btn {
          background-color: var(--color-bkg-cancel, #ff5757);
        }
        #confirm_btn {
          background-color: var(--color-bkg-confirm, #54cf49);
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <span class="close">X</span>
          <slot name="title"></slot>
        </header>
        <section id="main">
          <slot name="content"></slot>
        </section>
        <section id="actions">
          <button id="cancel_btn">Cancel</button>
          <button id="confirm_btn">Confirm</button>
        </section>
      </div>
    `
  }

  _addEvents() {
    this.shadowRoot.querySelector('.close').addEventListener('click', this._cancel.bind(this))
    this.shadowRoot.querySelector('#cancel_btn').addEventListener('click', this._cancel.bind(this))
    this.shadowRoot.querySelector('#backdrop').addEventListener('click', this._cancel.bind(this))
    this.shadowRoot.querySelector('#confirm_btn').addEventListener('click', this._confirm.bind(this))
  }

  _cancel() {
    this.hide()
  }

  _confirm() {
    this.hide()
  }
}
customElements.define('wm-modal', Modal);
