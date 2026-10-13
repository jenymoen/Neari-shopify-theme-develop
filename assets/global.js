/* Neari – globalt JS. Vanilla, ingen avhengigheter. */

const config = (() => {
  try {
    return JSON.parse(document.getElementById('theme-config').textContent);
  } catch (error) {
    return { routes: {}, strings: {} };
  }
})();

const { routes, strings } = config;

/* ---------- Dialoger (handlekurv, meny, søk) ---------- */

function openDialog(id, trigger) {
  const dialog = document.getElementById(id);
  if (!dialog || typeof dialog.showModal !== 'function') return;
  dialog.returnFocusTo = trigger || document.activeElement;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('is-locked');
  dialog.dispatchEvent(new CustomEvent('dialog:open'));
}

document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-dialog-open]');
  if (opener) {
    event.preventDefault();
    openDialog(opener.dataset.dialogOpen, opener);
    return;
  }

  const closer = event.target.closest('[data-dialog-close]');
  if (closer) {
    const dialog = closer.closest('dialog');
    if (dialog) dialog.close();
    return;
  }

  if (event.target instanceof HTMLDialogElement && event.target.open) {
    event.target.close();
  }
});

document.addEventListener(
  'close',
  (event) => {
    if (!(event.target instanceof HTMLDialogElement)) return;
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('is-locked');
    const target = event.target.returnFocusTo;
    if (target && document.contains(target)) target.focus();
  },
  true
);

/* ---------- Handlekurv ---------- */

function setCartCount(count) {
  document.querySelectorAll('[data-cart-count]').forEach((element) => {
    element.textContent = count;
    element.hidden = count === 0;
  });
}

function announce(message) {
  const region = document.querySelector('[data-cart-status]');
  if (!region) return;
  region.textContent = '';
  window.setTimeout(() => {
    region.textContent = message;
  }, 50);
}

async function refreshCartDrawer(focusSelector) {
  const drawer = document.querySelector('[data-cart-drawer-content]');
  if (!drawer) return;
  const response = await fetch(`${routes.cart_url}?section_id=cart-drawer`);
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const next = doc.querySelector('[data-cart-drawer-content]');
  if (!next) return;
  drawer.replaceWith(next);
  setCartCount(parseInt(next.dataset.itemCount, 10) || 0);
  if (focusSelector) {
    const focusTarget = next.querySelector(focusSelector) || next.querySelector('[data-dialog-close]');
    if (focusTarget) focusTarget.focus();
  }
}

async function changeLine(line, quantity, focusSelector) {
  const drawer = document.querySelector('[data-cart-drawer-content]');
  if (drawer) drawer.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(routes.cart_change_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ line, quantity })
    });
    if (!response.ok) throw new Error('cart change failed');
    await refreshCartDrawer(focusSelector);
    announce(strings.cart_updated);
  } catch (error) {
    if (drawer) drawer.removeAttribute('aria-busy');
    announce(strings.cart_error);
  }
}

document.addEventListener('click', (event) => {
  const remove = event.target.closest('[data-line-remove]');
  if (remove) {
    event.preventDefault();
    changeLine(parseInt(remove.dataset.lineRemove, 10), 0, '[data-line-qty]');
  }
});

document.addEventListener('change', (event) => {
  const input = event.target.closest('[data-line-qty]');
  if (!input) return;
  const line = parseInt(input.dataset.lineQty, 10);
  changeLine(line, Math.max(0, parseInt(input.value, 10) || 0), `[data-line-qty="${line}"]`);
});

/* ---------- Mengde-velger ---------- */

class QuantityInput extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input');
    this.addEventListener('click', (event) => {
      const button = event.target.closest('[data-quantity-step]');
      if (!button || !this.input) return;
      const step = parseInt(button.dataset.quantityStep, 10);
      const min = parseInt(this.input.min, 10) || 0;
      const max = parseInt(this.input.max, 10) || 99;
      const next = Math.min(max, Math.max(min, (parseInt(this.input.value, 10) || min) + step));
      if (next === parseInt(this.input.value, 10)) return;
      this.input.value = next;
      this.input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
}

if (!customElements.get('quantity-input')) customElements.define('quantity-input', QuantityInput);

/* ---------- Produktgalleri ---------- */

class ProductGallery extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      const thumb = event.target.closest('[data-media-target]');
      if (thumb) this.select(thumb.dataset.mediaTarget);
      if (event.target.closest('[data-carousel-prev]')) this.scrollTrack(-1);
      if (event.target.closest('[data-carousel-next]')) this.scrollTrack(1);
    });

    this.track = this.querySelector('[data-carousel-track]');
    if (this.track) {
      this.track.addEventListener('scroll', () => this.updateButtons(), { passive: true });
      window.addEventListener('resize', () => this.updateButtons());
      this.updateButtons();
    }
  }

  scrollTrack(direction) {
    if (!this.track) return;
    this.track.scrollBy({ left: direction * this.track.clientWidth * 0.8 });
  }

  updateButtons() {
    const prev = this.querySelector('[data-carousel-prev]');
    const next = this.querySelector('[data-carousel-next]');
    if (!this.track || !prev || !next) return;
    const max = this.track.scrollWidth - this.track.clientWidth - 1;
    prev.disabled = this.track.scrollLeft <= 0;
    next.disabled = this.track.scrollLeft >= max;
  }

  select(mediaId) {
    const slides = this.querySelectorAll('[data-media-id]');
    const exists = Array.from(slides).some((slide) => slide.dataset.mediaId === String(mediaId));
    if (!exists) return;
    slides.forEach((slide) => {
      slide.hidden = slide.dataset.mediaId !== String(mediaId);
    });
    this.querySelectorAll('[data-media-target]').forEach((thumb) => {
      const active = thumb.dataset.mediaTarget === String(mediaId);
      thumb.setAttribute('aria-current', String(active));
      if (active && this.track) {
        const item = thumb.parentElement;
        const left = item.offsetLeft - this.track.offsetLeft;
        if (left < this.track.scrollLeft || left + item.offsetWidth > this.track.scrollLeft + this.track.clientWidth) {
          this.track.scrollTo({ left: left - 4 });
        }
      }
    });
  }
}

if (!customElements.get('product-gallery')) customElements.define('product-gallery', ProductGallery);

/* ---------- Produktskjema ---------- */

class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.button = this.querySelector('[data-add-to-cart]');
    this.idInput = this.querySelector('input[name="id"]');
    this.error = this.querySelector('[data-form-error]');
    const data = this.querySelector('script[data-variants]');
    this.variants = data ? JSON.parse(data.textContent) : [];

    this.addEventListener('change', (event) => {
      if (event.target.closest('[data-option]')) this.onOptionChange();
    });
    this.form.addEventListener('submit', (event) => this.onSubmit(event));
  }

  selectedOptions() {
    return Array.from(this.querySelectorAll('[data-option-group]')).map((group) => {
      const checked = group.querySelector('input:checked');
      const select = group.querySelector('select');
      return checked ? checked.value : select ? select.value : null;
    });
  }

  onOptionChange() {
    const selected = this.selectedOptions();
    const variant = this.variants.find((item) => item.options.every((value, index) => value === selected[index]));
    this.querySelectorAll('[data-option-value]').forEach((label) => {
      const group = label.closest('[data-option-group]');
      const checked = group.querySelector('input:checked');
      const output = group.querySelector('[data-option-selected]');
      if (checked && output) output.textContent = checked.value;
    });
    this.updateVariant(variant);
  }

  updateVariant(variant) {
    if (!variant) {
      this.button.disabled = true;
      this.button.querySelector('span').textContent = strings.unavailable;
      return;
    }

    this.idInput.value = variant.id;
    this.idInput.disabled = false;
    this.button.disabled = !variant.available;
    this.button.querySelector('span').textContent = variant.available ? strings.add_to_cart : strings.sold_out;

    const section = this.closest('[data-product-section]') || document;
    const price = section.querySelector('[data-price]');
    const compare = section.querySelector('[data-compare-price]');
    if (price) price.textContent = variant.price;
    if (compare) {
      compare.textContent = variant.compare_at_price || '';
      compare.hidden = !variant.compare_at_price;
    }

    if (variant.featured_media_id) {
      const gallery = section.querySelector('product-gallery');
      if (gallery) gallery.select(variant.featured_media_id);
    }

    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url);
  }

  async onSubmit(event) {
    event.preventDefault();
    if (this.button.disabled) return;
    this.button.setAttribute('aria-busy', 'true');
    this.button.disabled = true;
    if (this.error) this.error.hidden = true;

    try {
      const response = await fetch(`${routes.cart_add_url}.js`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(this.form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.description || result.message || strings.cart_error);

      await refreshCartDrawer();
      const cart = await (await fetch(`${routes.cart_url}.js`)).json();
      setCartCount(cart.item_count);
      openDialog('CartDrawer', this.button);
      announce(strings.cart_updated);
    } catch (error) {
      if (this.error) {
        this.error.textContent = error.message;
        this.error.hidden = false;
      }
    } finally {
      this.button.removeAttribute('aria-busy');
      this.button.disabled = false;
    }
  }
}

if (!customElements.get('product-form')) customElements.define('product-form', ProductForm);

/* ---------- Språk- og landvelger ---------- */

document.addEventListener('change', (event) => {
  const select = event.target.closest('[data-localization-select]');
  if (!select) return;
  const form = select.closest('form');
  const hidden = form.querySelector(`input[name="${select.dataset.localizationSelect}"]`);
  if (hidden) hidden.value = select.value;
  form.submit();
});
